# Mojebo -  Modern Jekyll Boilerplate

**Start your Jekyll project with this straightforward, minimalistic and modern boilerplate.**

## How to install?

1. Clone this git repository into your project directory.
2. Open a terminal and navigate into that directory.
3. Make sure you have current versions of [Ruby](https://www.ruby-lang.org/en/downloads/), [Rubygems](https://rubygems.org/pages/download) and [NPM](https://www.npmjs.com) installed.
4. Type the command `gem install jekyll bundler`
5. Then, run the command `bundle install && npm install` (Run both commands one by one if you are on Windows)

## How develop and build?

2. Run `npm run build` once initially to create all assets.
2. To run a local development server type `npm start` - then open localhost:4000.
2. Run `npm run build` to run a build for production.

## What tools are included?

- Babel / ES6 Compiling
- Webpack for bundling
- Livereload
- Autoprefixer
- Normalize
- All set for Cloudcannon & Forestry

## What's preconfigured / setup?

- Renaming and structuring into folders into `src` and `dist` for better overview.
- Put pages into `_pages` subfolder for better overview.
- Useful folder structure with minimalistic demo content.
- Frontmatter examples.
- Data examples.
- Simple Mainnavigation based on pages with active state.
- Index file with basic output of all
- Useful of comments and explanations.

## The \_webpack folder

You might have noticed, that there is a `_webpack` folder outside the `src/assets` directory which contains all your Javascript and SCSS folders and files.

*Heres why:*
Since we wan't to be able to use `node_modules` and won't push them to Git, we needed a solution to develop locally with all the modern tools. But then on the server, we just wanna run `jekyll build` everytime we push.
The `jekyll build` functionality is also integrated into Cloudcannon, `npm` is not.

So, with Mojebo we are using *Babel and Webpack* to transpile and bundle modern javascript code and SCSS via Webpack and place the output (main.js and main.css) in the `src/assets` folder where Jekyll can trigger the changes and put them in the `dist` directory.

## Todos

- Add sourcemaps for SCSS

## Help
- If you have any installation issues on MacOS [check this](https://stackoverflow.com/a/26600110)
- If you run into a no-acceptor issue (port in use) [check this](https://gist.github.com/whomwah/6068816)
