import { format } from "date-fns";

export function formatString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .trim()
    .split(" ")
    .join("");
}

export function formatDate(date) {
  return format(date, "MM/dd/yyyy");
}
