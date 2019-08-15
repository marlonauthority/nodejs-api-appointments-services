import User from '../models/User';

class UserController {
  async store(req, res) {
    // -> Verificar se existe email no DB
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // caso exista o email, enta no if
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }
    // -> Cria um user e apenas os dados repassados
    const { id, name, email, provider } = await User.create(req.body);

    // -> Retorna os dados repassados
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default new UserController();
