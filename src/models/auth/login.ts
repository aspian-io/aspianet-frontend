export interface IUserLogin {
  username: string;
  password: string;
}

export class UserLogin implements IUserLogin {
  username: string = '';
  password: string = '';

  constructor ( init?: IUserLogin ) {
    Object.assign( this, init );
  }
}