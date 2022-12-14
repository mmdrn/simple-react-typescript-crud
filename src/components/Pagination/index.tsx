import React from "react";
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
      {props.currentPage > 1 ? (
        <Link to={`?pageId=${props.currentPage - 1}`}>prev</Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default React.memo(Pagination);
