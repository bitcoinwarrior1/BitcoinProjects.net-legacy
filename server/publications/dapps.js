import {Dapps} from "/lib/collections";
import {Meteor} from "meteor/meteor";

export default function () {
  Meteor.publish('dapps.list', function () {
    return Dapps.find();
  });
};