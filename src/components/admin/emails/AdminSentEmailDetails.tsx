import React, { FC } from 'react';
import { IEmailEntity } from '../../../models/emails/email';
import AdminCard from '../common/AdminCard';

interface IProps {
  emailData: IEmailEntity;
}

const AdminSentEmailDetails: FC<IProps> = ({ emailData }) => {
  return (
    <AdminCard>
      <div className="flex flex-col justify-start items-start space-y-2">
        <div className="flex flex-row justify-start items-center text-sm">
          <div className="text-zinc-700 font-semibold">From:</div>
          <div className="text-zinc-700 ml-2">{emailData.from}</div>
        </div>
        <div className="flex flex-row justify-start items-center text-sm">
          <div className="text-zinc-700 font-semibold">To:</div>
          <div className="text-zinc-700 ml-2">{emailData.to}</div>
        </div>
        <div className="flex flex-row justify-start items-center text-sm">
          <div className="text-zinc-700 font-semibold">Subject:</div>
          <div className="text-zinc-700 ml-2">{emailData.subject}</div>
        </div>
        <div className="flex flex-row justify-start items-center text-sm">
          <div className="text-zinc-700 font-semibold">CC:</div>
          <div className="text-zinc-700 ml-2">{emailData.cc}</div>
        </div>
        <div className="flex flex-row justify-start items-center text-sm">
          <div className="text-zinc-700 font-semibold">BCC:</div>
          <div className="text-zinc-700 ml-2">{emailData.bcc}</div>
        </div>
        <div className="flex flex-row justify-start items-center text-sm">
          <div className="text-zinc-700 font-semibold">Reply To:</div>
          <div className="text-zinc-700 ml-2">{emailData.replyTo}</div>
        </div>
        <div className="flex flex-row justify-start items-center text-sm">
          <div className="text-zinc-700 font-semibold">Priority:</div>
          <div className="text-zinc-700 ml-2">{emailData.priority}</div>
        </div>
      </div>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: emailData.html }}
      />
    </AdminCard>
  );
};

export default AdminSentEmailDetails;
