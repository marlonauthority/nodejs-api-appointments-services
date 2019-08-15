import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Marlon Authority',
    email: 'marlon_authority@msn.com',
    password_hash: '12345678910',
  });
  return res.json(user);
});

export default routes;
