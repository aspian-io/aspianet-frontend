import moment from 'moment';
import React, { FC } from 'react';
import { ISubscriberEntity } from '../../../../../models/newsletter/subscribers/admin/subscriber';
import Modal from '../../../../common/Modal';
import { UAParser } from 'ua-parser-js';

interface IProps {
  subscriberId?: string;
  subscribers?: ISubscriberEntity[];
  show: boolean;
  onClose: Function;
}

const SubscriberDetails: FC<IProps> = ({
  subscriberId,
  subscribers,
  show,
  onClose,
}) => {
  const subscriber = subscribers?.filter((s) => s.id === subscriberId)[0];
  const agentParser = new UAParser(subscriber?.userAgent);

  return (
    <Modal show={show} onClose={() => onClose()}>
      <div className="flex flex-col justify-start items-start px-4 space-y-3 w-full">
        <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
          <span className="text-dark font-semibold mr-6">Name: </span>
          <span>{subscriber?.name}</span>
        </div>
        <div className="flex justify-start items-start text-sm text-zinc-700 max-w-xs text-left">
          <span className="text-dark font-semibold mr-6">Email: </span>
          <span className="">{subscriber?.email}</span>
        </div>
        <div className="flex justify-start items-start text-sm text-zinc-700 max-w-xs text-left">
          <span className="text-dark font-semibold mr-6">Approval: </span>
          {subscriber?.approved && (
            <span className="px-2 py-0.5 rounded-md bg-success text-light text-xs">
              Approved
            </span>
          )}
          {!subscriber?.approved && (
            <span className="px-2 py-0.5 rounded-md bg-danger text-light text-xs">
              Not Approved
            </span>
          )}
        </div>
        <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
          <span className="text-dark font-semibold mr-6">Created At: </span>
          <span>
            {moment(subscriber?.createdAt!).format('MMM Do YYYY, h:mm:ss a')}
          </span>
        </div>
        <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
          <span className="text-dark font-semibold mr-6">Updated At: </span>
          <span>
            {moment(subscriber?.updatedAt!).format('MMM Do YYYY, h:mm:ss a')}
          </span>
        </div>
        <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
          <span className="text-dark font-semibold mr-6">OS: </span>
          <span>{agentParser.getOS().name}</span>
        </div>
        <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
          <span className="text-dark font-semibold mr-6">Browser: </span>
          <span>
            {agentParser.getBrowser().name} - {agentParser.getBrowser().version}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriberDetails;
