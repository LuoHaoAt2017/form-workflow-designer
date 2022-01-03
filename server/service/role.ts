import { Role } from "../model/role";

export default {
  async create({ role_name }: { role_id: string; role_name: string }) {
    try {
      return await Role.create({
        role_name: role_name,
      });
    } catch (err) {
      return err;
    }
  },
  async remove({ role_id }: { role_id: string }) {
    try {
      const user = await Role.findByPk(role_id);
      if (user) {
        await user.destroy();
        return true;
      } else {
        return new Error("role_id 参数错误");
      }
    } catch (err) {
      return err;
    }
  },
  async update({ role_id, role_name }: { role_id: string; role_name: string }) {
    try {
      const user = await Role.findByPk(role_id);
      user.role_name = role_name;
      return await user.save();
    } catch (err) {
      return err;
    }
  },
  async search({ role_name }: { role_name: string }) {
    try {
      return await Role.findOne({
        where: {
          role_name: role_name,
        },
      });
    } catch (err) {
      return err;
    }
  },
  async getAll() {
    try {
      return await Role.findAll();
    } catch (err) {
      return err;
    }
  },
};
