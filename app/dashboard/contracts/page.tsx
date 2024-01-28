import Navigation from '@/app/(tools)/navigator/Navigation';
import ContractsTable from '@/app/ui/dashboard/contracts/ContractsTable';
import CustomersTable from '@/app/ui/dashboard/customers/CustomersTable';
import FilterSelect from '@/app/ui/dashboard/customers/filters/FilterSelect';
import UnitsTable from '@/app/ui/dashboard/units/UnitsTable';
import Search from '@/app/ui/search';
import prisma from '@/prisma/client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ContractType, UnitStatus, UnitType } from '@prisma/client';
import Link from 'next/link';

interface SearchParamsProps {
  searchParams: {
    page?: string;
    query?: string;
    type: ContractType;
  };
}

const ITEMS_PER_PAGE = 10;

export default async function ContractsPage({
  searchParams,
}: SearchParamsProps) {
  const currentPage = Number(searchParams?.page) || 1;

  const types = Object.values(ContractType);
  const type = types.includes(searchParams.type)
    ? searchParams.type
    : undefined;

  const totalNumbOfContracts = await prisma.contract.count({
    where: {
      OR: [
        {
          customer: {
            name: {
              contains: searchParams.query,
              mode: 'insensitive', // Case-insensitive search
            },
          },
        },
        {
          unit: {
            name: {
              contains: searchParams.query,
              mode: 'insensitive', // Case-insensitive search
            },
          },
        },
      ],
      type: type,
    },
  });

  const totalPages = Math.ceil(totalNumbOfContracts / ITEMS_PER_PAGE);

  return (
    <>
      <div className="mt-2 flex items-center justify-between gap-2 md:mt-4">
        <Search placeholder="Search Contracts..." />
        <FilterSelect
          options={Object.values(ContractType).map((type) => ({
            value: type,
            label: type,
          }))}
          value={type}
          queryParamName="type"
          placeholder="Filter by Type"
        />
        {/* <FilterSelect
          options={Object.values(UnitStatus).map((status) => ({
            value: status,
            label: status,
          }))}
          value={status}
          queryParamName="status"
          placeholder="Filter by status"
        /> */}
        <Link href="/dashboard/contracts/create">
          <PlusIcon width={24} height={24} />
        </Link>
        {/* <CreateInvoice /> */}
      </div>
      <ContractsTable
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        query={searchParams?.query || ''}
        type={type}
      />

      <div className="mt-5 flex w-full justify-center">
        <Navigation totalPages={totalPages} />
      </div>
    </>
  );
}
