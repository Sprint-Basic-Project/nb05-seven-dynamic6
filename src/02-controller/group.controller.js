import { BaseController } from "./base.controller.js";
import { verifyGroupPassword } from "../common/middleware/auth.js";

export class GroupController extends BaseController {
  #groupService;
  #repo;

  constructor(groupService, groupRepo) {
    super("/groups");
    this.#groupService = groupService;
    this.#repo = groupRepo;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.getAllGroups);
    this.router.get("/:groupId", this.getGroup);

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
    const result = await this.#groupService.getGroups(query);
    return res.status(200).json(result);
  };

  getGroup = async (req, res) => {
    const id = req.params.groupId;
    const result = await this.#groupService.getGroup(id);
    return res.status(200).json(result);
  };

  likeGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const result = await this.#groupService.increaseLike({ groupId });
    return res.status(200).json(result);
  };

  unlikeGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const result = await this.#groupService.decreaseLike({ groupId });
    return res.status(200).json(result);
  };

  deleteGroup = async (req, res) => {
    const groupId = req.params.groupId;
    await this.#groupService.deleteGroup({ groupId });
    return res.status(200).json({ message: "그룹 삭제가 완료되었습니다." });
  };
}
