import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cross from "../../assets/cross.png";
import cardimage from "../../assets/blue-wings.png";
import { useWeb3React } from "@web3-react/core";
import { useCharacter } from "hooks/useCharacter";
import { useDispatch } from "react-redux";
import useToast from "hooks/useToast";

const Container = styled.div`
  background: inherit;
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-top: 30px;
`;
const CrossContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background: white;
  border-radius: 10px;
`;
const Title = styled.div`
  color: white;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 35px;
  width: 100%;
  text-align: center;

  @media (max-width: 425px) {
    display: block;
  }
`;

const CardContainer = styled.div`
  display: block;
  justify-content: center;

  display: block;
  flex-direction: column;
  overflow: scroll;
  display: grid;
`;

const CardRow = styled.div`
  display: block;
  justify-content: center;
  margin-top: 6rem;

  display: block;
  flex-direction: column;
`;
const NFT = styled.div`
  border: 11px solid #1b202b;
  width: 404px;
  height: 335px;
  margin: 1rem;
  background: #1b202b;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 366px;
    margin: 0.4rem;
  }
  @media (max-width: 425px) {
    margin: 0.3rem;
  }
  cursor: pointer;
  // float: left;
`;
const Content = styled.div`
  width: 380px;
  height: 100%;
  color: white;
`;
const Frame = styled.div`
  width: 300px;
  height: 100%;
  margin: auto;
  text-align: center;
  // margin-top: 1.5rem;
`;
const Text1 = styled.div`
  color: white;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  margin: 2px;
  @media (max-width: 425px) {
    font-size: 16px;
  }
`;
const Text2 = styled.div`
  font-family: Open Sans;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
`;
const Box = styled.div`
  color:white;
  margin-top: 30px;
  @media (max-width: 425px){
    margin-top: 35px;
}
}
`;
const ContentWrapper = styled.div`
  background: white;
  height: 188px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const Row = styled.div`
  width: auto;
    align-items: center;
    display: flex;
    margin: auto;
    @media (max-width: 768px) {
    display: block;
    }
}
`;
const Tag = styled.div`
  border: 3px solid #f6cb31;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  width: 77px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f6cb31;
  position: relative;
  margin-top: -3pc;
  margin-left: 9px;
  background-image: linear-gradient(
    90deg,
    #020024 0%,
    #090979 15%,
    #f6cb31 150%
  );
  @media (max-width: 425px) {
    width: 55px;
    height: 20px;
  }
`;

const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;

const CharacterImg = styled.img`
  max-height: 100%;
`;

const NFTCard: React.FC = () => {
  const { account } = useWeb3React();
  const { getUserTokens, enterGame } = useCharacter();
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(null);
  const { toastSuccess, toastError } = useToast();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!account) {
      return;
    }

    console.log("fetching....");
    setLoading(true);
    //@todo fix cors issue
    setTimeout(() => {
      getUserTokens().then((tokens) => {
        setLoading(false);
        const chunkSize = 3;
        const chunks = [];
        for (let i = 0; i < tokens.length; i += chunkSize) {
          chunks.push(tokens.slice(i, i + chunkSize));
        }
        setTokens(chunks);
        console.log(
          "🚀 ~ file: NFTCard.tsx ~ line 148 ~ useEffect ~ tokens",
          chunks
        );
      });
    }, 3500);
  }, [account]);
  const selectCharacter = (token: number) => {
    console.log(
      "🚀 ~ file: NFTCard.tsx ~ line 182 ~ selectCharacter ~ token",
      token
    );
    enterGame(token).then((info) => {
      console.log("🚀 ~ file: NFTCard.tsx ~ line 180 ~ enterGame ~ info", info);
      if (!info) {
        toastError("", "An error occurred!");
        return;
      }
      toastSuccess("", "Success.");
      dispatch({
        type: "characterSelected",
        token: token,
      });
    });
  };
  if (loading == true) {
    return (
      <Container>
        <Title>Fetching NFTs</Title>
      </Container>
    );
  }
  if (!tokens || !tokens.length) {
    return (
      <Container>
        <Title>You do not have any NFT Tokens</Title>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <Title>Select Characters</Title>
        <CardContainer>
          {!loading &&
            tokens &&
            tokens.map((chunk) => {
              return (
                <Row>
                  {chunk.map((token) => {
                    return (
                      <>
                        <NFT onClick={() => selectCharacter(token)}>
                          <ContentWrapper>
                            <Content>
                              <Frame>
                                <CharacterImg src={cardimage} />
                              </Frame>
                            </Content>
                          </ContentWrapper>
                          {/* <Tag>Token {token}</Tag> */}

                          <Box>
                            <Text1>NFT {token}</Text1>
                            {/* <Text2>level</Text2> */}
                          </Box>
                        </NFT>
                      </>
                    );
                  })}
                </Row>
              );
            })}
        </CardContainer>
      </Container>
    </>
  );
};
export default NFTCard;
