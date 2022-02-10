export interface ICreateUsersDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar?: string;
  is_admin?: boolean;
}
