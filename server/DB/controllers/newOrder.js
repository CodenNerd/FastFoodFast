// import uuidv4 from 'uuid/v4';
import db from '../db/index';


const newOrder = {
  async newOrder(req, res) {
    const text = `INSERT INTO
      orders(foodname, quantity, price, foodstatus, owner_id, date_created, date_modified)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.foodname,
      req.body.quantity,
      req.body.price,
      'New',
      req.user.id,
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default newOrder.newOrder;
