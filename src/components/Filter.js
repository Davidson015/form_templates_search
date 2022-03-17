import { FaSearch, FaTimes } from 'react-icons/fa'

const Filter = ({ categories, changeSearch, changeCategory, changeOrder, loading }) => {

  return (
    <div className='filter'>
      <div className="search">
        <input type="text" name="search-bar" id="search-bar" placeholder="Search Templates" onChange={ e => changeSearch(e.target.value.toLowerCase())} />
        {
          !loading && document.getElementById('search-bar').value !== '' ? (
            <FaTimes className='searchIcon' style={{ marginLeft: '3px', marginRight: '10px', cursor: 'pointer'}} onClick={ e => {
              document.getElementById('search-bar').value = ''
              changeSearch('')
            }} />
          ) : (
            <FaSearch className='searchIcon' style={{ marginLeft: '3px', marginRight: '10px', cursor: 'pointer'}} />
          )
        }
      </div>

      <h3>Sort By: </h3>
      <fieldset className="category-filter">
        <legend>Category</legend>
        <select name="category" id="category" onChange={ e => changeCategory(e.target.value)}>
          <option value="All">All</option>
         {
           categories.map( ( category, index ) => (
             <option key={index} value={category}>{category}</option>
           ))
         }
        </select>
      </fieldset>

      <fieldset className="order-filter">
        <legend>Order</legend>
        <select name="order" id="order" onChange={ e => changeOrder(e.target.value)}>
          <option value="Default">Default</option>
          <option value="Descending">Ascending</option>
          <option value="Ascending">Descending</option>
        </select>
      </fieldset>

      <fieldset className="date-filter">
        <legend>Date</legend>
        <select name="date" id="date">
          <option value="Default">Default</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </fieldset>
    </div>
  )
}

export default Filter