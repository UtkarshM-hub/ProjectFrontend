import axios from "axios";
import React, { useEffect } from "react";
import Alignment from "../Components/Inventory/Alignment/JS/Alignment";
import SalesContainer from "../Components/Sales/Container/JS/SalesContainer";
import SalesItemContainer from "../Components/Sales/ItemContainer/JS/SalesItemContainer";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../Store/store";

const Sales = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const Sales = useSelector((state) => state.Sales);
  useEffect(() => {
    const GetSalesData = async () => {
      await axios
        .post(
          "https://projectbackend-production-088c.up.railway.app/users/GetSalesData",
          JSON.stringify({ userId: userId }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => dispatch(ChatActions.setSales(res.data)));
    };
    GetSalesData();
  }, []);
  return (
    <Alignment>
      <h1 style={{ color: "white" }}>Sales</h1>
      <SalesContainer>
        {Sales !== undefined &&
          Sales.map((item) => (
            <SalesItemContainer
              key={item._id}
              time={item.time}
              Name={item.Name}
              Email={item.Email}
              Address={item.Address}
              Phone={item.PhoneNumber}
              _id={item._id}
              Items={item.Item}
              Status={item.Status}
            />
          ))}
      </SalesContainer>
    </Alignment>
  );
};

export default Sales;
