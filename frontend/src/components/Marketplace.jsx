import React from "react";
import UserContext from "../context/user";
import { useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery} from "@tanstack/react-query";
import CreateItemModal from "./CreateItemModal";
import Product from "./Product";

const Marketplace = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [sell_price, setSell_price] = useState("");
  const [item_name, setItem_name] = useState("");
  const [status, setStatus] = useState("");
  const [showItemModal, setShowItemModal] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["item"],
    queryFn: async () =>
      await usingFetch("/product/all", "GET", undefined, userCtx.accessToken),
  });

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
