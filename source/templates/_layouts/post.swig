<section class="strata">
  <div class="wrapper extend-base">
    {% for image in images %}
    <div><img src="{{relativity}}{{image}}" width="100%" /></div>
    {% endfor %}

    {{ contents|safe }}
  </div>
</section>