import { CommentKeys } from "../../../../lib/swr/keys";

export const swrCommentsKey = ( postId: string, page: number ) => `${ CommentKeys.GET_POST_COMMENTS_LIST }/${ postId }?page=${ page }`;
export const swrRepliesKey = ( ancestorId: string, page: number, limit: number = 10 ) => `${ CommentKeys.GET_POST_REPLIES_LIST }/${ ancestorId }?page=${ page }&limit=${ limit }`;