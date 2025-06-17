import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientDataSendDetail from "@/components/_clientComponents/data/send/ClientDataSendDetail";

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
      <ClientDataSendDetail id={id} />
    </Fragment>
  );
}
