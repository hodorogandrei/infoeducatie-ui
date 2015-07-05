"use strict";

import $ from "jquery";
import React from "react";

import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./seminars.less";
import DefaultAvatar from "../../assets/img/jury/default.png";


export default React.createClass({
  displayName: "Seminars",

  getInitialState() {
    return {
      talks: []
    };
  },

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: window.config.API_URL + "talks.json",
      success: this.onSuccess
    });
  },

  onSuccess(data) {
    this.setState({
      talks: data
    });
  },

  renderSeminar(talk, index) {
    let colors = ["green", "orange", "black"];
    let className = ctx("seminar-container", colors[index % colors.length]);

    return <Row key={index}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10} xs={12}>
        <Row className="xsmall-spacing" />
        <Row>
          <Col className={className} xs={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col xs={3} xsOffset={1}>
                <Row className="small-spacing" />
                <div className="seminar-image">
                  <img src={DefaultAvatar} />
                </div>
              </Col>
              <Col xs={8} >
                <h4 className="seminar-title">{talk.title}</h4>
                <p>{talk.description}</p>
                <Row className="xsmall-spacing" />
                <h5 className="seminar-name">{talk.author}</h5>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
      </Col>
    </Row>;
  },

  render() {
    return <div className="seminars">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h1>Seminarii InfoEducație <br />
                  Ediția {this.props.current.edition.year}
              </h1>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        {this.state.talks.map(this.renderSeminar)}
      </Grid>
   </div>;
  }
});
