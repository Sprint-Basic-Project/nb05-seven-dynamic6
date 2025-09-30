// photoUrl,createdAt, updatedAt, badges, total
export class GroupsResDto {
  data = [];
  total = 0;

  constructor(entities = []) {
    this.data = entities;
    this.total = entities.length;
  }
}
