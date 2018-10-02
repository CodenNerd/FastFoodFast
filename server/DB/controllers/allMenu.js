import db from '../db';

const allMenu = {
  async allMenu(req, res) {
    const findAllQuery = 'SELECT * FROM menu';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default allMenu.allMenu;
