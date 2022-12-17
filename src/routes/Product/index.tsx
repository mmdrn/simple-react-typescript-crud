import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProduct } from "../../api/product.api";
import { Product as ProductType } from "../../types/product.type";
import Alert from 'react-bootstrap/Alert';

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

      <>
      {[
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
      ))}
    </>
  );
    </div>
  );
};

export default Product;
