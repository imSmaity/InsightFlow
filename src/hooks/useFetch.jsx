import { useEffect, useState } from 'react'

const useFetch = (Func) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    Func()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setError(error)
      })
  }, [Func])

  return { data, loading, error }
}

export default useFetch
