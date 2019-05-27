import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Campaigns } from '/imports/api';

import {
  selectCampaignAction,
} from '/imports/redux/app-actions';

class CampaignListPage extends React.Component {

  deleteCampaign = (e, campaign) => {
    e.preventDefault();
    if(confirm(`Are you sure you want to delete this campaign?`))
      Meteor.call('campaign.remove', campaign._id);
  }

  selectCampaign = campaign => this.props.selectCampaign(campaign)

  render() {
    const { campaigns } = this.props;

    return (
    <main className="campaign-list-page grid-container">
      <h1>Select a Campaign</h1>
      <hr />
      <section className="p20-0 m20-0">
        {
          campaigns.map(campaign => (
          <div
            key={campaign._id}
            className="p10-0"
          >
            <span onClick={() => this.selectCampaign(campaign)}>
            { campaign.name }
            </span>
            <button onClick={e => this.deleteCampaign(e, campaign)}>-</button>
          </div>
          ))
        }
        <Link to="/campaign-form">+</Link>
      </section>
    </main>
    )
  }
}

const mapStateToProps = ({ appReducer : { selectedCampaign } }) => ({
  selectedCampaign,
})

const mapDispatchToProps = dispatcher => ({
  selectCampaign : campaign => dispatcher(selectCampaignAction(campaign)),
})

const connectedCampaignListPage = connect(mapStateToProps, mapDispatchToProps)(CampaignListPage);

export default withTracker(() => {
  Meteor.subscribe('campaigns');
  return {
    campaigns : Campaigns.find({}).fetch(),
  }
})(connectedCampaignListPage);
