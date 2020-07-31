import React from "react";
import {
  Row,
  Col,
  TimePicker,
  Checkbox,
  Modal,
  Button,
  Space,
  Divider,
  Spin,
} from "antd";
import "./styles.css";
import moment from "moment";
import user from "../user/user";
import { getSettings, setSettings, removeSession } from "../utils";
import config from "../utils/config";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: {
        mon: [0, 0],
        tue: [0, 0],
        wed: [0, 0],
        thu: [0, 0],
        fri: [0, 0],
        sat: [0, 0],
        sun: [0, 0],
        sess: [0],
      },
      disabled: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
        sun: true,
      },
      email: "",
      loading_link: false,
      loading_set: false,
      google: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeTimeMon = this.onChangeTimeMon.bind(this);
    this.onChangeTimeTue = this.onChangeTimeTue.bind(this);
    this.onChangeTimeWed = this.onChangeTimeWed.bind(this);
    this.onChangeTimeThu = this.onChangeTimeThu.bind(this);
    this.onChangeTimeFri = this.onChangeTimeFri.bind(this);
    this.onChangeTimeSat = this.onChangeTimeSat.bind(this);
    this.onChangeTimeSun = this.onChangeTimeSun.bind(this);
    this.onChangeTimeSess = this.onChangeTimeSess.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.success = this.success.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  onChangeTimeMon(e, v) {
    this.setState({ availability: { ...this.state.availability, mon: v } });
  }
  onChangeTimeTue(e, v) {
    this.setState({ availability: { ...this.state.availability, tue: v } });
  }
  onChangeTimeWed(e, v) {
    this.setState({ availability: { ...this.state.availability, wed: v } });
  }
  onChangeTimeThu(e, v) {
    this.setState({ availability: { ...this.state.availability, thu: v } });
  }
  onChangeTimeFri(e, v) {
    this.setState({ availability: { ...this.state.availability, fri: v } });
  }
  onChangeTimeSat(e, v) {
    this.setState({ availability: { ...this.state.availability, sat: v } });
  }
  onChangeTimeSun(e, v) {
    this.setState({ availability: { ...this.state.availability, sun: v } });
  }

  onChangeTimeSess(e, v) {
    this.setState({ availability: { ...this.state.availability, sess: v } });
  }

  componentDidMount() {
    this.getSettings();
  }

  success() {
    Modal.success({
      title: "Success!",
      content: "Your data was updated successfuly!",
      onOk() {},
    });
  }

  onChange(e) {
    // console.log(v.target);
    var day = e.target.id.split("_")[1];
    var obj = this.state.disabled;
    var av = this.state.availability;

    if (e.target.checked) {
      obj[day] = false;
      this.setState({ disabled: obj });
    } else {
      obj[day] = true;
      av[day] = [0, 0];
      this.setState({
        disabled: obj,
        availability: av,
      });
    }
  }

  async handleFinish() {
    try {
      this.setState({ loading_set: true });
      var obj = this.state.availability;
      obj["email"] = user.getEmail();
      let r = await setSettings(obj);
      this.setState({ loading_set: false });
      if (r.message === "Success") this.success();
    } catch (error) {
      console.log(error);
    }
  }

  async getSettings() {
    try {
      let d = await getSettings(user.getEmail());

      const month = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      var dis = this.state.disabled;
      var av = this.state.availability;
      this.setState({ email: d.email });
      // console.log(d);
      if (d.google) this.setState({ google: true });
      for (var i = 0; i < month.length; i++) {
        if (d[month[i]][0] != 0) {
          dis[month[i]] = false;
          av[month[i]] = [d[month[i]][0], d[month[i]][1]];
        }
      }
      av["sess"] = d.sess;

      this.setState({
        disabled: dis,
        availability: av,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handleLogout() {
    this.setState({ loading_link: true });
    try {
      let d = await removeSession(this.state.email);
      if (d.message === "Success") {
        this.getSettings();
        this.setState({ loading_link: false });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { RangePicker } = TimePicker;
    return (
      <>
        <Divider orientation="left" plain>
          Set your availability
        </Divider>
        <Row className="row">
          <Col className="day" span={4}>
            day
          </Col>
          <Col className="times" span={12}>
            from - until
          </Col>
          <Col className="times" span={8}>
            Unavailable
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}>
            Monday:
          </Col>
          <Col className="times" span={12}>
            <Space size="small">
              <Checkbox
                id="checkbox_mon"
                checked={!this.state.disabled.mon}
                onChange={this.onChange}
              />
              <RangePicker
                id="range_mon"
                format="HH:mm"
                value={[
                  moment(this.state.availability.mon[0], "HH:mm"),
                  moment(this.state.availability.mon[1], "HH:mm"),
                ]}
                placeholder={["From", "Until"]}
                disabled={[this.state.disabled.mon, this.state.disabled.mon]}
                onChange={this.onChangeTimeMon}
              />
            </Space>
          </Col>
          <Col className="times" span={8}>
            Unav
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}>
            Tuesday:
          </Col>
          <Col className="times" span={12}>
            <Space size="small">
              <Checkbox
                id="checkbox_tue"
                onChange={this.onChange}
                checked={!this.state.disabled.tue}
              />
              <RangePicker
                placeholder={["From", "Until"]}
                format="HH:mm"
                disabled={[this.state.disabled.tue, this.state.disabled.tue]}
                onChange={this.onChangeTimeTue}
                value={[
                  moment(this.state.availability.tue[0], "HH:mm"),
                  moment(this.state.availability.tue[1], "HH:mm"),
                ]}
              />
            </Space>
          </Col>
          <Col className="times" span={8}>
            Unav
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}>
            Wednesday:
          </Col>
          <Col className="times" span={12}>
            <Space size="small">
              <Checkbox
                id="checkbox_wed"
                onChange={this.onChange}
                checked={!this.state.disabled.wed}
              />
              <RangePicker
                placeholder={["From", "Until"]}
                format="HH:mm"
                disabled={[this.state.disabled.wed, this.state.disabled.wed]}
                onChange={this.onChangeTimeWed}
                value={[
                  moment(this.state.availability.wed[0], "HH:mm"),
                  moment(this.state.availability.wed[1], "HH:mm"),
                ]}
              />
            </Space>
          </Col>
          <Col className="times" span={8}>
            Unav
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}>
            Thursday:
          </Col>
          <Col className="times" span={12}>
            <Space size="small">
              <Checkbox
                id="checkbox_thu"
                onChange={this.onChange}
                checked={!this.state.disabled.thu}
              />
              <RangePicker
                placeholder={["From", "Until"]}
                format="HH:mm"
                disabled={[this.state.disabled.thu, this.state.disabled.thu]}
                onChange={this.onChangeTimeThu}
                value={[
                  moment(this.state.availability.thu[0], "HH:mm"),
                  moment(this.state.availability.thu[1], "HH:mm"),
                ]}
              />
            </Space>
          </Col>
          <Col className="times" span={8}>
            Unav
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}>
            Friday:
          </Col>
          <Col className="times" span={12}>
            <Space size="small">
              <Checkbox
                id="checkbox_fri"
                onChange={this.onChange}
                checked={!this.state.disabled.fri}
              />
              <RangePicker
                placeholder={["From", "Until"]}
                format="HH:mm"
                disabled={[this.state.disabled.fri, this.state.disabled.fri]}
                onChange={this.onChangeTimeFri}
                value={[
                  moment(this.state.availability.fri[0], "HH:mm"),
                  moment(this.state.availability.fri[1], "HH:mm"),
                ]}
              />
            </Space>
          </Col>
          <Col className="times" span={8}>
            Unav
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}>
            Saturday:
          </Col>
          <Col className="times" span={12}>
            <Space size="small">
              <Checkbox
                id="checkbox_sat"
                onChange={this.onChange}
                checked={!this.state.disabled.sat}
              />
              <RangePicker
                placeholder={["From", "Until"]}
                format="HH:mm"
                disabled={[this.state.disabled.sat, this.state.disabled.sat]}
                onChange={this.onChangeTimeSat}
                value={[
                  moment(this.state.availability.sat[0], "HH:mm"),
                  moment(this.state.availability.sat[1], "HH:mm"),
                ]}
              />
            </Space>
          </Col>
          <Col className="times" span={8}>
            Unav
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}>
            Sunday:
          </Col>
          <Col className="times" span={12}>
            <Space size="small">
              <Checkbox
                id="checkbox_sun"
                onChange={this.onChange}
                checked={!this.state.disabled.sun}
              />
              <RangePicker
                placeholder={["From", "Until"]}
                format="HH:mm"
                disabled={[this.state.disabled.sun, this.state.disabled.sun]}
                onChange={this.onChangeTimeSun}
                value={[
                  moment(this.state.availability.sun[0], "HH:mm"),
                  moment(this.state.availability.sun[1], "HH:mm"),
                ]}
              />
            </Space>
          </Col>
          <Col className="times" span={8}>
            Unav
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}>
            Session duration:
          </Col>
          <Col className="times" span={12}>
            <TimePicker
              showNow={false}
              format="HH:mm"
              onChange={this.onChangeTimeSess}
              value={moment(this.state.availability.sess, "HH:mm")}
            />
          </Col>
          <Col className="times" span={8}>
            Unav
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}></Col>
          <Col className="times" span={12}>
            <Button
              type="primary"
              onClick={this.handleFinish}
              loading={this.state.loading_set}
            >
              Save
            </Button>
          </Col>
        </Row>
        <Divider orientation="left" plain>
          Link your email to have access to your calendar
        </Divider>
        <br />
        {/* {this.state.loading_link ? <Spin size="large" tip="Cargando..." /> :  */}
        <Row className="row">
          <Col className="day" span={4}></Col>
          <Col className="times" span={12}>
            <a
              href={config.domains.api + "/google"}
              disabled={this.state.google ? true : false}
            >
              <Button
                type="primary"
                disabled={this.state.google ? true : false}
                onClick={this.handleLink}
              >
                Link
              </Button>
            </a>
            <label>{this.state.google ? this.state.email : ""}</label>
          </Col>
        </Row>
        <Row className="row">
          <Col className="day" span={4}></Col>
          <Col className="times" span={12}>
            <Button
              type="primary"
              disabled={this.state.google ? false : true}
              onClick={this.handleLogout}
            >
              Unlink email
            </Button>
          </Col>
        </Row>
        {/* } */}
      </>
    );
  }
}
