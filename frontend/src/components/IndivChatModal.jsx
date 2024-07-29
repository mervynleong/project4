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
  const [text_content, setText_content] = useState("");
  //   const [sell_price, setSell_price] = useState(props.sell_price);
  //   const [item_name, setItem_name] = useState(props.item_name);
  //   const [status, setStatus] = useState(props.status);

  const { mutate: replyChat } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/chat/reply/" + props.item_uuid, // endpoint
        "PUT", // method
        { text_content }, //body
        userCtx.accessToken // accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["individual_chat"]);
      setText_content("");
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
            <br></br>
            <div className="col-md-3">{props.item_name}</div>
            <div className="col-md-2">Priced At ($):</div>
            <div className="col-md-1">{props.sell_price}</div>
            <div className="col-md-2">Item Status:</div>
            <div className="col-md-2">{props.status}</div>
            <br></br>
            <br></br>
            {isFetching && <h1>Loading...</h1>}
            {isError && <div>{error.message}</div>}
            {isSuccess &&
              data.data.map((item, index) => {
                return (
                  <>
                    <div key={index} className="row"></div>
                    <div className="col-md-3">From: </div>
                    <div
                      style={{
                        padding: "5px",
                        borderRadius: "15px",
                        gap: "1px",
                        backgroundColor: "rgb(49, 238, 49)",
                        color: "black",
                        textAlign: "center",
                      }}
                      className="col-md-3"
                    >
                      {item.from_who}
                    </div>
                    <div className="col-md-3">To: </div>
                    <div
                      style={{
                        padding: "5px",
                        borderRadius: "15px",
                        gap: "1px",
                        backgroundColor: "rgb(49, 238, 49)",
                        color: "black",
                        textAlign: "center",
                      }}
                      className="col-md-3"
                    >
                      {item.to_who}
                    </div>
                    <div className="col-md-3">Message: </div>
                    <div
                      style={{
                        padding: "5px",
                        borderRadius: "15px",
                        gap: "1px",
                        backgroundColor: "rgb(49, 238, 49)",
                        color: "black",
                        textAlign: "center",
                        width: "100%",
                      }}
                      className="col-md-3"
                    >
                      {item.text_content}
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-2">Time Stamp:</div>
                    <div className="col-md-4">{item.timestamp}</div>
                    <div className="col-md-3"></div>
                    <div className="col-md-5">
                      <button
                        style={{
                          padding: "1px",
                          borderRadius: "5px",
                          backgroundColor: "rgb(49, 238, 49)",
                          color: "black",
                          textAlign: "center",
                        }}
                        chat_table_id={item.chat_table_id}
                        onClick={() => console.log("hello")}
                      >
                        Delete This Message?
                      </button>
                    </div>
                    <div className="col-md-5">
                      <button
                        style={{
                          padding: "1px",
                          borderRadius: "5px",
                          backgroundColor: "rgb(49, 238, 49)",
                          color: "black",
                          textAlign: "center",
                        }}
                        chat_table_id={item.chat_table_id}
                        onClick={() => console.log("hello")}
                      >
                        Edit This Message?
                      </button>
                    </div>
                    <br></br>
                    <br></br>
                  </>
                );
              })}
            <br></br>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">Put Your Text Here:</div>
            <input
              style={{
                padding: "5px",
                borderRadius: "15px",
                gap: "1px",
                backgroundColor: "rgb(49, 238, 49)",
                color: "black",
                width: "100%",
              }}
              type="text"
              className="col-md-3"
              value={text_content}
              onChange={(event) => setText_content(event.target.value)}
            />
            <div className="col-md-3"></div>
          </div>
          <br></br>

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
          item_name={props.item_name}
          sell_price={props.sell_price}
          status={props.status}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default IndivChatModal;
