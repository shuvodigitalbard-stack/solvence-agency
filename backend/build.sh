#!/bin/bash
set -e

echo "=== Installing backend dependencies ==="
npm install

echo "=== Installing frontend dependencies ==="
cd ../frontend
npm install

echo "=== Building frontend ==="
npx vite build

echo "=== Copying frontend build to backend/public ==="
rm -rf ../backend/public/assets
cp -r dist/* ../backend/public/

echo "=== Build complete ==="
