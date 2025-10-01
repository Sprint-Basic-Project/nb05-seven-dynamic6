export class RankResDto {
  participantId = 0;
  nickname = "";
  recordCount = 0;
  recordTime = 0;

  constructor({ user, records, _count }) {
    this.participantId = user.id;
    this.nickname = user.nickname;
    this.recordCount = _count.records;
    records.forEach((record) => {
      this.recordTime += record.time;
    });
  }
}
