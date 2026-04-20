export function navigate(path) {
  if (window.location.pathname === path) return
  window.history.pushState(null, '', path)
  window.dispatchEvent(new CustomEvent('navigate', { detail: path }))
  window.scrollTo({ top: 0, behavior: 'instant' })
}
