import { Expose, plainToClassFromExist } from "class-transformer";
import { IBaseEntity } from "../../common/base-entities";
import { IPostEntity } from "../../posts/admin/post";
import { IUserEntity } from "../../users/admin/user";

export interface ICommentEntity extends IBaseEntity {
  title?: string;
  content: string;
  likes: IUserEntity[];
  likesNum: number;
  dislikes: IUserEntity[];
  dislikesNum: number;
  isApproved: boolean;
  isSpecial: boolean;
  seen: boolean;
  ancestor?: ICommentEntity;
  ancestorChildren?: ICommentEntity[];
  parent?: ICommentEntity;
  children?: ICommentEntity[];
  post: IPostEntity;
}

export class CommentCreateFormValues implements Partial<ICommentEntity> {
  @Expose() title?: string = undefined;
  @Expose() content?: string = '';
  @Expose() parentId?: string = undefined;
  @Expose() postId?: string = undefined;

  constructor ( init?: CommentCreateFormValues | ICommentEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class CommentEditFormValues implements Partial<ICommentEntity> {
  @Expose() title?: string = undefined;
  @Expose() content?: string = '';

  constructor ( init?: CommentEditFormValues | ICommentEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}