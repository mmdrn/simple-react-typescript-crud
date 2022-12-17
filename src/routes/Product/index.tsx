import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetProduct, UpdateProduct } from "../../api/product.api";
import { Product as ProductType } from "../../types/product.type";
import "./style.scss";
import { toast } from "react-toastify";

const Product: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [form, updateForm] = useState<any>({
    name: {
      key: "name",
      inputType: "text",
      value: "",
      minLength: 3,
      maxLength: 100,
      errors: [],
    },
    price: {
      key: "price",
      inputType: "text",
      value: "",
      errors: [],
    },
    description: {
      key: "description",
      inputType: "text",
      value: "",
      minLength: 3,
      maxLength: 250,
      errors: [],
    },
  });

  const handleInputChange = (value: any, key: string) => {
    const _form = Object.assign({}, form);
    _form[key].value = value;

    updateForm(_form);
  };

  const handleFormValidation = () => {
    let isValid = true;

    const _form = Object.assign({}, form);
    for (const item in _form) {
      _form[item].errors = [];
    }

    // name validation
    if (_form.name.value.length < _form.name.minLength) {
      isValid = false;
      const errorMessage = `عنوان نمی‌تواند کمتر از ${_form.name.minLength} کاراکتر باشد.`;
      _form.name.errors.push(errorMessage);
    }
    if (_form.name.value.length > _form.name.maxLength) {
      isValid = false;
      const errorMessage = `عنوان نمی‌تواند بیشتر از ${_form.name.maxLength} کاراکتر باشد.`;
      _form.name.errors.push(errorMessage);
    }

    // price validation
    if (!_form.price.value) {
      isValid = false;
      const errorMessage = "قیمت نمی‌تواند خالی باشد.";
      _form.price.errors.push(errorMessage);
    } else if (_form.price.value.toString().match("^[0-9]*$") === null) {
      isValid = false;
      const errorMessage = "قیمت فقط می‌تواند عدد باشد.";
      _form.price.errors.push(errorMessage);
    }

    // description validation
    if (_form.description.value.length < _form.description.minLength) {
      isValid = false;
      const errorMessage = `توضیحات نمی‌تواند کمتر از ${_form.description.minLength} کاراکتر باشد.`;
      _form.description.errors.push(errorMessage);
    }
    if (_form.description.value.length > _form.description.maxLength) {
      isValid = false;
      const errorMessage = `توضیحات نمی‌تواند بیشتر از ${_form.description.maxLength} کاراکتر باشد.`;
      _form.description.errors.push(errorMessage);
    }

    updateForm(_form);

    return isValid;
  };
  const handleSubmit = async () => {
    if (!handleFormValidation()) return false;

    try {
      if (id) {
        const result = await UpdateProduct(id, {
          title: form.name.value,
          price: form.price.value,
          description: form.description.value,
        });

        if (result.status === 200) {
          navigate("/");
          toast.success("محصول با موفقیت ویرایش شد.");
        }
      }
    } catch (error) {
      toast.error("عملیات ویرایش محصول با خطا مواجه شد.");
    }
  };
  const handleValidationMessages = (key: string) => {
    return (
      <div className="validations">
        {form[key].errors.map((error: any) => (
          <p
            key={error}
            className="validation-item"
            dangerouslySetInnerHTML={{ __html: error }}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const handleGetProduct = async () => {
      try {
        if (id) {
          const result = await GetProduct(id);
          if (result.status === 200) {
            setProduct(result.data);

            const _form = Object.assign({}, form);
            _form.name.value = result.data.title;
            _form.description.value = result.data.description;
            _form.price.value = result.data.price;
            updateForm(_form);
          }
        }
      } catch (error) {
        toast.error("دریافت محصول با خطا مواجه شد.");
        navigate("/");
      }
    };
    handleGetProduct();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-fields">
          <div className="field">
            <label htmlFor="name" className="title">
              نام
            </label>
            <input
              id="name"
              type="text"
              className="input"
              value={form.name.value}
              onChange={(e) => handleInputChange(e.target.value, "name")}
            />
            {handleValidationMessages("name")}
          </div>
          <div className="field">
            <label htmlFor="description" className="title">
              توضیحات
            </label>
            <input
              id="description"
              type="text"
              className="input"
              value={form.description.value}
              onChange={(e) => handleInputChange(e.target.value, "description")}
            />
            {handleValidationMessages("description")}
          </div>
          <div className="field">
            <label htmlFor="price" className="title">
              قیمت
            </label>
            <input
              id="price"
              type="text"
              className="input"
              value={form.price.value}
              onChange={(e) => handleInputChange(e.target.value, "price")}
            />
            {handleValidationMessages("price")}
          </div>
          <div className="field">
            <label className="title">تخفیف</label>
            <div className="input">{product?.discountPercentage}</div>
          </div>
          <div className="field">
            <label className="title">امتیاز</label>
            <div className="input">{product?.rating}</div>
          </div>
          <div className="field">
            <label className="title">تعداد</label>
            <div className="input">{product?.stock}</div>
          </div>
          <div className="field">
            <label className="title">برند</label>
            <div className="input">{product?.brand}</div>
          </div>
          <div className="field">
            <label className="title">دسته‌بندی</label>
            <div className="input">{product?.category}</div>
          </div>
          <div className="field">
            <label className="title">تصویر نمایه</label>
            <div className="input">{product?.thumbnail}</div>
          </div>
          <div className="actions">
            <span className="button primary" onClick={() => handleSubmit()}>
              ذخیره
            </span>
            <Link to={"/"} className="button danger">
              لغو
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
