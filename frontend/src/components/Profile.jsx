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
import { useQuery } from "@tanstack/react-query";
import Modal from "./Modal";

// const queryClient = useQueryClient();
const Profile = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [preferred_location, setPreferred_location] = useState("");
  const [interest, setInterest] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => await usingFetch("/auth/getUser", userCtx.accessToken),
    onSuccess: () => {
      // queryClient.invalidateQueries(["auth"]);
    },
  });

  useEffect(() => {});

  return (
    <>
      <div className="container">
        <h2>User Profile</h2>
        <div className="row">
          {/* <input
            type="text"
            value={preferred_location}
            placeholder="preferred_location"
            className="col-md-3"
            onChange={(event) => setPreferred_location(event.target.value)}
          />
          <input
            type="text"
            value={interest}
            placeholder="interest"
            className="col-md-3"
            onChange={(event) => setInterest(event.target.value)}
          /> */}
          <button
            className="col-md-3"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Update Info
          </button>
        </div>
        <div className="row">
          <div className="col-md-3">Username</div>
          <div className="col-md-2">{userCtx.username}</div>
          <div className="col-md-3">Account Type</div>
          <div className="col-md-2">{userCtx.type}</div>
          <div className="col-md-3">Preferred Location</div>
          <div className="col-md-2">{preferred_location}</div>
          <div className="col-md-3">Interest</div>
          <div className="col-md-2">{interest}</div>
        </div>

        {showModal && (
          <Modal
            setShowModal={setShowModal}
            interest={interest}
            preferred_location={preferred_location}
          ></Modal>
        )}
      </div>
    </>
  );
};

export default Profile;
