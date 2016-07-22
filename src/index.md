---
template: index.hbs
title: "midas: A CSS syntax highlighter built on top of PostCSS."
---

<p class="byline">A CSS syntax highlighter built on top of <a href="https://github.com/postcss/postcss">PostCSS</a>.</p>

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
* Outputs either HTML strings or virtual DOM trees for easy React integration.
* Highly customisable markup with loads of styling hooks.
* Detects HTML tags, vendor prefixes & media query types.
* Use standalone or with PostCSS plugins.

## API

### `const midas = new Midas([opts])`

However you consume midas, whether it is via PostCSS or standalone usage,
you must instantiate it before it can be used for highlighting.

```js
import Midas from 'midas';

const midas = new Midas();
```

#### opts

* Type: `object`

##### opts.stringify

* Type: `Function|boolean`  
* Default: `toHTML`

Supply a function here to convert midas' internal HAST to a string. By default,
this uses [hast-util-to-html](https://github.com/wooorm/hast-util-to-html).

The function is supplied the internal HAST as the first parameter, then all
other options are passed as arguments when the `process` method is called.

If you supply `false` instead, midas will return its HAST. This is for better
integration with consumers of virtual nodes, such as React.

##### opts.wrap

* Type: `boolean`  
* Default: `true`

By default, midas will wrap the output in `<code></code>`. This option wraps
the `code` tag with `<pre class="midas"></pre>`.

### `midas.process(css, [...args])`

Once midas has been initialised, you can start processing CSS strings.

```js
import Midas from 'midas';

const midas = new Midas();
const output = midas.process('h1{}');
console.log(output);
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

### `midas.stringifier`

To use midas with PostCSS, you must initialise it and then supply the
`stringifier` property. This allows you to highlight CSS that has
optionally been transformed by PostCSS plugins.

```js
import Midas from 'midas';
import postcss from 'postcss';

const midas = new Midas();
const output = postcss().process('h1{}', {stringifier: midas.stringifier}).css;
console.log(output);
```

Note that due to the way that PostCSS stringifiers work, only string types
can be returned. Therefore, if you need midas to output a virtual DOM,
then you should not use this API.

## Install

With npm do:

<a class="install" href="https://npmjs.org/package/midas">
```sh
npm install midas
```
</a>
