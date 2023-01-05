import React, { useRef } from 'react'

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!inputRef.current || inputRef.current.value === '') {
      alert('Please input item name')
      return null
    }
    fetch(`/api/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message))
  }
  return (
    <>
      <h1>Hello world</h1>
      <input type="text" ref={inputRef} placeholder="input item" />
      <button onClick={handleClick}>Add item</button>
    </>
  )
}
