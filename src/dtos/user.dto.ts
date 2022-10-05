export default class UserDto {
  email: string;
  id: string;
  isActivated: boolean;
  avatarPath: string;
  fullname: string;

  constructor(entity: any) {
    this.email = entity.email;
    this.id = entity.id;
    this.isActivated = entity.isActivated;
    this.avatarPath = entity.avatarPath;
    this.fullname = entity.fullname;
  }
}
