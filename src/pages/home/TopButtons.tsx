import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import music from "../../assets/Music.mp3"
import ValumeUp from "../../assets/volumeup.png"
import { Button, IconButton } from "@kenjiwb/uikit"
import Volume1 from "../../assets/volume-teal.png"
import moment from "moment"
// import "../home/styles.css";
// import "./styles.css"
import Volume from "../home/volume1.png"
import Grid from "Grid"
import { useDiceRoll } from "hooks/useRoll"
import { useWeb3React } from "@web3-react/core"
import UnlockButton from "components/UnlockButton"
import { useDispatch, useSelector } from "react-redux"
import { State } from "state/types"
import Web3 from "web3"
import PopupCard from "pages/Modal-Popup/PopupCard"
import myinventry from "../../assets/myinventry.png"
import myequipment from "../../assets/equipment.png"
import NFTCard from "pages/NFT-Popup/NFTCard"
import useToast from "hooks/useToast"
import { useTranslation } from "contexts/Localization"
import { useCharacter } from "hooks/useCharacter"
import CountdownTimer from "./CountDown"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { ExitGamePopup3 } from "pages/ExitGame-Popup"

import "./app.css"
import { Fragment } from "react"
import Unity, { UnityContext } from "react-unity-webgl"

interface Vector2 {
  x: number
  y: number
}

// This is the context that Unity will use to communicate with the React app.
const unityContext = new UnityContext({
  productName: "React Unity WebGL Tests",
  companyName: "Jeffrey Lanters",
  // The url's of the Unity WebGL runtime, these paths are public and should be
  // accessible from the internet and relative to the index.html.
  loaderUrl: "unitybuild/2020.1/WebGL.loader.js",
  dataUrl: "unitybuild/2020.1/WebGL.data",
  frameworkUrl: "unitybuild/2020.1/WebGL.framework.js",
  codeUrl: "unitybuild/2020.1/WebGL.wasm",
  streamingAssetsUrl: "unitybuild/2020.1/streamingassets",
  // Additional configuration options.
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
})

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
`
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
`

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
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 143px 0px;
  margin-right: 2rem;
  @media (max-width: 425px) {
    margin: 28px;
    margin: 60px 10px;
  }

  position: absolute;
  z-index: 999999999999999999999999999;
  right: 0;
  border: none;
`

const RollButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 40px 0px;
  margin-right: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 425px) {
    margin: 28px;
    margin-top: 60px;
  }

  position: absolute;
  z-index: 999999999999999999999999999;
  right: 0;
  bottom: 0;
  border: none;
`

const HoverDiv = styled.div`
  display: block;
  flex-direction: row;
  justify-content: center;
  margin: 143px 0px;
  margin-right: 2rem;

  position: absolute;
  z-index: 999999999999999999999999999;
  left: 10px;
  border: none;

  background: #000;
  padding: 15px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  @media (max-width: 425px) {
    margin: 0px;
    top: 100px;
    padding: 5px;
  }
`
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
`
interface SelectorProps {
  camera: any
  dice: any
  gridPosition: number
  hover: number
  characterSelected: number
}

function selector(state: State): SelectorProps {
  console.log("state_state1", state)
  return state.game
}

function usePrevious(value) {
  const ref = useRef(-1)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const TopButtons: React.FC = () => {
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const [audio] = useState(new Audio(music))
  const [playing, setPlaying] = useState(false)
  const [rewards, setRewards] = useState("")
  const [received, setReceived] = useState("")
  const [txId, setTx] = useState(null)
  const [rolling, setRolling] = useState(false)
  const [exitPopUp, setExitPopUp] = useState(
    localStorage.getItem("exitgamePopup") === null
  )

  // Unity

  const [isUnityMounted, setIsUnityMounted] = useState<boolean>(true)
  const [rotationSpeed, setRotationSpeed] = useState<number>(30)
  const [cubeRotation, setCubeRotation] = useState<number>(0)
  const [clickPosition, setClickPosition] = useState<Vector2>({ x: 0, y: 0 })
  const [saidMessage, setSaidMessage] = useState<string>("Nothing")
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [progression, setProgression] = useState<number>(0)

  // When the component is mounted, we'll register some event listener.
  useEffect(() => {
    unityContext.on("canvas", handleOnUnityCanvas)
    unityContext.on("progress", handleOnUnityProgress)
    unityContext.on("loaded", handleOnUnityLoaded)
    unityContext.on("RotationDidUpdate", handleOnUnityRotationDidUpdate)
    unityContext.on("ClickedPosition", handleOnUnityClickedPosition)
    unityContext.on("Say", handleOnUnitySayMessage)
    // When the component is unmounted, we'll unregister the event listener.
    return function () {
      unityContext.removeAllEventListeners()
    }
  }, [])

  // When the rotation speed has been updated, it will be sent to Unity.
  useEffect(() => {
    unityContext.send("MeshCrate", "SetRotationSpeed", rotationSpeed)
  }, [rotationSpeed])

  // Built-in event invoked when the Unity canvas is ready to be interacted with.
  function handleOnUnityCanvas(canvas: HTMLCanvasElement) {
    canvas.setAttribute("role", "unityCanvas")
  }

  // Built-in event invoked when the Unity app's progress has changed.
  function handleOnUnityProgress(progression: number) {
    setProgression(progression)
  }

  // Built-in event invoked when the Unity app is loaded.
  function handleOnUnityLoaded() {
    setIsLoaded(true)
  }

  // Custom event invoked when the Unity app sends a message indicating that the
  // rotation has changed.
  function handleOnUnityRotationDidUpdate(degrees: number) {
    setCubeRotation(Math.round(degrees))
  }

  // Custom event invoked when the Unity app sends a message indicating that the
  // mouse click position has changed.
  function handleOnUnityClickedPosition(x: number, y: number) {
    setClickPosition({ x, y })
  }

  // Custom event invoked when the Unity app sends a message including something
  // it said.
  function handleOnUnitySayMessage(message: string) {
    setSaidMessage(message)
  }

  const [cam, setCam] = useState("grid")
  const { onDiceRoll, getPosition, getReward } = useDiceRoll()
  const { dice, hover, characterSelected } = useSelector(selector)
  const { t } = useTranslation()
  const { isEntered, getUserTokens, exitGame } = useCharacter()

  let time = ""
  let rollingAt = ""

  const { nextDiceRoll, diceAvailable } = dice
  if (nextDiceRoll > 0 && parseInt(diceAvailable) <= 1) {
    const t = moment(nextDiceRoll * 1000)

    if (t.diff(moment()) > 0) {
      time = t.local().fromNow()
      rollingAt = t.local().format("HH:mm")
      time = `You can roll the dice ${time}`
    }
  }

  // const playAudio = () => {
  //   audio.play();
  // };
  const toggle = () => {
    setPlaying(!playing)
  }
  const getAndDispatchPosition = async (showToast = false) => {
    getPosition().then(async (tx) => {
      const entered = await isEntered()
      console.log(
        "🚀 ~ file: TopButtons.tsx ~ line 195 ~ getPosition ~ entered",
        entered,
        tx
      )
      if (!tx || !entered) {
        dispatch({
          type: "userInfos",
          diceAvailable: 0,
          nextDiceRoll: 0,
          gridPosition: -1,
          characterSelected: -1,
          roll1: 1,
          roll2: 1,
        })
        return
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
      })
      if (showToast) {
        const move = parseInt(tx[4][0]) + parseInt(tx[4][1])
        toastSuccess(`Successful, move ${move} number of grid`)

        getRewards(tx[0]).then((eth) => {
          setReceived(eth)
        })
      }
    })
  }
  window.onload = () => {
    if (playing === false) {
      audio.play()
    } else if (playing === true) {
      audio.pause()
    }
  }
  useEffect(() => {
    playing ? audio.pause() : audio.play()
  }, [playing])
  const prevAccount = usePrevious(account)
  useEffect(() => {
    if (account) {
      getAndDispatchPosition()
    }
  }, [account])
  useEffect(() => {
    //if user switches account reset game
    if (!account || (prevAccount && prevAccount.toString() !== account)) {
      dispatch({
        type: "resetGame",
      })
      return
    }
    if (characterSelected == -1) {
      return
    }
    getAndDispatchPosition()
  }, [account, characterSelected])
  const closePopupCard = () => {
    setReceived("")
  }
  const getRewards = (num: number) => {
    return getReward(num).then((rewards) => {
      if (!rewards) {
        return
      }
      const etherValue = Web3.utils.fromWei(rewards.toString(), "ether")

      return etherValue
    })
  }
  useEffect(() => {
    if (hover == -1) {
      setRewards("")
      return
    }

    getRewards(hover).then((eth) => {
      setRewards(eth)
    })
  }, [hover])
  const dispatch = useDispatch()
  const changeCam = () => {
    let newCam = "grid"

    if (cam == "grid") {
      newCam = "character"
    } else if (cam == "character") {
      newCam = "region"
    }
    dispatch({
      type: "changeCam",
      cameraType: newCam,
    })
    setCam(newCam)
  }
  const handleRoll = () => {
    toastSuccess("", t("Rolling dice. Please be patient"))
    setRolling(true)
    onDiceRoll().then((tx) => {
      setRolling(false)
      if (!tx) {
        toastError("Error", t("Transaction Failed."))
        return
      }

      setTx(tx.transactionHash)
      getAndDispatchPosition(true)
    })
  }

  const handleExitGame = () => {
    confirmAlert({
      title: t("Confirm Exit"),
      message: t("Are you sure to do exit game?"),
      buttons: [
        {
          label: t("Yes"),
          onClick: () => {
            toastSuccess("", t("Exiting Game"))
            console.log("characterSelected", characterSelected)
            exitGame(characterSelected).then((tx) => {
              if (!tx) {
                toastError("Error", t("Failed to exit game"))
                return
              }
              toastSuccess("", t("Game exited"))
              setTimeout(() => {
                dispatch({
                  type: "resetGame",
                })
              }, 2000)
              return
            })
          },
        },
        {
          label: t("No"),
          onClick: () => {},
        },
      ],
    })
  }
  console.log("characterSelected_characterSelected", characterSelected)
  if (exitPopUp) {
    return <ExitGamePopup3 handleClick={setExitPopUp} />
  }
  if (characterSelected == -1 || !characterSelected) {
    return <NFTCard />
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
      {isUnityMounted === true && (
        <Fragment>
          <div className="unity-container">
            {/* The loading screen will be displayed here. */}
            {isLoaded === false && (
              <div className="loading-overlay">
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: progression * 100 + "%" }}
                  />
                </div>
              </div>
            )}
            {/* The Unity app will be rendered here. */}
            <Unity className="unity-canvas" unityContext={unityContext} />
          </div>
          {/* Displaying some output values */}
        </Fragment>
      )}
      {received != "" && (
        <PopupCard
          closePopup={closePopupCard}
          txId={txId}
          received={received}
        />
      )}

      {/* <Grid /> */}
    </>
  )
}
export default TopButtons
