import React, { useEffect } from "react";
import Alignment from "../Components/Inventory/Alignment/JS/Alignment";
import MyOrderLayout from "../Components/MyOrder/Layout/JS/MyOrderLayout";
import OrderContainer from "../Components/MyOrder/OrderContainer/JS/OrderContainer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../Store/store";

const MyOrders = () => {
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.Orders);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const GetOrdersHandler = async () => {
      await axios
        .post(
          "https://projectbackend-production-088c.up.railway.app/users/GetMyOrders",
          JSON.stringify({ userId: userId }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => dispatch(ChatActions.setOrders(res.data)));
    };
    GetOrdersHandler();
  }, []);
  return (
    <Alignment>
      <h1 style={{ color: "white" }}>My Orders</h1>
      <MyOrderLayout>
        {Orders !== undefined &&
          Orders.map((item) => (
            <OrderContainer
              key={item._id}
              _id={item._id}
              Items={item.Items}
              Time={item.time}
              Totalamount={item.TotalAmount.toLocaleString("en-US")}
            />
          ))}
      </MyOrderLayout>
    </Alignment>
  );
};

export default MyOrders;
