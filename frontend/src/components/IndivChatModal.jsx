import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
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
    onSuccess: () => {
      queryClient.invalidateQueries(["individual_chat"]);
    },
  });

  return (
    <>
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
              Chat Box with Regards to:
            </h1>
            <div className="row"></div>
            <div className="col-md-3">{props.item_name}</div>
            <div className="col-md-3">{props.sell_price}</div>
            <div className="col-md-3">{props.status}</div>
            {isFetching && <h1>Loading...</h1>}
            {isError && <div>{error.message}</div>}
            {isSuccess &&
              data.data.map((item, index) => {
                return (
                  <>
                    <div key={index} className="row"></div>
                    <div className="col-md-3">From: </div>
                    <div className="col-md-3">{item.from_who}</div>
                    <div className="col-md-3">To: </div>
                    <div className="col-md-3">{item.to_who}</div>
                    <div className="col-md-3">Message</div>
                    <div className="col-md-3">{item.text_content}</div>
                    <div className="col-md-3">Time Stamp</div>
                    <div className="col-md-3">{item.timestamp}</div>
                  </>
                );
              })}
            <br></br>
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
              onClick={replyChat}
            >
              Send Message
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
              onClick={() => props.setShowIndivChatModal(false)}
            >
              Close This Chat
            </button>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
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
