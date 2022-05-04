import React from "react";
import styled from "styled-components";
// import { BoxProps } from "@kenjiwb/uikit";
import { Flex, Box, IconButton } from "@kenjiwb/uikit";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
// import {  Handler } from "./types";
import { ModalProps, InjectedProps } from "./types";

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: #161522;
  font-family: "DM Sans", -apple-system, system-ui, -apple-system, Segoe UI,
    Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont,
    "Helvetica Neue", "Helvetica", sans-serif;
  // border-bottom: 1px solid rgba(248, 209, 47, 1);
  border-bottom: 1px solid rgb(32,34,49);
  display: flex;
  padding: 12px 24px;
`;

export const ModalTitle = styled(Flex)`
  font-family: "DM Sans", -apple-system, system-ui, -apple-system, Segoe UI,
    Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont,
    "Helvetica Neue", "Helvetica", sans-serif;
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  font-family: "DM Sans", -apple-system, system-ui, -apple-system, Segoe UI,
    Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont,
    "Helvetica Neue", "Helvetica", sans-serif;
  flex-direction: column;
`;

export const ModalCloseButton: React.FC<{
  onDismiss: ModalProps["onDismiss"];
}> = ({ onDismiss }: InjectedProps) => {
  return (
    <IconButton
      variant="text"
      onClick={onDismiss}
      aria-label="Close the dialog"
    >
      {/* <CloseIcon color=" rgba(248, 209, 47, 1)" /> */}
      <CloseIcon color=" #fff" />

    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({
  onBack,
}) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="rgba(248, 209, 47, 1)" />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: #161522;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1),
    0px 1px 1px rgba(0, 0, 0, 0.05);
  // border: 1px solid #feef03;
  border: 1px solid rgb(32,34,49/1);


  border-radius: 22px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};

  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`;
