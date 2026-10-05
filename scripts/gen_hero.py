"""Génère les visuels du carrousel d'accueil : un par gamme, au format 16:9.

Sources : photos d'installations clients (public/img/realisations), visuels
d'ambiance (public/img/ambiance) et photos produits en situation (public/produits).
Les recadrages évitent les pastilles incrustées sur les photos clients (logo
RESTART en haut à droite, localisation et logo client en bas).

Sortie : public/img/hero/<univers>.webp (1600 × 900)

Usage : python scripts/gen_hero.py
"""
import os

from PIL import Image, ImageEnhance, ImageFilter

ROOT = os.path.join(os.path.dirname(__file__), '..', 'public')
OUT = os.path.join(ROOT, 'img', 'hero')
W, H = 1600, 900


def src(path):
    return Image.open(os.path.join(ROOT, path)).convert('RGB')


def band(path, top, left=0, width=None):
    """Bande 16:9 découpée dans une photo, à partir de `top` (pixels source)."""
    im = src(path)
    width = width or im.width - left
    height = round(width * 9 / 16)
    return im.crop((left, top, left + width, top + height)).resize((W, H), Image.LANCZOS)


def blur_fill(path):
    """Photo verticale posée entière au centre, sur un fond tiré d'elle-même et flouté."""
    im = src(path)
    scale = max(W / im.width, H / im.height)
    bg = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    bg = bg.crop(((bg.width - W) // 2, (bg.height - H) // 2, (bg.width - W) // 2 + W, (bg.height - H) // 2 + H))
    bg = ImageEnhance.Brightness(bg.filter(ImageFilter.GaussianBlur(40))).enhance(0.72)
    fg = im.resize((round(im.width * H / im.height), H), Image.LANCZOS)
    bg.paste(fg, ((W - fg.width) // 2, 0))
    return bg


VISUALS = {
    'borne-arcade': lambda: band('img/ambiance/5.webp', top=96),
    'flipper-numerique': lambda: blur_fill('produits/flipper-numerique/0.webp'),
    'flechettes': lambda: band('img/realisations/r149.webp', top=170),
    'baby-foot': lambda: band('img/realisations/r35.webp', top=380),
    'billard': lambda: band('img/realisations/r126.webp', top=390),
    'fauteuil-massant': lambda: band('img/ambiance/0.webp', top=330, left=0, width=960),
    'cocon-de-repos': lambda: band('produits/cocon-de-repos/3.webp', top=110),
}

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for slug, make in VISUALS.items():
        make().save(os.path.join(OUT, f'{slug}.webp'), quality=82, method=6)
        print(slug)
