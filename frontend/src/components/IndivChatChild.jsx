import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import EditMsgModal from "./EditMsgModal";

const IndivChatChild = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const [editMsgModal, setEditMsgModal] = useState(false);

  const { mutate: deleteMsg } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/chat/delete/" + props.chat_table_id, // endpoint
        "DELETE", // method
        undefined, //body
        userCtx.accessToken // accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["individual_chat"]);
    },
  });

  const { mutate: checkUser } = useMutation({
    mutationFn: async () =>
      usingFetch(
        "/chat/delete/" + props.chat_table_id, // endpoint
        "DELETE", // method
        undefined, //body
        userCtx.accessToken // accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["individual_chat"]);
    },
  });

  return (
    <>
      <>
        <div className="row"></div>
        <div className="col-md-3">From:</div>
        <div
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "rgb(49, 238, 49)",
            color: "black",
            textAlign: "center",
          }}
          className="col-md-3"
        >
          {props.from_who}
        </div>
        <div className="col-md-3">To:</div>
        <div
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "rgb(49, 238, 49)",
            color: "black",
            textAlign: "center",
          }}
          className="col-md-3"
        >
          {props.to_who}
        </div>
        <div className="col-md-3">Message: </div>
        <div
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "rgb(49, 238, 49)",
            color: "black",
            textAlign: "center",
            width: "100%",
          }}
          className="col-md-3"
        >
          {props.text_content}
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-2">Time Stamp:</div>
        <div className="col-md-4">{props.timestamp}</div>
        <div className="col-md-3"></div>
        <div className="col-md-5">
          <button
            style={{
              padding: "1px",
              borderRadius: "5px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
              textAlign: "center",
            }}
            chat_table_id={props.chat_table_id}
            onClick={() => deleteMsg()}
          >
            Delete This Message?
          </button>
        </div>
        <div className="col-md-5">
          <button
            style={{
              padding: "1px",
              borderRadius: "5px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
              textAlign: "center",
            }}
            chat_table_id={props.chat_table_id}
            onClick={() => setEditMsgModal(true)}
          >
            Edit This Message?
          </button>
          <button
            style={{
              padding: "1px",
              borderRadius: "5px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
              textAlign: "center",
            }}
            // chat_table_id={props.chat_table_id}
            onClick={() => console.log("hello")}
          >
            Check User Details
          </button>
        </div>
        <br></br>
        <br></br>

        {editMsgModal && (
          <EditMsgModal
            setEditMsgModal={setEditMsgModal}
            chat_table_id={props.chat_table_id}
          />
        )}
      </>
    </>
  );
};

export default IndivChatChild;
