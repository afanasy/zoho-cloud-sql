Client library for [https://zohoreportsapi.wiki.zoho.com/|Zoho Reports API]

## Installation
```
npm i zoho-reports
```

## Example
```js
var ZohoReports = require('zoho-reports')

var zoho = new ZohoReports({
  user: 'username',
  authtoken: 'authtoken',
  db: 'db'
})

zoho.query('select * from table', function (err, data) {
  console.log(err, data)
})

zoho.count('table', function (err, data) {
  console.log(err, data)
})


zoho.max('table', function (err, data) {
  console.log(err, data)
})
```
