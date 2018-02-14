# Mojebo -  Modern Jekyll Boilerplate

**Start your Jekyll project with this straightforward, minimalistic and modern boilerplate.**

## How to install?

1. Clone this git repository into your project directory.
2. Open a terminal and navigate into that directory.
3. Make sure you have current versions of [Ruby](https://www.ruby-lang.org/en/downloads/) and [Rubygems](https://rubygems.org/pages/download) installed.
4. Type the command `gem install jekyll bundler`
5. Then, run the command `bundle install`
6. If you have any installation issues on MacOS [check this](https://stackoverflow.com/a/26600110)

## How develop and build?

1. To run a local development server type `bundle exec jekyll serve` or simply `jekyll serve`.
2. Add a flag for live reloading while development like this: `jekyll serve --livereload`
2. Run `jekyll build --config "_config.yml, _config_prod.yml"` to run a build with minified SASS.

## What tools are included?

- Babel / ES6 Compiling
- Livereload
- Autoprefixer
- Normalize

## What's preconfigured / setup?

- Renaming and structuring into folders into `src` and `dist` for better overview.
- Put pages into `_pages` subfolder for better overview.
- Useful folder structure with minimalistic demo content.
- Separate production config file with SASS (and soon JS) minifying.
- Frontmatter examples.
- Simple Mainnavigation based on pages with active state.
- Index file with basic output of all
- Useful of comments and explanations.y

## Sass Tip

If you include a `_` in front of a filename (ex. `_navBar.sass`), Jekyll will not copy that file in your `_site` folder. It will be bundeled into your main.scss entry file.

## ES6 Tip

If you would like to trigger the Babel compiler in a ES6 written JS file, just add an empty Dash-Block on top of the file like this:

```
---
---

```

If this is missing, the ES6 code will be copied without compiling to the dist folder.

## Todos

- Replace current asset pipeline plugins with [Jekyll Assets](https://github.com/envygeeks/jekyll-assets)
