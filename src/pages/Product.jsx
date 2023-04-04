import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductsThunkAPI from "../store/features/products/middleware";
import { addToCart } from "../store/features/products/productSlice.js";
function Product() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const productState = useSelector((state) => state.productState);
  const products = productState?.products;
  console.log("products list>>>", products);
  useEffect(() => {
    try {
      dispatch(ProductsThunkAPI.getAllProductsAsync());
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onHandleTocart = (obj) => {
    try {
      console.log(obj);
      dispatch(addToCart(obj));
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        {products &&
          products.map((item, i) => (
            <div className="col-md-3 card-columns" key={i}>
              <div className="card my-3" style={{ height: "400px" }}>
                <img
                  src={item.image}
                  className="card-img-top"
                  alt="..."
                  width={100}
                  height={200}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title.slice(0, 20)}</h5>
                  <p className="card-text">{item.description.slice(0, 50)}</p>
                  <h5 className="card-title">₹ {item.price}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => onHandleTocart(item)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Product;
