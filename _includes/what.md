{% assign vowels = "aeiouAEIUO" %}
{% assign first_letter = include.title | slice: 0 %}
{% if vowels  contains  first_letter %}
{% assign article = "an" %}
{% else %}
{% assign article = "a" %}
{% endif %}

{% if page.collection == "short-files" %}
# Context / Purpose
{% else %}
# What is {{ article }} *{{ include.title }}* in terms of context and purpose?
{% endif %}
