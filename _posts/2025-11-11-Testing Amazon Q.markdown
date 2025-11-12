---
layout: post
title:  'Testing Amazon Q'
date:  2025-11-11 12:00:00 -0800
categories: update
---

I am trying out amazon Q. I will see how good it is to help me visualize my posts in a different way. Specifically how it is able to interact with directory based projects, and how well it is able to utilize libraries that I give to it.

Amazon Q was able to give me code to create the topology seen on the projects page. In each prompt, I give simple step requests and that was helpful in making sure that each change is minimal and easy to track. At some point, it was giving flawed logic for the button, so I added my own code, which I then asked it to adjust. This was successful, and it sped up how long it would have otherwise taken me to create this cool addition.

I also initially gave amazon q some creative liberty when it came to adding css styling. For example this button.

<img src="/assets/images/posts/2025-11-11-testing-amazon-q/original_button.png">

I did not like it. To remedy this, I just asked for the buttons to match the style of the page and boom:

<img src="/assets/images/posts/2025-11-11-testing-amazon-q/new_button.png">

I also noticed that it defaulted to adding inline css instead of creating a sass file, or adding to the existing sass file. However, this was an easy edit by just asking it to move the css.

---

It was also easy to ask to adjust my directory structure. Amazon Q generated some shell scripts for me to reject/run that essentially makes directories and moves files. It is interesting that this is not done automatically instead it asks for permission for each command. After edits were made to my current directory, it also generated a shell script for me that automatically organizes images based on usage that I can call next time.

That is all for now.