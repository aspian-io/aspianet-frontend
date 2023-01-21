import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { date } from 'yup/lib/locale';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { IUserEntity } from '../../../../../models/users/admin/user';
import { AuthGuard } from '../../../../common/AuthGuard';
import DropdownMenu from '../../../../common/DropdownMenu';
import AdminCard from '../../../common/AdminCard';
import UserDetailsSecurityInfoForm from './UserDetailsSecurityInfoForm';

interface IProps {
  userData: IUserEntity;
}

const UserDetailsSecurityInfo: FC<IProps> = ({ userData }) => {
  const router = useRouter();
  const id = router.query.id as string;
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <UserDetailsSecurityInfoForm
        show={showEditModal}
        onCancel={() => setShowEditModal(false)}
        userData={userData}
        onSuccess={() => setShowEditModal(false)}
      />
      <AdminCard className="flex flex-col justify-start items-start w-full text-sm min-h-[288px] overflow-hidden">
        <div className="flex flex-row justify-between w-full">
          <h4 className="font-bold text-primary text-base underline">
            Security Info:
          </h4>
          <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_EDIT]}>
            <DropdownMenu className="self-end mb-6">
              <DropdownMenu.Item onClick={() => setShowEditModal(true)}>
                General Edit
              </DropdownMenu.Item>
              <AuthGuard claims={[ClaimsEnum.ADMIN]}>
                <DropdownMenu.Item
                  onClick={() => router.push(`/admin/users/claims/${id}`)}
                >
                  Edit Claims
                </DropdownMenu.Item>
              </AuthGuard>
            </DropdownMenu>
          </AuthGuard>
        </div>
        <div className="space-y-2 w-full">
          <div className="flex text-dark font-bold">
            <span className="mr-2">Account Activation:</span>
            {userData.isActivated ? (
              <span className="flex justify-center items-center text-xs text-light bg-success pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Activated</span>
              </span>
            ) : (
              <span className="flex justify-center items-center text-xs text-light bg-danger pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>

                <span>Not Activated</span>
              </span>
            )}
          </div>
          <div className="flex text-dark font-bold">
            <span className="mr-2">Email Verification:</span>
            {userData.emailVerified ? (
              <span className="flex justify-center items-center text-xs text-light bg-success pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Verified</span>
              </span>
            ) : (
              <span className="flex justify-center items-center text-xs text-light bg-danger pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>

                <span>Not Verified</span>
              </span>
            )}
          </div>
          <div className="flex text-dark font-bold">
            <span className="mr-2">Mobile Phone Verification:</span>
            {userData.mobilePhoneVerified ? (
              <span className="flex justify-center items-center text-xs text-light bg-success pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Verified</span>
              </span>
            ) : (
              <span className="flex justify-center items-center text-xs text-light bg-danger pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>

                <span>Not Verified</span>
              </span>
            )}
          </div>
          <div className="flex text-dark font-bold">
            <span className="mr-2">Organization Member:</span>
            {userData.organizationMember ? (
              <span className="flex justify-center items-center text-xs text-light bg-success pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Member</span>
              </span>
            ) : (
              <span className="flex justify-center items-center text-xs text-light bg-danger pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>

                <span>Not Member</span>
              </span>
            )}
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Role:</span>
            <span className="text-zinc-500 font-normal break-words">
              {userData.role}
            </span>
          </div>
          <div className="flex text-dark font-bold">
            <span className="mr-2">Suspend:</span>
            {userData.suspend &&
            new Date(userData.suspend).getTime() > Date.now() ? (
              <span className="flex justify-center items-center text-xs text-light bg-danger pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>

                <span>Suspended</span>
              </span>
            ) : (
              <span className="flex justify-center items-center text-xs text-light bg-success pl-1 pr-2.5 rounded-md font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Not Suspended</span>
              </span>
            )}
          </div>
          <div className="text-dark font-bold">
            <span className="mr-2">Claims:</span>
            <span className="text-zinc-500 font-normal">
              {userData.claims.length}
            </span>
          </div>
        </div>
      </AdminCard>
    </>
  );
};

export default UserDetailsSecurityInfo;
