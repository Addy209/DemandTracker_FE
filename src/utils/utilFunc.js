import DOMPurify from "dompurify";

export const getTextFromHTML = (htmlString) => {
  const cleanHTML = cleanHTMLString(htmlString);
  const div = document.createElement("div");
  div.innerHTML = cleanHTML;
  const text = div.textContent || div.innerText || "";
  return text;
};

export const cleanHTMLString = (htmlString) => {
  return DOMPurify.sanitize(htmlString);
};
