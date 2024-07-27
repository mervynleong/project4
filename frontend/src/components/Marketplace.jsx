import React from "react";
import UserContext from "../context/user";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ItemModal from "./ItemModal";

const Marketplace = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [buy_price, setBuy_price] = useState(null);
  const [sell_price, setSell_price] = useState("");
  const [item_uuid, setItem_uuid] = useState("");
  const [item_name, setItem_name] = useState("");
  const [status, setStatus] = useState("");
  const [seller_username, setSeller_username] = useState("");
  const [buyer_username, setBuyer_username] = useState("");
  const [showItemModal, setShowItemModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["item"],
    queryFn: async () =>
      await usingFetch("/product/all", "GET", undefined, userCtx.accessToken),
  });

  // const { mutate } = useMutation({
  //   mutationFn: async () =>
  //     await usingFetch(
  //       "/product/new",
  //       "PUT",
  //       { description, sell_price, item_name, status },
  //       userCtx.accessToken
  //     ),
  //   onSuccess: () => {
  //     setDescription("");
  //     setItem_name("");
  //     buyHandleChange();
  //     sellHandleChange();
  //     queryClient.invalidateQueries(["item"]);
  //   },
  // });

  if (buy_price === null) {
    setBuy_price(0);
  }

  // Handle input change and convert value to number
  const sellHandleChange = (e) => {
    // Parse the string to a number and update the state
    const value = e.target.value;
    const parsedValue = value === "" ? 0 : Number(value);

    // Ensure the parsedValue is a number and set it in the state
    if (!isNaN(parsedValue)) {
      setSell_price(parsedValue);
    }
  };

  // Handle input change and convert value to number
  const buyHandleChange = (e) => {
    // Parse the string to a number and update the state
    const value = e.target.value;
    const parsedValue = value === "" ? 0 : Number(value);

    // Ensure the parsedValue is a number and set it in the state
    if (!isNaN(parsedValue)) {
      setBuy_price(parsedValue);
    }
  };
  return (
    <>
      <div className="container">
        <h2>Items Available</h2>
        <div className="row">
          {/* <input
            type="text"
            value={item_name}
            placeholder="Item Name"
            className="col-md-3"
            onChange={(event) => setItem_name(event.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder="description"
            className="col-md-3"
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type="text"
            value={sell_price}
            placeholder="sell price"
            className="col-md-3"
            onChange={(event) => setSell_price(event.target.value)}
          />
          <input
            type="text"
            value={sell_price}
            placeholder="sell price"
            className="col-md-3"
            onChange={(event) => setSell_price(event.target.value)}
          />
          <input
            type="text"
            value={status}
            placeholder="status"
            className="col-md-3"
            onChange={(event) => setStatus(event.target.value)}
          /> */}
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
                setShowItemModal(true);
              }}
            >
              Add New Product?
            </button>
          )}
        </div>
        <br />

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
        </div>

        {showItemModal && (
          <ItemModal
            setShowItemModal={setShowItemModal}
            item_name={item_name}
            description={description}
            sell_price={sell_price}
            status={status}
          ></ItemModal>
        )}
      </div>
    </>
  );
};

export default Marketplace;
