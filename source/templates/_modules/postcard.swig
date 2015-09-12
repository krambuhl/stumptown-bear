<article class="card" data-href="{{ path.href }}{{ path.name }}">
  <header class="card-header">
    <h3 class="heading">{{ title }}</h3>
    {% if collab %}
    <p class="card-meta">
      <span>{{ date }}</span> with   
      {% if collab.href %}
        <a href="{{ collab.href }}"><span>{{ collab.title }}</span></a>
      {% else %}
        {{ collab.title }}
      {% endif %}
    </p>
    {% endif %}
  </header>

  <div class="card-content">
    <div class="card-image">
      {% if images %}
      <img class="image" src="{{ relativity }}{{ images|first }}" width="100%" alt="{{ title }}" />
      {% else %}
      <img class="image" src="" width="100%" alt="{{ title }}" />
      {% endif %}
    </div>

    {% if excerpt %}
    <p>{{ excerpt|striptags|safe }}</p>
    {% endif %}
  </div>
</article>