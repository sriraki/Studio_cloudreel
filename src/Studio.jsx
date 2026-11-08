import { useState } from 'react'
import { CalendarPlus, Plus, Presentation, Radio } from 'lucide-react'

// Icon colour per session type; the buttons stay brand purple everywhere.
// Full class strings so Tailwind can find them.
const tones = {
  purple: { soft: 'bg-brand-50', mid: 'bg-brand-100', icon: 'text-brand-600' },
  blue: { soft: 'bg-blue-50', mid: 'bg-blue-100', icon: 'text-blue-600' },
  red: { soft: 'bg-red-50', mid: 'bg-red-100', icon: 'text-red-600' },
}

const tabs = [
  {
    id: 'schedule',
    label: 'Schedule',
    tone: tones.purple,
    icon: CalendarPlus,
    title: 'Schedule your first session',
    body: 'Pick a date and time on the calendar. When it’s time, start your session right here in the Studio.',
    cta: 'Schedule a session',
  },
  {
    id: 'webinar',
    label: 'Webinar',
    tone: tones.blue,
    icon: Presentation,
    title: 'Host your first webinar',
    body: 'Invite attendees, share your screen and take questions live. Your upcoming webinars will show up here.',
    cta: 'Schedule a webinar',
  },
  {
    id: 'live',
    label: 'Live',
    live: true,
    tone: tones.red,
    icon: Radio,
    title: 'Go live for the first time',
    body: 'Stream to your audience on multiple platforms at once. Anything that’s live right now will appear here.',
    cta: 'Schedule a live stream',
  },
]

function EmptyState({ icon: Icon, tone, title, body, cta }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center pt-16 text-center lg:pt-24">
      <div className="relative grid size-20 place-items-center">
        <span className={`absolute inset-0 rounded-full ${tone.mid} motion-safe:animate-ripple`} />
        <span className={`absolute inset-0 rounded-full ${tone.mid} motion-safe:animate-ripple`} style={{ animationDelay: '1.5s' }} />
        <div className={`relative grid size-20 place-items-center rounded-full ${tone.soft}`}>
          <div className={`grid size-14 place-items-center rounded-full ${tone.mid}`}>
            <Icon className={`size-7 ${tone.icon}`} strokeWidth={1.75} />
          </div>
        </div>
      </div>
      <h2 className="mt-6 text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
      <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
        <CalendarPlus className="size-4" /> {cta}
      </button>
    </div>
  )
}

export default function Studio() {
  const [active, setActive] = useState('schedule')
  const tab = tabs.find((t) => t.id === active)

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white lg:h-full lg:rounded-2xl lg:border lg:border-gray-200">
      <header className="border-b border-gray-200 px-4 pt-5 sm:px-6 lg:px-7 lg:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 lg:text-[28px]">Studio</h1>
            <p className="mt-1 text-sm text-gray-500 lg:text-[15px]">Today's scheduled and live sessions, in one place.</p>
          </div>
          <div className="flex shrink-0 items-start">
            <div className="flex flex-col items-center">
              <button
                disabled
                aria-describedby="record-soon"
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl bg-brand-300 px-4 py-2 text-sm font-medium text-white lg:gap-2 lg:px-5 lg:py-2.5 lg:text-[15px]"
              >
                <Plus className="size-[18px]" /> Record
              </button>
              <span id="record-soon" className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-red-500">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-red-400 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
                </span>
                <span className="motion-safe:animate-soon">Coming soon</span>
              </span>
            </div>
          </div>
        </div>

        <nav role="tablist" className="mt-4 flex gap-6 overflow-x-auto lg:mt-3 lg:gap-7">
          {tabs.map((t) => {
            const selected = t.id === active
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-1.5 border-b-2 pb-3 text-[15px] font-medium transition-colors ${
                  selected ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {t.live && <span className="size-1.5 rounded-full bg-red-500" />}
                {t.label}
              </button>
            )
          })}
        </nav>
      </header>

      <section role="tabpanel" className="flex-1 overflow-y-auto px-4 pb-24 sm:px-6 lg:px-7">
        <EmptyState key={tab.id} {...tab} />
      </section>

      <button
        aria-label="Open assistant"
        className="absolute right-4 bottom-4 flex size-12 items-center lg:right-5 lg:bottom-5 lg:size-14 justify-center gap-1.5 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-600/30"
      >
        <span className="h-3.5 w-1.5 rounded-full bg-white" />
        <span className="h-3.5 w-1.5 rounded-full bg-white" />
      </button>
    </main>
  )
}
