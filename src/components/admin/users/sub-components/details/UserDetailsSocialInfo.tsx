import React, { FC, useState } from 'react';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { IUserEntity } from '../../../../../models/users/admin/user';
import { AuthGuard } from '../../../../common/AuthGuard';
import DropdownMenu from '../../../../common/DropdownMenu';
import AdminCard from '../../../common/AdminCard';
import UserDetailsSocialInfoForm from './UserDetailsSocialInfoForm';

interface IProps {
  userData: IUserEntity;
}

const UserDetailsSocialInfo: FC<IProps> = ({ userData }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <UserDetailsSocialInfoForm
        show={showEditModal}
        onCancel={() => setShowEditModal(false)}
        userData={userData}
        onSuccess={() => setShowEditModal(false)}
      />
      <AdminCard className="flex flex-col justify-start items-start w-full text-sm min-h-[298px] overflow-hidden">
        <div className="flex flex-row justify-between w-full">
          <h4 className="font-bold text-primary text-base underline">
            Social Network Info:
          </h4>
          <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_EDIT]}>
            <DropdownMenu className="self-end mb-6">
              <DropdownMenu.Item onClick={() => setShowEditModal(true)}>
                Edit
              </DropdownMenu.Item>
            </DropdownMenu>
          </AuthGuard>
        </div>
        <div className="space-y-2 w-full truncate">
          <div className="text-dark font-bold">
            <span className="mr-2">Website:</span>
            <span className="text-zinc-500 font-normal">
              {userData.website}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Facebook:</span>
            <span className="text-zinc-500 font-normal truncate">
              {userData.facebook}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Instagram:</span>
            <span className="text-zinc-500 font-normal">
              {userData.instagram}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Twitter:</span>
            <span className="text-zinc-500 font-normal">
              {userData.twitter}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">LinkedIn:</span>
            <span className="text-zinc-500 font-normal">
              {userData.linkedIn}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Pinterest:</span>
            <span className="text-zinc-500 font-normal">
              {userData.pinterest}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">GitHub:</span>
            <span className="text-zinc-500 font-normal">{userData.github}</span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Stack Overflow:</span>
            <span className="text-zinc-500 font-normal">
              {userData.stackoverflow}
            </span>
          </div>
        </div>
      </AdminCard>
    </>
  );
};

export default UserDetailsSocialInfo;
