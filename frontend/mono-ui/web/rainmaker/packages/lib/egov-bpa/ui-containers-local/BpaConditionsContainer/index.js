"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _FormGroup = require("@material-ui/core/FormGroup");

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  root: {
    color: "#FE7A51",
    "&$checked": {
      color: "#FE7A51"
    }
  },
  checked: {},
  conditionNum: {
    width: "30px !important"
  }
};

// const requiredIcon = (
//   <sup style={{ color: "#E54D42", paddingLeft: "5px" }}>*</sup>
// );

var BpaConditionsContainer = function (_Component) {
  (0, _inherits3.default)(BpaConditionsContainer, _Component);

  function BpaConditionsContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BpaConditionsContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BpaConditionsContainer.__proto__ || Object.getPrototypeOf(BpaConditionsContainer)).call.apply(_ref, [this].concat(args))), _this), _this.handleFieldChange = function (event, value, condition, key) {
      var _this$props = _this.props,
          permitConditions = _this$props.permitConditions,
          prepareFinalObject = _this$props.prepareFinalObject,
          bpaDetails = _this$props.bpaDetails;

      var permitConditionsList = [],
          finalPermitList = [],
          appDocumentList = void 0;
      permitConditions.forEach(function (condtn) {
        if (condition === condtn.condition) {
          condtn.conditionValue = !value;
        }
        permitConditionsList.push(condtn);
      });

      permitConditionsList.forEach(function (conditions) {
        if (conditions.conditionValue === true) {
          finalPermitList.push(conditions.condition);
        }
      });
      appDocumentList = (0, _extends4.default)({}, bpaDetails.additionalDetails, (0, _defineProperty3.default)({}, "pendingapproval", finalPermitList));
      prepareFinalObject("permitTemp", finalPermitList);
      prepareFinalObject("BPA.additionalDetails", appDocumentList);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BpaConditionsContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          permitConditions = _props.permitConditions;

      var index = 0;
      return _react2.default.createElement(
        "div",
        null,
        permitConditions && permitConditions.length > 0 && permitConditions.map(function (conditions) {
          return _react2.default.createElement(
            _Grid2.default,
            { container: true },
            _react2.default.createElement(
              _Grid2.default,
              { item: true, className: classes.conditionNum },
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                  "span",
                  null,
                  index + 1
                )
              )
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true, xs: 10, sm: 5, md: 10 },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelKey: conditions.condition
                // labelKey={getTransformedLocale(conditions.condition)}
              })
            ),
            _react2.default.createElement(
              _Grid2.default,
              null,
              _react2.default.createElement(_Checkbox2.default, {
                classes: {
                  root: classes.root,
                  checked: classes.checked
                },
                onChange: function onChange(event) {
                  return _this2.handleFieldChange(event, conditions.conditionValue, conditions.condition, index++);
                },
                value: index++
              })
            )
          );
        })
      );
    }
  }]);
  return BpaConditionsContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var moduleName = screenConfiguration.moduleName;

  var permitConditions = (0, _get2.default)(screenConfiguration.preparedFinalObject, "permitConditions", {});
  var bpaDetails = (0, _get2.default)(screenConfiguration.preparedFinalObject, "BPA", {});
  return { permitConditions: permitConditions, moduleName: moduleName, bpaDetails: bpaDetails };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BpaConditionsContainer));