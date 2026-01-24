interface Props {
  solves?: number[];
  onDelete: (index: number) => void;
}

const TimesPanel = ({ solves = [], onDelete }: Props) => {
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
    }
    return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const average = solves.length > 0 
    ? solves.reduce((a, b) => a + b, 0) / solves.length 
    : 0;

  return (
    <aside className="flex flex-col h-screen border-r shadow-2xl bg-black/40 backdrop-blur-xl border-white/5">
      <div className="p-6 border-b border-white/5 bg-white/[0.02]">
        <h2 className="mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/50">
          Session Stats
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground/40 uppercase">Solves</span>
            <span className="font-mono text-xl font-medium text-white/90">{solves.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground/40 uppercase">Mean</span>
            <span className="font-mono text-xl font-medium text-primary">
              {solves.length > 0 ? formatTime(average) : "--"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4">
          <h2 className="px-2 mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/50">
            History
          </h2>
          
          {solves.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 opacity-20">
              <p className="text-xs italic tracking-widest text-white">No data available</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {solves.map((time, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between px-3 py-3 transition-all duration-200 border border-transparent rounded-lg group hover:bg-white/5 hover:border-white/5"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-white/20">
                      {String(solves.length - i).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-sm font-medium tracking-tight transition-colors text-white/80 group-hover:text-primary">
                      {formatTime(time)}
                    </span>
                  </div>

                  <button
                    onClick={() => onDelete(i)}
                    className="p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground/40"
                    title="Delete record"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="p-4 bg-white/[0.01] border-t border-white/5">
        <div className="text-[10px] text-center text-muted-foreground/30 font-mono italic">
          v1.0.0-beta linux_x64
        </div>
      </div>
    </aside>
  );
};

export default TimesPanel;