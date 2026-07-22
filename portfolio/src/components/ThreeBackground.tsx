import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

interface ThreeBackgroundProps {
  theme: "light" | "dark";
}

/**
 * "Silk aurora" backdrop — a single fullscreen GLSL fragment shader.
 *
 * No floating objects, no lines: just slow, silky bands of brand color
 * (emerald / cyan / slate) flowing across the page, a soft light that
 * follows the pointer, and a faint drift tied to scroll. Pure ambiance —
 * it can never collide with text because it has no edges, and the shader
 * keeps the central content column calmer than the page margins.
 *
 * Honors prefers-reduced-motion (renders static frames, updates only on
 * scroll/theme/resize), pauses when the tab is hidden, disposes cleanly.
 */

const THEMES = {
  light: {
    // Saturated hues — pale pastels vanish on a near-white page, so light
    // mode needs deeper colors and more presence to match dark mode.
    c1: new THREE.Color("#059669"), // emerald-600
    c2: new THREE.Color("#0284c7"), // sky-600
    c3: new THREE.Color("#6366f1"), // indigo-500
    // Deep teal tint — on a white page the spotlight must darken, not
    // lighten, to be visible.
    spot: new THREE.Color("#0f766e"),
    intensity: 0.52,
    glow: 0.22,
  },
  dark: {
    // Luminous aurora over the deep navy page.
    c1: new THREE.Color("#10b981"), // emerald
    c2: new THREE.Color("#0ea5e9"), // cyan-blue
    c3: new THREE.Color("#6366f1"), // indigo
    // Bright emerald glow over the dark page.
    spot: new THREE.Color("#34d399"),
    intensity: 0.4,
    glow: 0.18,
  },
} as const;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;   // page scroll progress 0..1
  uniform float uAspect;
  uniform vec2  uMouse;    // eased pointer, 0..1 in screen space
  uniform vec3  uC1;
  uniform vec3  uC2;
  uniform vec3  uC3;
  uniform vec3  uSpotColor;
  uniform float uIntensity;
  uniform float uGlow;

  // -- value noise + fbm ---------------------------------------------------
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.55;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p = rot * p * 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vec2(vUv.x * uAspect, vUv.y);

    // Slow drift; scroll gently pushes the field upward for life while
    // navigating, pointer nudges the flow.
    float t = uTime * 0.045;
    vec2 flow = vec2(t * 0.7 + uMouse.x * 0.18,
                     uScroll * 0.9 - t * 0.4 + uMouse.y * 0.12);

    // Two coupled fbm fields -> silky, non-repeating bands.
    float n1 = fbm(uv * 1.25 + flow);
    float n2 = fbm(uv * 2.1 - flow.yx + n1 * 1.7);

    // Color: blend the three brand hues through the fields.
    vec3 col = mix(uC1, uC2, smoothstep(0.25, 0.8, n2));
    col = mix(col, uC3, smoothstep(0.55, 0.95, n1) * 0.7);

    // Aurora body.
    float aurora = smoothstep(0.42, 0.9, n1 * 0.62 + n2 * 0.52);

    // Keep the central content column calm; let margins carry the show.
    float cx = abs(vUv.x - 0.5) * 2.0;
    float edge = mix(0.3, 1.0, smoothstep(0.15, 0.9, cx));

    float alpha = aurora * uIntensity * edge;

    // Soft light following the pointer — wide and gentle, tinted with a
    // per-theme color so it reads on both white and navy pages.
    vec2 m = vec2(uMouse.x * uAspect, 1.0 - uMouse.y);
    float d = distance(uv, m);
    float spot = exp(-d * d * 1.5) * uGlow;
    col = mix(col, uSpotColor, clamp(spot * 3.0, 0.0, 1.0));
    alpha += spot;

    // Fine grain kills gradient banding.
    float grain = (hash(uv * 733.7 + fract(uTime)) - 0.5) * 0.05;
    alpha = max(alpha + grain * alpha, 0.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

const ThreeBackground = ({ theme }: ThreeBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Live theme without re-running the setup effect.
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // fullscreen gradient needs no MSAA
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const startTheme = THEMES[themeRef.current];
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uAspect: { value: width / height },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uC1: { value: startTheme.c1.clone() },
        uC2: { value: startTheme.c2.clone() },
        uC3: { value: startTheme.c3.clone() },
        uSpotColor: { value: startTheme.spot.clone() },
        uIntensity: { value: startTheme.intensity },
        uGlow: { value: startTheme.glow },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    quad.frustumCulled = false;
    scene.add(quad);

    const applyTheme = (t: "light" | "dark") => {
      const c = THEMES[t];
      (material.uniforms.uC1.value as THREE.Color).copy(c.c1);
      (material.uniforms.uC2.value as THREE.Color).copy(c.c2);
      (material.uniforms.uC3.value as THREE.Color).copy(c.c3);
      (material.uniforms.uSpotColor.value as THREE.Color).copy(c.spot);
      material.uniforms.uIntensity.value = c.intensity;
      material.uniforms.uGlow.value = c.glow;
    };
    let appliedTheme = themeRef.current;

    // --- inputs -------------------------------------------------------------
    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    const onPointerMove = (e: PointerEvent) => {
      mouseTarget.set(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let dirty = true; // reduced-motion mode renders only when dirty
    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      material.uniforms.uScroll.value = max > 0 ? window.scrollY / max : 0;
      dirty = true;
    };
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });

    const onResize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      material.uniforms.uAspect.value = width / height;
      readScroll();
    };
    window.addEventListener("resize", onResize);

    // --- loop ----------------------------------------------------------------
    const clock = new THREE.Clock();
    let elapsed = 0;
    let frameId = 0;
    let running = true;

    const animate = () => {
      if (!running) return;
      frameId = requestAnimationFrame(animate);

      if (themeRef.current !== appliedTheme) {
        applyTheme(themeRef.current);
        appliedTheme = themeRef.current;
        dirty = true;
      }

      if (prefersReducedMotion) {
        // Static image: repaint only when scroll/theme/resize changed.
        if (!dirty) return;
        dirty = false;
      } else {
        const delta = Math.min(clock.getDelta(), 0.05);
        elapsed += delta;
        material.uniforms.uTime.value = elapsed;
        const m = material.uniforms.uMouse.value as THREE.Vector2;
        m.lerp(mouseTarget, 0.045);
      }

      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frameId);
      } else if (!running) {
        running = true;
        clock.getDelta(); // drop the hidden-tab gap
        dirty = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    animate();

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
    // Theme changes are applied live via themeRef inside the loop.
  }, [prefersReducedMotion]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden
    />
  );
};

export default ThreeBackground;
