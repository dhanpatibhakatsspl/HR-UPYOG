"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addressStyle = {
  display: "inline-block"
};

var iconStyle = {
  display: "inline-block",
  // width: 45,
  // height: 28,
  marginRight: 7,
  marginTop: -3
};

var headerStyle = {
  letterSpacing: "0.7px"
};

var HeaderCard = function HeaderCard(_ref) {
  var complaint = _ref.complaint;

  var transformedcomplaint = "";
  if (complaint && complaint.header) {
    transformedcomplaint = "SERVICEDEFS." + complaint.header.toUpperCase();
  }

  var _ref2 = complaint.address || "",
      houseNoAndStreetName = _ref2.houseNoAndStreetName,
      landmark = _ref2.landmark,
      mohalla = _ref2.mohalla,
      city = _ref2.city,
      locality = _ref2.locality;

  return _react2.default.createElement(_components.Card, {
    textChildren: [_react2.default.createElement(_translationNode2.default, {
      key: 1,
      label: transformedcomplaint,
      dark: true,
      bold: true,
      fontSize: 16,
      labelStyle: headerStyle,
      containerStyle: { marginBottom: 10 }
    }), complaint && typeof complaint.address === "string" && _react2.default.createElement(
      "div",
      { key: 2, style: { display: "flex", alignItems: "flex-start" } },
      _react2.default.createElement(_components.Icon, {
        className: "map-icon",
        action: "maps",
        name: "place",
        style: iconStyle,
        color: "#969696"
      }),
      _react2.default.createElement(_translationNode2.default, {
        containerStyle: addressStyle,
        dark: true,
        label: complaint.address
      })
    ), complaint && (0, _typeof3.default)(complaint.address) === "object" && _react2.default.createElement(
      "div",
      { className: "rainmaker-displayInline" },
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_components.Icon, {
          className: "map-icon",
          action: "maps",
          name: "place",
          style: iconStyle,
          color: "#969696"
        })
      ),
      _react2.default.createElement(
        "div",
        { className: "complaint-address-display" },
        _react2.default.createElement(_translationNode2.default, {
          label: houseNoAndStreetName,
          className: "status-result-color",
          id: "complaint-details-complaint-location",
          labelStyle: { color: "inherit" }
        }),
        houseNoAndStreetName && _react2.default.createElement(_translationNode2.default, {
          label: ",",
          className: "comma-style",
          id: "complaint-details-complaint-location",
          labelStyle: { color: "inherit" },
          fontSize: "16px"
        }),
        _react2.default.createElement(_translationNode2.default, {
          label: locality,
          className: "status-result-color",
          id: "complaint-details-complaint-location",
          labelStyle: { color: "inherit" }
        }),
        _react2.default.createElement(_translationNode2.default, {
          label: ",",
          className: "comma-style",
          id: "complaint-details-complaint-location",
          labelStyle: { color: "inherit" },
          fontSize: "16px"
        }),
        _react2.default.createElement(_translationNode2.default, {
          label: "TENANT_TENANTS_" + city.toUpperCase().replace(/[.]/g, "_"),
          className: "status-result-color",
          id: "complaint-details-complaint-location",
          labelStyle: { color: "inherit" }
        }),
        landmark && _react2.default.createElement(_translationNode2.default, {
          label: ",",
          className: "comma-style",
          id: "complaint-details-complaint-location",
          labelStyle: { color: "inherit" },
          fontSize: "16px"
        }),
        _react2.default.createElement(_translationNode2.default, {
          label: landmark,
          className: "status-result-color",
          id: "complaint-details-complaint-location",
          labelStyle: { color: "inherit" }
        })
      )
    )]
  });
};

exports.default = HeaderCard;