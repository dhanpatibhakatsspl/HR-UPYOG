"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _applicantSummary = require("./propertyDetailResource/applicantSummary");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _estimateSummary = require("./summaryResource/estimateSummary");

var _footer = require("./propertyDetailResource/footer");

var _propertySummary = require("./propertyDetailResource/propertySummary");

var _assessmentSummary = require("./propertyDetailResource/assessmentSummary");

var _index = require("../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Property Information",
    labelKey: "PT_PROPERTY_INFO_HEADER"
  }),
  propertyId: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pt",
    componentPath: "PropertyIdContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "propertyId")
    }
  }
});

var prepareDocumentsView = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var documentsPreview, reduxDocuments, fileStoreIds, fileUrls;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            documentsPreview = [];
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});

            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0) {
                documentsPreview.push({
                  title: (0, _commons.getTransformedLocale)(doc.documentCode),
                  name: doc.documents[0].fileName,
                  fileStoreId: doc.documents[0].fileStoreId,
                  linkText: "View"
                });
              }
            });
            fileStoreIds = _jsonpath2.default.query(documentsPreview, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 7:
            _context.t0 = _context.sent;
            _context.next = 11;
            break;

          case 10:
            _context.t0 = [];

          case 11:
            fileUrls = _context.t0;

            documentsPreview = documentsPreview.map(function (doc) {
              doc["link"] = fileUrls[doc.fileStoreId];
              return doc;
            });
            dispatch((0, _actions.prepareFinalObject)("documentsPreview", documentsPreview));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function prepareDocumentsView(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "property-detail",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].tenantId");

    var uomsObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.buildings[0].uomsMap");
    if (uomsObject) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(uomsObject)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          var labelElement = (0, _utils.getLabelWithValue)({
            labelName: key,
            labelKey: "NOC_PROPERTY_DETAILS_" + key + "_LABEL"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].uomsMap." + key
          });
          (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children." + key, labelElement);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    // Set Institution/Applicant info card visibility
    if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", "").startsWith("INSTITUTION")) {
      (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.visible", false);
    } else {
      (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.visible", false);
    }

    (0, _index.generateBill)(dispatch, applicationNumber, tenantId);
    prepareDocumentsView(state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, header)
          }
        },
        body: (0, _utils.getCommonCard)({
          propertySummary: _propertySummary.propertySummary,
          assessmentSummary: _assessmentSummary.assessmentSummary,
          applicantSummary: _applicantSummary.applicantSummary,
          institutionSummary: _applicantSummary.institutionSummary
        }),
        footer: _footer.footer
      }
    }
  }
};

exports.default = screenConfig;