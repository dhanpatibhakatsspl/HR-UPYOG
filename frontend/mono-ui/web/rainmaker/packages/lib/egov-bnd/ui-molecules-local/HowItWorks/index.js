"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Hidden = require("@material-ui/core/Hidden");

var _Hidden2 = _interopRequireDefault(_Hidden);

var _common = require("config/common");

var _common2 = _interopRequireDefault(_common);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gethelpURL = function gethelpURL() {
  var hostname = window.location.hostname;
  if (hostname === "localhost") hostname = "https://s3.ap-south-1.amazonaws.com";else hostname = window.location.origin;
  var url = new URL(hostname + ("/" + _common2.default.S3BUCKET + "/BDUserManual_Citizen.pdf"));
  return url;
};
//hostname="https://13.71.65.215.nip.io";
// src="https://belegovgithub.github.io/webaccess/pdf/BillGenieUserManual_Citizen.pdf#view=FitH&embedded=true.pdf"
// src="https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb/TL_UserManual_Citizen.pdf#view=FitH&embedded=true"

var HowItWorks = function HowItWorks(props) {
  var helpURL = gethelpURL();
  return _react2.default.createElement(
    "div",
    { style: { height: "100vh" } },
    _react2.default.createElement(
      _Hidden2.default,
      { only: ["xs"] },
      _react2.default.createElement("iframe", {
        src: helpURL,
        style: { width: "100%", height: "90%" },
        frameborder: "0"
      })
    ),
    _react2.default.createElement(
      _Hidden2.default,
      { only: ["sm", "md", "lg", "xl"], implementation: "css" },
      _react2.default.createElement("iframe", {
        id: "pdfviewer",
        src: "http://docs.google.com/gview?embedded=true&amp;url=" + helpURL + "&amp;embedded=true",
        frameborder: "0",
        width: "100%",
        height: "90%"
      }),
      _react2.default.createElement(
        "p",
        null,
        (0, _commons.getLocaleLabels)("Your web browser doesn't have a PDF plugin. Instead you can ", "BND_BROWSER_PLUGIN_ISSUE"),
        _react2.default.createElement(
          "span",
          {
            style: { color: "blue", cursor: "pointer", textDecoration: "underline" }
            // href={helpURL}
            , onClick: function onClick() {
              return (0, _commons2.downloadPdf)(helpURL);
            }
          },
          (0, _commons.getLocaleLabels)("click here to download the PDF file.", "BND_DOWNLOAD_FILE")
        )
      )
    )
  );
};

exports.default = HowItWorks;