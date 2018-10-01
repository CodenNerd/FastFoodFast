import db from '../db';

const updateOrder = {
  async updateOrder(req, res) {
    const findOneQuery = 'SELECT * FROM orders WHERE id=$1';
    const updateOneQuery = `UPDATE orders
      SET foodname=$1,quantity=$2,price=$3,foodstatus=$4,owner_id=$5,date_modified=$6
      WHERE id=$7 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'that order was not found' });
      }
      const values = [
        req.body.foodname || rows[0].foodname,
        req.body.quantity || rows[0].quantity,
        req.body.price || rows[0].price,
        req.body.foodstatus || rows[0].foodstatus,
        req.body.owner_id || rows[0].owner_id,
        new Date(),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default updateOrder.updateOrder;
