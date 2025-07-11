// components/RichTextEditor.jsx

import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function RichTextEditor({htmlback}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const saveContent = () => {
    
    const rawContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log("Raw html to save:", JSON.stringify(rawContent, null, 2));
    // You can send `rawContent` to your backend or convert it to HTML
    htmlback(rawContent);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded-md shadow-sm bg-white">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="border rounded"
        editorClassName="p-4 min-h-[300px]"
        toolbarClassName="border-b"
      />
      <button
        onClick={saveContent}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
