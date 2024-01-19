import React from 'react';

interface CustomerEditProp {
  params: { id: string };
}

export default function CustomerEditPage(props: CustomerEditProp) {
  console.log({ props });
  return <div>page</div>;
}
