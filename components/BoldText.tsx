export default function BoldText({ text }: { text: string }) {
  const parts: { t: string; bold: boolean }[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    const start = m.index;
    const end = regex.lastIndex;
    if (start > lastIndex) parts.push({ t: text.slice(lastIndex, start), bold: false });
    parts.push({ t: m[1], bold: true });
    lastIndex = end;
  }
  if (lastIndex < text.length) parts.push({ t: text.slice(lastIndex), bold: false });
  if (parts.length === 0) return <>{text}</>;

  return (
    <>
      {parts.map((p, i) =>
        p.bold ? (
          <span key={i} className="text-foreground font-bold">
            {p.t}
          </span>
        ) : (
          <span key={i} className="text-muted font-normal">
            {p.t}
          </span>
        ),
      )}
    </>
  );
}
