import moment from 'moment';
import React, { FC } from 'react';
import { ITaxonomyEntity } from '../../../../../models/taxonomies/admin/taxonomy';
import Modal from '../../../../common/Modal';

interface IProps {
  menu?: ITaxonomyEntity;
  show: boolean;
  onClose: Function;
}

const MenuDetails: FC<IProps> = ({ menu, show, onClose }) => {
  return (
    <>
      <Modal show={show} onClose={() => onClose()}>
        <div className="flex flex-col justify-start items-start px-4 space-y-3 w-full">
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Name: </span>
            <span>{menu?.term}</span>
          </div>
          <div className="flex justify-start items-start text-sm text-zinc-700 max-w-xs text-left">
            <span className="text-dark font-semibold mr-6">Description: </span>
            <span className="">{menu?.description}</span>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Created At: </span>
            <span>
              {moment(menu?.createdAt!).format('MMM Do YYYY, h:mm:ss a')}
            </span>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Updated At: </span>
            <span>
              {moment(menu?.updatedAt!).format('MMM Do YYYY, h:mm:ss a')}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuDetails;
