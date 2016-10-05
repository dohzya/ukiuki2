var moment = require('moment');
require('moment/locale/fr');

exports.getDate = function (post, field) {
  var date = post.getDate(field);
  return moment(date).format('LL');
};
