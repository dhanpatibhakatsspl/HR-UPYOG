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

var _components = require("../components");

var _RaisedButton = require("material-ui/RaisedButton");

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _List = require("../components/List");

var _List2 = _interopRequireDefault(_List);

var _inbox = require("material-ui/svg-icons/content/inbox");

var _inbox2 = _interopRequireDefault(_inbox);

var _grade = require("material-ui/svg-icons/action/grade");

var _grade2 = _interopRequireDefault(_grade);

var _send = require("material-ui/svg-icons/content/send");

var _send2 = _interopRequireDefault(_send);

var _drafts = require("material-ui/svg-icons/content/drafts");

var _drafts2 = _interopRequireDefault(_drafts);

var _info = require("material-ui/svg-icons/action/info");

var _info2 = _interopRequireDefault(_info);

var _Avatar = require("material-ui/Avatar");

var _Avatar2 = _interopRequireDefault(_Avatar);

var _theme = require("../config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _wrapper = require("./wrapper.js");

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var items = [{
  primaryText: "Inbox",
  leftIcon: _react2.default.createElement(_inbox2.default, null)
}, {
  primaryText: "Starred",
  leftIcon: _react2.default.createElement(_grade2.default, null)
}, {
  primaryText: "Sent Mail",
  leftIcon: _react2.default.createElement(_send2.default, null)
}, {
  primaryText: "Drafts",
  leftIcon: _react2.default.createElement(_drafts2.default, null),
  initiallyOpen: false,
  primaryTogglesNestedList: true,
  style: {
    borderBottom: "none"
  },
  nestedItems: [{
    primaryText: "Inbox",
    leftIcon: _react2.default.createElement(_inbox2.default, null),
    rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
  }, {
    primaryText: "Starred",
    leftIcon: _react2.default.createElement(_grade2.default, null),
    rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
  }, {
    primaryText: "Sent Mail",
    leftIcon: _react2.default.createElement(_send2.default, null),
    rightAvatar: _react2.default.createElement(_Avatar2.default, { src: "http://via.placeholder.com/150x150" })
  }]
}];

(0, _react3.storiesOf)("Drawer", module).addDecorator((0, _storybookAddonMaterialUi.muiTheme)([_theme2.default])).add("All feature", function () {
  return _react2.default.createElement(
    _wrapper2.default,
    {
      imports: ["import { Drawer} from \"<Egov-Reusable-Components-Location>\";", "import Badge from \"material-ui/Badge\";", "import IconButton from \"material-ui/IconButton\";", "import NotificationsIcon from \"material-ui/svg-icons/social/notifications\";"],
      component: "Drawer",
      code: "<DrawerUndockedExample />"
    },
    _react2.default.createElement(DrawerUndockedExample, null),
    _react2.default.createElement("br", null),
    _react2.default.createElement("br", null),
    _react2.default.createElement(
      "div",
      null,
      "For more props information please visit",
      " ",
      _react2.default.createElement(
        "a",
        { href: "http://www.material-ui.com/#/components/drawer", target: "_blank", rel: "noopener noreferrer" },
        "Drawer"
      )
    )
  );
});

var DrawerUndockedExample = function (_React$Component) {
  (0, _inherits3.default)(DrawerUndockedExample, _React$Component);

  function DrawerUndockedExample(props) {
    (0, _classCallCheck3.default)(this, DrawerUndockedExample);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DrawerUndockedExample.__proto__ || Object.getPrototypeOf(DrawerUndockedExample)).call(this, props));

    _this.handleToggle = function () {
      return _this.setState({ open: !_this.state.open });
    };

    _this.handleClose = function () {
      return _this.setState({ open: false });
    };

    _this.state = { open: false };
    return _this;
  }

  (0, _createClass3.default)(DrawerUndockedExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_RaisedButton2.default, { label: "Open Drawer", onClick: this.handleToggle }),
        _react2.default.createElement(
          _components.Drawer,
          { docked: false, width: 304, open: this.state.open, onRequestChange: function onRequestChange(open) {
              return _this2.setState({ open: open });
            } },
          _react2.default.createElement(_List2.default, { items: items, listContainerStyle: { background: "#ffffff" }, listItemStyle: { borderBottom: "1px solid #e0e0e0" } })
        )
      );
    }
  }]);
  return DrawerUndockedExample;
}(_react2.default.Component);

exports.default = DrawerUndockedExample;