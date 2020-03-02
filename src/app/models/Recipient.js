import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        rua: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING,
        cep: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}
export default Recipient;
