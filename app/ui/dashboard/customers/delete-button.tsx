import { deleteCustomer } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DeleteButton({ id }: { id: string }) {
  const handleDeleteCustomer = deleteCustomer.bind(null, id);
  return (
    <div className="relative">
      <form action={handleDeleteCustomer}>
        <button
          className="rounded-full border border-transparent p-2 hover:border-gray-400"
          title="Delete"
        >
          <TrashIcon width={18} height={18} />
        </button>
      </form>
    </div>
  );
}