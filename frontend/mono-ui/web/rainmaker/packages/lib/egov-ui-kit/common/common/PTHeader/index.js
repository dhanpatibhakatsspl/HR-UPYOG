"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DownloadPrintButton = require("egov-ui-framework/ui-molecules/DownloadPrintButton");

var _DownloadPrintButton2 = _interopRequireDefault(_DownloadPrintButton);

var _utils = require("egov-ui-kit/redux/app/utils");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PTCommon = require("../../../utils/PTCommon");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PTHeader = function PTHeader(_ref) {
  var _ref$header = _ref.header,
      header = _ref$header === undefined ? '' : _ref$header,
      _ref$headerValue = _ref.headerValue,
      headerValue = _ref$headerValue === undefined ? '' : _ref$headerValue,
      _ref$subHeaderTitle = _ref.subHeaderTitle,
      subHeaderTitle = _ref$subHeaderTitle === undefined ? '' : _ref$subHeaderTitle,
      _ref$subHeaderValue = _ref.subHeaderValue,
      subHeaderValue = _ref$subHeaderValue === undefined ? '' : _ref$subHeaderValue,
      _ref$downloadPrintBut = _ref.downloadPrintButton,
      downloadPrintButton = _ref$downloadPrintBut === undefined ? false : _ref$downloadPrintBut,
      download = _ref.download,
      print = _ref.print;

  var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
  var localizationLabelsData = (0, _utils.initLocalizationLabels)(locale);
  var downloadButton = void 0;
  var printButton = void 0;

  if (downloadPrintButton) {
    var applicationDownloadObject = {
      label: { labelName: "Application", labelKey: "PT_APPLICATION" },
      link: function link() {
        download ? download() : (0, _PTCommon.generatePdfFromDiv)("download", subHeaderValue, "#property-review-form");
      },
      leftIcon: "assignment"
    };

    var tlCertificatePrintObject = {
      label: { labelName: "Application", labelKey: "PT_APPLICATION" },
      link: function link() {
        print ? print() : (0, _PTCommon.generatePdfFromDiv)("print", subHeaderValue, "#property-review-form");
      },
      leftIcon: "book"

    };
    var downloadMenu = [];
    var printMenu = [];
    downloadMenu.push(applicationDownloadObject);
    printMenu.push(tlCertificatePrintObject);
    downloadButton = { menu: downloadMenu, visibility: true };
    printButton = { menu: printMenu, visibility: true };
  }

  return _react2.default.createElement(
    "div",
    { className: "search-preview-header flex-child", style: { display: "flex", marginBottom: downloadPrintButton ? 20 : 10, marginTop: 20, justifyContent: "space-between" } },
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_translationNode2.default, {
        label: (0, _commons.getTranslatedLabel)(header, localizationLabelsData) + " " + headerValue,
        containerStyle: { padding: "10px 0px 0px 0px", marginLeft: "16px", display: "inline-block" },
        dark: true,
        bold: true,
        labelStyle: { letterSpacing: 0 },
        fontSize: "20px"
      }),
      subHeaderValue.length !== 0 && _react2.default.createElement(_translationNode2.default, {
        bold: true
        //"PT_PROPERTY_PTUID"
        , label: (0, _commons.getTranslatedLabel)(subHeaderTitle, localizationLabelsData) + " " + subHeaderValue,
        containerStyle: { marginLeft: "13px", display: "inline-block" },
        labelStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "rgba(255, 255, 255, 0.87)",
          marginLeft: "8px",
          paddingLeft: "19px",
          paddingRight: "19px",
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "35px",
          fontSize: "16px",
          whiteSpace: "nowrap"
        },
        fontSize: "16px"
      })
    ),
    downloadPrintButton && _react2.default.createElement(
      "div",
      { className: "header-buttons", style: { float: "right", display: "flex", marginRight: 20 } },
      _react2.default.createElement(_DownloadPrintButton2.default, {
        data: {
          label: {
            llabelName: "DOWNLOAD",
            labelKey: "PT_DOWNLOAD"
          },
          leftIcon: "print",
          rightIcon: "arrow_drop_down",
          props: { variant: "outlined", style: { height: 65, marginRight: 20, color: "#FE7A51" } },
          menu: downloadButton.menu
        }
      }),
      _react2.default.createElement(_DownloadPrintButton2.default, {
        data: {
          label: {
            llabelName: "Print",
            labelKey: "PT_PRINT"
          },
          leftIcon: "print",
          rightIcon: "arrow_drop_down",
          props: { variant: "outlined", style: { height: 65, marginLeft: 10, color: "#FE7A51" } },
          menu: printButton.menu
        }
      })
    )
  );
};
exports.default = PTHeader;