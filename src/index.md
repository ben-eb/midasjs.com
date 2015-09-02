---
template: index.hbs
title: "midas: A syntax highlighter built on top of PostCSS."
---

<p class="byline">A syntax highlighter built on top of <a href="https://github.com/postcss/postcss">PostCSS</a>.</p>

```css
@charset "UTF-8";

a[href*="test"] {
  font-weight: 700;
}

#h1 {
  color: #000!important;
  background: url('cat.jpg') no-repeat;
}

* {
  color: rgba(255, 255, 255, 0.5);
}

/**
 * block comment
 */

.class, a:before {
  content: 'Hello!';
}

@media only screen and (min-width: 500px) {
  .class {
    -webkit-border-radius: 6px;
            border-radius: 6px;
  }
}
```

## Features

* 94 different [Base 16 themes](https://github.com/chriskempson/base16) - 47
  palettes with light & dark variants.
* Highly customisable markup with loads of styling hooks.
* Detects HTML tags, vendor prefixes & media query types.
* Use standalone or with PostCSS plugins.

## API

### `midas(css)`

midas exposes a PostCSS processor instance. This means that you can use it
both asynchronously:

```js
var midas = require('midas');

midas('h1{}').then(function (result) {
    console.log(result.content); // HTML output
});
```

Or you can use the synchronous API:

```js
var midas = require('midas');

var result = midas('h1{}').content;
console.log(result); // HTML output
```

This will output (indentation added for readability):

```html
<pre class="midas">
    <code>
        <span class="midas__selector">
            <span class="midas__tag">h1</span>
        </span>

        <span class="midas__brace">{</span>
        <span class="midas__brace">}</span>
    </code>
</pre>
```

#### css

* Type: `string`
* *Required option.*

Pass a CSS string to highlight.

### CLI

midas also ships with a CLI app. To see the available options, just run:

```sh
midas --help
```

### `postcss().process(css, {stringifier: midas})`

midas can also be loaded into an existing PostCSS instance, so that you can
highlight CSS that is transformed by PostCSS plugins.

## Install

With npm do:

<a class="install" href="https://npmjs.org/package/midas">
```sh
npm install midas
```
</a>
