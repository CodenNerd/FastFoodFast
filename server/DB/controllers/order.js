import db from '../db';

const order = (req, res) => {
  const text = 'SELECT * FROM orders WHERE id = $1';
  try {
    const { rows } = db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'this order was not found on our server' });
    }
    return res.status(200).send(rows[0]);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default order;
