export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const COMPLETED_VALUE = "6";
export const UAT_START_VALUE = "3";
export const MAX_CAHRACTERS_IN_DEMAND_CREATE = 500;

export const accentColor = [
  "#38bdf8",
  "#34d399",
  "#a78bfa",
  "#f59e0b",
  "#f87171",
  "#94a3b8",
  "#bc3030",
];

const DOCUMENT = "document";
const DOCUMENTS = "documents";
const DETAIL = "detail";

export const StatusFileMapper = {
  2: [
    { name: "EIS Solution Document", type: DOCUMENT },
    { name: "EIS Solution Document Sign-off Mail", type: DOCUMENT },
  ],
  3: [{ name: "ISD IPA Document", type: DOCUMENT }],
  4: [
    { name: "UAT URL", type: DETAIL },
    { name: "Request and Response", type: DOCUMENTS },
  ],
  5: [
    { name: "UAT Sign-off Mail", type: DOCUMENT },
    { name: "Sign-off RRN", type: DETAIL },
  ],
  6: [
    { name: "ISD Sign-off", type: DOCUMENT },
    { name: "API Security CheckList", type: DOCUMENTS },
    { name: "Production URL", type: DETAIL },
  ],
};
