import { Model, DataTypes, Sequelize, UUIDV4 } from "sequelize";

export class User extends Model {}

export default function (sequelize: Sequelize) {
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      github_id: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize: sequelize,
    }
  );
  return User;
}
