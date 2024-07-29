import React from "react";
import UserContext from "../context/user";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserChat from "./UserChat";

const Chat = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["chat"],
    queryFn: async () =>
      await usingFetch(
        "/chat/allToUser/",
        "GET",
        undefined,
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["chat"]);
    },
  });
  return (
    <>
      <div className="container">
        <h2>Select One User to Chat with</h2>
        <div className="row"></div>
        <br />

        {isFetching && <h1>Loading...</h1>}

        {isError && <div>{error.message}</div>}

        {isSuccess &&
          data.data.map((item, index) => {
            return <UserChat index={index.index} />;
          })}
        {/* 
        {showItemModal && (
          <CreateItemModal
            setShowItemModal={setShowItemModal}
            item_name={item_name}
            description={description}
            sell_price={sell_price}
            status={status}
          ></CreateItemModal>
        )} */}
      </div>
    </>
  );
};

export default Chat;
