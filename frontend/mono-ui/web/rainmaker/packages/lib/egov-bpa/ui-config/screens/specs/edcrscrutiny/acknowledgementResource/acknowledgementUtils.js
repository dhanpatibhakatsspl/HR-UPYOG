"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadPrintContainer = exports.downloadReport = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  bodyBox: {
    marginLeft: 16,
    flex: 2
  },
  tailText: {
    color: "rgba(0, 0, 0, 0.6000000238418579)",
    fontSize: 16,
    fontWeight: 400
  },
  tailNumber: {
    fontSize: 24,
    fontWeight: 500
  },
  tailBox: {
    textAlign: "right",
    justifyContent: "center",
    flex: 1
  },
  bodySub: {
    marginTop: "8px",
    marginBottom: "0px",
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto"
  },
  container: {
    display: "flex",
    minHeight: "106px",
    justifyContent: "center",
    alignItems: "center"
  }
};

var downloadReport = exports.downloadReport = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, mode) {
    var downloadLink, win, response, file, fileURL, myWindow;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(mode === 'download')) {
              _context.next = 7;
              break;
            }

            downloadLink = void 0;

            if (!url.includes("https") && window.location.href.includes("https")) {
              downloadLink = url.replace(/http/g, "https");
            } else {
              downloadLink = url;
            }
            win = window.open(downloadLink, '_blank');

            if (win) {
              win.focus();
            }
            _context.next = 14;
            break;

          case 7:
            _context.next = 9;
            return _axios2.default.get(url, {
              //responseType: "blob",
              responseType: "arraybuffer",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/pdf"
              }
            });

          case 9:
            response = _context.sent;
            file = new Blob([response.data], { type: "application/pdf" });
            fileURL = URL.createObjectURL(file);
            myWindow = window.open(fileURL);

            if (myWindow != undefined) {
              myWindow.addEventListener("load", function (event) {
                myWindow.focus();
                myWindow.print();
              });
            }

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function downloadReport(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var acknowledgementCard = function acknowledgementCard() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$icon = _ref2.icon,
      icon = _ref2$icon === undefined ? "done" : _ref2$icon,
      _ref2$backgroundColor = _ref2.backgroundColor,
      backgroundColor = _ref2$backgroundColor === undefined ? "#39CB74" : _ref2$backgroundColor,
      header = _ref2.header,
      body = _ref2.body,
      tailText = _ref2.tailText,
      number = _ref2.number;

  var tail = tailText && number && number !== "null" ? {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      text: (0, _utils.getCommonHeader)(tailText, { style: style.tailText }),
      paragraph: (0, _utils.getCommonHeader)({
        labelName: number
      }, { style: style.tailNumber })
    },
    props: {
      style: style.tailBox
    }
  } : {};

  return (0, _utils.getCommonCard)({
    applicationSuccessContainer: (0, _utils.getCommonContainer)({
      avatar: {
        componentPath: "Avatar",
        props: {
          style: {
            width: "72px",
            height: "72px",
            backgroundColor: backgroundColor
          }
        },
        children: {
          Icon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: icon,
              style: {
                fontSize: "50px"
              },
              iconSize: "50px"
            }
          }
        }
      },
      body: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          header: (0, _utils.getCommonHeader)(header),
          paragraph: body ? (0, _utils.getCommonParagraph)(body, {
            style: style.bodySub
          }) : {}
        },
        props: {
          style: style.bodyBox
        }
      },
      tail: tail
    }, {
      style: style.container
    })
  });
};

var downloadPrintContainer = exports.downloadPrintContainer = function downloadPrintContainer(url) {
  /** MenuButton data based on status */
  var downloadMenu = [];
  var printMenu = [];
  var receiptDownloadObject = {
    label: { labelName: "scrutinyreport", labelKey: "EDCR_SCUTINY_REPORT" },
    link: function link() {
      downloadReport(url, "download");
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "scrutinyreport", labelKey: "EDCR_SCUTINY_REPORT" },
    link: function link() {
      downloadReport(url, "print");
    },
    leftIcon: "receipt"
  };
  // switch (status.toup) {
  //   case "APPROVED":
  downloadMenu = [receiptDownloadObject];
  printMenu = [receiptPrintObject];

  /** END */

  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: { textAlign: "right", display: "flex" }
    },
    children: {
      downloadMenu: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-bpa",
        componentPath: "MenuButton",
        props: {
          data: {
            label: { labelName: "DOWNLOAD", labelKey: "BPA_DOWNLOAD" },
            leftIcon: "cloud_download",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-download-button" },
            menu: downloadMenu
          }
        }
      },
      printMenu: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-bpa",
        componentPath: "MenuButton",
        props: {
          data: {
            label: { labelName: "PRINT", labelKey: "BPA_PRINT" },
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
            menu: printMenu
          }
        }
      }

    }
    // gridDefination: {
    //   xs: 12,
    //   sm: 6
    // }
  };
};

exports.default = acknowledgementCard;