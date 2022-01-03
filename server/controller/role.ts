import Service from '../service/role';
import { Request, Response } from "express";
import formatResponse from '../helper';


export default {
  create(req: Request, res: Response) {

  },
  remove(req: Request, res: Response) {

  },
  update(req: Request, res: Response) {

  },
  async getAll(req: Request, res: Response) {
    const resp = await Service.getAll();
    if(resp instanceof Error) {
      res.status(500).send(formatResponse(null, resp));
    } else {
      res.status(200).send(formatResponse(resp));
    }
  },
  getById(req: Request, res: Response) {

  },
  batchCreate(req: Request, res: Response) {

  },
  batchDelete(req: Request, res: Response) {

  },
}