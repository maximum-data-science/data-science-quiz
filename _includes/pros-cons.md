{% assign vowels = "aeiouAEIUO" %}
{% assign letters = include.title | split: "" %}
{% if vowels  contains  letters[0] %}
{% assign article = "an" %}
{% else %}
{% assign article = "a" %}
{% endif %}

{% if page.collection == "short-files" %}
# Pros / Cons
{% else %}
# What other solution can you think of in terms of {{ article }} *{{include.title}}*? What are pros and cons in comparison to other solutions?
{% endif %}
