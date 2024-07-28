import React from "react";
import UserContext from "../context/user";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CreateItemModal from "./CreateItemModal";
import Product from "./Product";

const Marketplace = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [buy_price, setBuy_price] = useState("");
  const [sell_price, setSell_price] = useState("");
  const [item_uuid, setItem_uuid] = useState("");
  const [item_name, setItem_name] = useState("");
  const [status, setStatus] = useState("");
  const [seller_username, setSeller_username] = useState("");
  const [buyer_username, setBuyer_username] = useState("");
  const [showItemModal, setShowItemModal] = useState(false);

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

  // if (buy_price === null) {
  //   setBuy_price(0);
  // }

  // // Handle input change and convert value to number
  // const sellHandleChange = (e) => {
  //   // Parse the string to a number and update the state
  //   const value = e.target.value;
  //   const parsedValue = value === "" ? 0 : Number(value);

  //   // Ensure the parsedValue is a number and set it in the state
  //   if (!isNaN(parsedValue)) {
  //     setSell_price(parsedValue);
  //   }
  // };

  // // Handle input change and convert value to number
  // const buyHandleChange = (e) => {
  //   // Parse the string to a number and update the state
  //   const value = e.target.value;
  //   const parsedValue = value === "" ? 0 : Number(value);

  //   // Ensure the parsedValue is a number and set it in the state
  //   if (!isNaN(parsedValue)) {
  //     setBuy_price(parsedValue);
  //   }
  // };
  return (
    <>
      <div className="container">
        <h2>Items Available</h2>
        <div className="row">
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

        {isFetching && <h1>Loading...</h1>}

        {isError && <div>{error.message}</div>}

        {isSuccess &&
          data.data.map((item, index) => {
            return (
              <Product
                index={index.index}
                item_name={item.item_name}
                description={item.description}
                sell_price={item.sell_price}
                status={item.status}
                item_uuid={item.item_uuid}
                seller_username={item.seller_username}
                buyer_username={item.buyer_username}
                buy_price={item.buy_price}
              />
            );
          })}

        {showItemModal && (
          <CreateItemModal
            setShowItemModal={setShowItemModal}
            item_name={item_name}
            description={description}
            sell_price={sell_price}
            status={status}
          ></CreateItemModal>
        )}
      </div>
    </>
  );
};

export default Marketplace;
