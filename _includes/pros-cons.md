{% assign vowels = "aeiouAEIUO" %}
{% assign first_letter = include.title | slice: 0 %}
{% if vowels  contains  first_letter %}
{% assign article = "an" %}
{% else %}
{% assign article = "a" %}
{% endif %}

{% if page.collection == "short-files" %}
# Pros / Cons
{% else %}
# What other solution can you think of in terms of {{ article }} *{{include.title}}*? What are pros and cons in comparison to other solutions?
{% endif %}
