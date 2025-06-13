import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Fragment>
      <PageHeader
        title="데이터 전송 상세"
        items={[
          {
            title: "데이터 전송",
            href: "/data/send",
          },
          {
            title: "데이터 전송 상세",
            href: `/data/send/${id}`,
          },
        ]}
      />
    </Fragment>
  );
}
