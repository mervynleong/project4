import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "../css/Modal.module.css";

const OverLay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [text_content, setText_content] = useState("");

  const [errors, setErrors] = useState({
    text_content: "",
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/chat/new/" + props.item_uuid,
        "PUT",
        {
          text_content,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      props.setShowChatModal(false);
    },
  });

  const handleSubmit = () => {
    // Reset errors
    setErrors({
      text_content: "",
    });

    let isValid = true;
    let newErrors = {};

    if (!text_content) {
      newErrors.text_content = "A message is required to be able to proceed";
      isValid = false;
    } else if (text_content.length > 250) {
      newErrors.text_content =
        "Message must not be more than 250 characters long!";
      isValid = false;
    }

    if (isValid) {
      mutate();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2>Say something to your seller to Start</h2>
        <div className="row">
          <div className="col-md-3">To: {props.seller_username}</div>
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3">Regarding: {props.item_name}</div>
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3">Priced At: {props.sell_price}</div>
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3">Text Content: </div>
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
          {errors.text_content && (
            <div
              style={{
                padding: "5px",
                borderRadius: "15px",
                gap: "1px",
                backgroundColor: "black",
                color: "rgb(49, 238, 49)",
                textAlign: "center",
                width: "100%",
              }}
              className="col-md-3"
            >
              {errors.text_content}
            </div>
          )}
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
            onClick={handleSubmit}
          >
            Send Text
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
            onClick={() => props.setShowChatModal(false)}
          >
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const ChatModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowChatModal={props.setShowChatModal}
          item_uuid={props.item_uuid}
          item_name={props.item_name}
          seller_username={props.seller_username}
          sell_price={props.sell_price}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ChatModal;
