import { Mongo } from 'meteor/mongo';

export const Skills = new Mongo.Collection('skills');

Meteor.methods({
	insertSkill : skill => Skills.insert(skill),
	removeSkill : _id   => Skills.remove({ _id }),
	updateSkill : (_id, skill) => Skills.update({ _id }, skill),
});