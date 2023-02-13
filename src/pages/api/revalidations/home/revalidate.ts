import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { ClaimsEnum } from '../../../../models/auth/common';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler ( req: NextApiRequest, res: NextApiResponse ) {
  const session = await unstable_getServerSession( req, res, authOptions );
  const allowedClaims = session?.user.claims.some( c => Object.values( ClaimsEnum ).includes( c as ClaimsEnum ) );

  if ( req.method !== 'POST' ) {
    return res.status( 500 ).send( 'Error revalidating' );

  }

  if ( !session ) {
    return res.status( 401 ).json( { message: 'Not Authenticated' } );
  }

  if ( !allowedClaims ) {
    return res.status( 403 ).json( { message: 'Not Authorized' } );
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate( '/' );
    console.log('Revalidation Succeeded!');
    return res.json( { revalidated: true } );
  } catch ( err ) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status( 500 ).send( 'Error revalidating' );
  }
}