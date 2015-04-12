# grunt-phonegap-offline

> Grunt plugin to leverage phonegap in offline environments

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-phonegap-offline --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-phonegap-offline');
```

## The "phonegap_offline" task

### Overview
In your project's Gruntfile, add a section named `phonegap_offline` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  phonegap_offline: {
        settings: {
            command: 'phonegap',
            basePath: 'phonegap',
            appId: 'com.fakecompany.appid',
            appName: 'FakeApp',
            platforms: [ 'ios' ],
            templates: {
                www: 'test/fixtures/www',
                ios: 'test/fixtures/ios'
            }
        }
  }
})
```

### Settings

#### settings.command
Type: `String`
Default value: `'phonegap'`
Required: `no`

The command name use to execute the phonegap CLI.

#### settings.basePath
Type: `String`
Default value: `'.'`
Required: `no`

The path relative to `Gruntfile.js` where the phonegap application gets installed

#### settings.appId
Type: `String`
Default value: `'com.test.testapp'`
Required: `no`

The unique id assigned to the app. It should only contain any special characters outside `.` and `_`. This value is not readily visible to the user and is typically represented in reverse URL format.

#### settings.appName
Type: `String`
Default value: `'TestApp'`
Required: `no`

The name of the app without any special characters (including spaces). The `appName` is what appears to the user along with the app icon. It is possible to add spaces in the `appName` after the platform is created.

#### settings.platforms
Type: `Array`
Default value: `N/A`
Supported values: `ios`
Required: `yes`

A list of phonegap platforms supported for the phonegap project. Currently, iOS is the only supported platform. For a list of all supported phonegap platforms, see [here](http://docs.build.phonegap.com/en_US/introduction_supported_platforms.md.html).

#### settings.templates
Type: `Object`
Default value: `N/A`
Supported object values: `www | ios`
Required: `yes`

The `templates` property maps platform templates to their file locations rather then pulling down the templates from the internet. It is constructed as an object of `template_name`/`template_path` key/value pairs. The `www` is required as well as any other platform defined in `settings.platforms` array.

For instance, if the platforms array included `ios` and the template path for `ios` was '/usr/local/templates/ios', there must be a corresponding `ios` key/value pair in the `settings.template` object.

```js
{
    settings: {
        ...
        platforms: [ 'ios' ],
        templates: {
            ios: '/usr/local/templates/ios'
        }
        ...
    }
}
```

The default template for `www` is located in `test/fixtures/www` for this repository and was derived from  
A list of phonegap platforms supported for the phonegap project. Currently, iOS is the only supported platform. For a list of all supported phonegap platforms, see [here](http://docs.build.phonegap.com/en_US/introduction_supported_platforms.md.html).

### Usage Example

The following configuration would initialize a phongap app targeted for `ios` within the `app` with an app id of `com.fakecompany.appid`, an app name of `appName` and would pull it's www template from `test/fixtures/www` and it's `ios` template from `test/fixtures/ios`.

```js
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Configuration to be run (and then tested).
    phonegap_offline: {
        settings: {
            command: 'phonegap',
            basePath: 'app',
            appId: 'com.fakecompany.appid',
            appName: 'FakeApp',
            platforms: [ 'ios' ],
            templates: {
                www: 'test/fixtures/www',
                ios: 'test/fixtures/ios'
            }
        }
    }
});
```

### Tasks

The `phonegap_offline` grunt extention consists of several sub tasks. The name of the subtask is separted by a ':' as seen below.

#### create

The default sub task for phonegap_offline is create. It creates a phonegap application based off of the configuration supplied in the `Gruntfile.js`. If the phonegap `basePath` already exists, the create process is skipped. Access the create subtask by appending it to the `phonegap_offline` task separated by a `':'`.

```
grunt phonegap_offline:create
```

#### add

The `add` task adds a platform for phonegap application. The `create` task must have been run beforehand. To add the `ios` platform to your project, you would run the following command.

```
grunt phonegap_offline:add:ios
```

#### prepare

The `prepare` task runs `phonegap prepare <platform>`. If the platform argument is omitted, all installed platforms will be updated.

Running `prepare` for the `ios` platform:

```
grunt phonegap_offline:prepare:ios
```

Running `prepare` without targetting a platform:

```
grunt phonegap_offline:prepare
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Lonny Gomes. Licensed under the MIT license.
