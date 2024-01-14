import { Revenue } from './../app/lib/definitions';
import {
  CustomerStatus,
  CustomerType,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import {
  invoices,
  // customers,
  revenue,
  users,
} from '../app/lib/placeholder-data';

import { customers } from './../app/lib/vgrdata';

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}
// interface CustomerProps {
//   id: string;
//   name: string;
//   email: string;
//   image_url: string;
// }
interface CustomerProps {
  name: string;
  firstName?: string;
  lastName?: string;
  status: CustomerStatus;
  phone?: string;
  email?: string;
  type: CustomerType;
  occupation?: string;
  address?: string;
  nationality?: string;
  image_url?: string;
}
interface InvoiceProps {
  customer_id: string;
  amount: number;
  status: string;
  date: string;
}
interface RevenueProps {
  month: string;
  revenue: number;
}

const prisma = new PrismaClient();

// async function seedUsers(user: UserProps) {
//   const newUser = await prisma.users.create({
//     data: {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       password: user.password,
//     },
//   });
// }
async function seedCustomers(customer: CustomerProps) {
  const newCustomer = await prisma.customers.create({
    data: {
      name: customer.name,
      firstName: customer.firstName,
      lastName: customer.lastName,
      status: customer.status,
      type: customer.type,
      email: customer.email,
    },
  });
}
// async function seedInvoices(invoice: InvoiceProps) {
//   const newInvoice = await prisma.invoices.create({
//     data: {
//       customer_id: invoice.customer_id,
//       amount: invoice.amount,
//       date: new Date(invoice.date as string),
//       status: invoice.status,
//     },
//   });
// }

// async function seedRevenue(revenue: RevenueProps) {
//   const newRevenue = await prisma.revenue.create({
//     data: {
//       month: revenue.month,
//       revenue: revenue.revenue,
//     },
//   });
// }

async function main() {
  // await prisma.users.deleteMany();
  // await prisma.customers.deleteMany();
  // await prisma.invoices.deleteMany();
  // await prisma.revenue.deleteMany();
  // for (const u of users) {
  //   await seedUsers(u);
  // }
  // console.log('finished seeding users');
  // for (const c of customers) {
  //   await seedCustomers(c);
  // }
  // console.log(' finished Seeding customers');
  // for (const i of invoices) {
  //   await seedInvoices(i);
  // }
  // console.log(' finished Seeding invoices');
  // for (const r of revenue) {
  //   await seedRevenue(r);
  // }
  // console.log(' finished Seeding revenues');
  // console.log('test');
  // const alice = await prisma.user.upsert({
  //   where: { email: 'alice@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //     posts: {
  //       create: {
  //         title: 'Check out Prisma with Next.js',
  //         content: 'https://www.prisma.io/nextjs',
  //         published: true,
  //       },
  //     },
  //   },
  // });
  // const bob = await prisma.user.upsert({
  //   where: { email: 'bob@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Nexus on Twitter',
  //           content: 'https://twitter.com/nexusgql',
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // });
  // console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
