{% for file in hierarchy %}
  {% if loop.last %}
    <span>{{ file.title||file.slug }}</span>
  {% else %}
    <a href="{{file.path.href}}">{{ file.title||file.slug }}</a> &gt;
  {% endif %}
{% endfor %}