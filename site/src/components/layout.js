import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

export default class CustomLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Header, Footer, Sider, Content } = Layout;
    return (
      <>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">Settings</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/login">Log in</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/logout">Log out</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ textAlign: "center", paddingTop: 100 + "px" }}>
          {this.props.children}
        </Content>
      </>
    );
  }
}
