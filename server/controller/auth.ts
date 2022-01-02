import { Request, Response } from "express";
import AuthService from "../service/auth";
import UserService from "../service/user";
import formatResp from "../helper/index";

export default {
  async login(req: Request, res: Response) {
    const userId = (req.user as any).user_id;
    if (req.session) {
      req.session.authenticated = true;
    }
    const user = await UserService.findWithRole(userId);
    if (user instanceof Error) {
      res.status(500).send(formatResp(null, user));
    } else {
      res.status(200).send(formatResp(user));
    }
  },
  async register(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const result = await AuthService.search({
      username: username
    });
    if (result instanceof Error) {
      res.status(500).send(formatResp(null, result));
    } else if (result) {
      res.status(404).send(formatResp(null, "用户名重复"));
    } else {
      const resp = await AuthService.create({
        username: username,
        password: password,
      });
      if (resp instanceof Error) {
        res.status(500).send(formatResp(null, resp));
      } else {
        res.status(200).send(formatResp("注册成功"));
      }
    }
  },
  async destory(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const resp = await AuthService.remove({
      username: username,
      password: password,
    });
    if (resp instanceof Error) {
      return res.status(500).send(formatResp(null, resp));
    } else {
      return res.status(200).send(formatResp("注销成功"));
    }
  },
  logout(req: Request, res: Response) {
    if (req.session) {
      req.session.authenticated = false;
    }
    res.status(200).send(formatResp("退出登录"));
  },
};
