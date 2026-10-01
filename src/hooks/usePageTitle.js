import { useEffect } from 'react'
import { company } from '../data/content'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${company.name}` : company.name
  }, [title])
}
