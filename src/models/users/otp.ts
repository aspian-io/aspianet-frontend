export interface IUserOtp {
  email: string;
  token: string;
}

export class UserOtp implements Partial<IUserOtp> {
  email: string = '';
  token: string = '';

  constructor ( init?: IUserOtp ) {
    Object.assign( this, init );
  }
}