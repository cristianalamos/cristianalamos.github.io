---
layout: default
title: Posts
permalink: /posts/
---

# Posts

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url | relative_url }})
<small>{{ post.date | date: "%b %-d, %Y" }}</small>

{{ post.excerpt }}

{% endfor %}

