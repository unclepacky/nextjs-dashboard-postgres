import prisma from '@/prisma/client';
import { EyeIcon, FunnelIcon, PencilIcon } from '@heroicons/react/24/outline';
import { UnitStatus, UnitType } from '@prisma/client';
import DropDown from '@/app/(tools)/dropdown/DropDown';
import DeleteButton from './delete-button';
import EditButton from './edit-button';
import ViewButton from './eye-button';
import Link from 'next/link';

export default async function UnitsTable({
  currentPage,
  itemsPerPage,
  query,
  type,
  status,
}: {
  status?: UnitStatus;
  type?: UnitType;
  query: string;
  itemsPerPage: number;
  currentPage: number;
}) {
  //   const invoices = await fetchFilteredInvoices(query, currentPage);

  const units = await prisma.unit.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
      type: type,
      status: status,
    },
    orderBy: {
      name: 'asc', // Sort by 'name' in ascending order
    },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Unit
                </th>
                <th scope="col" className="flex gap-1 px-3 py-5 font-medium">
                  Type
                  <DropDown
                    menuIcon={<FunnelIcon width={20} height={20} type="Type" />}
                  />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Currency
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Monthly rate
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Daily rate
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Block
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {units?.map((unit) => (
                <tr
                  key={unit.id}
                  className="group relative w-full border-b py-3 text-sm last-of-type:border-none hover:bg-slate-100 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{unit.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{unit.type}</td>
                  <td className="whitespace-nowrap px-3 py-3">{unit.status}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {unit.currency}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {unit.monthlyRate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {unit.dailyRate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{unit.block}</td>
                  <td className=" absolute right-0 hidden whitespace-nowrap rounded-2xl bg-white px-3 py-3 shadow-xl group-hover:flex group-hover:bg-slate-200">
                    <div className="flex items-center justify-center gap-2">
                      <DeleteButton id={unit.id} />
                      <Link
                        href={`/dashboard/units/edit/${unit.id}`}
                        className="rounded-full border border-transparent p-2 hover:border-gray-400"
                      >
                        <PencilIcon width={18} height={18} />
                      </Link>
                      {/* <EditButton /> */}
                      <Link
                        href={`/dashboard/units/view/${unit.id}`}
                        className="rounded-full border border-transparent p-2 hover:border-gray-400"
                      >
                        <EyeIcon width={18} height={18} />
                      </Link>
                      {/* <ViewButton id={customer.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
