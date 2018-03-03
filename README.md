# Mojebo -  Modern Jekyll Boilerplate

**Start your Jekyll project with this straightforward, minimalistic and modern boilerplate.**

## How to install?

1. Clone this git repository into your project directory.
2. Open a terminal and navigate into that directory.
3. Make sure you have current versions of [Ruby](https://www.ruby-lang.org/en/downloads/), [Rubygems](https://rubygems.org/pages/download) and [NPM](https://www.npmjs.com) installed.
4. Type the command `gem install jekyll bundler`
5. Then, run the command `bundle install && npm install`
6. If you have any installation issues on MacOS [check this](https://stackoverflow.com/a/26600110)

## How develop and build?

1. To run a local development server type `npm run start`.
2. Run `npm run build` to run a build for production.

## What tools are included?

- Babel / ES6 Compiling
- Webpack for bundling
- Livereload
- Autoprefixer
- Normalize

## What's preconfigured / setup?

- Renaming and structuring into folders into `src` and `dist` for better overview.
- Put pages into `_pages` subfolder for better overview.
- Useful folder structure with minimalistic demo content.
- Frontmatter examples.
- Simple Mainnavigation based on pages with active state.
- Index file with basic output of all
- Useful of comments and explanations.

## Sass Tip

If you include a `_` in front of a filename (ex. `_navBar.sass`), Jekyll will not copy that file in your `dist` folder. It will be bundeled into your `main.scss` entry file.

## The \_webpack folder

You might have noticed, that there is a separate `_webpack` folder outside the `src/assets` directory which contains javascript folders and files. Heres why:

Since there is no standalone jekyll plugin, we are using *Babel and Webpack* to transpile and bundle modern javascript code.

*So, you can still write your JS code directly in `src/assets/js`, but if you are writing ES6/ES7 modules, write them in the \_webpack folder! This will run through webpack and babel and the output will be placed in your `assets/js` source folder. Jekyll will then copy it to the dist.*

## Todos

- Add Sourcemaps for SASS
- Eventually current asset pipeline plugins with [Jekyll Assets](https://github.com/envygeeks/jekyll-assets)
- Eventually replace asset pipeline with webpack only.
