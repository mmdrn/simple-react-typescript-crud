import { FC } from "react";
import { Link } from "react-router-dom";

type PaginationProps = {
  pagesCount: number | null;
  currentPage: number;
};

const Pagination: FC<PaginationProps> = (props) => {
  return (
    <div className="pagination">
      <Link to={`?pageId=${props.currentPage + 1}`}>next</Link>
      <Link to={`?pageId=${props.currentPage - 1}`}>prev</Link>
    </div>
  );
};

export default Pagination;
