import prisma from '@/prisma/client';
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Filter from './filter';
import { CustomerStatus, CustomerType } from '@prisma/client';
import DropDown from '@/app/(tools)/dropdown/DropDown';
import DeleteButton from './delete-button';
import EditButton from './edit-button';
import ViewButton from './eye-button';
import Link from 'next/link';

export default async function CustomersTable({
  currentPage,
  itemsPerPage,
  query,
  type,
  status,
}: {
  status?: CustomerStatus;
  type?: CustomerType;
  query: string;
  itemsPerPage: number;
  currentPage: number;
}) {
  //   const invoices = await fetchFilteredInvoices(query, currentPage);

  const customers = await prisma.customers.findMany({
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
                  Customer
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
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Since
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.map((customer) => (
                <tr
                  key={customer.id}
                  className="group relative w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none hover:bg-slate-100 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={customer.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${customer.name}'s profile picture`}
                      />
                      <p>{customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.createdAt.toLocaleDateString()}
                  </td>
                  <td className=" absolute right-0 hidden whitespace-nowrap rounded-2xl bg-white px-3 py-3 shadow-xl group-hover:flex group-hover:bg-slate-200">
                    <div className="flex items-center justify-center gap-2">
                      <DeleteButton id={customer.id} />
                      <Link
                        href={`/dashboard/customers/edit/${customer.id}`}
                        className="rounded-full border border-transparent p-2 hover:border-gray-400"
                      >
                        <PencilIcon width={18} height={18} />
                      </Link>
                      {/* <EditButton /> */}
                      <Link
                        href={`/dashboard/customers/view/${customer.id}`}
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

// {customers.length > 0 &&
//     customers.map((customer) => (
//       <div key={customer.id} className="relative flex">
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.firstName}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.lastName}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.name}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.type}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.status}
//         </span>
//         <div className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"></div>
//       </div>
//     ))}
