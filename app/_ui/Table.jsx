function Table({ children }) {
  return (
    <div className="bg-secondary-0   overflow-hidden rounded-lg border border-gray-200">
      <table>{children}</table>
    </div>
  );
}

function TableHeader({ children,className }) {
  return (
    <thead className={className}>
      <tr className="title-row">{children}</tr>
    </thead>
  );
}

function TableBody({ children ,className}) {
  return (
    <tbody className={className}>{children}</tbody>
  );
}

function TableRow({ children }) {
  return <tr>{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;

export default Table;
