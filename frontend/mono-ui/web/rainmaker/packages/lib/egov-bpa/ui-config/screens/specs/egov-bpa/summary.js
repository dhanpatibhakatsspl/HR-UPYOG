"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _basicSummary = require("./summaryResource/basicSummary");

var _scrutinySummary = require("./summaryResource/scrutinySummary");

var _applicantSummary = require("./summaryResource/applicantSummary");

var _plotAndBoundaryInfoSummary = require("./summaryResource/plotAndBoundaryInfoSummary");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _estimateSummary = require("./summaryResource/estimateSummary");

var _footer = require("./summaryResource/footer");

var _basicDetails = require("./applyResource/basicDetails");

var _nocSummary = require("./summaryResource/nocSummary");

var _index = require("../utils/index");

var _functions = require("../egov-bpa/searchResource/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "BPA - Application Summary",
    labelKey: "BPA_SUMMARY_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bpa",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
    }
  }
});

var prepareDocumentsDetailsView = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var documentsPreview, reduxDocuments, fileStoreIds, fileUrls;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            documentsPreview = [];
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentDetailsUploadRedux", {});

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
            dispatch((0, _actions.prepareFinalObject)("documentDetailsPreview", documentsPreview));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function prepareDocumentsDetailsView(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var prepareNocDocumentsView = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var documentsPreview, reduxDocuments, fileStoreIds, fileUrls, prepareDocumentsDetailsView;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            documentsPreview = [];
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.nocDocumentsUploadRedux", {});

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
              _context3.next = 10;
              break;
            }

            _context3.next = 7;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 7:
            _context3.t0 = _context3.sent;
            _context3.next = 11;
            break;

          case 10:
            _context3.t0 = [];

          case 11:
            fileUrls = _context3.t0;

            documentsPreview = documentsPreview.map(function (doc) {
              doc["link"] = fileUrls[doc.fileStoreId];
              return doc;
            });

            prepareDocumentsDetailsView = function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
                var documentsPreview, reduxDocuments, fileStoreIds, fileUrls;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        documentsPreview = [];
                        reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentDetailsUploadRedux", {});

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
                          _context2.next = 10;
                          break;
                        }

                        _context2.next = 7;
                        return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

                      case 7:
                        _context2.t0 = _context2.sent;
                        _context2.next = 11;
                        break;

                      case 10:
                        _context2.t0 = [];

                      case 11:
                        fileUrls = _context2.t0;

                        documentsPreview = documentsPreview.map(function (doc) {
                          doc["link"] = fileUrls[doc.fileStoreId];
                          return doc;
                        });
                        dispatch((0, _actions.prepareFinalObject)("documentDetailsPreview", documentsPreview));

                      case 14:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function prepareDocumentsDetailsView(_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }();

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function prepareNocDocumentsView(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "summary",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber =
    // getQueryArg(window.location.href, "applicationNumber") ||
    (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.applicationNo");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.address.city");
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.uploadedDocumentDetailsCard.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.uploadedNocDocumentDetailsCard.visible", false);
    (0, _index.generateBillForBPA)(dispatch, applicationNumber, tenantId, "BPA.NC_APP_FEE");
    prepareNocDocumentsView(state, dispatch);
    prepareDocumentsDetailsView(state, dispatch);
    // setResidentialList(state, dispatch);
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
          estimateSummary: _estimateSummary.estimateSummary,
          basicSummary: _basicSummary.basicSummary,
          scrutinySummary: _scrutinySummary.scrutinySummary,
          applicantSummary: _applicantSummary.applicantSummary,
          plotAndBoundaryInfoSummary: _plotAndBoundaryInfoSummary.plotAndBoundaryInfoSummary,
          documentsSummary: _documentsSummary.documentsSummary,
          nocSummary: _nocSummary.nocSummary
        }),
        footer: _footer.footer
      }
    }
  }
};

exports.default = screenConfig;