import React from 'react';

export default function EditTransactionPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);
  return <div>EditTransactionPage</div>;
}
