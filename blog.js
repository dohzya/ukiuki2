var Prismic = require('express-prismic').Prismic;
var configuration = require('./configuration').Configuration;

exports.bloghome = function(req, res) {
  res.locals.config = configuration;
  var p = Prismic.withContext(req, res);
  p.queryFirst(Prismic.Predicates.at('document.type', 'bloghome'), function (err, bloghome) {
    if (err) { configuration.onPrismicError(err, req, res, 'get bloghome'); return; }
    if (bloghome) {
      var page = currentPage(req);
      var options = {
        page: page,
        orderings: '[my.post.date desc]'
      };
      p.query(Prismic.Predicates.at('document.type', 'post'), options, function (err, posts) {
        if (err) { configuration.onPrismicError(err, req, res, 'list posts'); return; }
        res.render('bloghome', {
          bloghome: bloghome,
          posts: posts.results
        });
      });
    } else {
      res.status(404).send('Not found');
    }
  });
};

exports.post = function(req, res) {
  res.locals.config = configuration;
  var uid = req.params.uid;
  var p = Prismic.withContext(req, res);
  p.getByUID('post', uid, function then(err, post) {
    if (err) { configuration.onPrismicError(err, req, res, 'get post'); return; }
    if (post) {
      res.render('post', {'post': post});
    } else {
      res.status(404).send('Not found');
    }
  });
};

function currentPage(request) {
  return request.params.p || '1';
}
