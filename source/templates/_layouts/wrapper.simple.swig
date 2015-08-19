<!DOCTYPE html>
<html lang="en-US" dir="ltr">
<head>
  <title>{% if title && title != "Stumptown Bear" %}{{ title }} - {% else %}{% endif %}Stumptown Bear</title>
  <meta name="description" content="The home of Evan Krambuhl on the internet: an Experience Developer and Designer" />
  <meta name="author" content="Evan Krambuhl" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" />

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  
  <link href="{{relativity}}assets/style.css" rel="stylesheet" />
  <link href="{{relativity}}assets/icons.css" rel="stylesheet" />
</head>
<body>


{% include "../_modules/core/mast.swig" %}

<div class="l-contents container">{{ contents|safe }}</div>

{% include "../_modules/core/footer.swig" %}

<script src="{{relativity}}assets/bundle.js"></script>

</body>
</html>