import { Request, Response } from "express";
import AuthService from "../service/auth";
import formatResp from "../helper/index";

export default {
  async login(req: Request, res: Response) {
    const params = req.user as any;
    const resp = await AuthService.search({
      username: params.name,
    });
    if (resp instanceof Error) {
      return res.status(404).send(formatResp(null, resp));
    }
    if (req.session) {
      req.session.authenticated = true;
    }
    if (resp) {
      res.status(200).send(formatResp(resp));
    } else {
      const user = await AuthService.create({
        username: params.name,
        password: params.name,
      });
      res.status(200).send(formatResp(user));
    }
  },
  async register(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    // console.log("username: ", username);
    // console.log("password: ", password);
    const resp = await AuthService.create({
      username: username,
      password: password,
    });
    if (resp instanceof Error) {
      res.status(500).send(formatResp(null, resp));
    } else {
      res.status(200).send(formatResp("注册成功"));
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
