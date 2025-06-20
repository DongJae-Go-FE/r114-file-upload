import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientDataSend from "@/components/_clientComponents/data/send/ClientDataSend";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="데이터 전송 목록"
        items={[
          {
            title: "데이터 전송",
            href: "/data/send",
          },
          {
            title: "데이터 전송 목록",
            href: "/data/send",
          },
        ]}
      />
      <ClientDataSend />
    </Fragment>
  );
}
