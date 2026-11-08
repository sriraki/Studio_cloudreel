// Empty-state illustrations, drawn in SVG so they scale cleanly and pick up Tailwind colours.
// Only one is mounted at a time, so a single shared filter id is safe.

function Frame({ label, children }) {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label={label} className="w-full max-w-[360px] font-sans">
      <defs>
        <filter id="ill-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1f0d38" floodOpacity="0.08" />
        </filter>
      </defs>
      {children}
    </svg>
  )
}

const Card = (p) => <rect rx="12" className="fill-white" filter="url(#ill-shadow)" {...p} />

// Dashed connector that slowly "flows" (see --animate-dash in index.css)
const Dash = ({ d, color }) => (
  <path d={d} fill="none" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" className={`${color} motion-safe:animate-dash`} />
)

const Play = ({ cx, cy, r = 15, ring, fill }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} strokeWidth="2" className={`fill-white ${ring}`} filter="url(#ill-shadow)" />
    <path d={`M${cx - 4} ${cy - 6} L${cx + 6} ${cy} L${cx - 4} ${cy + 6} Z`} className={fill} />
  </g>
)

export function ScheduleArt() {
  const cols = [0, 1, 2, 3, 4, 5, 6]
  return (
    <Frame label="A calendar with a scheduled session ready to start">
      <circle cx="330" cy="40" r="22" className="fill-brand-50" />
      <circle cx="22" cy="198" r="16" className="fill-brand-50" />

      {/* Calendar */}
      <Card x="24" y="36" width="168" height="148" />
      <path d="M24 66 V48 a12 12 0 0 1 12 -12 H180 a12 12 0 0 1 12 12 V66 Z" className="fill-brand-600" />
      <text x="38" y="56" fontSize="11" fontWeight="600" className="fill-white">November</text>
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, c) => (
        <text key={c} x={44 + c * 21} y="84" fontSize="8" textAnchor="middle" className="fill-gray-400">{d}</text>
      ))}
      {[92, 112, 132, 152].map((y, r) =>
        cols.map((c) => {
          const picked = r === 1 && c === 1
          return <rect key={`${r}-${c}`} x={37 + c * 21} y={y} width="14" height="14" rx="4" className={picked ? 'fill-brand-600' : 'fill-gray-100'} />
        }),
      )}

      <Dash d="M72 119 C100 119 120 123 150 123" color="stroke-brand-300" />
      <Dash d="M240 150 C240 178 270 178 298 178" color="stroke-brand-300" />

      {/* Session card */}
      <Card x="150" y="96" width="150" height="54" />
      <rect x="160" y="107" width="4" height="32" rx="2" className="fill-brand-500" />
      <text x="172" y="120" fontSize="11" fontWeight="600" className="fill-gray-900">Team sync</text>
      <text x="172" y="136" fontSize="9" className="fill-gray-500">Tue · 10:00 AM</text>
      <circle cx="266" cy="123" r="8" strokeWidth="2" className="fill-brand-300 stroke-white" />
      <circle cx="280" cy="123" r="8" strokeWidth="2" className="fill-blue-300 stroke-white" />

      {/* "in 2 days" chip */}
      <Card x="196" y="50" width="92" height="26" rx="13" />
      <circle cx="212" cy="63" r="6" fill="none" strokeWidth="1.5" className="stroke-brand-500" />
      <path d="M212 60 V63 L214 65" fill="none" strokeWidth="1.5" strokeLinecap="round" className="stroke-brand-500" />
      <text x="224" y="67" fontSize="10" fontWeight="500" className="fill-gray-700">in 2 days</text>

      <Play cx={318} cy={178} r={20} ring="stroke-brand-300" fill="fill-brand-600" />
    </Frame>
  )
}

export function WebinarArt() {
  const audience = [
    [110, 'fill-blue-200'], [145, 'fill-violet-200'], [180, 'fill-emerald-200'], [215, 'fill-amber-200'], [250, 'fill-blue-300'],
  ]
  return (
    <Frame label="A presenter sharing slides with an audience">
      <circle cx="40" cy="170" r="20" className="fill-blue-50" />
      <circle cx="330" cy="150" r="18" className="fill-blue-50" />

      {audience.map(([cx]) => <Dash key={cx} d={`M${cx} 152 V181`} color="stroke-blue-200" />)}

      {/* Screen with slide */}
      <Card x="70" y="24" width="220" height="128" />
      <rect x="82" y="36" width="196" height="104" rx="8" className="fill-blue-50" />
      <rect x="94" y="48" width="70" height="6" rx="3" className="fill-blue-200" />
      <rect x="94" y="58" width="44" height="4" rx="2" className="fill-blue-100" />
      {[[100, 30], [116, 46], [132, 38], [148, 58]].map(([x, h], i) => (
        <rect key={x} x={x} y={128 - h} width="10" height={h} rx="3" className={i === 3 ? 'fill-blue-500' : 'fill-blue-300'} />
      ))}

      {/* Presenter tile */}
      <rect x="210" y="86" width="58" height="44" rx="8" strokeWidth="2" className="fill-blue-100 stroke-white" />
      <circle cx="239" cy="102" r="8" className="fill-blue-400" />
      <path d="M225 129 a14 12 0 0 1 28 0 Z" className="fill-blue-400" />

      {/* Audience */}
      {audience.map(([cx, fill]) => (
        <circle key={cx} cx={cx} cy="192" r="11" strokeWidth="2" className={`${fill} stroke-white`} />
      ))}

      {/* Chips */}
      <Card x="18" y="60" width="76" height="26" rx="13" />
      <path d="M30 67 h10 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-6 l-3 3 v-3 h-1 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 Z" className="fill-blue-500" />
      <text x="48" y="77" fontSize="10" fontWeight="500" className="fill-gray-700">Q&amp;A · 12</text>

      <Card x="244" y="40" width="108" height="26" rx="13" />
      <circle cx="258" cy="53" r="5" strokeWidth="1.5" className="fill-blue-300 stroke-white" />
      <circle cx="266" cy="53" r="5" strokeWidth="1.5" className="fill-violet-300 stroke-white" />
      <text x="276" y="57" fontSize="9.5" fontWeight="500" className="fill-gray-700">120 attendees</text>
    </Frame>
  )
}

export function LiveArt() {
  const outs = [
    [64, 'stroke-blue-300', 'fill-blue-500'],
    [100, 'stroke-violet-300', 'fill-violet-500'],
    [136, 'stroke-emerald-300', 'fill-emerald-500'],
  ]
  return (
    <Frame label="A live show streaming from cameras to several platforms">
      <circle cx="40" cy="192" r="18" className="fill-red-50" />
      <circle cx="330" cy="192" r="16" className="fill-red-50" />

      <Dash d="M66 84 H100" color="stroke-red-200" />
      <Dash d="M66 136 H100" color="stroke-red-200" />
      {outs.map(([y]) => <Dash key={y} d={`M260 ${y} H299`} color="stroke-red-200" />)}

      {/* Sources: camera and screen */}
      <Card x="30" y="66" width="36" height="36" rx="10" />
      <rect x="38" y="78" width="15" height="12" rx="3" className="fill-blue-500" />
      <path d="M53 84 L59 80 V88 Z" className="fill-blue-500" />
      <Card x="30" y="118" width="36" height="36" rx="10" />
      <rect x="39" y="129" width="18" height="13" rx="2" fill="none" strokeWidth="2" className="stroke-violet-500" />

      {/* Stage */}
      <Card x="100" y="44" width="160" height="112" />
      <rect x="108" y="52" width="92" height="96" rx="8" className="fill-red-50" />
      <circle cx="154" cy="88" r="13" className="fill-red-300" />
      <path d="M134 128 a20 18 0 0 1 40 0 Z" className="fill-red-300" />
      <rect x="116" y="134" width="76" height="6" rx="3" className="fill-red-500" />
      <rect x="204" y="52" width="48" height="46" rx="8" className="fill-blue-100" />
      <circle cx="228" cy="75" r="8" className="fill-blue-400" />
      <rect x="204" y="102" width="48" height="46" rx="8" className="fill-emerald-100" />
      <circle cx="228" cy="125" r="8" className="fill-emerald-400" />

      {/* LIVE + timer chips */}
      <rect x="88" y="30" width="58" height="22" rx="11" strokeWidth="1.5" className="fill-red-50 stroke-red-300" />
      <circle cx="100" cy="41" r="3.5" className="fill-red-500 motion-safe:animate-soon" />
      <text x="108" y="45" fontSize="9.5" fontWeight="700" letterSpacing="1.5" className="fill-red-600">LIVE</text>
      <Card x="214" y="30" width="58" height="22" rx="11" />
      <circle cx="226" cy="41" r="3" className="fill-red-500" />
      <text x="234" y="45" fontSize="10" fontWeight="700" className="fill-gray-800 font-mono">04:23</text>

      {/* Destinations */}
      {outs.map(([y, ring, fill]) => <Play key={y} cx={314} cy={y} ring={ring} fill={fill} />)}

      {/* On stage chip */}
      <Card x="132" y="172" width="98" height="26" rx="13" />
      <circle cx="146" cy="185" r="6" strokeWidth="1.5" className="fill-blue-400 stroke-white" />
      <circle cx="154" cy="185" r="6" strokeWidth="1.5" className="fill-emerald-400 stroke-white" />
      <circle cx="162" cy="185" r="6" strokeWidth="1.5" className="fill-red-300 stroke-white" />
      <text x="174" y="189" fontSize="9.5" fontWeight="500" className="fill-gray-700">3 on stage</text>
    </Frame>
  )
}
