import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

type PaginationProps = {
  pagesCount: number | null;
  currentPage: number;
};

const Pagination: FC<PaginationProps> = (props) => {
  return (
    <div className="pagination">
      <Link className="button primary" to={`?pageId=${props.currentPage + 1}`}>
        بعدی
      </Link>
      {props.currentPage > 1 ? (
        <Link
          className="button primary"
          to={`?pageId=${props.currentPage - 1}`}
        >
          قبلی
        </Link>
      ) : (
        <span className="button primary disabled">قبلی</span>
      )}
    </div>
  );
};

export default React.memo(Pagination);
