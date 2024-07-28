import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useState, useEffect, useContext } from "react";

const Product = () => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const [productModal, setProductModal] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/product/product" + item_uuid, // endpoint
        "DELETE", // method
        undefined, //body
        userCtx.accessToken // accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          Item Name
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-2"
        >
          {item_name}
        </div>
        <div className="row"></div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          Description
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-2"
        >
          {description}
        </div>
        <div className="row"></div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          Sell Price
        </div>

        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-2"
        >
          {sell_price}
        </div>
        <div className="row"></div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          Status
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-2"
        >
          {status}
        </div>
      </div>
      <div className="row"></div>
      {userCtx.type === "SELLER" && (
        <button
          style={{
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
          onClick={() => {
            setShowEditModal(true);
          }}
        >
          Edit Listing
        </button>
      )}
      <div className="row"></div>
      {userCtx.type === "BUYER" && (
        <button
          style={{
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
          onClick={() => {
            setShowEditModal(true);
          }}
        >
          Chat With Seller
        </button>
      )}
      {/* something here in jsx */}{" "}
      {isSuccess &&
        data.map((item) => {
          return (
            <SOMECOMPONENT
              key={item._id}
              id={item._id}
              //   and something else
            />
          );
        })}
    </div>
  );
};

export default Product;
