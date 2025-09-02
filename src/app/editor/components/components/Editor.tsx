import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

export default function Editor () {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    monaco.editor.defineTheme('my-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#181824'
      }
    })

    const editor = monaco.editor.create(ref.current, {
      value: '// type code here',
      language: 'typescript',
      automaticLayout: true,
      theme: 'my-dark'
    })

    return () => editor.dispose()
  }, [])

  return <div ref={ref} className='w-full h-full' />
}
