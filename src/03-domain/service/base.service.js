export class BaseService {
  #repos;
  constructor(repos) {
    this.#repos = repos;
  }
}
