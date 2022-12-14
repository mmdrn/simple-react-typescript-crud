import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { Link, useSearchParams } from "react-router-dom";
import { GetAllProducts } from "../../api/product.api";
import Pagination from "../../components/Pagination";
import { Product } from "../../types/product.type";
import "./style.scss";

type SortStateType = {
  key: keyof Product;
  direction: "asc" | "desc";
};

const Home: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortState, setSortState] = useState<SortStateType>({
    key: "id",
    direction: "asc",
  });
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const getAllProducts = async (currentPage: number, itemPerPage: number) => {
    try {
      const result = await GetAllProducts(
        itemPerPage * (currentPage - 1),
        itemPerPage
      );
      if (result.status === 200) {
        setProducts(result.data.products);
        setTotalPages(Math.ceil(result.data.total / itemPerPage));
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (searchParams.has("pageId")) {
      const pageId = searchParams.get("pageId");
      if (pageId) {
        setCurrentPage(parseInt(pageId));
      }
    }
    if (searchParams.has("itemPerPage")) {
      const itemPerPage = searchParams.get("itemPerPage");
      if (itemPerPage) {
        setItemPerPage(parseInt(itemPerPage));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    getAllProducts(currentPage, itemPerPage);
  }, [currentPage, itemPerPage]);

  useEffect(() => {
    const _products: Product[] = Array.from(products);

    _products.sort(function (a: Product, b: Product) {
      if (sortState.direction === "desc") {
        if (a[sortState.key] < b[sortState.key]) return -1;
        if (a[sortState.key] > b[sortState.key]) return 1;
      } else {
        if (a[sortState.key] < b[sortState.key]) return 1;
        if (a[sortState.key] > b[sortState.key]) return -1;
      }
      return 0;
    });

    setProducts(_products);
    // eslint-disable-next-line
  }, [sortState]);

  const handleUpdateSortState = (key: keyof Product) => {
    if (key === sortState.key) {
      setSortState({
        key: key,
        direction: sortState.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortState({
        key: key,
        direction: "asc",
      });
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <Pagination currentPage={currentPage} pagesCount={totalPages} />
        <table className="table">
          <thead>
            <tr>
              <th
                onClick={() => {
                  handleUpdateSortState("id");
                }}
              >
                <div>
                  شناسه
                  <span className="order-markers">
                    <span
                      className={`top ${
                        sortState.key === "id" && sortState.direction === "asc"
                          ? "active"
                          : ""
                      }`}
                    ></span>
                    <span
                      className={`bottom ${
                        sortState.key === "id" && sortState.direction === "desc"
                          ? "active"
                          : ""
                      }`}
                    ></span>
                  </span>
                </div>
              </th>
              <th
                onClick={() => {
                  handleUpdateSortState("title");
                }}
              >
                <div>
                  نام
                  <span className="order-markers">
                    <span
                      className={`top ${
                        sortState.key === "title" &&
                        sortState.direction === "asc"
                          ? "active"
                          : ""
                      }`}
                    ></span>
                    <span
                      className={`bottom ${
                        sortState.key === "title" &&
                        sortState.direction === "desc"
                          ? "active"
                          : ""
                      }`}
                    ></span>
                  </span>
                </div>
              </th>
              <th
                onClick={() => {
                  handleUpdateSortState("price");
                }}
              >
                <div>
                  قیمت
                  <span className="order-markers">
                    <span
                      className={`top ${
                        sortState.key === "price" &&
                        sortState.direction === "asc"
                          ? "active"
                          : ""
                      }`}
                    ></span>
                    <span
                      className={`bottom ${
                        sortState.key === "price" &&
                        sortState.direction === "desc"
                          ? "active"
                          : ""
                      }`}
                    ></span>
                  </span>
                </div>
              </th>
              <th
                onClick={() => {
                  handleUpdateSortState("category");
                }}
              >
                <div>
                  دسته‌بندی
                  <span className="order-markers">
                    <span
                      className={`top ${
                        sortState.key === "category" &&
                        sortState.direction === "asc"
                          ? "active"
                          : ""
                      }`}
                    ></span>
                    <span
                      className={`bottom ${
                        sortState.key === "category" &&
                        sortState.direction === "desc"
                          ? "active"
                          : ""
                      }`}
                    ></span>
                  </span>
                </div>
              </th>
              <th>
                <div>توضیحات</div>
              </th>
              <th>
                <div>اکشن</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div>{item.id}</div>
                  </td>
                  <td>
                    <div>{item.title}</div>
                  </td>
                  <td>
                    <div>{item.price}$</div>
                  </td>
                  <td>
                    <div>{item.category}</div>
                  </td>
                  <td>
                    <div>{item.description}</div>
                  </td>
                  <td>
                    <div></div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
