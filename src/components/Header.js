import React from "react";
import Logo from "./logo.svg";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";
import { useStores } from "../stores";
import { observer } from "mobx-react";

const Header = styled.header`
  padding: 10px 100px;
  display: flex;
  align-items: center;
  background-color: #001528;
`;
const LogoUrl = styled.img`
  height: 30px;
`;
const Actions = styled.div`
  color: #fff;
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

const Component = observer(() => {
  const { UserStore, AuthStore } = useStores();
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };
  const handleLogout = () => {
    AuthStore.logout();
    history.push("/login");
  };
  const handleRegister = () => {
    history.push("/register");
  };

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
        {UserStore.currentUser ? (
          <Actions>
            {UserStore.currentUser.attributes.username}
            <StyledButton type="primary" onClick={handleLogout}>
              注销
            </StyledButton>
          </Actions>
        ) : (
          <>
            <StyledButton type="primary" onClick={handleLogin}>
              登录
            </StyledButton>
            <StyledButton type="primary" onClick={handleRegister}>
              注册
            </StyledButton>
          </>
        )}
      </Login>
    </Header>
  );
});

export default Component;
