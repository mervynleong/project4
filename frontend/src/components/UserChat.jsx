import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useState, useContext } from "react";

const UserChat = (props) => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const [showIndivChatModal, setShowIndivChatModal] = useState(false);

  const { mutate: replyChat } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/chat/reply/" + props.item_uuid, // endpoint
        "PUT", // method
        undefined, //body
        userCtx.accessToken // accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["chat"]);
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
            From Who:
          </div>
          <div
            style={{
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-md-3"
          >
            {props.from_who}
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
        </div>
        <br></br>

        <div className="row"></div>

        {/* {showChatModal && (
          <ChatModal
            setShowChatModal={setShowChatModal}
            item_name={props.item_name}
            sell_price={props.sell_price}
            item_uuid={props.item_uuid}
            seller_username={props.seller_username}
          />
        )}

        {showUpdateModal && (
          <UpdateModal
            setShowUpdateModal={setShowUpdateModal}
            item_name={props.item_name}
            description={props.description}
            sell_price={props.sell_price}
            status={props.sell_price}
            item_uuid={props.item_uuid}
          />
        )} */}
      </div>
    </>
  );
};

export default UserChat;
