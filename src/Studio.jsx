import { useState } from 'react'
import { CalendarPlus, Plus } from 'lucide-react'
import { LiveArt, ScheduleArt, WebinarArt } from './Illustrations.jsx'

const tabs = [
  {
    id: 'schedule',
    label: 'Schedule',
    art: ScheduleArt,
    title: 'Schedule your first session',
    body: 'Pick a date and time on the calendar. When it’s time, start your session right here in the Studio.',
    cta: 'Schedule a session',
  },
  {
    id: 'webinar',
    label: 'Webinar',
    art: WebinarArt,
    title: 'Host your first webinar',
    body: 'Invite attendees, share your screen and take questions live. Your upcoming webinars will show up here.',
    cta: 'Schedule a webinar',
  },
  {
    id: 'live',
    label: 'Live',
    live: true,
    art: LiveArt,
    title: 'Go live for the first time',
    body: 'Stream to your audience on multiple platforms at once. Anything that’s live right now will appear here.',
    cta: 'Schedule a live stream',
  },
]

function EmptyState({ art: Art, title, body, cta }) {
  return (
    <div className="mx-auto flex max-w-[460px] flex-col items-center pt-6 text-center lg:pt-10">
      <Art />
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">{body}</p>
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
