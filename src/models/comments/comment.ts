import { Expose, plainToClassFromExist } from "class-transformer";
import { AvatarSourceEnum } from "../auth/common";
import { IPost } from "../posts/post";

export interface IComment {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  avatarSource: AvatarSourceEnum;
  role?: string;
  ancestorChildrenNum: number;
  title: string;
  content: string;
  likes: string[];
  likesNum: number;
  dislikes: string[];
  dislikesNum: number;
  replyLevel: number;
  isReplyAllowed: boolean;
  createdAt: Date;
  updatedAt: Date;
  post: IPost;
  ancestor?: string;
  parent?: string;
}

export class CommentFormValues {
  @Expose() title?: string = undefined;
  @Expose() content: string = '';
  @Expose() parentId?: string = undefined;
  @Expose() postId: string = '';

  constructor ( init?: CommentFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}