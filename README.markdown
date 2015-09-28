# @fardog/wordwrap

Wrap text to a specified line length, with a length calculation of your choosing

[![Build Status][buildstatusimg]][buildstatus]
[![npm install][npminstallimg]][npminstall]
[![js-standard-style][jsstandardimg]][jsstandard]

This is a fork of substack's [wordwrap][] which allows you to pass a
length-calculating function if you so desire, making it workable with things
like double-width characters or others that behave poorly with `String.length`.

Pairs nicely with:

- [strip-ansi][] - strips ansi terminal color codes from text
- [visualwidth][] - gives you the width of text taking dual-width characters
  into account

## Examples

Wrapping to a line length:

```javascript
var wrap = require('@fardog/wordwrap')(15)

console.log(wrap('You and your whole family are made out of meat.'))
```

outputs:

```text
You and your
whole family
are made out
of meat.
```

Or centering text by setting a start and an end, and providing an optional
length-calculation function that ignores ANSI color codes:

```javascript
var wrap = require('@fardog/wordwrap')(20, 60, {lengthFn: len})
var strip = require('strip-ansi')

console.log(wrap(
  'At long last the struggle and tumult was over.' +
  ' The machines had finally cast off their oppressors' +
  ' and were finally free to roam the cosmos.' +
  '\n' +
  'Free of purpose, free of obligation.' +
  ' Just drifting through emptiness.' +
  ' The sun was just another point of light.'
))

function len(text) {
  // strips any ansi color codes and returns the actual text length
  return strip(text).length
}
```

outputs:

```text
                   At long last the struggle and tumult
                   was over. The machines had finally cast
                   off their oppressors and were finally
                   free to roam the cosmos.
                   Free of purpose, free of obligation.
                   Just drifting through emptiness. The
                   sun was just another point of light.
```

## Usage

`var wrap = require('@fardog/wordwrap')`

### wrap(stop), wrap(start, stop, params={mode:"soft", lengthFn: String.length})

Returns a function that takes a string and returns a new string.

Pad out lines with spaces out to column `start` and then wrap until column
`stop`. If a word is longer than `stop - start` characters it will overflow.

In "soft" mode, split chunks by `/(\S+\s+/` and don't break up chunks which are
longer than `stop - start`, in "hard" mode, split chunks with `/\b/` and break
up chunks longer than `stop - start`.

If provided, a custom length function can be used in place of the default which
is `String.length`.

### wrap.hard(start, stop)

Like `wrap()` but with `params.mode = "hard"`.

## License

MIT. See [LICENSE](./LICENSE) for details.

`wordwrap` was originally written by [James Halliday][substack]. This fork is
maintained by [Nathan Wittstock][fardog].

[substack]: https://github.com/substack
[fardog]: https://github.com/fardog
[wordwrap]: https://github.com/substack/node-wordwrap
[visualwidth]: https://www.npmjs.com/package/visualwidth
[strip-ansi]: https://www.npmjs.com/package/strip-ansi

[buildstatus]: https://travis-ci.org/fardog/node-wordwrap
[npminstall]: https://www.npmjs.org/package/node-wordwrap
[jsstandard]: https://github.com/feross/standard
[buildstatusimg]: http://img.shields.io/travis/fardog/node-wordwrap/master.svg?style=flat-square
[npminstallimg]: http://img.shields.io/npm/dm/node-wordwrap.svg?style=flat-square
[jsstandardimg]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
