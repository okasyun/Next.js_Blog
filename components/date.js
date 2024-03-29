import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  //   format(dateインスタンス→'LLLL d, yyyy')
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
