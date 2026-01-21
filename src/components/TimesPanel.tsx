const times = ["12.34", "14.02", "11.98", "13.21", "15.10"];

const TimesPanel = () => {
  return (
    <aside className="border-r border-white/10 p-4 overflow-y-auto">
      <h2 className="text-xs uppercase tracking-widest text-text-dim mb-4">
        Times
      </h2>

      <ul className="space-y-2 font-mono text-sm">
        {times.map((time, i) => (
          <li
            key={i}
            className="flex justify-between px-3 py-2 rounded bg-white/5 hover:bg-white/10"
          >
            <span className="text-text-dim">#{i + 1}</span>
            <span className="text-primary">{time}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TimesPanel;
