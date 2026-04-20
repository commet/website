"""Crop strix-feedback.jpeg to show the PM's actual reply (the quoted evidence)."""
from pathlib import Path
from PIL import Image

SRC = Path(r"C:/Users/admin/documents/github/website/public/images/strix-feedback.jpeg")
DST = Path(r"C:/Users/admin/documents/github/website/public/images/strix-feedback-quote.jpeg")

im = Image.open(SRC)
W, H = im.size
print(f"original: {W}x{H}")

# PM's final reply (with the quote "제 기준으로 삽질할 1달은 아꼈어요")
# sits in the bottom ~25% of the image. Include a small tail of yellow bubbles
# above so the reader sees "this was a reply to me".
top = int(H * 0.76)
cropped = im.crop((0, top, W, H))
print(f"cropped: {cropped.size}")
cropped.save(DST, "JPEG", quality=88, optimize=True)
print(f"saved: {DST.stat().st_size / 1024:.1f} KB")
