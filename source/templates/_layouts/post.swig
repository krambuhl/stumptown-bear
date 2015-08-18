{{ contents|safe }}

{% for image in images %}
<div><img src="http://stream.stumptownbear.com/{{image}}" width="100%" /></div>
{% endfor %}
