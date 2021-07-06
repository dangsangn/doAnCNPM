import React from "react";
import ReactPaginate from "react-paginate";
// import { useDispatch, useSelector } from "react-redux";
// import { onChangePage } from "../../actions/control-action";
import "./style.scss";
function Pagination(props) {
  // const dispatch = useDispatch();
  // const pageNumber = useSelector((state) => state.pagination);
  // const indexPage = useSelector((state) => state.filter._page);
  // const handlePageClick = (e) => {
  //   dispatch(onChangePage(e.selected + 1));
  // };
  const indexPage = 1;
  const pageNumber = 10;
  const handlePageClick = () => {};

  return (
    <div className="pagination-content">
      <ReactPaginate
        initialPage={0}
        forcePage={indexPage - 1}
        previousLabel={"< Previous"}
        nextLabel={"Next >"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageNumber}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Pagination;
