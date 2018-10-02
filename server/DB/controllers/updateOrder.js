import db from '../db';

const updateOrder = (req, res) => {
  const findOneQuery = 'SELECT * FROM orders WHERE id=$1';
  const updateOneQuery = `UPDATE orders
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 returning *`;
  try {
    const { rows } = db.query(findOneQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'that order was not found' });
    }
    const values = [
      req.body.success || rows[0].success,
      req.body.low_point || rows[0].low_point,
      req.body.take_away || rows[0].take_away,
      new Date(),
      req.params.id,
    ];
    const response = db.query(updateOneQuery, values);
    return res.status(200).send(response.rows[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};

export default updateOrder;
