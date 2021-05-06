const pgp = require("pg-promise")();

const cn = {
  host: 'theogalode.zapto.org',
  port: 5432,
  database: 'db_mochillax',
  user: 'mochillaxapp',
  password: 'mochillaxapp',
  max: 30
}
const db = pgp(cn);

module.exports = db;