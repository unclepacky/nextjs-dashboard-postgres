import Navigation from '@/app/(tools)/navigator/Navigation';
import CustomersTable from '@/app/ui/dashboard/customers/CustomersTable';
import FilterSelect from '@/app/ui/dashboard/customers/filters/FilterSelect';
import Search from '@/app/ui/search';
import prisma from '@/prisma/client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CustomerStatus, CustomerType } from '@prisma/client';
import Link from 'next/link';

interface SearchParamsProps {
  searchParams: {
    page?: string;
    query?: string;
    type: CustomerType;
    status: CustomerStatus;
  };
}

const ITEMS_PER_PAGE = 10;

export default async function CustomersPage({
  searchParams,
}: SearchParamsProps) {
  const currentPage = Number(searchParams?.page) || 1;

  const types = Object.values(CustomerType);
  const type = types.includes(searchParams.type)
    ? searchParams.type
    : undefined;

  const statuses = Object.values(CustomerStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const totalNumbOfCustomers = await prisma.customers.count({
    where: {
      name: {
        contains: searchParams.query,
        mode: 'insensitive',
      },
      type: type,
      status: status,
    },
  });
  const totalPages = Math.ceil(totalNumbOfCustomers / ITEMS_PER_PAGE);

  console.log('currentPage', currentPage);

  return (
    <>
      <div className="mt-2 flex items-center justify-between gap-2 md:mt-4">
        <Search placeholder="Search invoices..." />
        {/* <TypeFilter type={type} /> */}
        <FilterSelect
          options={Object.values(CustomerType).map((type) => ({
            value: type,
            label: type,
          }))}
          value={type}
          queryParamName="type"
          placeholder="Filter by Type"
        />
        <FilterSelect
          options={Object.values(CustomerStatus).map((status) => ({
            value: status,
            label: status,
          }))}
          value={status}
          queryParamName="status"
          placeholder="Filter by status"
        />
        <Link href="/dashboard/customers/create">
          <PlusIcon width={24} height={24} />
        </Link>
        {/* <CreateInvoice /> */}
      </div>
      <CustomersTable
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        query={searchParams?.query || ''}
        type={type}
        status={status}
      />

      <div className="mt-5 flex w-full justify-center">
        <Navigation totalPages={totalPages} />
      </div>
    </>
  );
}
