#!/bin/bash

# Script to organize images for Jekyll posts
# Usage: ./organize_images.sh "post-slug" image1.jpg image2.png ...

if [ $# -lt 2 ]; then
    echo "Usage: $0 <post-slug> <image1> [image2] ..."
    echo "Example: $0 '2025-11-11-my-new-post' image1.jpg image2.png"
    exit 1
fi

POST_SLUG=$1
shift  # Remove first argument, rest are image files

# Create directory for the post
POST_DIR="assets/images/posts/$POST_SLUG"
mkdir -p "$POST_DIR"

# Move images to the post directory
for image in "$@"; do
    if [ -f "assets/images/$image" ]; then
        mv "assets/images/$image" "$POST_DIR/"
        echo "Moved $image to $POST_DIR/"
    else
        echo "Warning: $image not found in assets/images/"
    fi
done

echo "Images organized for post: $POST_SLUG"
echo "Use path: /assets/images/posts/$POST_SLUG/filename.ext in your markdown"