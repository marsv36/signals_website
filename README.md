# Signals Website

This repository contains the source code for the Signals company website. The website is built with plain HTML, CSS, and JavaScript, making it easy to edit and maintain without complex build processes.

## Structure

```
root
├─ index.html                # one-page landing
├─ products/
│  ├─ _index.html            # catalog listing (auto-generated)
│  ├─ product-template.html  # template for new products
│  ├─ signals-analytics.html # product page
│  ├─ ... (more product pages)
├─ css/
│  ├─ signals.css            # custom palette & utility helpers
│  └─ normalize.css          # CSS reset
├─ js/
│  └─ main.js                # menu toggle, form handler, cookie consent
├─ img/
│  ├─ logo.svg
│  ├─ og-default.png
│  └─ products/...           # product images
├─ sitemap.xml               # XML sitemap
├─ robots.txt                # robots instructions
└─ README.md                 # this file
```

## Editing the Website

### Basic Text Edits

1. Navigate to the file you want to edit in GitHub's web interface.
2. Click the pencil icon (Edit this file) in the upper right corner.
3. Make your changes to the HTML content.
4. Scroll down to the "Commit changes" section.
5. Add a brief description of your changes.
6. Click "Commit changes" to save.

### Adding a New Product

1. Navigate to the `products/` directory.
2. Click "Add file" > "Create new file" in the upper right corner.
3. Name your file (e.g., `product-name.html`).
4. Copy the content from `product-template.html` and paste it into your new file.
5. Update the front matter at the top of the file:
   ```html
   <!--
     title: Your Product Name
     slug: your-product-name
     og: img/products/your-product-image.png
   -->
   ```
6. Replace the placeholder content with your product information.
7. Commit your changes.
8. Run the index generator (see below) to update the product catalog.

### Updating the Product Catalog

After adding or removing product pages, you need to regenerate the product catalog index:

1. Clone the repository locally:
   ```bash
   git clone https://github.com/marsv36/signals_website.git
   cd signals_website
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Run the build script:
   ```bash
   npm run build
   ```

4. Commit and push the changes:
   ```bash
   git add products/_index.html
   git commit -m "Update product catalog"
   git push
   ```

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- npm (comes with Node.js)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/marsv36/signals_website.git
   cd signals_website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Formatting Code

To format your code according to the project's style:

```bash
npm run format
```

## Deployment

The website is automatically deployed to GitHub Pages from the `main` branch. The `/docs` folder is used for deployment.

To deploy changes:

1. Make sure all your changes are committed to the `main` branch.
2. The GitHub Pages site will automatically update within a few minutes.

## Contact Form

The contact form uses [Formspree](https://formspree.io/) to handle submissions. To change the form destination:

1. Create an account on Formspree.
2. Create a new form and get your form ID.
3. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_NEW_ID" method="POST" class="lead-form">
   ```

## Analytics

The website uses Google Analytics 4 for tracking. To update the tracking ID:

1. Open all HTML files.
2. Replace `G-XXXXXXXXXX` with your GA4 tracking ID.

## License

Copyright © Signals s.r.o. All rights reserved.