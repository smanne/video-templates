# Video Templates Collection

A collection of video templates built with Remotion.

## Available Templates

### E-commerce Template
A professional product showcase template featuring:
- Product title and price display
- Rating and review count
- Product description with typing animation
- Pros and cons sections with fade transitions
- Background music support
- Multiple product configurations

### Headlines Template
A dynamic news headlines template featuring:
- Breaking news style presentation
- Category badges
- Timestamp display
- Background images with overlay
- Smooth animations and transitions
- Background music support
- Breaking news banner (except on last slide)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/smanne/video-templates.git
cd video-templates
```

2. Install dependencies:
```bash
npm install
```

3. Run a template:
```bash
# For E-commerce template
npm run ecommerce

# For Headlines template
npm run headlines
```

## Project Structure

```
video-templates/
├── templates/
│   ├── ecommerce/
│   │   └── src/           # E-commerce template source code
│   └── headlines/
│       └── src/           # Headlines template source code
├── package.json
└── README.md
```

## Creating New Templates

To create a new template:
1. Create a new directory under `templates/`
2. Create a `src` directory for your template's source code
3. Add your template's components and entry point
4. Update `package.json` with new scripts for your template

## License

ISC 