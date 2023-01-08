import { useEffect, useState } from 'react'

// T : 내가 모르는 밖에서 정의한 값

const useDebounce = <T = any>(value: T, delay = 600) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(() => value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
