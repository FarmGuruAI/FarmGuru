import os

replacements = {
    'frontend/README.md': [('SoilSense AI', 'FarmGuru')],
    'frontend/index.html': [('SoilSense AI', 'FarmGuru'), ('SoilSense', 'FarmGuru')],
    'frontend/src/components/Footer.tsx': [('SoilSense <span className="text-primary">AI</span>', 'Farm<span className="text-primary">Guru</span>'), ('SoilSense AI', 'FarmGuru')],
    'frontend/src/components/Navbar.tsx': [('SoilSense <span className="text-primary">AI</span>', 'Farm<span className="text-primary">Guru</span>')],
    'frontend/src/pages/About.tsx': [('SoilSense AI', 'FarmGuru')],
    'generate_ppt.py': [('SoilSense AI', 'FarmGuru API'), ('FarmGuru: FarmGuru API', 'FarmGuru: ML Powered Soil Analysis')]
}

for filepath, pairs in replacements.items():
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        for old, new in pairs:
            content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
