Client library for (Zoho Reports CloudSQL)[https://zohoreportsapi.wiki.zoho.com/Zoho-Reports-CloudSQL.html]

## Example
```js
var ZohoCloudSql = require('zoho-cloud-sql')

var db = new ZohoCloudSql({
  user: 'username',
  authtoken: 'authtoken',
  db: 'db'
})

db.query('select * from table', function (err, data) {
  console.log(err, data)
})

db.count('table', function (err, data) {
  console.log(err, data)
})

db.max('table', function (err, data) {
  console.log(err, data)
})
```
