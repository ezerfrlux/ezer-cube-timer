interface Props {
  solves?: number[];
}

const TimesPanel = ({ solves = [] }: Props) => {
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <aside className="flex flex-col h-screen border-r border-white/10">
      <h2 className="p-4 mb-4 text-xs tracking-widest uppercase text-text-dim">
        Times
      </h2>
      <div className="flex-1 p-4 overflow-y-auto scrollbar-none">
        {solves.length === 0 && (
          <p className="text-xs text-text-dim">No solves yet</p>
        )}
        <ul className="space-y-2 font-mono text-sm">
          {solves.map((time, i) => (
            <li
              key={i}
              className="flex justify-between px-3 py-2 rounded bg-white/5 hover:bg-white/10"
            >
              <span className="text-text-dim">#{solves.length - i}</span>
              <span className="text-primary">{formatTime(time)}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TimesPanel;
