var
  _ = require('underscore'),
  request = require('request'),
  sqlString = require('sqlstring')


var ZohoReports = module.exports = function (d) {
  _.defaults(this, d, {
    url: 'https://reportsapi.zoho.com/api'
  })
}

ZohoReports.prototype.query = function (query, done) {
  var get = {
    ZOHO_ACTION: 'EXPORT',
    ZOHO_OUTPUT_FORMAT: 'JSON',
    ZOHO_ERROR_FORMAT: 'JSON',
    authtoken: this.authtoken,
    ZOHO_API_VERSION: '1.0'
  }
  request.post({url: this.url + '/' + this.user + '/' + this.db, qs: get, form: {ZOHO_SQLQUERY: query}}, function (err, res, data) {
    data = data && data.replace(/\\'/g, "'")
    if (err)
      return done(err, data)
    try {
      data = JSON.parse(data)
    }
    catch (e) {
      return done({message: 'JSON.parse error'}, data)
    }
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
    done(err, data && data.rows[0] && +data.rows[0][0])
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
