import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cross from "../../assets/cross.png";
import cardimage from "../../assets/content.jpeg";
import { useWeb3React } from "@web3-react/core";
import { useCharacter } from "hooks/useCharacter";
import { useDispatch } from "react-redux";
const Container = styled.div`
  background: black;
  border: 1px solid white;
  width: 1019px;
  height: 653px;
  border-radius: 10px;
  margin: auto;
  @media (max-width: 425px) {
    height: 930px;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;
const CrossContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background: black;
  border-radius: 10px;
`;
const Title = styled.div`
  color: white;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 35px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    margin-right: 200px;
  }
  @media (max-width: 425px) {
    margin-left: 71px;
    display: flex;
    justify-content: flex-start;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  @media (max-width: 768px) {
    width: 50%;
    display: flex;
    justify-content: flex-start;
  }
  @media (max-width: 425px) {
    width: 65%;
    display: flex;
    justify-content: flex-start;
  }
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
    width: 30%;
    margin: 0.3rem;
  }
  cursor: pointer;
`;
const Content = styled.div`
  width: 380px;
  height: 49px;
  color: white;
`;
const Frame = styled.div`
  width: 300px;
  height: 245px;
  margin: auto;
  margin-top: 1.5rem;
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
  background: black;
  height: 188px;
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

const NFTCard: React.FC = () => {
  const { account } = useWeb3React();
  const { getUserTokens } = useCharacter();
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(null);
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
        setTokens(tokens);
        console.log(
          "🚀 ~ file: NFTCard.tsx ~ line 148 ~ useEffect ~ tokens",
          tokens
        );
      });
    }, 3500);
  }, [account]);
  const selectCharacter = (token: number) => {
    dispatch({
      type: "characterSelected",
      token: token,
    });
  };
  if (loading == true) {
    return (
      <Container>
        <CrossContainer>
          <img src={cross} alt="" style={{ width: "30px" }} />
        </CrossContainer>
        <Title>Fetching Tokens</Title>
      </Container>
    );
  }
  if (!tokens || !tokens.length) {
    return (
      <Container>
        <CrossContainer>
          <img src={cross} alt="" style={{ width: "30px" }} />
        </CrossContainer>
        <Title>You do not have any NFT Tokens</Title>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <CrossContainer>
          <img src={cross} alt="" style={{ width: "30px" }} />
        </CrossContainer>

        <Title>Select Characters</Title>
        <CardContainer>
          {!loading &&
            tokens &&
            tokens.map((token, index) => {
              return (
                <>
                  {index % 2 == 0 && <Break />}
                  <NFT onClick={() => selectCharacter(token)}>
                    <ContentWrapper>
                      <Content>
                        <Frame>
                          <img src={cardimage} alt="" className="card-image" />
                        </Frame>
                      </Content>
                    </ContentWrapper>
                    <Tag>Token {token}</Tag>

                    <Box>
                      <Text1>NFT &nbsp; Details</Text1>
                      <Text2>level</Text2>
                    </Box>
                  </NFT>
                </>
              );
            })}
        </CardContainer>
      </Container>
    </>
  );
};
export default NFTCard;
