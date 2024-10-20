// hooks/useEncounters.js
import { useState } from 'react'

export const useEncounters = (initialCount = 0) => {
  const [count, setCount] = useState(initialCount)

  const increment = () => setCount(count + 1)
  const reset = () => setCount(0)

  return { count, increment, reset }
}
