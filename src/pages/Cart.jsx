import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
} from "../store/features/products/productSlice.js";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector((state) => state.productState);
  const cart = productState?.cart;

  const onHandleIncreament = (obj) => {
    try {
      dispatch(incrementQuantity(obj));
    } catch (err) {
      console.log(err.message);
    }
  };

  const onHandleDecrement = (obj) => {
    try {
      dispatch(decrementQuantity(obj));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        {cart &&
          cart.map((item, i) => (
            <div className="col-md-3" key={i}>
              <div className="card my-3" style={{ height: "500px" }}>
                <img
                  src={item.image}
                  className="card-img-top"
                  alt="..."
                  height={300}
                  width={100}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  {/*<p className="card-text">{item.description}</p>*/}
                  <h5 className="card-title">₹ {item.price}</h5>
                  <button
                    className="btn btn-success"
                    onClick={() => onHandleIncreament(item)}
                  >
                    +
                  </button>
                  <span className="card-title mx-3">{item.quantity}</span>
                  <button
                    className="btn btn-danger "
                    onClick={() => onHandleDecrement(item)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="mb-5 pb-5 float-end " style={{ marginBottom: "1000px" }}>
        <button
          type="button"
          className="btn btn-primary mt-2 p-2"
          onClick={() => navigate("/checkout")}
        >
          Payment
        </button>
      </div>
    </div>
  );
}
