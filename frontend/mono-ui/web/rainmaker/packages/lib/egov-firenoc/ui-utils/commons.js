"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setApplicationNumberBox = exports.furnishNocResponse = exports.prepareDocumentsUploadRedux = exports.prepareDocumentsUploadData = exports.createUpdateNocApplication = exports.setDocsForEditFlow = exports.getSearchResults = exports.findItemInArrayOfObject = exports.getLocaleLabelsforTL = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

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
            _store2.default.dispatch((0, _actions.toggleSpinner)());
            throw _context.t0;

          case 14:
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
var setDocsForEditFlow = exports.setDocsForEditFlow = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var applicationDocuments, mdmsDocs, orderedApplicationDocuments, uploadedDocuments, fileStoreIds, fileUrlPayload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            applicationDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.additionalDetail.documents", []);
            /* To change the order of application documents similar order of mdms order*/

            mdmsDocs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.FireNoc.Documents", []);
            orderedApplicationDocuments = mdmsDocs.map(function (mdmsDoc) {
              var applicationDocument = {};
              applicationDocuments && applicationDocuments.map(function (appDoc) {
                if (appDoc.documentType == mdmsDoc.code) {
                  applicationDocument = (0, _extends3.default)({}, appDoc);
                }
              });
              return applicationDocument;
            }).filter(function (docObj) {
              return Object.keys(docObj).length > 0;
            });

            applicationDocuments = [].concat((0, _toConsumableArray3.default)(orderedApplicationDocuments));
            dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.additionalDetail.documents", applicationDocuments));

            uploadedDocuments = {};
            fileStoreIds = applicationDocuments && applicationDocuments.map(function (item) {
              return item.fileStoreId;
            }).join(",");
            _context2.t0 = fileStoreIds;

            if (!_context2.t0) {
              _context2.next = 12;
              break;
            }

            _context2.next = 11;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 11:
            _context2.t0 = _context2.sent;

          case 12:
            fileUrlPayload = _context2.t0;

            applicationDocuments && applicationDocuments.forEach(function (item, index) {
              uploadedDocuments[index] = {
                fileName: fileUrlPayload && fileUrlPayload[item.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrlPayload[item.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1),
                fileStoreId: item.fileStoreId,
                fileUrl: Object.values(fileUrlPayload)[index],
                documentType: item.documentType,
                tenantId: item.tenantId,
                id: item.id
              };
            });

            dispatch((0, _actions.prepareFinalObject)("documentsUploadRedux", uploadedDocuments));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function setDocsForEditFlow(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var createUpdateNocApplication = exports.createUpdateNocApplication = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, status) {
    var nocId, method, payload, tenantId, reduxDocuments, isDocumentValid, buildings, ownerDocuments, otherDocuments, owners, response, fireNocData;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            nocId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].id");
            method = nocId ? "UPDATE" : "CREATE";

            if ((0, _commons.getQueryArg)(window.location.href, "action") == 'edit') {
              method = 'edit';
            }
            _context3.prev = 3;
            payload = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs", []);
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.city", (0, _localStorageUtils.getTenantId)());

            (0, _set2.default)(payload[0], "tenantId", tenantId);
            (0, _set2.default)(payload[0], "fireNOCDetails.action", status);

            // Get uploaded documents from redux
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});
            isDocumentValid = true;
            // Object.keys(reduxDocuments).map((key) => {
            //   // if (reduxDocuments[key].documentType === "OWNER" && reduxDocuments[key].documents && reduxDocuments[key].documents.length > 0 && !(reduxDocuments[key].dropdown && reduxDocuments[key].dropdown.value)) {
            //     if (reduxDocuments[key].documentType === "OWNER" && reduxDocuments[key].documents && reduxDocuments[key].documents.length > 0 && !(reduxDocuments[key].dropdown && reduxDocuments[key].dropdown.value)) {
            //     isDocumentValid = false;
            //   }
            // });

            if (isDocumentValid) {
              _context3.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please select document type for uploaded document", labelKey: "ERR_DOCUMENT_TYPE_MISSING" }, "error"));
            return _context3.abrupt("return");

          case 13:

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
                (value || value == 0) && finalUoms.push({
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
            (0, _commons.disableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
            // disableField('summary',"components.div.children.footer.children.submitButton",dispatch);

            // Set Channel and Financial Year
            process.env.REACT_APP_NAME === "Citizen" ? (0, _set2.default)(payload[0], "fireNOCDetails.channel", "CITIZEN") : (0, _set2.default)(payload[0], "fireNOCDetails.channel", "COUNTER");
            (0, _set2.default)(payload[0], "fireNOCDetails.financialYear", (0, _utils2.getCurrentFinancialYearForFireNoc)());

            // Set Dates to Epoch
            owners = (0, _get2.default)(payload[0], "fireNOCDetails.applicantDetails.owners", []);

            owners.forEach(function (owner, index) {
              (0, _set2.default)(payload[0], "fireNOCDetails.applicantDetails.owners[" + index + "].dob", (0, _utils.convertDateToEpoch)((0, _get2.default)(owner, "dob")));
            });
            if (payload[0] && payload[0].provisionFireNOCNumber == "") {
              delete payload[0].provisionFireNOCNumber;
            }

            response = void 0;

            if (!(method === "CREATE")) {
              _context3.next = 39;
              break;
            }

            _context3.next = 32;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_create", "", [], { FireNOCs: [payload[0]] });

          case 32:
            response = _context3.sent;

            response = furnishNocResponse(response);
            (0, _commons.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
            // enableField('summary',"components.div.children.footer.children.submitButton",dispatch);
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", response.FireNOCs));
            setApplicationNumberBox(state, dispatch);
            _context3.next = 50;
            break;

          case 39:
            if (!(method === "UPDATE")) {
              _context3.next = 49;
              break;
            }

            _context3.next = 42;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_update", "", [], { FireNOCs: payload });

          case 42:
            response = _context3.sent;

            response = furnishNocResponse(response);
            (0, _commons.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
            // enableField('summary',"components.div.children.footer.children.submitButton",dispatch);
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", response.FireNOCs));
            dispatch((0, _actions.prepareFinalObject)("DYNAMIC_MDMS_Trigger", false));
            _context3.next = 50;
            break;

          case 49:
            if (method === 'edit') {

              (0, _commons.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
              // enableField('summary',"components.div.children.footer.children.submitButton",dispatch);
              dispatch((0, _actions.prepareFinalObject)("FireNOCs", payload));
            }

          case 50:
            return _context3.abrupt("return", { status: "success", message: response });

          case 53:
            _context3.prev = 53;
            _context3.t0 = _context3["catch"](3);

            (0, _commons.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
            (0, _commons.enableField)('summary', "components.div.children.footer.children.submitButton", dispatch);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context3.t0.message }, "error"));

            // Revert the changed pfo in case of request failure
            fireNocData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs", []);

            fireNocData = furnishNocResponse({ FireNOCs: fireNocData });
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", fireNocData.FireNOCs));

            return _context3.abrupt("return", { status: "failure", message: _context3.t0 });

          case 62:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 53]]);
  }));

  return function createUpdateNocApplication(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
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
      if (uom.active) uomMap[uom.code] = "" + uom.value;
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