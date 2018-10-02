import db from '../db/index';


const newMenu = {
  async newMenu(req, res) {
    const text = `INSERT INTO
      menu(foodname, price, date_created)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.foodname,
      req.body.price,
      new Date(),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'A food item with that name already exists' });
      }
      return res.status(400).send(`${error}..o`);
    }
  },
};

export default newMenu.newMenu;
