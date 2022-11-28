import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { FC, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AdminTaxonomyAgent } from '../../../../../lib/axios/agent';
import { imgPlaceholderDataURL } from '../../../../../lib/helpers/img-placeholder';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { ITaxonomyEntity } from '../../../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../../../common/AuthGuard';
import Button from '../../../../common/Button';
import ConfirmModal from '../../../../common/ConfirmModal';
import Modal from '../../../../common/Modal';

interface IProps {
  category?: ITaxonomyEntity;
  show: boolean;
  onClose: Function;
  onDeleteSlugHistorySuccess: (deletedId: string) => any;
}

const CategoryDetails: FC<IProps> = ({
  category,
  show,
  onClose,
  onDeleteSlugHistorySuccess,
}) => {
  const { data: session } = useSession();
  const [categorySlugHistory, setCategorySlugHistory] = useState(
    category?.slugsHistory
  );
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (category) setCategorySlugHistory(category.slugsHistory);
  }, [category]);

  return (
    <>
      <Modal show={show} onClose={() => onClose()}>
        <div className="flex flex-col justify-start items-start px-4 space-y-3 w-full">
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Name: </span>
            <span>{category?.term}</span>
          </div>
          <div className="flex justify-start items-start text-sm text-zinc-700 max-w-xs text-left">
            <span className="text-dark font-semibold mr-6">Description: </span>
            <span className="">{category?.description}</span>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Created At: </span>
            <span>
              {moment(category?.createdAt!).format('MMM Do YYYY, h:mm:ss a')}
            </span>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Updated At: </span>
            <span>
              {moment(category?.updatedAt!).format('MMM Do YYYY, h:mm:ss a')}
            </span>
          </div>
          {category?.featuredImage && (
            <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
              <span className="text-dark font-semibold mr-6">
                Featured Image:{' '}
              </span>
              {category?.featuredImage && (
                <div className="flex justify-center items-center w-full mt-4">
                  <div className="relative h-32 w-32 rounded-xl overflow-hidden">
                    <Image
                      className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
                      src={category.featuredImage}
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
          {categorySlugHistory && (
            <div className="flex flex-col justify-start items-start text-sm text-zinc-700 w-full text-left gap-4">
              <span className="text-dark font-semibold mr-6">
                Slug History:{' '}
              </span>
              {categorySlugHistory.map((s, i) => (
                <div
                  className="flex flex-row justify-start items-start w-full bg-zinc-100 p-2 rounded-lg"
                  key={i}
                >
                  <div>{s.slug}</div>
                  <Button
                    rounded="rounded-md"
                    size="h-5"
                    type="button"
                    variant="danger"
                    extraCSSClasses="px-1.5 text-xs ml-auto"
                    onClick={() => {
                      setItemToDelete(s.id);
                      setRemoveConfirm(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
      <AuthGuard
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_DELETE]}
        redirect={false}
      >
        <ConfirmModal
          onCancel={() => {
            setRemoveConfirm(false);
            setItemToDelete(null);
          }}
          onConfirm={async () => {
            try {
              setRemoveLoading(true);
              if (itemToDelete) {
                await AdminTaxonomyAgent.deleteOldSlug(session, itemToDelete);
                await onDeleteSlugHistorySuccess(itemToDelete);
                setCategorySlugHistory((prev) =>
                  prev?.filter((s) => s.id !== itemToDelete)
                );
              } else {
                toast.error('Something went wrong. Please try again later.', {
                  className: 'bg-danger text-light text-sm',
                });
              }
              setRemoveLoading(false);
              setRemoveConfirm(false);
            } catch (error) {
              toast.error('Something went wrong. Please try again later.', {
                className: 'bg-danger text-light text-sm',
              });
              setRemoveLoading(false);
              setRemoveConfirm(false);
            }
          }}
          show={removeConfirm}
          onConfirmLoading={removeLoading}
          text="Are you sure you want to delete the slug?"
        />
      </AuthGuard>
    </>
  );
};

export default CategoryDetails;
