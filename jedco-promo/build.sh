#!/usr/bin/env bash
# ============================================================================
#  Build the JEDCO promo video.
#  Edit src/config.ts for asset names, timing, copy and colours — NOT this file.
#  Usage:  ./build.sh              -> renders out/jedco-promo.mp4
#          OUT=foo.mp4 ./build.sh  -> custom output path
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")"

OUT="${OUT:-out/jedco-promo.mp4}"
COMP="JedcoPromo"

# Remotion needs a Chromium. On this managed environment one is pre-installed;
# on your own machine, remove BROWSER so Remotion auto-detects/downloads it.
BROWSER="${BROWSER:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}"
BROWSER_FLAG=""
if [ -x "$BROWSER" ]; then
  BROWSER_FLAG="--browser-executable=$BROWSER"
fi

mkdir -p out
echo "Rendering $COMP -> $OUT ..."
npx remotion render "$COMP" "$OUT" \
  --codec=h264 \
  --log=error \
  $BROWSER_FLAG

# Finalize: clamp container duration to exactly the spec length. The video
# track is already frame-exact (durationInSeconds*fps frames); this trims any
# trailing AAC padding. Uses a system ffmpeg if present, else Remotion's.
FFMPEG="$(command -v ffmpeg || true)"
if [ -z "$FFMPEG" ]; then
  FFMPEG="$(ls ../broski-video/node_modules/@remotion/compositor-*/ffmpeg 2>/dev/null | head -1 || true)"
fi
if [ -n "$FFMPEG" ] && [ -x "$FFMPEG" ]; then
  "$FFMPEG" -y -i "$OUT" -t 30 -c copy -movflags +faststart "$OUT.tmp.mp4" >/dev/null 2>&1 \
    && mv "$OUT.tmp.mp4" "$OUT"
fi

echo "Done: $OUT"
