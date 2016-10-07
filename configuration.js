exports.Configuration = {

  apiEndpoint: process.env.PRISMIC_API_URL,

  // -- Access token if the Master is not open
  accessToken: process.env.PRISMIC_API_TOKEN,

  domainBaseUrl: 'http://okawari.dohzya.com',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: function (doc) {
    if (doc.type == 'blog') {
      return '/';
    }
    if (doc.type == 'post') {
      return '/article/' + encodeURIComponent(doc.uid);
    }

    return '/';
  },

  onPrismicError: function (err, req, res, context) {
    res.status(500).send("Error 500: " + err.message);
    console.error("Error ", {context:context}, ")", err);
  }

};
