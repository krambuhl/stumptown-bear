{{ contents|safe }}

{% for script in scripts %}
  <script src="{{ script }}"></script>
{% endfor %}