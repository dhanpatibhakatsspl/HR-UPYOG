"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printConReceipt = exports.downloadConReceipt = exports.downloadChallan = exports.downloadMultipleFileFromFilestoreIds = exports.downloadMultipleBill = exports.downloadBill = exports.download = exports.downloadReceiptFromFilestoreID = exports.setApplicationNumberBox = exports.furnishNocResponse = exports.prepareDocumentsUploadRedux = exports.prepareDocumentsUploadData = exports.createUpdateNocApplication = exports.getSearchResults = exports.findItemInArrayOfObject = exports.getLocaleLabelsforTL = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils2 = require("../ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleDeletedCards = function handleDeletedCards(jsonObject, jsonPath, key) {
  var originalArray = (0, _get2.default)(jsonObject, jsonPath, []);
  var modifiedArray = originalArray.filter(function (element) {
    return element.hasOwnProperty(key) || !element.hasOwnProperty("isDeleted");
  });
  modifiedArray = modifiedArray.map(function (element) {
    if (element.hasOwnProperty("isDeleted")) {
      element["isActive"] = false;
    }
    return element;
  });
  (0, _set2.default)(jsonObject, jsonPath, modifiedArray);
};

var getLocaleLabelsforTL = exports.getLocaleLabelsforTL = function getLocaleLabelsforTL(label, labelKey, localizationLabels) {
  if (labelKey) {
    var translatedLabel = (0, _utils2.getTranslatedLabel)(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

var getSearchResults = exports.getSearchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            _store2.default.dispatch((0, _actions.toggleSpinner)());
            _context.next = 4;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_search", "", queryObject);

          case 4:
            response = _context.sent;

            _store2.default.dispatch((0, _actions.toggleSpinner)());
            return _context.abrupt("return", response);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message, labelKey: _context.t0.message }, "error"));
            throw _context.t0;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function getSearchResults(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createUpdateNocApplication = exports.createUpdateNocApplication = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, status) {
    var nocId, method, payload, tenantId, reduxDocuments, buildings, ownerDocuments, otherDocuments, owners, response, fireNocData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            nocId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].id");
            method = nocId ? "UPDATE" : "CREATE";
            _context2.prev = 2;
            payload = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs", []);
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.city", (0, _localStorageUtils.getTenantId)());

            (0, _set2.default)(payload[0], "tenantId", tenantId);
            (0, _set2.default)(payload[0], "fireNOCDetails.action", status);

            // Get uploaded documents from redux
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});


            handleDeletedCards(payload[0], "fireNOCDetails.buildings", "id");
            handleDeletedCards(payload[0], "fireNOCDetails.applicantDetails.owners", "id");

            buildings = (0, _get2.default)(payload, "[0].fireNOCDetails.buildings", []);

            buildings.forEach(function (building, index) {
              // GET UOMS FOR THE SELECTED BUILDING TYPE
              var requiredUoms = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType", []).filter(function (buildingType) {
                return buildingType.code === building.usageType;
              });
              requiredUoms = (0, _get2.default)(requiredUoms, "[0].uom", []);
              // GET UNIQUE UOMS LIST INCLUDING THE DEFAULT
              var allUoms = [].concat((0, _toConsumableArray3.default)(new Set([].concat((0, _toConsumableArray3.default)(requiredUoms), ["NO_OF_FLOORS", "NO_OF_BASEMENTS", "PLOT_SIZE", "BUILTUP_AREA", "HEIGHT_OF_BUILDING"]))));
              var finalUoms = [];
              allUoms.forEach(function (uom) {
                var value = (0, _get2.default)(building.uomsMap, uom);
                value && finalUoms.push({
                  code: uom,
                  value: parseInt(value),
                  isActiveUom: requiredUoms.includes(uom) ? true : false,
                  active: true
                });
              });

              // Quick fix to repair old uoms
              var oldUoms = (0, _get2.default)(payload[0], "fireNOCDetails.buildings[" + index + "].uoms", []);
              oldUoms.forEach(function (oldUom, oldUomIndex) {
                (0, _set2.default)(payload[0], "fireNOCDetails.buildings[" + index + "].uoms[" + oldUomIndex + "].isActiveUom", false);
                (0, _set2.default)(payload[0], "fireNOCDetails.buildings[" + index + "].uoms[" + oldUomIndex + "].active", false);
              });
              // End Quick Fix

              (0, _set2.default)(payload[0], "fireNOCDetails.buildings[" + index + "].uoms", [].concat(finalUoms, (0, _toConsumableArray3.default)(oldUoms)));

              // Set building documents
              var uploadedDocs = [];
              _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
                if (doc.documents && doc.documents.length > 0) {
                  if (doc.documentSubCode && doc.documentSubCode.startsWith("BUILDING.BUILDING_PLAN")) {
                    if (doc.documentCode === building.name) {
                      uploadedDocs = [].concat((0, _toConsumableArray3.default)(uploadedDocs), [{
                        tenantId: tenantId,
                        documentType: doc.documentSubCode,
                        fileStoreId: doc.documents[0].fileStoreId
                      }]);
                    }
                  }
                }
              });
              (0, _set2.default)(payload[0], "fireNOCDetails.buildings[" + index + "].applicationDocuments", uploadedDocs);
            });

            // Set owners & other documents
            ownerDocuments = [];
            otherDocuments = [];

            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0) {
                if (doc.documentType === "OWNER") {
                  ownerDocuments = [].concat((0, _toConsumableArray3.default)(ownerDocuments), [{
                    tenantId: tenantId,
                    documentType: doc.documentSubCode ? doc.documentSubCode : doc.documentCode,
                    fileStoreId: doc.documents[0].fileStoreId
                  }]);
                } else if (!doc.documentSubCode) {
                  // SKIP BUILDING PLAN DOCS
                  otherDocuments = [].concat((0, _toConsumableArray3.default)(otherDocuments), [{
                    tenantId: tenantId,
                    documentType: doc.documentCode,
                    fileStoreId: doc.documents[0].fileStoreId
                  }]);
                }
              }
            });

            (0, _set2.default)(payload[0], "fireNOCDetails.applicantDetails.additionalDetail.documents", ownerDocuments);
            (0, _set2.default)(payload[0], "fireNOCDetails.additionalDetail.documents", otherDocuments);

            // Set Channel and Financial Year
            process.env.REACT_APP_NAME === "Citizen" ? (0, _set2.default)(payload[0], "fireNOCDetails.channel", "CITIZEN") : (0, _set2.default)(payload[0], "fireNOCDetails.channel", "COUNTER");
            (0, _set2.default)(payload[0], "fireNOCDetails.financialYear", "2019-20");

            // Set Dates to Epoch
            owners = (0, _get2.default)(payload[0], "fireNOCDetails.applicantDetails.owners", []);

            owners.forEach(function (owner, index) {
              (0, _set2.default)(payload[0], "fireNOCDetails.applicantDetails.owners[" + index + "].dob", (0, _utils.convertDateToEpoch)((0, _get2.default)(owner, "dob")));
            });

            response = void 0;

            if (!(method === "CREATE")) {
              _context2.next = 31;
              break;
            }

            _context2.next = 25;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_create", "", [], { FireNOCs: payload });

          case 25:
            response = _context2.sent;

            response = furnishNocResponse(response);
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", response.FireNOCs));
            setApplicationNumberBox(state, dispatch);
            _context2.next = 37;
            break;

          case 31:
            if (!(method === "UPDATE")) {
              _context2.next = 37;
              break;
            }

            _context2.next = 34;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_update", "", [], { FireNOCs: payload });

          case 34:
            response = _context2.sent;

            response = furnishNocResponse(response);
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", response.FireNOCs));

          case 37:
            return _context2.abrupt("return", { status: "success", message: response });

          case 40:
            _context2.prev = 40;
            _context2.t0 = _context2["catch"](2);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message }, "error"));

            // Revert the changed pfo in case of request failure
            fireNocData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs", []);

            fireNocData = furnishNocResponse({ FireNOCs: fireNocData });
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", fireNocData.FireNOCs));

            return _context2.abrupt("return", { status: "failure", message: _context2.t0 });

          case 47:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 40]]);
  }));

  return function createUpdateNocApplication(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var prepareDocumentsUploadData = exports.prepareDocumentsUploadData = function prepareDocumentsUploadData(state, dispatch) {
  var documents = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.FireNoc.Documents", []);
  documents = documents.filter(function (item) {
    return item.active;
  });
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
    // Handle the case for multiple muildings
    if (doc.code === "BUILDING.BUILDING_PLAN" && doc.hasMultipleRows && doc.options) {
      var buildingsData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings", []);

      buildingsData.forEach(function (building) {
        var card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(function (subDoc) {
          var subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    } else {
      var card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        var dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(function (item) {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(function (item) {
          return { code: item.code, label: (0, _commons.getTransformedLocale)(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(function (key) {
    documentsContract.push(tempDoc[key]);
  });

  dispatch((0, _actions.prepareFinalObject)("documentsContract", documentsContract));
};

var prepareDocumentsUploadRedux = exports.prepareDocumentsUploadRedux = function prepareDocumentsUploadRedux(state, dispatch) {
  var _props = undefined.props,
      documentsList = _props.documentsList,
      _props$documentsUploa = _props.documentsUploadRedux,
      documentsUploadRedux = _props$documentsUploa === undefined ? {} : _props$documentsUploa,
      prepareFinalObject = _props.prepareFinalObject;

  var index = 0;
  documentsList.forEach(function (docType) {
    docType.cards && docType.cards.forEach(function (card) {
      if (card.subCards) {
        card.subCards.forEach(function (subCard) {
          var oldDocType = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentType");
          var oldDocCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentCode");
          var oldDocSubCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentSubCode");
          if (oldDocType != docType.code || oldDocCode != card.name || oldDocSubCode != subCard.name) {
            documentsUploadRedux[index] = {
              documentType: docType.code,
              documentCode: card.name,
              documentSubCode: subCard.name
            };
          }
          index++;
        });
      } else {
        var oldDocType = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentType");
        var oldDocCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentCode");
        if (oldDocType != docType.code || oldDocCode != card.name) {
          documentsUploadRedux[index] = {
            documentType: docType.code,
            documentCode: card.name,
            isDocumentRequired: card.required,
            isDocumentTypeRequired: card.dropdown ? card.dropdown.required : false
          };
        }
      }
      index++;
    });
  });
  prepareFinalObject("documentsUploadRedux", documentsUploadRedux);
};

var furnishNocResponse = exports.furnishNocResponse = function furnishNocResponse(response) {
  // Handle applicant ownership dependent dropdowns
  var ownershipType = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType");
  (0, _set2.default)(response, "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType", ownershipType == undefined ? "SINGLE" : ownershipType.split(".")[0]);

  // Prepare UOMS and Usage Type Dropdowns in required format
  var buildings = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.buildings", []);
  buildings.forEach(function (building, index) {
    var uoms = (0, _get2.default)(building, "uoms", []);
    var uomMap = {};
    uoms.forEach(function (uom) {
      uomMap[uom.code] = "" + uom.value;
    });
    (0, _set2.default)(response, "FireNOCs[0].fireNOCDetails.buildings[" + index + "].uomsMap", uomMap);

    var usageType = (0, _get2.default)(building, "usageType");
    (0, _set2.default)(response, "FireNOCs[0].fireNOCDetails.buildings[" + index + "].usageTypeMajor", usageType == undefined ? "" : usageType.split(".")[0]);
  });

  return response;
};

var setApplicationNumberBox = exports.setApplicationNumberBox = function setApplicationNumberBox(state, dispatch, applicationNo) {
  if (!applicationNo) {
    applicationNo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber", null);
  }

  if (applicationNo) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", applicationNo));
  }
};

var downloadReceiptFromFilestoreID = exports.downloadReceiptFromFilestoreID = function downloadReceiptFromFilestoreID(fileStoreId, mode, tenantId) {
  var showConfirmation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  (0, _commons.getFileUrlFromAPI)(fileStoreId, tenantId).then(function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(fileRes) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(fileRes && !fileRes[fileStoreId])) {
                _context3.next = 3;
                break;
              }

              console.error("ERROR IN DOWNLOADING RECEIPT");
              return _context3.abrupt("return");

            case 3:
              if (mode === "download") {
                if (localStorage.getItem("pay-channel") && localStorage.getItem("pay-redirectNumber")) {
                  setTimeout(function () {
                    var weblink = "https://api.whatsapp.com/send?phone=" + localStorage.getItem("pay-redirectNumber") + "&text=" + "";
                    window.location.href = weblink;
                  }, 1500);
                }
                (0, _commons2.downloadPdf)(fileRes[fileStoreId]);
                if (showConfirmation) {
                  if (localStorage.getItem("receipt-channel") == "whatsapp" && localStorage.getItem("receipt-redirectNumber") != "") {
                    setTimeout(function () {
                      var weblink = "https://api.whatsapp.com/send?phone=" + localStorage.getItem("receipt-redirectNumber") + "&text=" + "";
                      window.location.href = weblink;
                    }, 1500);
                  }
                  _store2.default.dispatch((0, _actions.toggleSnackbar)(true, {
                    labelName: "Success in Receipt Generation",
                    labelKey: "SUCCESS_IN_GENERATION_RECEIPT"
                  }, "success"));
                }
              } else if (mode === "open") {
                if (localStorage.getItem("pay-channel") && localStorage.getItem("pay-redirectNumber")) {
                  setTimeout(function () {
                    var weblink = "https://api.whatsapp.com/send?phone=" + localStorage.getItem("pay-redirectNumber") + "&text=" + "";
                    window.location.href = weblink;
                  }, 1500);
                }
                (0, _commons2.openPdf)(fileRes[fileStoreId], "_self");
                if (showConfirmation) {
                  if (localStorage.getItem("receipt-channel") == "whatsapp" && localStorage.getItem("receipt-redirectNumber") != "") {
                    setTimeout(function () {
                      var weblink = "https://api.whatsapp.com/send?phone=" + localStorage.getItem("receipt-redirectNumber") + "&text=" + "";
                      window.location.href = weblink;
                    }, 1500);
                  }
                  _store2.default.dispatch((0, _actions.toggleSnackbar)(true, {
                    labelName: "Success in Receipt Generation",
                    labelKey: "SUCCESS_IN_GENERATION_RECEIPT"
                  }, "success"));
                }
              } else {
                (0, _commons2.printPdf)(fileRes[fileStoreId]);
              }

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x7) {
      return _ref3.apply(this, arguments);
    };
  }());
};

/*  Download version with pdf service  */
/* export const download = (receiptQueryString, mode = "download", configKey = "consolidatedreceipt", state,showConfirmation=false) => {
  if (state && process.env.REACT_APP_NAME === "Citizen" && configKey === "consolidatedreceipt") {
    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
    configKey = get(uiCommonPayConfig, "receiptKey", "consolidatedreceipt")
  }

  const DOWNLOADRECEIPT = {
    GET: {
      URL: "/pdf-service/v1/_create",
      ACTION: "_get",
    },
  };
  let businessService = '';
  receiptQueryString && Array.isArray(receiptQueryString) && receiptQueryString.map(query => {
    if (query.key == "businessService") {
      businessService = query.value;
    }
  })
  receiptQueryString = receiptQueryString && Array.isArray(receiptQueryString) && receiptQueryString.filter(query => query.key != "businessService")
  try {
    httpRequest("post", getPaymentSearchAPI(businessService), "_search", receiptQueryString).then((payloadReceiptDetails) => {
      const queryStr = [
        { key: "key", value: configKey },
        { key: "tenantId", value: receiptQueryString[1].value.split('.')[0] }
      ]
      if (payloadReceiptDetails && payloadReceiptDetails.Payments && payloadReceiptDetails.Payments.length == 0) {
        console.log("Could not find any receipts");
        store.dispatch(toggleSnackbar(true, { labelName: "Receipt not Found", labelKey: "ERR_RECEIPT_NOT_FOUND" }
          , "error"));
        return;
      }
      // Setting the Payer and mobile from Bill to reflect it in PDF
      state = state ? state : {};
      let billDetails = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0]", null);
      if ((billDetails && !billDetails.payerName) || !billDetails) {
        billDetails = {
          payerName: get(state, "screenConfiguration.preparedFinalObject.applicationDataForReceipt.owners[0].name", null) || get(state, "screenConfiguration.preparedFinalObject.applicationDataForPdf.owners[0].name", null),
          mobileNumber: get(state, "screenConfiguration.preparedFinalObject.applicationDataForReceipt.owners[0].mobile", null) || get(state, "screenConfiguration.preparedFinalObject.applicationDataForPdf.owners[0].mobile", null),
        };
      }
      if (!payloadReceiptDetails.Payments[0].payerName && process.env.REACT_APP_NAME === "Citizen" && billDetails) {
        payloadReceiptDetails.Payments[0].payerName = billDetails.payerName;
        // payloadReceiptDetails.Payments[0].paidBy = billDetails.payer;
        payloadReceiptDetails.Payments[0].mobileNumber = billDetails.mobileNumber;
      }

      const oldFileStoreId = get(payloadReceiptDetails.Payments[0], "fileStoreId")
      if (oldFileStoreId) {
        downloadReceiptFromFilestoreID(oldFileStoreId, mode,undefined,showConfirmation)
      }
      else {
        httpRequest("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Payments: payloadReceiptDetails.Payments }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' })
          .then(res => {
            res.filestoreIds[0]
            if (res && res.filestoreIds && res.filestoreIds.length > 0) {
              res.filestoreIds.map(fileStoreId => {
                downloadReceiptFromFilestoreID(fileStoreId, mode,undefined,showConfirmation)
              })
            } else {
              console.log('Some Error Occured while downloading Receipt!');
              store.dispatch(toggleSnackbar(true, { labelName: "Error in Receipt Generation", labelKey: "ERR_IN_GENERATION_RECEIPT" }
                , "error"));
            }
          });
      }
    })
  } catch (exception) {
    console.log('Some Error Occured while downloading Receipt!');
    store.dispatch(toggleSnackbar(true, { labelName: "Error in Receipt Generation", labelKey: "ERR_IN_GENERATION_RECEIPT" }
      , "error"));
  }
} */

/*  Download version with egov-pdf service  */
var download = exports.download = function download(receiptQueryString) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "download";
  var configKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "consolidatedreceipt";
  var pdfModule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "PAYMENT";
  var state = arguments[4];
  var showConfirmation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  if (state && process.env.REACT_APP_NAME === "Citizen" && configKey === "consolidatedreceipt") {
    var uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
    configKey = (0, _get2.default)(uiCommonPayConfig, "receiptKey", "consolidatedreceipt");
  }
  var onSuccess = function onSuccess() {
    console.info("Success in Receipt Generation");
  };

  try {
    var businessService = "";
    receiptQueryString && Array.isArray(receiptQueryString) && receiptQueryString.map(function (query) {
      if (query.key == "businessService") {
        businessService = query.value;
      }
    });
    receiptQueryString = receiptQueryString && Array.isArray(receiptQueryString) && receiptQueryString.filter(function (query) {
      return query.key != "businessService";
    });
    (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)(businessService), "_search", receiptQueryString).then(function (payloadReceiptDetails) {
      if (showConfirmation) {
        onSuccess = function onSuccess() {
          console.info("Success in Receipt Generation");
          if (localStorage.getItem("receipt-channel") == "whatsapp" && localStorage.getItem("receipt-redirectNumber") != "") {
            setTimeout(function () {
              var weblink = "https://api.whatsapp.com/send?phone=" + localStorage.getItem("receipt-redirectNumber") + "&text=" + "";
              window.location.href = weblink;
            }, 1500);
          }
          _store2.default.dispatch((0, _actions.toggleSnackbar)(true, {
            labelName: "Success in Receipt Generation",
            labelKey: "SUCCESS_IN_GENERATION_RECEIPT"
          }, "success"));
        };
      }

      if (payloadReceiptDetails && payloadReceiptDetails.Payments && payloadReceiptDetails.Payments.length == 0) {
        console.log("Could not find any receipts");
        _store2.default.dispatch((0, _actions.toggleSnackbar)(true, {
          labelName: "Receipt not Found",
          labelKey: "ERR_RECEIPT_NOT_FOUND"
        }, "error"));
        return;
      }
      var queryStr = [{
        key: "consumerCode",
        value: (0, _get2.default)(payloadReceiptDetails, "Payments[0].paymentDetails[0].bill.consumerCode")
      }, {
        key: "bussinessService",
        value: (0, _get2.default)(payloadReceiptDetails, "Payments[0].paymentDetails[0].businessService")
      }, {
        key: "tenantId",
        value: (0, _get2.default)(payloadReceiptDetails, "Payments[0].paymentDetails[0].tenantId")
      }];
      mode == "download" ? downloadConReceipt(queryStr, configKey, pdfModule, "RECEIPT-" + (0, _get2.default)(payloadReceiptDetails, "Payments[0].paymentDetails[0].receiptNumber") + ".pdf", onSuccess) : mode == "open" ? downloadConReceipt(queryStr, configKey, pdfModule, "RECEIPT-" + (0, _get2.default)(payloadReceiptDetails, "Payments[0].paymentDetails[0].receiptNumber") + ".pdf", onSuccess) : printConReceipt(queryStr, configKey, pdfModule);
    });
  } catch (exception) {
    console.log("Some Error Occured while downloading Receipt!");
    _store2.default.dispatch((0, _actions.toggleSnackbar)(true, {
      labelName: "Error in Receipt Generation",
      labelKey: "ERR_IN_GENERATION_RECEIPT"
    }, "error"));
  }
};

var downloadBill = exports.downloadBill = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(consumerCode, tenantId) {
    var configKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "consolidatedbill";
    var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "egov-searcher/bill-genie/billswithaddranduser/_get";
    var searchCriteria, FETCHBILL, DOWNLOADRECEIPT, billResponse, oldFileStoreId, queryStr, pfResponse;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            searchCriteria = {
              consumerCode: consumerCode,
              tenantId: tenantId
            };
            FETCHBILL = {
              GET: {
                URL: url,
                ACTION: "_get"
              }
            };
            DOWNLOADRECEIPT = {
              GET: {
                URL: "/pdf-service/v1/_create",
                ACTION: "_get"
              }
            };
            _context4.prev = 3;
            _context4.next = 6;
            return (0, _api.httpRequest)("post", FETCHBILL.GET.URL, FETCHBILL.GET.ACTION, [], { searchCriteria: searchCriteria });

          case 6:
            billResponse = _context4.sent;
            oldFileStoreId = (0, _get2.default)(billResponse.Bills[0], "fileStoreId");

            if (!oldFileStoreId) {
              _context4.next = 12;
              break;
            }

            downloadReceiptFromFilestoreID(oldFileStoreId, "download");
            _context4.next = 17;
            break;

          case 12:
            queryStr = [{ key: "key", value: configKey }, { key: "tenantId", value: _common2.default.tenantId }];
            _context4.next = 15;
            return (0, _api.httpRequest)("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Bill: billResponse.Bills }, { Accept: "application/pdf" }, { responseType: "arraybuffer" });

          case 15:
            pfResponse = _context4.sent;

            downloadReceiptFromFilestoreID(pfResponse.filestoreIds[0], "download");

          case 17:
            _context4.next = 22;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](3);

            console.log(_context4.t0);

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[3, 19]]);
  }));

  return function downloadBill(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

var downloadMultipleBill = exports.downloadMultipleBill = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var bills = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var configKey = arguments[1];
    var DOWNLOADRECEIPT, queryStr, pfResponse;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            DOWNLOADRECEIPT = {
              GET: {
                URL: "/pdf-service/v1/_create",
                ACTION: "_get"
              }
            };
            queryStr = [{ key: "key", value: configKey }, { key: "tenantId", value: _common2.default.tenantId }];
            _context5.next = 5;
            return (0, _api.httpRequest)("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Bill: bills }, { Accept: "application/pdf" }, { responseType: "arraybuffer" });

          case 5:
            pfResponse = _context5.sent;

            downloadMultipleFileFromFilestoreIds(pfResponse.filestoreIds, "download", _common2.default.tenantId);
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);

            console.log(_context5.t0);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 9]]);
  }));

  return function downloadMultipleBill() {
    return _ref5.apply(this, arguments);
  };
}();

var downloadMultipleFileFromFilestoreIds = exports.downloadMultipleFileFromFilestoreIds = function downloadMultipleFileFromFilestoreIds() {
  var fileStoreIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var mode = arguments[1];
  var tenantId = arguments[2];

  (0, _commons.getFileUrlFromAPI)(fileStoreIds.join(","), tenantId).then(function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(fileRes) {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              fileStoreIds.map(function (fileStoreId) {
                if (mode === "download") {
                  (0, _commons2.downloadPdf)(fileRes[fileStoreId]);
                } else if (mode === "open") {
                  (0, _commons2.openPdf)(fileRes[fileStoreId], "_self");
                } else {
                  (0, _commons2.printPdf)(fileRes[fileStoreId]);
                }
              });

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function (_x18) {
      return _ref6.apply(this, arguments);
    };
  }());
};

var downloadChallan = exports.downloadChallan = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(queryStr) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "download";
    var DOWNLOADRECEIPT;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            DOWNLOADRECEIPT = {
              GET: {
                URL: "/egov-pdf/download/UC/mcollect-challan",
                ACTION: "_get"
              }
            };

            try {
              (0, _api.httpRequest)("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, {
                Accept: _common2.default.singleInstance ? "application/pdf,application/json" : "application/json"
              }, { responseType: "arraybuffer" }).then(function (res) {
                res.filestoreIds[0];
                if (res && res.filestoreIds && res.filestoreIds.length > 0) {
                  res.filestoreIds.map(function (fileStoreId) {
                    downloadReceiptFromFilestoreID(fileStoreId, mode);
                  });
                } else {
                  console.log("Error In Acknowledgement form Download");
                }
              });
            } catch (exception) {
              alert("Some Error Occured while downloading Acknowledgement form!");
            }

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function downloadChallan(_x19) {
    return _ref7.apply(this, arguments);
  };
}();

var downloadConReceipt = exports.downloadConReceipt = function downloadConReceipt(queryObj) {
  var receiptKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "consolidatedreceipt";
  var pdfModule = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "PAYMENT";
  var fileName = arguments[3];
  var onSuccess = arguments[4];

  queryObj && queryObj.push({ key: "pdfKey", value: receiptKey });
  pdfModule = "PAYMENT"; // Temporary fix to download receipts from common pays
  receiptKey = pdfModule == "PAYMENT" ? "consolidatedreceipt" : receiptKey;
  (0, _generatePDF.searchAndDownloadPdf)("/egov-pdf/download/" + pdfModule + "/" + receiptKey, queryObj, fileName, onSuccess);
};

var printConReceipt = exports.printConReceipt = function printConReceipt(queryObj) {
  var receiptKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "consolidatedreceipt";
  var pdfModule = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "PAYMENT";

  queryObj && queryObj.push({ key: "pdfKey", value: receiptKey });
  pdfModule = "PAYMENT";
  receiptKey = pdfModule == "PAYMENT" ? "consolidatedreceipt" : receiptKey;
  (0, _generatePDF.searchAndPrintPdf)("/egov-pdf/download/" + pdfModule + "/" + receiptKey, queryObj);
};