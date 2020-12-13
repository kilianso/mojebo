# Mojebo -  Modern Jekyll Boilerplate

**Start your Jekyll project with this straightforward, minimalistic and modern boilerplate.**

## How to install?

1. Clone this git repository into your project directory.
2. Open a terminal and navigate into that directory.
3. Make sure you have current versions of [Ruby](https://www.ruby-lang.org/en/downloads/), [Rubygems](https://rubygems.org/pages/download) and [NPM](https://www.npmjs.com) or [YARN](https://yarnpkg.con) installed.
4. Type the command `gem install jekyll bundler`
5. Then, run the command `bundle install && yarn install` (Run both commands one by one if you are on Windows)

## How develop and build?

2. Run `yarn run build` once initially to create all assets.
2. To run a local development server type `yarn start` - then open localhost:4000.
2. Run `yarn run build` to run a build for production.

## What tools are included?

- Babel / ES6 Compiling
- Webpack
- Livereload
- Autoprefixer
- Normalize
- All set for Cloudcannon & Forestry

## What's preconfigured / setup?

- Renamed default Jekyll folders to `src` and `dist` for better overview.
- Put pages into `_pages` subfolder for better overview.
- Useful folder structure with minimalistic demo content.
- Frontmatter examples.
- Data examples.
- Simple Mainnavigation based on pages with active state.
- Index file with basic output of all
- Useful of comments and explanations.

## The \_webpack folder

You might have noticed, that there is a `_webpack` folder outside the `src/assets` directory which contains your Javascript and SCSS entry-files.

*Heres why:*
Since we wan't to be able to use `node_modules` and won't push them to Git, we needed a solution to develop locally with all the modern tools. But then on the server, we just wanna run `jekyll build` everytime we push.
The `jekyll build` functionality is also integrated into Cloudcannon, `npm` is not.

So, with Mojebo we are using *Babel and Webpack* to transpile and bundle modern javascript code and SCSS via Webpack and place the output (main.js and main.css) in the `src/assets` folder where Jekyll can trigger the changes and put them in the `dist` directory.

### Development and release-builds

During development, files will be written with `.dev` suffix in the filename. Eg. `main.css` is written as `main.dev.css` 
for the dev builds. The `.dev` files are excluded from VCS via the `.gitignore` file. Feel free to also exclude the release
files, if your using a remote build-system that supports npm.

### Modules

When building frontends we try to encapsulate functionality into modules. 
Having all the code for a single Module at one location helps a lot with finding all required parts of a module.

In the `_includes` folder, you'll find a `_modules` and `_submodules` folder with an example of a module. Each module 
(or submodule for that matter) consists of a template (`.html`), SCSS and JS file. You'd have to include the JS module in your 
`main.js` file. By importing the `.scss` file from your `.js` file, your JS and CSS will be bundled in the output.

If your Module doesn't need any logic, you don't have to create a `JS` file for it. You can just include the `scss` file
from `main.scss` instead of including the `js` file in `main.js`.

There's a `ModuleManager` class that will automatically launch your JS instances for every matching DOM-Node, so that you can
write JS code for an individual module that works even when you load additional content via AJAX or similar.

A basic module looks like this:

```javascript 1.7
import 'mymodule.scss';
import { initOnReady } from '_js/util/helpers';

export default class MyModule {
    constructor(elem) {
        this.el = elem;
    }

    destroy() {
        this.el = null;
    }
}

initOnReady('.mymodule', MyModule);
```

The `initOnReady` helper will connect your Module to a given selector (`.mymodule` in the example above). And instantiate
an instance of `MyModule` for every DOM node that matches the selector. The DOM-Node will be passed to the constructor
of the module. 
Use the `destroy` method to clean up module code after the DOM-Node has been removed.

Have a look at the `demo` and `demogrid` modules for a better example.

_Important note:_ The `ModuleManager` requires at least IE11, because it relies on the [`MutationObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

### Path aliases

Since we have several different folders, there are some aliases configured in `webpack.config.js` that should make it easier
to include files from different folders without having to rely on absolute or complicated relative paths.

The aliases are:
 - `_js`: Points to the `src/_webpack/js` folder.
 - `_m` : Points to the `src/_includes/_modules` folder.
 - `_s` : Points to the `src/_includes/_submodules` folder.
 - `_scss` : Points to the `src/_webpack/scss` folder.
 - `_assets` : Points to the `src/_webpack/assets` folder.
 
Within SCSS, you'd have to use `~_assets/…` to reference assets within `src/_webpack/assets`.

#### Inlined assets

When including assets from the `_webpack/assets` folder, they'll be processed by the webpack loaders. There's a special
loader for assets within `_webpack/assets/inline` that will inline the assets with base64-encoding instead of funneling the file
to the `src/assets` folder. This is useful for small files (eg. icons). For an example, have a look at the `demo.scss` file.

## Help
- If you have any installation issues on MacOS [check this](https://stackoverflow.com/a/26600110)
- If you run into a no-acceptor issue (port in use) [check this](https://gist.github.com/whomwah/6068816)
