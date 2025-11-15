import "./Display.css"

export const Display = ({name}) => {
  return (
    <div class="inside">
        <p className='flex '>Welcome , 
        {name ==""? " Guest " : ` ${name} `}
        </p>
    </div>
  )
}
