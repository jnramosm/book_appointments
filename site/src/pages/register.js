import React from "react";
import { Input, Button, Space } from "antd";
import { register } from "../utils";

export default class Register extends React.Component {
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
    let r = await register(this.state.user);
    if (r.message === "Success") this.props.history.replace("/login");
    else {
      this.setState({ loading: false });
      console.log(r);
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
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
                Register
              </Button>
            </Space>
          </div>
        </div>
      </div>
    );
  }
}
