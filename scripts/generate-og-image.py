"""Render a social preview in the site's sans-serif type and neutral/cobalt palette.

Requires Pillow and fonttools[woff]. Uses the same bundled font as the website.
"""
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
font = TTFont(ROOT / 'public/fonts/pretendard-variable.woff2')
font.flavor = None
buffer = BytesIO()
font.save(buffer)
font_data = buffer.getvalue()

def face(size):
    return ImageFont.truetype(BytesIO(font_data), size)

image = Image.new('RGB', (1200, 630), '#fcfcfc')
draw = ImageDraw.Draw(image)
draw.rectangle((64, 58, 116, 110), fill='#18202b')
draw.text((76, 56), 'y.', font=face(42), fill='white')
draw.text((136, 68), '이예찬  /  Yaechan Lee', font=face(24), fill='#18202b')
draw.text((64, 192), 'AI 사업을 이끌고,', font=face(62), fill='#18202b')
draw.text((64, 276), '제품을 직접 만듭니다.', font=face(62), fill='#586372')
draw.line((64, 433, 1136, 433), fill='#dce1e7', width=2)
draw.text((64, 466), 'FSK  /  SK On STRIX  /  Argus', font=face(25), fill='#586372')
draw.text((64, 550), 'yclee.today', font=face(23), fill='#2255d9')
draw.text((775, 550), 'Partner / Enterprise AX', font=face(23), fill='#18202b')
image.save(ROOT / 'public/og-image.png', optimize=True)
