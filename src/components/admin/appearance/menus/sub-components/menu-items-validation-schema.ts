import * as Yup from 'yup';

const allowedUrlsToUse = process.env.NEXT_PUBLIC_ALLOWED_URL_TO_USE!.split( ',' );
const allowedUrlsToUseRegex = allowedUrlsToUse.length > 1
  ? new RegExp( allowedUrlsToUse.join( '|' ), 'gi' )
  : new RegExp( allowedUrlsToUse[ 0 ], 'gi' );

export const menuItemsValidationSchema = Yup.object( {
  term: Yup.string()
    .max( 50, 'Label must be less than 50 characters' )
    .required( 'Please enter label name' ),
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