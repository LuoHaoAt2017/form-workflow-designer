import Service from '../service/user';
import { Request, Response } from "express";
import formatResponse from '../helper';

export default {
  create(req: Request, res: Response) {

  },
  remove(req: Request, res: Response) {

  },
  update(req: Request, res: Response) {

  },
  getAll(req: Request, res: Response) {

  },
  getById(req: Request, res: Response) {

  },
  async updateUserRoles(req: Request, res: Response) {
    if (!req.query.userId) {
      return res.status(500).send(formatResponse(null, "userId 缺失"));
    }
    if (!req.query.roles || req.query.roles.length === 0) {
      return res.status(500).send(formatResponse(null, "roles 不为空"));
    }
    const userId = req.query.userId as string;
    const roleIds = req.query.roles as string[];
    const resp = await Service.updateUserRoles(userId, roleIds);
    if (resp instanceof Error) {
      res.status(500).send(formatResponse(null, resp));
    } else {
      res.status(200).send(formatResponse(resp));
    }
  },
  async getUsersWithRole(req: Request, res: Response) {
    const resp = await Service.getAllWithRoles();
    if (resp instanceof Error) {
      res.status(500).send(formatResponse(null, resp));
    } else {
      res.status(200).send(formatResponse(resp));
    }
  },
  batchCreate(req: Request, res: Response) {

  },
  batchDelete(req: Request, res: Response) {

  },
}