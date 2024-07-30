import React from "react";
import ReactDOM from "react-dom";
import styles from "../css/Modal.module.css";

const OverLay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Interest</div>
          <div className="col-md-3">{props.interest}</div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Preferred Location</div>
          <div className="col-md-3">{props.preferred_location}</div>
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
          interest={props.interest}
          preferred_location={props.preferred_location}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UserModal;
