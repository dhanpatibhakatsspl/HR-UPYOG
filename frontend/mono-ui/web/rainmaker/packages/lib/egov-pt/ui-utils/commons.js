"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printMutationCertificate = exports.downloadMutationCertificate = exports.getDomainLink = exports.getSearchBillResult = exports.getBoundaryData = exports.generatePdfFromDiv = exports.setApplicationNumberBox = exports.furnishNocResponse = exports.prepareDocumentsUploadRedux = exports.prepareDocumentsUploadData = exports.createUpdatePTApplication = exports.getSearchResults = exports.findItemInArrayOfObject = exports.getLocaleLabelsforTL = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

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
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject, requestBody) {
    var searchURL = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "/property-services/property/_search";
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            _store2.default.dispatch((0, _actions.toggleSpinner)());
            _context.next = 4;
            return (0, _api.httpRequest)("post", searchURL, "", queryObject, requestBody);

          case 4:
            response = _context.sent;

            response && response.Properties && response.Properties.map(function (property) {

              var newOwnerList = [];
              var oldOwnerList = [];
              property.owners.map(function (owner) {
                if (owner.status == 'ACTIVE') {
                  newOwnerList.push(owner);
                } else {
                  oldOwnerList.push(owner);
                }
              });
              if (property.status == "INWORKFLOW") {
                oldOwnerList.push.apply(oldOwnerList, newOwnerList);
                property.owners = oldOwnerList;
              } else {
                newOwnerList.push.apply(newOwnerList, oldOwnerList);
                property.owners = newOwnerList;
              }
            });
            _store2.default.dispatch((0, _actions.toggleSpinner)());
            return _context.abrupt("return", response);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSpinner)());
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message, labelKey: _context.t0.message }, "error"));
            throw _context.t0;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function getSearchResults(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createUpdatePTApplication = exports.createUpdatePTApplication = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, status) {
    var nocId, method, payload, tenantId, reduxDocuments, buildings, ownerDocuments, otherDocuments, owners, response, fireNocData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            nocId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Properties[0].id");
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

  return function createUpdatePTApplication(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var prepareDocumentsUploadData = exports.prepareDocumentsUploadData = function prepareDocumentsUploadData(state, dispatch) {
  var documents = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.PropertyTax.MutationDocuments", []);
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

    var card = {};
    card["name"] = doc.code;
    card["code"] = doc.code;
    card["required"] = doc.required ? true : false;
    if (doc.additionalDetails && doc.additionalDetails.filterCondition) {
      card["filterCondition"] = doc.additionalDetails.filterCondition;
    }
    if (doc.additionalDetails && doc.additionalDetails.dropdownFilter) {
      card["dropdownFilter"] = doc.additionalDetails.dropdownFilter;
    }

    // if(doc.code=='OWNER_REGISTRATIONPROOF'){
    //   card["filterCondition"]={"filterValue":["NONE"],"jsonPath":"Property.ownersTemp","onArray":true,"arrayAttribute":"ownerType"};
    // }
    if (doc.hasDropdown && doc.dropdownData) {
      var dropdown = {};
      dropdown.label = "PT_MUTATION_SELECT_DOC_LABEL";
      dropdown.required = true;
      dropdown.menu = doc.dropdownData.filter(function (item) {
        return item.active;
      });
      dropdown.menu = dropdown.menu.map(function (item) {
        var menuItem = { code: item.code, label: (0, _commons.getTransformedLocale)(item.code) };
        if (item.parentValue) {
          menuItem['parentValue'] = item.parentValue;
        }
        return (0, _extends3.default)({}, menuItem);
      });
      card["dropdown"] = dropdown;
    }
    tempDoc[doc.documentType].cards.push(card);
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
var generatePdfFromDiv = exports.generatePdfFromDiv = function generatePdfFromDiv(action, applicationNumber, divID) {
  var divName = divID ? divID : "#material-ui-cardContent";
  var target = document.querySelector(divName);
  (0, _html2canvas2.default)(target, {
    // imageTimeout: 1500000000,
    onclone: function onclone(clonedDoc) {
      if (clonedDoc.getElementById("pdf-header")) {
        clonedDoc.getElementById("pdf-header").style.display = "block";
      }

      // if(clonedDoc.getElementById("property-assess-form")){
      //   clonedDoc.getElementById("property-assess-form").style.display = "none";
      // }
      // if(clonedDoc.getElementById("pt-header-button-container")){
      //   clonedDoc.getElementById("pt-header-button-container").style.display = "none";
      // }
      // if(clonedDoc.getElementById("pt-flex-child-button")){
      //   clonedDoc.getElementById("pt-flex-child-button").style.display = "none";
      // }
    }
  }).then(function (canvas) {
    var data = canvas.toDataURL("image/jpeg", 1);
    var imgWidth = 200;
    var pageHeight = 290;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    var doc = new _jspdf2.default("p", "mm");
    var position = 0;

    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(data, 'PNG', 5, 10 + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    if (action === "download") {
      doc.save("preview-" + applicationNumber + ".pdf");
    } else if (action === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }
  });
};

var getBoundaryData = exports.getBoundaryData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch, queryObject, code, componentPath) {
    var payload, tenantId, mohallaData, data, messageObject;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", queryObject, {});

          case 3:
            payload = _context3.sent;
            tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.address.city") : (0, _commons.getQueryArg)(window.location.href, "tenantId");
            mohallaData = payload && payload.TenantBoundary[0] && payload.TenantBoundary[0].boundary && payload.TenantBoundary[0].boundary.reduce(function (result, item) {
              result.push((0, _extends3.default)({}, item, {
                name: tenantId.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
              }));
              return result;
            }, []);


            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities",
            // payload.TenantBoundary && payload.TenantBoundary[0].boundary,
            mohallaData));

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("register-property", "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.localityOrMohalla", "props.suggestions", mohallaData));
            if (code) {
              data = payload.TenantBoundary[0].boundary;
              messageObject = data && data.find(function (item) {
                return item.code == code;
              });

              if (messageObject) dispatch((0, _actions.prepareFinalObject)("Property.address.locality.name", messageObject.name));
            }
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);

            console.log(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 11]]);
  }));

  return function getBoundaryData(_x7, _x8, _x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

var getSearchBillResult = exports.getSearchBillResult = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "", queryObject);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context4.t0.message, labelKey: _context4.t0.message }, "error"));
            console.log(_context4.t0, "fetxh");

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getSearchBillResult(_x13, _x14) {
    return _ref4.apply(this, arguments);
  };
}();

var getDomainLink = exports.getDomainLink = function getDomainLink() {
  var link = "";
  if (process.env.NODE_ENV !== "development") {
    link += "/" + process.env.REACT_APP_NAME.toLowerCase();
  }
  return link;
};

var downloadMutationCertificate = exports.downloadMutationCertificate = function downloadMutationCertificate(queryObj, fileName) {
  searchAndDownloadPdf("/egov-pdf/download/PT/ptmutationcertificate", queryObj, fileName);
};

var printMutationCertificate = exports.printMutationCertificate = function printMutationCertificate(queryObj) {
  searchAndPrintPdf("/egov-pdf/download/PT/ptmutationcertificate", queryObj);
};