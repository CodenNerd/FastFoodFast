const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to db...');
});

const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      orders(
        id UUID PRIMARY KEY,
        foodname VARCHAR(20) NOT NULL,
        quantity SMALLINT NOT NULL,
        price NUMERIC NOT NULL,
        foodstatus VARCHAR(20) NOT NULL,
        owner_id INT NOT NULL,
        date_created TIMESTAMP,
        date_modified TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS orders';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('connection ended...');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');
