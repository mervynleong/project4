import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useState, useEffect, useContext } from "react";

const Display = () => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["something here"],
    queryFn: async () =>
      await usingFetch(
        "some endpoint",
        undefined,
        undefined,
        userCtx.accessToken
      ),
  });

  const { mutation } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "some endpoint",
        "some method",
        { someBody },
        userCtx.accessToken // if needed
      ),
    onSuccess: () => {
      // set state here
      queryClient.invalidateQueries(["something here"]);
    },
  });
  return <div>Hello</div>;
};

export default Display;
