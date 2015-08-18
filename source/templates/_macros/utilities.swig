{% macro heading(level, text) %}
<h{{ level }}>{{ text|safe }}</h{{ level }}>
{% endmacro %}

{% macro link(href, text) %}
<a href="{{ href }}">{{ text|safe }}</a>
{% endmacro %}