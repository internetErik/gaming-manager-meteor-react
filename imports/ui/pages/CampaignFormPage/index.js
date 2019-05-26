import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { InputText, formHasErrors } from '../../inputs';

const initValues = {
  campaignNameValue : '',
}

const initDirty = {
  campaignNameDirty : false,
};

const initErrors = {
  campaignNameRequired : false,
};

class CampaignFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initValues,
      ...initDirty,
      ...initErrors,
      buttonDisabled    : false,
      formBottomMessage : '',
    }
  }

  handleFieldChanged = change => this.setState({ ...change, formBottomMessage: '' }, this.formValidation)

  formValidation = () => new Promise((resolve, reject) => {
    const { campaignNameValue, campaignNameDirty } = this.state;
    const errors = {}

    if(campaignNameDirty) {
      errors.campaignNameRequired = campaignNameValue === '';
    }

    this.setState(errors, resolve);
  })

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ campaignNameDirty : true }, () => {
      this.formValidation()
      .then(() => {
        if(!formHasErrors(initErrors, this.state) && !this.state.buttonDisabled)
          this.setState({ buttonDisabled: true, buttonText: 'Processing'}, this.addCampaign);
        else
          this.setState({ formBottomMessage: 'The form has errors', })
      });
    });
  }

  addCampaign = () => {
    const { history } = this.props;
    const campaign = { name : this.state.campaignNameValue };

    Meteor.call('campaign.insert', campaign, (error, r) => {
      if(error)
        console.log("Error creating campaign: ", error);
      else
        history.push('/campaign-list')
    });
  }

  render() {
    const { campaignNameValue, buttonDisabled, formBottomMessage } = this.state;
    return (
    <div className="campaign-form-page grid-container">
      <form onSubmit={this.handleSubmit}>
        <h1>Create Campaign</h1>
        <hr />
        <section className="p20-0 m20-0">
          <InputText
            labelText="Campaign Name"
            fieldName="campaignName"
            fieldValue={campaignNameValue}
            getFieldChanged={this.handleFieldChanged}
            setFieldDirty={this.handleFieldChanged}
          />
        </section>
        <button { ...(buttonDisabled ? { disabled : true } : { }) }>
          Create Campaign
        </button>
        <div>
        { formBottomMessage }
        </div>
      </form>
    </div>
    )
  }
}

export default CampaignFormPage;
