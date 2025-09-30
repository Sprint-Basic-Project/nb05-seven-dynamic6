export class BaseService {
  #repos;
  constructor(repos) {
    this.#repos = repos;
  }

  get repos() {
    return this.#repos;
  }
}
