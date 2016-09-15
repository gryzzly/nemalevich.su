var
    markdown    = require('metalsmith-markdown')
  , Metalsmith  = require('metalsmith')
  , templates   = require('metalsmith-templates')
  , assets      = require('metalsmith-assets')
  , debug       = require('metalsmith-debug')
  , collections = require('metalsmith-collections')
  , paths       = require('metalsmith-paths')
  , drafts      = require('metalsmith-drafts')
  , typography  = require('metalsmith-typography')
;

module.exports = function build(done){
  Metalsmith(__dirname)
    .source('../contents')
    .destination('../build')
    .use(drafts())
    .use(collections({
      pages: {
        pattern: '*',
        sortBy: 'order'
      }
    }))
    .use(markdown())
    .use(typography({
      lang: 'ru',
      rules: [
        'save_tags',
        'cleanup_before',
        'short_words',
        'spaces_lite',
        'spaces',
        'hanging',
        'cleanup_after',
        'restore_tags'
      ]
    }))
    .use(paths({
      directoryIndex: 'index.html'
    }))
    .use(templates({
      engine: 'handlebars',
      directory: '../templates',
      default: 'default.hbs'
    }))
    .use(debug())
    .use(assets({
      source: '../assets', // relative to the working directory
      destination: './assets' // relative to the build directory
    }))
    .build(function(err) {
      if (err) {
        throw err;
      }
    }, function () {
      console.log('Built successfully.')
      if (done) done();
    });
};
