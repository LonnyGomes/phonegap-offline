/*jslint node: true, nomen: true */

/*
 * grunt-phonegap-offline
 *
 *
 * Copyright (c) 2015 Lonny Gomes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var _ = require('lodash'),
        path = require('path'),
        settingsKey = 'phonegap_offline.settings',
        settingsDefaults = {
            command: 'phonegap',
            basePath: '.',
            appId: 'com.test.testapp',
            appName: 'TestApp',
            platforms: [
                'invalid'
            ],
            templates: {
                www: 'test/fixtures/www_invalid',
                ios: 'test/fixtures/ios_invalid'
            }
        },
        supportedPlatforms = [ 'ios' ],
        requiredTemplates = [ 'www' ],
        description = 'Phonegap wraper for offline configruations';

    function phonegapCreate(s) {
        var appPath = path.resolve(s.basePath),
            //generate phonegap config based off of provided settings
            platformsObj = s.platforms.reduce(function (prev, cur) {
                prev.lib[cur] = {
                    url: s.templates[cur]
                };

                return prev;
            }, {
                lib: {
                    www: {
                        url: s.templates.www
                    }
                }
            });

        if (grunt.file.exists(s.basePath)) {
            grunt.log.writeln('The phonegap path already exists, skipping create process');
            return;
        }
    }

    grunt.task.registerTask('phonegap_offline', description, function (action, platform) {
        var settings,
            platformCheck,
            templatesCheck,
            actions = {
                create: function (s) {
                    return phonegapCreate(s);
                }
            };

        //settings must be defined before we continue
        grunt.config.requires(settingsKey);

        //platforms and templates are also required field
        grunt.config.requires(settingsKey + ".platforms");
        grunt.config.requires(settingsKey + ".templates");

        //retrieve settings and merge with defaults
        settings = grunt.config.get(settingsKey);
        settings = _.defaults(settings, settingsDefaults);
        grunt.config.merge({
            phonegap_offline: {
                settings: settings
            }
        });

        //check for valid supported platforms
        platformCheck = _.difference(settings.platforms, supportedPlatforms);

        if (platformCheck.length > 0) {
            grunt.fail.fatal('The ' +
                            platformCheck[0] +
                            ' platform is not supported!');
        }

        //check for required templates
        requiredTemplates.forEach(function (curTemplate) {
            var templatePath;

            if (!settings.templates[curTemplate]) {
                grunt.fail.fatal('The required template "' +
                                curTemplate +
                                '" was not defined!');
            }

            templatePath = path.resolve(settings.templates[curTemplate]);
            if (!grunt.file.exists(templatePath)) {
                grunt.fail.fatal('Invalid template path for ' + curTemplate +
                                 ': ' + templatePath);
            }
        });

        //check to make sure defined platforms have a corresponding template
        settings.platforms.forEach(function (curPlatform) {
            if (!settings.templates[curPlatform]) {
                grunt.fail.fatal('A template must be defined for the ' +
                                curPlatform + ' platform');
            }
        });

        //if no parameters were supplied perform following actions:
        //    create, add_platform and prepare
        if (!action) {
            phonegapCreate(settings);
        } else {
            //arguments were supplied, check if they are valid
            if (actions[action]) {
                actions[action](settings, platform);
            } else {
                grunt.fail.fatal('Invalid action: "' + action + '"');
            }
        }


    });

};
