// 라우팅, DTO 실행 → Service 호출
import { Router } from "express";
import { Exception } from "../common/exception/exception.js";
import { EXCEPTION_INFO } from "../common/const/exception-info.js";
import { RecordReqDTO } from "./req-dto/record.req.dto.js";
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
    // 운동기록 등록
    this.router.post("/", this.catchException(this.createRecord));
    // 운동기록 목록 조회
    this.router.get("/", this.catchException(this.getRecords));
    // 운동기록 상세 조회
    this.router.get("/:recordId", this.catchException(this.getRecordById));
  }

  // 등록
  createRecord = async (req, res) => {
    const dto = new RecordReqDTO({
      body: req.body,
      params: req.params,
    }).validate();

    // 참여자 인증은 미들웨어에서 닉네임+비밀번호 검증하고 req.author 담을 것
    const { userId, userJoinGroupId } = req.author || {};

    const created = await this.#service.createRecord({
      ...dto,
      userId,
      userJoinGroupId,
    });
    return res.status(201).json(created);
  };

  // 목록 조회
  getRecords = async (req, res) => {
    const { groupId } = req.params;
    const { orderBy = "latest", nickname, page = 1, pageSize = 10 } = req.query;

    const records = await this.#service.getRecord({
      groupId,
      orderBy,
      nickname,
      page: Number(page),
      pageSize: Number(pageSize),
    });

    return res.json(records);
  };

  // 상세 조회
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

    return res.json(record);
  };
}
