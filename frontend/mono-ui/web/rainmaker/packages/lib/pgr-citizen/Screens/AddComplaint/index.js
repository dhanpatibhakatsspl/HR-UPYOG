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

var _reactRedux = require("react-redux");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _AddComplaintForm = require("./components/AddComplaintForm");

var _AddComplaintForm2 = _interopRequireDefault(_AddComplaintForm);

var _actions = require("egov-ui-kit/redux/form/actions");

var _common = require("modules/common");

require("./index.css");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions3 = require("egov-ui-kit/redux/complaints/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintFormHOC = (0, _form2.default)({
  formKey: "complaint",
  isCoreConfiguration: true,
  path: "pgr/pgr-citizen"
})(_AddComplaintForm2.default);

var AddComplaints = function (_Component) {
  (0, _inherits3.default)(AddComplaints, _Component);

  function AddComplaints() {
    (0, _classCallCheck3.default)(this, AddComplaints);
    return (0, _possibleConstructorReturn3.default)(this, (AddComplaints.__proto__ || Object.getPrototypeOf(AddComplaints)).apply(this, arguments));
  }

  (0, _createClass3.default)(AddComplaints, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.resetForm();
      var fetchComplaintCategories = this.props.fetchComplaintCategories;

      fetchComplaintCategories();
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          categories = _props.categories,
          localizationLabels = _props.localizationLabels;

      return _react2.default.createElement(
        _common.Screen,
        null,
        _react2.default.createElement(ComplaintFormHOC, {
          categories: categories,
          localizationLabels: localizationLabels
        })
      );
    }
  }]);
  return AddComplaints;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _state$app = state.app,
      localizationLabels = _state$app.localizationLabels,
      currentLocation = _state$app.currentLocation;

  var form = state.form["complaint"];
  var categories = state.complaints.categoriesById;
  return { categories: categories, form: form, localizationLabels: localizationLabels, currentLocation: currentLocation };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaintCategories: function fetchComplaintCategories() {
      return dispatch((0, _actions3.fetchComplaintCategories)());
    },
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions.handleFieldChange)(formKey, fieldKey, value));
    },
    resetForm: function resetForm() {
      return dispatch((0, _actions2.prepareFinalObject)("services", [{}]));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddComplaints);