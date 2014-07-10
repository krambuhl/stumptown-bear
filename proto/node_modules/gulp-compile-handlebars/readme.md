# [gulp](https://github.com/wearefractal/gulp)-compile-handlebars
Forked from [gulp-template](https://github.com/sindresorhus/gulp-template)
Inspired by [grunt-compile-handlebars](https://github.com/patrickkettner/grunt-compile-handlebars)

> Compile [Handlebars templates](http://www.handlebarsjs.com/)

## Install

Install with [npm](https://npmjs.org/package/gulp-compile-handlebars)

```
npm install --save-dev gulp-compile-handlebars
```


## Example

### `src/hello.handlebars`

```erb
<h1>Hello {{firstName}}</h1>
<h2>HELLO! {{capitals firstName}}</h2>
{{> footer}}
```

### `gulpfile.js`

```js
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');

gulp.task('default', function () {
	var templateData = {
		firstName: 'Kaanon'
	},
	options = {
		partials : {
			footer : '<footer>the end</footer>'
		},
		helpers : {
			capitals : function(str){
				return str.toUpperCase();	
			}
		}
	}

	return gulp.src('src/hello.handlebars')
		.pipe(handlebars(templateData, options))
		.pipe(rename('hello.html'))
		.pipe(gulp.dest('dist'));
});
```

### `dist/hello.html`

```html
<h1>Hello Kaanon</h1>
<h2>HELLO! KAANON</h2>
<footer>the end</footer>
```

## License

MIT © [Kaanon MacFarlane](http://kaanon.com)
