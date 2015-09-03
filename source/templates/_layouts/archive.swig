<section class="strata">
  <div class="wrapper">
    {% for post in pagination.files|segment(pagination.num, perPage) %}
      <div class="post">
        <a href="{{ post.path.href }}{{ post.path.name }}"><h3 class="heading">{{post.title}}</h3></a>
      </div>
    {% endfor %}
  </div>
</section>

