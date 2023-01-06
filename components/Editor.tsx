import dynamic from 'next/dynamic'
import React from 'react'
import { EditorProps } from 'react-draft-wysiwyg'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

export default function CustomEditor() {
  return <Editor />
}
