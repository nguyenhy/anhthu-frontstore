'use client'
import './CookieConsent.css'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const STORE_KEY = 'cookie_consent'
const VERSION = '1'

interface Consent {
  version: string
  necessary: boolean
  analytics: boolean
  marketing: boolean
  ts: number
}

function loadConsent(): Consent | null {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || 'null')
  } catch {
    return null
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const data: Consent = { version: VERSION, necessary: true, analytics, marketing, ts: Date.now() }
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error(error);

  }
  return data
}

export function resetConsent() {
  try {
    localStorage.removeItem(STORE_KEY)
    window.dispatchEvent(new CustomEvent('cookie-consent:reset'))
  } catch (error) {
    console.error(error)
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const customizeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const stored = loadConsent()
    const isLegalPage = location.pathname.includes('/privacy') || location.pathname.includes('/terms')
    if ((!stored || stored.version !== VERSION) && !isLegalPage) setVisible(true)

    function onReset() { setVisible(true); setPanelOpen(false) }
    window.addEventListener('cookie-consent:reset', onReset)
    return () => window.removeEventListener('cookie-consent:reset', onReset)
  }, [])

  // focus trap inside panel
  useEffect(() => {
    if (!panelOpen) return
    const panel = panelRef.current
    if (!panel) return
    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled])')
    )
    focusable[0]?.focus()
    function onKey(e: KeyboardEvent) {
      const first = focusable[0], last = focusable[focusable.length - 1]
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
      if (e.key === 'Escape') { setPanelOpen(false); customizeRef.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [panelOpen])

  function accept(a: boolean, m: boolean) {
    saveConsent(a, m)
    setVisible(false)
    setPanelOpen(false)
  }

  if (!visible) return null

  return (
    <div id="cookie-banner" role="region" aria-label="Cookie consent">
      <div className="cb-row">
        <p className="cb-text">
          We use cookies for analytics and advertising.{' '}
          <Link href="/privacy">Learn more</Link>.
        </p>
        <div className="cb-actions">
          <button className="cb-btn-accept" onClick={() => accept(true, true)}>Accept All</button>
          <button
            className="cb-btn-customize"
            ref={customizeRef}
            aria-expanded={panelOpen}
            aria-controls="cb-panel"
            onClick={() => setPanelOpen(p => !p)}
          >
            Customize
          </button>
          <button className="cb-btn-decline" onClick={() => accept(false, false)}>Decline All</button>
        </div>
      </div>

      <div
        id="cb-panel"
        className={`cb-panel${panelOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Cookie preferences"
        aria-hidden={!panelOpen}
        ref={panelRef}
      >
        <div className="cb-panel-inner">
          <div className="cb-category">
            <div className="cb-cat-info">
              <span className="cb-cat-name">Necessary</span>
              <span className="cb-cat-desc">Required for the site to work</span>
            </div>
            <label className="cb-toggle">
              <input type="checkbox" defaultChecked disabled aria-label="Necessary cookies — always on" />
              <span className="cb-toggle-track" />
              <span className="cb-toggle-thumb" />
            </label>
          </div>
          <div className="cb-category">
            <div className="cb-cat-info">
              <span className="cb-cat-name">Analytics</span>
              <span className="cb-cat-desc">Measure site usage</span>
            </div>
            <label className="cb-toggle">
              <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} aria-label="Analytics cookies" />
              <span className="cb-toggle-track" />
              <span className="cb-toggle-thumb" />
            </label>
          </div>
          <div className="cb-category">
            <div className="cb-cat-info">
              <span className="cb-cat-name">Marketing</span>
              <span className="cb-cat-desc">Relevant ads</span>
            </div>
            <label className="cb-toggle">
              <input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} aria-label="Marketing cookies" />
              <span className="cb-toggle-track" />
              <span className="cb-toggle-thumb" />
            </label>
          </div>
          <div className="cb-panel-footer">
            <button className="cb-btn-save" onClick={() => accept(analytics, marketing)}>Save preferences</button>
          </div>
        </div>
      </div>
    </div>
  )
}
