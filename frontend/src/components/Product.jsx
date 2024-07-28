import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useState, useContext } from "react";
import UpdateModal from "./UpdateModal";
import ChatModal from "./ChatModal";

const Product = (props) => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const { mutate: deleteListing } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/product/" + props.item_uuid, // endpoint
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
          Sold By:
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          {props.seller_username}
        </div>
        <div className="row"></div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          Item Name:
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
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
          Description:
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
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
          Sell Price:
        </div>

        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
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
          Status:
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          {props.status}
        </div>
        <div className="row"></div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          Price Bought At:
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-md-3"
        >
          {props.buy_price ? props.buy_price : "This item is not bought yet"}
        </div>
      </div>
      <div className="row">
        {props.status === "AVAILABLE" && userCtx.type === "BUYER" && (
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
              console.log("hello");
            }}
          >
            Chat With Seller to Purchase
          </button>
        )}
        {userCtx.type === "SELLER" && (
          <div className="row">
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
                deleteListing();
              }}
            >
              Delete listing
            </button>
          </div>
        )}
      </div>
      <br></br>

      <div className="row"></div>

      {/* <ChatModal
        setShowChatModal={setShowChatModal}
        item_name={props.item_name}
        sell_price={props.sell_price}
        item_uuid={props.item_uuid}
        seller_username={props.seller_username}
      /> */}

      {/* <UpdateModal
        setShowUpdateModal={setShowUpdateModal}
        item_name={props.item_name}
        description={props.description}
        sell_price={props.sell_price}
        status={props.sell_price}
        item_uuid={props.item_uuid}
      /> */}
    </div>
  );
};

export default Product;
