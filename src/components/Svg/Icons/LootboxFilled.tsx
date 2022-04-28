import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 300 300" {...props}>
      <defs>
        <style>{`.cls-1{fill:#fff;}.cls-2{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;stroke:url(#linear-gradient);}.cls-3{fill:url(#linear-gradient-2);}.cls-4{fill:url(#linear-gradient-3);}`}</style>
        <linearGradient id="linear-gradient" x1="10" y1="150" x2="290" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3e473a" />
          <stop offset="0.18" stopColor="#71723b" />
          <stop offset="0.38" stopColor="#a39d3c" />
          <stop offset="0.57" stopColor="#cbbf3c" />
          <stop offset="0.74" stopColor="#e8d73d" />
          <stop offset="0.89" stopColor="#f9e63d" />
          <stop offset="1" stopColor="#ffeb3d" />
        </linearGradient>
        <linearGradient id="linear-gradient-2" x1="58.24" y1="150" x2="241.76" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffeb3d" />
          <stop offset="0.11" stopColor="#f9e63d" />
          <stop offset="0.26" stopColor="#e8d73d" />
          <stop offset="0.43" stopColor="#cbbf3c" />
          <stop offset="0.62" stopColor="#a39d3c" />
          <stop offset="0.82" stopColor="#71723b" />
          <stop offset="1" stopColor="#3e473a" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-3"
          x1="179.31"
          y1="170.89"
          x2="187.69"
          y2="170.89"
          xlinkHref="#linear-gradient-2"
        />
      </defs>
      <circle className="cls-1" cx="150" cy="150" r="150" />
      <circle className="cls-2" cx="150" cy="150" r="135" />
      <path
        className="cls-3"
        d="M241.76,147.86c0-4.36-1.49-6-5.93-6.12a16.52,16.52,0,0,1-8.35-2.75,189.59,189.59,0,0,1-16.22-12.32,8.49,8.49,0,0,1-2.83-5.57c-.24-13.46-.19-26.92-.08-40.38,0-3.81-1.16-5.71-5.3-5.7-36.65.1-73.3-.23-109.93.24C71,75.55,54,98.55,59.18,120.07c4.1,17,15.24,26.55,32.76,29.92v5.29c0,21.2.07,42.4-.06,63.6,0,4.26,1.24,6.13,5.82,6.12q69.11-.17,138.22,0c4.55,0,5.86-1.83,5.84-6.12Q241.58,183.38,241.76,147.86Zm-150.06-7c-12.61.35-24.85-13.47-25.32-28.32-.44-13.88,11.75-28,25.32-28.79Zm124.91.84H117.75C140.64,117.34,183,110,216.61,141.71ZM200.32,83.84v35.48c-6-1.85-11.9-3.89-17.91-5.46-8.35-2.17-8.7-2.6-5.77-11.07C180.22,92.42,190.53,84,200.32,83.84ZM104,82.91q21.54,0,43.07,0h33.76C171.93,91.3,167,100.4,167,111.35c-7.59,1.47-15,2.54-22.23,4.37-14.15,3.59-25,13-36.21,21.61a64.65,64.65,0,0,1-5.17,3.89c-2.08,1.28-3.58.87-3.58-1.95q0-26.88,0-53.76C99.76,82.19,102.17,82.92,104,82.91Zm17,134.27c-6.88-.26-13.78-.08-20.9-.08-.15-1.74-.34-2.93-.34-4.13,0-19.6.06-39.21-.09-58.81,0-3.39.84-4.64,4.39-4.5,6.88.26,13.78.08,20.9.08.15,1.74.34,2.93.34,4.12,0,19.61-.06,39.22.09,58.82C125.43,216.07,124.57,217.31,121,217.18Zm113-4.57c0,3.89-1.35,4.57-4.81,4.56q-45.63-.18-91.26,0c-3.42,0-4.88-.6-4.83-4.52q.31-29.2,0-58.42c0-3.88,1.34-4.59,4.81-4.55,15.28.15,30.57.07,45.86.07,15.13,0,30.27.08,45.4-.07,3.42,0,4.87.61,4.83,4.53Q233.65,183.4,234,212.61Z"
      />
      <path
        className="cls-4"
        d="M187.68,170.93c-.14-3.39.94-8.11-4.13-8.16s-4.17,4.66-4.16,8.08-1,8.1,4.08,8.15S187.56,174.35,187.68,170.93Z"
      />
    </Svg>
  );
};

export default Icon;
