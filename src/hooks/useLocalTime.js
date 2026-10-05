import { useEffect, useState } from 'react'

export function useLocalTime(timeZone = 'Europe/Istanbul') {
  const [time, setTime] = useState(() => format(timeZone))

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 1000 * 30)
    return () => clearInterval(id)
  }, [timeZone])

  return time
}

function format(timeZone) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())
  } catch {
    return ''
  }
}
