import { Fragment, ReactNode } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/Breadcrumb";

type itemsType = {
  title: string;
  href: string;
};

type PageHeaderType = {
  title: ReactNode;
  items?: itemsType[];
};

export default async function PageHeader({ title, items }: PageHeaderType) {
  return (
    <div className="w-full flex justify-between border-b border-gray-200 items-end mb-6 pb-2">
      <h3 className="heading03b">{title}</h3>
      {items && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.36435 1.29457C7.1513 1.12414 6.84858 1.12414 6.63554 1.29457L0.802201 5.96124C0.550632 6.1625 0.509844 6.52958 0.7111 6.78115C0.912356 7.03272 1.27944 7.07351 1.53101 6.87225L2.04161 6.46378V12.2501C2.04161 12.5722 2.30277 12.8334 2.62494 12.8334H11.3749C11.6971 12.8334 11.9583 12.5722 11.9583 12.2501V6.46378L12.4689 6.87225C12.7204 7.07351 13.0875 7.03272 13.2888 6.78115C13.49 6.52958 13.4492 6.1625 13.1977 5.96124L7.36435 1.29457ZM4.95825 8.45842C4.95825 8.13625 5.21942 7.87508 5.54159 7.87508H8.45825C8.78042 7.87508 9.04159 8.13625 9.04159 8.45842V11.6667H7.87492V9.04175H6.12492V11.6667H4.95825V8.45842Z"
                    fill="#999999"
                  />
                </svg>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator color="#ddd" />
            {items?.map(({ title, href }, index) => {
              if (index + 1 === items.length) {
                return (
                  <Fragment key={title}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={title}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator color="#ddd" />
                  </Fragment>
                );
              }
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
}
