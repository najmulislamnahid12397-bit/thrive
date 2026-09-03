#!/bin/bash
pages=("latest" "topics" "videos" "guides" "apps" "about" "contact" "newsletter" "privacy-policy" "terms-of-service")

for dir in "${pages[@]}"
do
  sed -i 's/DisplaySmall/H1/g' app/$dir/page.tsx
done
