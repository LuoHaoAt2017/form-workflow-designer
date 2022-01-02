import { Model, DataTypes, Sequelize, UUIDV4 } from "sequelize";

export class Role extends Model {}

export default function (sequelize: Sequelize) {
  Role.init(
    {
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
    }
  );

  return Role;
}
