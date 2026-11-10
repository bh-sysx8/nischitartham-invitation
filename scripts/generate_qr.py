#!/usr/bin/env python3
"""Regenerates assets/qr.png from the publicUrl in js/config.js.

Usage:
    pip install qrcode[pil]
    python3 scripts/generate_qr.py
"""
import os
import re
import sys

try:
    import qrcode
except ImportError:
    sys.exit("Missing dependency. Run:  pip install 'qrcode[pil]'")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.path.join(ROOT, "js", "config.js")
OUT = os.path.join(ROOT, "assets", "qr.png")

source = open(CONFIG, encoding="utf-8").read()
match = re.search(r"publicUrl:\s*'([^']+)'", source)
if not match:
    sys.exit("Could not find publicUrl in js/config.js")

url = match.group(1).strip()
if not url.startswith("https://"):
    sys.exit("publicUrl must start with https:// — got: " + url)

qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_M,
    box_size=14,
    border=3,
)
qr.add_data(url)
qr.make(fit=True)
qr.make_image(fill_color="#292720", back_color="#FFFFFF").save(OUT)

print(f"Wrote {OUT}\n  URL: {url}\n  Modules: {qr.modules_count}x{qr.modules_count}")
print("Commit the new assets/qr.png and scan it with a phone to confirm.")
