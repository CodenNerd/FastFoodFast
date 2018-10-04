import db from '../db';
import Validator from '../../Validator/Validator';

const updateOrder = {
  async updateOrder(req, res) {
    Validator(req.body.foodstatus, ['string'], res, 'foodstatus');
    const findOneQuery = 'SELECT * FROM orders WHERE id=$1';
    const updateOneQuery = `UPDATE orders
      SET foodstatus=$1,date_modified=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'that order was not found' });
      }
      const values = [
        req.body.foodstatus || rows[0].foodstatus,
        new Date(),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(202).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};

export default updateOrder.updateOrder;
