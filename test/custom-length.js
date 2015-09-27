var fs = require('fs');
var path = require('path');

var strip = require('strip-ansi');
var test = require('tape');

var lib = require('../');

var file = fs.readFileSync(path.join(__dirname, 'ansi-colored.txt'), 'utf8');

test('can use custom length function', function (t) {
    var wrap = lib({
        start: 0,
        stop: 80,
        lengthFn: lengthFn
    });

    var wrapped = wrap(file.split('\n').join(' '));
    var control = strip(file);

    var wrappedLines = wrapped.split('\n');
    var controlLines = control.split('\n');

    t.equal(
        wrappedLines.length,
        controlLines.length,
        'should contain the same number of lines'
    );

    for (var i = 0; i < wrappedLines.length; ++i) {
        t.equal(
            strip(wrappedLines[i]).length,
            controlLines[i].length,
            'each line should be equal'
        );
    }

    t.end();
})

function lengthFn (chunk) {
    return strip(chunk).length;
}
