'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Navigation({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  // NOTE: comment in this code when you get to this point in the course

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-5">
      {currentPage === 1 ? (
        <div className="rounded-full border border-black bg-red-400 px-2 py-1">
          {'<'}
        </div>
      ) : (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-full border border-black px-2 py-1 "
        >
          {'<'}
        </Link>
      )}
      <div>{currentPage}</div>
      <span>Of</span>
      <div>{totalPages}</div>
      {currentPage === totalPages ? (
        <div className="rounded-full border border-black bg-red-400 px-2 py-1">
          {'>'}
        </div>
      ) : (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-full border border-black px-2 py-1 "
        >
          {'>'}
        </Link>
      )}
    </div>
  );
}
