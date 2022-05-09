import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useCharacter } from "hooks/useCharacter";
import { useDispatch } from "react-redux";
import useToast from "hooks/useToast";
import { useTranslation } from "contexts/Localization";
import axios from "axios";
const Container = styled.div`
  background: inherit;
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-top: 30px;
  width: 90%;
  margin: 10px auto;
`;

const Title = styled.div`
  color: white;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 24px;
  width: 100%;
  text-align: center;

  @media (max-width: 425px) {
    display: block;
    font-size: 25px;
  }
  @media (max-width: 768px) {
    display: block;
    font-size: 18px;
  }
`;

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
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 0 auto;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const CardContainer = styled.div`
  display: block;
  justify-content: center;

  display: block;
  flex-direction: column;
  overflow: hidden;
  display: grid;
`;

const shine = keyframes`
100% {
  left: 125%;
}
`;
const NFT = styled.div`
  border: 1px solid #1b202b;
  margin: 1rem;
  background: #1b202b;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  padding: 0.6rem;
  &:before {
    opacity: 0;
    position: absolute;
    top: 0;
    left: -75%;
    z-index: 2;
    display: hidden;
    content: "";
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.25) 100%
    );
    -webkit-transform: skewX(-25deg);
    transform: skewX(-25deg);
  }
  &:before {
    opacity: 1;
    -webkit-animation: shine 2s infinite;
    animation: ${shine} 2s infinite;
    /* delay: 1s; */
  }
  @media (max-width: 768px) {
    // width: 366px;
    margin: 0.4rem;
  }
  @media (max-width: 425px) {
    margin: 0.3rem;
  }
  cursor: pointer;
  // float: left;
`;
const Content = styled.div`
  width: auto;
  height: 100%;
  color: white;
`;
const Frame = styled.div`
  width: 300px;
  height: 100%;
  margin: auto;
  text-align: center;
  // margin-top: 1.5rem;
  padding: 5px;
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
  text-align: center;
`;
const Text2 = styled.div`
  font-family: Open Sans;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
`;
const Box = styled.div`
  color:white;
  margin-top: 15px;
  @media (max-width: 425px){
    margin-top: 35px;
}
}
`;
const ContentWrapper = styled.div`
  background: #0d0415;
  height: 188px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
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
  const { getUserTokens, enterGame, approveNFT } = useCharacter();
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(null);
  const { toastSuccess, toastError } = useToast();
  const { t, currentLanguage } = useTranslation();
  const { locale } = currentLanguage;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!account) {
      setLoading(false);
      return;
    }
    setLoading(true);
    //@todo fix cors issue
    getUserTokens().then((tokens) => {
      console.log(
        "🚀 ~ file: NFTCard.tsx ~ line 233 ~ getUserTokens ~ tokens",
        tokens
      );

      if (!tokens) {
        setLoading(false);
        return;
      }
      tokens = tokens.map(async (token) => {
      
        try {
          const resp = await axios.get(
            `https://marketplace.monopolon.io/api/nfts/tokenId/${token}`
          );
          const json = resp.data;
          const data = json.data[0];
          const tokenData = data.token;

          return {
            image: tokenData.ipfsUrl,
            id: token,
          };
        } catch (e) {
          console.log(
            "🚀 ~ file: NFTCard.tsx ~ line 253 ~ tokens=tokens.map ~ e",
            e,
            "Token: ",
            token
          );
          return {
            image: null,
            id: token,
          };
        }
      });

      Promise.all(tokens).then((results) => {
        tokens = results;
        const chunkSize = 3;
        const chunks = [];
        for (let i = 0; i < tokens.length; i += chunkSize) {
          chunks.push(tokens.slice(i, i + chunkSize));
        }
        setTokens(chunks);
        setLoading(false);
      });
    });
  }, [account]);

  const selectCharacter = (token: number) => {
    approveNFT(token).then((approve) => {
      if (!approve) {
        toastError("", t("Error Occurred"));
        return;
      }
      toastSuccess("", t("Approved"));
      enterGame(token).then((info) => {
        if (!info) {
          toastError("", t("Error Occurred"));
          return;
        }
        toastSuccess("", t("Success"));
        dispatch({
          type: "characterSelected",
          token: token,
        });
      });
    });
  };
  if (loading == true) {
    return (
      <Container>
        <Title>{t("Fetching NFTs")}</Title>
      </Container>
    );
  }
  if (!tokens || !tokens.length) {
    return (
      <Container>
        <TitlePurchase>
          {t("You do not have any NFT Tokens. Please Purchase at")}{" "}
          <a target={"_blank"} href="https://marketplace.monopolon.io/">
            https://marketplace.monopolon.io/
          </a>
        </TitlePurchase>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <Title>{t("Select Character")}</Title>
        <CardContainer>
          {!loading &&
            tokens &&
            tokens.map((chunk, i) => {
              return (
                <Row key={i}>
                  {chunk.map((token, j) => {
                    if (!token || !token.image) {
                      return <></>;
                    }
                    const img = token.image;
                    return (
                      <NFT onClick={() => selectCharacter(token["id"])} key={j}>
                        <ContentWrapper>
                          <Content>
                            <Frame>
                              <CharacterImg src={img} />
                            </Frame>
                          </Content>
                        </ContentWrapper>
                        {/* <Tag>Token {token}</Tag> */}

                        <Box>
                          <Text1>NFT {token["id"]}</Text1>
                          {/* <Text2>level</Text2> */}
                        </Box>
                      </NFT>
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
