import { BaseController } from "./base.controller.js";
import { verifyGroupPassword } from "../common/middleware/auth.js";

export class GroupController extends BaseController {
  #service;
  #repo;

  constructor(groupService, groupRepo) {
    super("/groups");
    this.#service = groupService;
    this.#repo = groupRepo;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.getAllGroups);
    this.router.get("/:groupId/rank", this.getGroupRankings);

    this.router.post("/:groupId/likes", this.likeGroup);
    this.router.delete("/:groupId/likes", this.unlikeGroup);
    this.router.delete(
      "/:groupId",
      verifyGroupPassword(this.#repo),
      this.deleteGroup,
    );
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

  likeGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const result = await this.#service.increaseLike({ groupId });
    return res.status(200).json(result);
  };

  unlikeGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const result = await this.#service.decreaseLike({ groupId });
    return res.status(200).json(result);
  };

  deleteGroup = async (req, res) => {
    const groupId = req.params.groupId;
    await this.#service.deleteGroup({ groupId });
    return res.status(200).json({ message: "그룹 삭제가 완료되었습니다." });
  };
}
