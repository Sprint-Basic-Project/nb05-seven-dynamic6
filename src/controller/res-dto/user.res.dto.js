export class UserResDto {
  id;
  nickname;
  createdAt;
  updatedAt;
  deletedAt;

  constructor(entity) {
    this.id = entity.id;
    this.nickname = entity.nickname;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.deletedAt = entity.deletedAt;
  }
}
