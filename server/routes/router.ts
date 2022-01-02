import { Router } from 'express';
import passport from 'passport';
import UserController from '../controller/user';
import RoleController from '../controller/role';
import AuthController from '../controller/auth';
import formatResponse from '../helper';
const router = Router();
//=================== auth ==========================
// passport.authenticate 方法是一个中间件，验证成功后，用户的信息赋予 req.user
router.post("/login", passport.authenticate('local'), AuthController.login);
router.get("/github-auth", passport.authenticate('github'));
router.get("/auth-github-redirect", function(req, res) {
  res.status(301).send(formatResponse({
    redirect: '/home'
  }));
});
router.get("/ding-auth", AuthController.login);
router.put("/register", AuthController.register);
router.get("/logout", AuthController.logout);
router.delete("/destory", AuthController.destory);
//=================== user ==========================
router.put("/user", UserController.create);
router.delete("/user", UserController.remove);
router.post("/user", UserController.update);
router.get("/user", UserController.getById);
router.get("/users/", UserController.getAll);
//=================== role ==========================
router.put("/role", RoleController.create);
router.delete("/role", RoleController.remove);
router.post("/role", RoleController.update);
router.get("/role", RoleController.getById);
router.get("roles/", RoleController.getAll);
//=============================================
export default router;