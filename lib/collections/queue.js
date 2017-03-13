import {Mongo} from 'meteor/mongo';

const Queue = new Mongo.Collection('queue');

export default Queue;
