const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to db...');
});

const createOrdersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      orders(
        id serial PRIMARY KEY,
        foodname VARCHAR(20) NOT NULL,
        quantity SMALLINT NOT NULL,
        price NUMERIC NOT NULL,
        foodstatus VARCHAR(20) NOT NULL,
        owner_id INT NOT NULL,
        date_created TIMESTAMP NOT NULL,
        date_modified TIMESTAMP
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
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

const dropOrdersTable = () => {
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

const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id serial PRIMARY KEY,
        fullname VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
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

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
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

const createMenuTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      menu(
        id serial PRIMARY KEY,
        foodname VARCHAR(20) NOT NULL,
        price NUMERIC NOT NULL,
        date_created TIMESTAMP NOT NULL,
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

const dropMenuTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
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

const createAllTables = () => {
  createMenuTable();
  createUsersTable();
  createOrdersTable();
};

const dropAllTables = () => {
  dropMenuTable();
  dropUsersTable();
  dropOrdersTable();
};
pool.on('remove', () => {
  console.log('connection ended...');
  process.exit(0);
});

module.exports = {
  createMenuTable,
  dropMenuTable,
  createAllTables,
  dropAllTables,
  createUsersTable,
  createOrdersTable,
  dropUsersTable,
  dropOrdersTable,
};

require('make-runnable');
