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

var _common = require("modules/common");

var _actions = require("egov-ui-kit/redux/form/actions");

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

require("./index.css");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions3 = require("egov-ui-kit/redux/complaints/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintFormHOC = (0, _form2.default)({
  formKey: "complaint",
  isCoreConfiguration: true,
  path: "pgr/pgr-employee"
})(_AddComplaintForm2.default);

var AddComplaints = function (_Component) {
  (0, _inherits3.default)(AddComplaints, _Component);

  function AddComplaints() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AddComplaints);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AddComplaints.__proto__ || Object.getPrototypeOf(AddComplaints)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillReceiveProps = function (nextprops) {
      if (!(0, _isEqual2.default)(nextprops, _this.props)) {
        var inputType = document.getElementsByTagName("input");
        for (var input in inputType) {
          if (inputType[input].type === "number") {
            inputType[input].addEventListener("mousewheel", function () {
              this.blur();
            });
          }
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AddComplaints, [{
    key: "componentDidMount",

    // componentWillReceiveProps = (nextProps) => {
    //   const { form, handleFieldChange } = this.props;
    //    if (form) {
    //const tenantId = getTenantId();
    //   // if (nextProps.currentLocation && nextProps.currentLocation.address) {
    //   //   const { lat, lng, address } = nextProps.currentLocation;
    //   //   handleFieldChange("complaint", "latitude", lat);
    //   //   handleFieldChange("complaint", "longitude", lng);
    //   //   handleFieldChange("complaint", "address", address);
    //   // }
    //handleFieldChange("complaint", "city", tenantId);
    //}
    //};
    value: function componentDidMount() {
      this.props.resetForm();
      this.props.resetFieldValue();
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
          localizationLabels: localizationLabels,
          history: this.props.history
        })
      );
    }
  }]);
  return AddComplaints;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var localizationLabels = state.app.localizationLabels;
  // const  form = state.form["complaint"];

  var categories = state.complaints.categoriesById;
  return { categories: categories, localizationLabels: localizationLabels };
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
    },
    resetFieldValue: function resetFieldValue() {
      return dispatch((0, _actions.setFieldProperty)("complaint", "city", "value", ""));
    }

  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddComplaints);