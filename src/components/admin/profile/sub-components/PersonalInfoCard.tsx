import React, { FC, useState } from 'react';
import { IUserEntity } from '../../../../models/users/admin/user';
import DropdownMenu from '../../../common/DropdownMenu';
import AdminCard from '../../common/AdminCard';
import moment from 'moment';
import PersonalInfoFormModal from './PersonalInfoFormModal';

interface IProps {
  userData: IUserEntity;
}

const PersonalInfoCard: FC<IProps> = ({ userData }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <PersonalInfoFormModal
        show={showEditModal}
        onCancel={() => setShowEditModal(false)}
        userData={userData}
        onSuccess={() => setShowEditModal(false)}
      />
      <AdminCard className="flex flex-col justify-start items-start w-full text-sm min-h-[288px] overflow-hidden">
        <div className="flex flex-row justify-between w-full">
          <h4 className="font-bold text-primary text-base underline">
            Personal Info:
          </h4>
          <DropdownMenu className="self-end mb-6">
            <DropdownMenu.Item onClick={() => setShowEditModal(true)}>
              Edit
            </DropdownMenu.Item>
          </DropdownMenu>
        </div>
        <div className="space-y-2 w-full">
          <div className="text-dark font-bold">
            <span className="mr-2">Biography:</span>
            <span className="text-zinc-500 font-normal line-clamp-3">
              {userData.bio ?? '...'}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">First Name:</span>
            <span className="text-zinc-500 font-normal">
              {userData.firstName}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Last Name:</span>
            <span className="text-zinc-500 font-normal">
              {userData.lastName}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Gender:</span>
            <span className="text-zinc-500 font-normal capitalize">
              {userData.gender ?? ''}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Birthday:</span>
            <span className="text-zinc-500 font-normal">
              {userData.birthDate
                ? moment(userData.birthDate).format('ll')
                : ''}
            </span>
          </div>
        </div>
      </AdminCard>
    </>
  );
};

export default PersonalInfoCard;
