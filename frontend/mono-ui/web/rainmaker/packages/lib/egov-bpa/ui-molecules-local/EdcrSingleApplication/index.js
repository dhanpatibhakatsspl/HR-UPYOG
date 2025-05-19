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

var _reactRouterDom = require("react-router-dom");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _styles = require("@material-ui/core/styles");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

require("./index.css");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

var EdcrSingleApplication = function (_React$Component) {
  (0, _inherits3.default)(EdcrSingleApplication, _React$Component);

  function EdcrSingleApplication() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EdcrSingleApplication);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EdcrSingleApplication.__proto__ || Object.getPrototypeOf(EdcrSingleApplication)).call.apply(_ref, [this].concat(args))), _this), _this.onCardClick1 = function (item) {
      item && item.dxfFile && window.open(item.dxfFile);
    }, _this.onCardClick2 = function (item) {
      item && item.planReport && window.open(item.planReport);
    }, _this.onButtonCLick = function () {
      var _this$props = _this.props,
          setRoute = _this$props.setRoute,
          homeURL = _this$props.homeURL;

      setRoute(homeURL);
      // let toggle = get(
      //   screenConfig["my-applications"],
      //   "components.cityPickerDialog.props.open",
      //   false
      // );
      // handleField(
      //   "my-applications",
      //   "components.cityPickerDialog",
      //   "props.open",
      //   !toggle
      // );
    }, _this.generateLabelKey = function (content, item) {
      var LabelKey = "";
      if (content.prefix && content.suffix) {
        LabelKey = "" + content.prefix + (0, _get2.default)(item, content.jsonPath).toUpperCase().replace(/[._:-\s\/]/g, "_") + content.suffix;
      } else if (content.prefix) {
        LabelKey = "" + content.prefix + (0, _get2.default)(item, content.jsonPath).toUpperCase().replace(/[._:-\s\/]/g, "_");
      } else if (content.suffix) {
        LabelKey = "" + (0, _get2.default)(item, content.jsonPath).toUpperCase().replace(/[._:-\s\/]/g, "_") + content.suffix;
      } else {
        LabelKey = "" + (0, _get2.default)(item, content.jsonPath);
      }
      return LabelKey;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(EdcrSingleApplication, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          searchResults = _props.searchResults,
          classes = _props.classes,
          contents = _props.contents,
          moduleName = _props.moduleName;

      return _react2.default.createElement(
        "div",
        { className: "application-card" },
        searchResults && searchResults.length > 0 ? searchResults.map(function (item) {
          return _react2.default.createElement(
            _Card2.default,
            { className: classes.card },
            _react2.default.createElement(
              _CardContent2.default,
              null,
              _react2.default.createElement(
                "div",
                null,
                contents.map(function (content) {
                  return _react2.default.createElement(
                    _Grid2.default,
                    { container: true, style: { marginBottom: 12 } },
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: content.label,
                        fontSize: 14,
                        style: {
                          fontSize: 14,
                          color: "rgba(0, 0, 0, 0.60"
                        }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: _this2.generateLabelKey(content, item),
                        fontSize: 14,
                        checkValueForNA: _utils.checkValueForNA,
                        style: {
                          fontSize: 14,
                          color: "rgba(0, 0, 0, 0.87"
                        }
                      })
                    )
                  );
                }),
                _react2.default.createElement(
                  _Grid2.default,
                  { container: true, style: { marginBottom: 12 } },
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 6 },
                    _react2.default.createElement(
                      "div",
                      {
                        onClick: function onClick() {
                          return _this2.onCardClick1(item);
                        },
                        className: "myclassPointer"
                      },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: "EDCR_DOWNLOAD_BUILDING_PLAN",
                        textTransform: "uppercase",
                        style: {
                          color: "#fe7a51",
                          fontSize: 14,
                          textTransform: "uppercase"
                        }
                      })
                    )
                  ),
                  item.status.toUpperCase() !== "ABORTED" ? _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 6 },
                    _react2.default.createElement(
                      "div",
                      {
                        onClick: function onClick() {
                          return _this2.onCardClick2(item);
                        },
                        className: "myclassPointer"
                      },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: "EDCR_DOWNLOAD_REPORT",
                        textTransform: "uppercase",
                        style: {
                          color: "#fe7a51",
                          fontSize: 14,
                          textTransform: "uppercase"
                        }
                      })
                    )
                  ) : null
                )
              )
            )
          );
        }) : _react2.default.createElement(
          "div",
          { className: "no-assessment-message-cont" },
          _react2.default.createElement(_LabelContainer2.default, {
            labelKey: "No results Found!",
            style: { marginBottom: 10 }
          }),
          _react2.default.createElement(
            _Button2.default,
            {
              style: {
                height: 36,
                lineHeight: "auto",
                minWidth: "inherit"
              },
              className: "assessment-button",
              variant: "contained",
              color: "primary",
              onClick: this.onButtonCLick
            },
            _react2.default.createElement(_LabelContainer2.default, { labelKey: moduleName + "_NEW_APPLICATION" })
          )
        )
      );
    }
  }]);
  return EdcrSingleApplication;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var searchResults = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchResults", []);
  var screenConfig = (0, _get2.default)(state.screenConfiguration, "screenConfig");
  return { screenConfig: screenConfig, searchResults: searchResults };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(path) {
      return dispatch((0, _actions.setRoute)(path));
    }
    // handleField: (screenKey, jsonPath, fieldKey, value) =>
    //   dispatch(handleField(screenKey, jsonPath, fieldKey, value))
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EdcrSingleApplication));