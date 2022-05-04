import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import cross from '../../assets/cross.png';
import cardimage from '../../assets/blue-wings.png';
import { useWeb3React } from '@web3-react/core';
import { useCharacter } from 'hooks/useCharacter';
import { useDispatch } from 'react-redux';
import useToast from 'hooks/useToast';
import tiers from '../../config/tier.json';
import { useTranslation } from 'contexts/Localization';
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
  overflow: hidden;
  display: grid;
`;

const CardRow = styled.div`
  display: block;
  justify-content: center;
  margin-top: 6rem;

  display: block;
  flex-direction: column;
`;
const shine = keyframes`
100% {
  left: 125%;
}
`;
const NFT = styled.div`
  border: 11px solid #1b202b;
  margin: 1rem;
  background: #1b202b;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:before {
    opacity: 0;
    position: absolute;
    top: 0;
    left: -75%;
    z-index: 2;
    display: hidden;
    content: '';
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

  &:before {
    opacity: 0;
    position: absolute;
    top: 0;
    left: -75%;
    z-index: 2;
    display: hidden;
    content: '';
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
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(null);
  const { toastSuccess, toastError } = useToast();
  const { t, currentLanguage } = useTranslation();
  const { locale } = currentLanguage;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!account) {
      return;
    }
    setLoading(true);
    //@todo fix cors issue
    getUserTokens().then((tokens) => {
      console.log(
        '🚀 ~ file: NFTCard.tsx ~ line 181 ~ getUserTokens ~ tokens',
        tokens
      );
      setLoading(false);
      if (!tokens) {
        return;
      }
      tokens = tokens
        .filter((token) => tiers[parseInt(token)])
        .map(async (token) => {
          console.log(
            '🚀 ~ file: NFTCard.tsx ~ line 192 ~ tokens=tokens.map ~ token',
            token
          );
          const filename = tiers[parseInt(token)]['name'];
          console.log(
            '🚀 ~ file: NFTCard.tsx ~ line 190 ~ tokens=tokens.map ~ filename',
            filename
          );

          return {
            image: await import(`../../assets/characters/${filename}`),
            id: token,
          };
        });
      Promise.all(tokens).then((results) => {
        console.log(
          '🚀 ~ file: NFTCard.tsx ~ line 201 ~ Promise.all ~ results',
          results
        );
        tokens = results;
        const chunkSize = 3;
        const chunks = [];
        for (let i = 0; i < tokens.length; i += chunkSize) {
          chunks.push(tokens.slice(i, i + chunkSize));
        }
        setTokens(chunks);
      });
    });
  }, [account]);

  const selectCharacter = (token: number) => {
    approveNFT(token).then((approve) => {
      if (!approve) {
        toastError('', t('Error Occurred'));
        return;
      }
      toastSuccess('', t('Approved'));
      enterGame(token).then((info) => {
        if (!info) {
          toastError('', t('Error Occurred'));
          return;
        }
        toastSuccess('', t('Success'));
        dispatch({
          type: 'characterSelected',
          token: token,
        });
      });
    });
  };
  if (loading == true) {
    return (
      <Container>
        <Title>{t('Fetching NFTs')}</Title>
      </Container>
    );
  }
  if (!tokens || !tokens.length) {
    return (
      <Container>
        <Title>
          {t('You do not have any NFT Tokens. Please Purchase at')}{' '}
          <a target={'_blank'} href="https://marketplace.monopolon.io/">
            https://marketplace.monopolon.io/
          </a>
        </Title>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <Title>{t('Select Character')}</Title>
        <CardContainer>
          {!loading &&
            tokens &&
            tokens.map((chunk) => {
              return (
                <Row>
                  {chunk.map((token) => {
                    console.log(
                      '🚀 ~ file: NFTCard.tsx ~ line 262 ~ {chunk.map ~ token',
                      token
                    );
                    const img = token['image']['default'];
                    return (
                      <>
                        <NFT
                          className="shine"
                          onClick={() => selectCharacter(token['id'])}
                        >
                          <ContentWrapper>
                            <Content>
                              {/* <Frame> */}
                              <CharacterImg src={img} />
                              {/* </Frame> */}
                            </Content>
                          </ContentWrapper>
                          {/* <Tag>Token {token}</Tag> */}

                          <Box>
                            <Text1>NFT {token['id']}</Text1>
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
