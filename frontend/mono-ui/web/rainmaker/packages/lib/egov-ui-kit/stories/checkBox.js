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

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _components = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("Checkbox", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("Checkbox", function () {
  return _react2.default.createElement(CheckboxContainer, null);
});

var CheckboxContainer = function (_Component) {
  (0, _inherits3.default)(CheckboxContainer, _Component);

  function CheckboxContainer(props) {
    (0, _classCallCheck3.default)(this, CheckboxContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CheckboxContainer.__proto__ || Object.getPrototypeOf(CheckboxContainer)).call(this, props));

    _this.options = [{
      label: "India",
      value: "IN"
    }, {
      label: "USA",
      value: "US"
    }, {
      label: "Australia",
      value: "AUS"
    }];
    return _this;
  }

  (0, _createClass3.default)(CheckboxContainer, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_components.Checkbox, { id: "reopencomplaint-radio", name: "reopencomplaint-radio", options: this.options });
    }
  }]);
  return CheckboxContainer;
}(_react.Component);

exports.default = CheckboxContainer;