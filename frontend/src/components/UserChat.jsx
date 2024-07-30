import React from "react";
import { useState } from "react";
import IndivChatModal from "./IndivChatModal";
import UserModal from "./UserModal";

const UserChat = (props) => {
  const [showIndivChatModal, setShowIndivChatModal] = useState(false);
  const [checkUserModal, setCheckUserModal] = useState(false);

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            style={{
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
          >
            Item Name:
          </div>
          <div
            style={{
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
          >
            {props.item_name}
          </div>
          <div className="row"></div>
          <div
            style={{
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
          >
            Selling Price for Item:
          </div>
          <div
            style={{
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
          >
            {props.sell_price}
          </div>
          <div className="row"></div>
          <div
            style={{
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
          >
            Status of Item
          </div>
          <div
            style={{
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
          >
            {props.status}
          </div>
          <div className="row"></div>
          <button
            style={{
              padding: "2px",
              borderRadius: "10px",
              gap: "5px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
            onClick={() => {
              setShowIndivChatModal(true);
            }}
          >
            Chat With Person Regarding This Item
          </button>
          <div className="row"></div>
        </div>
        <div className="col-md-3">
          <button
            style={{
              padding: "5px",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              textAlign: "center",
            }}
            onClick={() => {
              setCheckUserModal(true);
            }}
          >
            Check Seller's Details
          </button>
        </div>
        <br></br>

        <div className="row"></div>

        {showIndivChatModal && (
          <IndivChatModal
            key={props.index}
            setShowIndivChatModal={setShowIndivChatModal}
            item_uuid={props.item_uuid}
            item_name={props.item_name}
            sell_price={props.sell_price}
            buy_price={props.buy_price}
            status={props.status}
          />
        )}

        {checkUserModal && (
          <UserModal
            setCheckUserModal={setCheckUserModal}
            item_uuid={props.item_uuid}
          />
        )}
      </div>
    </>
  );
};

export default UserChat;
