import Filter from './Filter'
import Info from './Info'

const Header = ({ categories, changeSearch, changeCategory, changeOrder, dateOrder, loading }) => {
  return (
    <div className='header'>
      <Filter loading={loading} categories={categories} changeCategory={changeCategory} changeSearch={changeSearch} changeOrder={changeOrder} dateOrder={dateOrder} />
      <Info />
    </div>
  )
}

export default Header