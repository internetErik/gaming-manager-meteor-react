import { Mongo } from 'meteor/mongo';

export const Skills = new Mongo.Collection('skills');

Meteor.methods({
	'skill.insert' : skill => Skills.insert(skill),
	'skill.remove' : _id   => Skills.remove({ _id }),
	'skill.update' : (_id, skill) => Skills.update({ _id }, skill),
});