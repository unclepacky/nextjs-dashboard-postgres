import Navigation from '@/app/(tools)/navigator/Navigation';
import FilterSelect from '@/app/ui/dashboard/customers/filters/FilterSelect';
import UnitsTable from '@/app/ui/dashboard/units/UnitsTable';
import Search from '@/app/ui/search';
import prisma from '@/prisma/client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { UnitStatus, UnitType } from '@prisma/client';
import Link from 'next/link';

interface SearchParamsProps {
  searchParams: {
    page?: string;
    query?: string;
    type: UnitType;
    status: UnitStatus;
  };
}

const ITEMS_PER_PAGE = 10;

export default async function UnitsPage({ searchParams }: SearchParamsProps) {
  const currentPage = Number(searchParams?.page) || 1;

  const types = Object.values(UnitType);
  const type = types.includes(searchParams.type)
    ? searchParams.type
    : undefined;

  const statuses = Object.values(UnitStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const totalNumbOfUnits = await prisma.unit.count({
    where: {
      name: {
        contains: searchParams.query,
        mode: 'insensitive',
      },
      type: type,
      status: status,
    },
  });

  const totalPages = Math.ceil(totalNumbOfUnits / ITEMS_PER_PAGE);

  return (
    <>
      <div className="mt-2 flex items-center justify-between gap-2 md:mt-4">
        <Search placeholder="Search Units..." />
        <FilterSelect
          options={Object.values(UnitType).map((type) => ({
            value: type,
            label: type,
          }))}
          value={type}
          queryParamName="type"
          placeholder="Filter by Type"
        />
        <FilterSelect
          options={Object.values(UnitStatus).map((status) => ({
            value: status,
            label: status,
          }))}
          value={status}
          queryParamName="status"
          placeholder="Filter by status"
        />
        <Link href="/dashboard/units/create">
          <PlusIcon width={24} height={24} />
        </Link>
        {/* <CreateInvoice /> */}
      </div>
      <UnitsTable
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
