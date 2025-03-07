# Video Templates Collection

A collection of video templates built with Remotion for different use cases.

## Available Templates

### E-commerce Template
A template for creating product showcase videos with:
- Product title and price display
- Rating and review count
- Product description with typing animation
- Pros and cons sections with fade transitions
- Background music support
- Multiple product configurations

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

3. Run the e-commerce template:
```bash
npm run ecommerce
```

## Project Structure

```
video-templates/
├── templates/
│   └── ecommerce/
│       └── src/           # E-commerce template source code
├── package.json
└── README.md
```

## Creating New Templates

To create a new template:
1. Create a new directory under `templates/`
2. Create a `src` directory for your template's source code
3. Add your template-specific components and configuration
4. Update the scripts in `package.json` to include your template

## License

ISC 