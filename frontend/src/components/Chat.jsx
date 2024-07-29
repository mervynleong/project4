import React from "react";
import UserContext from "../context/user";
import { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
        <h2
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
        >
          Select One Item to Open Chat
        </h2>
        <h3
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
        >
          You are: {userCtx.username}
        </h3>
        <h3
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
        >
          Your Role Is: {userCtx.type}
        </h3>
        <div className="row"></div>
        <br />

        {isFetching && <h1>Loading...</h1>}

        {isError && <div>{error.message}</div>}

        {isSuccess &&
          data.data.map((item, index) => {
            return (
              <UserChat
                index={index.index}
                chat_table_id={item.chat_table_id}
                item_name={item.item_name}
                item_uuid={item.item_uuid}
                sell_price={item.sell_price}
                status={item.status}
              />
            );
          })}
      </div>
    </>
  );
};

export default Chat;
