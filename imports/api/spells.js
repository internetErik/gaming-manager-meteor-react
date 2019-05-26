import { Mongo } from 'meteor/mongo';

export const Spells = new Mongo.Collection('spells');

Meteor.methods({
	insertSpell : spell        => Spells.insert(spell),
	updateSpell : (_id, spell) => Spells.update({ _id: _id }, spell),
	removeSpell : _id          => Spells.remove({ _id: _id }),
});