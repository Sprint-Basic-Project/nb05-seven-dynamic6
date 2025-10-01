import { BaseController } from "./base.controller.js";
import { verifyGroupPassword } from "../common/middleware/auth.js";
import { CreateGroupDTO } from "./req-dto/create-group.req.dto.js";
import { CreateGroupResDto } from "./res-dto/create-group.res.dto.js";
import { Exception } from "../common/exception/exception.js";

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
    this.router.post("/", this.catchException(this.createGroupMiddleware));
    this.router.post("/:groupId/likes", this.likeGroup);
    this.router.delete("/:groupId/likes", this.unlikeGroup);
    this.router.delete(
      "/:groupId",
      verifyGroupPassword(this.#repo),
      this.deleteGroup,
    );
    this.router.get("/:groupId/rank", this.getRankings);
  }

  getRankings = async (req, res) => {
    const duration = req.query.duration;
    const id = req.params.groupId;
    const result = await this.#groupService.getRankings(id, duration);
    return res.status(200).json(result);
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
    const result = await this.#groupService.likeGroup({ groupId });
    return res.status(200).json(result);
  };

  unlikeGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const result = await this.#groupService.unlikeGroup({ groupId });
    return res.status(200).json(result);
  };

  deleteGroup = async (req, res) => {
    const groupId = req.params.groupId;
    await this.#groupService.deleteGroup({ groupId });
    return res.status(200).json({ message: "그룹 삭제가 완료되었습니다." });
  };

  createGroupMiddleware = async (req, res, next) => {
    const reqDto = new CreateGroupDTO({
      body: req.body,
    }).validate();
    const group = await this.#groupService.createGroup(reqDto);
    if (!group) {
      throw new Exception(400, "그룹 생성에 실패했습니다.");
    }
    const resDto = new CreateGroupResDto(group);
    return res.status(201).json(resDto);
  };
}
