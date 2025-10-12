---
layout: default
title: Home
---

# Welcome

This is a minimal Jekyll site with MathJax support, clean typography, and a focus on readability.

## Recent Posts

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%b %-d, %Y" }}
{% endfor %}

[View all posts →]({{ '/posts/' | relative_url }})

