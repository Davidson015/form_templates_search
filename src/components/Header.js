import Filter from './Filter'
import Info from './Info'

const Header = ({ categories, changeCategory, searchTemplates, loading }) => {
  return (
    <div className='header'>
      <Filter loading={loading} categories={categories} changeCategory={changeCategory} searchTemplates={searchTemplates} />
      <Info />
    </div>
  )
}

export default Header