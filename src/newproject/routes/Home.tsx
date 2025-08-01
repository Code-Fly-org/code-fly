import { useState } from 'react'
import OptionButtons from '../components/OptionButtons'

export default function Home () {
  const [projectType, setProjectType] = useState<string>('website')

  return (
    <>
        <OptionButtons
          buttons={[
            { label: 'Website', onClick: () => setProjectType('website') },
            { label: 'Web Server', onClick: () => setProjectType('webserver') }
          ]}
          name="Project Type"
        />
    </>
  )
}
