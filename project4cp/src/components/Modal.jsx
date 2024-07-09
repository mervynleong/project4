import React from "react";
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

  const { mutate: someFunction } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "endpoint here" + props.id, // if needed
        "method here",
        {
          // body here
        },
        userCtx.accessToken // if needed
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["something"]);
      props.setShowModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Title</div>
          <input
            type="text"
            className="col-md-3"
            value={something}
            onChange={(event) => setSomething(event.target.value)}
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <button className="col-md-3" onClick={someFunction}>
            somefunction
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
        <OverLay setShowModal={props.setShowModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Modal;
