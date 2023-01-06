import React, { useState } from 'react'
import Image from 'next/legacy/image'
import Carousel from 'nuka-carousel'
import CustomEditor from '@components/Editor'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]

const EditProductPage = () => {
  const [imageIndex, setImageIndex] = useState<number>(0)

  const clickThumbnailImageHandler = (index: number) => {
    setImageIndex(index)
  }
  return (
    <>
      <Carousel
        animation="fade"
        autoplay
        withoutControls
        wrapAround
        speed={10}
        slideIndex={imageIndex}
      >
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
            layout="responsive"
          />
        ))}
      </Carousel>
      <div className="flex">
        {images.map((item, idx) => (
          <div key={idx} onClick={clickThumbnailImageHandler.bind(null, idx)}>
            <Image src={item.original} alt="image" width={100} height={60} />
          </div>
        ))}
      </div>
      <CustomEditor />
    </>
  )
}
export default EditProductPage
