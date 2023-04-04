import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../store/features/products/productSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector((state) => state.productState);
  const cart = productState?.cart;

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  const onHandleSubmitOrder = (e) => {
    e.preventDefault();
    emptyCart();
    navigate("/thanks");
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3 sticky-top">
            {cart.map((el, i) => (
              <li
                className="list-group-item d-flex justify-content-between lh-condensed"
                key={i}
              >
                <div>
                  <h6 className="my-0">{el.title}</h6>
                  <small className="text-muted">
                    {el.description.slice(0, 10)}
                  </small>
                </div>
                <span className="text-muted">${el.price}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${getTotal().totalPrice}</strong>
            </li>
          </ul>

          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={(e) => onHandleSubmitOrder(e)}
          >
            Checkout
          </button>
        </div>
      </div>
      <footer className="my-5 pt-5 text-muted text-center text-small"></footer>
    </div>
  );
}
