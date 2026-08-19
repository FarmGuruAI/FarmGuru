import glob

replacements = [
    ('bg-soil-bg',      'bg-background'),
    ('bg-soil-card',    'bg-card'),
    ('bg-soil-border',  'bg-secondary'),
    ('border-soil-border', 'border-border'),
    ('text-soil-text',  'text-foreground'),
    ('text-soil-muted', 'text-muted-foreground'),
    ('text-soil-text0', 'text-muted-foreground'),
    ('soil-border',     'border'),
    ('#1a3a24',         'var(--border)'),
    ('#9ca3af',         'var(--muted-foreground)'),
    ("backgroundColor: '#0f2a17'", "backgroundColor: 'var(--card)'"),
    ("borderColor: '#1a3a24'", "borderColor: 'var(--border)'"),
    ("color: '#fff'", "color: 'var(--foreground)'"),
    ('bg-primary-600 hover:bg-primary-500', 'bg-primary hover:bg-primary/90'),
    ('border-primary-500', 'border-primary'),
    ('focus:border-primary-500', 'focus:border-primary'),
    ('focus:ring-primary-500', 'focus:ring-primary'),
    ('border-t-primary-500', 'border-t-primary'),
    ('text-primary-400', 'text-primary'),
    ('text-primary-500', 'text-primary'),
    ('ring-primary-500', 'ring-primary'),
    ('bg-primary-900/50', 'bg-primary/10'),
]

files = glob.glob('frontend/src/pages/*.tsx') + glob.glob('frontend/src/components/*.tsx')

for fpath in files:
    with open(fpath, encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != original:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {fpath}')

print('All done.')
