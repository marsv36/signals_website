#!/bin/bash

# Simple deployment script to copy files to the docs directory for GitHub Pages

# Create docs directory structure
mkdir -p docs/css docs/js docs/img/products docs/products

# Copy HTML files
cp index.html docs/
cp privacy-policy.html docs/
cp dekujeme.html docs/
cp sitemap.xml docs/
cp robots.txt docs/

# Copy CSS files
cp css/*.css docs/css/

# Copy JavaScript files
cp js/*.js docs/js/

# Copy images
cp img/*.svg docs/img/
cp img/*.png docs/img/
cp img/products/*.svg docs/img/products/
cp img/products/*.png docs/img/products/

# Copy product pages
cp products/*.html docs/products/

echo "Files copied to docs/ directory for GitHub Pages deployment."
echo "Commit and push to deploy to GitHub Pages." 