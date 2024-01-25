'use client';

import { PencilIcon } from '@heroicons/react/24/outline';

export default function EditButton() {
  return (
    <button
      className="rounded-full border border-transparent p-2 hover:border-gray-400 "
      title="Edit"
    >
      <PencilIcon width={18} height={18} />
    </button>
  );
}
