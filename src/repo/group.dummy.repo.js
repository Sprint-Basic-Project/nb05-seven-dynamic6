import { Group } from "../03-domain/entity/group.entity.js";

const groupDummyData = [
  {
    id: "1",
    name: "운동 그룹",
    likeCount: 99,
    recordCount: 120,
    memberCount: 15,
  },
  {
    id: "2",
    name: "요리 그룹",
    likeCount: 20,
    recordCount: 30,
    memberCount: 5,
  },
];

export class GroupDummyRepo {
  async findById(id) {
    const record = groupDummyData.find((g) => g.id == id);
    if (!record) throw new Error("그룹을 찾을 수 없습니다.");
    return new Group(record);
  }

  async save(groupEntity) {
    const idx = groupDummyData.findIndex((g) => g.id === groupEntity.id);
    if (idx !== -1) {
      groupDummyData[idx] = {
        ...groupDummyData[idx],
        likeCount: groupEntity.likeCount,
      };
    }
    return new Group(groupDummyData[idx]);
  }

  async delete(groupId) {
    const idx = groupDummyData.findIndex((g) => g.id === groupId);
    if (idx === -1) throw new Error("그룹을 찾을 수 없습니다.");
    const deleted = groupDummyData.splice(idx, 1)[0];
    return new Group(deleted);
  }
}
