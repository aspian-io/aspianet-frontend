import * as Yup from 'yup';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const tagValidationSchema = Yup.object( {
  term: Yup.string()
    .max( 50, 'Name must be less than 50 characters' )
    .required( 'Please enter tag name' ),
  slug: Yup.string()
    .required( 'Please enter slug' )
    .matches(
      slugRegex,
      'Uppercase letters, lowercase letters, hyphens and numbers are allowed'
    )
    .max( 50, 'Slug must be less than 50 characters' )
    .required( 'Please enter a unique slug' ),
  href: Yup.string()
    .nullable()
    .url( 'Please enter a standard URL' ),
  description: Yup.string()
    .nullable()
    .max( 400, 'Description must be less than 400 characters' ),
} );