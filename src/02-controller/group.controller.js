import { BaseController } from "./base.controller.js";

export class GroupController extends BaseController {
  #service;

  constructor(groupService) {
    super("/groups");
    this.#service = groupService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.getAllGroups);
    this.router.get("/:groupId/rank", this.getGroupRankings);

    this.router.post("/:groupId/likes", this.likeGroupMiddleware);
    this.router.delete("/:groupId/likes", this.unlikeGroupMiddleware);
    this.router.delete("/:groupId", this.deleteGroupMiddleware);
  }

  getAllGroups = async (req, res) => {
    const query = req.query;
    const result = await this.#service.getGroups(query);
    return res.status(200).json(result);
  };

  getGroupRankings = async (req, res) => {
    const params = req.params;
    const result = await this.#service.getGroupRankings(params);
    return res.status(200).json(result);
  };

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
