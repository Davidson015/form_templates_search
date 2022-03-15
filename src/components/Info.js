import { FaInfoCircle } from 'react-icons/fa'

const Info = () => {
  return (
    <div className='info-msg'>
      <FaInfoCircle style={{ color: '#FC830A', fontSize: '4vmin', marginRight: '10px', marginTop: '-2.5px' }} />
      <p>Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates</p>
    </div>
  )
}

export default Info