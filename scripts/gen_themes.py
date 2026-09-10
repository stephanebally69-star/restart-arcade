"""Génère les thèmes du site depuis une seule définition.

Sorties :
  - src/app/themes.css : primitives --t-* de chaque thème
  - src/lib/themes.ts  : métadonnées pour le sélecteur (thèmes + polices)
  - src/lib/fonts.ts   : chargement des polices via next/font

Usage : python scripts/gen_themes.py
"""
import json
import os

ROOT = os.path.join(os.path.dirname(__file__), '..', 'src')

# --- Polices ------------------------------------------------------------------
# id : (libellé, import next/font ou 'local:<fichier>', options, repli CSS,
#       font-size-adjust des titres, interlettrage des titres)
FONTS = {
    'inter': ('Inter', 'local:inter-variable.woff2', "weight: '100 900'", 'ui-sans-serif, system-ui, sans-serif', 'none', '-0.02em'),
    'fraunces': ('Fraunces', 'local:fraunces-variable.woff2', "weight: '100 900'", 'Georgia, serif', 'none', '-0.02em'),
    'space': ('Space Grotesk', 'Space_Grotesk', '', 'ui-sans-serif, system-ui, sans-serif', 'none', '-0.02em'),
    'outfit': ('Outfit', 'Outfit', '', 'ui-sans-serif, system-ui, sans-serif', 'none', '-0.02em'),
    'dmsans': ('DM Sans', 'DM_Sans', '', 'ui-sans-serif, system-ui, sans-serif', 'none', '-0.02em'),
    'exo2': ('Exo 2', 'Exo_2', '', 'ui-sans-serif, system-ui, sans-serif', 'none', '-0.01em'),
    'kanit': ('Kanit', 'Kanit', "weight: ['400', '500', '600', '700']", 'ui-sans-serif, sans-serif', 'none', '-0.01em'),
    'rajdhani': ('Rajdhani', 'Rajdhani', "weight: ['400', '500', '600', '700']", 'ui-sans-serif, sans-serif', 'none', '0'),
    'baloo': ('Baloo 2', 'Baloo_2', '', 'ui-rounded, ui-sans-serif, sans-serif', 'none', '-0.01em'),
    'fredoka': ('Fredoka', 'Fredoka', '', 'ui-rounded, ui-sans-serif, sans-serif', 'none', '0'),
    'chakra': ('Chakra Petch', 'Chakra_Petch', "weight: ['400', '500', '600', '700']", 'ui-sans-serif, sans-serif', 'none', '0'),
    'orbitron': ('Orbitron', 'Orbitron', '', 'ui-sans-serif, sans-serif', '0.5', '0'),
    'audiowide': ('Audiowide', 'Audiowide', "weight: '400'", 'ui-sans-serif, sans-serif', '0.5', '0'),
    'russo': ('Russo One', 'Russo_One', "weight: '400'", 'ui-sans-serif, sans-serif', '0.5', '0'),
    'righteous': ('Righteous', 'Righteous', "weight: '400'", 'ui-sans-serif, sans-serif', 'none', '0'),
    'bungee': ('Bungee', 'Bungee', "weight: '400'", 'ui-sans-serif, sans-serif', '0.52', '0'),
    'bebas': ('Bebas Neue', 'Bebas_Neue', "weight: '400'", 'Impact, ui-sans-serif, sans-serif', '0.62', '0.02em'),
    'luckiest': ('Luckiest Guy', 'Luckiest_Guy', "weight: '400'", 'ui-rounded, sans-serif', '0.5', '0.01em'),
    'press': ('Press Start 2P', 'Press_Start_2P', "weight: '400'", 'ui-monospace, monospace', '0.34', '0'),
    'pixelify': ('Pixelify Sans', 'Pixelify_Sans', '', 'ui-monospace, monospace', 'none', '0'),
    'silkscreen': ('Silkscreen', 'Silkscreen', "weight: ['400', '700']", 'ui-monospace, monospace', '0.46', '0'),
    'vt323': ('VT323', 'VT323', "weight: '400'", 'ui-monospace, monospace', '0.62', '0'),
    'spacemono': ('Space Mono', 'Space_Mono', "weight: ['400', '700']", 'ui-monospace, monospace', 'none', '0'),
    'sharetech': ('Share Tech Mono', 'Share_Tech_Mono', "weight: '400'", 'ui-monospace, monospace', 'none', '0'),
    'plexmono': ('IBM Plex Mono', 'IBM_Plex_Mono', "weight: ['400', '500', '600']", 'ui-monospace, monospace', 'none', '0'),
}
PRELOADED = {'inter', 'space'}  # polices du thème par défaut


def stack(fid):
    return f'var(--ff-{fid}), {FONTS[fid][3]}'


# --- Thèmes -------------------------------------------------------------------
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
         head='orbitron', body='inter', glow='0 0 20px rgba(255,60,172,0.6)'),
    dict(id='outrun', name='Outrun', desc='Route au néon, orange et turquoise', scheme='dark',
         bg='#0d0221', bg2='#12042b', surface='#1a0838', surface2='#230c48',
         text='#f7ecff', soft='#dac6f0', muted='#a18ac0', heading='#ffffff',
         primary='#ff6c11', pfg='#140400', accent='#2de2e6', price='#ff3864',
         brand=('#ff3864', '#541388'), footer='#07010f',
         border='rgba(255,108,17,0.16)', input='rgba(255,108,17,0.32)',
         page='radial-gradient(1200px 500px at 50% 115%, rgba(255,108,17,0.28), transparent 60%), '
              'radial-gradient(900px 400px at 50% -10%, rgba(255,56,100,0.18), transparent 60%)',
         head='russo', body='exo2', glow='0 0 18px rgba(45,226,230,0.55)'),
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
         head='audiowide', body='chakra', glow='0 0 16px rgba(255,159,28,0.55)'),
    dict(id='invaders', name='Invaders', desc='Vert phosphore et magenta', scheme='dark',
         bg='#050a05', bg2='#081008', surface='#0c180c', surface2='#122212',
         text='#d8ffd0', soft='#b4e8aa', muted='#76a86c', heading='#39ff14',
         primary='#39ff14', pfg='#031a03', accent='#ff2bd6', price='#ffe600',
         brand=('#0b6e00', '#063d00'), footer='#020502',
         border='rgba(57,255,20,0.16)', input='rgba(57,255,20,0.32)',
         page='repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 3px), '
              'radial-gradient(1000px 500px at 50% -10%, rgba(57,255,20,0.14), transparent 62%)',
         head='pixelify', body='sharetech', glow='0 0 14px rgba(255,43,214,0.6)'),
    dict(id='pixel', name='Pixel', desc='Salle de jeux 8 bits', scheme='dark',
         bg='#1b1b2f', bg2='#20203a', surface='#262645', surface2='#2e2e52',
         text='#f0f0ff', soft='#cfcfee', muted='#9a9ac4', heading='#ffffff',
         primary='#ff5f5f', pfg='#1b1b2f', accent='#7cffcb', price='#ffe066',
         brand=('#c0392b', '#6c3483'), footer='#121222',
         border='rgba(255,255,255,0.1)', input='rgba(255,255,255,0.2)',
         page='radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1.5px)',
         size='22px 22px',
         head='press', body='inter', glow='3px 3px 0 rgba(255,95,95,0.55)'),
    dict(id='tetris', name='Tetris', desc='Blocs colorés sur puits sombre', scheme='dark',
         bg='#101828', bg2='#141e31', surface='#1a263d', surface2='#22304b',
         text='#eef2ff', soft='#c9d2ea', muted='#8d99b8', heading='#ffffff',
         primary='#a000f0', pfg='#ffffff', accent='#00f0f0', price='#f0f000',
         brand=('#a000f0', '#0050c8'), footer='#0a101c',
         border='rgba(255,255,255,0.08)', input='rgba(255,255,255,0.18)',
         page='linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), '
              'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), '
              'radial-gradient(900px 500px at 0% 0%, rgba(160,0,240,0.16), transparent 60%), '
              'radial-gradient(900px 500px at 100% 100%, rgba(0,240,240,0.10), transparent 60%)',
         size='32px 32px, 32px 32px, auto, auto',
         head='kanit', body='kanit', glow='0 0 16px rgba(0,240,240,0.5)'),
    dict(id='pacman', name='Pac-Man', desc='Labyrinthe bleu et pac-gommes', scheme='dark',
         bg='#000000', bg2='#05050d', surface='#0b0b1c', surface2='#13132c',
         text='#f2f2ff', soft='#cfd0f5', muted='#8c8ec4', heading='#ffe600',
         primary='#ffe600', pfg='#000000', accent='#ff5ec4', price='#ffb847',
         brand=('#2121de', '#0b0b7a'), footer='#000000',
         border='rgba(77,107,255,0.4)', input='rgba(77,107,255,0.55)',
         page='radial-gradient(circle, rgba(255,230,0,0.16) 2px, transparent 2.6px)',
         size='44px 44px',
         head='bungee', body='dmsans', glow='0 0 14px rgba(255,94,196,0.6)'),
    dict(id='combat', name='Combat', desc='Rouge vif et or, façon jeu de baston', scheme='dark',
         bg='#140606', bg2='#1a0808', surface='#240c0c', surface2='#301111',
         text='#fff0e6', soft='#f0cfc0', muted='#b88a7c', heading='#ffffff',
         primary='#e10600', pfg='#ffffff', accent='#ffb800', price='#ffd84d',
         brand=('#8b0000', '#3d0000'), footer='#0a0303',
         border='rgba(255,184,0,0.14)', input='rgba(255,184,0,0.28)',
         page='linear-gradient(160deg, rgba(225,6,0,0.18) 0%, transparent 40%), '
              'radial-gradient(900px 500px at 100% 100%, rgba(255,184,0,0.10), transparent 60%)',
         head='bebas', body='rajdhani', glow='0 0 16px rgba(255,184,0,0.6)'),
    dict(id='console', name='Console bleue', desc='Bleu profond 16 bits et jaune', scheme='dark',
         bg='#07142e', bg2='#0a1a3a', surface='#0f2249', surface2='#152b59',
         text='#e8f0ff', soft='#c2d3f2', muted='#8199c4', heading='#ffffff',
         primary='#1f6fff', pfg='#ffffff', accent='#ffd200', price='#ffd200',
         brand=('#1f6fff', '#0a2d7a'), footer='#040b1a',
         border='rgba(255,255,255,0.09)', input='rgba(255,255,255,0.18)',
         page='radial-gradient(1000px 500px at 50% -10%, rgba(31,111,255,0.28), transparent 62%), '
              'radial-gradient(700px 400px at 100% 100%, rgba(255,210,0,0.07), transparent 60%)',
         head='exo2', body='exo2', glow='0 0 16px rgba(255,210,0,0.5)'),
    dict(id='tapisvert', name='Tapis vert', desc='Feutre de billard et laiton', scheme='dark',
         bg='#0b2e1f', bg2='#0d3524', surface='#10402b', surface2='#154d35',
         text='#eefaf2', soft='#c6e4d2', muted='#86b39a', heading='#fff6dc',
         primary='#f2c14e', pfg='#1a1300', accent='#ff8a7a', price='#f2c14e',
         brand=('#14532d', '#052e16'), footer='#051a11',
         border='rgba(242,193,78,0.14)', input='rgba(242,193,78,0.28)',
         page='radial-gradient(ellipse at 50% 30%, rgba(40,140,90,0.35), transparent 70%)',
         head='fraunces', body='inter', glow='none'),
    dict(id='lave', name='Lave', desc='Orange incandescent sur fond volcanique', scheme='dark',
         bg='#140800', bg2='#1a0b02', surface='#241004', surface2='#301606',
         text='#fff1e6', soft='#f1cfb4', muted='#b98a66', heading='#ffffff',
         primary='#ff4d00', pfg='#ffffff', accent='#ffc300', price='#ffc300',
         brand=('#b91c1c', '#7c2d12'), footer='#0a0400',
         border='rgba(255,77,0,0.16)', input='rgba(255,77,0,0.32)',
         page='radial-gradient(1200px 520px at 50% 110%, rgba(255,77,0,0.30), transparent 60%), '
              'radial-gradient(700px 300px at 10% 0%, rgba(255,195,0,0.10), transparent 60%)',
         head='kanit', body='kanit', glow='0 0 16px rgba(255,195,0,0.6)'),
    dict(id='crt', name='Écran ambre', desc='Moniteur cathodique monochrome', scheme='dark',
         bg='#0d0802', bg2='#120b03', surface='#1a1105', surface2='#231708',
         text='#ffcf7a', soft='#f0b95c', muted='#b98a3e', heading='#ffb000',
         primary='#ffb000', pfg='#1a0e00', accent='#ff7a1a', price='#ffd27a',
         brand=('#8a3b00', '#4a1f00'), footer='#070401',
         border='rgba(255,176,0,0.18)', input='rgba(255,176,0,0.3)',
         page='repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px), '
              'radial-gradient(ellipse at center, rgba(255,176,0,0.08), transparent 70%)',
         head='vt323', body='plexmono', glow='0 0 12px rgba(255,176,0,0.7)'),
    dict(id='cyberpunk', name='Cyberpunk', desc='Jaune néon, rouge et cyan', scheme='dark',
         bg='#0e0e10', bg2='#131316', surface='#1a1a1f', surface2='#222228',
         text='#eaeaea', soft='#c8c8c8', muted='#8f8f98', heading='#fcee0a',
         primary='#fcee0a', pfg='#0e0e10', accent='#00f0ff', price='#ff335f',
         brand=('#ff003c', '#7a00ff'), footer='#070708',
         border='rgba(252,238,10,0.14)', input='rgba(252,238,10,0.28)',
         page='linear-gradient(135deg, rgba(252,238,10,0.08) 0%, transparent 35%), '
              'radial-gradient(800px 400px at 100% 100%, rgba(0,240,255,0.08), transparent 60%)',
         head='chakra', body='chakra', tracking='0.01em', glow='0 0 14px rgba(0,240,255,0.55)'),
    dict(id='mono', name='Monochrome', desc='Noir et blanc, sobre et graphique', scheme='dark',
         bg='#0a0a0a', bg2='#101010', surface='#161616', surface2='#1f1f1f',
         text='#ededed', soft='#cfcfcf', muted='#8e8e8e', heading='#ffffff',
         primary='#ffffff', pfg='#0a0a0a', accent='#bdbdbd', price='#ffffff',
         brand=('#2b2b2b', '#050505'), footer='#000000',
         border='rgba(255,255,255,0.12)', input='rgba(255,255,255,0.24)',
         page='radial-gradient(1000px 500px at 50% -10%, rgba(255,255,255,0.07), transparent 62%)',
         head='bebas', body='inter', glow='none'),
    dict(id='gameboy', name='Game Boy', desc='Écran vert LCD, 4 teintes', scheme='light',
         bg='#c4cfa1', bg2='#b6c28d', surface='#d3dcb5', surface2='#aebb82',
         text='#0f380f', soft='#1f4a1f', muted='#3d6b3d', heading='#0f380f',
         primary='#306230', pfg='#e0f0b8', accent='#4d7c0f', price='#0f380f',
         brand=('#0f380f', '#306230'), footer='#0f380f',
         border='rgba(15,56,15,0.18)', input='rgba(15,56,15,0.3)',
         page='radial-gradient(rgba(15,56,15,0.09) 1px, transparent 1.3px)',
         size='5px 5px',
         head='silkscreen', body='spacemono', glow='none'),
    dict(id='plateforme', name='Plateforme', desc='Ciel bleu, rouge plombier et vert tuyau', scheme='light',
         bg='#cfe8ff', bg2='#b9dcff', surface='#ffffff', surface2='#e3f1ff',
         text='#1a2a44', soft='#34466a', muted='#5d6f92', heading='#1a2a44',
         primary='#e52521', pfg='#ffffff', accent='#1d8a2c', price='#b35c00',
         brand=('#e52521', '#8f1411'), footer='#1a2a44',
         border='rgba(26,42,68,0.12)', input='rgba(26,42,68,0.24)',
         page='radial-gradient(160px 60px at 12% 14%, rgba(255,255,255,0.9), transparent 70%), '
              'radial-gradient(220px 70px at 78% 9%, rgba(255,255,255,0.85), transparent 70%), '
              'radial-gradient(180px 60px at 55% 30%, rgba(255,255,255,0.6), transparent 70%)',
         head='luckiest', body='dmsans', glow='none'),
    dict(id='bowling', name='Bowling 70s', desc='Crème, orange et turquoise', scheme='light',
         bg='#fff4e0', bg2='#fde7c4', surface='#fffaf0', surface2='#f8dfb6',
         text='#3b1f0e', soft='#5e3a22', muted='#8a6246', heading='#3b1f0e',
         primary='#e4572e', pfg='#ffffff', accent='#12908d', price='#c1121f',
         brand=('#c2410c', '#7c2d12'), footer='#3b1f0e',
         border='rgba(59,31,14,0.12)', input='rgba(59,31,14,0.22)',
         page='radial-gradient(900px 500px at 0% 0%, rgba(228,87,46,0.18), transparent 60%), '
              'radial-gradient(800px 500px at 100% 100%, rgba(23,163,160,0.14), transparent 60%)',
         head='righteous', body='dmsans', glow='none'),
    dict(id='pastel', name='Pastel 90s', desc='Crème, rose, bleu et violet', scheme='light',
         bg='#fdf6e3', bg2='#f8ecd0', surface='#ffffff', surface2='#f6ead2',
         text='#2d2440', soft='#4a3f63', muted='#7a6f92', heading='#2d2440',
         primary='#ff6f91', pfg='#ffffff', accent='#5b6fd6', price='#845ec2',
         brand=('#845ec2', '#4b3a8a'), footer='#2d2440',
         border='rgba(45,36,64,0.1)', input='rgba(45,36,64,0.2)',
         page='radial-gradient(700px 400px at 0% 0%, rgba(255,111,145,0.20), transparent 60%), '
              'radial-gradient(700px 400px at 100% 30%, rgba(91,111,214,0.16), transparent 60%), '
              'radial-gradient(700px 400px at 30% 100%, rgba(132,94,194,0.14), transparent 60%)',
         head='baloo', body='baloo', glow='none'),
    dict(id='clair', name='Arcade clair', desc='Blanc net, magenta et bleu', scheme='light',
         bg='#f7f8fc', bg2='#eef0f7', surface='#ffffff', surface2='#eceff7',
         text='#1b1d2a', soft='#3d4157', muted='#6b7089', heading='#0f1020',
         primary='#ff2e93', pfg='#ffffff', accent='#0088c2', price='#e85d04',
         brand=('#ff2e93', '#7b2cff'), footer='#0f1020',
         border='rgba(15,16,32,0.08)', input='rgba(15,16,32,0.16)',
         page='radial-gradient(1000px 480px at 50% -10%, rgba(255,46,147,0.10), transparent 62%), '
              'radial-gradient(900px 500px at 100% 100%, rgba(0,150,199,0.08), transparent 60%)',
         head='outfit', body='outfit', glow='none'),
    dict(id='glace', name='Glace', desc='Blanc givré, bleu vif et corail', scheme='light',
         bg='#eef7ff', bg2='#e1f0ff', surface='#ffffff', surface2='#e6f2fd',
         text='#0d2238', soft='#2b4461', muted='#5b7593', heading='#0a1a2e',
         primary='#0077ff', pfg='#ffffff', accent='#00a39a', price='#e8472a',
         brand=('#0077ff', '#003f8a'), footer='#0a1a2e',
         border='rgba(10,26,46,0.09)', input='rgba(10,26,46,0.18)',
         page='radial-gradient(900px 480px at 50% -10%, rgba(0,119,255,0.14), transparent 62%), '
              'radial-gradient(700px 400px at 100% 100%, rgba(0,179,164,0.10), transparent 60%)',
         head='rajdhani', body='inter', glow='none'),
    dict(id='menthe', name='Menthe', desc='Vert frais, framboise et bleu', scheme='light',
         bg='#eafff5', bg2='#d9f8ea', surface='#ffffff', surface2='#dcf5e9',
         text='#0f2e22', soft='#2c4d40', muted='#5a7d6f', heading='#0b261b',
         primary='#00a36c', pfg='#ffffff', accent='#e0386e', price='#0068a8',
         brand=('#047857', '#064e3b'), footer='#0b261b',
         border='rgba(11,38,27,0.1)', input='rgba(11,38,27,0.2)',
         page='radial-gradient(900px 480px at 0% 0%, rgba(0,163,108,0.16), transparent 60%), '
              'radial-gradient(700px 400px at 100% 100%, rgba(224,56,110,0.10), transparent 60%)',
         head='baloo', body='dmsans', glow='none'),
    dict(id='bubblegum', name='Bubblegum', desc='Rose bonbon et violet', scheme='light',
         bg='#fff0f7', bg2='#ffe3f1', surface='#ffffff', surface2='#ffe3f1',
         text='#3a1340', soft='#5b2a63', muted='#8d5f93', heading='#3a1340',
         primary='#7b2cff', pfg='#ffffff', accent='#e0197d', price='#c2006a',
         brand=('#ff4fa3', '#7b2cff'), footer='#2a0e33',
         border='rgba(58,19,64,0.1)', input='rgba(58,19,64,0.2)',
         page='radial-gradient(900px 500px at 0% 0%, rgba(255,160,210,0.45), transparent 60%), '
              'radial-gradient(800px 500px at 100% 100%, rgba(190,160,255,0.35), transparent 60%)',
         head='fredoka', body='dmsans', glow='none'),
    dict(id='papier', name='Papier', desc='Crème & indigo, façon Ma Belle Note', scheme='light',
         bg='#faf6ee', bg2='#f4ecda', surface='#fffdf7', surface2='#f4ecda',
         text='#1a1530', soft='#3a3556', muted='#625e78', heading='#1e1b4b',
         primary='#1e1b4b', pfg='#f6d896', accent='#b0791f', price='#9a6b1c',
         brand=('#1e1b4b', '#3b3490'), footer='#1e1b4b',
         border='rgba(30,27,75,0.1)', input='rgba(30,27,75,0.18)',
         page='radial-gradient(circle at 20% 10%, rgba(232,178,82,0.10), transparent 40%), '
              'radial-gradient(circle at 90% 80%, rgba(91,82,200,0.07), transparent 45%)',
         head='fraunces', body='inter', glow='none'),
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
        '--t-page-bg-size': t.get('size', 'auto'), '--t-font-head': stack(t['head']),
        '--t-font-body': stack(t['body']),
        '--t-head-adjust': t.get('adjust', FONTS[t['head']][4]),
        '--t-head-tracking': t.get('tracking', FONTS[t['head']][5]), '--t-em-glow': t['glow'],
    }
    return '\n'.join(f'  {k}: {val};' for k, val in v.items())


ids = [t['id'] for t in THEMES]
assert len(ids) == len(set(ids)), 'id de thème en double'
for t in THEMES:
    assert t['head'] in FONTS and t['body'] in FONTS, t['id']

# themes.css
css = ['/* Généré par scripts/gen_themes.py — ne pas éditer à la main. */', '']
css.append(f':root {{\n{block(next(t for t in THEMES if t["id"] == DEFAULT))}\n}}\n')
for t in THEMES:
    css.append(f':root[data-theme="{t["id"]}"] {{\n{block(t)}\n}}\n')
open(os.path.join(ROOT, 'app', 'themes.css'), 'w', encoding='utf-8').write('\n'.join(css))

# themes.ts
meta = [dict(id=t['id'], name=t['name'], desc=t['desc'], scheme=t['scheme'],
             head=t['head'], body=t['body'], bg=t['bg'], primary=t['primary'],
             accent=t['accent'], price=t['price'], headingIsPrimary=t['heading'] == t['primary'])
        for t in THEMES]
fonts_meta = [dict(id=k, label=v[0], stack=stack(k), adjust=v[4], tracking=v[5]) for k, v in FONTS.items()]
ts = f'''// Généré par scripts/gen_themes.py — ne pas éditer à la main.
// Les valeurs de chaque thème vivent dans src/app/themes.css.

export type ThemeMeta = {{
  id: string
  name: string
  desc: string
  scheme: 'light' | 'dark'
  head: string
  body: string
  bg: string
  primary: string
  accent: string
  price: string
  headingIsPrimary: boolean
}}

export type FontMeta = {{ id: string; label: string; stack: string; adjust: string; tracking: string }}

export const DEFAULT_THEME = '{DEFAULT}'
export const THEME_STORAGE_KEY = 'restart-theme'
export const CUSTOM_STORAGE_KEY = 'restart-theme-custom'

export const themes: ThemeMeta[] = {json.dumps(meta, ensure_ascii=False, indent=2)}

export const fonts: FontMeta[] = {json.dumps(fonts_meta, ensure_ascii=False, indent=2)}
'''
open(os.path.join(ROOT, 'lib', 'themes.ts'), 'w', encoding='utf-8').write(ts)

# fonts.ts
imports = sorted({v[1] for v in FONTS.values() if not v[1].startswith('local:')})
lines = ["// Généré par scripts/gen_themes.py — ne pas éditer à la main.",
         "// Chaque police expose une variable --ff-<id>. Le navigateur ne télécharge",
         "// un fichier que si un élément l'utilise : seules les polices du thème actif",
         "// sont chargées. Seules celles du thème par défaut sont préchargées.",
         "import localFont from 'next/font/local'",
         f"import {{ {', '.join(imports)} }} from 'next/font/google'", '']
names = []
for fid, (label, imp, opts, *_rest) in FONTS.items():
    name = f'f_{fid}'
    names.append(name)
    pre = '' if fid in PRELOADED else ', preload: false'
    extra = f', {opts}' if opts else ''
    if imp.startswith('local:'):
        lines.append(f"const {name} = localFont({{ src: '../fonts/{imp[6:]}', variable: '--ff-{fid}', display: 'swap'{extra}{pre} }})")
    else:
        lines.append(f"const {name} = {imp}({{ subsets: ['latin'], variable: '--ff-{fid}', display: 'swap'{extra}{pre} }})")
lines += ['', f"export const fontVariables = [{', '.join(names)}].map((f) => f.variable).join(' ')", '']
open(os.path.join(ROOT, 'lib', 'fonts.ts'), 'w', encoding='utf-8').write('\n'.join(lines))

print(f'{len(THEMES)} thèmes, {len(FONTS)} polices')
