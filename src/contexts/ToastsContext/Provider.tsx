import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

toast.configure();
export const ToastsContext = createContext({
  toastInfo: null,
  toastSuccess: null,
  toastError: null,
  toastWarning: null,
});
type Props = {
  children: JSX.Element;
};

const Toast = ({ title, description }) => (
  <div>
    <StyledTitle>{title}</StyledTitle>
    <StyledDescription>{description}</StyledDescription>
  </div>
);

export const ToastsProvider: React.FC<Props> = ({ children }: Props) => {
  const toastError = (title: string, description?: string) => {
    return toast.error(<Toast title={title} description={description} />);
  };
  const toastInfo = (title: string, description?: string) => {
    return toast.info(<Toast title={title} description={description} />);
  };
  const toastSuccess = (title: string, description?: string) => {
    return toast.success(<Toast title={title} description={description} />);
  };
  const toastWarning = (title: string, description?: string) => {
    return toast.warning(<Toast title={title} description={description} />);
  };

  return (
    <ToastsContext.Provider
      value={{
        toastError,
        toastInfo,
        toastSuccess,
        toastWarning,
      }}
    >
      {children}
      <ToastContainer hideProgressBar />
    </ToastsContext.Provider>
  );
};

const StyledTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  @media (max-width: 767px) {
    font-size: 10px;
  }
`;

const StyledDescription = styled.div`
  font-size: 12px;
  @media (max-width: 767px) {
    font-size: 7px;
  }
`;
