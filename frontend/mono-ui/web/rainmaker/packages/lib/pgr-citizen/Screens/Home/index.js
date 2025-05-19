"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Icon = require("egov-ui-kit/components/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _common = require("modules/common");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _NewAndOldComplaints = require("./components/NewAndOldComplaints");

var _NewAndOldComplaints2 = _interopRequireDefault(_NewAndOldComplaints);

var _Notifications = require("./components/Notifications");

var _Notifications2 = _interopRequireDefault(_Notifications);

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _actions3 = require("egov-ui-kit/redux/common/actions");

var _components = require("components");

var _punjabLogo = require("egov-ui-kit/assets/images/punjab-logo.png");

var _punjabLogo2 = _interopRequireDefault(_punjabLogo);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyle = {
  color: "#fe7a51",
  height: 45,
  width: 45,
  overflow: "visible"
};

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      var _this$props = _this.props,
          fetchComplaints = _this$props.fetchComplaints,
          resetFiles = _this$props.resetFiles,
          removeForm = _this$props.removeForm;

      _this.props.fetchpgrConstants();
      _this.props.fetchUiCommonConfig();
      _this.props.fetchComplaintCategories();
      _this.props.resetCityFieldValue();
      _this.props.resetMohallaFieldValue();
      _this.props.resetFormData();
      fetchComplaints([], false);
      if (_this.props.form && _this.props.form.complaint) {
        resetFiles("reopenComplaint");
        removeForm("complaint");
      }
    }, _this.getCardItems = function () {
      var updates = _this.props.updates;

      return [{
        label: "CS_HOME_FILE_COMPLAINT",
        icon: _react2.default.createElement(_Icon2.default, { style: iconStyle, action: "custom", name: "comment-plus" }),
        route: "/add-complaint"
      }, {
        label: "CS_HOME_MY_COMPLAINTS_CARD_LABEL",
        dynamicArray: [updates.length],
        icon: _react2.default.createElement(_Icon2.default, { style: iconStyle, action: "custom", name: "account-alert" }),
        route: "/my-complaints"
      }];
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Home, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          updates = _props.updates,
          history = _props.history,
          loading = _props.loading;
      var getCardItems = this.getCardItems;

      return _react2.default.createElement(
        _common.Screen,
        { className: "homepage-screen", loading: loading },
        _react2.default.createElement(_common.ModuleLandingPage, { items: getCardItems(), history: history }),
        _react2.default.createElement(_translationNode2.default, {
          label: "CS_HOME_UPDATES",
          dark: true,
          fontSize: 16,
          fontWeight: 900,
          bold: true,
          containerStyle: { paddingLeft: 8, paddingTop: 16, paddingBottom: 8 }
        }),
        _react2.default.createElement(
          "div",
          { style: { padding: "0px 8px" } },
          _react2.default.createElement(_Notifications2.default, { updates: updates, history: history })
        )
      )

      // <Screen className="homepage-screen">
      //   {/* <div className="home-page-top-banner-cont">
      //     <div className="banner-image">
      //       <div className="banner-overlay" />
      //       <div className="logo-wrapper user-logo-wrapper">
      //         <Image className="mseva-logo" source={`${logo}`} />
      //       </div>
      //     </div>
      //   </div> */}
      //   <div className="home-page-cont">
      //     <div>
      //       <NewAndOldComplaints history={history} />
      //       <Notifications updates={updates} history={history} />
      //     </div>
      //   </div>
      // </Screen>
      ;
    }
  }]);
  return Home;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var complaints = state.complaints || {};
  var fetchSuccess = complaints.fetchSuccess;

  var loading = fetchSuccess ? false : true;

  var _ref2 = state || {},
      form = _ref2.form;

  var updates = [];
  Object.keys(complaints.byId).forEach(function (complaintKey, index) {
    var complaintObj = {};
    var complaintactions = complaints.byId[complaintKey].actions && complaints.byId[complaintKey].actions.filter(function (complaint) {
      return complaint.status;
    });
    complaintObj.status = complaints.byId[complaintKey].status;
    complaintObj.action = complaintactions && complaintactions[0].action;
    complaintObj.title = (0, _commons.mapCompIDToName)(complaints.categoriesById, complaints.byId[complaintKey].serviceCode);
    complaintObj.date = complaints.byId[complaintKey].auditDetails.createdTime;
    complaintObj.number = complaintKey;
    updates.push(complaintObj);
  });
  var closedComplaints = (0, _orderBy2.default)(updates.filter(function (complaint) {
    return complaint.status && complaint.status.toLowerCase() === "closed";
  }), ["date"], ["desc"]);

  var nonClosedComplaints = (0, _orderBy2.default)(updates.filter(function (complaint) {
    return complaint.status && complaint.status.toLowerCase() != "closed";
  }), ["date"], ["desc"]);

  return {
    form: form,
    updates: [].concat((0, _toConsumableArray3.default)(nonClosedComplaints), (0, _toConsumableArray3.default)(closedComplaints)),
    loading: loading
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria, hasUsers) {
      return dispatch((0, _actions.fetchComplaints)(criteria, hasUsers));
    },
    resetFiles: function resetFiles(formKey) {
      return dispatch((0, _actions2.resetFiles)(formKey));
    },
    removeForm: function removeForm(formKey) {
      return dispatch((0, _actions2.removeForm)(formKey));
    },
    fetchComplaintCategories: function fetchComplaintCategories() {
      return dispatch((0, _actions.fetchComplaintCategories)());
    },
    resetCityFieldValue: function resetCityFieldValue() {
      return dispatch((0, _actions2.setFieldProperty)("complaint", "city", "value", ""));
    },
    resetMohallaFieldValue: function resetMohallaFieldValue() {
      return dispatch((0, _actions2.setFieldProperty)("complaint", "mohalla", "value", ""));
    },
    resetFormData: function resetFormData() {
      return dispatch((0, _actions3.prepareFormData)("services", [{}]));
    }

  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);