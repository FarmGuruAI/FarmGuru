from pptx import Presentation
from pptx.util import Inches, Pt

prs = Presentation()

# Slide 1: Title Slide
title_slide_layout = prs.slide_layouts[0]
slide1 = prs.slides.add_slide(title_slide_layout)
title = slide1.shapes.title
subtitle = slide1.placeholders[1]

title.text = "FarmGuru: ML Powered Soil Analysis"
subtitle.text = "AI-Powered Soil Quality Analysis\nTechnologies Used:\nFrontend: React, Vite, Tailwind CSS, Framer Motion\nBackend: Python, FastAPI, Scikit-learn, Google Gemini AI"

# Slide 2: Problem & Solution
bullet_slide_layout = prs.slide_layouts[1]
slide2 = prs.slides.add_slide(bullet_slide_layout)
shapes = slide2.shapes
title_shape = shapes.title
body_shape = shapes.placeholders[1]

title_shape.text = "Problem & Solution"
tf = body_shape.text_frame

# Problem
p = tf.add_paragraph()
p.text = "The Problem:"
p.font.bold = True
p.font.size = Pt(28)

p = tf.add_paragraph()
p.text = "- Farmers lack easy, real-time access to accurate soil health data."
p.level = 1
p = tf.add_paragraph()
p.text = "- Inefficient tracking of Nitrogen (N), Phosphorus (P), and Potassium (K) leads to poor crop yields and resource wastage."
p.level = 1

# Solution
p = tf.add_paragraph()
p.text = "\nOur Solution:"
p.font.bold = True
p.font.size = Pt(28)

p = tf.add_paragraph()
p.text = "- An intuitive web platform that uses Machine Learning to analyze NPK values."
p.level = 1
p = tf.add_paragraph()
p.text = "- Predicts soil condition and provides actionable, generative AI-powered insights for crop recommendations."
p.level = 1
p = tf.add_paragraph()
p.text = "- Seamless user experience with interactive visualizations and dashboards."
p.level = 1

prs.save('FarmGuru_Presentation.pptx')
print('Presentation generated successfully.')
