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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _common = require("modules/common");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/common/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _TransformedAssessments = require("../common/TransformedAssessments");

var _actions3 = require("egov-ui-kit/redux/app/actions");

var _actions4 = require("egov-ui-kit/redux/properties/actions");

var _common2 = require("config/common.js");

var _common3 = _interopRequireDefault(_common2);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var innerDivStyle = {
  padding: "0px",
  borderBottom: "1px solid #e0e0e0"
};

var secondaryTextLabelStyle = {
  letterSpacing: 0.5
};

var primaryTextLabelStyle = {
  letterSpacing: 0.6
};

var secondaryTextContainer = {
  marginTop: 5
};

var CompletedAssessments = function (_Component) {
  (0, _inherits3.default)(CompletedAssessments, _Component);

  function CompletedAssessments() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CompletedAssessments);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CompletedAssessments.__proto__ || Object.getPrototypeOf(CompletedAssessments)).call.apply(_ref, [this].concat(args))), _this), _this.iconStyle = {
      marginLeft: "10px",
      height: "20px"
    }, _this.state = {
      dialogueOpen: false,
      items: [{
        primaryText: _react2.default.createElement(_translationNode2.default, {
          label: "INR 1300.00",
          fontSize: "16px",
          color: "#484848",
          bold: true,
          labelStyle: primaryTextLabelStyle
        }),
        secondaryText: _react2.default.createElement(
          "div",
          { style: { height: "auto" } },
          _react2.default.createElement(_translationNode2.default, {
            label: "2016-2017",
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: "P-9/2, Banwinder Colony, alwal Road, Indirapuram",
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: "Assessment No.: ZRN-453-98",
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle
          })
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: _react2.default.createElement(_components.Icon, {
          action: "navigation",
          name: "check",
          style: _this.iconStyle,
          color: "#22b25f"
        }),
        receipt: true
      }]
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title,
          userInfo = _this$props.userInfo,
          fetchGeneralMDMSData = _this$props.fetchGeneralMDMSData,
          getAssesmentsandStatus = _this$props.getAssesmentsandStatus,
          form = _this$props.form,
          removeForm = _this$props.removeForm;

      title && addBreadCrumbs({ title: title, path: window.location.pathname });
      //getFetchGeneralMDMSData(fetchGeneralMDMSData);
      var requestBody = {
        MdmsCriteria: {
          tenantId: _common3.default.tenantId,
          moduleDetails: [{
            moduleName: "PropertyTax",
            masterDetails: [{
              name: "Floor"
            }, {
              name: "UsageCategoryMajor"
            }, {
              name: "UsageCategoryMinor"
            }, {
              name: "UsageCategorySubMinor"
            }, {
              name: "OccupancyType"
            }, {
              name: "PropertyType"
            }, {
              name: "PropertySubType"
            }, {
              name: "OwnerType"
            }, {
              name: "UsageCategoryDetail"
            }]
          }]
        }
      };
      fetchGeneralMDMSData(requestBody, "PropertyTax", ["Floor", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor", "OccupancyType", "PropertyType", "PropertySubType", "OwnerType", "UsageCategoryDetail"]);
      getAssesmentsandStatus([{ key: "accountId", value: userInfo.uuid }]);
      (0, _PTCommon.resetFormWizard)(form, removeForm);
    }, _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    }, _this.onNewPropertyButtonClick = function () {
      _this.setState({
        dialogueOpen: true
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CompletedAssessments, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          history = _props.history,
          loading = _props.loading,
          sortedProperties = _props.sortedProperties,
          generalMDMSDataById = _props.generalMDMSDataById;

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "screen-with-bredcrumb" },
        _react2.default.createElement(_components.BreadCrumbs, { url: urls, history: history }),
        sortedProperties && _react2.default.createElement(_common.AssessmentList, {
          innerDivStyle: innerDivStyle,
          items: sortedProperties,
          noAssessmentMessage: "PT_NO_ASSESSMENT_MESSAGE1",
          button: true,
          history: history,
          yearDialogue: this.state.dialogueOpen,
          closeDialogue: this.closeYearRangeDialogue,
          onNewPropertyButtonClick: this.onNewPropertyButtonClick,
          hoverColor: "#fff",
          generalMDMSDataById: generalMDMSDataById && generalMDMSDataById
        })
      );
    }
  }]);
  return CompletedAssessments;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties,
      common = state.common,
      app = state.app,
      form = state.form;
  var localizationLabels = app.localizationLabels;
  var cities = common.cities,
      generalMDMSDataById = common.generalMDMSDataById;
  var urls = state.app.urls;

  var _ref2 = properties || {},
      assessmentsByStatus = _ref2.assessmentsByStatus,
      loading = _ref2.loading;

  var completedAssessments = (0, _TransformedAssessments.getCompletedTransformedItems)(assessmentsByStatus, cities, localizationLabels);
  var sortedProperties = completedAssessments && (0, _orderBy2.default)(completedAssessments, ["epocDate"], ["desc"]);
  return { sortedProperties: sortedProperties, urls: urls, loading: loading, form: form, generalMDMSDataById: generalMDMSDataById };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions3.addBreadCrumbs)(url));
    },
    getAssesmentsandStatus: function getAssesmentsandStatus(queryObj) {
      return dispatch((0, _actions4.getAssesmentsandStatus)(queryObj));
    },
    removeForm: function removeForm(formkey) {
      return dispatch((0, _actions2.removeForm)(formkey));
    },
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName) {
      return dispatch((0, _actions.fetchGeneralMDMSData)(requestBody, moduleName, masterName));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CompletedAssessments);