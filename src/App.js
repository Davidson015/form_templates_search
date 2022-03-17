import { useState, useEffect } from 'react';
import Header from './components/Header'
import Templates from './components/Templates'
import Footer from './components/Footer'

function App() {
  const [width, setWidth] = useState(window.innerWidth)
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState('Default')
  const [selectedDateOrder, setSelectedDateOrder] = useState('Default')

  // Getting state of width dimension
  useEffect( () => {
    window.addEventListener('resize', updateWidth)
  })

  // Update width Dimension of viewport
  const updateWidth = () => {
    setWidth(window.innerWidth)
  }
  
  // Fetching Templates from API
  const fetchTemplates = async () => {
    const res = await fetch('https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates')
    const data = await res.json()

    // Ending Template-Skeleton Shimmer Effect
    setloading(false)
    
    return data;
  }

  useEffect(() => {
    const getTemplates = async () => {
      const templatesFromAPI = await fetchTemplates()

      // Setting Templates
      setTemplates(templatesFromAPI)
    }

    getTemplates()
  }, [])

  // Getting Categories
  useEffect(() => {
    const cats = []
    templates.forEach( template => {
      template.category.forEach( c => cats.push(c))
    });

    setCategories([...(new Set(cats))]);
    setFilteredTemplates(templates)
  },[templates, page])
  
  // Setting Search value
  const changeSearch = ( searchValue ) => {
    setSearch(searchValue)
  }
  
  // Searching through templates
  useEffect( () => {
    if ( search === '') {
      setFilteredTemplates(templates)
    } else {
      setFilteredTemplates(templates.filter( temp => temp.name.includes(search)))
    }
  }, [search, page, templates])
  
  // Setting Category Filter value
  const changeCategory = (category) => {
    setSelectedCategory(category)
  }

  // Filtering through templates with Category
  useEffect(() => {
    if(selectedCategory === "All"){
      setFilteredTemplates(templates)
    } else {
      // Resetting other filter values
      if(document.getElementById('order').value !== 'Default'){
        setSelectedOrder('Default')
        document.getElementById('order').value = 'Default'
      }
      if(document.getElementById('date').value !== 'Default'){
        setSelectedDateOrder('Default')
        document.getElementById('date').value = 'Default'
      }

      // Filtering Templates
      setFilteredTemplates(templates.filter( temp => temp.category.includes(selectedCategory)))
    }
  },[selectedCategory, page, templates])

  // Setting Order Filter value
  const changeOrder = (order) => {
    setSelectedOrder(order)
  }

  // Ordering templates by name in Ascending || Descending format
  useEffect(() => {
    if(selectedOrder === "Default"){
      setFilteredTemplates(filteredTemplates)
    } else {
      // Resetting other filter values
      if(document.getElementById('date').value !== 'Default'){
        setSelectedDateOrder('Default')
        document.getElementById('date').value = 'Default'
      }
      if(document.getElementById('category').value !== 'All'){
        setSelectedCategory('All')
        document.getElementById('category').value = 'All'
      }

      // Filtering Templates
     setFilteredTemplates([...filteredTemplates].sort((a,b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {return selectedOrder === "Ascending" ? 1 : -1}
        if (a.name.toLowerCase() > b.name.toLowerCase()) {return selectedOrder === "Ascending" ? -1 : 1}
        return 0;
      }))
    }
  },[selectedOrder, filteredTemplates, page])

  // Setting Creation Date filter Value
  const dateOrder = (order) => {
    setSelectedDateOrder(order)
  }

  // Ordering templates by Creation Date in Ascending || Descending format
  useEffect(() => {
    if(selectedDateOrder === 'Default') {
      setFilteredTemplates(filteredTemplates)
    } else {
      // Resetting other filter values
      if(document.getElementById('order').value !== 'Default'){
        setSelectedOrder('Default')
        document.getElementById('order').value = 'Default'
      }
      if(document.getElementById('category').value !== 'All'){
        setSelectedCategory('All')
        document.getElementById('category').value = 'All'
      }

      // Filtering Templates
      setFilteredTemplates([...filteredTemplates].sort( (a,b) => {
        if ( a.created.toLowerCase() < b.created.toLowerCase()) {return selectedDateOrder === 'Ascending' ? 1 : -1}
        if ( a.created.toLowerCase() > b.created.toLowerCase()) {return selectedDateOrder === 'Ascending' ? -1 : 1}
        return 0;
      }))
    }
  }, [selectedDateOrder, filteredTemplates, page])

  return (
    <div className="App">
      <Header loading={loading} categories={categories} changeCategory={changeCategory} changeSearch={changeSearch} changeOrder={changeOrder} dateOrder={dateOrder} />
      <Templates selectedOrder={selectedOrder} templateLength={filteredTemplates.length} templates={
        (width >= 768) && (width <= 1400) ? (
          filteredTemplates.slice(page * 14, ((page + 1) * 14) )
          ) : (
            filteredTemplates.slice(page * 15, ((page + 1) * 15) )
          )
      } loading={loading} selectedCategory={selectedCategory} />
      <Footer pageLength={
        (width >= 768) && (width <= 1400) ? (
          Math.floor(filteredTemplates.length / 14)
        ) : (
          Math.floor(filteredTemplates.length / 15)
        )
      } page={page} setPage={setPage} />
    </div>
  );
}

export default App;
