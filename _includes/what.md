{% assign vowels = "aeiouAEIUO" %}
{% assign letters = include.title | split: "" %}
{% if vowels  contains  letters[0] %}
{% assign article = "an" %}
{% else %}
{% assign article = "a" %}
{% endif %}

{% if page.collection == "short-files" %}
# Context / Purpose
{% else %}
# What is {{ article }} *{{ include.title }}* in terms of context and purpose?
{% endif %}
