"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWaterDetails = exports.getSewerageDetails = exports.generateBillAmendPdf = exports.submitApplication = exports.onDemandRevisionBasis = exports.validateFields = exports.getTranslatedLabel = exports.prepareDocumentsUploadData = exports.getCommonApplyFooter = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _commons = require("egov-common/ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../../ui-utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = exports.getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var prepareDocumentsUploadData = exports.prepareDocumentsUploadData = function prepareDocumentsUploadData(state, dispatch) {
  var demandRevisionBasisValue = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Amendment.amendmentReason", "");
  var documentObj = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.BillAmendment.documentObj");
  var documentTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.DocumentType");

  var documentObjArray = [];
  var flag = false;

  documentObj.forEach(function (docObj) {
    docObj.allowedDocs.forEach(function (innerObj) {
      innerObj.demandRevisionBasis.forEach(function (value) {
        if (value === demandRevisionBasisValue) flag = true;
      });
    });
    if (flag) {
      documentObjArray.push(docObj);
      flag = false;
      return true;
    }
  });

  var documents = documentObjArray[0].allowedDocs;

  var documentsContract = [];
  var tempDoc = {};
  documents.forEach(function (doc) {
    var card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(function (doc) {
    var card = {};
    card["name"] = doc.documentType;
    card["code"] = doc.documentType;
    card["required"] = doc.required ? true : false;
    if (doc.dropdownData) {
      var dropdown = {};
      dropdown.label = "BILL_SELECT_LABEL";
      dropdown.required = doc.required;
      dropdown.menu = doc.dropdownData.filter(function (item) {
        return item.active;
      });
      dropdown.menu = dropdown.menu.map(function (item) {
        return { code: item.code, label: (0, _commons2.getTransformedLocale)(item.code) };
      });
      card["dropdown"] = dropdown;
    }
    tempDoc[doc.documentType].cards.push(card);
  });

  Object.keys(tempDoc).forEach(function (key) {
    documentsContract.push(tempDoc[key]);
  });

  dispatch((0, _actions2.prepareFinalObject)("documentsContract", documentsContract));
};

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

var validateFields = exports.validateFields = function validateFields(objectJsonPath, state, dispatch) {
  var screen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "apply";

  var fields = (0, _get2.default)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils2.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
      }), dispatch, true)) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};

var onDemandRevisionBasis = exports.onDemandRevisionBasis = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var demandRevisionBasis;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            demandRevisionBasis = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Amendment.amendmentReason", "");
            _context.t0 = demandRevisionBasis;
            _context.next = _context.t0 === "COURT_CASE_SETTLEMENT" ? 4 : _context.t0 === "ARREAR_WRITE_OFF" ? 11 : _context.t0 === "ONE_TIME_SETTLEMENT" ? 11 : _context.t0 === "DCB_CORRECTION" ? 18 : _context.t0 === "REMISSION_FOR_PROPERTY_TAX" ? 18 : _context.t0 === "OTHERS" ? 18 : 25;
            break;

          case 4:
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate", "visible", false));
            return _context.abrupt("break", 26);

          case 11:
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate", "visible", true));
            return _context.abrupt("break", 26);

          case 18:
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber", "visible", false));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate", "visible", true));
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate", "visible", true));
            return _context.abrupt("break", 26);

          case 25:
            return _context.abrupt("break", 26);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function onDemandRevisionBasis(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var submitApplication = exports.submitApplication = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var billAmdDetails, fetchBillDetails, billDetail, amountType, reduxDocuments, documentsPreview, demandDetails, searchBillDetails, response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            billAmdDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Amendment", {});
            fetchBillDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "fetchBillDetails", []);
            billDetail = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "billDetail", {});
            amountType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BILL.AMOUNTTYPE", "");
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});
            documentsPreview = [], demandDetails = [];
            ;
            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0 && doc.dropdown) {
                doc.documents.forEach(function (docDetail) {
                  var obj = {};
                  obj.documentType = doc.dropdown.value;
                  obj.fileName = docDetail.fileName;
                  obj.fileStoreId = docDetail.fileStoreId;
                  obj.fileStore = docDetail.fileStoreId;
                  obj.fileUrl = docDetail.fileUrl && docDetail.fileUrl.split(",")[0];
                  documentsPreview.push(obj);
                });
              }
            });

            fetchBillDetails.map(function (data) {
              if (data.reducedAmountValue || data.additionalAmountValue) {
                var obj = {};
                obj.taxHeadMasterCode = data.taxHeadCode;
                obj.tenantId = data.tenantId;
                obj.collectionAmount = data.collectionAmount;
                if (amountType == "reducedAmount") {
                  obj.taxAmount = data.reducedAmountValue ? -data.reducedAmountValue : 0;
                } else {
                  obj.taxAmount = data.additionalAmountValue ? data.additionalAmountValue : 0;
                }
                demandDetails.push(obj);
              }
            });

            billAmdDetails.documents = documentsPreview && documentsPreview.length > 0 ? documentsPreview : null;
            billAmdDetails.demandDetails = demandDetails;

            if ((0, _get2.default)(billAmdDetails, "effectiveFrom")) {
              billAmdDetails.effectiveFrom = (0, _utils.convertDateToEpoch)((0, _get2.default)(billAmdDetails, "effectiveFrom"));
            }

            if ((0, _get2.default)(billAmdDetails, "effectiveTill")) {
              billAmdDetails.effectiveTill = (0, _utils.convertDateToEpoch)((0, _get2.default)(billAmdDetails, "effectiveTill"));
            }

            // if (get(billAmdDetails, "dateEffectiveFrom")) {
            //   billAmdDetails.dateEffectiveFrom = convertDateToEpoch(get(billAmdDetails, "dateEffectiveFrom"));
            // }

            searchBillDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchBillDetails-bill", {});

            (0, _set2.default)(billAmdDetails, 'additionalDetails.searchBillDetails', (0, _extends3.default)({}, searchBillDetails));
            _context2.prev = 15;
            _context2.next = 18;
            return (0, _api.httpRequest)("post", "billing-service/amendment/_create", "", [], { Amendment: billAmdDetails });

          case 18:
            response = _context2.sent;

            dispatch((0, _actions2.prepareFinalObject)("Amendment", response.Amendments[0]));

            dispatch((0, _actions.setRoute)("/bill-amend/acknowledgement?purpose=apply&status=success&applicationNumber=" + response.Amendments[0].amendmentId + "&consumerCode=" + response.Amendments[0].consumerCode + "&tenantId=" + response.Amendments[0].tenantId + "&businessService=" + response.Amendments[0].businessService));

            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](15);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context2.t0.message }, "error"));
            return _context2.abrupt("return", { status: "failure", message: _context2.t0 });

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[15, 23]]);
  }));

  return function submitApplication(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var generateBillAmendPdf = exports.generateBillAmendPdf = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(Amendments, tenantId) {
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'download';
    var pdfKey, queryStr, DOWNLOADRECEIPT;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pdfKey = 'bill-amendment-credit-note';

            if ((0, _get2.default)(Amendments[0], "businessService", 'WS') == 'SW') {
              pdfKey = 'sw-bill-amendment-credit-note';
            }
            queryStr = [
            // { key: "key", value: 'bill-amendment-summary' },
            { key: "key", value: pdfKey }, { key: "tenantId", value: tenantId }];
            DOWNLOADRECEIPT = {
              GET: {
                URL: "/pdf-service/v1/_create",
                ACTION: "_get"
              }
            };

            Amendments && Amendments[0] && Amendments[0].demandDetails.map(function (detail) {
              if (detail.taxAmount > 0) {
                (0, _set2.default)(Amendments[0], 'additionalDetails.noteType', 'DEBIT_NOTE');
              } else {
                (0, _set2.default)(Amendments[0], 'additionalDetails.noteType', 'CREDIT_NOTE');
              }
              detail.taxAmount = detail.taxAmount == 0 ? "0" : Math.abs(detail.taxAmount);
            });

            try {
              (0, _api.httpRequest)("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Amendments: Amendments }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' }).then(function (res) {
                res.filestoreIds[0];
                if (res && res.filestoreIds && res.filestoreIds.length > 0) {
                  res.filestoreIds.map(function (fileStoreId) {
                    (0, _commons.downloadReceiptFromFilestoreID)(fileStoreId, mode, tenantId);
                  });
                }
              });
            } catch (exception) {
              alert('Some Error Occured while downloading Acknowledgement form!');
            }

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function generateBillAmendPdf(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var getSewerageDetails = exports.getSewerageDetails = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "/sw-services/swc/_search", "_search", queryObject);

          case 3:
            response = _context4.sent;

            if (!(response !== null && response !== undefined && response.SewerageConnections && response.SewerageConnections.length > 0)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", response);

          case 6:
            _context4.next = 10;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 8]]);
  }));

  return function getSewerageDetails(_x9) {
    return _ref4.apply(this, arguments);
  };
}();

var getWaterDetails = exports.getWaterDetails = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _api.httpRequest)("post", "/ws-services/wc/_search", "_search", queryObject);

          case 3:
            response = _context5.sent;

            if (!(response !== null && response !== undefined && response.WaterConnection && response.WaterConnection.length > 0)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", response);

          case 6:
            _context5.next = 10;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 8]]);
  }));

  return function getWaterDetails(_x10) {
    return _ref5.apply(this, arguments);
  };
}();