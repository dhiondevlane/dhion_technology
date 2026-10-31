import { useEffect, useRef, useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle'
import CTASection from '../../components/CTASection'
import '../../styles/school-management.css'

const ICONS = {
  cap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
  userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  teacher: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4"/>',
  school: '<path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17M6 5v17"/><path d="m4 6 8-4 8 4"/><circle cx="12" cy="9" r="2"/>',
  calCheck: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  cal: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  calOff: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M10 16h4"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8M16 13H8M16 17H8"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  clip: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  card: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
  mega: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  bellRing: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M4 2C2.8 3.7 2 5.7 2 8M22 8c0-2.3-.8-4.3-2-6"/>',
  pin: '<path d="M12 17v5"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  checkC: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  approve: '<path d="M21.8 10A10 10 0 1 1 17 3.34"/><path d="m9 11 3 3L22 4"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
  db: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
  bar: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  report: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 18v-2M12 18v-4M16 18v-6"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  calc: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/>',
  phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="m12 2 8 5H4z"/>',
  video: '<path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5M15 12H3"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  brief: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>',
  sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8M7 12h10M7 16h6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4"/>',
  keyboard: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
  alarm: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3 2 6M22 6l-3-3"/>',
  bus: '<path d="M8 6v6M15 6v6M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  finger: '<path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2"/>',
  play: '<path d="M6 3l14 9-14 9V3z"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  replay: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  family: '<circle cx="7" cy="5" r="2.5"/><circle cx="17" cy="5" r="2.5"/><circle cx="12" cy="13" r="2"/><path d="M3 21v-6a4 4 0 0 1 4-4h0a4 4 0 0 1 3 1.4M21 21v-6a4 4 0 0 0-4-4h0a4 4 0 0 0-3 1.4M9 21v-2a3 3 0 0 1 6 0v2"/>',
  backpack: '<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M8 10h8M8 18h8M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
}

function SvgIcon({ name, className = '' }) {
  const innerHtml = ICONS[name] || ICONS.info
  return (
    <svg
      className={`sm-svg-icon ${className}`}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: innerHtml }}
      aria-hidden="true"
    />
  )
}

function CheckBadge() {
  return (
    <span className="sm-cmp-badge sm-cmp-yes" title="Included">
      <span className="sm-icon-wrap sm-only-mobile">
        <SvgIcon name="check" />
      </span>
      <span className="sm-cmp-text sm-only-desktop">Included</span>
    </span>
  )
}

function CrossBadge() {
  return (
    <span className="sm-cmp-badge sm-cmp-no" title="Not included">
      <span className="sm-icon-wrap sm-only-mobile">
        <SvgIcon name="x" />
      </span>
      <span className="sm-cmp-dash sm-only-desktop">—</span>
    </span>
  )
}

function PriceBadge({ full, mobile }) {
  return (
    <span className="sm-cmp-badge sm-cmp-prc">
      <span className="sm-cmp-prc-full">{full}</span>
      <span className="sm-cmp-prc-mobile">{mobile}</span>
    </span>
  )
}

const SLABS = {
  small: { rate: 110, label: 'Small school', range: 'Up to 500 students', desc: 'For schools with 1–500 students.', icon: 'user' },
  medium: { rate: 100, label: 'Growing school', range: '501–3,000 students', desc: 'For schools with 501–3,000 students.', icon: 'users' },
  large: { rate: 90, label: 'Large school', range: '3,001+ students', desc: 'For schools with more than 3,000 students.', icon: 'building' },
}

const PLANS = {
  basic: {
    key: 'basic',
    pill: 'Core essentials',
    pillIcon: 'layers',
    title: 'Basic Plan — Core School Management',
    desc: 'Core school management for everyday records and administration.',
    cost: 'Base fee only',
    costNote: 'No additional fixed plan fee',
    featuresShort: [
      'Student, exam and staff modules',
      'Attendance and timetables',
      'Manual fee records and reports',
    ],
    modules: [
      ['Student Management', ['Admissions, student profiles and documents', 'Class allocation and academic history'], 'student'],
      ['Staff Management', ['Teacher and staff profiles, roles and contact details', 'Staff leave records'], 'staff'],
      ['Attendance Management', ['Student, teacher and staff attendance', 'Daily records and attendance reports'], 'att'],
      ['Homework & Study Materials', ['Homework and assignments', 'Syllabus, books and study material sharing'], 'hw'],
      ['Exam & Result Management', ['Exam schedules and marks entry', 'Grading, report cards and academic performance history'], 'exam'],
      ['Timetable Management', ['Class and subject timetables', 'Exam timetables'], 'tt'],
      ['Fee Management', ['Fee structure and manual fee collection', 'Pending dues and fee receipts'], 'fee'],
      ['Notice Board & Calendar', ['School notices and circulars', 'Holidays, events and important dates'], 'nb'],
      ['Leave Management', ['Student, teacher and staff leave applications', 'Staff leave records'], 'lv'],
      ['Certificates & Documents', ['Report cards and Bonafide certificates', 'Leaving Certificate (LC) and Transfer Certificate (TC)'], 'doc'],
      ['Parent Communication', ['Basic school announcements', 'Basic notifications'], 'pc'],
      ['Reports', ['Exam reports for students and staff', 'Attendance reports for students and staff'], 'rep'],
    ],
  },
  advanced: {
    key: 'advanced',
    pill: 'Digital services',
    pillIcon: 'globe',
    title: 'Advanced Plan — Digital School Services',
    desc: 'Everything in Basic, plus digital services that connect the school, parents and teachers.',
    cost: 'Base + ₹20000/year',
    costNote: 'Android app ₹10000 + payments ₹10000',
    featuresShort: [
      'Everything in Basic',
      'Android app and online payments',
      'Virtual classes included',
    ],
    modules: [
      ['Everything in Basic', ['All Basic Plan modules and features are included'], null],
      ['Mobile Application', ['Dedicated Android app for school services', 'Annual add-on price: ₹10000'], 'ma'],
      ['Online Fee Payments', ['Online fee collection and transaction tracking', 'Digital receipts and payment status', 'Annual add-on price: ₹10000'], 'ofp'],
      ['Virtual Classes', ['Google Meet integration', 'Online class schedules and meeting links', 'Included in the plan'], 'vc'],
      ['Parent-Teacher Communication', ['Teacher chat and parent communication', 'Parent meetings and meeting scheduling'], 'ptc'],
      ['Automated Notifications', ['Fee reminders and attendance alerts', 'Homework updates and school announcements'], 'an'],
      ['Advanced Fee Reports', ['Online collection reports', 'Payment status and transaction reconciliation'], 'afr'],
      ['Digital Learning Management', ['Online assignments', 'Study materials and class updates'], 'dlm'],
      ['Staff Services', ['Staff announcements and meeting schedules', 'Salary slip access, if payroll is supported'], 'ss'],
    ],
  },
  super: {
    key: 'super',
    pill: 'AI-powered',
    pillIcon: 'sparkles',
    title: 'Super Advanced Plan — AI-Powered School Management',
    desc: 'Everything in Advanced, plus AI assistance, smart analysis and automation.',
    cost: 'Base + ₹50000/year',
    costNote: 'Includes Advanced + AI suite',
    featuresShort: [
      'Everything in Advanced',
      'AI assistant and voice operations',
      'Smart analytics and OCR',
    ],
    modules: [
      ['Everything in Advanced', ['All Basic and Advanced Plan features are included'], null],
      ['AI School Assistant', ['Ask questions about authorized school records using everyday language'], 'ai1'],
      ['AI Result Analysis', ['Identify top performers, weak subjects and academic trends'], 'ai2'],
      ['Student Performance Insights', ['Generate student progress summaries and study recommendations'], 'ai3'],
      ['AI Question Paper Assistant', ['Draft questions and assessments for teacher review'], 'ai4'],
      ['AI Communication Writer', ['Draft notices, circulars and parent messages'], 'ai5'],
      ['Voice-Based Operations', ['Search records and perform supported actions using voice'], 'ai6'],
      ['Smart Document Processing', ['Extract information from scanned forms using OCR'], 'ai7'],
      ['Smart Alerts & Reminders', ['Automated fee reminders, absence alerts and configurable notifications'], 'ai8'],
      ['AI Reports & Analytics', ['Summarize school performance, attendance and fee collection data'], 'ai9'],
    ],
  },
}

const ACTORS = {
  staff: ['Staff', '#2563eb'],
  stu: ['Student', '#059669'],
  par: ['Parent', '#d97706'],
  sys: ['System', '#475569'],
  both: ['Student & Staff', '#0e7490'],
  ai: ['AI', '#7c3aed'],
  ext: ['External Service', '#a16207'],
  ps: ['Student / Parent', '#0e7490'],
  psa: ['Student / Parent / Staff', '#0e7490'],
  tsp: ['Teacher / Student / Parent', '#0e7490'],
  ad: ['Admin', '#1e3a8a'],
  sa: ['Staff / Admin', '#1e3a8a'],
}

const AL = (e, r) => [['sys', 'alert', e], ['ai', 'bellRing', 'Smart Alert'], r]

const FLOWS = {
  student: { n: 'Student Management', i: 'cap', rel: 'Staff ↔ Student Records ↔ Parent', L: [[['staff', 'pen', 'Add Student Admission'], ['sys', 'folder', 'Student Profile Created'], ['stu', 'book', 'View Profile & Class'], ['par', 'family', 'Parent Stays Informed']]] },
  staff: { n: 'Staff Management', i: 'teacher', rel: 'School Admin ↔ Staff ↔ Students', L: [[['staff', 'userPlus', 'Add Staff Member'], ['sys', 'tag', 'Assign Class & Subjects'], ['staff', 'clip', 'Teacher Starts Work'], ['stu', 'backpack', 'Students Benefit']]] },
  att: { n: 'Attendance Management', i: 'userCheck', rel: 'Staff ↔ Attendance ↔ Student & Staff', L: [[['staff', 'checkC', 'Mark Attendance'], ['sys', 'db', 'Attendance Recorded'], ['both', 'eye', 'View Attendance']]] },
  hw: { n: 'Homework & Study Materials', i: 'book', rel: 'Staff ↔ Homework & Study Material ↔ Student', L: [[['staff', 'pen', 'Create Homework / Material'], ['sys', 'send', 'Assign to Student'], ['stu', 'inbox', 'Receives It'], ['stu', 'book', 'View / Study'], ['stu', 'checkC', 'Complete Homework']]] },
  exam: { n: 'Exam & Result Management', i: 'award', rel: 'Staff ↔ Exam & Result ↔ Student', L: [[['staff', 'pen', 'Create Exam'], ['stu', 'mail', 'Receives Exam'], ['stu', 'file', 'Attempts Exam'], ['staff', 'calc', 'Enter Result'], ['stu', 'award', 'View Result']]] },
  tt: { n: 'Timetable Management', i: 'cal', rel: 'Staff ↔ Timetable ↔ Student', L: [[['staff', 'cal', 'Create / Manage Timetable'], ['sys', 'mega', 'Publish Timetable'], ['stu', 'eye', 'View Timetable']]] },
  fee: { n: 'Fee Management', i: 'wallet', rel: 'Staff ↔ Fee Management ↔ Student', L: [[['staff', 'receipt', 'Create Fee Structure'], ['stu', 'eye', 'View Pending Fees'], ['stu', 'card', 'Pay Fees'], ['staff', 'calc', 'Record Fee Collection'], ['stu', 'checkC', 'View Fees Received']]] },
  nb: { n: 'Notice Board & Calendar', i: 'pin', rel: 'Staff ↔ Notice Board & Calendar ↔ Student', L: [[['staff', 'pen', 'Create Notice / Event'], ['sys', 'mega', 'Publish'], ['stu', 'cal', 'View Notice / Calendar']]] },
  lv: { n: 'Leave Management', i: 'calOff', rel: 'Student ↔ Leave Management ↔ Staff', L: [[['stu', 'mail', 'Apply for Leave'], ['staff', 'inbox', 'Receives Request'], ['staff', 'approve', 'Approve / Reject'], ['stu', 'bell', 'View Leave Status']]] },
  doc: { n: 'Certificates & Documents', i: 'file', rel: 'Staff ↔ Certificates & Documents ↔ Student', note: 'Report Card · Bonafide · Leaving Certificate · Transfer Certificate', L: [[['staff', 'file', 'Generate / Upload Document'], ['sys', 'folder', 'Linked to Student Record'], ['stu', 'download', 'View / Download']]] },
  pc: { n: 'Parent Communication', i: 'bell', rel: 'Staff ↔ Parent Communication ↔ Student / Parent', note: 'Announcements · Notifications · Parent Meeting Alerts', L: [[['staff', 'mega', 'Create Announcement / Meeting Notice'], ['sys', 'bell', 'Notification Published'], ['par', 'family', 'Parent Receives'], ['stu', 'backpack', 'Student Receives']]] },
  rep: { n: 'Reports', i: 'report', rel: 'Exam → Student & Staff · Attendance → Student & Staff', LT: ['Exam Reports', 'Attendance Reports'], L: [[['sys', 'bar', 'Exam Results'], ['sys', 'report', 'Exam Report Generated'], ['both', 'eye', 'View Exam Report']], [['sys', 'checkC', 'Attendance Records'], ['sys', 'report', 'Attendance Report Generated'], ['both', 'eye', 'View Attendance Report']]] },
  // Advanced Plan
  ma: { n: 'Mobile Application', i: 'phone', rel: 'School / Staff ↔ Mobile App ↔ Student / Parent / Staff', L: [[['sys', 'school', 'School Services'], ['sys', 'phone', 'Mobile App'], ['psa', 'login', 'Everyone Logs In'], ['psa', 'checkC', 'Access Respective Services']]] },
  ofp: { n: 'Online Fee Payments', i: 'card', rel: 'Staff ↔ Fee Management ↔ Student / Parent ↔ Payment Gateway', L: [[['staff', 'receipt', 'Create Fee Structure'], ['ps', 'eye', 'View Pending Fees'], ['ps', 'card', 'Make Online Payment'], ['ext', 'bank', 'Payment Gateway'], ['sys', 'checkC', 'Payment Confirmation'], ['sys', 'receipt', 'Digital Receipt'], ['psa', 'inbox', 'View Receipt']]] },
  vc: { n: 'Virtual Classes', i: 'video', rel: 'Staff ↔ Virtual Class ↔ Student ↔ Google Meet', L: [[['staff', 'cal', 'Schedule Online Class'], ['sys', 'link', 'Generate Meeting Link'], ['stu', 'mail', 'Receives Link'], ['stu', 'hand', 'Joins Class'], ['ext', 'video', 'Google Meet']]] },
  ptc: { n: 'Parent–Teacher Communication', i: 'msg', rel: 'Teacher / Staff ↔ Parent ↔ Student', L: [[['staff', 'msg', 'Start Chat / Schedule Meeting'], ['par', 'bell', 'Receives Notification'], ['par', 'video', 'Joins Meeting / Chats'], ['sys', 'book', 'Student-related Discussion']]] },
  an: {
    n: 'Automated Notifications',
    i: 'bellRing',
    rel: 'School / Staff → Notification System → Student / Parent',
    LT: ['Fee Reminder', 'Attendance Alert', 'Homework Update', 'School Announcement'],
    L: [
      [['sys', 'wallet', 'Fee Due'], ['sys', 'bell', 'Automated Notification'], ['ps', 'phone', 'Receives Reminder']],
      [['staff', 'checkC', 'Attendance Marked'], ['sys', 'bell', 'Automated Notification'], ['par', 'phone', 'Parent Alerted']],
      [['staff', 'pen', 'Homework Created'], ['sys', 'bell', 'Automated Notification'], ['ps', 'phone', 'Receives Update']],
      [['staff', 'mega', 'Announcement Created'], ['sys', 'bell', 'Automated Notification'], ['psa', 'phone', 'Receives Announcement']],
    ],
  },
  afr: { n: 'Advanced Fee Reports', i: 'report', rel: 'Staff / Admin ↔ Fee System ↔ Payment Gateway ↔ Reports', L: [[['ps', 'card', 'Online Payment'], ['sys', 'db', 'Transaction Recorded'], ['sys', 'refresh', 'Payment Status Updated'], ['sys', 'scale', 'Transaction Reconciliation'], ['sys', 'report', 'Advanced Fee Report'], ['sa', 'eye', 'Views Report']]] },
  dlm: { n: 'Digital Learning Management', i: 'teacher', rel: 'Teacher / Staff ↔ Learning Management ↔ Student', L: [[['staff', 'pen', 'Create Assignment / Material'], ['sys', 'send', 'Publish to Class'], ['stu', 'inbox', 'Receives It'], ['stu', 'book', 'Studies / Completes'], ['staff', 'clip', 'Reviews / Tracks']]] },
  ss: {
    n: 'Staff Services',
    i: 'brief',
    rel: 'School / Admin ↔ Staff Services ↔ Staff',
    LT: ['Announcements & Meetings', 'Payroll (if supported)'],
    L: [
      [['ad', 'mega', 'Staff Announcement / Meeting / Salary Slip'], ['staff', 'eye', 'View Information']],
      [['sys', 'brief', 'Payroll System'], ['sys', 'calc', 'Generate Salary'], ['sys', 'file', 'Salary Slip'], ['staff', 'download', 'View / Download']],
    ],
  },
  // Super Advanced Plan
  ai1: { n: 'AI School Assistant', i: 'bot', rel: 'Student / Parent / Staff → AI Assistant → Authorized School Data', note: 'e.g. Parent: “What are my child\'s pending fees?” → Fee Records → Answer', L: [[['psa', 'msg', 'Asks a Question'], ['ai', 'bot', 'AI Understands'], ['sys', 'shield', 'Checks Authorized Records'], ['sys', 'db', 'Finds Information'], ['ai', 'bulb', 'Gives Answer']]] },
  ai2: { n: 'AI Result Analysis', i: 'bar', rel: 'Exam & Result → AI → Staff / Student / Parent', L: [[['sys', 'bar', 'Exam Results'], ['ai', 'bot', 'AI Analyzes Marks'], ['ai', 'award', 'Top Performers · Weak Subjects · Trends'], ['staff', 'teacher', 'Staff Views Analysis']]] },
  ai3: { n: 'Student Performance Insights', i: 'target', rel: 'Student Data → AI → Teacher / Student / Parent', L: [[['sys', 'book', 'Academic Data · Exams · Attendance · Assignments'], ['ai', 'bot', 'AI Analyzes Performance'], ['ai', 'file', 'Progress Summary'], ['ai', 'target', 'Study Recommendations'], ['tsp', 'eye', 'Views Insights']]] },
  ai4: { n: 'AI Question Paper Assistant', i: 'pen', rel: 'Teacher / Staff → AI → Exam Module', note: 'AI generates the draft; teacher has final control.', L: [[['staff', 'sliders', 'Select Subject / Topic / Difficulty'], ['ai', 'bot', 'AI Generates Draft'], ['staff', 'pen', 'Teacher Reviews & Edits'], ['staff', 'approve', 'Approves'], ['sys', 'file', 'Exam Module']]] },
  ai5: { n: 'AI Communication Writer', i: 'sparkles', rel: 'Staff → AI → Notification System → Parent / Student', note: 'e.g. Topic: Parent Meeting → AI drafts → Staff approves → Parents notified', L: [[['staff', 'keyboard', 'Enter Message / Topic'], ['ai', 'sparkles', 'AI Creates Draft'], ['staff', 'approve', 'Reviews & Approves'], ['sys', 'bell', 'Notification / Announcement'], ['ps', 'phone', 'Receives Message']]] },
  ai6: { n: 'Voice-Based Operations', i: 'mic', rel: 'Staff / Teacher → Voice AI → School System → Data / Action', note: 'e.g. “Show today\'s absent students” → Attendance Records → Absent Students', L: [[['staff', 'mic', 'Speaks Command'], ['ai', 'bot', 'Voice AI Understands'], ['sys', 'shield', 'Checks Authorization'], ['sys', 'cog', 'Performs Action / Searches Data'], ['ai', 'volume', 'Voice / Text Response']]] },
  ai7: { n: 'Smart Document Processing', i: 'scan', rel: 'Staff → Document / OCR → AI Processing → Student Records', note: 'e.g. Scanned Admission Form → OCR → Staff Review → Student Profile', L: [[['staff', 'upload', 'Uploads Scanned Document'], ['ai', 'scan', 'OCR Extracts Information'], ['ai', 'bot', 'AI Understands Data'], ['staff', 'approve', 'Staff Reviews'], ['sys', 'folder', 'Saved to Student Record']]] },
  ai8: {
    n: 'Smart Alerts & Reminders',
    i: 'bellRing',
    rel: 'School Data → AI / Automation → Student / Parent / Staff',
    LT: ['Fee Due', 'Student Absent', 'Homework Pending', 'Meeting Upcoming'],
    L: [
      AL('Fee Due', ['par', 'phone', 'Parent']),
      AL('Student Absent', ['par', 'phone', 'Parent']),
      AL('Homework Pending', ['ps', 'phone', 'Student / Parent']),
      [['sys', 'cal', 'Meeting Upcoming'], ['ai', 'alarm', 'Reminder'], ['psa', 'phone', 'Parent / Staff']],
    ],
  },
  ai9: { n: 'AI Reports & Analytics', i: 'trend', rel: 'School Data → AI → Admin / Staff', L: [[['sys', 'bar', 'Attendance · Exams · Fees · Student Data'], ['ai', 'bot', 'AI Analysis'], ['ai', 'file', 'Generate Summary'], ['sys', 'chart', 'Reports & Analytics'], ['sa', 'eye', 'Admin / Staff']]] },
}

export default function SchoolManagement() {
  usePageTitle('School Management Software | Plans & Pricing')

  const [selectedSlab, setSelectedSlab] = useState('small')
  const [selectedPlan, setSelectedPlan] = useState('basic')
  const [activeFlowId, setActiveFlowId] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isCleared, setIsCleared] = useState(false)
  const timerRef = useRef(null)

  // Current active plan & flow
  const currentPlan = PLANS[selectedPlan]
  const activeFlow = activeFlowId ? FLOWS[activeFlowId] : null

  // Flattened steps for the active flow
  const allCards = activeFlow ? activeFlow.L.flat() : []
  const totalCards = allCards.length

  // Start animated flow
  useEffect(() => {
    if (!activeFlowId || isCleared) return

    clearInterval(timerRef.current)
    setStepIndex(0)
    setIsCompleted(false)

    const n = totalCards
    const gap = Math.max(500, 3600 / (n || 1))

    let current = 0
    timerRef.current = setInterval(() => {
      current++
      if (current >= n) {
        clearInterval(timerRef.current)
        setStepIndex(n)
        setIsCompleted(true)
      } else {
        setStepIndex(current)
      }
    }, gap)

    return () => clearInterval(timerRef.current)
  }, [activeFlowId, isCleared, totalCards])

  // Escape key listener for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeFlow()
      }
    }
    if (activeFlowId) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeFlowId])

  const openFlow = (flowId) => {
    setIsCleared(false)
    setActiveFlowId(flowId)
  }

  const closeFlow = () => {
    clearInterval(timerRef.current)
    setActiveFlowId(null)
    setIsCleared(false)
  }

  const handleClearFlow = () => {
    clearInterval(timerRef.current)
    setIsCleared(true)
  }

  const handleReplayFlow = () => {
    setIsCleared(false)
  }

  // Helper to calculate card index within overall flow
  const getCardGlobalIndex = (flow, laneIndex, itemIndex) => {
    let count = 0
    for (let l = 0; l < laneIndex; l++) {
      count += flow.L[l].length
    }
    return count + itemIndex
  }

  return (
    <div className="sm-wrap">
      {/* Hero Section */}
      <header className="sm-hero">
        <div className="sm-eyebrow">
          <SvgIcon name="school" />
          <span>All-in-One School Management</span>
        </div>
        <h1>Simple pricing.<br />Smarter school management.</h1>
        <p>
          Choose the student pricing slab first, select a plan, then explore exactly what is included.
          Built for school owners, principals, teachers, and parents.
        </p>
        <div className="sm-hero-actions">
          <button
            type="button"
            className="sm-hero-btn"
            onClick={() => window.dispatchEvent(new Event('open-contact-popup'))}
          >
            <span>Request School Demo</span>
            <SvgIcon name="arrow" />
          </button>
          <div className="sm-hero-subtag">
            <SvgIcon name="checkC" />
            <span>Trusted ERP for schools of all sizes</span>
          </div>
        </div>
      </header>

      {/* Step 1: Select student strength */}
      <section>
        <div className="sm-step">
          <span className="sm-num">1</span>
          <span>Select student strength</span>
        </div>
        <p className="sm-sub">Choose the school's total number of students to see the annual per-student fee.</p>
        
        <div className="sm-grid">
          {Object.entries(SLABS).map(([key, slab]) => {
            const isSelected = selectedSlab === key
            return (
              <div
                key={key}
                className={`sm-card sm-price-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedSlab(key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedSlab(key)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
              >
                <div className="sm-card-ic">
                  <SvgIcon name={slab.icon} />
                </div>
                <div className="sm-label">{slab.label}</div>
                <div className="sm-range">{slab.range}</div>
                <div className="sm-price">
                  ₹{slab.rate} <small>/ student / year</small>
                </div>
                <p>{slab.desc}</p>
                <span className="sm-pill">₹{slab.rate} per student</span>
                <div className="sm-choose">
                  <span>{isSelected ? 'Selected slab' : 'Select this slab'}</span>
                  <SvgIcon name="arrow" />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Step 2: Choose your plan */}
      <section>
        <div className="sm-step">
          <span className="sm-num">2</span>
          <span>Choose your plan</span>
        </div>
        <p className="sm-sub">Every higher plan includes the previous plan's features, plus additional capabilities.</p>
        
        <div className="sm-plan-grid">
          {Object.values(PLANS).map((plan) => {
            const isSelected = selectedPlan === plan.key
            return (
              <div
                key={plan.key}
                className={`sm-card sm-plan ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(plan.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedPlan(plan.key)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
              >
                <span className="sm-pill">
                  <SvgIcon name={plan.pillIcon} />
                  <span>{plan.pill}</span>
                </span>
                <h3>{plan.key === 'basic' ? 'Basic Plan' : plan.key === 'advanced' ? 'Advanced Plan' : 'Super Advanced'}</h3>
                <div className="sm-desc">{plan.desc}</div>
                <div className="sm-cost">{plan.cost}</div>
                <div className="sm-cost-note">{plan.costNote}</div>
                <div className="sm-features-short">
                  {plan.featuresShort.map((feat, idx) => (
                    <div key={idx}>{feat}</div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Detail Section: Selected Plan Deliverables */}
      <section className="sm-detail">
        <div className="sm-detail-head">
          <div>
            <div className="sm-eyebrow">
              {selectedPlan === 'basic'
                ? 'CORE SCHOOL MANAGEMENT'
                : selectedPlan === 'advanced'
                ? 'DIGITAL SCHOOL SERVICES'
                : 'AI-POWERED SCHOOL MANAGEMENT'}
            </div>
            <h2>{currentPlan.title}</h2>
            <p>{currentPlan.desc}</p>
          </div>
        </div>

        <div className="sm-module-grid">
          {currentPlan.modules.map(([title, items, flowId], index) => {
            const flow = flowId ? FLOWS[flowId] : null
            const isIncludedAll = !flowId
            return (
              <div key={index} className={`sm-module ${isIncludedAll ? 'all' : ''}`}>
                <div className="sm-mh">
                  <div className="sm-mi">
                    <SvgIcon name={flow ? flow.i : 'layers'} />
                  </div>
                  <h3>{title}</h3>
                </div>
                <ul>
                  {items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
                {flowId && (
                  <button
                    type="button"
                    className="sm-vf"
                    onClick={() => openFlow(flowId)}
                  >
                    <SvgIcon name="play" />
                    <span>View Flow</span>
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Addons / Optional Top-Ups */}
        <div className="sm-addons">
          <div className="sm-addon">
            <div className="sm-mi">
              <SvgIcon name="bus" />
            </div>
            <div>
              <h3>
                <em>Optional Top-Up</em>Transport Management
              </h3>
              <p>
                Bus and vehicle management, routes and stops, driver records, student bus allocation,
                transport fee tracking, parent transport details, and optional GPS live tracking.
              </p>
            </div>
          </div>

          <div className="sm-addon">
            <div className="sm-mi">
              <SvgIcon name="finger" />
            </div>
            <div>
              <h3>
                <em>Optional Top-Up</em>Biometric Attendance
              </h3>
              <p>
                Fingerprint machine integration, automatic staff attendance, check-in/check-out tracking,
                late-arrival reports, and monthly attendance summaries.
              </p>
            </div>
          </div>
        </div>

        {/* Commercial Note */}
        <div className="sm-note">
          <SvgIcon name="info" />
          <div>
            <strong>Pricing note:</strong> Annual estimates exclude applicable taxes, payment gateway transaction charges,
            hardware, installation, and third-party service costs. Confirm exact features and integration costs before signing
            a school agreement. The student slab applies the selected rate to all students; confirm this billing rule before publishing.
          </div>
        </div>
      </section>

      {/* Step 3: Compare plans */}
      <section>
        <div className="sm-step">
          <span className="sm-num">3</span>
          <span>Compare plans</span>
        </div>
        <p className="sm-sub">Key modules and deliverables in each plan, side by side.</p>

        <div className="sm-cmp-card">
          <div className="sm-cmp-scroll">
            <table className="sm-cmp">
              <thead>
                <tr>
                  <th>Key Modules &amp; Deliverables</th>
                  <th
                    className={selectedPlan === 'basic' ? 'sel' : ''}
                    onClick={() => setSelectedPlan('basic')}
                    style={{ cursor: 'pointer' }}
                  >
                    Basic
                  </th>
                  <th
                    className={selectedPlan === 'advanced' ? 'sel' : ''}
                    onClick={() => setSelectedPlan('advanced')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="sm-th-full">Advanced</span>
                    <span className="sm-th-mobile">Adv</span>
                  </th>
                  <th
                    className={selectedPlan === 'super' ? 'sel' : ''}
                    onClick={() => setSelectedPlan('super')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="sm-th-full">Super Advanced</span>
                    <span className="sm-th-mobile">Super</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Student, Exam &amp; Staff Modules</td>
                  <td className={selectedPlan === 'basic' ? 'sel' : ''}><CheckBadge /></td>
                  <td className={selectedPlan === 'advanced' ? 'sel' : ''}><CheckBadge /></td>
                  <td className={selectedPlan === 'super' ? 'sel' : ''}><CheckBadge /></td>
                </tr>
                <tr>
                  <td>Virtual Class Module</td>
                  <td className={selectedPlan === 'basic' ? 'sel' : ''}><CrossBadge /></td>
                  <td className={selectedPlan === 'advanced' ? 'sel' : ''}><CheckBadge /></td>
                  <td className={selectedPlan === 'super' ? 'sel' : ''}><CheckBadge /></td>
                </tr>
                <tr>
                  <td>Dedicated Android Mobile App</td>
                  <td className={selectedPlan === 'basic' ? 'sel' : ''}><CrossBadge /></td>
                  <td className={selectedPlan === 'advanced' ? 'sel' : ''}><PriceBadge full="₹10000 / yr" mobile="₹10k" /></td>
                  <td className={selectedPlan === 'super' ? 'sel' : ''}><CheckBadge /></td>
                </tr>
                <tr>
                  <td>Payment Gateway Integration</td>
                  <td className={selectedPlan === 'basic' ? 'sel' : ''}><CrossBadge /></td>
                  <td className={selectedPlan === 'advanced' ? 'sel' : ''}><PriceBadge full="₹10000 / yr" mobile="₹10k" /></td>
                  <td className={selectedPlan === 'super' ? 'sel' : ''}><CheckBadge /></td>
                </tr>
                <tr>
                  <td>AI Chat, Voice, Analytics &amp; OCR</td>
                  <td className={selectedPlan === 'basic' ? 'sel' : ''}><CrossBadge /></td>
                  <td className={selectedPlan === 'advanced' ? 'sel' : ''}><CrossBadge /></td>
                  <td className={selectedPlan === 'super' ? 'sel' : ''}><PriceBadge full="₹30000 / yr" mobile="₹30k" /></td>
                </tr>
                <tr className="tot">
                  <td>Annual Commercial Total</td>
                  <td className={selectedPlan === 'basic' ? 'sel' : ''}>
                    <span className="sm-cmp-tot-full">Base Slabs Only</span>
                    <span className="sm-cmp-tot-mobile">Base Only</span>
                  </td>
                  <td className={selectedPlan === 'advanced' ? 'sel' : ''}>
                    <span className="sm-cmp-tot-full">Base + ₹20k / yr</span>
                    <span className="sm-cmp-tot-mobile">+₹20k/yr</span>
                  </td>
                  <td className={selectedPlan === 'super' ? 'sel' : ''}>
                    <span className="sm-cmp-tot-full">Base + ₹50k / yr</span>
                    <span className="sm-cmp-tot-mobile">+₹50k/yr</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Flow Modal */}
      {activeFlow && (
        <div
          className="sm-fm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeFlow()
          }}
        >
          <div className="sm-fd" role="dialog" aria-modal="true">
            <button
              type="button"
              className="sm-fx"
              onClick={closeFlow}
              aria-label="Close flow modal"
            >
              <SvgIcon name="x" />
            </button>

            <h2>
              <span className="sm-mi">
                <SvgIcon name={activeFlow.i} />
              </span>
              <span>{activeFlow.n}</span>
            </h2>

            <div className="sm-rel">
              {activeFlow.rel}
              {activeFlow.note && <i> · {activeFlow.note}</i>}
            </div>

            {isCleared ? (
              <div className="sm-cv">
                <div className="sm-empty">
                  Flow cleared.<br />
                  <button
                    type="button"
                    className="sm-btn-primary"
                    onClick={handleReplayFlow}
                  >
                    <SvgIcon name="replay" />
                    <span>Replay {activeFlow.n}</span>
                  </button>
                </div>
              </div>
            ) : (
              activeFlow.L.map((lane, laneIdx) => (
                <div key={laneIdx} className="sm-lane">
                  {activeFlow.LT && activeFlow.LT[laneIdx] && (
                    <div className="sm-lt">{activeFlow.LT[laneIdx]}</div>
                  )}
                  <div className="sm-cv">
                    {lane.map((st, itemIdx) => {
                      const actor = ACTORS[st[0]] || ['System', '#475569']
                      const cardGlobalIdx = getCardGlobalIndex(activeFlow, laneIdx, itemIdx)
                      const isShown = cardGlobalIdx <= stepIndex
                      const isActive = cardGlobalIdx === stepIndex && !isCompleted
                      const isDone = cardGlobalIdx < stepIndex || isCompleted
                      const showArrow = itemIdx > 0
                      const arrowFilled = cardGlobalIdx <= stepIndex

                      return (
                        <div key={itemIdx} style={{ display: 'contents' }}>
                          {showArrow && (
                            <div className={`sm-ar ${arrowFilled ? 'go' : ''}`}>
                              <i></i>
                            </div>
                          )}
                          <div
                            className={`sm-cd ${st[0] === 'sys' ? 'sys' : ''} ${isShown ? 'show' : ''} ${
                              isActive ? 'active' : ''
                            } ${isDone ? 'done' : ''}`}
                            style={{ '--c': actor[1] }}
                          >
                            <span className="sm-ck">
                              <SvgIcon name="check" />
                            </span>
                            <span className="sm-tag">{actor[0]}</span>
                            <span className="sm-ic">
                              <SvgIcon name={st[1]} />
                            </span>
                            <div className="sm-t">{st[2]}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}

            {!isCleared && (
              <>
                <div className="sm-fn">
                  {isCompleted
                    ? 'Who does what → who receives it → what happens next.'
                    : `Step ${stepIndex + 1} of ${totalCards}: ${allCards[stepIndex]?.[2] || ''}`}
                </div>

                <div className={`sm-fb ${isCompleted ? 'on' : ''}`}>
                  <button
                    type="button"
                    className="sm-btn-secondary"
                    onClick={handleClearFlow}
                  >
                    <SvgIcon name="x" />
                    <span>Clear Flow</span>
                  </button>
                  <button
                    type="button"
                    className="sm-btn-primary"
                    onClick={closeFlow}
                  >
                    <SvgIcon name="grid" />
                    <span>View Another Flow</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CTA Section at bottom */}
      <CTASection />
    </div>
  )
}
