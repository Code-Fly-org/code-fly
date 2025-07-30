import OptionButtons from '../components/OptionButtons'

let project_type = "site"

// This is here so that a warning doesn't show cuz that annoys me
console.log(project_type)

export default function Home () {
  return (
    <>
      <div className='container'>
        <OptionButtons
          buttons={[
            { label: "Website", onClick: () => project_type = "site" },
            { label: "Web Server", onClick: () => project_type = "server" },
          ]}
        />
      </div>
    </>
  )
}
