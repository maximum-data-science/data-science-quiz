{% assign vowels = "aeiouAEIUO" %}
{% assign letters = include.title | split: "" %}
{% if vowels  contains  letters[0] %}
{% assign article = "an" %}
{% else %}
{% assign article = "a" %}
{% endif %}

{% if page.collection == "short-files" %}
# How
{% else %}
# How does {{ article}} *{{include.title}}* work in layman's terms? Give a sketch if possible.
{% endif %}
