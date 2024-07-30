import React from "react";
import ReactDOM from "react-dom";
import styles from "../css/Modal.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useContext } from "react";

const OverLay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () =>
      await usingFetch(
        "/chat/userInfo/" + props.item_uuid,
        "GET",
        undefined,
        userCtx.accessToken
      ),
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Interest</div>
          <div className="col-md-3">{data && data[0].seller_interest}</div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Preferred Location</div>
          <div className="col-md-3">
            {data && data[0].seller_preferred_location}
          </div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <button
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            className="col-md-3"
            onClick={() => props.setCheckUserModal(false)}
          >
            Close This Window
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const UserModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setCheckUserModal={props.setCheckUserModal}
          item_uuid={props.item_uuid}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UserModal;
