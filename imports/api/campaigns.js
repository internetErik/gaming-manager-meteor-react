import { Mongo } from 'meteor/mongo';

export const Campaigns = new Mongo.Collection('campaigns');

Meteor.methods({
  'campaign.insert' : campaign => {
    if(Meteor.user()) {
      campaign.creator    = Meteor.user()._id;
      campaign.createDate = Date.now();
      return Campaigns.insert(campaign);
    }
  },
  'campaign.remove' :   _id    => Campaigns.remove({ _id }),
  'campaign.update' : (_id, campaign) => Campaigns.update({ _id }, campaign),
});