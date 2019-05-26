import { Mongo } from 'meteor/mongo';

export const Characters = new Mongo.Collection('characters');

Meteor.methods({
	insertCharacter : character => Characters.insert(character),
	removeCharacter :    _id    => Characters.remove({ _id }),
	updateCharacter : (_id, character) => Characters.update({ _id }, character),
});