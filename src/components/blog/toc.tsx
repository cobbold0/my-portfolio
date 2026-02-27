export function TableOfContents({ items }: { items: { text: string; id: string }[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-lg border p-4">
      <p className="mb-2 text-sm font-semibold">Table of contents</p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="hover:text-foreground">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
