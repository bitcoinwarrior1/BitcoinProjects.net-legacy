var require = meteorInstall({"both":{"lib":{"collections.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/lib/collections.js                                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/* globals Mongo */this.App = {};                                                                                  // 1
App.cols = {                                                                                                       // 4
  Projects: new Mongo.Collection('projects'),                                                                      // 5
  Queue: new Mongo.Collection('queue')                                                                             // 6
};                                                                                                                 // 4
                                                                                                                   //
if (Meteor.isServer) {                                                                                             // 9
  Meteor.publish('projects', function () {                                                                         // 10
    // TODO limit this to infinite scroll data                                                                     // 11
    return App.cols.Projects.find({});                                                                             // 12
  }, {                                                                                                             // 13
    url: "/api/projects"                                                                                           // 14
  });                                                                                                              // 13
  Meteor.publish('projects-by-tag', function (tag) {                                                               // 17
    return App.cols.Projects.find({                                                                                // 18
      twitter: tag                                                                                                 // 18
    });                                                                                                            // 18
  }, {                                                                                                             // 19
    url: "/api/projects-by-tag/:0"                                                                                 // 20
  });                                                                                                              // 19
}                                                                                                                  // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"views":{"Dapp.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/views/Dapp.js                                                                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
App.Dapp = React.createClass({                                                                                     // 1
  displayName: "Dapp",                                                                                             // 1
  propTypes: {                                                                                                     // 2
    dapp: React.PropTypes.object.isRequired                                                                        // 3
  },                                                                                                               // 2
  statusColors: ['light-grey', // 0. Unknown                                                                       // 5
  'black white-text', // 1. Abandoned                                                                              // 7
  'red darken-2 white-text', // 2. On Hold                                                                         // 8
  'grey darken-2 white-text', // 3. Stealth Mode                                                                   // 9
  'amber accent-1', // 4. Concept                                                                                  // 10
  'amber', // 5. Work In Progress                                                                                  // 11
  'green accent-1', // 6. Demo                                                                                     // 12
  'green accent-2', // 7. Working Prototype                                                                        // 13
  'light-green accent-3' // 8. live                                                                                // 14
  ],                                                                                                               // 5
  render: function () {                                                                                            // 17
    var statusColor = this.statusColors[parseInt(this.props.dapp.status[0], 10)];                                  // 18
    var link = this.props.dapp.url || this.props.dapp.github || this.props.dapp.reddit || this.props.dapp.twitter;
    return React.createElement(                                                                                    // 20
      "div",                                                                                                       // 21
      {                                                                                                            // 21
        className: "col ms12 m4 l3 xl2 xxl1"                                                                       // 21
      },                                                                                                           // 21
      React.createElement(                                                                                         // 22
        "div",                                                                                                     // 22
        {                                                                                                          // 22
          className: 'card hoverable dapp-card ' + statusColor                                                     // 22
        },                                                                                                         // 22
        React.createElement(                                                                                       // 23
          "div",                                                                                                   // 23
          {                                                                                                        // 23
            className: "card-content"                                                                              // 23
          },                                                                                                       // 23
          React.createElement(                                                                                     // 24
            "div",                                                                                                 // 24
            {                                                                                                      // 24
              className: "main-section center-align"                                                               // 24
            },                                                                                                     // 24
            React.createElement(                                                                                   // 25
              "div",                                                                                               // 25
              {                                                                                                    // 25
                className: "card-title truncate"                                                                   // 25
              },                                                                                                   // 25
              link ? React.createElement(                                                                          // 26
                "a",                                                                                               // 26
                {                                                                                                  // 26
                  target: "_blank",                                                                                // 26
                  href: link                                                                                       // 26
                },                                                                                                 // 26
                this.props.dapp.name                                                                               // 26
              ) : this.props.dapp.name                                                                             // 26
            ),                                                                                                     // 25
            React.createElement(                                                                                   // 29
              "div",                                                                                               // 29
              {                                                                                                    // 29
                className: "card-subtitle trunchate"                                                               // 29
              },                                                                                                   // 29
              this.props.dapp.contact                                                                              // 30
            ),                                                                                                     // 29
            React.createElement(                                                                                   // 32
              "div",                                                                                               // 32
              {                                                                                                    // 32
                className: "card-description"                                                                      // 32
              },                                                                                                   // 32
              React.createElement(                                                                                 // 33
                "p",                                                                                               // 33
                null,                                                                                              // 33
                this.props.dapp.description                                                                        // 33
              )                                                                                                    // 33
            )                                                                                                      // 32
          ),                                                                                                       // 24
          React.createElement(                                                                                     // 36
            "div",                                                                                                 // 36
            {                                                                                                      // 36
              className: "section status-section"                                                                  // 36
            },                                                                                                     // 36
            React.createElement(                                                                                   // 37
              "p",                                                                                                 // 37
              {                                                                                                    // 37
                className: "icon-row center-align"                                                                 // 37
              },                                                                                                   // 37
              this.props.dapp.url && React.createElement(                                                          // 38
                "a",                                                                                               // 39
                {                                                                                                  // 39
                  target: "_blank",                                                                                // 39
                  href: this.props.dapp.url                                                                        // 39
                },                                                                                                 // 39
                React.createElement("i", {                                                                         // 40
                  className: "icon-link fa fa-fw fa-globe"                                                         // 40
                })                                                                                                 // 40
              ),                                                                                                   // 39
              this.props.dapp.github && React.createElement(                                                       // 43
                "a",                                                                                               // 44
                {                                                                                                  // 44
                  target: "_blank",                                                                                // 44
                  href: this.props.dapp.github                                                                     // 44
                },                                                                                                 // 44
                this.props.dapp.license,                                                                           // 45
                React.createElement("i", {                                                                         // 46
                  className: "icon-clickaBleIconlink fa fa-fw fa-github"                                           // 46
                })                                                                                                 // 46
              ),                                                                                                   // 44
              this.props.dapp.reddit && React.createElement(                                                       // 49
                "a",                                                                                               // 50
                {                                                                                                  // 50
                  target: "_blank",                                                                                // 50
                  href: this.props.dapp.reddit                                                                     // 50
                },                                                                                                 // 50
                React.createElement("i", {                                                                         // 51
                  className: "icon-link fa fa-fw fa-reddit"                                                        // 51
                })                                                                                                 // 51
              ),                                                                                                   // 50
              this.props.dapp.twitter && React.createElement(                                                      // 54
                "a",                                                                                               // 55
                {                                                                                                  // 55
                  target: "_blank",                                                                                // 55
                  href: this.props.dapp.twitter                                                                    // 55
                },                                                                                                 // 55
                React.createElement("i", {                                                                         // 56
                  className: "icon-link fa fa-fw fa-twitter"                                                       // 56
                })                                                                                                 // 56
              )                                                                                                    // 55
            ),                                                                                                     // 37
            React.createElement(                                                                                   // 60
              "p",                                                                                                 // 60
              {                                                                                                    // 60
                className: "pull-right"                                                                            // 60
              },                                                                                                   // 60
              this.props.dapp.last_update                                                                          // 61
            ),                                                                                                     // 60
            React.createElement(                                                                                   // 63
              "p",                                                                                                 // 63
              {                                                                                                    // 63
                className: "status truncate"                                                                       // 63
              },                                                                                                   // 63
              this.props.dapp.status.substring(3)                                                                  // 64
            )                                                                                                      // 63
          )                                                                                                        // 36
        )                                                                                                          // 23
      )                                                                                                            // 22
    );                                                                                                             // 21
  }                                                                                                                // 71
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DappsList.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/views/DappsList.js                                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/* globals Session, ReactMeteorData */App.initialBatchSize = 48;                                                   // 1
App.defaultSortDirection = -1; // descending sort by default                                                       // 4
                                                                                                                   //
App.defaultSortType = 'row_nr'; //'last_update'                                                                    // 5
                                                                                                                   //
var chunkSize = 24; // must be % 12 == 0, how many blocks are added                                                // 7
                                                                                                                   //
var blocksInAdvance = 6; // if the browser is this close to the bottom we will load more                           // 8
                                                                                                                   //
if (typeof Session !== 'undefined') {                                                                              // 10
    Session.set('searchQuery', '');                                                                                // 11
    Session.set('searchSortDirection', App.defaultSortDirection);                                                  // 12
    Session.set('searchSortType', App.defaultSortType);                                                            // 13
    Session.set('lastResult', App.initialBatchSize);                                                               // 14
}                                                                                                                  // 15
                                                                                                                   //
if (Meteor.isClient) {                                                                                             // 17
    var $window = $(window);                                                                                       // 18
}                                                                                                                  // 19
                                                                                                                   //
App.projectsList = React.createClass({                                                                             // 21
    displayName: "projectsList",                                                                                   // 21
    // This mixin makes the getMeteorData method work                                                              // 22
    mixins: [ReactMeteorData],                                                                                     // 23
    // fields in mongo to use in search query                                                                      // 24
    searchFields: ['name', 'description', 'twitter', 'contact', 'license', 'status'],                              // 25
    // Loads items from the projects collection and puts them on this.data.projects                                // 26
    statics: {                                                                                                     // 27
        getProjectCount: function () {                                                                             // 28
            //used for the InfoModal page whereby the dapp count is needed to price the top listing                // 30
            var data = new App.projectsList();                                                                     // 31
            return data.getMeteorData().count;                                                                     // 32
        }                                                                                                          // 33
    },                                                                                                             // 27
    getMeteorData: function () {                                                                                   // 35
        var data = {};                                                                                             // 36
        var query = {};                                                                                            // 37
        var sort = {};                                                                                             // 38
        sort[App.defaultSortType] = App.defaultSortDirection;                                                      // 39
        var limit = App.initialBatchSize;                                                                          // 40
        var searchQuery = ''; // subscribe to the data source, server and client                                   // 41
                                                                                                                   //
        Meteor.subscribe('projects'); // CLIENT ONLY                                                               // 43
                                                                                                                   //
        if (typeof Session !== 'undefined') {                                                                      // 45
            // Use the search query if one exists                                                                  // 46
            searchQuery = Session.get('searchQuery') || ''; //limit = Session.get('lastResult');                   // 47
                                                                                                                   //
            sort = {};                                                                                             // 49
            sort[Session.get('searchSortType')] = Session.get('searchSortDirection'); // the defaultSortType will always remain as a 'secondary sort'
                                                                                                                   //
            sort[App.defaultSortType] = Session.get('searchSortDirection'); // If the query is long enough, search regex pattern in all searchable fields
                                                                                                                   //
            if (searchQuery.length > 0) {                                                                          // 55
                query = {                                                                                          // 56
                    $or: []                                                                                        // 56
                };                                                                                                 // 56
                                                                                                                   //
                for (var i = 0; i < this.searchFields.length; i++) {                                               // 57
                    var thisField = {};                                                                            // 58
                    thisField[this.searchFields[i]] = {                                                            // 59
                        $regex: searchQuery,                                                                       // 59
                        $options: 'i'                                                                              // 59
                    };                                                                                             // 59
                    query.$or.push(thisField);                                                                     // 60
                }                                                                                                  // 61
            }                                                                                                      // 62
        }                                                                                                          // 63
                                                                                                                   //
        data.projects = App.cols.Projects.find(query, {                                                            // 64
            sort: sort                                                                                             // 64
        }).fetch();                                                                                                // 64
        data.count = App.cols.Projects.find(query).count();                                                        // 65
        data.resultType = searchQuery.length > 0 ? 'found' : 'listed';                                             // 66
        return data;                                                                                               // 67
    },                                                                                                             // 68
    // infinite scrolling                                                                                          // 70
    // loadMoreItems ()                                                                                            // 71
    // {                                                                                                           // 72
    //     let childCount = $('.col', this.refs.projectsection.getDOMNode()).size();                               // 73
    //     let sessionGetLastResult = Session.get('lastResult');                                                   // 74
    //     // don't try to load more items until we've matched the last request, or never fire if done             // 75
    //     if (childCount >= sessionGetLastResult) {                                                               // 76
    //         Session.set('lastResult', sessionGetLastResult + chunkSize)                                         // 77
    //     }                                                                                                       // 78
    // },                                                                                                          // 79
    // handleScroll: _.debounce(function () {                                                                      // 81
    //     // get the position of `blocksInAdvance` blocks before it ends                                          // 82
    //     let $lastItem = $('.col:last-child', this.refs.projectsection.getDOMNode())                             // 83
    //     let targetPosition = Math.round($lastItem.offset().top - ($lastItem.height() * blocksInAdvance))        // 84
    //     if ($window.scrollTop() + $window.height() >= targetPosition) {                                         // 85
    //         this.loadMoreItems()                                                                                // 86
    //     }                                                                                                       // 87
    // }, 200),                                                                                                    // 88
    //                                                                                                             // 89
    // componentDidUpdate () {                                                                                     // 90
    //     // check to see if screen is fully populated                                                            // 91
    //     let $lastItem = $('.col:last-child', this.refs.projectsection.getDOMNode())                             // 92
    //     if ($lastItem.size() && Math.floor($lastItem.offset().top) + $lastItem.height() < $window.height()) {   // 93
    //         this.loadMoreItems()                                                                                // 94
    //     }                                                                                                       // 95
    // },                                                                                                          // 96
    componentDidMount: function () {                                                                               // 98
        window.addEventListener('scroll', this.handleScroll);                                                      // 99
        this.componentDidUpdate();                                                                                 // 100
    },                                                                                                             // 101
    componentWillUnmount: function () {                                                                            // 103
        window.removeEventListener('scroll', this.handleScroll);                                                   // 104
    },                                                                                                             // 105
    scrollToTop: function () {                                                                                     // 107
        window.scrollTo(0, 0);                                                                                     // 108
    },                                                                                                             // 109
    renderprojects: function () {                                                                                  // 111
        if (this.data.projects.length) {                                                                           // 112
            return this.data.projects.map(function (dapp) {                                                        // 113
                return React.createElement(App.Dapp, {                                                             // 114
                    key: dapp._id,                                                                                 // 115
                    dapp: dapp                                                                                     // 116
                });                                                                                                // 114
            });                                                                                                    // 117
        } else {                                                                                                   // 118
            return React.createElement(                                                                            // 119
                "div",                                                                                             // 120
                {                                                                                                  // 120
                    className: "no-results center-align white-text flow-text section"                              // 120
                },                                                                                                 // 120
                React.createElement(                                                                               // 121
                    "p",                                                                                           // 121
                    null,                                                                                          // 121
                    "No Projects Found"                                                                            // 121
                )                                                                                                  // 121
            );                                                                                                     // 120
        }                                                                                                          // 124
    },                                                                                                             // 125
    render: function () {                                                                                          // 127
        return React.createElement(                                                                                // 128
            "div",                                                                                                 // 129
            null,                                                                                                  // 129
            React.createElement(                                                                                   // 130
                "div",                                                                                             // 130
                {                                                                                                  // 130
                    onClick: this.scrollToTop,                                                                     // 130
                    className: "scroll-to-top"                                                                     // 130
                },                                                                                                 // 130
                React.createElement("i", {                                                                         // 131
                    className: "fa fa-fw fa-arrow-up"                                                              // 131
                })                                                                                                 // 131
            ),                                                                                                     // 130
            React.createElement(                                                                                   // 133
                "div",                                                                                             // 133
                {                                                                                                  // 133
                    ref: "navArea",                                                                                // 133
                    className: "header-container container"                                                        // 133
                },                                                                                                 // 133
                React.createElement(                                                                               // 134
                    "header",                                                                                      // 134
                    {                                                                                              // 134
                        className: "center-align"                                                                  // 134
                    },                                                                                             // 134
                    React.createElement(                                                                           // 135
                        "h1",                                                                                      // 135
                        null,                                                                                      // 135
                        "Bitcoin Projects"                                                                         // 135
                    )                                                                                              // 135
                ),                                                                                                 // 134
                React.createElement(                                                                               // 137
                    "section",                                                                                     // 137
                    null,                                                                                          // 137
                    React.createElement(App.SearchBox, null)                                                       // 138
                )                                                                                                  // 137
            ),                                                                                                     // 133
            React.createElement(App.InfoModal, null),                                                              // 141
            React.createElement(                                                                                   // 143
                "div",                                                                                             // 143
                {                                                                                                  // 143
                    className: "black"                                                                             // 143
                },                                                                                                 // 143
                React.createElement(                                                                               // 144
                    "div",                                                                                         // 144
                    {                                                                                              // 144
                        className: "row"                                                                           // 144
                    },                                                                                             // 144
                    React.createElement(App.FilterArea, {                                                          // 145
                        data: this.data                                                                            // 145
                    }),                                                                                            // 145
                    React.createElement(                                                                           // 146
                        "section",                                                                                 // 146
                        {                                                                                          // 146
                            ref: "projectsection",                                                                 // 146
                            className: "projects row"                                                              // 146
                        },                                                                                         // 146
                        this.renderprojects()                                                                      // 147
                    )                                                                                              // 146
                ),                                                                                                 // 144
                React.createElement(                                                                               // 150
                    "footer",                                                                                      // 150
                    {                                                                                              // 150
                        className: "white-text center-align"                                                       // 150
                    },                                                                                             // 150
                    React.createElement(                                                                           // 151
                        "div",                                                                                     // 151
                        {                                                                                          // 151
                            className: "row"                                                                       // 151
                        },                                                                                         // 151
                        React.createElement(                                                                       // 152
                            "div",                                                                                 // 152
                            {                                                                                      // 152
                                className: "col s12 m4"                                                            // 152
                            },                                                                                     // 152
                            "As seen on ",                                                                         // 152
                            React.createElement(                                                                   // 153
                                "a",                                                                               // 153
                                {                                                                                  // 153
                                    target: "_blank",                                                              // 153
                                    href: "https://bitcoin.org/en/resources"                                       // 153
                                },                                                                                 // 153
                                "Bitcoin.org"                                                                      // 153
                            )                                                                                      // 153
                        ),                                                                                         // 152
                        React.createElement(                                                                       // 155
                            "div",                                                                                 // 155
                            {                                                                                      // 155
                                className: "col s12 m4"                                                            // 155
                            },                                                                                     // 155
                            React.createElement(                                                                   // 156
                                "a",                                                                               // 156
                                {                                                                                  // 156
                                    target: "_blank",                                                              // 156
                                    href: "mailto:bitcoinsetupnz@gmail.com"                                        // 156
                                },                                                                                 // 156
                                "Contact Us"                                                                       // 156
                            )                                                                                      // 156
                        )                                                                                          // 155
                    )                                                                                              // 151
                )                                                                                                  // 150
            ),                                                                                                     // 143
            React.createElement(App.SubmitModal, null),                                                            // 162
            React.createElement(App.PricingModal, null)                                                            // 163
        );                                                                                                         // 129
    }                                                                                                              // 166
});                                                                                                                // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FilterArea.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/views/FilterArea.js                                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/* globals Session */var sortTypes = ['last_update', 'status'];                                                    // 1
var sortNames = {                                                                                                  // 5
  last_update: 'Descending',                                                                                       // 6
  status: 'Ascending'                                                                                              // 7
};                                                                                                                 // 5
App.FilterArea = React.createClass({                                                                               // 10
  displayName: "FilterArea",                                                                                       // 10
  propTypes: {                                                                                                     // 11
    data: React.PropTypes.object                                                                                   // 12
  },                                                                                                               // 11
  handleToggleDirection: function (e) {                                                                            // 15
    e.preventDefault();                                                                                            // 16
    var newSort = Session.get('searchSortDirection') === 1 ? -1 : 1;                                               // 17
    Session.set('searchSortDirection', newSort);                                                                   // 18
  },                                                                                                               // 19
  handleToggleType: function (e) {                                                                                 // 21
    e.preventDefault();                                                                                            // 22
    var currentType = Session.get('searchSortType');                                                               // 23
    var currentIndex = sortTypes.indexOf(currentType);                                                             // 24
    var nextIndex = currentIndex + 1;                                                                              // 25
                                                                                                                   //
    if (nextIndex >= sortTypes.length) {                                                                           // 26
      nextIndex = 0;                                                                                               // 27
    }                                                                                                              // 28
                                                                                                                   //
    var newSortType = sortTypes[nextIndex];                                                                        // 29
    Session.set('searchSortType', newSortType);                                                                    // 30
  },                                                                                                               // 31
  sortDirection: function () {                                                                                     // 33
    var sorter = typeof Session !== 'undefined' ? Session.get('searchSortDirection') : App.defaultSortDirection;   // 34
    return sorter === 1 ? 'asc' : 'desc';                                                                          // 35
  },                                                                                                               // 36
  sortType: function () {                                                                                          // 38
    var sorter = typeof Session !== 'undefined' ? Session.get('searchSortType') : App.defaultSortType;             // 39
    return sortNames[sorter];                                                                                      // 40
  },                                                                                                               // 41
  render: function () {                                                                                            // 43
    return React.createElement(                                                                                    // 44
      "div",                                                                                                       // 45
      null,                                                                                                        // 45
      this.props.data.projects.length && React.createElement(                                                      // 46
        "div",                                                                                                     // 47
        {                                                                                                          // 47
          className: "filter-area white-text"                                                                      // 47
        },                                                                                                         // 47
        React.createElement(                                                                                       // 48
          "div",                                                                                                   // 48
          {                                                                                                        // 48
            className: "col s5"                                                                                    // 48
          },                                                                                                       // 48
          this.props.data.count,                                                                                   // 49
          " projects ",                                                                                            // 48
          this.props.data.resultType                                                                               // 49
        ),                                                                                                         // 48
        React.createElement(                                                                                       // 51
          "div",                                                                                                   // 51
          {                                                                                                        // 51
            className: "col s7 right-align"                                                                        // 51
          },                                                                                                       // 51
          "Sort: ",                                                                                                // 51
          React.createElement(                                                                                     // 52
            "a",                                                                                                   // 52
            {                                                                                                      // 52
              href: "#",                                                                                           // 52
              onClick: this.handleToggleType                                                                       // 52
            },                                                                                                     // 52
            this.sortType()                                                                                        // 52
          ),                                                                                                       // 52
          React.createElement("i", {                                                                               // 53
            onClick: this.handleToggleDirection,                                                                   // 53
            className: 'sort-direction fa fa-sort-amount-' + this.sortDirection()                                  // 53
          })                                                                                                       // 53
        )                                                                                                          // 51
      )                                                                                                            // 47
    );                                                                                                             // 45
  }                                                                                                                // 59
});                                                                                                                // 10
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"IconButton.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/views/IconButton.js                                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
App.IconButton = React.createClass({                                                                               // 1
  displayName: "IconButton",                                                                                       // 1
  handleClick: function () {                                                                                       // 3
    var target = this.props.target;                                                                                // 3
    $('#' + target).openModal();                                                                                   // 5
  },                                                                                                               // 6
  componentDidMount: function () {},                                                                               // 7
  componentDidUpdate: function () {},                                                                              // 9
  runModal: function () {},                                                                                        // 11
  render: function () {                                                                                            // 13
    var _props = this.props,                                                                                       // 13
        style = _props.style,                                                                                      // 13
        customClass = _props.customClass,                                                                          // 13
        target = _props.target;                                                                                    // 13
    return React.createElement("i", {                                                                              // 15
      ref: "iconButton",                                                                                           // 16
      style: style,                                                                                                // 16
      className: customClass + " iconButton",                                                                      // 17
      "data-target": target,                                                                                       // 18
      onClick: this.handleClick,                                                                                   // 19
      "aria-hidden": "true"                                                                                        // 20
    });                                                                                                            // 16
  }                                                                                                                // 23
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InfoModal.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/views/InfoModal.js                                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
App.InfoModal = React.createClass({                                                                                // 1
  displayName: "InfoModal",                                                                                        // 1
  clickSubmitProject: function (e) {                                                                               // 3
    e.preventDefault();                                                                                            // 4
    $('#infoModal').closeModal({                                                                                   // 5
      complete: function () {                                                                                      // 6
        $('#submitModal').openModal();                                                                             // 7
      }                                                                                                            // 8
    });                                                                                                            // 5
  },                                                                                                               // 10
  clickPricingModel: function (e) {                                                                                // 12
    e.preventDefault();                                                                                            // 13
    $("#infoModal").closeModal({                                                                                   // 14
      complete: function () {                                                                                      // 15
        $("#pricingModal").openModal();                                                                            // 16
      }                                                                                                            // 17
    });                                                                                                            // 14
  },                                                                                                               // 19
  render: function () {                                                                                            // 22
    return React.createElement(                                                                                    // 24
      "div",                                                                                                       // 25
      {                                                                                                            // 25
        id: "infoModal",                                                                                           // 25
        className: "modal"                                                                                         // 25
      },                                                                                                           // 25
      React.createElement(                                                                                         // 26
        "div",                                                                                                     // 26
        {                                                                                                          // 26
          className: "modal-content"                                                                               // 26
        },                                                                                                         // 26
        React.createElement(                                                                                       // 27
          "div",                                                                                                   // 27
          {                                                                                                        // 27
            className: "section"                                                                                   // 27
          },                                                                                                       // 27
          React.createElement(                                                                                     // 28
            "div",                                                                                                 // 28
            {                                                                                                      // 28
              className: "row center-align"                                                                        // 28
            },                                                                                                     // 28
            React.createElement(                                                                                   // 29
              "h3",                                                                                                // 29
              null,                                                                                                // 29
              "The directory of Bitcoin projects"                                                                  // 29
            ),                                                                                                     // 29
            React.createElement(                                                                                   // 30
              "p",                                                                                                 // 30
              null,                                                                                                // 30
              "Follow us on ",                                                                                     // 30
              React.createElement(                                                                                 // 31
                "a",                                                                                               // 31
                {                                                                                                  // 31
                  href: "https://twitter.com/bitc0inprojects",                                                     // 31
                  target: "_blank"                                                                                 // 31
                },                                                                                                 // 31
                "Twitter"                                                                                          // 31
              ),                                                                                                   // 31
              " and contact us at ",                                                                               // 30
              React.createElement(                                                                                 // 31
                "a",                                                                                               // 31
                {                                                                                                  // 31
                  href: "mailto:bitcoinsetupnz@gmail.com",                                                         // 31
                  target: "_blank"                                                                                 // 31
                },                                                                                                 // 31
                "bitcoinsetupnz@gmail.com"                                                                         // 31
              )                                                                                                    // 31
            )                                                                                                      // 30
          )                                                                                                        // 28
        ),                                                                                                         // 27
        React.createElement("div", {                                                                               // 36
          className: "divider"                                                                                     // 36
        }),                                                                                                        // 36
        React.createElement(                                                                                       // 37
          "div",                                                                                                   // 37
          {                                                                                                        // 37
            className: "row"                                                                                       // 37
          },                                                                                                       // 37
          React.createElement(                                                                                     // 38
            "div",                                                                                                 // 38
            {                                                                                                      // 38
              className: "col s12 m6"                                                                              // 38
            },                                                                                                     // 38
            React.createElement(                                                                                   // 39
              "div",                                                                                               // 39
              {                                                                                                    // 39
                className: "section"                                                                               // 39
              },                                                                                                   // 39
              React.createElement(                                                                                 // 40
                "h4",                                                                                              // 40
                null,                                                                                              // 40
                "Status Color Key"                                                                                 // 40
              ),                                                                                                   // 40
              React.createElement(                                                                                 // 41
                "p",                                                                                               // 41
                null,                                                                                              // 41
                "The background of each Project shows a particular color depending on it's state:"                 // 41
              ),                                                                                                   // 41
              React.createElement(                                                                                 // 42
                "ul",                                                                                              // 42
                {                                                                                                  // 42
                  className: "color-list"                                                                          // 42
                },                                                                                                 // 42
                React.createElement(                                                                               // 43
                  "li",                                                                                            // 43
                  {                                                                                                // 43
                    className: "truncate light-green accent-3"                                                     // 43
                  },                                                                                               // 43
                  "Live"                                                                                           // 43
                ),                                                                                                 // 43
                React.createElement(                                                                               // 44
                  "li",                                                                                            // 44
                  {                                                                                                // 44
                    className: "truncate green accent-2"                                                           // 44
                  },                                                                                               // 44
                  "Working Prototype"                                                                              // 44
                ),                                                                                                 // 44
                React.createElement(                                                                               // 45
                  "li",                                                                                            // 45
                  {                                                                                                // 45
                    className: "truncate amber"                                                                    // 45
                  },                                                                                               // 45
                  "Work In Progress"                                                                               // 45
                ),                                                                                                 // 45
                React.createElement(                                                                               // 46
                  "li",                                                                                            // 46
                  {                                                                                                // 46
                    className: "truncate grey darken-2 white-text"                                                 // 46
                  },                                                                                               // 46
                  "Stealth Mode"                                                                                   // 46
                ),                                                                                                 // 46
                React.createElement(                                                                               // 47
                  "li",                                                                                            // 47
                  {                                                                                                // 47
                    className: "truncate amber accent-1"                                                           // 47
                  },                                                                                               // 47
                  "Concept"                                                                                        // 47
                ),                                                                                                 // 47
                React.createElement(                                                                               // 48
                  "li",                                                                                            // 48
                  {                                                                                                // 48
                    className: "truncate red darken-2 white-text"                                                  // 48
                  },                                                                                               // 48
                  "On Hold"                                                                                        // 48
                )                                                                                                  // 48
              )                                                                                                    // 42
            )                                                                                                      // 39
          ),                                                                                                       // 38
          React.createElement(                                                                                     // 52
            "div",                                                                                                 // 52
            {                                                                                                      // 52
              className: "col s12 m6"                                                                              // 52
            },                                                                                                     // 52
            React.createElement(                                                                                   // 53
              "div",                                                                                               // 53
              {                                                                                                    // 53
                className: "section"                                                                               // 53
              },                                                                                                   // 53
              React.createElement(                                                                                 // 54
                "h4",                                                                                              // 54
                null,                                                                                              // 54
                "Submit / Update your Project"                                                                     // 54
              ),                                                                                                   // 54
              React.createElement(                                                                                 // 55
                "p",                                                                                               // 55
                null,                                                                                              // 55
                "If you have created a Bitcoin Project and would like to have it added to ",                       // 55
                React.createElement(                                                                               // 57
                  "i",                                                                                             // 57
                  null,                                                                                            // 57
                  "Bitcoin Projects"                                                                               // 57
                ),                                                                                                 // 57
                ", please ",                                                                                       // 55
                React.createElement(                                                                               // 57
                  "a",                                                                                             // 57
                  {                                                                                                // 57
                    onClick: this.clickSubmitProject,                                                              // 57
                    ref: "submitModal",                                                                            // 58
                    href: "#"                                                                                      // 58
                  },                                                                                               // 57
                  "click here to submit it for approval"                                                           // 57
                ),                                                                                                 // 57
                "."                                                                                                // 55
              )                                                                                                    // 55
            )                                                                                                      // 53
          ),                                                                                                       // 52
          React.createElement(                                                                                     // 62
            "div",                                                                                                 // 62
            {                                                                                                      // 62
              className: "col s12 m6"                                                                              // 62
            },                                                                                                     // 62
            React.createElement(                                                                                   // 63
              "div",                                                                                               // 63
              {                                                                                                    // 63
                className: "section"                                                                               // 63
              },                                                                                                   // 63
              React.createElement(                                                                                 // 64
                "h4",                                                                                              // 64
                null,                                                                                              // 64
                "Jump to the top of the list"                                                                      // 64
              ),                                                                                                   // 64
              React.createElement(                                                                                 // 65
                "p",                                                                                               // 65
                null,                                                                                              // 65
                "To get to the top of the list take a look here ",                                                 // 65
                React.createElement(                                                                               // 65
                  "a",                                                                                             // 65
                  {                                                                                                // 65
                    onClick: this.clickPricingModel,                                                               // 65
                    ref: "pricingModal",                                                                           // 66
                    href: "#"                                                                                      // 66
                  },                                                                                               // 65
                  " at our pricing model"                                                                          // 65
                )                                                                                                  // 65
              )                                                                                                    // 65
            )                                                                                                      // 63
          ),                                                                                                       // 62
          React.createElement(                                                                                     // 70
            "div",                                                                                                 // 70
            {                                                                                                      // 70
              className: "col s12 m6"                                                                              // 70
            },                                                                                                     // 70
            React.createElement(                                                                                   // 71
              "div",                                                                                               // 71
              {                                                                                                    // 71
                className: "section"                                                                               // 71
              },                                                                                                   // 71
              React.createElement(                                                                                 // 72
                "h4",                                                                                              // 72
                null,                                                                                              // 72
                "Looking for Blockchain Developers?"                                                               // 72
              ),                                                                                                   // 72
              React.createElement(                                                                                 // 73
                "p",                                                                                               // 73
                null,                                                                                              // 73
                "Email us at ",                                                                                    // 73
                React.createElement(                                                                               // 73
                  "a",                                                                                             // 73
                  {                                                                                                // 73
                    href: "mailto:bitcoinsetupnz@gmail.com"                                                        // 73
                  },                                                                                               // 73
                  "bitcoinsetupnz@gmail.com"                                                                       // 73
                )                                                                                                  // 73
              )                                                                                                    // 73
            )                                                                                                      // 71
          )                                                                                                        // 70
        )                                                                                                          // 37
      )                                                                                                            // 26
    );                                                                                                             // 25
  }                                                                                                                // 80
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PricingModal.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/views/PricingModal.js                                                                                      //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
App.PricingModal = React.createClass({                                                                             // 1
    displayName: "PricingModal",                                                                                   // 1
    render: function () {                                                                                          // 3
        return React.createElement(                                                                                // 5
            "div",                                                                                                 // 6
            {                                                                                                      // 6
                id: "pricingModal",                                                                                // 6
                className: "modal"                                                                                 // 6
            },                                                                                                     // 6
            React.createElement(                                                                                   // 7
                "div",                                                                                             // 7
                {                                                                                                  // 7
                    className: "modal-content"                                                                     // 7
                },                                                                                                 // 7
                React.createElement(                                                                               // 8
                    "div",                                                                                         // 8
                    {                                                                                              // 8
                        className: "row slim-row center-align"                                                     // 8
                    },                                                                                             // 8
                    React.createElement(                                                                           // 9
                        "h3",                                                                                      // 9
                        null,                                                                                      // 9
                        "Get the most attention by placing yourself at the top of the list"                        // 9
                    ),                                                                                             // 9
                    React.createElement(                                                                           // 10
                        "p",                                                                                       // 10
                        null,                                                                                      // 10
                        "To get into the top 4 places on this site for a month (in the default sorting order) costs $500 USD worth of Bitcoin"
                    ),                                                                                             // 10
                    React.createElement(                                                                           // 12
                        "p",                                                                                       // 12
                        null,                                                                                      // 12
                        "Email us at ",                                                                            // 12
                        React.createElement(                                                                       // 12
                            "a",                                                                                   // 12
                            {                                                                                      // 12
                                href: "mailto:bitcoinsetupnz@gmail.com",                                           // 12
                                target: "_blank"                                                                   // 12
                            },                                                                                     // 12
                            "bitcoinsetupnz@gmail.com "                                                            // 12
                        ),                                                                                         // 12
                        "if you are interested"                                                                    // 12
                    ),                                                                                             // 12
                    React.createElement(                                                                           // 14
                        "p",                                                                                       // 14
                        null,                                                                                      // 14
                        React.createElement(                                                                       // 15
                            "strong",                                                                              // 15
                            null,                                                                                  // 15
                            " We offer a no questions asked refund guarantee for 30 days "                         // 15
                        )                                                                                          // 15
                    ),                                                                                             // 14
                    React.createElement(                                                                           // 17
                        "p",                                                                                       // 17
                        null,                                                                                      // 17
                        React.createElement(                                                                       // 18
                            "b",                                                                                   // 18
                            null,                                                                                  // 18
                            "As seen on ",                                                                         // 18
                            React.createElement(                                                                   // 18
                                "a",                                                                               // 18
                                {                                                                                  // 18
                                    href: "https://bitcoin.org/en/resources"                                       // 18
                                },                                                                                 // 18
                                " Bitcoin.org "                                                                    // 18
                            )                                                                                      // 18
                        )                                                                                          // 18
                    )                                                                                              // 17
                )                                                                                                  // 8
            )                                                                                                      // 7
        );                                                                                                         // 6
    }                                                                                                              // 24
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SearchBox.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/views/SearchBox.js                                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/* globals Session */App.SearchBox = React.createClass({                                                           // 1
  displayName: "SearchBox",                                                                                        // 2
  handleKeyup: _.debounce(function () {                                                                            // 3
    Session.set('lastResult', App.initialBatchSize);                                                               // 4
    Session.set('searchQuery', this.refs.searchBox.getDOMNode().value);                                            // 5
  }, 200),                                                                                                         // 6
  render: function () {                                                                                            // 7
    return React.createElement(                                                                                    // 8
      "div",                                                                                                       // 9
      {                                                                                                            // 9
        className: "row"                                                                                           // 9
      },                                                                                                           // 9
      React.createElement(                                                                                         // 10
        "div",                                                                                                     // 10
        {                                                                                                          // 10
          className: "search-area"                                                                                 // 10
        },                                                                                                         // 10
        React.createElement(                                                                                       // 11
          "div",                                                                                                   // 11
          {                                                                                                        // 11
            className: "input-field col s12"                                                                       // 11
          },                                                                                                       // 11
          React.createElement("i", {                                                                               // 12
            className: "fa fa-fw fa-search prefix"                                                                 // 12
          }),                                                                                                      // 12
          React.createElement("input", {                                                                           // 13
            ref: "searchBox",                                                                                      // 13
            onKeyUp: this.handleKeyup,                                                                             // 13
            type: "text",                                                                                          // 13
            className: "search-box"                                                                                // 13
          }),                                                                                                      // 13
          React.createElement(                                                                                     // 14
            "label",                                                                                               // 14
            null,                                                                                                  // 14
            "Search"                                                                                               // 14
          )                                                                                                        // 14
        )                                                                                                          // 11
      ),                                                                                                           // 10
      React.createElement(                                                                                         // 19
        "div",                                                                                                     // 19
        {                                                                                                          // 19
          className: "pull-right"                                                                                  // 19
        },                                                                                                         // 19
        React.createElement(App.IconButton, {                                                                      // 20
          style: {                                                                                                 // 20
            paddingLeft: '0px',                                                                                    // 20
            fontSize: '30px'                                                                                       // 20
          },                                                                                                       // 20
          customClass: "fa fa-info-circle fa-2",                                                                   // 20
          target: "infoModal"                                                                                      // 21
        }),                                                                                                        // 20
        React.createElement(App.IconButton, {                                                                      // 23
          style: {                                                                                                 // 23
            paddingLeft: '5px',                                                                                    // 23
            fontSize: '30px'                                                                                       // 23
          },                                                                                                       // 23
          customClass: "fa fa-fw fa-plus-circle info-button",                                                      // 24
          target: "submitModal"                                                                                    // 25
        })                                                                                                         // 23
      )                                                                                                            // 19
    );                                                                                                             // 9
  }                                                                                                                // 29
});                                                                                                                // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SubmitModal.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/views/SubmitModal.js                                                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
App.SubmitModal = React.createClass({                                                                              // 1
  displayName: "SubmitModal",                                                                                      // 1
  componentDidMount: function () {                                                                                 // 3
    $('input', this.refs.submissionForm.getDOMNode()).each(function () {                                           // 5
      var $this = $(this);                                                                                         // 6
      $this.attr('length', $this.attr('maxlength')).characterCounter();                                            // 7
    });                                                                                                            // 8
  },                                                                                                               // 9
  render: function () {                                                                                            // 11
    return React.createElement(                                                                                    // 13
      "div",                                                                                                       // 14
      {                                                                                                            // 14
        id: "submitModal",                                                                                         // 14
        className: "modal"                                                                                         // 14
      },                                                                                                           // 14
      React.createElement(                                                                                         // 15
        "div",                                                                                                     // 15
        {                                                                                                          // 15
          className: "modal-content"                                                                               // 15
        },                                                                                                         // 15
        React.createElement(                                                                                       // 16
          "div",                                                                                                   // 16
          {                                                                                                        // 16
            className: "row slim-row center-align"                                                                 // 16
          },                                                                                                       // 16
          React.createElement(                                                                                     // 17
            "h4",                                                                                                  // 17
            null,                                                                                                  // 17
            "Submit your Bitcoin project"                                                                          // 17
          ),                                                                                                       // 17
          React.createElement(                                                                                     // 18
            "p",                                                                                                   // 18
            null,                                                                                                  // 18
            "Email ",                                                                                              // 18
            React.createElement(                                                                                   // 19
              "a",                                                                                                 // 19
              {                                                                                                    // 19
                href: "mailto:bitcoinsetupnz@gmail.com? subject=Bitcoin Project Submission&body=Please include your Project Name, Project Description, Organisation name, Website, Github, Twitter, Reddit, Software License (e.g. MIT) and Status: On Hold, Concept, Stealth mode, Work in progress, Working Prototype or Live",
                target: "_blank"                                                                                   // 24
              },                                                                                                   // 19
              "bitcoinsetupnz@gmail.com"                                                                           // 19
            )                                                                                                      // 19
          ),                                                                                                       // 18
          React.createElement(                                                                                     // 26
            "p",                                                                                                   // 26
            null,                                                                                                  // 26
            "with the following information: "                                                                     // 26
          ),                                                                                                       // 26
          React.createElement(                                                                                     // 27
            "p",                                                                                                   // 27
            null,                                                                                                  // 27
            React.createElement(                                                                                   // 27
              "strong",                                                                                            // 27
              null,                                                                                                // 27
              "Your Project Name, Project Description, Organisation name, Website, Github, Twitter, Reddit, Software License (e.g. MIT) and Status "
            ),                                                                                                     // 27
            ":"                                                                                                    // 27
          ),                                                                                                       // 27
          React.createElement(                                                                                     // 30
            "p",                                                                                                   // 30
            null,                                                                                                  // 30
            "1. On Hold "                                                                                          // 30
          ),                                                                                                       // 30
          React.createElement(                                                                                     // 31
            "p",                                                                                                   // 31
            null,                                                                                                  // 31
            "2. Concept"                                                                                           // 31
          ),                                                                                                       // 31
          React.createElement(                                                                                     // 32
            "p",                                                                                                   // 32
            null,                                                                                                  // 32
            "3. Stealth Mode "                                                                                     // 32
          ),                                                                                                       // 32
          React.createElement(                                                                                     // 33
            "p",                                                                                                   // 33
            null,                                                                                                  // 33
            "4. Work In Progress "                                                                                 // 33
          ),                                                                                                       // 33
          React.createElement(                                                                                     // 34
            "p",                                                                                                   // 34
            null,                                                                                                  // 34
            "5. Working Prototype "                                                                                // 34
          ),                                                                                                       // 34
          React.createElement(                                                                                     // 35
            "p",                                                                                                   // 35
            null,                                                                                                  // 35
            "6. Live "                                                                                             // 35
          )                                                                                                        // 35
        )                                                                                                          // 16
      )                                                                                                            // 15
    );                                                                                                             // 14
  }                                                                                                                // 40
});                                                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"router.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// both/router.js                                                                                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/* globals FlowRouter, ReactLayout */FlowRouter.route('/', {                                                       // 1
  action: function () {                                                                                            // 4
    ReactLayout.render(App.projectsList, {});                                                                      // 5
  }                                                                                                                // 6
});                                                                                                                // 3
FlowRouter.route('/dapp/:id', {                                                                                    // 8
  action: function (params) {                                                                                      // 9
    ReactLayout.render(App.projectsView, {                                                                         // 10
      _id: params.id                                                                                               // 10
    });                                                                                                            // 10
  }                                                                                                                // 11
});                                                                                                                // 8
                                                                                                                   //
if (Meteor.isServer) {                                                                                             // 14
  FlowRouter.setDeferScriptLoading(true);                                                                          // 15
}                                                                                                                  // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./both/lib/collections.js");
require("./both/views/Dapp.js");
require("./both/views/DappsList.js");
require("./both/views/FilterArea.js");
require("./both/views/IconButton.js");
require("./both/views/InfoModal.js");
require("./both/views/PricingModal.js");
require("./both/views/SearchBox.js");
require("./both/views/SubmitModal.js");
require("./both/router.js");
//# sourceMappingURL=app.js.map
