import React from "react";
import UserContext from "../context/user";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  });
  return <div>bye</div>;
};

export default Chat;
