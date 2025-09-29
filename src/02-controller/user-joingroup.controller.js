import { BaseController } from "./base.controller.js";

export class UserJoinGroupController extends BaseController {
  #service;

  constructor(userJoinGroupService) {
    super("/groups");
    this.#service = userJoinGroupService;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/:groupId/participants",
      this.catchException(this.joinGroupMiddleware),
    );
    this.router.delete(
      "/:groupId/participants",
      this.catchException(this.leaveGroupMiddleware),
    );
  }

  joinGroupMiddleware = async (req, res) => {
    const { groupId } = req.params;
    const { nickname, password } = req.body;
    const result = await this.#service.joinGroup({
      groupId,
      nickname,
      password,
    });
    res.status(201).json(result);
  };

  leaveGroupMiddleware = async (req, res) => {
    const { groupId } = req.params;
    const { nickname, password } = req.body;
    const result = await this.#service.leaveGroup({
      groupId,
      nickname,
      password,
    });
    res.status(204).json(result);
  };

  // 현재방식은 서비스에서 인증까지 처리
  // authenticateUserMiddleware = async (req, res, next) => {
  //   const { groupId } = req.params;
  //   const { nickname, password } = req.body;
  //   const user = await this.#authservice.authenticateUser({
  //     nickname,
  //     password,
  //   });

  //   req.authenticatedUser = user;
  //   next();
  // };
}
