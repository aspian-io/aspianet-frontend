import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminPostAgent } from '../../../../lib/axios/agent';
import { AdminPostKeys } from '../../../../lib/swr/keys';
import { ClaimsEnum } from '../../../../models/auth/common';
import { ICommentEntity } from '../../../../models/comments/admin/comment';
import { INestError } from '../../../../models/common/error';
import { IPaginated } from '../../../../models/common/paginated-result';
import {
  IPostEntity,
  PostTypeEnum,
  PostVisibilityEnum,
} from '../../../../models/posts/admin/post';
import { TaxonomyTypeEnum } from '../../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../../common/AuthGuard';
import Button from '../../../common/Button';
import ConfirmModal from '../../../common/ConfirmModal';
import MiniBookmark from '../../../common/vectors/mini/MiniBookmark';
import MiniComment from '../../../common/vectors/mini/MiniComment';
import MiniEye from '../../../common/vectors/mini/MiniEye';
import MiniLike from '../../../common/vectors/mini/MiniLike';
import AdminTable, { ITableDataType } from '../../common/table/AdminTable';

interface IProps {
  recentComments: ICommentEntity[];
}

interface IDataType extends ITableDataType {
  comment: string;
  postTitle: string | JSX.Element;
  postType: PostTypeEnum;
}

const AdminRecentComments: FC<IProps> = ({ recentComments }) => {
  const router = useRouter();
  function generateHref(post: IPostEntity) {
    if (post.type === PostTypeEnum.BLOG) return `/blog/${post.slug}`;
    if (post.type === PostTypeEnum.NEWS) return `/news/${post.slug}`;
    if (post.type === PostTypeEnum.PAGE) return `/pages/${post.slug}`;
    if (post.type === PostTypeEnum.PROJECT) return `/portfolio/${post.slug}`;
  }

  const formatData = useCallback((comment: ICommentEntity): IDataType => {
    return {
      id: comment.id,
      comment: comment.content,
      postTitle: (
        <Link href={generateHref(comment.post) ?? '#'}>
          {comment.post.title}
        </Link>
      ),
      postType: comment.post.type as PostTypeEnum,
    };
  }, []);

  const data: IDataType[] = useMemo(
    () => (recentComments ? recentComments.map((p) => formatData(p)) : []),
    [formatData, recentComments]
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          columns={[
            {
              title: 'Comment',
            },
            {
              title: 'Post',
            },
            {
              title: 'Post Type',
            },
          ]}
          data={data}
          loading={!recentComments}
          selectable={false}
        />
      </div>
    </>
  );
};

export default AdminRecentComments;
