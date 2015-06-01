// Generated by CoffeeScript 1.4.0
(function() {
  var RouterTransitions,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  RouterTransitions = (function() {

    RouterTransitions.prototype.WILDCARD = '>>';

    function RouterTransitions() {
      this.register = __bind(this.register, this);

      var _this = this;
      Tracker.autorun(function() {
        var newPath, _ref;
        newPath = (_ref = Router.current()) != null ? _ref.location.get().path : void 0;
        if (_this._oldPath !== newPath) {
          _this._matchingDestinations.forEach(function(destinations) {
            var origin;
            origin = destinations.origin;
            return Object.keys(destinations.targets).forEach(function(key) {
              if (!newPath.match("" + origin + ".*") && (key === _this.WILDCARD || newPath.match("" + key + ".*"))) {
                return destinations.targets[key]();
              }
            });
          });
        }
        _this._matchingOrigins = Object.keys(_this.dictionnary).filter(function(origin) {
          return newPath.match("" + origin + ".*");
        });
        _this._matchingDestinations = _this._matchingOrigins.map(function(key) {
          return {
            targets: _this.dictionnary[key],
            origin: key
          };
        });
        return _this._oldPath = newPath;
      });
    }

    /*
      @param {String} origin : the namespace of the incoming path, null for any match. Origin can be a subroute of destination.
      @param {String} destination : the namespace of the forthcoming path, null for any match.
        !IMPORTANT! destination cannot be a subroute of origin
      @param {String} hook : the callback to be run on matching conditions
    */


    RouterTransitions.prototype.register = function(origin, destination, hook) {
      var hooks;
      origin = origin || this.WILDCARD;
      destination = destination || this.WILDCARD;
      if (this.dictionnary[origin]) {
        return this.dictionnary[origin][destination] = hook;
      } else {
        hooks = this.dictionnary[origin] = {};
        return hooks[destination] = hook;
      }
    };

    RouterTransitions.prototype.dictionnary = {};

    RouterTransitions.prototype._oldPath = '/';

    RouterTransitions.prototype._matchingDestinations = [];

    RouterTransitions.prototype._matchingOrigins = [];

    return RouterTransitions;

  })();

  /*
    To register a transition, simply call register() method
  */


  window.RouterTransitions = new RouterTransitions();

}).call(this);