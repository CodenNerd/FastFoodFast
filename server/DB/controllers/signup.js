import Helper from './Helper';
import db from '../db';

const signup = {

  async signup(req, res) {
    if (!req.body.email || !req.body.password || !req.body.fullname) {
      return res.status(400).send({ message: 'Some values are missing' } + req.body.email + req.body.password + req.body.fullname);
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
        users(fullname, email, password, date_created, date_modified)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
    const values = [
      req.body.fullname,
      req.body.email,
      hashPassword,
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ token });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'A user with that email already exists' });
      }
      return res.status(400).send(`${error}...`);
    }
  },
};

export default signup.signup;
