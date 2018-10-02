import db from '../db';

const orders = (req, res) => {
  const findAllQuery = 'SELECT * FROM orders';
  try {
    const { rows, rowCount } = db.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default orders;
