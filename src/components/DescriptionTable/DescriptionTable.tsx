import { ReactNode } from "react";

export default function DescriptionTable({
  children,
}: {
  children: ReactNode;
}) {
  return <table className="description-table">{children}</table>;
}
