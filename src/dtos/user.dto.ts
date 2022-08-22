export default class UserDto {
  email: string;
  id: string;
  isActivated: boolean;

  constructor(entity: any) {
    this.email = entity.email;
    this.id = entity.id;
    this.isActivated = entity.isActivated;
  }
}
