export class Cat {
  constructor(id, name, createdAt) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt || new Date();
  }
}
