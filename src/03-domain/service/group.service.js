export class GroupService {
  #repos;

  constructor(repos) {
    this.#repos = repos;
  }

  async likeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    groupEntity.increaseLike();
    const saved = await this.#repos.groupRepo.save(groupEntity);
    const badges = saved.evaluateBadges();
    return {
      ...saved.toJSON(),
      badges,
    };
  }

  async unlikeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    groupEntity.decreaseLike();
    const saved = await this.#repos.groupRepo.save(groupEntity);

    const badges = saved.evaluateBadges();

    return {
      ...saved.toJSON(),
      badges,
    };
  }

  async deleteGroup({ groupId }) {
    const deleted = await this.#repos.groupRepo.delete(groupId);
    return deleted.toJSON();
  }
}
