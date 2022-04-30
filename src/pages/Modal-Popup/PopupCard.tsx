import React from "react";
import styled from "styled-components";
import mgmicon from "../../assets/MGM.png";
import cross from "../../assets/cross.png";
import { useTranslation } from "contexts/Localization";

const CardContainer = styled.div`
  background: black;
  border: 1px solid white;
  width: 580px;
  height: 432px;
  border-radius: 10px;
  margin: auto;
  @media (max-width: 425px) {
    width: 367px;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ViewButton = styled.button`
  width: 211px;
  height: 46px;
  background: #0d0c0c;
  color: #00c2ff;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  border: 1px solid #00c2ff;
  margin: 1rem;
  border-radius: 10px;
`;
const CloseButton = styled.button`
  background-color: rgb(0, 194, 255);
  width: 211px;
  height: 46px;
  color: white;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  border: 1px solid #00c2ff;
  border-radius: 10px;
`;

const CrossButton = styled.button`
  width: 50px;
  height: 30px;
  border:transparent;
  color:black:
  display: flex;
  border: none;
  background: transparent;
  color: white;
  
 `;
const CrossContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background: black;
  border-radius: 10px;
`;
const Text = styled.div`
  width: 86px;
  height: 25px;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: white;
`;
const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`;
const TextLine = styled.div`
  color: #d6d6d6;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
`;
const TextBox = styled.div`
  display: flex;
`;

interface Props {
  closePopup: any;
  txId: any;
  received: any;
}

const PopupCard: React.FC<Props> = ({ closePopup, txId, received }) => {
  const {t} = useTranslation();
  return (
    <>
      <CardContainer>
        <CrossContainer onClick={closePopup}>
          {/* <CrossButton>X</CrossButton> */}
          <img src={cross} alt="cross" style={{ width: "30px" }} />
        </CrossContainer>
        <Wrapper>
          <Text>{t("rewards")}</Text>
          <img src={mgmicon} alt="mgmicon" style={{ width: "215px" }} />
          <TextBox>
            <TextLine>{t("Received Tokens")} {received}&nbsp;</TextLine>
            <TextLine>MGM {t("tokens")} </TextLine>
          </TextBox>
        </Wrapper>
        <ButtonContainer>
          <ViewButton
            onClick={() =>
              window.open(`https://testnet.bscscan.com/tx/${txId}`, "_blank")
            }
          >
            {t("View Transaction")}
          </ViewButton>
          <CloseButton onClick={closePopup}>{t("close")}</CloseButton>
        </ButtonContainer>
      </CardContainer>
    </>
  );
};
export default PopupCard;
