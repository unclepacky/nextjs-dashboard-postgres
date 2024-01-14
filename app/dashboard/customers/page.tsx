import prisma from '@/prisma/client';

export default async function ContactsPage() {
  const customers = await prisma.customers.findMany();

  return <div>Customerssss</div>;
}
