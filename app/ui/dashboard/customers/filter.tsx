import { FunnelIcon } from '@heroicons/react/24/outline';

export default function Filter({ type }: { type: string }) {
  return (
    <FunnelIcon width={20} className="cursor-pointer hover:text-amber-700" />
  );
}
