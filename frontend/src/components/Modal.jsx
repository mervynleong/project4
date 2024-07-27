import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "../css/Modal.module.css";

const OverLay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const [preferred_location, setPreferred_location] = useState(
    props.preferred_location
  );
  const [interest, setInterest] = useState(props.interest);

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/auth/update",
        "PATCH",
        {
          interest,
          preferred_location,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
      props.setShowModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Interest</div>
          <input
            type="text"
            className="col-md-3"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Preferred Location</div>
          <input
            type="text"
            className="col-md-3"
            value={preferred_location}
            onChange={(event) => setPreferred_location(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <button className="col-md-3" onClick={mutate}>
            Update Info
          </button>
          <button
            className="col-md-3"
            onClick={() => props.setShowModal(false)}
          >
            cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowModal={props.setShowModal}
          preferred_location={props.preferred_location}
          interest={props.interest}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Modal;
