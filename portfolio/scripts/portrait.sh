#!/bin/sh
# Generates responsive portrait variants from the source photo.
# Requires ImageMagick (`convert`). Output: public/portrait/portrait-{w}.{webp,jpg}
set -e
SRC="${1:-public/karabala.jpeg}"
OUT="public/portrait"
mkdir -p "$OUT"
for W in 400 640 900 1024; do
  convert "$SRC" -strip -resize "${W}x" -quality 82 "$OUT/portrait-${W}.webp"
  convert "$SRC" -strip -resize "${W}x" -sampling-factor 4:2:0 -interlace Plane -quality 78 "$OUT/portrait-${W}.jpg"
done
# Tiny blurred placeholder used as the low-quality image placeholder (LQIP).
convert "$SRC" -strip -resize 24x -quality 50 "$OUT/portrait-lqip.jpg"
ls -la "$OUT"
