import { deleteExtension, releaseContract } from '@/app/lib/actions';
import { ScissorsIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ReleaseContract({ id }: { id: string }) {
  const handleReleaseContract = releaseContract.bind(null, id);
  return (
    <div className="relative">
      <form action={handleReleaseContract}>
        <button
          className="rounded-full border border-transparent p-2 hover:border-gray-400"
          title="Release"
        >
          <ScissorsIcon width={18} height={18} />
        </button>
      </form>
    </div>
  );
}
