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

var _components = require("components");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _actions = require("egov-ui-kit/redux/common/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _actions3 = require("egov-ui-kit/redux/properties/actions");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _RadioButtonForm = require("./components/RadioButtonForm");

var _RadioButtonForm2 = _interopRequireDefault(_RadioButtonForm);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const getYearList = () => {
//   let today = new Date();
//   let month = today.getMonth() + 1;
//   let yearRange = [];
//   var counter = 0;
//   if (month <= 3) {
//     return getLastFiveYear(yearRange, today.getFullYear() - 1, counter);
//   } else {
//     return getLastFiveYear(yearRange, today.getFullYear(), counter);
//   }
// };

// const getLastFiveYear = (yearRange, currentYear, counter) => {
//   if (counter < 5) {
//     counter++;
//     yearRange.push(`${currentYear}-${currentYear + 1}`);
//     getLastFiveYear(yearRange, currentYear - 1, counter);
//   }
//   return yearRange;
// };

var YearDialogueHOC = (0, _form2.default)({ formKey: "financialYear", path: "PropertyTaxPay", isCoreConfiguration: true })(_RadioButtonForm2.default);

var YearDialog = function (_Component) {
  (0, _inherits3.default)(YearDialog, _Component);

  function YearDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, YearDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = YearDialog.__proto__ || Object.getPrototypeOf(YearDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedYear: ''
    }, _this.handleRadioButton = function (e) {
      _this.setState({
        selectedYear: e.target.value
      });
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          fetchGeneralMDMSData = _this$props.fetchGeneralMDMSData,
          toggleSpinner = _this$props.toggleSpinner;

      var requestBody = {
        MdmsCriteria: {
          tenantId: _common2.default.tenantId,
          moduleDetails: [{
            moduleName: "egf-master",
            masterDetails: [{
              name: "FinancialYear",
              filter: "[?(@.module == 'PT')]"
            }]
          }]
        }
      };
      toggleSpinner();
      fetchGeneralMDMSData(requestBody, "egf-master", ["FinancialYear"]);
      toggleSpinner();
    }, _this.resetForm = function () {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          removeForm = _this$props2.removeForm,
          prepareFormData = _this$props2.prepareFormData;

      (0, _PTCommon.resetFormWizard)(form, removeForm);
      prepareFormData("Properties", []);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(YearDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          open = _props.open,
          closeDialogue = _props.closeDialogue,
          getYearList = _props.getYearList,
          history = _props.history,
          form = _props.form,
          removeForm = _props.removeForm,
          urlToAppend = _props.urlToAppend,
          reset_property_reset = _props.reset_property_reset;

      return getYearList ? _react2.default.createElement(_components.Dialog, {
        open: open,
        children: [_react2.default.createElement(
          "div",
          { key: 1 },
          _react2.default.createElement(
            "div",
            { className: "dialogue-question" },
            _react2.default.createElement(_translationNode2.default, { label: "PT_FINANCIAL_YEAR_PLACEHOLDER", fontSize: "20px", color: "black" })
          ),
          _react2.default.createElement(
            "div",
            { className: "year-range-botton-cont" },
            getYearList && Object.values(getYearList).map(function (item, index) {
              return _react2.default.createElement(YearDialogueHOC, {
                handleRadioButton: _this2.handleRadioButton,
                selectedYear: _this2.state.selectedYear,
                key: index,
                label: item,
                history: history,
                resetFormWizard: _this2.resetForm,
                urlToAppend: urlToAppend
              });
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "year-dialogue-button" },
            _react2.default.createElement(_components.Button, {
              label: _react2.default.createElement(_translationNode2.default, { label: "PT_CANCEL", buttonLabel: true, color: "black" }),
              onClick: function onClick() {
                closeDialogue();
              },
              labelColor: "#fe7a51",
              buttonStyle: { border: "1px solid rgb(255, 255, 255)" } }),
            _react2.default.createElement(_components.Button, {
              label: _react2.default.createElement(_translationNode2.default, { label: "PT_OK", buttonLabel: true, color: "black" }),
              labelColor: "#fe7a51",
              buttonStyle: { border: "1px solid rgb(255, 255, 255)" }, onClick: function onClick() {
                if (_this2.state.selectedYear !== '') {
                  _this2.resetForm();
                  history && urlToAppend ? history.push(urlToAppend + "&FY=" + _this2.state.selectedYear) : history.push("/property-tax/assessment-form");
                } else {
                  alert('Please Select a Financial Year!');
                }
              } })
          )
        )],
        bodyStyle: { backgroundColor: "#ffffff" },
        isClose: false,
        onRequestClose: closeDialogue,
        contentClassName: "year-dialog-content",
        className: "year-dialog"
      }) : null;
    }
  }]);
  return YearDialog;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var common = state.common,
      form = state.form;
  var generalMDMSDataById = common.generalMDMSDataById;

  var FinancialYear = generalMDMSDataById && generalMDMSDataById.FinancialYear;
  var getYearList = FinancialYear && Object.keys(FinancialYear);
  return { getYearList: getYearList, form: form };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName) {
      return dispatch((0, _actions.fetchGeneralMDMSData)(requestBody, moduleName, masterName));
    },
    removeForm: function removeForm(formkey) {
      return dispatch((0, _actions2.removeForm)(formkey));
    },
    toggleSpinner: function toggleSpinner() {
      return dispatch((0, _actions.toggleSpinner)());
    },
    prepareFormData: function prepareFormData(path, value) {
      return dispatch((0, _actions.prepareFormData)(path, value));
    },
    reset_property_reset: function reset_property_reset() {
      return dispatch((0, _actions3.reset_property_reset)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(YearDialog);