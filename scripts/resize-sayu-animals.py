"""Resize SAYU personality-animal PNGs to web-optimized WebP."""
import re
from pathlib import Path
from PIL import Image

SRC = Path(r"C:/Users/admin/documents/github/SAYU/public/images/personality-animals/main")
DST = Path(r"C:/Users/admin/documents/github/website/public/images/sayu")
SIZE = 256

DST.mkdir(parents=True, exist_ok=True)

pattern = re.compile(r"^(\d+)\.\s+([A-Z]+)\s+\(([A-Za-z]+)\)\.png$")

manifest = []
for png in sorted(SRC.glob("*.png")):
    m = pattern.match(png.name)
    if not m:
        print(f"skip: {png.name}")
        continue
    idx, apt, animal = int(m.group(1)), m.group(2), m.group(3).lower()
    slug = f"{apt.lower()}-{animal}"
    out = DST / f"{slug}.webp"

    img = Image.open(png).convert("RGBA")
    img.thumbnail((SIZE, SIZE), Image.LANCZOS)
    img.save(out, "WEBP", quality=85, method=6)

    size_kb = out.stat().st_size / 1024
    manifest.append((idx, apt, animal.capitalize(), slug))
    print(f"{apt} ({animal}): {size_kb:.1f} KB")

manifest.sort()
print("\n--- manifest ---")
for idx, apt, animal, slug in manifest:
    print(f"{{ apt: '{apt}', animal: '{animal}', slug: '{slug}' }},")
