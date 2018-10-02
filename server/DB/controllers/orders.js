import db from '../db';


const orders = {
  async orders(req, res) {
    const findAllQuery = 'SELECT * FROM orders WHERE owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default orders.orders;
