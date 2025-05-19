"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequiredDocuments = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("./footer");

require("./index.css");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  header: {
    color: "gba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "28px",
    paddingLeft: "5px"
  },
  subHeader: {
    color: "gba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19px"
  },
  docs: {
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17px",
    paddingBottom: "24px"
  },
  description: {
    fontFamily: "Roboto",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.6px",
    lineHeight: "14px"
  }
};
// import { getCommonGrayCard, getLabelOnlyValue } from "../../utils";


var getHeader = function getHeader(modulePrifx) {
  return (0, _utils.getCommonHeader)({
    labelName: "Required Documents-" + modulePrifx,
    labelKey: (0, _commons.getTransformedLocale)(modulePrifx + "_REQ_DOCS_HEADER")
  }, {
    style: styles.header
  });
};

var getCommonGrayCard = function getCommonGrayCard(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    children: {
      body: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          ch1: (0, _utils.getCommonCard)(children, {
            style: {
              backgroundColor: "rgb(242, 242, 242)",
              boxShadow: "none",
              borderRadius: 0,
              overflow: "visible"
            }
          })
        },
        gridDefination: {
          xs: 12
        }
      }
    },
    gridDefination: {
      xs: 12
    }
  };
};

var getLabelOnlyValue = function getLabelOnlyValue(value) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 6,
      sm: 4
    },
    props: (0, _extends3.default)({
      style: {
        marginBottom: "16px"
      }
    }, props),
    children: {
      value: (0, _utils.getCommonCaption)(value)
    }
  };
};

var generateDocument = function generateDocument(item, modulePrifx) {
  // Add header to individual grey cards
  var subHeader = item.code && (0, _utils.getCommonTitle)({
    labelKey: (0, _commons.getTransformedLocale)(modulePrifx + "_" + item.code + "_HEADING")
  }, {
    style: styles.subHeader
  });

  // Add documents in individual grey cards
  var docs = {};
  if (item.hasOwnProperty("dropdownData")) {
    docs = item.dropdownData.reduce(function (obj, doc) {
      obj[doc.code] = getLabelOnlyValue({
        labelKey: (0, _commons.getTransformedLocale)(modulePrifx + "_" + doc.code + "_LABEL")
      }, {
        style: styles.docs
      });
      return obj;
    }, {});
  } else if (item.hasOwnProperty("options")) {
    docs = item.options.reduce(function (obj, doc) {
      obj[doc.code] = getLabelOnlyValue({
        labelKey: (0, _commons.getTransformedLocale)(modulePrifx + "_" + doc.code + "_LABEL")
      }, {
        style: styles.docs
      });
      return obj;
    }, {});
  }

  // Add description to individual grey cards
  var subParagraph = item.description ? (0, _utils.getCommonParagraph)({
    labelKey: (0, _commons.getTransformedLocale)(modulePrifx + "_" + item.description + "_NOTE")
  }, {
    style: styles.description
  }) : {};

  var subParagraph1 = (0, _utils.getCommonParagraph)({
    labelKey: (0, _commons.getTransformedLocale)('ONE_OF_THESE_DOC_NEEDED')
  }, {
    style: styles.description
  });
  return getCommonGrayCard({
    subHeader: subHeader,
    break: (0, _utils.getBreak)(),
    subParagraph1: modulePrifx === "TradeLicense" ? {} : subParagraph1,
    break1: modulePrifx === "TradeLicense" ? {} : (0, _utils.getBreak)(),
    docs: (0, _utils.getCommonContainer)((0, _extends3.default)({}, docs)),
    subParagraph: subParagraph
  });
};

var getRequiredDocuments = exports.getRequiredDocuments = function getRequiredDocuments(documents, moduleName, footerCallback) {
  var doc = documents.map(function (item) {
    return generateDocument(item, moduleName);
  });
  var header = getHeader(moduleName);
  var footerChildElement = (0, _footer.footer)(footerCallback, moduleName);
  return (0, _utils.getCommonContainer)({
    header: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        className: "fixedHeader"
      },
      children: {
        header: header
      }
    },
    documents: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: (0, _extends3.default)({}, doc),
      props: {
        id: "documents-div"
      }
    },
    footer: {
      uiFramework: "custom-atoms",
      props: {
        className: "footerSticky"
      },
      componentPath: "Container",
      children: {
        footerChildElement: footerChildElement
      }
    }
  }, {
    style: {
      // paddingBottom: 75
    }
  });
};