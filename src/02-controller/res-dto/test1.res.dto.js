export class Test1ResDto {
  id;
  title;
  content;

  constructor({ id, title, content }) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}
