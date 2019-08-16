import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // -> Relacionamento
  static associate(models) {
    // Esta tabela pertence a
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    // OBS: é obrigatório usar apelido quando existem mais de um relacionamento, caso contrario o sequelize se perde
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}
export default Appointment;
