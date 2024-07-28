import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "../css/Modal.module.css";

const OverLay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [description, setDescription] = useState(props.description);
  const [sell_price, setSell_price] = useState(props.sell_price);
  const [item_name, setItem_name] = useState(props.item_name);
  const [status, setStatus] = useState(props.status);

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/product/updateItem/" + props.item_uuid,
        "PATCH",
        {
          description,
          sell_price,
          item_name,
          status,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      props.setShowUpdateModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3"></div>
          <h1>Please Modify Your Information</h1>
          <br></br>
          <div className="col-md-3"></div>
          <div className="col-md-3">Item Name: </div>
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
          <div className="col-md-3">Selling Price: </div>
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
            Update Info
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
            onClick={() => props.setShowUpdateModal(false)}
          >
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowUpdateModal={props.setShowUpdateModal}
          item_name={props.item_name}
          description={props.description}
          sell_price={props.sell_price}
          status={props.sell_price}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
