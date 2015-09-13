<section class="strata">
  <div class="wrapper extend-base">
    {% for year in collection.posts|sort(true)|groupBy('year') %}
      <h4 class="heading">{{ loop.key }}</h4>
{# 
      {% for month in year %}
        <h5 class="heading">{{ month.date|date('F') }}</h5>

        {% for post in month %}
          <div class="post">
            <a href="{{ post.path.href }}{{ post.path.name }}">{{ post.title }}</a>
          </div>
        {% endfor %}
      {% endfor %} #}

      <br>
    {% endfor %}
  </div>
</section>

