import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter',sans-serif;
  }

  .menuicon svg{
    fill:#fff;
  }

  .ReactModal__Overlay{
    background-color: rgb(0,0,0,.4)!important;
    backdrop-filter: blur(1px)!important;
  }

  body {
    // background:#0d0415;
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
