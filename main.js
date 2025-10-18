// Arpit Portfolio Interactivity
// Micro-interactions, animations, PWA, and UX enhancements

const $ = (q, el = document) => el.querySelector(q)
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q))

// Year
$('#year').textContent = new Date().getFullYear()

// Theme toggle with persistence
const root = document.documentElement
const THEME_KEY = 'theme'
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
let theme = localStorage.getItem(THEME_KEY) || (prefersLight ? 'light' : 'dark')
setTheme(theme)

$('#themeToggle').addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light'
  setTheme(theme)
  localStorage.setItem(THEME_KEY, theme)
})

function setTheme(mode) {
  if (mode === 'light') root.classList.add('light')
  else root.classList.remove('light')
}

// Typewriter effect
const roles = [
  'Full‑stack and AI Developer',
  'Automation & Open‑source enthusiast',
  'FastAPI • MERN • MLOps',
  'I build useful tools'
]
let ti = 0, ci = 0, deleting = false
const tw = $('#typewriter')
function tick() {
  const word = roles[ti % roles.length]
  const cur = tw.textContent
  if (!deleting) {
    tw.textContent = word.slice(0, ci + 1)
    ci++
    if (ci === word.length) { deleting = true; setTimeout(tick, 1200); return }
  } else {
    tw.textContent = word.slice(0, ci - 1)
    ci--
    if (ci === 0) { deleting = false; ti++; }
  }
  const delay = deleting ? 45 : 80
  setTimeout(tick, delay)
}
setTimeout(tick, 600)

// Reading progress bar
const progress = $('#progress')
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const pct = Math.min(100, Math.max(0, (scrollTop / height) * 100))
  progress.style.width = pct + '%'
}, { passive: true })

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('in'))
}, { threshold: .12 })
$$('.reveal').forEach(el => io.observe(el))

// Project filters
$$('.chip').forEach(btn => btn.addEventListener('click', () => {
  $$('.chip').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
  const f = btn.dataset.filter
  $$('.project').forEach(p => {
    const tags = p.dataset.tags || ''
    const show = f === 'all' || tags.includes(f)
    p.style.display = show ? '' : 'none'
  })
}))

// Simple parallax on mouse move for hero
const hero = $('#hero')
hero.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e
  hero.style.setProperty('--mx', x / window.innerWidth)
  hero.style.setProperty('--my', y / window.innerHeight)
}, { passive: true })

// Particle canvas (toggleable)
const canvas = $('#bg-canvas')
const ctx = canvas.getContext('2d', { alpha: true })
let particlesOn = true
$('#toggleParticles').addEventListener('click', () => {
  particlesOn = !particlesOn
  $('#toggleParticles').textContent = `Particles: ${particlesOn ? 'On' : 'Off'}`
})

function resize() {
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  canvas.width = innerWidth * dpr
  canvas.height = innerHeight * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}
window.addEventListener('resize', resize)
resize()

const P_COUNT = 80
const P = Array.from({ length: P_COUNT }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  vx: (Math.random() - .5) * .4,
  vy: (Math.random() - .5) * .4,
  r: Math.random() * 1.6 + .4
}))

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (particlesOn) {
    ctx.fillStyle = 'rgba(255,255,255,.35)'
    ctx.strokeStyle = 'rgba(255,255,255,.08)'
    for (let i = 0; i < P.length; i++) {
      const p = P[i]
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      for (let j = i + 1; j < P.length; j++) {
        const q = P[j]
        const dx = p.x - q.x, dy = p.y - q.y
        const d2 = dx*dx + dy*dy
        if (d2 < 140*140) {
          const a = 1 - Math.sqrt(d2) / 140
          ctx.globalAlpha = Math.max(0, Math.min(.25, a))
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.globalAlpha = 1
        }
      }
    }
  }
  requestAnimationFrame(step)
}
requestAnimationFrame(step)

// Streak tracker ("addictive" nudge): visits on consecutive days
const STREAK_KEY = 'visit-streak'
const LAST_KEY = 'visit-last'
const today = new Date().toDateString()
const last = localStorage.getItem(LAST_KEY)
let streak = Number(localStorage.getItem(STREAK_KEY) || 0)
if (last && new Date(last).toDateString() !== today) {
  // If last visit was yesterday, increment; else reset
  const diff = (Date.now() - new Date(last).getTime()) / (1000*60*60*24)
  streak = diff > 1.5 ? 1 : streak + 1
} else if (!last) {
  streak = 1
}
localStorage.setItem(LAST_KEY, new Date().toISOString())
localStorage.setItem(STREAK_KEY, String(streak))
const streakEl = $('#streak')
streakEl.textContent = `You're on a ${streak}-day streak 🔥`

// Contact form handler -> fallback to mailto
function handleContactSubmit(e) {
  e.preventDefault()
  const form = e.currentTarget
  const data = new FormData(form)
  const name = data.get('name')
  const email = data.get('email')
  const msg = data.get('message')
  const mail = `mailto:arkushworks@gmail.com?subject=Portfolio%20contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`
  $('#contactStatus').textContent = 'Opening your email client…'
  window.location.href = mail
  return false
}
window.handleContactSubmit = handleContactSubmit

// Active section highlighting
const sections = ['hero','about','experience','projects','skills','contact']
const sectionMap = new Map(sections.map(id => [id, document.getElementById(id)]))
const navLinks = $$('.nav a').filter(a => a.hash)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id
      navLinks.forEach(a => a.classList.toggle('active', a.hash === '#' + id))
    }
  })
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })
sectionMap.forEach(section => observer.observe(section))

// PWA install prompt
let deferredPrompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  const btn = $('#installPWA')
  btn.hidden = false
  btn.onclick = async () => {
    btn.hidden = true
    deferredPrompt?.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log('PWA install', outcome)
    deferredPrompt = null
  }
})

// Service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(reg => {
      console.log('SW registered', reg.scope)
    }).catch(console.error)
  })
}
