"""Generate a 1200x630 OG image for social sharing."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

DST = Path(r"C:/Users/admin/documents/github/website/public/og-image.png")

W, H = 1200, 630
bg = (250, 250, 248)          # #FAFAF8 warm-bg
dark = (28, 25, 23)            # #1C1917 stone-900
muted = (120, 113, 108)        # #78716C stone-500
accent = (196, 112, 63)        # #C4703F

title_font = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 104)
tag_font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 36)
body_font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 30)
url_font = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 24)

img = Image.new("RGB", (W, H), bg)
draw = ImageDraw.Draw(img)

# Left accent bar
draw.rectangle((0, 0, 12, H), fill=accent)

# Tagline (eyebrow)
x = 88
y = 110
draw.text((x, y), "ENTERPRISE AI  ·  STRATEGY  ·  CURATION", fill=accent, font=tag_font)
y += 64

# Name
draw.text((x, y), "Yaechan Lee", fill=dark, font=title_font)
y += 152

# Body lines
for line in [
    "Built STRIX at SK On — a Claude-powered RAG reaching 1,000+ employees",
    "through SK Group's mySUNI, running daily in the strategy division.",
]:
    draw.text((x, y), line, fill=muted, font=body_font)
    y += 46

# URL at bottom-right
url = "yclee.today"
bbox = draw.textbbox((0, 0), url, font=url_font)
url_w = bbox[2] - bbox[0]
draw.text((W - url_w - 88, H - 68), url, fill=dark, font=url_font)

img.save(DST, "PNG", optimize=True)
print(f"saved: {DST.stat().st_size / 1024:.1f} KB")
