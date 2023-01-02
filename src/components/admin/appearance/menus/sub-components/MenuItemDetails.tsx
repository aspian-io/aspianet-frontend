import moment from 'moment';
import Image from 'next/image';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../../../lib/helpers/img-placeholder';
import { ITaxonomyEntity } from '../../../../../models/taxonomies/admin/taxonomy';
import Modal from '../../../../common/Modal';

interface IProps {
  menuItem?: ITaxonomyEntity;
  show: boolean;
  onClose: Function;
}

const MenuItemDetails: FC<IProps> = ({ menuItem, show, onClose }) => {
  return (
    <>
      <Modal show={show} onClose={() => onClose()}>
        <div className="flex flex-col justify-start items-start px-4 space-y-3 w-full">
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Name: </span>
            <span>{menuItem?.term}</span>
          </div>
          <div className="flex justify-start items-start text-sm text-zinc-700 max-w-xs text-left">
            <span className="text-dark font-semibold mr-6">Description: </span>
            <span className="">{menuItem?.description}</span>
          </div>
          <div className="flex justify-start items-start text-sm text-zinc-700 max-w-xs text-left">
            <span className="text-dark font-semibold mr-6">Order: </span>
            <span className="">{menuItem?.order}</span>
          </div>
          <div className="flex justify-start items-start text-sm text-zinc-700 max-w-xs text-left">
            <span className="text-dark font-semibold mr-6">Link: </span>
            <span className="">{menuItem?.href}</span>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Created At: </span>
            <span>
              {moment(menuItem?.createdAt!).format('MMM Do YYYY, h:mm:ss a')}
            </span>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Updated At: </span>
            <span>
              {moment(menuItem?.updatedAt!).format('MMM Do YYYY, h:mm:ss a')}
            </span>
          </div>
          {menuItem?.featuredImage && (
            <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
              <span className="text-dark font-semibold mr-6">
                Featured Image:{' '}
              </span>
              {menuItem?.featuredImage && (
                <div className="flex justify-center items-center w-full mt-4">
                  <div className="relative h-32 w-32 rounded-xl overflow-hidden">
                    <Image
                      className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
                      src={menuItem.featuredImage}
                      fill
                      placeholder="blur"
                      blurDataURL={imgPlaceholderDataURL}
                      alt={'Category featured image'}
                      sizes="(max-width: 640px) 100vw,
                     (max-width: 1200px) 50vw,
                      33vw"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default MenuItemDetails;
