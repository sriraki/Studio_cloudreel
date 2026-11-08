import {
  Bell, CalendarDays, ChevronDown, ChevronLeft, Clapperboard, Crown, FolderOpen,
  ImagePlus, LayoutGrid, LayoutTemplate, Palette, Presentation, Radio, Scissors, Send, Settings,
} from 'lucide-react'

const sections = [
  { items: [{ label: 'Home', icon: LayoutGrid }] },
  {
    title: 'Cloud Producer',
    items: [
      { label: 'Studio', icon: Clapperboard, active: true },
      { label: 'Encoders', icon: Radio },
      { label: 'Custom Layouts', icon: LayoutTemplate, premium: true },
      { label: 'Graphics', icon: Presentation, premium: true, badge: 'BETA' },
    ],
  },
  {
    title: 'Edit',
    items: [
      { label: 'Projects', icon: FolderOpen },
      { label: 'Editor', icon: Scissors },
      { label: 'Brand Kits', icon: Palette },
      { label: 'Playground', icon: ImagePlus },
    ],
  },
  {
    title: 'Publish',
    items: [
      { label: 'Post', icon: Send },
      { label: 'Plan', icon: CalendarDays },
    ],
  },
  { divider: true, items: [{ label: 'Simulcast', icon: Radio, premium: true }] },
  { title: 'Insights', items: [] },
]

function NavItem({ label, icon: Icon, active, premium, badge }) {
  return (
    <a
      href="#"
      aria-current={active ? 'page' : undefined}
      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors ${
        active ? 'bg-white font-medium text-gray-900 shadow-sm' : 'text-white/75 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
      <span>{label}</span>
      {premium && <Crown className="size-3.5 fill-amber-400 text-amber-400" aria-label="Premium" />}
      {badge && <span className="ml-auto text-[11px] font-semibold tracking-wider text-brand-300">{badge}</span>}
      {active && <span className="ml-auto size-1.5 rounded-full bg-gray-400" />}
    </a>
  )
}

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-[288px] max-w-[85vw] shrink-0 flex-col overflow-hidden rounded-r-2xl transition-[translate,visibility] duration-300 lg:visible lg:static lg:h-full lg:max-w-none lg:translate-x-0 lg:rounded-2xl ${
        open ? 'translate-x-0' : 'invisible -translate-x-full'
      } bg-gradient-to-b from-[#1f0d38] via-[#170a29] to-[#12081f] text-white shadow-xl`}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="CloudReel" className="h-6" />
        <div className="flex items-center gap-3 text-white/60">
          <button className="relative hover:text-white" aria-label="Notifications">
            <Bell className="size-[18px]" />
            <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-red-500" />
          </button>
          <button onClick={onClose} className="hover:text-white" aria-label="Close menu">
            <ChevronLeft className="size-4" />
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 px-3 pt-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-[15px] font-medium hover:bg-white/5">
          <span className="grid size-7 place-items-center rounded-full bg-brand-600 text-xs font-semibold">N</span>
          Nikhil's workspace
          <ChevronDown className="ml-auto size-4 text-white/60" />
        </button>

        {/* First-time user: nothing completed yet */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-brand-500/40 bg-brand-600/20 px-3.5 py-3">
          <span className="size-9 shrink-0 rounded-full border-[3px] border-white/20" />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold">Getting started</p>
            <p className="truncate text-[13px] text-white/60">0/4 completed, let's set up your workspace</p>
          </div>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {sections.map((s, i) => (
          <div key={i} className={s.divider ? 'mt-3 border-t border-white/10 pt-3' : ''}>
            {s.title && (
              <p className="px-3.5 pt-4 pb-2 text-[12px] font-medium tracking-[0.14em] text-white/40 uppercase">{s.title}</p>
            )}
            <div className="space-y-0.5">
              {s.items.map((item) => <NavItem key={item.label} {...item} />)}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 pt-3 pb-4">
        <a href="#" className="flex items-center gap-3 rounded-xl px-2 py-2 text-[15px] text-white/75 hover:text-white">
          <Settings className="size-[18px]" strokeWidth={1.75} /> Settings
        </a>
        <div className="mt-2 flex justify-between px-0.5 text-xs text-white/50">
          <span>Lite</span>
          <span>1,497 available</span>
        </div>
        <button className="mt-2 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100">
          Change plan
        </button>
      </div>
    </aside>
  )
}
