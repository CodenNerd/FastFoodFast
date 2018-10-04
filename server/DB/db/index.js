import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.TEST_URL,
  });
}

export default {

  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
