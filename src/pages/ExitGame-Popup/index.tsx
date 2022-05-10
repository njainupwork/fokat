import React from "react"
import styled from "styled-components"
import { Button } from "@kenjiwb/uikit"

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
  return (
    <>
      <Container>
        <TitlePurchase>
          Please Exit game , We are migrating our Monopolon V2 Board at 18:00
          Hrs GMT+8
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
  return (
    <>
      <Container>
        <TitlePurchase>
          You Cannot enter into the game right now. We are migrating our
          Monopolon V2 Board at 18:00 Hrs GMT+8
        </TitlePurchase>
      </Container>
    </>
  )
}
export default ExitGamePopup
