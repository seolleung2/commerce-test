import { categories, products } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core'
import { CATEGORY_MAP, FILTERS, TAKE } from 'constants/product'
import { IconAt, IconSearch } from '@tabler/icons'
import useDebounce from 'hooks/useDebounce'

export default function Products() {
  const [activePage, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState<categories[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('-1')
  const [products, setProducts] = useState<products[]>([])

  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FILTERS[0].value
  )
  const [keyword, setKeyword] = useState<string>('')

  const debouncedKeyword = useDebounce<string>(keyword)

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.items)
      })
  }, [])

  useEffect(() => {
    fetch(
      `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotal(Math.ceil(data.items / TAKE))
      })
  }, [selectedCategory, debouncedKeyword])

  useEffect(() => {
    const skip = TAKE * (activePage - 1)
    fetch(
      `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items)
      })
  }, [activePage, selectedCategory, selectedFilter, debouncedKeyword])

  return (
    <div className="px-36 mt-36 mb-36">
      <div className="mb-4">
        <Input
          icon={<IconSearch />}
          placeholder="Search"
          value={keyword}
          onChange={handleChangeSearchInput}
        />
      </div>
      <div className="mb-4">
        <Select
          value={selectedFilter}
          onChange={setSelectedFilter}
          data={FILTERS}
        />
      </div>
      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={[
              { label: 'ALL', value: '-1' },
              ...categories.map((category) => ({
                label: category.name,
                value: String(category.id),
              })),
            ]}
            color="dark"
          />
        </div>
      )}
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div key={item.id} className="max-w-[310px]">
              <Image
                className="rounded"
                src={item.image_url ?? ''}
                width={310}
                height={390}
                alt={item.name}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              />
              <div className="flex">
                <span>{item.name}</span>
                <span className="ml-auto">
                  {item.price.toLocaleString('ko-KR')}???
                </span>
              </div>
              <span className="text-zinc-400">
                {CATEGORY_MAP[item.category_id - 1]}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex mt-5">
        <Pagination
          className="m-auto"
          page={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </div>
  )
}
