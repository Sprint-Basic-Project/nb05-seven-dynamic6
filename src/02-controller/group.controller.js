import { BaseController } from "./base.controller.js";

export class GroupController extends BaseController {
  #service;

  constructor(groupService) {
    super("/groups");
    this.#service = groupService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/:groupId/likes", this.likeGroupMiddleware);
    this.router.delete("/:groupId/likes", this.unlikeGroupMiddleware);
    this.router.delete("/:groupId", this.deleteGroupMiddleware);
  }

  likeGroupMiddleware = async (req, res) => {
    const groupId = req.params.groupId;
    const result = await this.#service.likeGroup({ groupId });
    return res.status(200).json(result);
  };

  unlikeGroupMiddleware = async (req, res) => {
    const groupId = req.params.groupId;
    const result = await this.#service.unlikeGroup({ groupId });
    return res.status(200).json(result);
  };

  deleteGroupMiddleware = async (req, res) => {
    const groupId = req.params.groupId;
    const result = await this.#service.deleteGroup({ groupId });
    return res.status(200).json(result);
  };
}
