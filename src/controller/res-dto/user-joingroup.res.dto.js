export class UserJoinGroupResDto {
  id;
  userId;
  groupId;
  joinedAt;
  updatedAt;
  deletedAt;

  constructor(entity) {
    this.id = entity.id;
    this.userId = entity.userId;
    this.groupId = entity.groupId;
    this.joinedAt = entity.joinedAt;
    this.updatedAt = entity.updatedAt;
    this.deletedAt = entity.deletedAt;
  }
}
