import Filter from './Filter'
import Info from './Info'

const Header = ({ categories, changeCategory }) => {
  return (
    <div className='header'>
      <Filter categories={categories} changeCategory={changeCategory}/>
      <Info />
    </div>
  )
}

export default Header