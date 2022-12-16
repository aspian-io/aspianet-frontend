import * as Yup from 'yup';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const allowedUrlsToUse = process.env.NEXT_PUBLIC_ALLOWED_URL_TO_USE!.split( ',' );
const allowedUrlsToUseRegex = allowedUrlsToUse.length > 1
  ? new RegExp( allowedUrlsToUse.join( '|' ), 'gi' )
  : new RegExp( allowedUrlsToUse[ 0 ], 'gi' );

export const categoryValidationSchema = Yup.object( {
  term: Yup.string()
    .max( 50, 'Name must be less than 50 characters' )
    .required( 'Please enter category name' ),
  slug: Yup.string()
    .required( 'Please enter slug' )
    .matches(
      slugRegex,
      'Uppercase letters, lowercase letters, hyphens and numbers are allowed'
    )
    .max( 100, 'Slug must be less than 100 characters' ),
  href: Yup.string()
    .nullable()
    .url( 'Please enter a standard URL' ),
  order: Yup.number().min( 0, 'Order must be more than or equal to zero' ),
  description: Yup.string()
    .nullable()
    .max( 400, 'Description must be less than 400 characters' ),
  featuredImage: Yup.string()
    .nullable()
    .url( 'Please enter a standard URL' )
    .matches( allowedUrlsToUseRegex, `URL must be from an allowed server. (e.g. ${ allowedUrlsToUse[ 0 ] })` ),
} );