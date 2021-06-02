(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ReactMeteorData;

var require = meteorInstall({"node_modules":{"meteor":{"react-meteor-data":{"meteor-data-mixin.jsx":["babel-runtime/helpers/typeof","babel-runtime/helpers/classCallCheck",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/react-meteor-data/meteor-data-mixin.jsx                                               //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _typeof2 = require("babel-runtime/helpers/typeof");                                           //
                                                                                                  //
var _typeof3 = _interopRequireDefault(_typeof2);                                                  //
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
ReactMeteorData = {                                                                               // 1
  componentWillMount: function () {                                                               // 2
    this.data = {};                                                                               // 3
    this._meteorDataManager = new MeteorDataManager(this);                                        // 4
                                                                                                  //
    var newData = this._meteorDataManager.calculateData();                                        // 5
                                                                                                  //
    this._meteorDataManager.updateData(newData);                                                  // 6
  },                                                                                              // 7
  componentWillUpdate: function (nextProps, nextState) {                                          // 8
    var saveProps = this.props;                                                                   // 9
    var saveState = this.state;                                                                   // 10
    var newData = void 0;                                                                         // 11
                                                                                                  //
    try {                                                                                         // 12
      // Temporarily assign this.state and this.props,                                            // 13
      // so that they are seen by getMeteorData!                                                  // 14
      // This is a simulation of how the proposed Observe API                                     // 15
      // for React will work, which calls observe() after                                         // 16
      // componentWillUpdate and after props and state are                                        // 17
      // updated, but before render() is called.                                                  // 18
      // See https://github.com/facebook/react/issues/3398.                                       // 19
      this.props = nextProps;                                                                     // 20
      this.state = nextState;                                                                     // 21
      newData = this._meteorDataManager.calculateData();                                          // 22
    } finally {                                                                                   // 23
      this.props = saveProps;                                                                     // 24
      this.state = saveState;                                                                     // 25
    }                                                                                             // 26
                                                                                                  //
    this._meteorDataManager.updateData(newData);                                                  // 28
  },                                                                                              // 29
  componentWillUnmount: function () {                                                             // 30
    this._meteorDataManager.dispose();                                                            // 31
  }                                                                                               // 32
}; // A class to keep the state and utility methods needed to manage                              // 1
// the Meteor data for a component.                                                               // 36
                                                                                                  //
var MeteorDataManager = function () {                                                             //
  function MeteorDataManager(component) {                                                         // 38
    (0, _classCallCheck3.default)(this, MeteorDataManager);                                       // 38
    this.component = component;                                                                   // 39
    this.computation = null;                                                                      // 40
    this.oldData = null;                                                                          // 41
  }                                                                                               // 42
                                                                                                  //
  MeteorDataManager.prototype.dispose = function () {                                             //
    function dispose() {                                                                          //
      if (this.computation) {                                                                     // 45
        this.computation.stop();                                                                  // 46
        this.computation = null;                                                                  // 47
      }                                                                                           // 48
    }                                                                                             // 49
                                                                                                  //
    return dispose;                                                                               //
  }();                                                                                            //
                                                                                                  //
  MeteorDataManager.prototype.calculateData = function () {                                       //
    function calculateData() {                                                                    //
      var component = this.component;                                                             // 52
      var props = component.props,                                                                // 51
          state = component.state;                                                                // 51
                                                                                                  //
      if (!component.getMeteorData) {                                                             // 55
        return null;                                                                              // 56
      } // When rendering on the server, we don't want to use the Tracker.                        // 57
      // We only do the first rendering on the server so we can get the data right away           // 60
                                                                                                  //
                                                                                                  //
      if (Meteor.isServer) {                                                                      // 61
        return component.getMeteorData();                                                         // 62
      }                                                                                           // 63
                                                                                                  //
      if (this.computation) {                                                                     // 65
        this.computation.stop();                                                                  // 66
        this.computation = null;                                                                  // 67
      }                                                                                           // 68
                                                                                                  //
      var data = void 0; // Use Tracker.nonreactive in case we are inside a Tracker Computation.  // 70
      // This can happen if someone calls `React.render` inside a Computation.                    // 72
      // In that case, we want to opt out of the normal behavior of nested                        // 73
      // Computations, where if the outer one is invalidated or stopped,                          // 74
      // it stops the inner one.                                                                  // 75
                                                                                                  //
      this.computation = Tracker.nonreactive(function () {                                        // 76
        return Tracker.autorun(function (c) {                                                     // 77
          if (c.firstRun) {                                                                       // 78
            var savedSetState = component.setState;                                               // 79
                                                                                                  //
            try {                                                                                 // 80
              component.setState = function () {                                                  // 81
                throw new Error("Can't call `setState` inside `getMeteorData` as this could cause an endless" + " loop. To respond to Meteor data changing, consider making this component" + " a \"wrapper component\" that only fetches data and passes it in as props to" + " a child component. Then you can use `componentWillReceiveProps` in that" + " child component.");
              };                                                                                  // 88
                                                                                                  //
              data = component.getMeteorData();                                                   // 90
            } finally {                                                                           // 91
              component.setState = savedSetState;                                                 // 92
            }                                                                                     // 93
          } else {                                                                                // 94
            // Stop this computation instead of using the re-run.                                 // 95
            // We use a brand-new autorun for each call to getMeteorData                          // 96
            // to capture dependencies on any reactive data sources that                          // 97
            // are accessed.  The reason we can't use a single autorun                            // 98
            // for the lifetime of the component is that Tracker only                             // 99
            // re-runs autoruns at flush time, while we need to be able to                        // 100
            // re-call getMeteorData synchronously whenever we want, e.g.                         // 101
            // from componentWillUpdate.                                                          // 102
            c.stop(); // Calling forceUpdate() triggers componentWillUpdate which                 // 103
            // recalculates getMeteorData() and re-renders the component.                         // 105
                                                                                                  //
            component.forceUpdate();                                                              // 106
          }                                                                                       // 107
        });                                                                                       // 108
      });                                                                                         // 109
                                                                                                  //
      if (Package.mongo && Package.mongo.Mongo) {                                                 // 111
        Object.keys(data).forEach(function (key) {                                                // 112
          if (data[key] instanceof Package.mongo.Mongo.Cursor) {                                  // 113
            console.warn("Warning: you are returning a Mongo cursor from getMeteorData. This value " + "will not be reactive. You probably want to call `.fetch()` on the cursor " + "before returning it.");
          }                                                                                       // 118
        });                                                                                       // 119
      }                                                                                           // 120
                                                                                                  //
      return data;                                                                                // 122
    }                                                                                             // 123
                                                                                                  //
    return calculateData;                                                                         //
  }();                                                                                            //
                                                                                                  //
  MeteorDataManager.prototype.updateData = function () {                                          //
    function updateData(newData) {                                                                //
      var component = this.component;                                                             // 126
      var oldData = this.oldData;                                                                 // 127
                                                                                                  //
      if (!(newData && (typeof newData === "undefined" ? "undefined" : (0, _typeof3.default)(newData)) === 'object')) {
        throw new Error("Expected object returned from getMeteorData");                           // 130
      } // update componentData in place based on newData                                         // 131
                                                                                                  //
                                                                                                  //
      for (var key in meteorBabelHelpers.sanitizeForInObject(newData)) {                          // 133
        component.data[key] = newData[key];                                                       // 134
      } // if there is oldData (which is every time this method is called                         // 135
      // except the first), delete keys in newData that aren't in                                 // 137
      // oldData.  don't interfere with other keys, in case we are                                // 138
      // co-existing with something else that writes to a component's                             // 139
      // this.data.                                                                               // 140
                                                                                                  //
                                                                                                  //
      if (oldData) {                                                                              // 141
        for (var _key in meteorBabelHelpers.sanitizeForInObject(oldData)) {                       // 142
          if (!(_key in newData)) {                                                               // 143
            delete component.data[_key];                                                          // 144
          }                                                                                       // 145
        }                                                                                         // 146
      }                                                                                           // 147
                                                                                                  //
      this.oldData = newData;                                                                     // 148
    }                                                                                             // 149
                                                                                                  //
    return updateData;                                                                            //
  }();                                                                                            //
                                                                                                  //
  return MeteorDataManager;                                                                       //
}();                                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json",".jsx"]});
require("./node_modules/meteor/react-meteor-data/meteor-data-mixin.jsx");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['react-meteor-data'] = {}, {
  ReactMeteorData: ReactMeteorData
});

})();

//# sourceMappingURL=react-meteor-data.js.map
