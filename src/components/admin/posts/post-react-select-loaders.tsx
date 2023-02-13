import { Session } from 'next-auth';
import {
  AdminFileAgent,
  AdminPostAgent,
  AdminTaxonomyAgent,
  AdminUserAgent,
} from '../../../lib/axios/agent';
import { matchRule } from '../../../lib/helpers/match-wildcards';
import AdminSelectMediaOptions from '../common/react-select/AdminSelectMediaOptions';
import { imageType } from '../media/constants';

// Select Parent Options Loader
export const parentOptionsLoader = async (
  inputValue: string,
  session: Session | null
) => {
  if (inputValue?.length && inputValue.length > 1) {
    try {
      const { items } = await AdminPostAgent.blogsList(
        session,
        `?searchBy.title=${inputValue}&orderBy.createdAt=DESC`
      );
      return items.map((i) => ({
        value: i.id,
        label: `${i.title} ${i.child ? '(TAKEN)' : ''}`,
        isDisabled: !!i.child,
      }));
    } catch (error) {}
  }
};

// Select Project Owner Options Loader
export const projectOwnerOptionsLoader = async (
  inputValue: string,
  session: Session | null
) => {
  if (inputValue?.length && inputValue.length > 1) {
    try {
      const { items } = await AdminUserAgent.list(
        session,
        `/admin/users?searchBy.email=${inputValue}&orderBy.createdAt=DESC`
      );
      return items.map((i) => ({
        value: i.id,
        label: i.email,
      }));
    } catch (error) {}
  }
};

// Select Categories Options Loader
export const categoriesOptionsLoader = async (
  inputValue: string,
  session: Session | null
) => {
  if (inputValue?.length && inputValue.length > 1) {
    try {
      const { items: categories } = await AdminTaxonomyAgent.categoriesList(
        session,
        `?searchBy.term=${inputValue}&orderBy.createdAt=DESC`
      );

      return categories.map((c) => ({
        value: c.id,
        label: c.term,
      }));
    } catch (error) {}
  }
};

// Select Project Categories Options Loader
export const projectCategoriesOptionsLoader = async (
  inputValue: string,
  session: Session | null
) => {
  if (inputValue?.length && inputValue.length > 1) {
    try {
      const { items: categories } =
        await AdminTaxonomyAgent.projectCategoriesList(
          session,
          `?searchBy.term=${inputValue}&orderBy.createdAt=DESC`
        );

      return categories.map((c) => ({
        value: c.id,
        label: c.term,
      }));
    } catch (error) {}
  }
};

// Select Tags Options Loader
export const tagsOptionsLoader = async (
  inputValue: string,
  session: Session | null
) => {
  if (inputValue?.length && inputValue.length > 1) {
    try {
      const { items: tags } = await AdminTaxonomyAgent.tagsList(
        session,
        `?searchBy.term=${inputValue}&orderBy.createdAt=DESC`
      );

      return tags.map((t) => ({
        value: t.id,
        label: t.term,
      }));
    } catch (error) {}
  }
};

// Select Featured Image Options Loader
export const featuredImageOptionsLoader = async (
  inputValue: string,
  session: Session | null
) => {
  if (inputValue?.length && inputValue.length > 1) {
    try {
      const { items: files } = await AdminFileAgent.list(
        session,
        `?searchBy.filename=${inputValue}&orderBy.createdAt=DESC`
      );

      const imageFiles = files.filter((f) => matchRule(f.type, imageType));

      return imageFiles.map((f) => ({
        value: f.id,
        label: <AdminSelectMediaOptions {...f} fileKey={f.key} />,
      }));
    } catch (error) {}
  }
};

// Select Attachments Options Loader
export const attachmentsOptionsLoader = async (
  inputValue: string,
  session: Session | null
) => {
  if (inputValue?.length && inputValue.length > 1) {
    try {
      const { items: files } = await AdminFileAgent.list(
        session,
        `?searchBy.filename=${inputValue}&orderBy.createdAt=DESC`
      );

      return files.map((f) => ({
        value: f.id,
        label: <AdminSelectMediaOptions {...f} fileKey={f.key} />,
      }));
    } catch (error) {}
  }
};
