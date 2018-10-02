import db from '../db';


const orderHistory = {
  async orderHistory(req, res) {
    req.params.user_id = req.user.id;
    const findAllQuery = 'SELECT * FROM orders WHERE owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default orderHistory.orderHistory;
