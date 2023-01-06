import React, { useState, useEffect } from 'react'
import Image from 'next/legacy/image'
import Carousel from 'nuka-carousel'
import CustomEditor from '@components/Editor'
import { useRouter } from 'next/router'
import { convertFromRaw, EditorState } from 'draft-js'

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

  const router = useRouter()

  const { id: productId } = router.query

  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  )

  const clickThumbnailImageHandler = (index: number) => {
    setImageIndex(index)
  }

  useEffect(() => {
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.item?.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.item.contents))
              )
            )
          } else {
            setEditorState(EditorState.createEmpty())
          }
        })
    }
  }, [productId])
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
      {editorState != null && (
        <CustomEditor editorState={editorState} readOnly />
      )}
    </>
  )
}
export default EditProductPage
