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

    this.router.post("/", this.createGroupMiddleware);
    this.router.get("/:groupId", this.getGroupMiddleware);
    this.router.patch("/:groupId", this.updateGroupMiddleware);
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

  createGroupMiddleware = async (req, res) => {
    const reqDto = new CreateGroupValidator({
      body: req.body,
      files: req.files,
    }).validate();
    const userUserId = req.user?.userId;
    const groupEntity = Group.fromValidator(reqDto, userUserId);
    const created = await this.#service.createGroup(groupEntity);
    return res.json(new CreateGroupResDto(created));
  };

  getGroupMiddleware = async (req, res) => {
    const reqDto = new GetGroupValidator({ params: req.params }).validate();
    const group = await this.#service.getGroupById(reqDto.groupId);
    return res.json(new GetGroupResDto(group));
  };

  updateGroupMiddleware = async (req, res) => {
    const params = new GetGroupValidator({ params: req.params }).validate();
    const body = new UpdateGroupValidator({ body: req.body }).validate();
    const updated = await this.#service.updateGroup({
      groupId: params.groupId,
      ...body,
    });
    return res.json(new UpdateGroupResDto(updated));
  };
}
