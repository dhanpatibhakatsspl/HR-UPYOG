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

var _react3 = require("@storybook/react");

var _storybookAddonMaterialUi = require("storybook-addon-material-ui");

var _addonActions = require("@storybook/addon-actions");

var _components = require("../components");

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)("ButtonToggle", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("All feature", function () {
  return _react2.default.createElement(ButtonToggle, null);
});

var ButtonToggle = function (_Component) {
  (0, _inherits3.default)(ButtonToggle, _Component);

  function ButtonToggle(props) {
    (0, _classCallCheck3.default)(this, ButtonToggle);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ButtonToggle.__proto__ || Object.getPrototypeOf(ButtonToggle)).call(this, props));

    _this.handleClick = function (index) {
      var items = _this.state.items;

      var _items = [].concat((0, _toConsumableArray3.default)(items));
      for (var i = 0; i < items.length; i++) {
        _items[i].style["background"] = "transparent";
      }
      _items[index].style["background"] = "orange";
      _this.setState({ items: _items });
    };

    _this.renderButtonGroups = function () {
      var items = _this.state.items;

      return items.map(function (item, index) {
        return _react2.default.createElement(_components.ButtonGroup, {
          key: index,
          item: item,
          onClick: function onClick() {
            _this.handleClick(index);
          }
        });
      });
    };

    _this.state = {
      items: [{
        label: "Button1",
        style: {
          border: "1px solid red",
          borderRadius: "3px",
          marginRight: "5px",
          background: "transparent"
        }
      }, {
        label: "Button2",
        style: {
          border: "1px solid red",
          borderRadius: "3px",
          marginRight: "5px",
          background: "transparent"
        }
      }, {
        label: "Button3",
        style: {
          border: "1px solid red",
          borderRadius: "3px",
          marginRight: "5px",
          background: "transparent"
        }
      }]
    };
    return _this;
  }

  (0, _createClass3.default)(ButtonToggle, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        this.renderButtonGroups()
      );
    }
  }]);
  return ButtonToggle;
}(_react.Component);

exports.default = ButtonToggle;