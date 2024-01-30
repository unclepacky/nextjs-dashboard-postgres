import React from 'react';

export default function ViewTransactionPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);
  return <div>ViewTransactionPage</div>;
}
