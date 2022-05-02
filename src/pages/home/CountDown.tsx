import { useCountdown } from "hooks/useCountDown";
import styled from "styled-components";
import ScheduleSvg from "../../assets/whiteclock.png";

const CountDownDiv = styled.div`
  height: 46px;
  line-height: 46px;
  color: #fff;
  font-size: 24px;
`;

const Image = styled.img`
  vertical-align: middle;
  margin-right: 5px;
  width: 32px;
  height: 32px;
`;
const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <></>;
  } else {
    return (
      <CountDownDiv>
        <Image src={ScheduleSvg} />
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </CountDownDiv>
    );
  }
};

export default CountdownTimer;
