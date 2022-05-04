import React from "react";
import { useTheme } from "styled-components";
import { Heading } from "@kenjiwb/uikit";
import getThemeValue from "utils/getThemeValue";
import {
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalContainer,
  ModalCloseButton,
  ModalBackButton,
} from "./styles";
import { ModalProps } from "./types";

const Modal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "24px",
  headerBackground = "transparent",
  minWidth = "320px",

  ...props
}: ModalProps) => {
  const theme = useTheme();
  return (
    <ModalContainer minWidth={minWidth} {...props}>
      <ModalHeader
        background={getThemeValue(
          `colors.${headerBackground}`,
          headerBackground
        )(theme)}
      >
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Heading>{title}</Heading>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default Modal;
