import React from 'react';
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const Modal = (props) => {
    return (
        <>
        {ReactDOM.createPortal(
          <OverLay
          />,
          document.querySelector("#modal-root")
        )}
      </>
    );
};

export default Modal;