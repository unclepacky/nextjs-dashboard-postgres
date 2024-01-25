'use client';

import { viewCustomer } from '@/app/lib/actions';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function ViewButton({ id }: { id: string }) {
  const handleViewCustomer = viewCustomer.bind(null, id);

  return (
    <form action={handleViewCustomer}>
      <button
        title="View"
        className="rounded-full border border-transparent p-2 hover:border-gray-400 "
      >
        <EyeIcon width={18} height={18} />
      </button>
    </form>
  );
}
