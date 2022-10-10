export interface IChangePassword {
  currentPassword: string;
  password: string;
}

export class ChangePasswordFormValues implements IChangePassword {
  currentPassword: string = '';
  password: string = '';

  constructor ( init?: IChangePassword ) {
    Object.assign( this, init );
  }
}