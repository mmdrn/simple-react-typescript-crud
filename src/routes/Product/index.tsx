import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProduct } from "../../api/product.api";
import { Product as ProductType } from "../../types/product.type";

const Product: FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();

  const handleGetProduct = async () => {
    try {
      if (id) {
        const result = await GetProduct(id);
        if (result.status === 200) {
          setProduct(result.data);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetProduct();
  });

  return (
    <div className="home-page">
      <div className="container">{product?.brand}</div>
    </div>
  );
};

export default Product;
