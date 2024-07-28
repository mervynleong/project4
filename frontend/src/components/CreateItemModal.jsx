import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "../css/Modal.module.css";

const OverLay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const [item_name, setItem_name] = useState(props.setItem_name);
  const [description, setDescription] = useState(props.setDescription);
  const [sell_price, setSell_price] = useState(props.setSell_price);
  const [status, setStatus] = useState(props.setStatus);

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/product/new",
        "PUT",
        {
          item_name,
          description,
          sell_price,
          status,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
      props.setShowItemModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Item Name:</div>
          <input
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            type="text"
            className="col-md-3"
            value={item_name}
            onChange={(event) => setItem_name(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Description: </div>
          <input
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            type="text"
            className="col-md-3"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Selling Price($):</div>
          <input
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            type="text"
            className="col-md-3"
            value={sell_price}
            onChange={(event) => setSell_price(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Status:</div>
          <select
            style={{
              padding: "5px",
              borderRadius: "15px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            className="col-md-3"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option
              style={{
                padding: "5px",
                borderRadius: "15px",
                backgroundColor: "rgb(49, 238, 49)",
                color: "black",
              }}
              value=""
            >
              Select Status
            </option>
            <option
              style={{
                padding: "5px",
                borderRadius: "15px",
                backgroundColor: "rgb(49, 238, 49)",
                color: "black",
              }}
              value="SOLD"
            >
              SOLD
            </option>
            <option
              style={{
                padding: "5px",
                borderRadius: "15px",
                backgroundColor: "rgb(49, 238, 49)",
                color: "black",
              }}
              value="AVAILABLE"
            >
              AVAILABLE
            </option>
          </select>
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <button
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            className="col-md-3"
            onClick={mutate}
          >
            Add Item for Sale
          </button>
          <button
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            className="col-md-3"
            onClick={() => props.setShowItemModal(false)}
          >
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const CreateItemModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowItemModal={props.setShowItemModal}
          item_name={props.setItem_name}
          description={props.setDescription}
          sell_price={props.setSell_price}
          status={props.status}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CreateItemModal;
