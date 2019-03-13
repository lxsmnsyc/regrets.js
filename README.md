# regrets.js

⏰ Asynchronous control structures in JS

[![NPM](https://nodei.co/npm/regrets-js.png)](https://nodei.co/npm/regrets-js/)

[![HitCount](http://hits.dwyl.io/lxsmnsyc/regrets.js.svg)](http://hits.dwyl.io/lxsmnsyc/regrets.js)
[![](https://data.jsdelivr.com/v1/package/npm/regrets-js/badge)](https://www.jsdelivr.com/package/npm/regrets-js)

| Platform | Build Status |
| --- | --- |
| Linux | [![Build Status](https://travis-ci.org/LXSMNSYC/regrets.js.svg?branch=master)](https://travis-ci.org/LXSMNSYC/regrets.js) |
| Windows | [![Build status](https://ci.appveyor.com/api/projects/status/mtsm13ua0ok6dw5j?svg=true)](https://ci.appveyor.com/project/LXSMNSYC/regrets-js) |

[![codecov](https://codecov.io/gh/LXSMNSYC/regrets.js/branch/master/graph/badge.svg)](https://codecov.io/gh/LXSMNSYC/regrets.js)

[![Known Vulnerabilities](https://snyk.io/test/github/LXSMNSYC/regrets.js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/LXSMNSYC/regrets.js?targetFile=package.json)

## What is regrets.js

regrets.js or Regrets allows asynchronous control structures in JS.

Regrets provides asynchronous:

* if-elseif-else
* while-do
* repeat-until
* boolean expressions (and, or, not)
* comparisons (eq, ne, gt, lt, ge, le)
* switch-case-default
* foreach

You can read more here at the [documentation site](https://lxsmnsyc.github.io/regrets.js/).
  
## Usage

### Installation

NPM

```bash
npm i regrets-js
```

CDN

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/regrets-js/dist/index.min.js"></script>
```

### Loading the module

CommonJS

```js
const regrets = require('regrets-js');
```

### Example

#### Delayed odd or even

Checks asynchronously if the number is an odd or an even number.

The result is resolved after 5 seconds.

```js
const sleep = (x, y) => new Promise(z => setTimeout(z, y, x));

const checkParity = x => new regrets.if(sleep(x % 2 === 0, 5000))
  .then(() => console.log('The number is even'))
  .else(() => console.log('The number is odd'))
```

## Build

Clone the repo first then run in Terminal:

```bash
npm install
```

This installs the dependencies, then run:

```bash
npm run build
```

to build the CommonJS module, the browser module, the minified module, the docs, the coverages and the test suite.