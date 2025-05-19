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

var _components = require("components");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _OldValueLabelContainer = require("../../../../../common/common/OldValueLabelContainer");

var _OldValueLabelContainer2 = _interopRequireDefault(_OldValueLabelContainer);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertyInfoCard = function (_Component) {
  (0, _inherits3.default)(PropertyInfoCard, _Component);

  function PropertyInfoCard() {
    (0, _classCallCheck3.default)(this, PropertyInfoCard);
    return (0, _possibleConstructorReturn3.default)(this, (PropertyInfoCard.__proto__ || Object.getPrototypeOf(PropertyInfoCard)).apply(this, arguments));
  }

  (0, _createClass3.default)(PropertyInfoCard, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          ownerInfo = _props.ownerInfo,
          header = _props.header,
          editIcon = _props.editIcon,
          _props$backgroundColo = _props.backgroundColor,
          backgroundColor = _props$backgroundColo === undefined ? "rgb(242, 242, 242)" : _props$backgroundColo,
          _props$items = _props.items,
          items = _props$items === undefined ? [] : _props$items,
          _props$subSection = _props.subSection,
          subSection = _props$subSection === undefined ? [] : _props$subSection,
          _props$hideSubsection = _props.hideSubsectionLabel,
          hideSubsectionLabel = _props$hideSubsection === undefined ? false : _props$hideSubsection,
          _props$additionalKey = _props.additionalKey,
          additionalKey = _props$additionalKey === undefined ? {} : _props$additionalKey,
          _props$showEditNumber = _props.showEditNumber,
          showEditNumber = _props$showEditNumber === undefined ? false : _props$showEditNumber;


      var isModify = (0, _commons.getQueryArg)(window.location.href, "mode") == "WORKFLOWEDIT";
      return _react2.default.createElement(
        "div",
        null,
        items && _react2.default.createElement(_components.Card, {
          style: { backgroundColor: backgroundColor, boxShadow: "none" },
          className: ownerInfo ? "pt-info-card-style" : "",
          textChildren: _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              null,
              !ownerInfo && _react2.default.createElement(
                "div",
                { className: "rainmaker-displayInline", style: { alignItems: "center", marginLeft: "13px", marginTop: 20 } },
                header && _react2.default.createElement(_translationNode2.default, {
                  labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                  label: header,
                  fontSize: "18px"
                }),
                { editIcon: editIcon } && _react2.default.createElement(
                  "span",
                  { style: { position: "absolute", right: "25px" } },
                  editIcon
                )
              ),
              items.map(function (item) {
                if (item) {
                  return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                      "div",
                      { className: "col-sm-3 col-xs-12", style: { marginTop: 5 } },
                      _react2.default.createElement(
                        "div",
                        { className: "col-sm-12 col-xs-12", style: { padding: "5px 0px 0px 0px" } },
                        _react2.default.createElement(_translationNode2.default, {
                          labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "1.375em" },
                          label: item.key ? item.key : "NA",
                          fontSize: "12px"
                        })
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "col-sm-12 col-xs-12", style: { padding: "5px 0px 0px 0px" } },
                        _react2.default.createElement(_translationNode2.default, {
                          labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                          label: item.value ? item.value : "NA",
                          fontSize: "16px"
                        }),
                        showEditNumber && additionalKey && additionalKey.key && (additionalKey.key == item.key || additionalKey.key1 == item.key) && _react2.default.createElement(
                          "div",
                          { style: { padding: "5px 0px 0px 0px" } },
                          _react2.default.createElement(_components.UpdateMobile, (0, _extends3.default)({
                            number: item.value,
                            type: "UPDATE",
                            isAlternate: additionalKey.key1 == item.key
                          }, additionalKey))
                        ),
                        showEditNumber && additionalKey && (additionalKey.key2 == item.key || additionalKey.key3 == item.key) && _react2.default.createElement(
                          "div",
                          { style: { padding: "5px 0px 0px 0px" } },
                          _react2.default.createElement(
                            "div",
                            { style: { margin: "2px", height: "25px" } },
                            " "
                          )
                        )
                      ),
                      isModify && _react2.default.createElement(
                        "div",
                        { className: "col-sm-12 col-xs-12", style: { padding: "5px 0px 0px 0px" } },
                        _react2.default.createElement(_OldValueLabelContainer2.default, { value: item.value, jsonPath: item.jsonPath, oldValue: item.oldValue })
                      )
                    )
                  );
                }
              })
            ),
            subSection && _react2.default.createElement(
              "div",
              null,
              subSection && Array.isArray(subSection) && subSection.length > 0 && Object.values(subSection).map(function (units, unitIndex) {
                return _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 col-xs-12", style: { alignItems: "center" } },
                  !hideSubsectionLabel && _react2.default.createElement(_translationNode2.default, {
                    labelStyle: {
                      letterSpacing: "0.67px",
                      marginTop: 15,
                      color: "rgba(0, 0, 0, 0.87)",
                      fontWeight: "400",
                      lineHeight: "19px"
                    },
                    label: "PROPERTYTAX_FLOOR_" + Object.keys(subSection)[unitIndex],
                    fontSize: "18px"
                  }),
                  units.map(function (unit, index) {
                    var subUnitHeader = hideSubsectionLabel ? undefined : (0, _commons.getLocaleLabels)("PT_UNIT", "PT_UNIT") + " -" + (index + 1);
                    return _react2.default.createElement(PropertyInfoCard, { backgroundColor: "white", items: unit, header: subUnitHeader });
                  })
                );
              })
            )
          )
        })
      );
    }
  }]);
  return PropertyInfoCard;
}(_react.Component);

exports.default = PropertyInfoCard;