"""
Builds the one-page résumé PDF: public/resume/Jb-Yashvi-Resume.pdf (and a copy at the
project root). Edit the text below and run:

    python3 scripts/resume.py

Needs ReportLab (pip install reportlab). Helvetica on A4, 46pt side margins; the portfolio's
My journey (src/data/journey.ts) copies the Experience bullets word for word, so change both.
"""

from pathlib import Path
from shutil import copyfile
from xml.sax.saxutils import escape

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Frame, Paragraph
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/resume/Jb-Yashvi-Resume.pdf'

NAME = 'JB YASHVI'
HEADLINE = 'Senior Product Designer | Supply Chain & Operational Products'
EMAIL = 'jbieyashvi011@gmail.com'
LINKEDIN = ('linkedin.com/in/jb-yashvi', 'https://www.linkedin.com/in/jb-yashvi/')
PORTFOLIO = ('jb-yashvi-portfolio.vercel.app', 'https://jb-yashvi-portfolio.vercel.app/')
PLACE = 'Jaipur, Rajasthan | +91 8949741873 | '

SUMMARY = (
    'Senior Product Designer focused on supply chain and operational products. Experienced in translating complex, '
    'multi-role workflows into clear web and mobile experiences, with work spanning logistics, procurement and '
    'operational tools. Uses AI-assisted prototyping to explore concepts and refine interactions.'
)

EXPERIENCE = [
    ('Heizen | Senior Product Designer | 2025 - Present', [
        'Designed web and mobile experiences for supply chain and operational products across client projects, from '
        'user research and UX planning to high-fidelity interface design.',
        'Designed TAN90, a cold-chain logistics platform, across four portals for admin, warehouse managers, delivery '
        'operations and customers, covering orders, inventory, freezing stations, delivery coordination and Proof of '
        'Delivery (POD) approval. The product includes an AI-powered POD verification feature.',
        'Used AI tools to design the interface of Flowtech, an RFQ-to-PO platform connecting inquiries, quotations, '
        'purchase-order verification and sales orders, as an interactive frontend prototype.',
        'Created the design system for CMP Autobot, an ingredient-article mapping workspace for Compass Group India, and '
        'built the platform using AI tools.',
        'Designed NUTRIO across its customer app, delivery partner app, kitchen panel and admin dashboard.',
    ]),
    ('Freelance | Product Designer | 2022 - 2024', [
        'Designed web and mobile interfaces for early-stage companies, translating client requirements into user flows '
        'and UI designs.',
        'Developed brand identities and reusable design systems to support consistent digital experiences.',
    ]),
    ('Urban Culture | UI/UX Design Intern | May 2024 - July 2024', [
        'Designed an admin panel to support operational workflows and created social media content aligned with the '
        'brand identity.',
    ]),
    ('Scenco | Product Designer | 2022 - 2023', [
        'Designed end-to-end UI/UX and conducted competitive research to inform product features.',
        'Built and maintained a design system to support consistent interfaces and developer handoff.',
    ]),
    ('Polo | Product Designer | 2022 - 2023', [
        'Contributed to digital product design and created high-fidelity interactive prototypes aligned with business '
        'goals and user needs.',
    ]),
]

SKILLS = [
    [('Product design:', 'User research, UX planning, user flows, wireframing, UI design, interactive prototyping, '
      'usability testing, design systems, developer handoff, multi-role workflows')],
    [('AI-assisted work:', 'Experience design, AI-assisted prototyping, iterative UI refinement, mobile and web prototypes')],
    [('Design tools:', 'Figma, Framer, Adobe XD, Sketch, Adobe Illustrator, AutoCAD')],
    [('AI tools:', 'Claude, Codex | '), ('Technical:', 'HTML')],
]

EDUCATION = ('Bachelor of Architecture (B.Arch)', ' | Malaviya National Institute of Technology Jaipur | 2020 - 2025')
LANGUAGES = 'English, Hindi'

# styles; spaceBefore is the gap above each block (Frame adds it unless the block is first)
body = ParagraphStyle('body', fontName='Helvetica', fontSize=9.3, leading=12.3)
name = ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=22, leading=25)
headline = ParagraphStyle('headline', fontName='Helvetica', fontSize=11, leading=14, spaceBefore=4)
section = ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10, leading=13, spaceBefore=10)
role = ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=9.5, leading=12.5)
bullet = ParagraphStyle('bullet', parent=body, leftIndent=10, firstLineIndent=-8, spaceBefore=3)


def p(text, style, before=None):
    para = Paragraph(text, style)
    if before is not None:
        para.style = ParagraphStyle(style.name + str(before), parent=style, spaceBefore=before)
    return para


def link(label, href):
    return f'<a href="{href}" color="black">{escape(label)}</a>'


def labelled(pairs):
    return ''.join(f'<b>{escape(k)}</b>{escape(" " + v)}' for k, v in pairs)


def story():
    out = [
        p(NAME, name),
        p(escape(HEADLINE), headline),
        p(escape(PLACE) + link(EMAIL, f'mailto:{EMAIL}'), body, 5),
        p(link(*LINKEDIN) + ' | ' + link(*PORTFOLIO), body, 4),
        p('SUMMARY', section),
        p(escape(SUMMARY), body, 5),
        p('EXPERIENCE', section),
    ]
    for i, (head, points) in enumerate(EXPERIENCE):
        out.append(p(escape(head), role, 5 if i == 0 else 4))
        out += [p('• ' + escape(b), bullet) for b in points]
    out.append(p('SKILLS', section))
    out += [p(labelled(pairs), body, 5 if i == 0 else 4) for i, pairs in enumerate(SKILLS)]
    out += [
        p('EDUCATION', section),
        p(f'<b>{escape(EDUCATION[0])}</b>{escape(EDUCATION[1])}', body, 5),
        p('LANGUAGES', section),
        p(escape(LANGUAGES), body, 5),
    ]
    return out


def build(path=OUT):
    width, height = A4
    c = Canvas(str(path), pagesize=A4, pageCompression=1)
    c.setTitle('Jb Yashvi - Senior Product Designer Resume')
    c.setAuthor('Jb Yashvi')
    frame = Frame(46, 38, width - 92, height - 76, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    flow = story()
    frame.addFromList(flow, c)
    if flow:
        raise SystemExit(f'résumé runs past one page: {len(flow)} blocks left over')
    c.save()
    copyfile(path, ROOT / 'Jb-Yashvi-Resume.pdf')


if __name__ == '__main__':
    build()
    print(f'wrote {OUT.relative_to(ROOT)}')
