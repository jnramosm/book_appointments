import React from "react";
import { Calendar, Row, Col, Spin, Modal, Form, Input, Select } from "antd";
import Card from "../components/card";
import "./styles.css";
import moment from "moment";
import { email } from "../private/email";
import { slots, createEvent } from "../utils/api";

export default class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [],
      loading: true,
      selected: "",
      modal: false,
      date: new Date(),
      name: "",
      email: "",
      loading_modal: false,
    };
    this.handleCalendarSelect = this.handleCalendarSelect.bind(this);
    this.handleCards = this.handleCards.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount() {
    let today = new Date();
    //let day = today.getDay();
    this.request(today);
  }

  async request(day) {
    try {
      this.setState({ loading: true });
      let d = await slots({ day, email });
      this.setState({ slots: d });
      //console.log(d);
      this.setState({ loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  handleCalendarSelect(date) {
    //var day = date._d.getDay();
    this.request(date._d);
    this.setState({ date: date._d });
  }

  handleCards(e) {
    // console.log(e.target.id);
    this.setState({ selected: e.target.id, modal: true });
  }

  handleInputChange(e) {
    var obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  async handleOk() {
    this.setState({ loading_modal: true });
    try {
      let d = await createEvent({
        date: this.state.date,
        slot: this.state.selected,
        name: this.state.name,
        email_customer: this.state.email,
        email_doctor: email,
      });
      if (d.msg === "Success") this.setState({ modal: false });
      this.setState({ loading_modal: false });
      //console.log(d);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { Option } = Select;
    return (
      <>
        <h1>Setting appointments</h1>
        {/* TODO: Select your doctor, or whoever you want a make an appointment */}
        <Select
          defaultValue={email}
          style={{ width: 120 }}
          // onChange={handleChange}
        >
          <Option value={email}>{email}</Option>
        </Select>
        <Row>
          <Col span={8}>
            <Calendar
              validRange={[
                moment().subtract(1, "day"),
                moment().add(2, "months"),
              ]}
              fullscreen={false}
              onSelect={this.handleCalendarSelect}
            />
          </Col>
          <Col span={2}>
            <h1></h1>
          </Col>
          <Col span={14}>
            <h1>Slots available</h1>
            {this.state.loading ? (
              <Spin size="large" tip="Loading..." />
            ) : this.state.slots.length > 0 ? (
              this.state.slots.map((d) => (
                <Card
                  key={"key_" + d[0]}
                  id={d[0] + "/" + d[1]}
                  onClick={this.handleCards}
                  //style={{ width: 150, height: 60, textAlign: "center" }}
                >
                  {d[0]}
                </Card>
              ))
            ) : (
              <h1>No slots available for this date</h1>
            )}
          </Col>
        </Row>
        <Modal
          title={"Book appointment"}
          visible={this.state.modal}
          onOk={this.handleOk}
          onCancel={() => this.setState({ modal: false })}
        >
          {this.state.loading_modal ? (
            <Spin size="large" tip="Loading..." />
          ) : (
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
              <Form.Item
                label="Name"
                rules={[{ required: true, message: "Introduce your name!" }]}
              >
                <Input
                  type="text"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="E-mail"
                rules={[{ required: true, message: "Introduce your email!" }]}
              >
                <Input
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </Form.Item>
            </Form>
          )}
        </Modal>
      </>
    );
  }
}
