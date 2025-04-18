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

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _Card = require("egov-ui-kit/components/Card");

var _Card2 = _interopRequireDefault(_Card);

var _BreadCrumbs = require("egov-ui-kit/components/BreadCrumbs");

var _BreadCrumbs2 = _interopRequireDefault(_BreadCrumbs);

var _Divider = require("egov-ui-kit/components/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PTExample = function (_Component) {
  (0, _inherits3.default)(PTExample, _Component);

  function PTExample() {
    (0, _classCallCheck3.default)(this, PTExample);
    return (0, _possibleConstructorReturn3.default)(this, (PTExample.__proto__ || Object.getPrototypeOf(PTExample)).apply(this, arguments));
  }

  (0, _createClass3.default)(PTExample, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          addBreadCrumbs = _props.addBreadCrumbs,
          title = _props.title;

      title && addBreadCrumbs({ title: title, path: window.location.pathname });
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          urls = _props2.urls,
          history = _props2.history;

      return _react2.default.createElement(
        "div",
        { className: "col-sm-12 blockBox" },
        _react2.default.createElement(_BreadCrumbs2.default, { url: urls, history: history }),
        _react2.default.createElement(_Card2.default, {
          id: "home-complaint-card",
          className: "clearfix",
          textChildren: _react2.default.createElement(
            "div",
            { className: "example-main-cont clearfix" },
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 descriptionStyle" },
              _react2.default.createElement(_translationNode2.default, { label: "PT_EXAMPLES_DESCRIPTION" }),
              _react2.default.createElement(
                "div",
                { style: { display: "flex" } },
                _react2.default.createElement(
                  "a",
                  {
                    // href={require("./PT_Corporation_Notification.pdf")}
                    target: "_blank"
                  },
                  _react2.default.createElement(_translationNode2.default, { label: "PT_HERE_LABEL", color: "#fe7a51" })
                ),
                _react2.default.createElement(_translationNode2.default, {
                  label: "PT_CORPORATION_LABEL",
                  className: "example-label-style"
                }),
                _react2.default.createElement(
                  "a",
                  {
                    // href={require("./PT_Council_Notification.pdf")}
                    target: "_blank"
                  },
                  _react2.default.createElement(_translationNode2.default, { label: "PT_HERE_LABEL", color: "#fe7a51" })
                ),
                _react2.default.createElement(_translationNode2.default, { label: "PT_COUNCIL_LABEL" })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 dividerPTExample" },
              _react2.default.createElement(_Divider2.default, null)
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 descriptionPTExample" },
              _react2.default.createElement(_translationNode2.default, { fontSize: 16, label: "CS_EXAMPLES_DESCRIPTION" })
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 detailPart" },
              _react2.default.createElement(
                "div",
                { className: "col-12 detailTitlePTExample" },
                _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLE_AREA" })
              ),
              _react2.default.createElement(
                "div",
                { className: "col-12 detailContentPTExample" },
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 blockBox" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_SIZE" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_SIZE_VALUE" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 blockBox" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_FLOOR" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_FLOOR_VALUE" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 blockBox" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_LAND" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_LAND_VALUE" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 block" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_1ST_FLOOR" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_1ST_FLOOR_VALUE" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 block" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_PROPERTY_TAX" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_PROPERTY_TAX_VALUE1" }),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_PROPERTY_TAX_VALUE2" }),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_PROPERTY_TAX_VALUE3" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 block" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_NET_PROPERTY_TEX" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_NET_PROPERTY_TEX_VALUE" })
                  )
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 dividerPTExample" },
              _react2.default.createElement(_Divider2.default, null)
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 detailPart" },
              _react2.default.createElement(
                "div",
                { className: "col-12 detailTitlePTExample" },
                _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_FLAT" })
              ),
              _react2.default.createElement(
                "div",
                { className: "col-12 detailContentPTExample" },
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 block" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_BUILTUP" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_BUILTUP_VALUE" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 block" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    " ",
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_CALCUL" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    " ",
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_CALCUL_VALUE" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 block" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-4 detailLeft" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_NET_PROPERTY_TEX1" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-sm-8" },
                    _react2.default.createElement(_translationNode2.default, { label: "CS_EXAMPLES_NET_PROPERTY_TEX1_VALUE" })
                  )
                )
              )
            )
          )
        })
      );
    }
  }]);
  return PTExample;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var app = state.app;
  var urls = app.urls;

  return { urls: urls };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PTExample);