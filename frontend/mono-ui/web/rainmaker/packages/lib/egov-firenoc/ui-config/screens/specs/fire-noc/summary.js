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

var _commons = require("egov-ui-framework/ui-utils/commons");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _applicantSummary = require("./summaryResource/applicantSummary");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _estimateSummary = require("./summaryResource/estimateSummary");

var _footer = require("./summaryResource/footer");

var _nocSummary = require("./summaryResource/nocSummary");

var _propertySummary = require("./summaryResource/propertySummary");

var _index = require("../utils/index");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Fire NOC - Application Summary",
    labelKey: "NOC_SUMMARY_HEADER"
  })
});

var prepareUoms = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var buildings;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            buildings = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings", []);

            buildings.forEach(function (building, index) {
              var uoms = (0, _get2.default)(building, "uoms", []);
              var filterUoms = uoms.filter(function (dataUm) {
                return dataUm.active;
              });
              var uomsMap = {};
              filterUoms.forEach(function (uom) {
                uomsMap[uom.code] = uom.value;
              });
              dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.buildings[" + index + "].uomsMap", uomsMap));

              // Display UOMS on search preview page
              filterUoms.forEach(function (item) {
                var labelElement = (0, _utils.getLabelWithValue)({
                  labelName: item.code,
                  labelKey: "NOC_PROPERTY_DETAILS_" + item.code + "_LABEL"
                }, {
                  jsonPath: "FireNOCs[0].fireNOCDetails.buildings[" + index + "].uomsMap." + item.code,
                  // callBack: checkValueForNA,
                  callBack: function callBack(value) {
                    if (value == 0 || value == '0') {
                      return "0";
                    } else if (value) {
                      return value;
                    } else {
                      return _index.checkValueForNA;
                    }
                  }
                });

                // dispatch(
                //   handleField(
                //     "summary",
                //     "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children",
                //     item.code,
                //     labelElement
                //   )
                // );

                // set(
                //   action,
                //   `screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children.${item.code}`,
                //   labelElement
                // );
                // set(
                //   action,
                //   `screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.items[${index}].item${index}.children.cardContent.children.propertyContainer.children.${item.code}`,
                //   labelElement
                // );

                dispatch((0, _actions.handleScreenConfigurationFieldChange)("summary", "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.items[" + index + "].item" + index + ".children.cardContent.children.propertyContainer.children", item.code, labelElement));
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function prepareUoms(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var prepareDocumentsView = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var documentsPreview, reduxDocuments, fileStoreIds, fileUrls;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            documentsPreview = [];
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});

            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0) {
                documentsPreview.push({
                  title: (0, _commons.getTransformedLocale)(doc.documentSubCode || doc.documentCode),
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
              doc["link"] = (0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]);
              return doc;
            });
            dispatch((0, _actions.prepareFinalObject)("documentsPreview", documentsPreview));
            dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.additionalDetail.documents", documentsPreview));
            _context2.next = 17;
            return prepareUoms(state, dispatch);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function prepareDocumentsView(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "summary",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].tenantId");

    // let uomsObject = get(
    //   state.screenConfiguration.preparedFinalObject,
    //   "FireNOCs[0].fireNOCDetails.buildings[0].uomsMap"
    // );
    // if (uomsObject) {
    //   for (const [key, value] of Object.entries(uomsObject)) {
    //     let labelElement = getLabelWithValue(
    //       {
    //         labelName: key,
    //         labelKey: `NOC_PROPERTY_DETAILS_${key}_LABEL`
    //       },
    //       {
    //         jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${key}`
    //       }
    //     );
    //     set(
    //       action,
    //       `screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children.${key}`,
    //       labelElement
    //     );
    //   }
    // }


    // Set Institution/Applicant info card visibility
    if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", "").startsWith("INSTITUTION")) {
      (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.visible", false);
    } else {
      (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.visible", false);
    }
    var status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.status");
    (0, _index.generateBill)(dispatch, applicationNumber, tenantId, status);
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
          estimateSummary: _estimateSummary.estimateSummary,
          nocSummary: _nocSummary.nocSummary,
          propertySummary: _propertySummary.propertySummary,
          applicantSummary: _applicantSummary.applicantSummary,
          institutionSummary: _applicantSummary.institutionSummary,
          documentsSummary: _documentsSummary.documentsSummary
        }),
        footer: _footer.footer
      }
    }
  }
};

exports.default = screenConfig;