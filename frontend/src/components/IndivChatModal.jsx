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
  //   const [description, setDescription] = useState(props.description);
  //   const [sell_price, setSell_price] = useState(props.sell_price);
  //   const [item_name, setItem_name] = useState(props.item_name);
  //   const [status, setStatus] = useState(props.status);

  const { mutate: replyChat } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/chat/reply/" + props.item_uuid, // endpoint
        "PUT", // method
        undefined, //body
        userCtx.accessToken // accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["individual_chat"]);
    },
  });

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["individual_chat"],
    queryFn: async () =>
      await usingFetch(
        "/chat/all/" + props.item_uuid,
        "GET",
        undefined,
        userCtx.accessToken
      ),
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(["individaul_chat"]);
    //   },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3"></div>
          <h1
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
              textAlign: "center",
            }}
          >
            Please Modify Your Information
          </h1>
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

const IndivChatModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowIndivChatModal={props.setShowIndivChatModal}
          chat_table_id={props.chat_table_id}
          item_uuid={props.item_uuid}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default IndivChatModal;