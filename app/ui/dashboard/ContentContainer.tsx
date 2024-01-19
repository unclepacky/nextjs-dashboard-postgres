import React, { ReactNode } from 'react';

export default function ContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="text-sm" style={{ minHeight: 'calc( 100vh - 85px )' }}>
      <main
        className="relative grid w-full text-sm"
        style={{
          gridTemplateColumns: `minmax(24px, 1fr) minmax(0, 1200px) minmax(24px, 1fr)`,
          gridTemplateRows: 'auto',
          gridAutoRows: '1fr',
          minHeight: 'calc( 100vh - 85px )',
        }}
      >
        <section
          className="relative col-start-1 col-end-[-1] grid w-full  "
          style={{
            gridTemplateColumns: `minmax(24px, 1fr) minmax(0, 1200px) minmax(24px, 1fr)`,
            gridTemplateRows: 'auto',
            gridAutoRows: '1fr',
          }}
        >
          <section
            className="relative col-start-1 col-end-[-1] grid w-full px-0 py-6 "
            style={{
              gridTemplateColumns: `minmax(24px, 1fr) minmax(0, 1200px) minmax(24px, 1fr)`,
              gridTemplateRows: 'auto',
              gridAutoRows: '1fr',
            }}
          >
            <div className="col-start-2 col-end-3 flex flex-col items-stretch justify-start gap-0 p-0">
              {children}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
