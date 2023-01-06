import React, { SetStateAction } from 'react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

type Props = {
  editorState: EditorState | undefined
  readOnly?: boolean
  onSave?: () => void
  onEditorStateChange?: React.Dispatch<SetStateAction<EditorState | undefined>>
}

export default function CustomEditor({
  editorState,
  readOnly = false,
  onSave,
  onEditorStateChange,
}: Props) {
  return (
    <EditorWrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        wrapperClassName="wrapper-class"
        toolbarClassName="editorToolbar-hidden"
        editorClassName="editor-class"
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link'],
        }}
        localization={{
          locale: 'ko',
        }}
        onEditorStateChange={onEditorStateChange}
      />
      {!readOnly && <button onClick={onSave}>Save</button>}
    </EditorWrapper>
  )
}

const EditorWrapper = styled.div`
  padding: 16px;
`
