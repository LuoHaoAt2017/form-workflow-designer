import { Model, DataTypes, Sequelize, UUIDV4 } from "sequelize";

export class Auth extends Model {}

export default function (sequelize: Sequelize) {
  Auth.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
    }
  );
  return Auth;
}
