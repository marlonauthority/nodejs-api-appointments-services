import Sequelize, { Model } from 'sequelize';

class User extends Model {
  // -> classe que sera automaticamente chamada na inicializacao
  static init(sequelize) {
    super.init(
      {
        // -> os campos abaixo representao quais receberao dados ou alteracoes
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}
export default User;
