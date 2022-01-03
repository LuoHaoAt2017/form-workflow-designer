import { User } from "../model/user";
import { Role } from "../model/role";
import { Op } from "sequelize";

export default {
  async create({ user_name }: { user_id: string; user_name: string }) {
    try {
      return await User.create({
        user_name: user_name,
      });
    } catch (err) {
      return err;
    }
  },
  async remove({ user_id }: { user_id: string }) {
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
  async update({ user_id, user_name }: { user_id: string; user_name: string }) {
    try {
      const user = await User.findByPk(user_id);
      user.user_name = user_name;
      return await user.save();
    } catch (err) {
      return err;
    }
  },
  async search({ user_name }: { user_name: string }) {
    try {
      return await User.findOne({
        where: {
          user_name: user_name,
        },
      });
    } catch (err) {
      return err;
    }
  },
  async findWithRole(id: string) {
    try {
      return await User.findOne({
        where: {
          user_id: id,
        },
        include: [
          {
            model: Role,
            as: "roles",
          },
        ],
      });
    } catch (err) {
      return err;
    }
  },
  async getAllWithRoles() {
    try {
      return await User.findAll({
        include: [
          {
            model: Role,
            as: "roles",
          },
        ],
      });
    } catch (err) {
      return err;
    }
  },
  async updateUserRoles(userId: string, roleIds: string[]) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return new Error("用户不存在");
      }
      const roles = await Role.findAll({
        where: {
          role_id: {
            [Op.in]: roleIds,
          },
        },
      });
      if (!roles || roles.length == 0) {
        return new Error("角色不存在");
      }
      return await (user as any).setRoles(roles);
    } catch (err) {
      return err;
    }
  },
};
