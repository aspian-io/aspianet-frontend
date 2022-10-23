import Link from 'next/link';
import React from 'react';

const AdminFooter = () => {
  return (
    <div className="text-center">
      &copy; Copyright {new Date().getUTCFullYear()}{' '}
      <Link href={process.env.NEXT_PUBLIC_APP_BASE_URL!}>
        <a className='text-primary'>ASPIANET</a>
      </Link>
    </div>
  );
};

export default AdminFooter;
