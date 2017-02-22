/* globals Session, ReactMeteorData */

App.initialBatchSize = 48
App.defaultSortDirection = -1 // descending sort by default
App.defaultSortType = 'last_update'

var chunkSize = 24 // must be % 12 == 0, how many blocks are added
var blocksInAdvance = 6 // if the browser is this close to the bottom we will load more

if (typeof Session !== 'undefined') {
  Session.set('searchQuery', '')
  Session.set('searchSortDirection', App.defaultSortDirection)
  Session.set('searchSortType', App.defaultSortType)
  Session.set('lastResult', App.initialBatchSize)
}

if (Meteor.isClient) {
  var $window = $(window)
}

App.DappsView = React.createClass({
  render () {
    return (
      <div>
        Dapp View
      </div>

    )
  }
})

