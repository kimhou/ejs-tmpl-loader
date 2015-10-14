# ejs-tmpl-loader for webpack

EJS loader for [webpack](http://webpack.github.io/). Uses [ejs](https://github.com/mde/ejs) function to compile templates.

To use [EJS by tj](https://github.com/tj/ejs) use 1.x branch and 1.x.x versions.

## Installation

`npm install ejs-tmpl-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("ejs-tmpl!./file.ejs");
// => returns the template function compiled with ejs templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data

```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)



