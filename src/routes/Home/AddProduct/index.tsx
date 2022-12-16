import { FC, useState } from "react";
import { AddProduct as AddProductRequest } from "../../../api/product.api";
import { toast } from "react-toastify";

type AddProductProps = {
  categories: string[];
  onSuccess: Function;
};

const AddProduct: FC<AddProductProps> = (props) => {
  const [form, updateForm] = useState<any>({
    category: {
      key: "category",
      inputType: "text",
      value: "",
      errors: [],
    },
    name: {
      key: "name",
      inputType: "text",
      value: "",
      minLength: 3,
      maxLength: 10,
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

  const formValidation = () => {
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
    if (_form.price.value.match("^[0-9]*$") === null) {
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

  const handleResetForm = async () => {
    const _form = Object.assign({}, form);

    for (const item in _form) {
      _form[item].errors = [];
      _form[item].value = "";
    }

    updateForm(_form);
  };

  const handleSubmit = async () => {
    if (!formValidation()) return false;

    try {
      const result = await AddProductRequest({
        category: form.category.value,
        title: form.name.value,
        price: form.price.value,
        description: form.description.value,
      });

      if (result.status === 200) {
        handleResetForm();
        toast.success("محصول جدید با موفقیت ثبت شد.");
        props.onSuccess();
      }
    } catch (error) {
      toast.error("عملیات ایجاد محصول با خدا مواجه شد.");
    }

    props.onSuccess();
  };

  return (
    <tr>
      <td>
        <div></div>
      </td>
      <td>
        <div>
          <input
            type="text"
            value={form.name.value}
            onChange={(e) => handleInputChange(e.target.value, "name")}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            type="text"
            value={form.price.value}
            onChange={(e) => handleInputChange(e.target.value, "price")}
          />
        </div>
      </td>
      <td>
        <div>
          <select
            value={form.category.value}
            onChange={(e) => handleInputChange(e.target.value, "category")}
          >
            {props.categories.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </td>
      <td>
        <div>
          <input
            type="text"
            value={form.description.value}
            onChange={(e) => handleInputChange(e.target.value, "description")}
          />
        </div>
      </td>
      <td>
        <div>
          <span onClick={handleSubmit}>ثبت</span>
        </div>
      </td>
    </tr>
  );
};

export default AddProduct;
