/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import Route from "../navigation/routes";

// const Spin = keyframes`
//   to {
//     transform: rotate(360deg);
//   }
// `;

const HeadBar = () => {
  const theme = useTheme();

  return <header
    css={css`
      background-color: ${theme.colors.primary};
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 15%;
      display: flex;
      align-items: center;
      box-shadow: 0 0 25px 0 black;
      z-index:100;
    `}
  >

    <img src="/images/headerImg.png" alt="headbar_icon" css={css`
    height: 60%;
    margin-left: 20px;
    @media (min-width: 420px) {
      height: 80%;
      margin-left: 40px;
    }`} />
    <div css={css`
    display: flex;
    margin-left:15px;  
    align
    @media (min-width: 420px) {
      height: 80%;
      margin-left: 30px;
    }`}>
      {Route.map((value, index) => {
        return value['isMenu'] ? <div
          key={"headbar-nav" + index}
          css={css`
        margin: 10px;
        flex-direction:column;
        align-item: center;
        @media (min-width: 420px) {
          margin: 20px;
        }`}>
          <Link
            css={css`
              &:hover {
                color: ${theme.colors.hovered};
              }
              color:  ${theme.colors.text};
              text-decoration: none;
              font-size: 1em;
              font-weight: bold;
              @media (min-width: 420px) {
                font-size: 2em;
              }
            `}
            to={value['path']}
          >
            {value['menuTitle']}
          </Link>
        </div> : null
      })}
    </div>
  </header>
};
export default HeadBar;
