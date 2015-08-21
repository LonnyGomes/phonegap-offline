# grunt-phonegap-offline

> Grunt plugin to leverage phonegap in offline environments

## Use Cases

* creating phonegap apps with custom starter templates
* building a phonegap on a private company LAN
* continuous intergration builds for phonegap applications

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

The following configuration would initialize a phongap app targeted for `ios` within the `app` with an app id of `com.fakecompany.appid`, an app name of `appName` and it would respond to a URL scheme of `faceurlscheme://`.

The base HTML template for phonegap would be copied from `test/fixtures/www` and it's `ios` template from `test/fixtures/ios`. After adding the `ios` platform, the app icons from the `icons` folder will be copied into the proper phonegap location for the `ios` build.

By running `phonegap_offline:plugins` an offline version of `cordova-plugin-console` would be installed for the `ios` platform.

The packaging section defines build settings for each platform needed to generate the final files. In this case, the code signing identity and UUID of rht provisioning profile are used to archive the iOS app and the `provisioningProfileName` is used to package the final ipa file which will be saved to the `outputPath`.

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
            appUrlScheme: 'fakeurlscheme',
            platforms: [ 'ios' ],
            templates: {
                www: 'test/fixtures/www',
                ios: 'test/fixtures/ios'
            },
            plugins: {
                'test/fixtures/plugins/cordova-plugin-console'
            },
            icons: {
                ios: {
                        icon29: 'icons/AppIcon29x29.png',
                        icon29x2: 'icons/AppIcon29x29@2x.png',
                        icon40: 'icons/AppIcon40x40.png',
                        icon40x2: 'icons/AppIcon40x40@2x.png',
                        icon57: 'icons/AppIcon57x57.png',
                        icon57x2: 'icons/AppIcon57x57@2x.png',
                        icon60: 'icons/AppIcon60x60.png',
                        icon60x2: 'icons/AppIcon60x60@2x.png',
                        icon72: 'icons/AppIcon72x72.png',
                        icon72x2: 'icons/AppIcon72x72@2x.png',
                        icon76: 'icons/AppIcon76x76.png',
                        icon76x2: 'icons/AppIcon76x76@2x.png'
                    }
                }
            },
            packaging: {
                ios: {
                    provisioningProfileName: 'iOS Team Provisioning Profile: *',
                    codeSignIdentity: 'iPhone Distribution',
                    provisioningProfileUUID: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                }
            },
            outputPath: 'output'
        }
    }
});
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

#### settings.appUrlScheme
Type: `String`

Default value: `'N/A'`

Required: `no`

The URL scheme the app should register. A URL scheme allows your app to be invoked externally by an HTML href or a call from another app. This option is optional but if the value is set, `grunt-phonegap-offline` will update the iOS project's plist file for URL types with `appUrlScheme` being the url that could be invoked extenrally the `appId` acting as the URL name identifier.

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

The `templates` property maps platform templates to their file locations rather then pulling down the templates from the internet. It is constructed as an object of template_name/template_path key value pairs. The `www` template is required as well as any other platform defined in `settings.platforms` array.

For instance, if the platforms array included `ios` and the template path for `ios` was '/usr/local/templates/ios', there must be a corresponding `ios` key/value pair in the `settings.template` object.

```js
{
    settings: {
        ...
        platforms: [ 'ios' ],
        templates: {
            ios: '/usr/local/templates/ios'
        }
    }
}
```

The default template for `www` is located in `test/fixtures/www` for this repository and was derived from [here](https://github.com/apache/cordova-app-hello-world). The `ios` template is located in `test/fixtures/ios` which was cloned from it's [GitHub mirror](https://github.com/apache/cordova-ios).

A list of phonegap platforms supported for the phonegap project. Currently, iOS is the only supported platform. For a list of all supported phonegap platforms, see [here](http://docs.build.phonegap.com/en_US/introduction_supported_platforms.md.html).

#### settings.plugins
Type: `Array`

Default value: `N/A`

Supported values: `relative base paths to phonegap/cordova plugins`

Required: `no`

The `plugins` setting provides a method to install local copies of phonegap plugins. This setting is run when running `grunt phonegap_offline:plugins` and will attempt to install all listed plugins.

#### settings.icons
Type: `Object`

Default value: `N/A`

Supported object values: `ios`

Valid icon values for ios: `icon29`, `icon29x2`, `icon40`, `icon40x2`, `icon57`, `icon57x2`, `icon60`, `icon60x2`, `icon72`, `icon72x2`, `icon76`, `icon76x2`

Required: `no`

The icons parameter defines the location of custom icons based on the platform. The platform must also be defined in the `settings.platforms` parameter and it must be valid. All the fields are optional and if not defined the default phonegap icons will be used.

The icons definitions are used to copy the icons into the proper location with the `phonegap_offline:icons` sub task. Additionally, the `phonegap_offline:icons` task gets automatically whenever the `phonegap_offline:platform` task is run.

```js
{
    settings: {
        ...
        platforms: [ 'ios' ],
        icons: {
            ios: {
                icon29: 'icons/AppIcon29x29.png',
                icon29x2: 'icons/AppIcon29x29@2x.png',
                icon40: 'icons/AppIcon40x40.png',
                icon40x2: 'icons/AppIcon40x40@2x.png',
                icon57: 'icons/AppIcon57x57.png',
                icon57x2: 'icons/AppIcon57x57@2x.png',
                icon60: 'icons/AppIcon60x60.png',
                icon60x2: 'icons/AppIcon60x60@2x.png',
                icon72: 'icons/AppIcon72x72.png',
                icon72x2: 'icons/AppIcon72x72@2x.png',
                icon76: 'icons/AppIcon76x76.png',
                icon76x2: 'icons/AppIcon76x76@2x.png'
            }
        }
    }
}
```

#### settings.packaging
Type: `Object`

Default value: `'N/A'`

Supported object values: `ios`

The packaging section defines any build parameters required to package a particular platform. The structure is as follows:

```json
packaging: {
    ios: {
        provisioningProfileName: 'iOS Team Provisioning Profile: *',
        codeSignIdentity: 'iPhone Distribution',
        provisioningProfileUUID: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }
}
```
#### settings.packaging.ios

The only required setting for iOS packaging is the `provisioningProfileName` parameter. If `codeSignIdentity` or `provisioningProfileUUID` aren't defined, these values are retrieved from the Xcode project settings. The advantage to defining these two fields is that the ipa could be built without having to modify the Code Signing Build Settings within the project.

 iOS parameter              | Description
-----------------------------| -------------------------------
 provisioningProfileName    | the name (not filename) of profile (Xcode > Build Settings > Code Signing > Provisioning Profile)
 codeSignIdentity           | the name (not filename) of distribution cert (Xcode > Build Settings > Code Signing > Code Signing Identity)
 provisioningProfileUUID    | the UUID of the profile reference in the `provisioningProfileName` parameter (retrieve it by selecting other in Xcode Provisioing Profile settings)


#### settings.outputPath
Type: `String`

Default value: `'N/A'`

Required: `no`

The output path defines the final destination of any package phonegap builds, i.e. the ipa for the product.

### Tasks

The `phonegap_offline` grunt extention consists of several sub tasks. The name of the subtask is separted by a ':' as seen below.

#### create

The default sub task for phonegap_offline is create. It creates a phonegap application based off of the configuration supplied in the `Gruntfile.js`. If the phonegap `basePath` already exists, the create process is skipped. Access the create subtask by appending it to the `phonegap_offline` task separated by a `':'`.

```
grunt phonegap_offline:create
```

#### add

The `add` task adds a platform for phonegap application. The `create` task must have been run beforehand. To add the `ios` platform to your project, you would run the following command:

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
#### plugins

The `plugins` taks runs `phonegap plugin add <plugin_file_location>` where `plugin_file_location` refers to a list of file locations to local copies of phonegap plugins defined in the `plugins` settings option.  To install the defined plugins runt the following command:

```
grunt phonegap_offline:plugins
```

_NOTE:_ the phonegap build subtask is immediately invoked after all plugins are successfully installed

#### icons

The `icons` tasks copies icons referenced in the `settings.icons` config to it's corresponding phonegap location. The task can copying all icons or only icons for a specific platform.

Copy corresponding icons for every defined platform:

```
grunt phonegap_offline:icons
```

Copy only icons for the `ios` platform:

```
grunt phonegap_offline:icons:ios
```

#### build

The `build` task invokes the `phonegap build` command and is used to compile any native code required by plugins.

You can either invoke build for all platforms (currently only iOS is suppored)

```
grunt phonegap_offline:build
```

Or specify a particular platform to build

```
grunt phonegap_offline:build:ios
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

#### v0.2.1

* added optional `codeSignIdentity` and `provisioningProfileUUID` packaging parameters which will override the settings within the Xcode project during the code signing process

#### v0.2.0

* added plugins sub task loads plugins stored locally
* added build sub task as shortcut to `phonegap build`
* added package sub task that builds an ipa for the project

#### v0.1.1
* Added road map and fixed MD formatting errors

#### v0.1.0

* initial release
* implemented `create`, `platform`, `prepare` and `icons` tasks for iOS

## Road map

* Add build tasks for iOS
* Android support
* Convert to multi-task structure


## License
Copyright (c) 2015 Lonny Gomes. Licensed under the MIT license.
