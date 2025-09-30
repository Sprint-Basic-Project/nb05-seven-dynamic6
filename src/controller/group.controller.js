import { BaseController } from "./base.controller.js";
import { verifyGroupPassword } from "../common/middleware/auth.js";
import { CreateGroupDTO } from "./req-dto/create-group.req.dto.js";
import { CreateGroupResDto } from "./res-dto/create-group.res.dto.js";
import { Exception } from "../common/exception/exception.js";
import { UpdateGroupDTO } from "./req-dto/update-group.req.dto.js";
import { UpdateGroupResDto } from "./res-dto/update-group.res.dto.js";

export class GroupController extends BaseController {
  #groupService;
  #repo;
  #userRepo;

  constructor(groupService, groupRepo, userRepo) {
    super("/groups");
    this.#groupService = groupService;
    this.#repo = groupRepo;
    this.#userRepo = userRepo;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.getAllGroups);
    this.router.get("/:groupId", this.getGroup);
    this.router.post("/", this.catchException(this.createGroupMiddleware));
    this.router.patch("/:groupId", this.catchException(this.updateGroupMiddleware));
    this.router.post("/:groupId/likes", this.likeGroup);
    this.router.delete("/:groupId/likes", this.unlikeGroup);
    this.router.delete(
      "/:groupId",
      verifyGroupPassword(this.#repo, this.#userRepo),
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
    await this.#groupService.likeGroup({ groupId });
    return res.sendStatus(200);
  };

  unlikeGroup = async (req, res) => {
    const groupId = req.params.groupId;
    await this.#groupService.unlikeGroup({ groupId });
    return res.sendStatus(200);
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

  updateGroupMiddleware = async (req, res, next) => {
    const reqDto = new UpdateGroupDTO({
      body: req.body,
      params: req.params,
    }).validate();
    const updatedGroup = await this.#groupService.updateGroup(reqDto);

    if (!updatedGroup) {
      throw new Exception(404, "그룹을 찾을 수 없습니다.", "groupId");
    }
    const resDto = new UpdateGroupResDto(updatedGroup);
    return res.status(200).json(resDto);
  }
}
