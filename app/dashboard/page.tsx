import React from 'react';
import CardOverview from '../ui/dashboard/dashboard-cards/CardOverview';
import { AiOutlineApartment as UnitIcon } from 'react-icons/ai';
import CardSummary from '../ui/dashboard/dashboard-cards/CardSummary';
import CardStatement from '../ui/dashboard/dashboard-cards/CardStatement';
import prisma from '@/prisma/client';

export default async function DashboardPage() {
  const customers = await prisma.customers.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <>
      <form action="">
        <div className="flex  flex-row items-center justify-start gap-3 p-0">
          <div
            className="flex w-auto max-w-full flex-shrink-[1] flex-grow-[2] items-center overflow-hidden rounded-md text-sm"
            style={{
              flexBasis: '0%',
              boxShadow:
                '0 0 0 1px var(--border-color,var(--ds-gray-alpha-400))',
            }}
          >
            <input
              placeholder="Search Repositories and Projects..."
              className="px3  order-1 inline-flex h-10 w-full min-w-0 rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-none border-l-0 border-r-0 border-none py-0 text-base outline-none "
              type="search"
              name="q"
            />
            <span className="input_prefix">
              <svg
                className="flex-shrink-0 align-baseline"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
                style={{
                  color: 'currentcolor',
                  width: '20px',
                  height: '20px',
                }}
              >
                <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path>
                <path d="M16 16l4.5 4.5"></path>
              </svg>
            </span>
            <span>
              <button
                type="button"
                className="button_base__BjwbK reset_reset__KRyvc button_button__81573 reset_reset__KRyvc geist-show-on-tablet project-sort-button-menu_mobile__HsTjw button_secondary__kMMNc button_invert__YNhnn"
                style={{ minWidth: '32px', maxWidth: '32px' }}
              >
                <span className="button_content__1aE1_ button_flex__fCY56 button_center__nyfP_">
                  <svg
                    className="with-icon_icon__MHUeb"
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    style={{ color: 'currentcolor' }}
                  >
                    <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
                    <circle cx="19" cy="12" r="1" fill="currentColor"></circle>
                    <circle cx="5" cy="12" r="1" fill="currentColor"></circle>
                  </svg>
                </span>
              </button>
              <dialog className="form-menu_dialog__A7I5q">
                <div
                  className="stack_stack__iZkUS stack"
                  style={{
                    flex: 'initial',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    padding: '0px',
                    gap: '8px',
                  }}
                >
                  <label
                    className="stack_stack__iZkUS stack radio-menu-item_menuItem__dmhFJ"
                    style={{
                      flex: 'initial',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0px',
                      gap: '0px',
                    }}
                  >
                    <input
                      className="geist-sr-only"
                      id=":ru:"
                      data-testid="dashboard/sort/default"
                      type="radio"
                      value="default"
                      name="sort"
                    />
                    <span
                      className="text_wrapper__i87JK"
                      style={{
                        color: 'var(--ds-gray-1000)',
                        fontSize: '0.875rem',
                        lineHeight: ' 1.5rem',
                        letterSpacing: 'initial',
                        fontWeight: '400',
                      }}
                    >
                      Sort by activity
                    </span>
                    <svg
                      className="with-icon_icon__MHUeb"
                      data-testid="geist-icon"
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                      style={{
                        color: 'var(--geist-foreground)',
                        width: '20px',
                        height: '20px',
                      }}
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </label>
                  <label
                    className="stack_stack__iZkUS stack radio-menu-item_menuItem__dmhFJ"
                    style={{
                      flex: 'initial',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0px',
                      gap: '0px',
                    }}
                  >
                    <input
                      className="geist-sr-only"
                      id=":rv:"
                      data-testid="dashboard/sort/name"
                      type="radio"
                      value="name"
                      name="sort"
                    />
                    <span
                      className="text_wrapper__i87JK"
                      style={{
                        color: 'var(--ds-gray-1000)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5rem',
                        letterSpacing: 'initial',
                        fontWeight: '400',
                      }}
                    >
                      Sort by name
                    </span>
                  </label>
                  <hr
                    style={{
                      borderTop: '1px solid var(--accents-2)',
                      borderRight: '0px',
                      borderBottom: '0px',
                      borderLeft: '0px',
                      borderImage: 'initial',
                      margin: '0px',
                    }}
                  />
                  <label
                    className="stack_stack__iZkUS stack radio-menu-item_menuItem__dmhFJ"
                    style={{
                      flex: 'initial',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0px',
                      gap: '0px',
                    }}
                  >
                    <input
                      className="geist-sr-only"
                      id=":r10:"
                      data-testid="dashboard/sort/grid"
                      type="radio"
                      value="grid"
                      name="view"
                    />
                    <span
                      className="text_wrapper__i87JK"
                      style={{
                        color: ' var(--ds-gray-1000)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5rem',
                        letterSpacing: 'initial',
                        fontWeight: '400',
                      }}
                    >
                      <span
                        className="stack_stack__iZkUS stack"
                        style={{
                          flex: 'initial',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          padding: '0px',
                          gap: '12px',
                        }}
                      >
                        <svg
                          className="with-icon_icon__MHUeb"
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                          style={{
                            color: 'currentcolor',
                            width: '16px',
                            height: '16px',
                          }}
                        >
                          <path d="M3 3h7v7H3z"></path>
                          <path d="M14 3h7v7h-7z"></path>
                          <path d="M14 14h7v7h-7z"></path>
                          <path d="M3 14h7v7H3z"></path>
                        </svg>
                        <span>Grid View</span>
                      </span>
                    </span>
                    <svg
                      className="with-icon_icon__MHUeb"
                      data-testid="geist-icon"
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                      style={{
                        color: 'var(--geist-foreground)',
                        width: '20px',
                        height: '20px',
                      }}
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </label>
                  <label
                    className="stack_stack__iZkUS stack radio-menu-item_menuItem__dmhFJ"
                    style={{
                      flex: 'initial',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0px',
                      gap: '0px',
                    }}
                  >
                    <input
                      className="geist-sr-only"
                      id=":r11:"
                      type="radio"
                      value="list"
                      name="view"
                    />
                    <span
                      className="text_wrapper__i87JK"
                      style={{
                        color: 'var(--ds-gray-1000)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5rem',
                        letterSpacing: 'initial',
                        fontWeight: '400',
                      }}
                    >
                      <span
                        className="stack_stack__iZkUS stack"
                        data-version="v1"
                        style={{
                          flex: 'initial',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          padding: '0px',
                          gap: '12px',
                        }}
                      >
                        <svg
                          className="with-icon_icon__MHUeb"
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                          style={{
                            color: 'currentcolor',
                            width: '16px',
                            height: '16px',
                          }}
                        >
                          <path d="M8 6h13"></path>
                          <path d="M8 12h13"></path>
                          <path d="M8 18h13"></path>
                          <path d="M3 6h.01"></path>
                          <path d="M3 12h.01"></path>
                          <path d="M3 18h.01"></path>
                        </svg>
                        <span>List View</span>
                      </span>
                    </span>
                  </label>
                </div>
              </dialog>
            </span>
          </div>
        </div>
      </form>
      <div className="flex  min-h-screen flex-initial flex-col items-stretch justify-start gap-6 pb-8">
        <div className=" flex flex-initial flex-col items-stretch justify-start gap-8">
          <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-6 gap-y-6">
            <CardOverview icon={UnitIcon} />
            <CardStatement customers={customers} />
          </section>
          <section className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <CardSummary />
          </section>
        </div>
      </div>
    </>
  );
}
