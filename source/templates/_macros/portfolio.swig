{% macro Section(title, query) %}
  <div class="wrapper strata-padded">
    <h3 class="strata-category">{{ title }}</h3>
    <div class="cardgrid cardgrid-two">
    {% for post in collections.portfolio|where(query)|sortby("date")|reverse %}
      {% include "../_modules/postcard.swig" with post %}
    {% endfor %}
    </div>
  </div>
{% endmacro %}