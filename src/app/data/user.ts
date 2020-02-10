
export class User {
  private id;
  private name;
  private birthdate: Date;

  getName(): string {
    return this.name;
  }
  getBirthdate(): Date {
    return this.birthdate;
  }
  getId(): string {
    return this.id;
  }
  setName(name: string) {
    this.name = name;
  }
  setBirthdate(birthdate: Date) {
    this.birthdate = birthdate;
  }
  setId(id: number) {
    this.id = id;
  }
}
