/*jslint node: true */
/*
 * grunt-phonegap-offline
 *
 *
 * Copyright (c) 2015 Lonny Gomes
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
            phonegap: ['phonegap']
        },

        // Configuration to be run (and then tested).
        phonegap_offline: {
            settings: {
                command: 'phonegap',
                basePath: 'phonegap',
                appId: 'com.fakecompany.appid',
                appName: 'FakeApp',
                appUrlScheme: 'testScheme',
                platforms: [ 'ios' ],
                templates: {
                    www: 'test/fixtures/www',
                    ios: 'test/fixtures/ios'
                },
                plugins: [
                    'test/fixtures/plugins/cordova-plugin-console'
                ],
                icons: {
                    ios: {
                        icon29: 'test/fixtures/icons/AppIcon29x29.png',
                        icon29x2: 'test/fixtures/icons/AppIcon29x29@2x.png',
                        icon40: 'test/fixtures/icons/AppIcon40x40.png',
                        icon40x2: 'test/fixtures/icons/AppIcon40x40@2x.png',
                        icon57: 'test/fixtures/icons/AppIcon57x57.png',
                        icon57x2: 'test/fixtures/icons/AppIcon57x57@2x.png',
                        icon60: 'test/fixtures/icons/AppIcon60x60.png',
                        icon60x2: 'test/fixtures/icons/AppIcon60x60@2x.png',
                        icon72: 'test/fixtures/icons/AppIcon72x72.png',
                        icon72x2: 'test/fixtures/icons/AppIcon72x72@2x.png',
                        icon76: 'test/fixtures/icons/AppIcon76x76.png',
                        icon76x2: 'test/fixtures/icons/AppIcon76x76@2x.png'
                    }
                },
                packaging: {
                    ios: {
                        provisioningProfileName: 'iOS Team Provisioning Profile: *'
                    }
                },
                outputPath: 'output'
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'phonegap_offline', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
