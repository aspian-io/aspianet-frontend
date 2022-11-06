import React, { FC, useState } from 'react';
import { IUserEntity } from '../../../../../models/users/admin/user';
import DropdownMenu from '../../../../common/DropdownMenu';
import AdminCard from '../../../common/AdminCard';
import UserDetailsContactInfoForm from './UserDetailsContactInfoForm';
// import ContactInfoFormModal from './ContactInfoFormModal';

interface IProps {
  userData: IUserEntity;
}

const UserDetailsContactInfo: FC<IProps> = ({ userData }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <UserDetailsContactInfoForm
        show={showEditModal}
        onCancel={() => setShowEditModal(false)}
        userData={userData}
        onSuccess={() => setShowEditModal(false)}
      />
      <AdminCard className="flex flex-col justify-start items-start w-full text-sm min-h-[298px] overflow-hidden">
        <div className="flex flex-row justify-between w-full">
          <h4 className="font-bold text-primary text-base underline">
            Contact Info:
          </h4>
          <DropdownMenu className="self-end">
            <DropdownMenu.Item onClick={() => setShowEditModal(true)}>
              Edit
            </DropdownMenu.Item>
          </DropdownMenu>
        </div>
        <div className="space-y-2 w-full">
          <div className="text-dark font-bold">
            <span className="mr-2">Country:</span>
            <span className="text-zinc-500 font-normal">
              {userData.country}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">State:</span>
            <span className="text-zinc-500 font-normal">{userData.state}</span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">City:</span>
            <span className="text-zinc-500 font-normal">{userData.city}</span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Address:</span>
            <span className="text-zinc-500 font-normal break-words">
              {userData.address}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Postal Code:</span>
            <span className="text-zinc-500 font-normal">
              {userData.postalCode}
            </span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Email:</span>
            <span className="text-zinc-500 font-normal">{userData.email}</span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Phone:</span>
            <span className="text-zinc-500 font-normal">{userData.phone}</span>
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Mobile Phone:</span>
            <span className="text-zinc-500 font-normal">
              {userData.mobilePhone}
            </span>
          </div>
        </div>
      </AdminCard>
    </>
  );
};

export default UserDetailsContactInfo;
