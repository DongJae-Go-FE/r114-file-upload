import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientDataSendAdd from "@/components/_clientComponents/data/send/ClientDataSendAdd";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="데이터 전송 등록"
        items={[
          {
            title: "데이터 전송",
            href: "/data/send",
          },
          {
            title: "데이터 전송 등록",
            href: "/data/send/add",
          },
        ]}
      />
      <ClientDataSendAdd />
    </Fragment>
  );
}
