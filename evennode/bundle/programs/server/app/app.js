var require = meteorInstall({"both":{"lib":{"collections.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/lib/collections.js                                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/* globals Mongo */this.App = {};                                                                                // 1
App.cols = {                                                                                                     // 4
  Dapps: new Mongo.Collection('dapps'),                                                                          // 5
  Queue: new Mongo.Collection('queue')                                                                           // 6
};                                                                                                               // 4
                                                                                                                 //
if (Meteor.isServer) {                                                                                           // 9
  Meteor.publish('dapps', function () {                                                                          // 10
    // TODO limit this to infinite scroll data                                                                   // 11
    return App.cols.Dapps.find({});                                                                              // 12
  }, {                                                                                                           // 13
    url: "/api/dapps"                                                                                            // 14
  });                                                                                                            // 13
  Meteor.publish('dapps-by-tag', function (tag) {                                                                // 17
    return App.cols.Dapps.find({                                                                                 // 18
      tags: tag                                                                                                  // 18
    });                                                                                                          // 18
  }, {                                                                                                           // 19
    url: "/api/dapps-by-tag/:0"                                                                                  // 20
  });                                                                                                            // 19
}                                                                                                                // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/lib/methods.js                                                                                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/* globals check, Match, Email, EJSON */Meteor.methods({                                                         // 1
  newSubmission: function (data) {                                                                               // 4
    // validate the data before emailing it out                                                                  // 5
    // TODO rate limit?                                                                                          // 6
    var ShortString = Match.Where(function (x) {                                                                 // 7
      check(x, String);                                                                                          // 8
      return x.length <= 128;                                                                                    // 9
    });                                                                                                          // 10
    check(data, {                                                                                                // 12
      project_name: ShortString,                                                                                 // 13
      description: ShortString,                                                                                  // 14
      contact: ShortString,                                                                                      // 15
      contact_email: ShortString,                                                                                // 16
      site: ShortString,                                                                                         // 17
      reddit: ShortString,                                                                                       // 18
      github: ShortString,                                                                                       // 19
      license: ShortString,                                                                                      // 20
      tags: ShortString,                                                                                         // 21
      status: ShortString                                                                                        // 22
    });                                                                                                          // 12
    data.timestamp = new Date().toLocaleString();                                                                // 27
                                                                                                                 //
    if (Meteor.isServer) {                                                                                       // 29
      App.cols.Queue.insert(data);                                                                               // 30
      Email.send({                                                                                               // 32
        to: process.env.MAIL_TO,                                                                                 // 33
        from: process.env.MAIL_FROM,                                                                             // 34
        replyTo: data.contact_email,                                                                             // 35
        subject: "New Bitcoin Project Submitted - " + data.project_name,                                         // 36
        text: "The project needs to be approved and added manually:\n\n " + EJSON.stringify(data, null, 2)       // 37
      });                                                                                                        // 32
    }                                                                                                            // 39
  }                                                                                                              // 40
});                                                                                                              // 3
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"views":{"Dapp.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/views/Dapp.js                                                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
App.Dapp = React.createClass({                                                                                   // 1
  displayName: "Dapp",                                                                                           // 1
  propTypes: {                                                                                                   // 2
    dapp: React.PropTypes.object.isRequired                                                                      // 3
  },                                                                                                             // 2
  statusColors: ['light-grey', // 0. Unknown                                                                     // 5
  'black white-text', // 1. Abandoned                                                                            // 7
  'red darken-2 white-text', // 2. On Hold                                                                       // 8
  'grey darken-2 white-text', // 3. Stealth Mode                                                                 // 9
  'amber accent-1', // 4. Concept                                                                                // 10
  'amber', // 5. Work In Progress                                                                                // 11
  'green accent-1', // 6. Demo                                                                                   // 12
  'green accent-2', // 7. Working Prototype                                                                      // 13
  'light-green accent-3' // 8. live                                                                              // 14
  ],                                                                                                             // 5
  render: function () {                                                                                          // 17
    var statusColor = this.statusColors[parseInt(this.props.dapp.status[0], 10)];                                // 18
    var link = this.props.dapp.url || this.props.dapp.github || this.props.dapp.reddit;                          // 19
    return React.createElement(                                                                                  // 20
      "div",                                                                                                     // 21
      {                                                                                                          // 21
        className: "col ms12 m4 l3 xl2 xxl1"                                                                     // 21
      },                                                                                                         // 21
      React.createElement(                                                                                       // 22
        "div",                                                                                                   // 22
        {                                                                                                        // 22
          className: 'card hoverable dapp-card ' + statusColor                                                   // 22
        },                                                                                                       // 22
        React.createElement(                                                                                     // 23
          "div",                                                                                                 // 23
          {                                                                                                      // 23
            className: "card-content"                                                                            // 23
          },                                                                                                     // 23
          React.createElement(                                                                                   // 24
            "div",                                                                                               // 24
            {                                                                                                    // 24
              className: "main-section center-align"                                                             // 24
            },                                                                                                   // 24
            React.createElement(                                                                                 // 25
              "div",                                                                                             // 25
              {                                                                                                  // 25
                className: "card-title truncate"                                                                 // 25
              },                                                                                                 // 25
              link ? React.createElement(                                                                        // 26
                "a",                                                                                             // 26
                {                                                                                                // 26
                  target: "_blank",                                                                              // 26
                  href: link                                                                                     // 26
                },                                                                                               // 26
                this.props.dapp.name                                                                             // 26
              ) : this.props.dapp.name                                                                           // 26
            ),                                                                                                   // 25
            React.createElement(                                                                                 // 29
              "div",                                                                                             // 29
              {                                                                                                  // 29
                className: "card-subtitle trunchate"                                                             // 29
              },                                                                                                 // 29
              this.props.dapp.contact                                                                            // 30
            ),                                                                                                   // 29
            React.createElement(                                                                                 // 32
              "div",                                                                                             // 32
              {                                                                                                  // 32
                className: "card-description"                                                                    // 32
              },                                                                                                 // 32
              React.createElement(                                                                               // 33
                "p",                                                                                             // 33
                null,                                                                                            // 33
                this.props.dapp.description                                                                      // 33
              )                                                                                                  // 33
            )                                                                                                    // 32
          ),                                                                                                     // 24
          React.createElement(                                                                                   // 36
            "div",                                                                                               // 36
            {                                                                                                    // 36
              className: "section status-section"                                                                // 36
            },                                                                                                   // 36
            React.createElement(                                                                                 // 37
              "p",                                                                                               // 37
              {                                                                                                  // 37
                className: "icon-row center-align"                                                               // 37
              },                                                                                                 // 37
              this.props.dapp.url && React.createElement(                                                        // 38
                "a",                                                                                             // 39
                {                                                                                                // 39
                  target: "_blank",                                                                              // 39
                  href: this.props.dapp.url                                                                      // 39
                },                                                                                               // 39
                React.createElement("i", {                                                                       // 40
                  className: "icon-link fa fa-fw fa-globe"                                                       // 40
                })                                                                                               // 40
              ),                                                                                                 // 39
              this.props.dapp.github && React.createElement(                                                     // 43
                "a",                                                                                             // 44
                {                                                                                                // 44
                  target: "_blank",                                                                              // 44
                  href: this.props.dapp.github                                                                   // 44
                },                                                                                               // 44
                this.props.dapp.license,                                                                         // 45
                React.createElement("i", {                                                                       // 46
                  className: "icon-clickaBleIconlink fa fa-fw fa-github"                                         // 46
                })                                                                                               // 46
              ),                                                                                                 // 44
              this.props.dapp.reddit && React.createElement(                                                     // 49
                "a",                                                                                             // 50
                {                                                                                                // 50
                  target: "_blank",                                                                              // 50
                  href: this.props.dapp.reddit                                                                   // 50
                },                                                                                               // 50
                React.createElement("i", {                                                                       // 51
                  className: "icon-link fa fa-fw fa-reddit"                                                      // 51
                })                                                                                               // 51
              ),                                                                                                 // 50
              this.props.dapp.contract_address_mainnet && React.createElement(                                   // 54
                "a",                                                                                             // 55
                {                                                                                                // 55
                  target: "_blank",                                                                              // 55
                  href: 'https://etherscan.io/address/' + this.props.dapp.contract_address_mainnet               // 55
                },                                                                                               // 55
                React.createElement("i", {                                                                       // 56
                  className: "icon-link fa fa-fw fa-cogs"                                                        // 56
                })                                                                                               // 56
              ),                                                                                                 // 55
              this.props.dapp.contract_address_ropsten && React.createElement(                                   // 59
                "a",                                                                                             // 60
                {                                                                                                // 60
                  target: "_blank",                                                                              // 60
                  href: 'https://ropsten.io/address/' + this.props.dapp.contract_address_ropsten                 // 60
                },                                                                                               // 60
                React.createElement("i", {                                                                       // 61
                  className: "icon-link fa fa-fw fa-bug"                                                         // 61
                })                                                                                               // 61
              )                                                                                                  // 60
            ),                                                                                                   // 37
            React.createElement(                                                                                 // 66
              "p",                                                                                               // 66
              {                                                                                                  // 66
                className: "pull-right"                                                                          // 66
              },                                                                                                 // 66
              this.props.dapp.last_update                                                                        // 67
            ),                                                                                                   // 66
            React.createElement(                                                                                 // 69
              "p",                                                                                               // 69
              {                                                                                                  // 69
                className: "status truncate"                                                                     // 69
              },                                                                                                 // 69
              this.props.dapp.status.substring(3)                                                                // 70
            )                                                                                                    // 69
          )                                                                                                      // 36
        )                                                                                                        // 23
      )                                                                                                          // 22
    );                                                                                                           // 21
  }                                                                                                              // 77
});                                                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DappsList.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/views/DappsList.js                                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/* globals Session, ReactMeteorData */App.initialBatchSize = 48;                                                 // 1
App.defaultSortDirection = -1; // descending sort by default                                                     // 4
                                                                                                                 //
App.defaultSortType = 'last_update';                                                                             // 5
var chunkSize = 24; // must be % 12 == 0, how many blocks are added                                              // 7
                                                                                                                 //
var blocksInAdvance = 6; // if the browser is this close to the bottom we will load more                         // 8
                                                                                                                 //
if (typeof Session !== 'undefined') {                                                                            // 10
  Session.set('searchQuery', '');                                                                                // 11
  Session.set('searchSortDirection', App.defaultSortDirection);                                                  // 12
  Session.set('searchSortType', App.defaultSortType);                                                            // 13
  Session.set('lastResult', App.initialBatchSize);                                                               // 14
}                                                                                                                // 15
                                                                                                                 //
if (Meteor.isClient) {                                                                                           // 17
  var $window = $(window);                                                                                       // 18
}                                                                                                                // 19
                                                                                                                 //
App.DappsList = React.createClass({                                                                              // 21
  displayName: "DappsList",                                                                                      // 21
  // This mixin makes the getMeteorData method work                                                              // 22
  mixins: [ReactMeteorData],                                                                                     // 23
  // fields in mongo to use in search query                                                                      // 24
  searchFields: ['name', 'description', 'tags', 'contact', 'license', 'status'],                                 // 25
  // Loads items from the Dapps collection and puts them on this.data.dapps                                      // 26
  getMeteorData: function () {                                                                                   // 27
    var data = {};                                                                                               // 28
    var query = {};                                                                                              // 29
    var sort = {};                                                                                               // 30
    sort[App.defaultSortType] = App.defaultSortDirection;                                                        // 31
    var limit = App.initialBatchSize;                                                                            // 32
    var searchQuery = ''; // subscribe to the data source, server and client                                     // 33
                                                                                                                 //
    Meteor.subscribe('dapps'); // CLIENT ONLY                                                                    // 35
                                                                                                                 //
    if (typeof Session !== 'undefined') {                                                                        // 37
      // Use the search query if one exists                                                                      // 38
      searchQuery = Session.get('searchQuery') || '';                                                            // 39
      limit = Session.get('lastResult');                                                                         // 40
      sort = {};                                                                                                 // 41
      sort[Session.get('searchSortType')] = Session.get('searchSortDirection'); // the defaultSortType will always remain as a 'secondary sort'
                                                                                                                 //
      sort[App.defaultSortType] = Session.get('searchSortDirection'); // If the query is long enough, search regex pattern in all searchable fields
                                                                                                                 //
      if (searchQuery.length > 0) {                                                                              // 47
        query = {                                                                                                // 48
          $or: []                                                                                                // 48
        };                                                                                                       // 48
                                                                                                                 //
        for (var i = 0; i < this.searchFields.length; i++) {                                                     // 49
          var thisField = {};                                                                                    // 50
          thisField[this.searchFields[i]] = {                                                                    // 51
            $regex: searchQuery,                                                                                 // 51
            $options: 'i'                                                                                        // 51
          };                                                                                                     // 51
          query.$or.push(thisField);                                                                             // 52
        }                                                                                                        // 53
      }                                                                                                          // 54
    }                                                                                                            // 55
                                                                                                                 //
    data.dapps = App.cols.Dapps.find(query, {                                                                    // 56
      sort: sort,                                                                                                // 56
      limit: limit                                                                                               // 56
    }).fetch();                                                                                                  // 56
    data.count = App.cols.Dapps.find(query).count();                                                             // 57
    data.resultType = searchQuery.length > 0 ? 'found' : 'listed';                                               // 58
    return data;                                                                                                 // 59
  },                                                                                                             // 60
  // infinite scrolling                                                                                          // 62
  loadMoreItems: function () {                                                                                   // 63
    var childCount = $('.col', this.refs.dappSection.getDOMNode()).size();                                       // 64
    var sessionGetLastResult = Session.get('lastResult'); // don't try to load more items until we've matched the last request, or never fire if done
                                                                                                                 //
    if (childCount >= sessionGetLastResult) {                                                                    // 67
      Session.set('lastResult', sessionGetLastResult + chunkSize);                                               // 68
    }                                                                                                            // 69
  },                                                                                                             // 70
  handleScroll: _.debounce(function () {                                                                         // 72
    // get the position of `blocksInAdvance` blocks before it ends                                               // 73
    var $lastItem = $('.col:last-child', this.refs.dappSection.getDOMNode());                                    // 74
    var targetPosition = Math.round($lastItem.offset().top - $lastItem.height() * blocksInAdvance);              // 75
                                                                                                                 //
    if ($window.scrollTop() + $window.height() >= targetPosition) {                                              // 76
      this.loadMoreItems();                                                                                      // 77
    }                                                                                                            // 78
  }, 200),                                                                                                       // 79
  componentDidUpdate: function () {                                                                              // 81
    // check to see if screen is fully populated                                                                 // 82
    var $lastItem = $('.col:last-child', this.refs.dappSection.getDOMNode());                                    // 83
                                                                                                                 //
    if ($lastItem.size() && Math.floor($lastItem.offset().top) + $lastItem.height() < $window.height()) {        // 84
      this.loadMoreItems();                                                                                      // 85
    }                                                                                                            // 86
  },                                                                                                             // 87
  componentDidMount: function () {                                                                               // 89
    window.addEventListener('scroll', this.handleScroll);                                                        // 90
    this.componentDidUpdate();                                                                                   // 91
  },                                                                                                             // 92
  componentWillUnmount: function () {                                                                            // 94
    window.removeEventListener('scroll', this.handleScroll);                                                     // 95
  },                                                                                                             // 96
  scrollToTop: function () {                                                                                     // 98
    window.scrollTo(0, 0);                                                                                       // 99
  },                                                                                                             // 100
  renderDapps: function () {                                                                                     // 102
    if (this.data.dapps.length) {                                                                                // 103
      return this.data.dapps.map(function (dapp) {                                                               // 104
        return React.createElement(App.Dapp, {                                                                   // 105
          key: dapp._id,                                                                                         // 106
          dapp: dapp                                                                                             // 107
        });                                                                                                      // 105
      });                                                                                                        // 108
    } else {                                                                                                     // 109
      return React.createElement(                                                                                // 110
        "div",                                                                                                   // 111
        {                                                                                                        // 111
          className: "no-results center-align white-text flow-text section"                                      // 111
        },                                                                                                       // 111
        React.createElement(                                                                                     // 112
          "p",                                                                                                   // 112
          null,                                                                                                  // 112
          "No Projects Found"                                                                                    // 112
        )                                                                                                        // 112
      );                                                                                                         // 111
    }                                                                                                            // 115
  },                                                                                                             // 116
  render: function () {                                                                                          // 118
    return React.createElement(                                                                                  // 119
      "div",                                                                                                     // 120
      null,                                                                                                      // 120
      React.createElement(                                                                                       // 121
        "div",                                                                                                   // 121
        {                                                                                                        // 121
          onClick: this.scrollToTop,                                                                             // 121
          className: "scroll-to-top"                                                                             // 121
        },                                                                                                       // 121
        React.createElement("i", {                                                                               // 122
          className: "fa fa-fw fa-arrow-up"                                                                      // 122
        })                                                                                                       // 122
      ),                                                                                                         // 121
      React.createElement(                                                                                       // 124
        "div",                                                                                                   // 124
        {                                                                                                        // 124
          ref: "navArea",                                                                                        // 124
          className: "header-container container"                                                                // 124
        },                                                                                                       // 124
        React.createElement(                                                                                     // 125
          "header",                                                                                              // 125
          {                                                                                                      // 125
            className: "center-align"                                                                            // 125
          },                                                                                                     // 125
          React.createElement(                                                                                   // 126
            "h1",                                                                                                // 126
            null,                                                                                                // 126
            "State of the Bits"                                                                                  // 126
          )                                                                                                      // 126
        ),                                                                                                       // 125
        React.createElement(                                                                                     // 128
          "section",                                                                                             // 128
          null,                                                                                                  // 128
          React.createElement(App.SearchBox, null)                                                               // 129
        )                                                                                                        // 128
      ),                                                                                                         // 124
      React.createElement(App.InfoModal, null),                                                                  // 132
      React.createElement(                                                                                       // 134
        "div",                                                                                                   // 134
        {                                                                                                        // 134
          className: "black"                                                                                     // 134
        },                                                                                                       // 134
        React.createElement(                                                                                     // 135
          "div",                                                                                                 // 135
          {                                                                                                      // 135
            className: "row"                                                                                     // 135
          },                                                                                                     // 135
          React.createElement(App.FilterArea, {                                                                  // 136
            data: this.data                                                                                      // 136
          }),                                                                                                    // 136
          React.createElement(                                                                                   // 137
            "section",                                                                                           // 137
            {                                                                                                    // 137
              ref: "dappSection",                                                                                // 137
              className: "dapps row"                                                                             // 137
            },                                                                                                   // 137
            this.renderDapps()                                                                                   // 138
          )                                                                                                      // 137
        ),                                                                                                       // 135
        React.createElement(                                                                                     // 141
          "footer",                                                                                              // 141
          {                                                                                                      // 141
            className: "white-text center-align"                                                                 // 141
          },                                                                                                     // 141
          React.createElement(                                                                                   // 142
            "div",                                                                                               // 142
            {                                                                                                    // 142
              className: "row"                                                                                   // 142
            },                                                                                                   // 142
            React.createElement(                                                                                 // 143
              "div",                                                                                             // 143
              {                                                                                                  // 143
                className: "col s12 m4"                                                                          // 143
              },                                                                                                 // 143
              "Service by ",                                                                                     // 143
              React.createElement(                                                                               // 144
                "a",                                                                                             // 144
                {                                                                                                // 144
                  target: "_blank",                                                                              // 144
                  href: "https://github.com/James-Sangalli"                                                      // 144
                },                                                                                               // 144
                "James"                                                                                          // 144
              )                                                                                                  // 144
            ),                                                                                                   // 143
            React.createElement(                                                                                 // 146
              "div",                                                                                             // 146
              {                                                                                                  // 146
                className: "col s12 m4"                                                                          // 146
              },                                                                                                 // 146
              "UI by ",                                                                                          // 146
              React.createElement(                                                                               // 147
                "a",                                                                                             // 147
                {                                                                                                // 147
                  target: "_blank",                                                                              // 147
                  href: "http://hitchcott.com"                                                                   // 147
                },                                                                                               // 147
                "Hitchcott"                                                                                      // 147
              )                                                                                                  // 147
            ),                                                                                                   // 146
            React.createElement(                                                                                 // 149
              "div",                                                                                             // 149
              {                                                                                                  // 149
                className: "col s12 m4"                                                                          // 149
              },                                                                                                 // 149
              "Fork me on ",                                                                                     // 149
              React.createElement(                                                                               // 150
                "a",                                                                                             // 150
                {                                                                                                // 150
                  target: "_blank",                                                                              // 150
                  href: "https://github.com/James-Sangalli/State-of-the-bits"                                    // 150
                },                                                                                               // 150
                React.createElement("i", {                                                                       // 150
                  className: "fa fa-fw fa-github"                                                                // 151
                }),                                                                                              // 150
                "GitHub"                                                                                         // 150
              )                                                                                                  // 150
            )                                                                                                    // 149
          )                                                                                                      // 142
        )                                                                                                        // 141
      ),                                                                                                         // 134
      React.createElement(App.SubmitModal, null)                                                                 // 157
    );                                                                                                           // 120
  }                                                                                                              // 160
});                                                                                                              // 21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FilterArea.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/views/FilterArea.js                                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/* globals Session */var sortTypes = ['last_update', 'status'];                                                  // 1
var sortNames = {                                                                                                // 5
  last_update: 'Updated',                                                                                        // 6
  status: 'Status'                                                                                               // 7
};                                                                                                               // 5
App.FilterArea = React.createClass({                                                                             // 10
  displayName: "FilterArea",                                                                                     // 10
  propTypes: {                                                                                                   // 11
    data: React.PropTypes.object                                                                                 // 12
  },                                                                                                             // 11
  handleToggleDirection: function (e) {                                                                          // 15
    e.preventDefault();                                                                                          // 16
    var newSort = Session.get('searchSortDirection') === 1 ? -1 : 1;                                             // 17
    Session.set('searchSortDirection', newSort);                                                                 // 18
  },                                                                                                             // 19
  handleToggleType: function (e) {                                                                               // 21
    e.preventDefault();                                                                                          // 22
    var currentType = Session.get('searchSortType');                                                             // 23
    var currentIndex = sortTypes.indexOf(currentType);                                                           // 24
    var nextIndex = currentIndex + 1;                                                                            // 25
                                                                                                                 //
    if (nextIndex >= sortTypes.length) {                                                                         // 26
      nextIndex = 0;                                                                                             // 27
    }                                                                                                            // 28
                                                                                                                 //
    var newSortType = sortTypes[nextIndex];                                                                      // 29
    Session.set('searchSortType', newSortType);                                                                  // 30
  },                                                                                                             // 31
  sortDirection: function () {                                                                                   // 33
    var sorter = typeof Session !== 'undefined' ? Session.get('searchSortDirection') : App.defaultSortDirection;
    return sorter === 1 ? 'asc' : 'desc';                                                                        // 35
  },                                                                                                             // 36
  sortType: function () {                                                                                        // 38
    var sorter = typeof Session !== 'undefined' ? Session.get('searchSortType') : App.defaultSortType;           // 39
    return sortNames[sorter];                                                                                    // 40
  },                                                                                                             // 41
  render: function () {                                                                                          // 43
    return React.createElement(                                                                                  // 44
      "div",                                                                                                     // 45
      null,                                                                                                      // 45
      this.props.data.dapps.length && React.createElement(                                                       // 46
        "div",                                                                                                   // 47
        {                                                                                                        // 47
          className: "filter-area white-text"                                                                    // 47
        },                                                                                                       // 47
        React.createElement(                                                                                     // 48
          "div",                                                                                                 // 48
          {                                                                                                      // 48
            className: "col s5"                                                                                  // 48
          },                                                                                                     // 48
          this.props.data.count,                                                                                 // 49
          " dapps ",                                                                                             // 48
          this.props.data.resultType                                                                             // 49
        ),                                                                                                       // 48
        React.createElement(                                                                                     // 51
          "div",                                                                                                 // 51
          {                                                                                                      // 51
            className: "col s7 right-align"                                                                      // 51
          },                                                                                                     // 51
          "Sort: ",                                                                                              // 51
          React.createElement(                                                                                   // 52
            "a",                                                                                                 // 52
            {                                                                                                    // 52
              href: "#",                                                                                         // 52
              onClick: this.handleToggleType                                                                     // 52
            },                                                                                                   // 52
            this.sortType()                                                                                      // 52
          ),                                                                                                     // 52
          React.createElement("i", {                                                                             // 53
            onClick: this.handleToggleDirection,                                                                 // 53
            className: 'sort-direction fa fa-sort-amount-' + this.sortDirection()                                // 53
          })                                                                                                     // 53
        )                                                                                                        // 51
      )                                                                                                          // 47
    );                                                                                                           // 45
  }                                                                                                              // 59
});                                                                                                              // 10
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"IconButton.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/views/IconButton.js                                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
App.IconButton = React.createClass({                                                                             // 1
  displayName: "IconButton",                                                                                     // 1
  handleClick: function () {                                                                                     // 2
    var target = this.props.target;                                                                              // 2
    $('#' + target).openModal();                                                                                 // 4
  },                                                                                                             // 5
  componentDidMount: function () {},                                                                             // 6
  componentDidUpdate: function () {},                                                                            // 8
  runModal: function () {},                                                                                      // 11
  render: function () {                                                                                          // 13
    var _props = this.props,                                                                                     // 13
        style = _props.style,                                                                                    // 13
        customClass = _props.customClass,                                                                        // 13
        target = _props.target;                                                                                  // 13
    return React.createElement("i", {                                                                            // 15
      ref: "iconButton",                                                                                         // 16
      style: style,                                                                                              // 16
      className: customClass + " iconButton",                                                                    // 17
      "data-target": target,                                                                                     // 18
      onClick: this.handleClick,                                                                                 // 19
      "aria-hidden": "true"                                                                                      // 20
    });                                                                                                          // 16
  }                                                                                                              // 23
});                                                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InfoModal.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/views/InfoModal.js                                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
App.InfoModal = React.createClass({                                                                              // 1
  displayName: "InfoModal",                                                                                      // 1
  clickSubmitDapp: function (e) {                                                                                // 3
    e.preventDefault();                                                                                          // 4
    $('#infoModal').closeModal({                                                                                 // 5
      complete: function () {                                                                                    // 6
        $('#submitModal').openModal();                                                                           // 7
      }                                                                                                          // 8
    });                                                                                                          // 5
  },                                                                                                             // 10
  render: function () {                                                                                          // 12
    return React.createElement(                                                                                  // 13
      "div",                                                                                                     // 14
      {                                                                                                          // 14
        id: "infoModal",                                                                                         // 14
        className: "modal"                                                                                       // 14
      },                                                                                                         // 14
      React.createElement(                                                                                       // 15
        "div",                                                                                                   // 15
        {                                                                                                        // 15
          className: "modal-content"                                                                             // 15
        },                                                                                                       // 15
        React.createElement(                                                                                     // 16
          "div",                                                                                                 // 16
          {                                                                                                      // 16
            className: "section"                                                                                 // 16
          },                                                                                                     // 16
          React.createElement(                                                                                   // 18
            "div",                                                                                               // 18
            {                                                                                                    // 18
              className: "row center-align"                                                                      // 18
            },                                                                                                   // 18
            React.createElement(                                                                                 // 19
              "h3",                                                                                              // 19
              null,                                                                                              // 19
              "A Curated Collection of Bitcoin projects"                                                         // 19
            ),                                                                                                   // 19
            React.createElement(                                                                                 // 20
              "p",                                                                                               // 20
              null,                                                                                              // 20
              "List maintained by ",                                                                             // 20
              React.createElement(                                                                               // 21
                "a",                                                                                             // 21
                {                                                                                                // 21
                  href: "https://github.com/James-Sangalli",                                                     // 21
                  target: "_blank"                                                                               // 21
                },                                                                                               // 21
                "James"                                                                                          // 21
              ),                                                                                                 // 21
              ", Interface by ",                                                                                 // 20
              React.createElement(                                                                               // 21
                "a",                                                                                             // 21
                {                                                                                                // 21
                  href: "http://hitchcott.com",                                                                  // 21
                  target: "_blank"                                                                               // 21
                },                                                                                               // 21
                "Chris Hitchcott"                                                                                // 21
              )                                                                                                  // 21
            )                                                                                                    // 20
          )                                                                                                      // 18
        ),                                                                                                       // 16
        React.createElement("div", {                                                                             // 26
          className: "divider"                                                                                   // 26
        }),                                                                                                      // 26
        React.createElement(                                                                                     // 28
          "div",                                                                                                 // 28
          {                                                                                                      // 28
            className: "row"                                                                                     // 28
          },                                                                                                     // 28
          React.createElement(                                                                                   // 29
            "div",                                                                                               // 29
            {                                                                                                    // 29
              className: "col s12 m6"                                                                            // 29
            },                                                                                                   // 29
            React.createElement(                                                                                 // 30
              "div",                                                                                             // 30
              {                                                                                                  // 30
                className: "section"                                                                             // 30
              },                                                                                                 // 30
              React.createElement(                                                                               // 31
                "h4",                                                                                            // 31
                null,                                                                                            // 31
                "Status Color Key"                                                                               // 31
              ),                                                                                                 // 31
              React.createElement(                                                                               // 32
                "p",                                                                                             // 32
                null,                                                                                            // 32
                "The background of each Project shows a particular color depending on it's state:"               // 32
              ),                                                                                                 // 32
              React.createElement(                                                                               // 33
                "ul",                                                                                            // 33
                {                                                                                                // 33
                  className: "color-list"                                                                        // 33
                },                                                                                               // 33
                React.createElement(                                                                             // 34
                  "li",                                                                                          // 34
                  {                                                                                              // 34
                    className: "truncate light-green accent-3"                                                   // 34
                  },                                                                                             // 34
                  "Live"                                                                                         // 34
                ),                                                                                               // 34
                React.createElement(                                                                             // 35
                  "li",                                                                                          // 35
                  {                                                                                              // 35
                    className: "truncate green accent-2"                                                         // 35
                  },                                                                                             // 35
                  "Working Prototype"                                                                            // 35
                ),                                                                                               // 35
                React.createElement(                                                                             // 36
                  "li",                                                                                          // 36
                  {                                                                                              // 36
                    className: "truncate green accent-1"                                                         // 36
                  },                                                                                             // 36
                  "Demo"                                                                                         // 36
                ),                                                                                               // 36
                React.createElement(                                                                             // 37
                  "li",                                                                                          // 37
                  {                                                                                              // 37
                    className: "truncate amber"                                                                  // 37
                  },                                                                                             // 37
                  "Work In Progress"                                                                             // 37
                ),                                                                                               // 37
                React.createElement(                                                                             // 38
                  "li",                                                                                          // 38
                  {                                                                                              // 38
                    className: "truncate amber accent-1"                                                         // 38
                  },                                                                                             // 38
                  "Concept"                                                                                      // 38
                ),                                                                                               // 38
                React.createElement(                                                                             // 39
                  "li",                                                                                          // 39
                  {                                                                                              // 39
                    className: "truncate grey darken-2 white-text"                                               // 39
                  },                                                                                             // 39
                  "Stealth Mode"                                                                                 // 39
                ),                                                                                               // 39
                React.createElement(                                                                             // 40
                  "li",                                                                                          // 40
                  {                                                                                              // 40
                    className: "truncate red darken-2 white-text"                                                // 40
                  },                                                                                             // 40
                  "On Hold"                                                                                      // 40
                ),                                                                                               // 40
                React.createElement(                                                                             // 41
                  "li",                                                                                          // 41
                  {                                                                                              // 41
                    className: "truncate black white-text"                                                       // 41
                  },                                                                                             // 41
                  "Abandoned"                                                                                    // 41
                ),                                                                                               // 41
                React.createElement(                                                                             // 42
                  "li",                                                                                          // 42
                  {                                                                                              // 42
                    className: "truncate light-grey"                                                             // 42
                  },                                                                                             // 42
                  "Unknown"                                                                                      // 42
                )                                                                                                // 42
              )                                                                                                  // 33
            )                                                                                                    // 30
          ),                                                                                                     // 29
          React.createElement(                                                                                   // 46
            "div",                                                                                               // 46
            {                                                                                                    // 46
              className: "col s12 m6"                                                                            // 46
            },                                                                                                   // 46
            React.createElement(                                                                                 // 47
              "div",                                                                                             // 47
              {                                                                                                  // 47
                className: "section"                                                                             // 47
              },                                                                                                 // 47
              React.createElement(                                                                               // 48
                "h4",                                                                                            // 48
                null,                                                                                            // 48
                "Submit / Update your Project"                                                                   // 48
              ),                                                                                                 // 48
              React.createElement(                                                                               // 49
                "p",                                                                                             // 49
                null,                                                                                            // 49
                "If you have authored a Bitcoin Project and would like to have it added to ",                    // 49
                React.createElement(                                                                             // 49
                  "i",                                                                                           // 49
                  null,                                                                                          // 49
                  "State of the Bits"                                                                            // 49
                ),                                                                                               // 49
                ", please ",                                                                                     // 49
                React.createElement(                                                                             // 49
                  "a",                                                                                           // 49
                  {                                                                                              // 49
                    onClick: this.clickSubmitDapp,                                                               // 49
                    ref: "submitModal",                                                                          // 49
                    href: "#"                                                                                    // 49
                  },                                                                                             // 49
                  "click here to submit it for approval"                                                         // 49
                ),                                                                                               // 49
                "."                                                                                              // 49
              )                                                                                                  // 49
            )                                                                                                    // 47
          )                                                                                                      // 46
        )                                                                                                        // 28
      )                                                                                                          // 15
    );                                                                                                           // 14
  }                                                                                                              // 58
});                                                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SearchBox.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/views/SearchBox.js                                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/* globals Session */App.SearchBox = React.createClass({                                                         // 1
  displayName: "SearchBox",                                                                                      // 2
  handleKeyup: _.debounce(function () {                                                                          // 3
    Session.set('lastResult', App.initialBatchSize);                                                             // 4
    Session.set('searchQuery', this.refs.searchBox.getDOMNode().value);                                          // 5
  }, 200),                                                                                                       // 6
  render: function () {                                                                                          // 7
    return React.createElement(                                                                                  // 8
      "div",                                                                                                     // 9
      {                                                                                                          // 9
        className: "row"                                                                                         // 9
      },                                                                                                         // 9
      React.createElement(                                                                                       // 10
        "div",                                                                                                   // 10
        {                                                                                                        // 10
          className: "search-area"                                                                               // 10
        },                                                                                                       // 10
        React.createElement(                                                                                     // 11
          "div",                                                                                                 // 11
          {                                                                                                      // 11
            className: "input-field col s12"                                                                     // 11
          },                                                                                                     // 11
          React.createElement("i", {                                                                             // 12
            className: "fa fa-fw fa-search prefix"                                                               // 12
          }),                                                                                                    // 12
          React.createElement("input", {                                                                         // 13
            ref: "searchBox",                                                                                    // 13
            onKeyUp: this.handleKeyup,                                                                           // 13
            type: "text",                                                                                        // 13
            className: "search-box"                                                                              // 13
          }),                                                                                                    // 13
          React.createElement(                                                                                   // 14
            "label",                                                                                             // 14
            null,                                                                                                // 14
            "Search"                                                                                             // 14
          )                                                                                                      // 14
        )                                                                                                        // 11
      ),                                                                                                         // 10
      React.createElement(                                                                                       // 19
        "div",                                                                                                   // 19
        {                                                                                                        // 19
          className: "pull-right"                                                                                // 19
        },                                                                                                       // 19
        React.createElement(App.IconButton, {                                                                    // 20
          style: {                                                                                               // 20
            paddingLeft: '0px',                                                                                  // 20
            fontSize: '30px'                                                                                     // 20
          },                                                                                                     // 20
          customClass: "fa fa-info-circle fa-2",                                                                 // 20
          target: "infoModal"                                                                                    // 21
        }),                                                                                                      // 20
        React.createElement(App.IconButton, {                                                                    // 23
          style: {                                                                                               // 23
            paddingLeft: '5px',                                                                                  // 23
            fontSize: '30px'                                                                                     // 23
          },                                                                                                     // 23
          customClass: "fa fa-fw fa-plus-circle info-button",                                                    // 24
          target: "submitModal"                                                                                  // 25
        })                                                                                                       // 23
      )                                                                                                          // 19
    );                                                                                                           // 9
  }                                                                                                              // 29
});                                                                                                              // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SubmitModal.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/views/SubmitModal.js                                                                                     //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
App.SubmitModal = React.createClass({                                                                            // 1
  displayName: "SubmitModal",                                                                                    // 1
  handleSubmit: function (e) {                                                                                   // 3
    e.preventDefault();                                                                                          // 4
                                                                                                                 //
    if (this.refs.antiSpam.getDOMNode().value !== '42') {                                                        // 5
      window.alert('You failed the spam filter test.');                                                          // 6
    } else {                                                                                                     // 7
      var dataObj = {};                                                                                          // 8
      var $thisForm = $(this.refs.submissionForm.getDOMNode());                                                  // 9
      $thisForm.serializeArray().forEach(function (item, i) {                                                    // 10
        dataObj[item.name] = item.value;                                                                         // 11
      });                                                                                                        // 12
      Meteor.call('newSubmission', dataObj, function (err) {                                                     // 13
        if (err) {                                                                                               // 14
          window.alert(err);                                                                                     // 15
        } else {                                                                                                 // 16
          window.alert('Thank you. Your submission will be reviewed.');                                          // 17
          $thisForm[0].reset();                                                                                  // 18
          $(this.getDOMNode()).closeModal();                                                                     // 19
        }                                                                                                        // 20
      });                                                                                                        // 21
    }                                                                                                            // 22
  },                                                                                                             // 23
  componentDidMount: function () {                                                                               // 25
    $('input', this.refs.submissionForm.getDOMNode()).each(function () {                                         // 26
      var $this = $(this);                                                                                       // 27
      $this.attr('length', $this.attr('maxlength')).characterCounter();                                          // 28
    });                                                                                                          // 29
  },                                                                                                             // 30
  render: function () {                                                                                          // 32
    return React.createElement(                                                                                  // 33
      "div",                                                                                                     // 34
      {                                                                                                          // 34
        id: "submitModal",                                                                                       // 34
        className: "modal"                                                                                       // 34
      },                                                                                                         // 34
      React.createElement(                                                                                       // 35
        "div",                                                                                                   // 35
        {                                                                                                        // 35
          className: "modal-content"                                                                             // 35
        },                                                                                                       // 35
        React.createElement(                                                                                     // 36
          "div",                                                                                                 // 36
          {                                                                                                      // 36
            className: "row slim-row center-align"                                                               // 36
          },                                                                                                     // 36
          React.createElement(                                                                                   // 37
            "h4",                                                                                                // 37
            null,                                                                                                // 37
            "Submit your Bitcoin project"                                                                        // 37
          ),                                                                                                     // 37
          React.createElement(                                                                                   // 38
            "p",                                                                                                 // 38
            null,                                                                                                // 38
            "Email ",                                                                                            // 38
            React.createElement(                                                                                 // 39
              "a",                                                                                               // 39
              {                                                                                                  // 39
                href: "mailto:bitcoinsetupnz@gmail.com?subject=Bitcoin Project Submission&body=Please include your Project Name, Project Description, Organisation name, Website URL, Github URL, Software License (e.g. MIT) and Status: Abandoned, on hold, Stealth mode, Concept, Work in progress, Demo, Working Prototype or Live",
                target: "_blank"                                                                                 // 40
              },                                                                                                 // 39
              "bitcoinsetupnz@gmail.com"                                                                         // 39
            )                                                                                                    // 39
          ),                                                                                                     // 38
          React.createElement(                                                                                   // 42
            "p",                                                                                                 // 42
            null,                                                                                                // 42
            "with the following information: ",                                                                  // 42
            React.createElement(                                                                                 // 42
              "strong",                                                                                          // 42
              null,                                                                                              // 42
              "Your Project Name, Project Description, Organisation name, Website URL, Github URL, Software License (e.g. MIT) and Status "
            ),                                                                                                   // 42
            ":"                                                                                                  // 42
          ),                                                                                                     // 42
          React.createElement(                                                                                   // 45
            "p",                                                                                                 // 45
            null,                                                                                                // 45
            "1. Abandoned "                                                                                      // 45
          ),                                                                                                     // 45
          React.createElement(                                                                                   // 46
            "p",                                                                                                 // 46
            null,                                                                                                // 46
            "2. On Hold "                                                                                        // 46
          ),                                                                                                     // 46
          React.createElement(                                                                                   // 47
            "p",                                                                                                 // 47
            null,                                                                                                // 47
            "3. Stealth Mode "                                                                                   // 47
          ),                                                                                                     // 47
          React.createElement(                                                                                   // 48
            "p",                                                                                                 // 48
            null,                                                                                                // 48
            "4. Concept "                                                                                        // 48
          ),                                                                                                     // 48
          React.createElement(                                                                                   // 49
            "p",                                                                                                 // 49
            null,                                                                                                // 49
            "5. Work In Progress "                                                                               // 49
          ),                                                                                                     // 49
          React.createElement(                                                                                   // 50
            "p",                                                                                                 // 50
            null,                                                                                                // 50
            "6. Demo "                                                                                           // 50
          ),                                                                                                     // 50
          React.createElement(                                                                                   // 51
            "p",                                                                                                 // 51
            null,                                                                                                // 51
            "7. Working Prototype "                                                                              // 51
          ),                                                                                                     // 51
          React.createElement(                                                                                   // 52
            "p",                                                                                                 // 52
            null,                                                                                                // 52
            "8. Live "                                                                                           // 52
          )                                                                                                      // 52
        )                                                                                                        // 36
      )                                                                                                          // 35
    );                                                                                                           // 34
  }                                                                                                              // 58
});                                                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"router.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/router.js                                                                                                //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/* globals FlowRouter, ReactLayout */FlowRouter.route('/', {                                                     // 1
  action: function () {                                                                                          // 4
    ReactLayout.render(App.DappsList, {});                                                                       // 5
  }                                                                                                              // 6
});                                                                                                              // 3
FlowRouter.route('/dapp/:id', {                                                                                  // 8
  action: function (params) {                                                                                    // 9
    ReactLayout.render(App.DappsView, {                                                                          // 10
      _id: params.id                                                                                             // 10
    });                                                                                                          // 10
  }                                                                                                              // 11
});                                                                                                              // 8
                                                                                                                 //
if (Meteor.isServer) {                                                                                           // 14
  FlowRouter.setDeferScriptLoading(true);                                                                        // 15
}                                                                                                                // 16
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.jsx":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// both/router.jsx                                                                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/* globals FlowRouter, ReactLayout */FlowRouter.route('/', {                                                     // 1
  action: function () {                                                                                          // 4
    ReactLayout.render(App.DappsList, {});                                                                       // 5
  }                                                                                                              // 6
});                                                                                                              // 3
FlowRouter.route('/dapp/:id', {                                                                                  // 8
  action: function (params) {                                                                                    // 9
    ReactLayout.render(App.DappsView, {                                                                          // 10
      _id: params.id                                                                                             // 10
    });                                                                                                          // 10
  }                                                                                                              // 11
});                                                                                                              // 8
                                                                                                                 //
if (Meteor.isServer) {                                                                                           // 14
  FlowRouter.setDeferScriptLoading(true);                                                                        // 15
}                                                                                                                // 16
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".jsx"]});
require("./both/lib/collections.js");
require("./both/lib/methods.js");
require("./both/views/Dapp.js");
require("./both/views/DappsList.js");
require("./both/views/FilterArea.js");
require("./both/views/IconButton.js");
require("./both/views/InfoModal.js");
require("./both/views/SearchBox.js");
require("./both/views/SubmitModal.js");
require("./both/router.js");
require("./both/router.jsx");
//# sourceMappingURL=app.js.map
