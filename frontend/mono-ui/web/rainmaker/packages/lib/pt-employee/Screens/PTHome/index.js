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

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _ModuleLandingPage = require("./components/ModuleLandingPage");

var _ModuleLandingPage2 = _interopRequireDefault(_ModuleLandingPage);

var _Screen = require("egov-ui-kit/common/common/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/properties/actions");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _TransformedAssessments = require("./components/TransformedAssessments");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyle = {
  width: "45px",
  height: "45px",
  color: "#fe7a51"
};

var listIconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit"
};

var labelContainerStyle = {
  marginTop: "25px"
};

var innerDivStyle = {
  padding: "20px 56px 20px 0px",
  borderBottom: "1px solid #e0e0e0"
};

var labelStyle = {
  letterSpacing: 0.6,
  color: "rgba(0, 0, 0, 0.8700000047683716)",
  fontSize: 14,
  bold: true
};

var PTHome = function (_Component) {
  (0, _inherits3.default)(PTHome, _Component);

  function PTHome(props) {
    (0, _classCallCheck3.default)(this, PTHome);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PTHome.__proto__ || Object.getPrototypeOf(PTHome)).call(this, props));

    _this.iconStyle = {
      color: "#fe7a51",
      height: 30,
      width: 30,
      overflow: "visible"
    };

    _this.getCardItems = function () {

      return [{
        label: "PT_COLLECT_PAYMENT",
        icon: _react2.default.createElement(_components.Icon, { style: iconStyle, action: "custom", name: "home-city-outline" }),
        route: "/property-tax/search-property"
      }];
    };

    _this.getlistItems = function () {
      var numDrafts = _this.props.numDrafts;

      return [{
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_HOW_IT_WORKS", labelStyle: labelStyle }),
        route: "/property-tax/how-it-works",
        rightIcon: _react2.default.createElement(
          "div",
          { style: listIconStyle },
          _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right" })
        )
      }, {
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_EXAMPLE", labelStyle: labelStyle }),
        route: "/property-tax/pt-examples",
        rightIcon: _react2.default.createElement(
          "div",
          { style: listIconStyle },
          _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right" })
        )
      }];
    };

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title,
          location = _this$props.location,
          fetchProperties = _this$props.fetchProperties,
          userInfo = _this$props.userInfo;
      var pathname = location.pathname;

      var url = pathname && pathname.split("/").pop();
      (title || url) && url === "property-tax" && addBreadCrumbs({ title: "", path: "" });
      fetchProperties([{ key: "accountId", value: userInfo.uuid }], [{ key: "userId", value: userInfo.uuid }, { key: "isActive", value: true }, { key: "limit", value: 100 }], [{ key: "userUuid", value: userInfo.uuid }, { key: "txnStatus", value: "FAILURE" }]);
    };

    _this.handleItemClick = function (item, index) {
      var route = item.route;

      _this.props.history.push(route);
    };

    _this.state = {
      dialogueOpen: false
    };
    return _this;
  }

  (0, _createClass3.default)(PTHome, [{
    key: "render",
    value: function render() {
      var getlistItems = this.getlistItems,
          handleItemClick = this.handleItemClick,
          getCardItems = this.getCardItems;
      var _props = this.props,
          loading = _props.loading,
          history = _props.history;

      return _react2.default.createElement(
        _Screen2.default,
        { loading: loading, className: "pt-home-screen" },
        _react2.default.createElement(_ModuleLandingPage2.default, { items: getCardItems(), history: history }),
        _react2.default.createElement(
          "div",
          { style: { padding: "0px 8px" } },
          _react2.default.createElement(_components.Card, {
            className: "property-tax-card",
            textChildren: _react2.default.createElement(_components.List, {
              innerDivStyle: innerDivStyle,
              onItemClick: handleItemClick,
              listItemStyle: {
                padding: "0px 20px",
                borderWidth: "10px 10px 0px"
              },
              nestedListStyle: { padding: "0px", background: "#f2f2f2" },
              autoGenerateNestedIndicator: false,
              primaryTogglesNestedList: true,
              items: getlistItems()
            })
          })
        )
      );
    }
  }]);
  return PTHome;
}(_react.Component);

var getTransformedItems = function getTransformedItems(propertiesById) {
  return propertiesById && Object.values(propertiesById).reduce(function (acc, curr) {
    var propertyDetail = curr.propertyDetails && curr.propertyDetails.map(function (item) {
      return {
        consumerCode: curr.propertyId + ":" + item.assessmentNumber
      };
    });
    acc = [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(propertyDetail));
    return acc;
  }, []);
};

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties;

  var _ref = properties || {},
      propertiesById = _ref.propertiesById,
      draftsById = _ref.draftsById,
      loading = _ref.loading,
      failedPayments = _ref.failedPayments;

  var numProperties = propertiesById && Object.keys(propertiesById).length;
  var mergedData = failedPayments && propertiesById && (0, _TransformedAssessments.getFinalAssessments)(failedPayments, propertiesById);
  var finalFailedTransactions = mergedData && getTransformedItems(mergedData);
  var numFailedPayments = finalFailedTransactions ? Object.keys(finalFailedTransactions).length : 0;
  var transformedDrafts = Object.values(draftsById).reduce(function (result, draft) {
    var _ref2 = draft.draftRecord || {},
        prepareFormData = _ref2.prepareFormData,
        assessmentNumber = _ref2.assessmentNumber;

    if (!assessmentNumber && (0, _get2.default)(prepareFormData, "Properties[0].propertyDetails[0].financialYear")) {
      result.push(draft);
    }
    return result;
  }, []);
  var numDrafts = transformedDrafts.length + numFailedPayments;
  return { numProperties: numProperties, numDrafts: numDrafts, loading: loading };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions2.addBreadCrumbs)(url));
    },
    fetchProperties: function fetchProperties(queryObjectProperty, queryObjectDraft, queryObjectFailedPayments) {
      return dispatch((0, _actions.fetchProperties)(queryObjectProperty, queryObjectDraft, queryObjectFailedPayments));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PTHome);