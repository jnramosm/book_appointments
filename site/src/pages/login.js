import React from "react";
import { Input, Button, Space } from "antd";
import { login } from "../utils";
import user from "../user/user";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ user: e.target.value });
  }

  async handleSubmit() {
    this.setState({ loading: true });
    let r = await login(this.state.user);
    if (r.message === "Success") {
      user.setEmail(this.state.user);
      user.setAuthentication(true);
      this.props.history.replace("/");
    } else {
      this.setState({ loading: false });
      console.log(r);
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 300 + "px", margin: "auto" }}>
            <Space>
              <label>Email:</label>
              <Input value={this.state.user} onChange={this.handleChange} />
              <br />
              <Button
                type="primary"
                onClick={this.handleSubmit}
                loading={this.state.loading}
              >
                Login
              </Button>
            </Space>
          </div>
        </div>
      </div>
    );
  }
}
