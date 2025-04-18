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

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("DropDown", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("Select", function () {
  return _react2.default.createElement(DropDownContainer, null);
});

var DropDownContainer = function (_Component) {
  (0, _inherits3.default)(DropDownContainer, _Component);

  function DropDownContainer(props) {
    (0, _classCallCheck3.default)(this, DropDownContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DropDownContainer.__proto__ || Object.getPrototypeOf(DropDownContainer)).call(this, props));

    _this.onChange = function (event, index, value) {
      _this.setState({ value: value });
    };

    _this.state = {
      items: [{
        value: "India",
        label: "IN"
      }, {
        value: "USA",
        label: "US"
      }, {
        value: "Australia",
        label: "AUS"
      }],
      style: {
        baseStyle: {
          background: "#f2f2f2",
          height: "56px",
          paddingLeft: "10px"
        },
        label: {
          color: "#5F5C57"
        }
      },
      value: "India"
    };
    return _this;
  }

  (0, _createClass3.default)(DropDownContainer, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_components.DropDown, {
        onChange: this.onChange,
        style: this.state.style.baseStyle,
        labelStyle: this.state.style.label,
        dropDownData: this.state.items,
        value: this.state.value
      });
    }
  }]);
  return DropDownContainer;
}(_react.Component);

exports.default = DropDownContainer;