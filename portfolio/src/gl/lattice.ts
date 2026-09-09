/**
 * Lattice — a hand-written WebGL "living system diagram".
 *
 * Nodes on nested Fibonacci spheres, edges to nearest neighbours, and packets
 * that travel edge to edge. Depth-faded lines and points give the 3D read; a
 * few kilobytes of code instead of a rendering library.
 *
 * Framework-agnostic: React only mounts/unmounts it (see LatticeCanvas.tsx).
 */
import { multiply, perspective, rotationX, rotationY, rotationZ, translation, type Mat4 } from "./math";

export type RGB = [number, number, number];

export interface LatticeColors {
  line: RGB;
  node: RGB;
  packet: RGB;
}

export interface LatticeOptions {
  /** "high" renders more nodes/packets at up to 1.5× DPR; "low" is lighter; "static" draws a single frame. */
  tier: "high" | "low" | "static";
  colors: LatticeColors;
}

interface LayerSpec {
  radius: number;
  count: number;
  neighbours: number;
  /** spin speed (rad/s) and axis tilt (rad) */
  spin: number;
  tilt: number;
  packets: number;
}

interface Packet {
  edge: number;
  /** node index the packet is travelling from */
  from: number;
  t: number;
  speed: number;
}

interface Layer extends LayerSpec {
  positions: Float32Array;
  edges: Uint16Array;
  adjacency: number[][];
  nodeBuffer: WebGLBuffer;
  lineBuffer: WebGLBuffer;
  packetBuffer: WebGLBuffer;
  packetList: Packet[];
  packetData: Float32Array;
}

const VERT = `
attribute vec3 aPos;
uniform mat4 uProj;
uniform mat4 uView;
uniform float uSize;
uniform float uDpr;
varying float vFade;
void main() {
  vec4 v = uView * vec4(aPos, 1.0);
  float depth = clamp((-v.z - 2.3) / 2.2, 0.0, 1.0);
  vFade = mix(1.0, 0.12, depth);
  gl_Position = uProj * v;
  gl_PointSize = uSize * uDpr * mix(1.15, 0.55, depth);
}`;

const FRAG_LINE = `
precision mediump float;
uniform vec3 uColor;
uniform float uAlpha;
varying float vFade;
void main() {
  float a = uAlpha * vFade;
  gl_FragColor = vec4(uColor * a, a);
}`;

const FRAG_POINT = `
precision mediump float;
uniform vec3 uColor;
uniform float uAlpha;
uniform float uSoft;
varying float vFade;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.5 - uSoft, d) * uAlpha * vFade;
  gl_FragColor = vec4(uColor * a, a);
}`;

function fibonacciSphere(n: number, radius: number): Float32Array {
  const out = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return out;
}

function nearestEdges(pos: Float32Array, k: number): { edges: Uint16Array; adjacency: number[][] } {
  const n = pos.length / 3;
  const seen = new Set<number>();
  const pairs: number[] = [];
  const dists: { j: number; d: number }[] = [];
  for (let i = 0; i < n; i++) {
    dists.length = 0;
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const dx = pos[i * 3] - pos[j * 3];
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      dists.push({ j, d: dx * dx + dy * dy + dz * dz });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let m = 0; m < k && m < dists.length; m++) {
      const j = dists[m].j;
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);
      const key = lo * 65536 + hi;
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push(lo, hi);
      }
    }
  }
  const edges = new Uint16Array(pairs);
  const adjacency: number[][] = Array.from({ length: n }, () => []);
  for (let e = 0; e < edges.length / 2; e++) {
    adjacency[edges[e * 2]].push(e);
    adjacency[edges[e * 2 + 1]].push(e);
  }
  return { edges, adjacency };
}

function compileProgram(gl: WebGLRenderingContext, vert: string, frag: string): WebGLProgram {
  const make = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) throw new Error("createShader failed");
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
    }
    return s;
  };
  const p = gl.createProgram();
  if (!p) throw new Error("createProgram failed");
  gl.attachShader(p, make(gl.VERTEX_SHADER, vert));
  gl.attachShader(p, make(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) ?? "program error");
  }
  return p;
}

interface Program {
  program: WebGLProgram;
  aPos: number;
  uProj: WebGLUniformLocation | null;
  uView: WebGLUniformLocation | null;
  uSize: WebGLUniformLocation | null;
  uDpr: WebGLUniformLocation | null;
  uColor: WebGLUniformLocation | null;
  uAlpha: WebGLUniformLocation | null;
  uSoft: WebGLUniformLocation | null;
}

export class Lattice {
  private gl: WebGLRenderingContext;
  private canvas: HTMLCanvasElement;
  private opts: LatticeOptions;
  private layers: Layer[] = [];
  private lineProg!: Program;
  private pointProg!: Program;
  private proj: Mat4 = perspective(0.55, 1, 0.1, 20);
  private raf = 0;
  private last = 0;
  private time = 0;
  private running = false;
  private dpr = 1;
  private pointer = { x: 0, y: 0 };
  private pointerEased = { x: 0, y: 0 };
  private lost = false;

  constructor(canvas: HTMLCanvasElement, opts: LatticeOptions) {
    this.canvas = canvas;
    this.opts = opts;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
      depth: false,
      stencil: false,
    });
    if (!gl) throw new Error("WebGL unavailable");
    this.gl = gl;

    canvas.addEventListener("webglcontextlost", this.onLost, false);
    canvas.addEventListener("webglcontextrestored", this.onRestored, false);

    this.init();
  }

  /* ---------- lifecycle ---------- */

  private init() {
    const gl = this.gl;
    this.lineProg = this.wrap(compileProgram(gl, VERT, FRAG_LINE));
    this.pointProg = this.wrap(compileProgram(gl, VERT, FRAG_POINT));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);

    const high = this.opts.tier === "high";
    const specs: LayerSpec[] = [
      { radius: 1, count: high ? 220 : 140, neighbours: 3, spin: 0.08, tilt: 0.35, packets: high ? 40 : 22 },
      { radius: 0.56, count: high ? 70 : 44, neighbours: 3, spin: -0.14, tilt: -0.6, packets: high ? 12 : 6 },
    ];
    this.layers = specs.map((s) => this.buildLayer(s));
    this.resize();
  }

  private wrap(program: WebGLProgram): Program {
    const gl = this.gl;
    return {
      program,
      aPos: gl.getAttribLocation(program, "aPos"),
      uProj: gl.getUniformLocation(program, "uProj"),
      uView: gl.getUniformLocation(program, "uView"),
      uSize: gl.getUniformLocation(program, "uSize"),
      uDpr: gl.getUniformLocation(program, "uDpr"),
      uColor: gl.getUniformLocation(program, "uColor"),
      uAlpha: gl.getUniformLocation(program, "uAlpha"),
      uSoft: gl.getUniformLocation(program, "uSoft"),
    };
  }

  private buildLayer(spec: LayerSpec): Layer {
    const gl = this.gl;
    const positions = fibonacciSphere(spec.count, spec.radius);
    const { edges, adjacency } = nearestEdges(positions, spec.neighbours);

    const linePositions = new Float32Array(edges.length * 3);
    for (let i = 0; i < edges.length; i++) {
      const n = edges[i];
      linePositions[i * 3] = positions[n * 3];
      linePositions[i * 3 + 1] = positions[n * 3 + 1];
      linePositions[i * 3 + 2] = positions[n * 3 + 2];
    }

    const makeBuffer = (data: Float32Array, usage: number) => {
      const b = gl.createBuffer();
      if (!b) throw new Error("createBuffer failed");
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, usage);
      return b;
    };

    const packetList: Packet[] = [];
    const edgeCount = edges.length / 2;
    for (let i = 0; i < spec.packets; i++) {
      const edge = Math.floor(Math.random() * edgeCount);
      packetList.push({ edge, from: edges[edge * 2], t: Math.random(), speed: 0.25 + Math.random() * 0.35 });
    }
    const packetData = new Float32Array(packetList.length * 3);

    return {
      ...spec,
      positions,
      edges,
      adjacency,
      nodeBuffer: makeBuffer(positions, gl.STATIC_DRAW),
      lineBuffer: makeBuffer(linePositions, gl.STATIC_DRAW),
      packetBuffer: makeBuffer(packetData, gl.DYNAMIC_DRAW),
      packetList,
      packetData,
    };
  }

  private onLost = (e: Event) => {
    e.preventDefault();
    this.lost = true;
    cancelAnimationFrame(this.raf);
  };

  private onRestored = () => {
    this.lost = false;
    this.init();
    if (this.running) {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.loop);
    } else {
      this.renderFrame();
    }
  };

  resize(): void {
    const { canvas, gl } = this;
    const rect = canvas.getBoundingClientRect();
    const cap = this.opts.tier === "high" ? 1.5 : 1;
    this.dpr = Math.min(window.devicePixelRatio || 1, cap);
    const w = Math.max(1, Math.round(rect.width * this.dpr));
    const h = Math.max(1, Math.round(rect.height * this.dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    this.proj = perspective(0.55, w / h, 0.1, 20);
    if (!this.running) this.renderFrame();
  }

  setColors(colors: LatticeColors): void {
    this.opts.colors = colors;
    if (!this.running) this.renderFrame();
  }

  /** Pointer in normalised device coords (-1..1). */
  setPointer(x: number, y: number): void {
    this.pointer.x = x;
    this.pointer.y = y;
  }

  start(): void {
    if (this.opts.tier === "static") {
      this.renderFrame();
      return;
    }
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy(): void {
    this.stop();
    this.canvas.removeEventListener("webglcontextlost", this.onLost);
    this.canvas.removeEventListener("webglcontextrestored", this.onRestored);
    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }

  /* ---------- frame ---------- */

  private loop = (now: number) => {
    if (!this.running || this.lost) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.time += dt;
    this.step(dt);
    this.renderFrame();
    this.raf = requestAnimationFrame(this.loop);
  };

  private step(dt: number) {
    const k = 1 - Math.pow(0.001, dt);
    this.pointerEased.x += (this.pointer.x - this.pointerEased.x) * k * 0.6;
    this.pointerEased.y += (this.pointer.y - this.pointerEased.y) * k * 0.6;

    for (const layer of this.layers) {
      for (const p of layer.packetList) {
        p.t += p.speed * dt;
        if (p.t >= 1) {
          const a = layer.edges[p.edge * 2];
          const b = layer.edges[p.edge * 2 + 1];
          const arrived = p.from === a ? b : a;
          const options = layer.adjacency[arrived].filter((e) => e !== p.edge);
          p.edge = options.length ? options[Math.floor(Math.random() * options.length)] : p.edge;
          p.from = arrived;
          p.t = 0;
        }
      }
    }
  }

  private renderFrame() {
    if (this.lost) return;
    const gl = this.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const { colors } = this.opts;
    const px = this.pointerEased.x;
    const py = this.pointerEased.y;
    const base = translation(0, 0, -3.4);

    for (const layer of this.layers) {
      const outer = layer.radius === 1;
      const rot = multiply(
        rotationX(layer.tilt + py * 0.28),
        multiply(rotationY(this.time * layer.spin + px * 0.45), rotationZ(layer.tilt * 0.4))
      );
      const view = multiply(base, rot);

      // edges
      this.use(this.lineProg, view, colors.line, outer ? 0.28 : 0.2, 1, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, layer.lineBuffer);
      gl.vertexAttribPointer(this.lineProg.aPos, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINES, 0, layer.edges.length);

      // nodes
      this.use(this.pointProg, view, colors.node, 0.9, outer ? 2.6 : 2, 0.35);
      gl.bindBuffer(gl.ARRAY_BUFFER, layer.nodeBuffer);
      gl.vertexAttribPointer(this.pointProg.aPos, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, layer.positions.length / 3);

      // packets: interpolate along their current edge
      const d = layer.packetData;
      const P = layer.positions;
      layer.packetList.forEach((p, i) => {
        const a = layer.edges[p.edge * 2];
        const b = layer.edges[p.edge * 2 + 1];
        const from = p.from === a ? a : b;
        const to = p.from === a ? b : a;
        for (let c = 0; c < 3; c++) {
          d[i * 3 + c] = P[from * 3 + c] + (P[to * 3 + c] - P[from * 3 + c]) * p.t;
        }
      });
      gl.bindBuffer(gl.ARRAY_BUFFER, layer.packetBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, d);
      // halo, then core
      this.use(this.pointProg, view, colors.packet, 0.35, 12, 0.5);
      gl.vertexAttribPointer(this.pointProg.aPos, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, layer.packetList.length);
      this.use(this.pointProg, view, colors.packet, 1, 4.2, 0.3);
      gl.drawArrays(gl.POINTS, 0, layer.packetList.length);
    }
  }

  private use(p: Program, view: Mat4, color: RGB, alpha: number, size: number, soft: number) {
    const gl = this.gl;
    gl.useProgram(p.program);
    gl.enableVertexAttribArray(p.aPos);
    gl.uniformMatrix4fv(p.uProj, false, this.proj);
    gl.uniformMatrix4fv(p.uView, false, view);
    gl.uniform3f(p.uColor, color[0], color[1], color[2]);
    gl.uniform1f(p.uAlpha, alpha);
    gl.uniform1f(p.uSize, size);
    gl.uniform1f(p.uDpr, this.dpr);
    if (p.uSoft) gl.uniform1f(p.uSoft, soft);
  }
}
