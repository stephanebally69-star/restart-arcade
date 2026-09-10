"""Génère src/app/themes.css et src/lib/themes.ts depuis une seule définition."""
import json

import os
ROOT = os.path.join(os.path.dirname(__file__), '..', 'src')

F = {  # variables de police exposées par src/lib/fonts.ts
    'inter': "var(--ff-inter), ui-sans-serif, system-ui, sans-serif",
    'fraunces': "var(--ff-fraunces), Georgia, serif",
    'space': "var(--ff-space), ui-sans-serif, system-ui, sans-serif",
    'orbitron': "var(--ff-orbitron), ui-sans-serif, sans-serif",
    'audiowide': "var(--ff-audiowide), ui-sans-serif, sans-serif",
    'chakra': "var(--ff-chakra), ui-sans-serif, sans-serif",
    'press': "var(--ff-press), ui-monospace, monospace",
    'silkscreen': "var(--ff-silkscreen), ui-monospace, monospace",
    'spacemono': "var(--ff-spacemono), ui-monospace, monospace",
    'bungee': "var(--ff-bungee), ui-sans-serif, sans-serif",
    'dmsans': "var(--ff-dmsans), ui-sans-serif, system-ui, sans-serif",
    'righteous': "var(--ff-righteous), ui-sans-serif, sans-serif",
    'outfit': "var(--ff-outfit), ui-sans-serif, system-ui, sans-serif",
    'vt323': "var(--ff-vt323), ui-monospace, monospace",
    'plexmono': "var(--ff-plexmono), ui-monospace, monospace",
    'fredoka': "var(--ff-fredoka), ui-rounded, ui-sans-serif, sans-serif",
}
FONT_LABEL = {
    'inter': 'Inter', 'fraunces': 'Fraunces', 'space': 'Space Grotesk', 'orbitron': 'Orbitron',
    'audiowide': 'Audiowide', 'chakra': 'Chakra Petch', 'press': 'Press Start 2P',
    'silkscreen': 'Silkscreen', 'spacemono': 'Space Mono', 'bungee': 'Bungee',
    'dmsans': 'DM Sans', 'righteous': 'Righteous', 'outfit': 'Outfit', 'vt323': 'VT323',
    'plexmono': 'IBM Plex Mono', 'fredoka': 'Fredoka',
}

# id, nom, description, schéma, couleurs, fond de page, polices (titre, texte),
# ajustement de taille des titres (font-size-adjust) et lueur des italiques.
THEMES = [
    dict(id='borne', name='Borne', desc='Nuit bleutée, magenta et cyan', scheme='dark',
         bg='#0b0d17', bg2='#10131f', surface='#151a2a', surface2='#1c2236',
         text='#e8ebf5', soft='#c3c8da', muted='#8e95ad', heading='#ffffff',
         primary='#ff2e93', pfg='#ffffff', accent='#22e3ff', price='#ffd23f',
         brand=('#d61f7c', '#5b2bd6'), footer='#06070d',
         border='rgba(255,255,255,0.08)', input='rgba(255,255,255,0.16)',
         page='radial-gradient(1100px 520px at 50% -8%, rgba(255,46,147,0.16), transparent 65%), '
              'radial-gradient(900px 500px at 100% 100%, rgba(34,227,255,0.07), transparent 60%)',
         head='space', body='inter', glow='0 0 18px rgba(34,227,255,0.4)'),
    dict(id='synthwave', name='Synthwave', desc='Coucher de soleil rétro 80s', scheme='dark',
         bg='#1a0b2e', bg2='#1f0d38', surface='#2a1248', surface2='#34175a',
         text='#f6e9ff', soft='#dcc7f2', muted='#a98bc9', heading='#ffffff',
         primary='#ff3cac', pfg='#ffffff', accent='#2de2e6', price='#f9c80e',
         brand=('#ff3cac', '#784ba0'), footer='#10061d',
         border='rgba(255,255,255,0.1)', input='rgba(255,255,255,0.2)',
         page='radial-gradient(900px 420px at 50% 0%, rgba(255,110,64,0.30), transparent 60%), '
              'linear-gradient(180deg, #1a0b2e 0%, #26104a 50%, #150823 100%)',
         head='orbitron', body='inter', adjust='0.5', glow='0 0 20px rgba(255,60,172,0.6)'),
    dict(id='tron', name='Grille', desc='Lignes lumineuses façon Tron', scheme='dark',
         bg='#03060d', bg2='#060b16', surface='#0a1222', surface2='#0f1a30',
         text='#d9f7ff', soft='#a9d8e6', muted='#6f93a3', heading='#ffffff',
         primary='#00e5ff', pfg='#001018', accent='#ff9f1c', price='#ffd166',
         brand=('#023e8a', '#0077b6'), footer='#010306',
         border='rgba(0,229,255,0.14)', input='rgba(0,229,255,0.3)',
         page='radial-gradient(1000px 480px at 50% -10%, rgba(0,229,255,0.18), transparent 62%), '
              'linear-gradient(rgba(0,229,255,0.045) 1px, transparent 1px), '
              'linear-gradient(90deg, rgba(0,229,255,0.045) 1px, transparent 1px)',
         size='auto, 64px 64px, 64px 64px',
         head='audiowide', body='chakra', adjust='0.5', glow='0 0 16px rgba(255,159,28,0.55)'),
    dict(id='pixel', name='Pixel', desc='Salle de jeux 8 bits', scheme='dark',
         bg='#1b1b2f', bg2='#20203a', surface='#262645', surface2='#2e2e52',
         text='#f0f0ff', soft='#cfcfee', muted='#9a9ac4', heading='#ffffff',
         primary='#ff5f5f', pfg='#1b1b2f', accent='#7cffcb', price='#ffe066',
         brand=('#c0392b', '#6c3483'), footer='#121222',
         border='rgba(255,255,255,0.1)', input='rgba(255,255,255,0.2)',
         page='radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1.5px)',
         size='22px 22px',
         head='press', body='inter', adjust='0.34', tracking='0',
         glow='3px 3px 0 rgba(255,95,95,0.55)'),
    dict(id='gameboy', name='Game Boy', desc='Écran vert LCD, 4 teintes', scheme='light',
         bg='#c4cfa1', bg2='#b6c28d', surface='#d3dcb5', surface2='#aebb82',
         text='#0f380f', soft='#1f4a1f', muted='#3d6b3d', heading='#0f380f',
         primary='#306230', pfg='#e0f0b8', accent='#4d7c0f', price='#0f380f',
         brand=('#0f380f', '#306230'), footer='#0f380f',
         border='rgba(15,56,15,0.18)', input='rgba(15,56,15,0.3)',
         page='radial-gradient(rgba(15,56,15,0.09) 1px, transparent 1.3px)',
         size='5px 5px',
         head='silkscreen', body='spacemono', adjust='0.46', tracking='0', glow='none'),
    dict(id='pacman', name='Pac-Man', desc='Labyrinthe bleu et pac-gommes', scheme='dark',
         bg='#000000', bg2='#05050d', surface='#0b0b1c', surface2='#13132c',
         text='#f2f2ff', soft='#cfd0f5', muted='#8c8ec4', heading='#ffe600',
         primary='#ffe600', pfg='#000000', accent='#ff5ec4', price='#ffb847',
         brand=('#2121de', '#0b0b7a'), footer='#000000',
         border='rgba(77,107,255,0.4)', input='rgba(77,107,255,0.55)',
         page='radial-gradient(circle, rgba(255,230,0,0.16) 2px, transparent 2.6px)',
         size='44px 44px',
         head='bungee', body='dmsans', adjust='0.52', tracking='0',
         glow='0 0 14px rgba(255,94,196,0.6)'),
    dict(id='bowling', name='Bowling 70s', desc='Crème, orange et turquoise', scheme='light',
         bg='#fff4e0', bg2='#fde7c4', surface='#fffaf0', surface2='#f8dfb6',
         text='#3b1f0e', soft='#5e3a22', muted='#8a6246', heading='#3b1f0e',
         primary='#e4572e', pfg='#ffffff', accent='#12908d', price='#c1121f',
         brand=('#c2410c', '#7c2d12'), footer='#3b1f0e',
         border='rgba(59,31,14,0.12)', input='rgba(59,31,14,0.22)',
         page='radial-gradient(900px 500px at 0% 0%, rgba(228,87,46,0.18), transparent 60%), '
              'radial-gradient(800px 500px at 100% 100%, rgba(23,163,160,0.14), transparent 60%)',
         head='righteous', body='dmsans', tracking='0', glow='none'),
    dict(id='clair', name='Arcade clair', desc='Blanc net, magenta et bleu', scheme='light',
         bg='#f7f8fc', bg2='#eef0f7', surface='#ffffff', surface2='#eceff7',
         text='#1b1d2a', soft='#3d4157', muted='#6b7089', heading='#0f1020',
         primary='#ff2e93', pfg='#ffffff', accent='#0088c2', price='#e85d04',
         brand=('#ff2e93', '#7b2cff'), footer='#0f1020',
         border='rgba(15,16,32,0.08)', input='rgba(15,16,32,0.16)',
         page='radial-gradient(1000px 480px at 50% -10%, rgba(255,46,147,0.10), transparent 62%), '
              'radial-gradient(900px 500px at 100% 100%, rgba(0,150,199,0.08), transparent 60%)',
         head='outfit', body='outfit', glow='none'),
    dict(id='papier', name='Papier', desc='Crème & indigo, façon Ma Belle Note', scheme='light',
         bg='#faf6ee', bg2='#f4ecda', surface='#fffdf7', surface2='#f4ecda',
         text='#1a1530', soft='#3a3556', muted='#625e78', heading='#1e1b4b',
         primary='#1e1b4b', pfg='#f6d896', accent='#b0791f', price='#9a6b1c',
         brand=('#1e1b4b', '#3b3490'), footer='#1e1b4b',
         border='rgba(30,27,75,0.1)', input='rgba(30,27,75,0.18)',
         page='radial-gradient(circle at 20% 10%, rgba(232,178,82,0.10), transparent 40%), '
              'radial-gradient(circle at 90% 80%, rgba(91,82,200,0.07), transparent 45%)',
         head='fraunces', body='inter', glow='none'),
    dict(id='crt', name='Écran ambre', desc='Moniteur cathodique monochrome', scheme='dark',
         bg='#0d0802', bg2='#120b03', surface='#1a1105', surface2='#231708',
         text='#ffcf7a', soft='#f0b95c', muted='#b98a3e', heading='#ffb000',
         primary='#ffb000', pfg='#1a0e00', accent='#ff7a1a', price='#ffd27a',
         brand=('#8a3b00', '#4a1f00'), footer='#070401',
         border='rgba(255,176,0,0.18)', input='rgba(255,176,0,0.3)',
         page='repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px), '
              'radial-gradient(ellipse at center, rgba(255,176,0,0.08), transparent 70%)',
         head='vt323', body='plexmono', adjust='0.62', tracking='0',
         glow='0 0 12px rgba(255,176,0,0.7)'),
    dict(id='bubblegum', name='Bubblegum', desc='Rose bonbon et violet', scheme='light',
         bg='#fff0f7', bg2='#ffe3f1', surface='#ffffff', surface2='#ffe3f1',
         text='#3a1340', soft='#5b2a63', muted='#8d5f93', heading='#3a1340',
         primary='#7b2cff', pfg='#ffffff', accent='#e0197d', price='#c2006a',
         brand=('#ff4fa3', '#7b2cff'), footer='#2a0e33',
         border='rgba(58,19,64,0.1)', input='rgba(58,19,64,0.2)',
         page='radial-gradient(900px 500px at 0% 0%, rgba(255,160,210,0.45), transparent 60%), '
              'radial-gradient(800px 500px at 100% 100%, rgba(190,160,255,0.35), transparent 60%)',
         head='fredoka', body='dmsans', tracking='0', glow='none'),
    dict(id='cyberpunk', name='Cyberpunk', desc='Jaune néon, rouge et cyan', scheme='dark',
         bg='#0e0e10', bg2='#131316', surface='#1a1a1f', surface2='#222228',
         text='#eaeaea', soft='#c8c8c8', muted='#8f8f98', heading='#fcee0a',
         primary='#fcee0a', pfg='#0e0e10', accent='#00f0ff', price='#ff335f',
         brand=('#ff003c', '#7a00ff'), footer='#070708',
         border='rgba(252,238,10,0.14)', input='rgba(252,238,10,0.28)',
         page='linear-gradient(135deg, rgba(252,238,10,0.08) 0%, transparent 35%), '
              'radial-gradient(800px 400px at 100% 100%, rgba(0,240,255,0.08), transparent 60%)',
         head='chakra', body='chakra', tracking='0.01em', glow='0 0 14px rgba(0,240,255,0.55)'),
]

DEFAULT = 'borne'


def block(t):
    v = {
        '--t-bg': t['bg'], '--t-bg-2': t['bg2'], '--t-surface': t['surface'],
        '--t-surface-2': t['surface2'], '--t-text': t['text'], '--t-text-soft': t['soft'],
        '--t-text-muted': t['muted'], '--t-heading': t['heading'], '--t-primary': t['primary'],
        '--t-primary-fg': t['pfg'], '--t-accent': t['accent'], '--t-price': t['price'],
        '--t-brand-from': t['brand'][0], '--t-brand-to': t['brand'][1], '--t-footer': t['footer'],
        '--t-border': t['border'], '--t-input': t['input'], '--t-page-bg': t['page'],
        '--t-page-bg-size': t.get('size', 'auto'), '--t-font-head': F[t['head']],
        '--t-font-body': F[t['body']], '--t-head-adjust': t.get('adjust', 'none'),
        '--t-head-tracking': t.get('tracking', '-0.02em'), '--t-em-glow': t['glow'],
    }
    return '\n'.join(f'  {k}: {val};' for k, val in v.items())


css = ['/* Généré par gen_themes.py — ne pas éditer à la main. */', '']
d = next(t for t in THEMES if t['id'] == DEFAULT)
css.append(f':root {{\n{block(d)}\n}}\n')
for t in THEMES:
    css.append(f':root[data-theme="{t["id"]}"] {{\n{block(t)}\n}}\n')
open(ROOT + r'\app\themes.css', 'w', encoding='utf-8').write('\n'.join(css))

meta = [dict(id=t['id'], name=t['name'], desc=t['desc'], scheme=t['scheme'],
             font=FONT_LABEL[t['head']], headFont=F[t['head']],
             swatches=[t['bg'], t['primary'], t['accent'], t['price']]) for t in THEMES]
ts = f'''// Généré par gen_themes.py — ne pas éditer à la main.
// Les valeurs de couleur et de police vivent dans src/app/themes.css.

export type ThemeMeta = {{
  id: string
  name: string
  desc: string
  scheme: 'light' | 'dark'
  font: string
  headFont: string
  swatches: string[]
}}

export const DEFAULT_THEME = '{DEFAULT}'
export const THEME_STORAGE_KEY = 'restart-theme'

export const themes: ThemeMeta[] = {json.dumps(meta, ensure_ascii=False, indent=2)}
'''
open(ROOT + r'\lib\themes.ts', 'w', encoding='utf-8').write(ts)
print(len(THEMES), 'thèmes générés')
