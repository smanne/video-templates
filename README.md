# Video Templates Collection

A collection of video templates for different use cases built with Remotion.

## Available Templates

### E-commerce Template
A template for creating product showcase videos with features like:
- Product title and price display
- Rating and review count
- Product description with typing animation
- Pros and cons sections with fade transitions
- Background music support
- Multiple product configurations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the template:
   ```bash
   # For e-commerce template
   npm run ecommerce
   ```

## Project Structure

```
video-templates/
├── templates/             # Template-specific components
│   └── ecommerce/        # E-commerce template
│       └── src/         # Source code for e-commerce template
├── public/               # Static assets
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── .babelrc             # Babel configuration
```

## Creating New Templates

To create a new template:
1. Create a new directory under `templates/`
2. Create a `src` directory for your template's source code
3. Add new scripts to package.json if needed
4. Update the main source code to use the new template components

## License

ISC 