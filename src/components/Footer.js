import { useEffect } from "react"

const Footer = ({ page, setPage, pageLength }) => { 
  useEffect(() => {
    document.getElementById("page").value = page + 1
    document.getElementById("page").value >= 1000 ? document.getElementById("page").style.width = '20%' : document.getElementById("page").style.width = '15%'
  }, [page])

  return (
    <div className="footer">
      <p className="previous" style={{ cursor : "pointer" }} onClick={() => page === 0 ? setPage(0) : setPage(page-1)}>Previous</p>
      <p id="pages">
        <input id="page" defaultValue={page + 1} onChange={ e => e.target.value < 1 ? setPage(page) : setPage(e.target.value - 1)} type="number" />
        of {pageLength + 1}
      </p>
      <p className="next" style={{ cursor : "pointer" }} onClick={() => page === pageLength ? setPage(pageLength) : setPage(page + 1)}>Next</p>
    </div>
  )
}

export default Footer