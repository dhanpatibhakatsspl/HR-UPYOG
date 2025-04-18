"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _CommonShare = require("egov-ui-kit/components/CommonShare");

var _CommonShare2 = _interopRequireDefault(_CommonShare);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonShareContainer = function (_React$Component) {
  (0, _inherits3.default)(CommonShareContainer, _React$Component);

  function CommonShareContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CommonShareContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CommonShareContainer.__proto__ || Object.getPrototypeOf(CommonShareContainer)).call.apply(_ref, [this].concat(args))), _this), _this.visible = false, _this.currentRole = null, _this.shareCallBack = function () {
      var _this$props = _this.props,
          actionComponentMapping = _this$props.actionComponentMapping,
          componentId = _this$props.componentId,
          complaints = _this$props.complaints;
      var _this2 = _this,
          matchedURL = _this2.matchedURL,
          currentRole = _this2.currentRole,
          indexMenu = _this2.indexMenu;

      if (currentRole !== null && indexMenu !== -1 && matchedURL) {
        var metaData = actionComponentMapping[componentId][matchedURL][currentRole]["metaData"];
        var jsonPaths = metaData.jsonPaths;
        var template = metaData.template;
        var title = metaData.title;

        jsonPaths.forEach(function (path, index) {
          template = template.replace("{" + index + "}", (0, _get2.default)(complaints, path, ""));
        });

        navigator.share({
          title: title,
          text: template,
          url: ""
        }).then(function () {
          return console.log("Successful share");
        }).catch(function (error) {
          return console.log("Error sharing", error);
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  } //URL Route matching with respect to actionComponentMapping
  //current Role matched from localstorage and urlRoles


  (0, _createClass3.default)(CommonShareContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          location = _props.location,
          menu = _props.menu,
          actionComponentMapping = _props.actionComponentMapping,
          componentId = _props.componentId,
          complaints = _props.complaints;

      this.visible = false;
      this.matchedURL = null;
      this.indexMenu = menu && menu.findIndex(function (elem) {
        return elem.name === componentId;
      });
      var actionData = (0, _get2.default)(actionComponentMapping, componentId);
      var actionURLs = actionData && Object.keys(actionData);
      var isPathMatched = actionURLs && actionURLs.findIndex(function (elem) {
        return (0, _reactRouter.matchPath)(location.pathname, {
          path: elem,
          exact: true,
          strict: false
        });
      });
      //Get User Role from localStorage
      var roleDefination = { rolePath: "user-info.roles" };
      var splitList = (0, _get2.default)(roleDefination, "rolePath").split(".");
      var localdata = JSON.parse((0, _localStorageUtils.localStorageGet)(splitList[0]));
      var localRoles = localdata && (0, _get2.default)(localdata, splitList.slice(1).join("."), localdata);

      var roleCodes = localRoles && localRoles.length > 0 && localRoles.map(function (elem) {
        return (0, _get2.default)(elem, "code");
      });
      var urlRoles = void 0; //Roles for given url

      if (isPathMatched !== undefined && isPathMatched !== -1) {
        this.matchedURL = actionURLs[isPathMatched];
        urlRoles = Object.keys((0, _get2.default)(actionData, this.matchedURL));
        for (var i = 0; i < roleCodes.length; i++) {
          if (urlRoles.includes(roleCodes[i])) {
            this.currentRole = roleCodes[i];
            break;
          }
        }
      }

      if (this.currentRole !== null && this.indexMenu !== -1 && this.matchedURL && !(0, _isEmpty2.default)(complaints)) {
        this.visible = true;
      }
      return _react2.default.createElement(
        "div",
        { className: "share-btn" },
        navigator.share && _react2.default.createElement(_CommonShare2.default, { variant: "fab", visible: this.visible, shareCallback: this.shareCallBack })
      );
    }
  }]);
  return CommonShareContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var menu = state.app.menu || [];
  var uiCommonConfig = state.app.uiCommonConfig || {};
  var actionComponentMapping = uiCommonConfig["action-component-mapping"];
  var prepareFormData = state.common.prepareFormData || {};
  var complaints = prepareFormData.complaints;


  return { menu: menu, actionComponentMapping: actionComponentMapping, complaints: complaints };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(CommonShareContainer));