import React, { ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: any
}

const StyledPage = styled.section`
  display: flex;
  flex-direction: column;
  // background: black;
  min-height: 100vh;
`

const Page: React.FC<Props> = ({ children }) => {
  return <StyledPage>{children}</StyledPage>
}

export default Page
