#!/bin/bash

post_title="$1"

current_date=$(date +"%Y-%m-%d")

echo "---
layout: post
title:  '${post_title}'
date:  ${current_date} 12:00:00 -0800
categories: update
---" > "_posts/${current_date}-${post_title}.markdown"

echo "Ready to edit: $post_title"
