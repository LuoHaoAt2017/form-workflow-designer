import { Sequelize } from "sequelize";
import UserBuilder from "./user";
import RoleBuilder from "./role";
import AuthBuilder from "./auth";
import { database, username, password, dialect, host } from "../config";

const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  host: host,
  define: {
    freezeTableName: true,
  },
});

const models: any = {}; // eslint-disable-line
const UserModel = UserBuilder(sequelize);
const RoleModel = RoleBuilder(sequelize);
const AuthModel = AuthBuilder(sequelize);
// user-auth
UserModel.belongsTo(AuthModel);
AuthModel.hasOne(UserModel);
// role - user
RoleModel.belongsToMany(UserModel, {
  through: "UserRole",
  as: "users",
});
UserModel.belongsToMany(RoleModel, {
  through: "UserRole",
  as: "roles",
});

async function connect() {
  await sequelize.authenticate();
  models["User"] = UserModel;
  models["Role"] = RoleModel;
  models["Auth"] = AuthModel;
  models.sequelize = sequelize;
  await sequelize.sync({ alter: true });
}

export default connect;
