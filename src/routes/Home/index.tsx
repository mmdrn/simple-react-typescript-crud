import { FC, useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  DeleteProduct,
  GetAllCategories,
  GetAllProducts,
} from "../../api/product.api";
import { toast } from "react-toastify";
import { Product } from "../../types/product.type";
import Pagination from "../../components/Pagination";
import "./style.scss";
import AddProduct from "./AddProduct";

type SortStateType = {
  key: keyof Product;
  direction: "asc" | "desc";
};

const Home: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortState, setSortState] = useState<SortStateType>({
    key: "id",
    direction: "asc",
  });
  const [searchKey, setSearchKey] = useState<string>("id");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const handleGetAllProducts = async (
    currentPage: number,
    itemPerPage: number
  ) => {
    try {
      const result = await GetAllProducts(
        itemPerPage * (currentPage - 1),
        itemPerPage
      );
      if (result.status === 200) {
        handleSortProducts(result.data.products);
        setTotalPages(Math.ceil(result.data.total / itemPerPage));
      }
    } catch (error) {}
  };
  const handleSortProducts = (products: Product[]) => {
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
  };
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
  const handleUpdateItemPerPage = (value: number) => {
    const params = new URLSearchParams();
    params.append("pageId", currentPage.toString());
    params.append("itemPerPage", value.toString());
    setSearchParams(params);
  };
  const handleDeleteProduct = async (id: string) => {
    const index = products.findIndex((product) => product.id.toString() === id);
    if (index < 0) {
      toast.error("شناسه محصول نامعتبر است.");
      return false;
    }

    try {
      const result = await DeleteProduct(products[index].id.toString());
      if (result.status === 200) {
        const _products = Array.from(products);
        _products.splice(index, 1);
        setProducts(_products);
        toast.success("محصول مورد نظر با موفقیت حذف شد");
        return true;
      }

      toast.error("عملیات حذف با خطا مواجه شد.");
      return false;
    } catch (error) {
      toast.error("عملیات حذف با خطا مواجه شد.");
      return false;
    }
  };
  const handleTableRecords = useCallback(() => {
    const _products = searchValue ? searchResult : products;
    return _products.map((item) => {
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
            {/* <div>{item.description}</div> */}
            <div>123</div>
          </td>
          <td>
            <div>
              <Link to={`/products/${item.id}`}>مشاهده</Link>
              <span onClick={() => handleDeleteProduct(item.id.toString())}>
                حذف
              </span>
            </div>
          </td>
        </tr>
      );
    });
    // eslint-disable-next-line
  }, [products, searchResult]);

  useEffect(() => {
    const handleGetAllCategories = async () => {
      try {
        const result = await GetAllCategories();
        if (result.status === 200) {
          setCategories(result.data);
        }
      } catch (error) {}
    };

    handleGetAllCategories();
  }, []);
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
    handleGetAllProducts(currentPage, itemPerPage);
    setSearchValue("");
    // eslint-disable-next-line
  }, [currentPage, itemPerPage]);
  useEffect(() => {
    handleSortProducts(products);
    // eslint-disable-next-line
  }, [sortState]);
  useEffect(() => {
    if (searchKey && searchValue) {
      let _products = Array.from(products);
      _products = _products.filter((product) => {
        switch (searchKey) {
          case "title": {
            if (product.title.search(searchValue) > -1) return true;
            return false;
          }
          case "category": {
            if (product.category.search(searchValue) > -1) return true;
            return false;
          }
          case "id": {
            if (product.id.toString().search(searchValue) > -1) return true;
            return false;
          }
          case "price": {
            if (product.price.toString().search(searchValue) > -1) return true;
            return false;
          }
        }
        return false;
      });

      setSearchResult(_products);
    } else {
      setSearchResult([]);
    }
  }, [searchValue, products, searchKey]);

  return (
    <div className="home-page">
      <div className="container">
        <select
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        >
          <option value="id">شناسه</option>
          <option value="category">دسته بندی</option>
          <option value="title">نام</option>
          <option value="price">قیمت</option>
        </select>
        <input
          placeholder={`جستجو در ${searchKey} ها`}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <select
          value={itemPerPage}
          onChange={(e) => {
            handleUpdateItemPerPage(parseInt(e.target.value));
          }}
        >
          <option value="5">5</option>
          <option value="12">12</option>
          <option value="30">30</option>
        </select>
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
            {handleTableRecords()}
            <AddProduct onSuccess={function () {}} categories={categories} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
