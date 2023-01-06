import React, { useRef, useState, useEffect } from 'react'

export default function Home() {
  // const [products, setProducts] = useState<
  //   { id: string; properties: { id: string }[] }[]
  // >([])
  const [products, setProducts] = useState<
    { id: string; name: string; createdAt: string }[]
  >([])
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

  // useEffect(() => {
  //   fetch('/api/get-items')
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [])

  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        setProducts(data.items)
      })
  }, [])
  return (
    <>
      <h1>Hello world</h1>
      <input type="text" ref={inputRef} placeholder="input item" />
      <button onClick={handleClick}>Add item</button>
      <div>
        <p>Product List</p>
        {/* {products &&
          products.map((item) => (
            <div key={item.id}>
              {JSON.stringify(item)}
              {item.properties &&
                Object.entries(item.properties).map(([key, value]) => {
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        fetch(
                          `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`
                        )
                          .then((res) => res.json())
                          .then((data) => alert(JSON.stringify(data.detail)))
                      }}
                    >
                      {key}
                    </button>
                  )
                })}
              <br />
              <br />
            </div>
          ))} */}
        {products &&
          products.map((item) => (
            <div key={item.id}>
              {item.name}
              <span>{item.createdAt}</span>
            </div>
          ))}
      </div>
    </>
  )
}
