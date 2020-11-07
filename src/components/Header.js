import React, { useState } from "react";
import Logo from "./logo.svg";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";

const Header = styled.header`
  padding: 10px 100px;
  display: flex;
  align-items: center;
  background-color: #001528;
`;
const LogoUrl = styled.img`
  height: 30px;
`;
const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;
  &.active {
    border-bottom: 1px solid #ccc;
  }
`;
const Login = styled.div`
  margin-left: auto;
`;
const StyledButton = styled(Button)`
  margin-left: 10px;
`;

function Component() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Header>
      <LogoUrl src={Logo} alt="logo" />
      <nav>
        <StyledLink to="/" activeClassName="active" exact>
          首页
        </StyledLink>
        <StyledLink to="/history" activeClassName="active">
          历史
        </StyledLink>
        <StyledLink to="/about" activeClassName="active">
          关于我
        </StyledLink>
      </nav>
      <Login>
        {isLogin ? (
          <>
            EvaL{" "}
            <StyledButton type="primary" onClick={() => setIsLogin(false)}>
              注销
            </StyledButton>
          </>
        ) : (
          <>
            <StyledButton
              type="primary"
              onClick={() => {
                setIsLogin(true);
              }}
            >
              登录
            </StyledButton>
            <StyledButton type="primary">注册</StyledButton>
          </>
        )}
      </Login>
    </Header>
  );
}

export default Component;
