import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
TEXT = "让界面看着顺眼，用着顺手。尺度风格密度适配隐藏分组排序筛选空白输入等待容错文案参考"
FAMILY = "SYSS Display"

src_dir = Path(sys.argv[1])
for weight in ["ExtraLight", "Light", "Normal", "Regular", "Medium", "Bold", "Heavy"]:
    font = TTFont(src_dir / f"ResourceHanRoundedCN-{weight}.ttf")
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    sub = subset.Subsetter(options)
    sub.populate(text=TEXT)
    sub.subset(font)
    name = font["name"]
    for rec in list(name.names):
        if rec.nameID in (1, 2, 3, 4, 6, 16, 17):
            name.removeNames(nameID=rec.nameID)
    name.setName(FAMILY, 1, 3, 1, 0x409)
    name.setName(weight, 2, 3, 1, 0x409)
    name.setName(f"{FAMILY} {weight}", 4, 3, 1, 0x409)
    name.setName(f"SYSSDisplay-{weight}", 6, 3, 1, 0x409)
    font.flavor = "woff2"
    out = ROOT / f"src/assets/fonts/display-{weight.lower()}.woff2"
    font.save(out)
    print(out.name, out.stat().st_size)
