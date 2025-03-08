export default function List({ items, renderItem }) {
  return (
    <ul className="p-4 border rounded-lg">
      {items.map((item, index) => (
        <li key={index} className="py-2 border-b last:border-0">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
