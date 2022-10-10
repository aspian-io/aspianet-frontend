
export interface IUserRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class UserRegister implements IUserRegister {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor ( init?: IUserRegister ) {
    Object.assign( this, init );
  }
}