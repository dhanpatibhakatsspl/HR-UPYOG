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

var _AssessmentList = require("../common/AssessmentList");

var _AssessmentList2 = _interopRequireDefault(_AssessmentList);

var _common = require("modules/common");

var _reactRedux = require("react-redux");

var _components = require("components");

var _actions = require("egov-ui-kit/redux/app/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _actions2 = require("egov-ui-kit/redux/properties/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _TransformedAssessments = require("../common/TransformedAssessments");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secondaryTextLabelStyle = {
  letterSpacing: 0.5
};

var primaryTextLabelStyle = {
  letterSpacing: 0.6
};

var secondaryTextContainer = {
  marginTop: 5
};

var innerDivStyle = {
  padding: "0px",
  borderBottom: "1px solid #e0e0e0"
};

var IncompleteAssessments = function (_Component) {
  (0, _inherits3.default)(IncompleteAssessments, _Component);

  function IncompleteAssessments() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, IncompleteAssessments);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = IncompleteAssessments.__proto__ || Object.getPrototypeOf(IncompleteAssessments)).call.apply(_ref, [this].concat(args))), _this), _this.iconStyle = {
      marginLeft: "10px",
      height: "20px"
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title,
          userInfo = _this$props.userInfo,
          fetchProperties = _this$props.fetchProperties;

      title && addBreadCrumbs({ title: title, path: window.location.pathname });
      fetchProperties([{ key: "accountId", value: userInfo.uuid }], [{ key: "userId", value: userInfo.uuid }, { key: "isActive", value: true }, { key: "limit", value: 100 }], [{ key: "userUuid", value: userInfo.uuid }, { key: "txnStatus", value: "FAILURE" }, { key: "limit", value: 100 }]);
    }, _this.onListItemClick = function (item) {
      var route = item.route;


      _this.props.history.push(route);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(IncompleteAssessments, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          history = _props.history,
          loading = _props.loading,
          sortedProperties = _props.sortedProperties;

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "screen-with-bredcrumb" },
        _react2.default.createElement(_components.BreadCrumbs, { url: urls, history: history }),
        sortedProperties && _react2.default.createElement(_AssessmentList2.default, {
          onItemClick: this.onListItemClick,
          history: history,
          items: sortedProperties,
          innerDivStyle: innerDivStyle,
          noAssessmentMessage: "PT_NO_ASSESSMENT_MESSAGE2",
          button: false
        })
      );
    }
  }]);
  return IncompleteAssessments;
}(_react.Component);

var getTransformedItems = function getTransformedItems(propertiesById, cities) {
  return propertiesById && Object.values(propertiesById).reduce(function (acc, curr) {
    var propertyDetail = curr.propertyDetails && curr.propertyDetails.map(function (item) {
      return {
        primaryText: _react2.default.createElement(
          "div",
          { className: "incomplete-assesment-info" },
          _react2.default.createElement(_translationNode2.default, {
            label: item.financialYear,
            fontSize: "16px",
            color: "#484848",
            labelStyle: primaryTextLabelStyle,
            bold: true
          }),
          _react2.default.createElement(
            "div",
            { style: { height: "auto" } },
            _react2.default.createElement(_translationNode2.default, {
              label: (0, _commons.getCommaSeperatedAddress)(curr.address, cities),
              labelStyle: secondaryTextLabelStyle,
              fontSize: "14px",
              containerStyle: secondaryTextContainer,
              color: "#484848"
            }),
            _react2.default.createElement(_translationNode2.default, {
              label: "Assessment No.: " + (0, _get2.default)(item, "assessmentNumber"),
              labelStyle: secondaryTextLabelStyle,
              fontSize: "13px",
              containerStyle: secondaryTextContainer,
              color: "#767676"
            })
          )
        ),
        // secondaryText: (
        //   <div style={{ height: "auto" }}>
        //     <Label
        //       label={getCommaSeperatedAddress(curr.address, cities)}
        //       labelStyle={secondaryTextLabelStyle}
        //       fontSize="14px"
        //       containerStyle={secondaryTextContainer}
        //       color="#484848"
        //     />
        //     <Label
        //       label={`Assessment No.: ${get(item, "assessmentNumber")}`}
        //       labelStyle={secondaryTextLabelStyle}
        //       fontSize="13px"
        //       containerStyle={secondaryTextContainer}
        //       color="#767676"
        //     />
        //   </div>
        // )
        epocDate: (0, _get2.default)(item, "auditDetails.lastModifiedTime"),
        route: "/property-tax/assessment-form?FY=" + item.financialYear + "&assessmentId=" + item.assessmentNumber + "&purpose=reassess&propertyId=" + curr.propertyId + "&tenantId=" + item.tenantId,
        date: item.auditDetails ? (0, _commons.getDateFromEpoch)((0, _get2.default)(item, "auditDetails.lastModifiedTime")) : "",
        status: "Payment failed"
      };
    });
    acc = [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(propertyDetail));
    return acc;
  }, []);
};

var getAddressFromProperty = function getAddressFromProperty(address, mohallaById) {
  return mohallaById && {
    doorNo: (0, _get2.default)(address, "doorNo"),
    buildingName: (0, _get2.default)(address, "buildingName"),
    street: (0, _get2.default)(address, "street"),
    pincode: (0, _get2.default)(address, "pincode"),
    locality: {
      name: mohallaById ? mohallaById[(0, _get2.default)(address, "locality.code")] ? mohallaById[(0, _get2.default)(address, "locality.code")].name : "" : ""
    },
    city: (0, _get2.default)(address, "city")
  };
};

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties,
      common = state.common;
  var urls = state.app.urls;
  var cities = common.cities;

  var _ref2 = properties || {},
      loading = _ref2.loading,
      draftsById = _ref2.draftsById,
      propertiesById = _ref2.propertiesById,
      failedPayments = _ref2.failedPayments,
      mohallaById = _ref2.mohallaById;

  var transformedDrafts = Object.values(draftsById).reduce(function (result, draft) {
    var _ref3 = draft.draftRecord || {},
        prepareFormData = _ref3.prepareFormData,
        assessmentNumber = _ref3.assessmentNumber;

    if (!assessmentNumber && (0, _get2.default)(prepareFormData, "Properties[0].propertyDetails[0].financialYear")) {
      var address = getAddressFromProperty((0, _get2.default)(prepareFormData, "Properties[0].address"), mohallaById);
      var financialYear = (0, _get2.default)(prepareFormData, "Properties[0].propertyDetails[0].financialYear");
      result.push({
        primaryText: _react2.default.createElement(
          "div",
          { className: "incomplete-assesment-info" },
          _react2.default.createElement(_translationNode2.default, {
            label: financialYear,
            fontSize: "16px",
            color: "#484848",
            labelStyle: primaryTextLabelStyle,
            bold: true
          }),
          _react2.default.createElement(
            "div",
            { style: { height: "auto" } },
            _react2.default.createElement(_translationNode2.default, {
              label: (0, _commons.getCommaSeperatedAddress)(address, cities),
              labelStyle: secondaryTextLabelStyle,
              fontSize: "14px",
              containerStyle: secondaryTextContainer,
              color: "#484848"
            })
          )
        ),
        // secondaryText: (
        //   <div style={{ height: "auto" }}>
        //     <Label
        //       label={getCommaSeperatedAddress(address, cities)}
        //       labelStyle={secondaryTextLabelStyle}
        //       fontSize="14px"
        //       containerStyle={secondaryTextContainer}
        //       color="#484848"
        //     />
        //   </div>
        // )
        epocDate: (0, _get2.default)(draft, "auditDetails.lastModifiedTime"),
        route: "/property-tax/assessment-form?FY=" + financialYear + "&assessmentId=" + draft.id + "&tenantId=" + draft.tenantId,
        financialYear: financialYear,
        assessmentNo: draft.id,
        date: draft.auditDetails ? (0, _commons.getDateFromEpoch)((0, _get2.default)(draft, "auditDetails.lastModifiedTime")) : "",
        status: "Saved Draft"
      });
    }
    return result;
  }, []);
  var mergedData = failedPayments && propertiesById && (0, _TransformedAssessments.getFinalAssessments)(failedPayments, propertiesById);
  var finalFailedTransactions = mergedData && getTransformedItems(mergedData, cities);
  var incompleteAssessments = transformedDrafts ? finalFailedTransactions ? [].concat((0, _toConsumableArray3.default)(transformedDrafts), (0, _toConsumableArray3.default)(finalFailedTransactions)) : [].concat((0, _toConsumableArray3.default)(transformedDrafts)) : [];

  var sortedProperties = incompleteAssessments && (0, _orderBy2.default)(incompleteAssessments, ["epocDate"], ["desc"]);

  return { urls: urls, loading: loading, sortedProperties: sortedProperties };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    },
    fetchProperties: function fetchProperties(queryObjectProperty, queryObjectDraft, queryObjectFailedPayments) {
      return dispatch((0, _actions2.fetchProperties)(queryObjectProperty, queryObjectDraft, queryObjectFailedPayments));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(IncompleteAssessments);