import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductsThunkAPI from "../store/features/products/middleware";
import { addToCart } from "../store/features/products/productSlice.js";
import { emptyCart } from "../store/features/products/productSlice.js";
export default function Site() {
  const navigate = useNavigate();
  const location = useLocation();
  const productState = useSelector((state) => state.productState);
  const products = productState?.products;
  const cart = productState?.cart;
  //console.log("products length>>>", products?.length);

  const dispatch = useDispatch();
  const [product, setProduct] = useState();
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
    <div>
      {/* header */}
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/product"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              {/* <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlink:href="#bootstrap" />
              </svg> */}
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/product" className="nav-link px-2 text-white">
                  Products
                </a>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-primary position-relative me-3"
              onClick={() => navigate("/cart")}
            >
              Cart
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart?.length}
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className="b-example-divider"></div>
      {/* end header */}
      <Outlet />
      {location.pathname === "/" && (
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
                      <p className="card-text">
                        {item.description.slice(0, 100)}
                      </p>
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
      )}

      {/* footer */}
      <footer className="p-3 bg-dark text-white text-center fixed-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              Copyright ©2022. All Rights Reserved by Kishori Khelukar.
            </div>
          </div>
        </div>
      </footer>
      {/* end footer */}
    </div>
  );
}
