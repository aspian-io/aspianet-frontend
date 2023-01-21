import React, { lazy, Suspense } from 'react';
import Accordion from '../../../common/Accordion';
import LoadingSpinner from '../../../common/LoadingSpinner';
const HeroSectionForm = lazy(() => import('./sub-components/HeroSectionForm'));
const SubHeadingSectionForm = lazy(
  () => import('./sub-components/SubHeadingSectionForm')
);
const FooterForm = lazy(() => import('./sub-components/FooterForm'));

const AdminTemplate = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-full">
      <div className="p-4 bg-light rounded-2xl w-full">
        <Accordion
          title="Hero Section"
          bodyClassName="flex justify-center items-center"
        >
          <Suspense
            fallback={<LoadingSpinner className="text-primary w-9 h-9 my-20" />}
          >
            <HeroSectionForm />
          </Suspense>
        </Accordion>
      </div>
      <div className="p-4 bg-light rounded-2xl w-full">
        <Accordion
          title="Subheading Section"
          bodyClassName="flex justify-center items-center"
        >
          <Suspense
            fallback={<LoadingSpinner className="text-primary w-9 h-9 my-20" />}
          >
            <SubHeadingSectionForm />
          </Suspense>
        </Accordion>
      </div>
      <div className="p-4 bg-light rounded-2xl w-full">
        <Accordion
          title="Footer Section"
          bodyClassName="flex justify-center items-center"
        >
          <Suspense
            fallback={<LoadingSpinner className="text-primary w-9 h-9 my-20" />}
          >
            <FooterForm />
          </Suspense>
        </Accordion>
      </div>
    </div>
  );
};

export default AdminTemplate;
