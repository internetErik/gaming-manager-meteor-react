import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {

  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, this.loginUI);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    const { className } = this.props;
    return (
    <span
      className={`accounts-ui-wrapper ${ className || '' }`}
      ref={loginUI => this.loginUI = loginUI}
    />);
  }
}