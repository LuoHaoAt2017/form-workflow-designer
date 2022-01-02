import { Auth } from "../model/auth";
import { User } from "../model/user";
interface IAuth {
  username: string;
  password: string;
}

interface IUpdate {
  nextUsername: string;
  nextPassword: string;
  prevUsername: string;
  prevPassword: string;
}

export default {
  async create({ username, password }: IAuth) {
    try {
      const auth = await Auth.create({
        username: username,
        password: password,
      });
      await auth.setUser(
        User.create({
          user_name: username,
        })
      );
      return auth;
    } catch (err) {
      console.log("auth err: ", err);
      return err;
    }
  },
  async remove({ username, password }: IAuth) {
    try {
      const auth = await Auth.findOne({
        where: {
          username: username,
          password: password,
        },
      });
      if (auth) {
        await auth.destroy();
        return true;
      } else {
        return new Error("用户名或者密码错误");
      }
    } catch (err) {
      return err;
    }
  },
  async update({
    nextUsername,
    nextPassword,
    prevUsername,
    prevPassword,
  }: IUpdate) {
    try {
      const auth = await Auth.findOne({
        where: {
          username: prevUsername,
          password: prevPassword,
        },
      });
      auth.username = nextUsername;
      auth.password = nextPassword;
      return await auth.save();
    } catch (err) {
      return err;
    }
  },
  async search({ username }: { username: string }) {
    try {
      return await Auth.findOne({
        where: {
          username: username,
        },
      });
    } catch (err) {
      return err;
    }
  },
};
