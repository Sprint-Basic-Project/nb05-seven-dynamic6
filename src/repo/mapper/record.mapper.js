// Entity <-> DB 모델 변환

import { Record } from "../../domain/entity/record.js";

const toApiExercise = (e) => {
  const map = { RUNNING: "run", SWIMMING: "swim", CYCLING: "cycle" };
  return map[e] ?? e;
};

export class RecordMapper {
  static toPersistence(entity) {
    return {
      exerciseType: entity.exerciseType,
      description: entity.description,
      time: entity.time,
      distance: entity.distance,
      groupId: entity.groupId,
      userId: entity.userId,
      userJoinGroupId: entity.userJoinGroupId,
      recordImages: {
        create: (entity.images || []).map((url) => ({ imageUrl: url })),
      },
    };
  }
  static toEntity(recordModel) {
    const entity = new Record({
      id: recordModel.id,
      exerciseType: recordModel.exerciseType,
      description: recordModel.description,
      time: recordModel.time,
      distance: recordModel.distance,
      createdAt: recordModel.createdAt,
      updatedAt: recordModel.updatedAt,
      deletedAt: recordModel.deletedAt,
      groupId: recordModel.groupId,
      userId: recordModel.userId,
      userJoinGroupId: recordModel.userJoinGroupId,
      images: recordModel.recordImages?.map((img) => img.imageUrl) || [],
    });
    if (recordModel.user) {
      entity.authorId = recordModel.user.id;
      entity.authorNickname = recordModel.user.nickname;
    }
    return entity;
  }
  static toResponse(entity) {
    if (!entity) return null;
    return {
      id: entity.id,
      exerciseType: toApiExercise(entity.exerciseType),
      description: entity.description,
      time: entity.time,
      distance: entity.distance,
      photos: Array.isArray(entity.images) ? entity.images : [],
      author:
        entity.authorId || entity.userId
          ? {
              id: entity.authorId ?? entity.userId,
              nickname: entity.authorNickname,
            }
          : undefined,
    };
  }
  static toResponseList(entities) {
    return Array.isArray(entities)
      ? entities.map((e) => this.toResponse(e))
      : [];
  }
}
