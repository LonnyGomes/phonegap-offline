/*jslint node: true */
'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.phonegap_offline = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    settings: function (test) {
        var actualBasePath =
            grunt.config.get('phonegap_offline.settings.basePath');
        var expectedBasePath = "phonegap";

        test.expect(1);
        test.ok(true, "this assertion should pass");
        test.done();
        test.equal(actualBasePath, expectedBasePath);

    },
    custom_options: function (test) {
        test.done();
    }
};
