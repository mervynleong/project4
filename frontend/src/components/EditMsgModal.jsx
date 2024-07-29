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
  const [text_content, setText_content] = useState("");

  const { mutate: updateMsg } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/chat/update/" + props.chat_table_id,
        "PATCH",
        {
          text_content,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["individual_chat"]);
      props.setEditMsgModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Input Your Text Here:</div>
          <input
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            type="text"
            className="col-md-3"
            value={text_content}
            onChange={(event) => setText_content(event.target.value)}
          />
          <div className="col-md-3"></div>
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
            onClick={() => updateMsg()}
          >
            Update Message
          </button>
          <button
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            className="col-md-3"
            onClick={() => props.setEditMsgModal(false)}
          >
            Back to Message
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const EditMsgModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setEditMsgModal={props.setEditMsgModal}
          chat_table_id={props.chat_table_id}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default EditMsgModal;
