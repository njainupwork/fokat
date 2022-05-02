import { useCountdown } from "hooks/useCountDown";
import styled from "styled-components";


const CountDownDiv = styled.div`
  height: 46px;
  line-height: 46px;
  color: #fff;
`;
const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <></>;
  } else {
    return (
      <CountDownDiv>
        {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </CountDownDiv>
    );
  }
};

export default CountdownTimer;
