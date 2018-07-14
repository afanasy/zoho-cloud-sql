var _ = require('underscore')
var superagent = require('superagent')
var sqlString = require('sqlstring')

var ZohoReports = module.exports = function (d) {
  _.defaults(this, d, {
    url: 'https://reportsapi.zoho.com/api'
  })
}

ZohoReports.prototype.query = function (query, done) {
  var config = {
    ZOHO_ACTION: 'EXPORT',
    ZOHO_OUTPUT_FORMAT: 'JSON',
    ZOHO_ERROR_FORMAT: 'JSON',
    authtoken: this.authtoken,
    ZOHO_API_VERSION: '1.0'
  }
  superagent.post(this.url + '/' + this.user + '/' + this.db).query(config).type('form').send({ZOHO_SQLQUERY: query}).buffer().end(function (err, res) {
    var data = res.text && res.text.replace(/\\'/g, "'")
    if (err)
      return done(err, data)
    try {data = JSON.parse(data)} catch (e) {return done(e, data)}
    if (!data.response)
      return done({message: 'Error parsing response'}, data)
    done(data.response.error, data.response.result)
  })
}

ZohoReports.prototype.count = function (table, field, done) {
  if (_.isFunction(field)) {
    done = field
    field = 'id'
  }
  this.query(sqlString.format('select count(??) from ??', [field, table]), function (err, data) {
    done(err, data && data.rows[0] && data.rows[0][0])
  })
}

ZohoReports.prototype.max = function (table, field, done) {
  if (_.isFunction(field)) {
    done = field
    field = 'id'
  }
  this.query(sqlString.format('select max(??) from ??', [field, table]), function (err, data) {
    done(err, data && data.rows[0] && +data.rows[0][0])
  })
}
