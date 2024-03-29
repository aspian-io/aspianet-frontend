import React, { FC, useState } from 'react';
import { IUserEntity } from '../../../../models/users/admin/user';
import DropdownMenu from '../../../common/DropdownMenu';
import AdminCard from '../../common/AdminCard';
import SocialNetworkInfoFormModal from './SocialNetworkInfoFormModal';

interface IProps {
  userData: IUserEntity;
}

const SocialNetworkInfoCard: FC<IProps> = ({ userData }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <SocialNetworkInfoFormModal
        show={showEditModal}
        onCancel={() => setShowEditModal(false)}
        userData={userData}
        onSuccess={() => setShowEditModal(false)}
      />
      <AdminCard className="flex flex-col justify-start items-start w-full text-sm min-h-[288px] overflow-hidden">
        <div className="flex flex-row justify-between w-full">
          <h4 className="font-bold text-primary text-base underline">
            Social Network Info:
          </h4>
          <DropdownMenu className="self-end mb-6">
            <DropdownMenu.Item onClick={() => setShowEditModal(true)}>
              Edit
            </DropdownMenu.Item>
          </DropdownMenu>
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
        </div>
      </AdminCard>
    </>
  );
};

export default SocialNetworkInfoCard;
