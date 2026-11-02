"""Render the site's typographic social preview using its self-hosted font."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
image = Image.new('RGB', (1200, 630), '#f7f6f2')
draw = ImageDraw.Draw(image)
font = ROOT / 'public/fonts/instrument-serif.ttf'
name = ImageFont.truetype(str(font), 136)
body = ImageFont.truetype(str(font), 43)
small = ImageFont.truetype(str(font), 30)
draw.text((76, 67), 'Yaechan Lee', font=name, fill='#242a28')
draw.line((80, 276, 1120, 276), fill='#d5d9cf', width=2)
draw.text((80, 330), 'AX leadership & building', font=body, fill='#242a28')
draw.text((80, 395), 'From a real problem to a working business.', font=body, fill='#656b65')
draw.text((80, 540), 'yclee.today', font=small, fill='#9c3f27')
image.save(ROOT / 'public/og-image.png', optimize=True)
