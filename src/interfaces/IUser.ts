export default interface IUser {
  id: string;
  email: string;
  password: string;
  avatarPath: string;
  fullname: string;
  activationLink: string;
  isActivated: boolean;
  confirmed: boolean;
  confirmHash: boolean;
  last_seen: Date;
  refreshToken: string;
}
