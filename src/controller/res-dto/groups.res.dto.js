export class GroupsResDto {
  data = [];
  total = 0;

  constructor(entities = [], total) {
    this.data = entities; 
    this.total = total; 
  }
}
