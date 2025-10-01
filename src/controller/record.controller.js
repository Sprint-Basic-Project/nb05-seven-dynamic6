// 라우팅, DTO 실행 → Service 호출
import { Router } from "express";
import { Exception } from "../common/exception/exception.js";
import { EXCEPTION_INFO } from "../common/const/exception-info.js";
import { RecordReqDTO } from "./req-dto/record.req.dto.js";
import { RecordMapper } from "../repo/mapper/record.mapper.js";
import { BaseController } from "./base.controller.js";

export class RecordController extends BaseController {
  #service;

  constructor(service) {
    super("/groups/:groupId/records");
    this.#service = service;
    this.router = Router({ mergeParams: true });
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post("/", this.catchException(this.createRecord));
    this.router.get("/", this.catchException(this.getRecords));
    this.router.get("/:recordId", this.catchException(this.getRecordById));
  }

  createRecord = async (req, res) => {
    const dto = new RecordReqDTO({
      body: req.body,
      params: req.params,
    }).validate();

    const { userId, userJoinGroupId } = req.author || {};

    const created = await this.#service.createRecord({
      ...dto,
      userId,
      userJoinGroupId,
    });
    return res.status(201).json(RecordMapper.toResponse(created));
  };

  getRecords = async (req, res) => {
    const { groupId } = req.params;
    const { orderBy = "latest", nickname, page = 1, pageSize = 10 } = req.query;

    const { data, total } = await this.#service.getRecord({
      groupId,
      orderBy,
      nickname,
      page: Number(page),
      pageSize: Number(pageSize),
    });
    console.log(data);
    console.log(total);

    return res.json({
      data: RecordMapper.toResponseList(data),
      total,
    });
  };

  getRecordById = async (req, res) => {
    const { groupId, recordId } = req.params;

    const record = await this.#service.getRecordById({
      groupId,
      recordId,
    });
    if (!record) {
      throw new Exception(
        EXCEPTION_INFO.RECORD_NOT_FOUND.statusCode,
        EXCEPTION_INFO.RECORD_NOT_FOUND.message,
      );
    }

    return res.json(RecordMapper.toResponse(record));
  };
}
