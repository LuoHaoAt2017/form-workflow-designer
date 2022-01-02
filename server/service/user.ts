import { User } from '../model/user';

export default {
  async create({ user_name }: {
    user_id: string,
    user_name: string
  }) {
    try {
      return await User.create({
        user_name: user_name,
      });
    } catch (err) {
      return err;
    }
  },
  async remove({ user_id }: {
    user_id: string
  }) {
    try {
      const user = await User.findByPk(user_id);
      if (user) {
        await user.destroy();
        return true;
      } else {
        return new Error("user_id 参数错误");
      }
    } catch (err) {
      return err;
    }
  },
  async update({ user_id, user_name }: {
    user_id: string,
    user_name: string
  }) {
    try {
      const user = await User.findByPk(user_id);
      user.user_name = user_name;
      return await user.save();
    } catch (err) {
      return err;
    }
  },
  async search({ user_name }: {
    user_name: string
  }) {
    try {
      return await User.findOne({
        where: {
          user_name: user_name
        }
      });
    } catch (err) {
      return err;
    }
  },
}