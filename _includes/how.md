{% assign vowels = "aeiouAEIUO" %}
{% assign first_letter = include.title | slice: 0 %}
{% if vowels  contains  first_letter %}
{% assign article = "an" %}
{% else %}
{% assign article = "a" %}
{% endif %}

{% if page.collection == "short-files" %}
# How
{% else %}
# How does {{ article}} *{{include.title}}* work in layman's terms? Give a sketch if possible.
{% endif %}
