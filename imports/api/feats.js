import { Mongo } from 'meteor/mongo';

export const Feats = new Mongo.Collection('feats');

Meteor.methods({
	'feat.insert' : feat => Feats.insert(feat),
	'feat.remove' : (_id, feat) => Feats.remove({ _id }),
	'feat.insert' : (_id, feat) => Feats.update({ _id }, feat),
});