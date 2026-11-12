from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
CODEPOINTS = [0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026]

JOBS = {
    "noto-sans-sc": "cjk-punct-sans.woff2",
    "noto-serif-sc": "cjk-punct-serif.woff2",
}

for pkg, out_name in JOBS.items():
    src = ROOT / f"node_modules/@fontsource-variable/{pkg}/files/{pkg}-latin-wght-normal.woff2"
    font = TTFont(src)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = False
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=CODEPOINTS)
    subsetter.subset(font)
    out = ROOT / "src/assets/fonts" / out_name
    font.flavor = "woff2"
    font.save(out)
    print(f"{out.relative_to(ROOT)}  {out.stat().st_size} bytes")
