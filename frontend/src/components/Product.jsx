import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useState, useEffect, useContext } from "react";
import UpdateModal from "./UpdateModal";

const Product = (props) => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/product/product" + props.item_uuid, // endpoint
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
          {props.item_name}
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
          {props.description}
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
          {props.sell_price}
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
          {props.status}
        </div>
      </div>
      <div className="row">
        {userCtx.type === "BUYER" && (
          <button
            style={{
              padding: "2px",
              borderRadius: "10px",
              gap: "5px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
            onClick={() => {
              setShowChatModal(true);
            }}
          >
            Chat With Seller to Purchase
          </button>
        )}
        {userCtx.type === "SELLER" && (
          <button
            style={{
              padding: "2px",
              borderRadius: "10px",
              gap: "5px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
            onClick={() => {
              setShowUpdateModal(true);
            }}
          >
            Edit Listing
          </button>
        )}
      </div>
      <br></br>

      <div className="row"></div>

      <UpdateModal
        showUpdateModal={showUpdateModal}
        item_name={props.item_name}
        description={props.description}
        sell_price={props.sell_price}
        status={props.sell_price}
      />
    </div>
  );
};

export default Product;
