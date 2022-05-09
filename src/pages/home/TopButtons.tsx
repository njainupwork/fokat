import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import music from "../../assets/Music.mp3";
import ValumeUp from "../../assets/volumeup.png";
import { Button, IconButton } from "@kenjiwb/uikit";
import Volume1 from "../../assets/volume-teal.png";
import moment from "moment";
// import "../home/styles.css";
// import "./styles.css"
import Volume from "../home/volume1.png";
import Grid from "Grid";
import { useDiceRoll } from "hooks/useRoll";
import { useWeb3React } from "@web3-react/core";
import UnlockButton from "components/UnlockButton";
import { useDispatch, useSelector } from "react-redux";
import { State } from "state/types";
import Web3 from "web3";
import PopupCard from "pages/Modal-Popup/PopupCard";
import myinventry from "../../assets/myinventry.png";
import myequipment from "../../assets/equipment.png";
import NFTCard from "pages/NFT-Popup/NFTCard";
import useToast from "hooks/useToast";
import { useTranslation } from "contexts/Localization";
import { useCharacter } from "hooks/useCharacter";
import CountdownTimer from "./CountDown";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const MyEquipmentButton = styled.button`
  width: 211px;
  height: 46px;
  background: #0d0c0c;
  color: #00c2ff;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  border: 2px solid #00c2ff;
`;
const MyInventryButton = styled.button`
  width: 211px;
  height: 46px;
  background: #0d0c0c;
  color: #00c2ff;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  margin: 0px 10px;
  border: 2px solid #00c2ff;
`;

const DiceRollButton = styled(Button)`
  min-width: 100px;
  background: #0d0c0c;
  color: #00c2ff;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  margin: 0px 10px;
  border: 2px solid #00c2ff;
  padding: 5px 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 143px 0px;
  margin-right: 2rem;
  @media (max-width: 425px) {
    margin: 28px;
    margin: 60px 0px;
  }

  position: absolute;
  z-index: 999999999999999999999999999;
  right: 0;
  border: none;
`;

const RollButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 40px 0px;
  margin-right: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 425px) {
    margin: 28px;
  }

  position: absolute;
  z-index: 999999999999999999999999999;
  right: 0;
  bottom: 0;
  border: none;
`;

const HoverDiv = styled.div`
  display: block;
  flex-direction: row;
  justify-content: center;
  margin: 143px 0px;
  margin-right: 2rem;
  @media (max-width: 425px) {
    margin: 28px;
  }

  position: absolute;
  z-index: 999999999999999999999999999;
  left: 10px;
  border: none;

  background: #000;
  padding: 15px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
`;
const SoundButton = styled.button`
  width: 211px;
  height: 46px;
  background: #0d0c0c;
  color: #00c2ff;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  border: 2px solid #00c2ff;
  @media (max-width: 425px) {
    width: 122px;
  }
`;
interface SelectorProps {
  camera: any;
  dice: any;
  gridPosition: number;
  hover: number;
  characterSelected: number;
}

function selector(state: State): SelectorProps {
  console.log("state_state1", state);
  return state.game;
}

function usePrevious(value) {
  const ref = useRef(-1);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const TopButtons: React.FC = () => {
  const { account } = useWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [audio] = useState(new Audio(music));
  const [playing, setPlaying] = useState(false);
  const [rewards, setRewards] = useState("");
  const [received, setReceived] = useState("");
  const [txId, setTx] = useState(null);
  const [rolling, setRolling] = useState(false);

  const [cam, setCam] = useState("grid");
  const { onDiceRoll, getPosition, getReward } = useDiceRoll();
  const { dice, hover, characterSelected } = useSelector(selector);
  const { t } = useTranslation();
  const { isEntered, getUserTokens, exitGame } = useCharacter();

  let time = "";
  let rollingAt = "";

  const { nextDiceRoll, diceAvailable } = dice;
  if (nextDiceRoll > 0 && parseInt(diceAvailable) <= 1) {
    const t = moment(nextDiceRoll * 1000);

    if (t.diff(moment()) > 0) {
      time = t.local().fromNow();
      rollingAt = t.local().format("HH:mm");
      time = `You can roll the dice ${time}`;
    }
  }

  // const playAudio = () => {
  //   audio.play();
  // };
  const toggle = () => {
    setPlaying(!playing);
  };
  const getAndDispatchPosition = async (showToast = false) => {
    getPosition().then(async (tx) => {
      const entered = await isEntered();
      console.log("🚀 ~ file: TopButtons.tsx ~ line 195 ~ getPosition ~ entered", entered)
      if (!tx || !entered) {
        dispatch({
          type: "userInfos",
          diceAvailable: 0,
          nextDiceRoll: 0,
          gridPosition: -1,
          characterSelected: -1,
          roll1: 1,
          roll2: 1,
        });
        return;
      }

      dispatch({
        type: "userInfos",
        diceAvailable: tx[1],
        nextDiceRoll: tx[2],
        gridPosition: tx[0],
        characterSelected: tx[3] && entered ? tx[3] : -1,
        roll1:
          tx[4] && tx[4].length == 2 && parseInt(tx[4][0]) != 0
            ? parseInt(tx[4][0])
            : 1,
        roll2:
          tx[4] && tx[4].length == 2 && parseInt(tx[4][0]) != 0
            ? parseInt(tx[4][1])
            : 1,
      });
      if (showToast) {
        const move = parseInt(tx[4][0]) + parseInt(tx[4][1]);
        toastSuccess(`Successful, move ${move} number of grid`);

        getRewards(tx[0]).then((eth) => {
          setReceived(eth);
        });
      }
    });
  };
  window.onload = () => {
    if (playing === false) {
      audio.play();
    } else if (playing === true) {
      audio.pause();
    }
  };
  useEffect(() => {
    playing ? audio.pause() : audio.play();
  }, [playing]);
  const prevAccount = usePrevious(account);
  useEffect(() => {
    if (account) {
      getAndDispatchPosition();
    }
  }, [account]);
  useEffect(() => {
    //if user switches account reset game
    if (!account || (prevAccount && prevAccount.toString() !== account)) {
      dispatch({
        type: "resetGame",
      });
      return;
    }
    if (characterSelected == -1) {
      return;
    }
    getAndDispatchPosition();
  }, [account, characterSelected]);
  const closePopupCard = () => {
    setReceived("");
  };
  const getRewards = (num: number) => {
    return getReward(num).then((rewards) => {
      if (!rewards) {
        return;
      }
      const etherValue = Web3.utils.fromWei(rewards.toString(), "ether");

      return etherValue;
    });
  };
  useEffect(() => {
    if (hover == -1) {
      setRewards("");
      return;
    }

    getRewards(hover).then((eth) => {
      setRewards(eth);
    });
  }, [hover]);
  const dispatch = useDispatch();
  const changeCam = () => {
    let newCam = "grid";

    if (cam == "grid") {
      newCam = "character";
    } else if (cam == "character") {
      newCam = "region";
    }
    dispatch({
      type: "changeCam",
      cameraType: newCam,
    });
    setCam(newCam);
  };
  const handleRoll = () => {
    toastSuccess("", t("Rolling dice. Please be patient"));
    setRolling(true);
    onDiceRoll().then((tx) => {
      setRolling(false);
      if (!tx) {
        toastError("Error", t("Transaction Failed."));
        return;
      }

      setTx(tx.transactionHash);
      getAndDispatchPosition(true);
    });
  };

  const handleExitGame = () => {
    
    confirmAlert({
      title: t("Confirm Exit"),
      message: t("Are you sure to do delete."),
      buttons: [
        {
          label: t("Yes"),
          onClick: () => {
            toastSuccess("", t("Exiting Game"));
            console.log('characterSelected', characterSelected)
            exitGame(characterSelected).then((tx) => {
              if (!tx) {
                toastError("Error", t("Failed to exit game"));
                return;
              }
              toastSuccess("", t("Game exited"))
              dispatch({
                type: "resetGame",
              });
              return;
            });
          },
        },
        {
          label: t("No"),
          onClick: () => {},
        },
      ],
    });
    
  };
  console.log("characterSelected_characterSelected", characterSelected);
  if (characterSelected == -1 || !characterSelected) {
    return <NFTCard />;
  }
  return (
    <>
      {hover != -1 ? (
        <HoverDiv>
          <h3>{t("Grid Info")}</h3>
          <p>
            {t(rewards)} MGM {t("tokens")}
          </p>
        </HoverDiv>
      ) : (
        ""
      )}
      <ButtonBox>
        {playing ? (
            <SoundButton onClick={toggle}>
              <img
                src={Volume1}
                alt="Volume1"
                style={{ width: "30px", height: "auto" }}
              />
            </SoundButton>
          ) : (
            <IconButton className="icon-btn" onClick={toggle}>
              <img
                src={ValumeUp}
                alt={t("Valume Up")}
                style={{ width: "30px", height: "auto" }}
              />
            </IconButton>
          )}
        {/* <MyEquipmentButton>
          <img src={myequipment} alt="myequipment" style={{ width: "32px" }} />
        </MyEquipmentButton>
        <MyInventryButton>
          <img src={myinventry} alt="myinventry" style={{ width: "32px" }} />
        </MyInventryButton> */}
      </ButtonBox>
      <Grid />
      <RollButton>
        <DiceRollButton onClick={changeCam}>
          {t("Change Camera")}
        </DiceRollButton>
        {account ? (
          <>
            <DiceRollButton
              onClick={handleRoll}
              title={time}
              disabled={time !== "" || rolling}
            >
              {time && <CountdownTimer targetDate={nextDiceRoll * 1000} />}
              {!time && (rolling ? t("rolling") : t("Roll"))}
            </DiceRollButton>
            <DiceRollButton onClick={handleExitGame}>
              {t("Exit Game")}
            </DiceRollButton>
          </>
        ) : (
          <UnlockButton />
        )}
      </RollButton>
      {received != "" && (
        <PopupCard
          closePopup={closePopupCard}
          txId={txId}
          received={received}
        />
      )}

      {/* <Grid /> */}
    </>
  );
};
export default TopButtons;
