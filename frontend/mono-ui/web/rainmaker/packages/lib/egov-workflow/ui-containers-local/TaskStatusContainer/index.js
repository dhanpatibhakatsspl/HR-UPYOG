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

var _core = require("@material-ui/core");

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _uiMoleculesLocal = require("../../ui-molecules-local");

var _History = require("@material-ui/icons/History");

var _History2 = _interopRequireDefault(_History);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    button: {
      margin: theme.spacing.unit,
      color: "#FE7A51"
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    }
  };
};

var TastStatusContainer = function (_React$Component) {
  (0, _inherits3.default)(TastStatusContainer, _React$Component);

  function TastStatusContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TastStatusContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TastStatusContainer.__proto__ || Object.getPrototypeOf(TastStatusContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleViewHistory = function () {
      _this.setState({
        open: true
      });
    }, _this.handleDialogClose = function () {
      _this.setState({
        open: false
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TastStatusContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          ProcessInstances = _props.ProcessInstances,
          moduleName = _props.moduleName;

      var currentObj = ProcessInstances && ProcessInstances[ProcessInstances.length - 1];
      if (currentObj && currentObj.businessService && currentObj.businessService === "BPA") {
        var assigness = [];
        if (currentObj.assignes) {
          currentObj.assignes.forEach(function (user) {
            assigness.push(user.name);
          });
          currentObj.assignee = {};
          currentObj.assignee.name = assigness.join(',');
        }
      }
      var taskLabel = "Task Status";
      var taskKey = "TL_TASK_STATUS";
      if (moduleName === 'NewWS1' || moduleName === 'NewSW1') {
        if (process.env.REACT_APP_NAME === "Citizen") {
          taskLabel = "Application Summary";
          taskKey = "WS_COMMON_APPLICATION_SUMMARY_LABEL";
        }
      }
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _core.Card,
          { className: "" },
          _react2.default.createElement(
            _core.CardContent,
            null,
            _react2.default.createElement(_uiAtoms.Container, {
              children: _react2.default.createElement(
                "div",
                { style: { width: "100%" } },
                _react2.default.createElement(
                  _core.Grid,
                  { container: "true", spacing: 12, marginTop: 16 },
                  _react2.default.createElement(
                    _core.Grid,
                    {
                      style: { alignItems: "center", display: "flex" },
                      item: true,
                      sm: 6,
                      xs: 6
                    },
                    _react2.default.createElement(
                      _core.Typography,
                      { component: "h2", variant: "subheading" },
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelName: taskLabel,
                        labelKey: taskKey
                      })
                    )
                  ),
                  _react2.default.createElement(
                    _core.Grid,
                    { item: true, sm: 6, xs: 6, style: { textAlign: "right" } },
                    _react2.default.createElement(
                      _core.Button,
                      {
                        className: classes.button,
                        onClick: this.handleViewHistory
                      },
                      _react2.default.createElement(_History2.default, { className: classes.leftIcon }),
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelName: "VIEW HISTORY",
                        labelKey: "TL_VIEW_HISTORY",
                        color: "#FE7A51"
                      })
                    )
                  )
                ),
                _react2.default.createElement(_uiMoleculesLocal.TaskStatusComponents, {
                  currentObj: currentObj,
                  index: ProcessInstances.length - 1
                })
              )
            })
          )
        ),
        _react2.default.createElement(_uiMoleculesLocal.TaskDialog, {
          open: this.state.open,
          onClose: this.handleDialogClose,
          history: ProcessInstances
        })
      );
    }
  }]);
  return TastStatusContainer;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles)(TastStatusContainer);