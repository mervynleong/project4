import React from "react";
import UserContext from "../context/user";
import {
  useState,
  useContext,
  useEffect,
  useMutation,
  useQueryClient,
} from "react";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [preferred_location, setPreferred_location] = useState("");
  const [interest, setInterest] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () =>
      await usingFetch("/auth/", undefined, undefined, userCtx.accessToken),
  });

  const mutation = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/auth/update",
        "PATCH",
        { preferred_location, interest },
        userCtx.accessToken
      ),
    onSuccess: () => {
      setPreferred_location("");
      setInterest("");
      queryClient.invalidateQueries(["auth"]);
    },
  });

  useEffect(() => {
    if (data) {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setType(decoded.type);
    }
  }, [data]);
  return <div>Hello</div>;
};

export default Profile;
