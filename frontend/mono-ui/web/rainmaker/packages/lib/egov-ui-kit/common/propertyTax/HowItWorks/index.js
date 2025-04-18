"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _Card = require("egov-ui-kit/components/Card");

var _Card2 = _interopRequireDefault(_Card);

var _Button = require("egov-ui-kit/components/Button");

var _Button2 = _interopRequireDefault(_Button);

var _BreadCrumbs = require("egov-ui-kit/components/BreadCrumbs");

var _BreadCrumbs2 = _interopRequireDefault(_BreadCrumbs);

var _Screen = require("egov-ui-kit/common/common/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _List = require("material-ui/List");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var genericInnerdivStyle = {
  paddingLeft: 0
};

var videoCardStyle = {
  minHeight: 270
};

var HowItWorks = function (_Component) {
  (0, _inherits3.default)(HowItWorks, _Component);

  function HowItWorks() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, HowItWorks);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HowItWorks.__proto__ || Object.getPrototypeOf(HowItWorks)).call.apply(_ref, [this].concat(args))), _this), _this.listItems = [{
      question: "CS_HOWITWORKS_QUESTION1",
      answer: [{ text: "CS_HOWITWORKS_ANSWER1" }]
    }, {
      question: "CS_HOWITWORKS_QUESTION2",
      answer: [{
        text: "CS_HOWITWORKS_ANSWER2"
      }]
    }, {
      question: "CS_HOWITWORKS_QUESTION3",
      answer: [{
        text: "CS_HOWITWORKS_ANSWER3"
      }]
    }, {
      question: "CS_HOWITWORKS_QUESTION4",
      answer: [{
        text: "CS_HOWITWORKS_ANSWER4"
      }]
    }, {
      question: "CS_HOWITWORKS_QUESTION5",
      answer: [{
        text: "CS_HOWITWORKS_ANSWER5"
      }]
    }, {
      question: "CS_HOWITWORKS_QUESTION6",
      answer: [{ text: "CS_HOWITWORKS_ANSWER6" }]
    }, {
      question: "CS_HOWITWORKS_QUESTION7",
      answer: [{ text: "CS_HOWITWORKS_ANSWER7" }]
    }, {
      question: "CS_HOWITWORKS_QUESTION8",
      answer: [{
        text: "CS_HOWITWORKS_ANSWER8"
      }]
    }, {
      question: "CS_HOWITWORKS_QUESTION9",
      answer: [{ text: "CS_HOWITWORKS_ANSWER9" }]
    }, {
      question: "CS_HOWITWORKS_QUESTION20",
      answer: [{
        text: "CS_HOWITWORKS_ANSWER10"
      }]
    }, {
      question: "CS_HOWITWORKS_QUESTION11",
      answer: [{
        text: "CS_HOWITWORKS_ANSWER11"
      }]
    }, {
      question: "CS_HOWITWORKS_QUESTION12",
      answer: [{ text: "CS_HOWITWORKS_ANSWER12" }]
    }], _this.renderList = function (items) {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "row" },
          _react2.default.createElement(
            "div",
            { style: { padding: "15px" } },
            _react2.default.createElement(_translationNode2.default, {
              label: "CS_HOWITWORKS_HELP_VIDEOS_PUNJABI",
              color: "#484848",
              fontSize: "20px"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4", style: videoCardStyle },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/5GpLiCYS584?rel=0"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_TAX_PAYMENT" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_TAX_PAYMENT_DESCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4", style: videoCardStyle },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/P9U3EGNxrKU?rel=0"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS__PARTIAL_PAY" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS__PARTIAL_PAY_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4", style: videoCardStyle },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/PKHSa33puxQ?rel=0"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_ASSESSMENTS" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_ASSESSMENTS_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4", style: videoCardStyle },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/uF_G9dk_GBY?rel=0"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_ASSESSMENTS_INCOMPLETE" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_ASSESSMENTS_INCOMPLETE_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4", style: videoCardStyle },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/8V1k-v93BRg?rel=0"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_FULL_PAY" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_FULL_PAY_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4", style: videoCardStyle },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/gw7bS_-7aM8?rel=0"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_PARTIAL_PAYMENT" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_PARTIAL_PAYMENT_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4", style: videoCardStyle },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/fVRd6ylStdY?rel=0"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_ASS" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_ASS_DISCRIPTION" })
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "row", style: { paddingTop: "10px" } },
          _react2.default.createElement(
            "div",
            { style: { padding: "15px" } },
            _react2.default.createElement(_translationNode2.default, {
              label: "CS_HOWITWORKS_HELP_VIDEOS_ENGLISH",
              color: "#484848",
              fontSize: "20px"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4" },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/E0g26AzwRvs"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_HOMEPG_REG" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_HOMEPG_REG_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4" },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/G2_EA0zTiM0"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_FLOOR_UNIT" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_FLOOR_UNIT_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4" },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/UbmY5LmdiQc"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_ASS_PAY" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_ASS_PAY_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4" },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/r6k7_J7jkYc"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_FULL_PAYMENT1" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_FULL_PAYMENT1_DISCRIPTION" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4" },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/oQu4qDNWP7I"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_PARTIAL1_PAY" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_EXPLAIN" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4" },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/3s6GtEWmf00"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_COMPLETE_ASS" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_COMPLETE_ASS_VIDEO" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-4" },
            _react2.default.createElement("iframe", {
              allowFullScreen: "allowFullScreen",
              frameBorder: "0",
              src: "https://www.youtube.com/embed/mKLsORPO1o8"
            }),
            _react2.default.createElement(
              "h4",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_INCOMP_ASS" })
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "CS_HOWITWORKS_PROPERTY_INCOMP_ASS_VIDEO" })
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "col-sm-12", style: { padding: "15px 0px 30px 0px" } },
          _react2.default.createElement(
            "a",
            {
              href: "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb/PT_User_Manual_Citizen.pdf",
              target: "_blank"
            },
            _react2.default.createElement(_Button2.default, {
              label: _react2.default.createElement(_translationNode2.default, {
                buttonLabel: true,
                label: "PT_DOWNLOAD_HELP_DOCUMENT",
                fontSize: "12px"
              }),
              primary: true,
              style: { height: 30, lineHeight: "auto", minWidth: "inherit" }
            })
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_translationNode2.default, { label: "PT_FAQ", color: "#484848", fontSize: "20px" })
        ),
        _react2.default.createElement("hr", null),
        _react2.default.createElement(
          _List.List,
          { style: { padding: 0 } },
          items.map(function (item, index) {
            return _react2.default.createElement(_List.ListItem, {
              innerDivStyle: index !== 0 ? (0, _extends3.default)({}, genericInnerdivStyle, {
                borderTop: "solid 1px #e0e0e0"
              }) : genericInnerdivStyle,
              nestedListStyle: { padding: "0 0 16px 0" },
              primaryText: _react2.default.createElement(_translationNode2.default, { dark: true, label: item.question, fontSize: 16 }),
              nestedItems: item.answer.map(function (nestedItem) {
                return _react2.default.createElement(_List.ListItem, {
                  hoverColor: "#fff",
                  primaryText: _react2.default.createElement(_translationNode2.default, { fontSize: 16, label: nestedItem.text }),
                  innerDivStyle: { padding: 0 }
                });
              }),
              primaryTogglesNestedList: true,
              hoverColor: "#fff"
            });
          })
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(HowItWorks, [{
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
      var renderList = this.renderList,
          listItems = this.listItems;
      var _props2 = this.props,
          urls = _props2.urls,
          history = _props2.history;

      return _react2.default.createElement(
        _Screen2.default,
        { className: "screen-with-bredcrumb" },
        _react2.default.createElement(_BreadCrumbs2.default, { url: urls, history: history }),
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_Card2.default, {
            className: "how-it-works-card",
            textChildren: renderList(listItems)
          })
        )
      );
    }
  }]);
  return HowItWorks;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var common = state.common,
      app = state.app;
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HowItWorks);