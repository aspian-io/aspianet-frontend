// icon:api | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function IconApi(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M4 13h5M12 16V8h3a2 2 0 012 2v1a2 2 0 01-2 2h-3M20 8v8M9 16v-5.5a2.5 2.5 0 00-5 0V16" />
    </svg>
  );
}

export default IconApi;
