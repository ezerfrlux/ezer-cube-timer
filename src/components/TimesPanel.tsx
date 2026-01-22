interface Props {
  solves?: number[];
  onDelete: (index: number) => void;
}

const TimesPanel = ({ solves = [], onDelete }: Props) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${seconds
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
              className="flex items-center justify-between px-3 py-2 rounded bg-white/5 hover:bg-white/10 group"
            >
              <div className="flex gap-3">
                <span className="text-text-dim">#{solves.length - i}</span>
                <span className="text-primary">{formatTime(time)}</span>
              </div>

              {/* Botón de eliminar - se muestra al hacer hover gracias a 'group-hover' */}
              <button
                onClick={() => {
                  console.log("eliminando tiempo", i);
                  
                  onDelete(i);
                }}
                className="transition-colors opacity-0 group-hover:opacity-100 hover:text-red-500 text-text-dim"
                title="Eliminar tiempo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TimesPanel;
