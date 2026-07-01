'use client'
import { resetConsent } from '@/components/cookie/CookieConsent'

export function CookieSettingsButton() {
  return <button onClick={resetConsent}>Cookie Settings</button>
}
