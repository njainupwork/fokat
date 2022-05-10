import React from "react"
import styled from "styled-components"
import { Button } from "@kenjiwb/uikit"
import { useTranslation } from "contexts/Localization"

const Container = styled.div`
  background: inherit;
  border: none;
  height: 100%;
  border-radius: 10px;
  margin-top: 30px;
  width: 90%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  row-gap: 80px;
  align-items: center;
  justify-content: center;
`

const TitlePurchase = styled.div`
  color: white;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 24px;
  width: 90%;
  text-align: center;

  @media (max-width: 425px) {
    display: block;
  }
  @media (max-width: 768px) {
    display: block;
    font-size: 18px;
  }
  margin: 0 auto;
`

interface ExitGameProps {
  handleClick: React.Dispatch<React.SetStateAction<boolean>>
}

const ExitGamePopup: React.FC<ExitGameProps> = ({ handleClick }) => {
  const { t } = useTranslation()
  return (
    <>
      <Container>
        <TitlePurchase>
          {t(
            "Please Exit game , We are migrating our Monopolon V2 Board at 18:00 Hrs GMT+8"
          )}
        </TitlePurchase>
        <Button
          onClick={() => {
            handleClick(false)
          }}
        >
          Next
        </Button>
      </Container>
    </>
  )
}

export const ExitGamePopup2: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Container>
        <TitlePurchase>
          {t(
            "You Cannot enter into the game right now. We are migrating our Monopolon V2 Board at 18:00 Hrs GMT+8"
          )}
        </TitlePurchase>
      </Container>
    </>
  )
}

export const ExitGamePopup3: React.FC<ExitGameProps> = ({ handleClick }) => {
  const { t } = useTranslation()
  return (
    <>
      <Container>
        <TitlePurchase>
          {t(
            "Visit v1.monopolon.io, if you have not exited game from monopolon board v1 already"
          )}
          <a href="https://v1.monopolon.io">Click here</a>
        </TitlePurchase>
        <Button
          onClick={() => {
            handleClick(false)
            localStorage.setItem("exitgamePopup", "false")
          }}
        >
          Confirm
        </Button>
      </Container>
    </>
  )
}
export default ExitGamePopup
