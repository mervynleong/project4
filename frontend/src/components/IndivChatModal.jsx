import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "../css/Modal.module.css";
import IndivChatChild from "./IndivChatChild";

const OverLay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const [text_content, setText_content] = useState("");
  const [buy_price, setBuy_price] = useState(0);

  const [errors, setErrors] = useState({
    text_content: "",
  });

  const [priceError, setPriceError] = useState({
    buy_price: "",
  });

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

  const { mutate: buyItem } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/product/buyItem/" + props.item_uuid, // endpoint
        "PATCH", // method
        { buy_price }, //body
        userCtx.accessToken // accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["item"]);
      props.setShowIndivChatModal(false);
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
      replyChat();
    } else {
      setErrors(newErrors);
    }
  };

  const priceHandleSubmit = () => {
    // Reset errors
    setPriceError({
      buy_price: 0,
    });

    let isValid = true;
    let newErrors = {};

    if (!buy_price) {
      newErrors.buy_price = "An agreed Buying Price is required!";
      isValid = false;
    } else if (isNaN(Number(buy_price)) || Number(buy_price) <= 0) {
      newErrors.buy_price = "Buying Price must be a valid positive number!";
      isValid = false;
    }

    if (isValid) {
      buyItem();
    } else {
      setPriceError(newErrors);
    }
  };

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
              data &&
              data.data.map((item, index) => {
                return (
                  <>
                    <IndivChatChild
                      key={index}
                      from_who={item.from_who}
                      to_who={item.to_who}
                      text_content={item.text_content}
                      timestamp={item.timestamp}
                      chat_table_id={item.chat_table_id}
                    />
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
          <div className="row"></div>
          <br></br>
          <br></br>
          {userCtx.type === "BUYER" && props.status === "AVAILABLE" && (
            <div className="row">
              <div className="col-md-3">Price Agreen On ($):</div>
              <input
                style={{
                  padding: "5px",
                  borderRadius: "15px",
                  gap: "1px",
                  backgroundColor: "rgb(49, 238, 49)",
                  color: "black",
                }}
                type="text"
                className="col-sm-3"
                placeholder="price agreed on"
                value={buy_price}
                onChange={(e) => {
                  setBuy_price(e.target.value);
                }}
              />
              <button
                style={{
                  padding: "5px",
                  borderRadius: "15px",
                  gap: "1px",
                  backgroundColor: "rgb(49, 238, 49)",
                  color: "black",
                }}
                className="col-md-2"
                onClick={priceHandleSubmit}
              >
                Click To Buy
              </button>
              {priceError.buy_price && (
                <div
                  style={{
                    padding: "5px",
                    borderRadius: "15px",
                    gap: "1px",
                    backgroundColor: "black",
                    color: "rgb(49, 238, 49)",
                    textAlign: "center",
                  }}
                  className="col-md-3"
                >
                  {priceError.buy_price}
                </div>
              )}
            </div>
          )}
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
          key={props.key}
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
