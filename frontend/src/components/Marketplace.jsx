import React from "react";
import UserContext from "../context/user";
import {
  useState,
  useContext,
  useEffect,
  useMutation,
  useQueryClient,
} from "react";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import ItemModal from "./ItemModal";

const Marketplace = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [buy_price, setBuy_price] = useState(null);
  const [sell_price, setSell_price] = useState(0);
  const [item_uuid, setItem_uuid] = useState("");
  const [item_name, setItem_name] = useState("");
  const [status, setStatus] = useState("");
  const [seller_username, setSeller_username] = useState("");
  const [buyer_username, setBuyer_username] = useState("");
  const [showItemModal, setShowItemModal] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["item"],
    queryFn: async () =>
      await usingFetch(
        "/product/all",
        undefined,
        undefined,
        userCtx.accessToken
      ),
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/product/new",
        "PUT",
        { description, sell_price, item_name, status },
        userCtx.accessToken
      ),
    onSuccess: () => {
      setDescription("");
      setItem_name("");
      buyHandleChange();
      sellHandleChange();
      queryClient.invalidateQueries(["item"]);
    },
  });

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
          <input
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
          />
          <button
            className="col-md-3"
            onClick={() => {
              setShowItemModal(true);
            }}
          >
            Add New Product?
          </button>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3">Item Name</div>
          <div className="col-md-2"></div>
          <div className="col-md-3">Description</div>
          <div className="col-md-2"></div>
          <div className="col-md-3">Sell Price</div>
          <div className="col-md-2"></div>
          <div className="col-md-3">Status</div>
          <div className="col-md-2"></div>
        </div>

        {showItemModal && (
          <ItemModal
            setShowModal={setShowItemModal}
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
