import { CustomerStatementColumns } from '@/app/lib/menu';
import FilterSelect from '@/app/ui/dashboard/customers/filters/FilterSelect';
import prisma from '@/prisma/client';
import React from 'react';

interface StatementProps {
  params: {
    id: string;
  };
  searchParams: {
    unit: string;
  };
}

// Define a type that matches the structure of your transactionDetails
interface TransactionDetails {
  startingDate?: string;
  endingDate?: string;
  // Add other properties as needed
}

export default async function StatementByCustomer({
  params,
  searchParams,
}: StatementProps) {
  const customer = await prisma.customers.findUnique({
    where: {
      id: params.id,
    },
    include: {
      contract: {
        // Fetch contracts associated with the customer
        include: {
          transaction: true,
          unit: true,
        },
        orderBy: {
          unit: {
            name: 'asc',
          },
        },
      },
    },
  });

  let filteredContracts = customer ? [...customer.contract] : [];

  // Filter contracts based on unit name
  if (customer && customer.contract && searchParams.unit) {
    customer.contract = customer.contract.filter(
      (contract) => contract.unit.name === searchParams.unit,
    );
  }

  // Extract unique unit names
  const unitNames = Array.from(
    new Set(filteredContracts.map((item) => item.unit.name)),
  );

  const unitName = unitNames.includes(searchParams.unit)
    ? searchParams.unit
    : undefined;

  // Use Prisma's aggregate function to calculate the total amount
  const totalAmount = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      contract: {
        customerId: params.id,
        unit: {
          name: searchParams.unit,
        },
      },
    },
  });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="flex justify-between">
          <div>
            <div className="text-xl">{customer?.name}</div>
            <div>
              <h2>Total Amount: {totalAmount._sum.amount || 0}</h2>
            </div>
          </div>
          <FilterSelect
            options={unitNames.map((name) => ({
              value: name,
              label: name,
            }))}
            value={unitName}
            queryParamName="unit"
            placeholder="Filter by unit"
          />
        </div>

        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {CustomerStatementColumns.map((col) => (
                  <th
                    key={col.label}
                    scope="col"
                    className="px-4 py-5 font-medium sm:pl-6"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {customer?.contract.map((item) =>
                item.transaction.map((trans) => (
                  <tr
                    key={trans.id}
                    className="group relative w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none hover:bg-slate-100 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div>
                        <p>{item.unit.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      {trans.type}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      {typeof trans.transactionDetails === 'object' &&
                      trans.transactionDetails !== null &&
                      'paymentDate' in trans.transactionDetails
                        ? new Date(
                            trans.transactionDetails.paymentDate as string,
                          ).toLocaleDateString()
                        : new Date(trans.currentDate).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      {trans.amount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3">
                      {trans.fromDate
                        ? new Date(trans.fromDate).toLocaleDateString()
                        : typeof trans.transactionDetails === 'object' &&
                            trans.transactionDetails !== null &&
                            'startingDate' in trans.transactionDetails
                          ? new Date(
                              trans.transactionDetails.startingDate as string,
                            ).toLocaleDateString()
                          : 'No Details'}
                    </td>
                    <td className="px- whitespace-nowrap py-3">
                      {trans.toDate
                        ? new Date(trans.toDate).toLocaleDateString()
                        : typeof trans.transactionDetails === 'object' &&
                            trans.transactionDetails !== null &&
                            'endingDate' in trans.transactionDetails
                          ? new Date(
                              trans.transactionDetails.endingDate as string,
                            ).toLocaleDateString()
                          : 'No Details'}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

{
  /* <div>
      {customer?.name}
      {customer?.contract.map((item) =>
        item.transaction.map((trans) => (
          <div key={trans.id}>
            {item.unit.name}
            {trans.type} {trans.amount}
            {trans.fromDate
              ? new Date(trans.fromDate).toLocaleDateString()
              : trans.transactionDetails
                ? JSON.stringify(trans.transactionDetails, null, 2)
                : 'No Details'}
            {trans.toDate
              ? new Date(trans.toDate).toLocaleDateString()
              : trans.transactionDetails
                ? JSON.stringify(trans.transactionDetails, null, 2)
                : 'No Details'}
          </div>
        )),
      )}
      <h2>Total Amount: {totalAmount._sum.amount || 0}</h2>
    </div> */
}

// {"endingDate":"2024-02-29","internetFee":"15","startingDate":"2024-02-01"}

//  {trans.fromDate
//               ? new Date(trans.fromDate).toLocaleDateString()
//               : trans.transactionDetails &&
//                   trans.transactionDetails.startingDate
//                 ? new Date(
//                     trans.transactionDetails.startingDate,
//                   ).toLocaleDateString()
//                 : 'No Details'}
//             &rarr;
//             {trans.toDate
//               ? new Date(trans.toDate).toLocaleDateString()
//               : trans.transactionDetails && trans.transactionDetails.endingDate
//                 ? new Date(
//                     trans.transactionDetails.endingDate,
//                   ).toLocaleDateString()
//                 : 'No Details'}

// {
// "amountUsd":"1000",
// "firstAmount":"1000",
// "paymentDate":"2024-02-24",
// "secondAmount":"8900000",
// "firstCurrency":"USD",
// "secondCurrency":"LBP",
// "secondAmountUsd":"99.44"
// }

// {
// "kw":"123",
// "kwRate":"123",
// "endingDate":"2024-03-03",
// "startingDate":"2024-02-24",
// "endingCounter":"321",
// "startingCounter":"123"
// }

// {
// "endingDate":"2024-02-29",
// "internetFee":"15",
// "startingDate":"2024-02-01"
// }

// {
// "fromTime":"12:40",
// "tillTime":"13:40",
// "timeDiff":"1hr : 0min",
// "employeeId":"1603b7d1-00ee-48a8-9820-5e91fed1225b",
// "hourlyRate":"5",
// "laundrySet":"12",
// "laundryRate":"2",
// "laundryTotal":"24.00",
// "cleaningTotal":"4.00"
// }
