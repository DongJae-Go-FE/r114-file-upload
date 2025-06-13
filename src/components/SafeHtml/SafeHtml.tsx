"use client";

import createDOMPurify from "dompurify";
import { useEffect, useState } from "react";

type SafeHtmlProps = {
  html: string;
  className?: string;
};

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  const [cleanHtml, setCleanHtml] = useState("");

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    setCleanHtml(
      DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
      })
    );
  }, [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
