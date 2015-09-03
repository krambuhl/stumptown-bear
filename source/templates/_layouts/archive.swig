<section class="strata">
  <div class="wrapper">
    {% for post in pagination.files|segment(pagination.num, perPage) %}
      <div class="post">
        <h3 class="heading"><a href="{{ post.path.href }}{{ post.path.name }}">{{post.title}}</a></h3>
      </div>
    {% endfor %}

    {{contents|safe}}
  </div>
</section>

