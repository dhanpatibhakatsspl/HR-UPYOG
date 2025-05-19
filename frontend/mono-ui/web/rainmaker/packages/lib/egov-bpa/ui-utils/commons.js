"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStakeHolderRoles = exports.nocapplicationUpdate = exports.getNocSearchResults = exports.submitOCBpaApplication = exports.createUpdateOCBpaApplication = exports.updateOcBpaApplication = exports.updateBpaApplication = exports.submitBpaApplication = exports.handleFileUpload = exports.acceptedFiles = exports.findItemInArrayOfObject = exports.setApplicationNumberBox = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.applyTradeLicense = exports.setApplicationNumberBoxBPAREG = exports.updatePFOforSearchResults = exports.prepareOwnershipType = exports.prepareNOCUploadData = exports.prepareDocumentsUploadData = exports.createUpdateBpaApplication = exports.getAppSearchResults = exports.getLocaleLabelsforTL = exports.updateTradeDetails = exports.getBpaSearchResults = exports.getSearchResults = exports.convertEchToDate = exports.download = exports.downloadReceiptFromFilestoreID = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

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

var _api = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadReceiptFromFilestoreID = exports.downloadReceiptFromFilestoreID = function downloadReceiptFromFilestoreID(fileStoreId, mode, tenantId) {
  (0, _commons.getFileUrlFromAPI)(fileStoreId, tenantId).then(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileRes) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (mode === 'download') {
                (0, _commons2.downloadPdf)(fileRes[fileStoreId]);
              } else {
                (0, _commons2.printPdf)(fileRes[fileStoreId]);
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

var download = exports.download = function download(receiptQueryString) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "download";
  var configKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "consolidatedreceipt";
  var state = arguments[3];
  var businessService = arguments[4];

  if (state && process.env.REACT_APP_NAME === "Citizen" && configKey === "consolidatedreceipt") {
    var uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
    configKey = (0, _get2.default)(uiCommonPayConfig, "receiptKey", "consolidatedreceipt");
  }
  var FETCHRECEIPT = {
    GET: {
      URL: businessService ? "/collection-services/payments/" + businessService + "_search" : "/collection-services/payments/_search",
      ACTION: "_get"
    }
  };
  var DOWNLOADRECEIPT = {
    GET: {
      URL: "/pdf-service/v1/_create",
      ACTION: "_get"
    }
  };
  try {
    (0, _api.httpRequest)("post", FETCHRECEIPT.GET.URL, FETCHRECEIPT.GET.ACTION, receiptQueryString).then(function (payloadReceiptDetails) {
      var queryStr = [{ key: "key", value: configKey }, { key: "tenantId", value: _common2.default.tenantId }];
      if (payloadReceiptDetails && payloadReceiptDetails.Payments && payloadReceiptDetails.Payments.length == 0) {
        console.log("Could not find any receipts");
        return;
      }
      var oldFileStoreId = (0, _get2.default)(payloadReceiptDetails.Payments[0], "fileStoreId");
      if (oldFileStoreId) {
        downloadReceiptFromFilestoreID(oldFileStoreId, mode);
      } else {
        (0, _api.httpRequest)("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Payments: payloadReceiptDetails.Payments }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' }).then(function (res) {
          res.filestoreIds[0];
          if (res && res.filestoreIds && res.filestoreIds.length > 0) {
            res.filestoreIds.map(function (fileStoreId) {
              downloadReceiptFromFilestoreID(fileStoreId, mode);
            });
          } else {
            console.log("Error In Receipt Download");
          }
        });
      }
    });
  } catch (exception) {
    alert('Some Error Occured while downloading Receipt!');
  }
};

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

var convertEchToDate = exports.convertEchToDate = function convertEchToDate(dateEpoch) {
  var dateFromApi = new Date(dateEpoch);
  var month = dateFromApi.getMonth() + 1;
  var day = dateFromApi.getDate();
  var year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return year + "-" + month + "-" + day;
};

var getSearchResults = exports.getSearchResults = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/tl-services/v1/BPAREG/_search", "", queryObject);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context2.t0.message, labelCode: _context2.t0.message }, "error"));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getSearchResults(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getBpaSearchResults = exports.getBpaSearchResults = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject) {
    var isTenantId, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (queryObject && queryObject.length) {
              isTenantId = true;

              queryObject.forEach(function (obj) {
                if (obj.key === "tenantId") {
                  isTenantId = false;
                }
              });
              if (isTenantId) {
                queryObject.push({ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() });
              }
            } else {
              queryObject = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }];
            }
            _context3.next = 4;
            return (0, _api.httpRequest)("post", "/bpa-services/v1/bpa/_search?offset=0&limit=-1", "", queryObject);

          case 4:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context3.t0.message, labelCode: _context3.t0.message }, "error"));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 8]]);
  }));

  return function getBpaSearchResults(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var updateTradeDetails = exports.updateTradeDetails = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(requestBody) {
    var payload;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "/tl-services/v1/BPAREG/_update", "", [], requestBody);

          case 3:
            payload = _context4.sent;
            return _context4.abrupt("return", payload);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSnackbar)(true, _context4.t0.message, "error"));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function updateTradeDetails(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

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

var getAppSearchResults = exports.getAppSearchResults = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject, dispatch) {
    var isTenantId, response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (queryObject && queryObject.length) {
              isTenantId = true;

              queryObject.forEach(function (obj) {
                if (obj.key === "tenantId") {
                  isTenantId = false;
                }
              });
              if (isTenantId) {
                queryObject.push({ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() });
              }
            } else {
              queryObject = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }];
            }
            _context5.next = 4;
            return (0, _api.httpRequest)("post", "/bpa-services/v1/bpa/_search", "", queryObject);

          case 4:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context5.t0.message, labelKey: _context5.t0.message }, "error"));
            throw _context5.t0;

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 8]]);
  }));

  return function getAppSearchResults(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

// export const getNocSearchResults = async (queryObject, dispatch) => {
//   try {
//     if(queryObject && queryObject.length) {
//       let isTenantId = true;
//       queryObject.forEach(obj => {
//         if(obj.key === "tenantId"){
//           isTenantId = false
//         }
//       })
//       if(isTenantId) {
//         queryObject.push({key : "tenantId", value: getTenantId()})
//       }
//     } else {
//       queryObject = [{key : "tenantId", value: getTenantId()}];
//     }
//     const payload = await httpRequest(
//       "post",
//       "/noc-services/v1/noc/_search",
//       "",
//       queryObject
//     );
//     return payload;
//   } catch (error) {
//     store.dispatch(
//       toggleSnackbar(
//         true,
//         { labelName: error.message, labelKey: error.message },
//         "error"
//       )
//     );
//     throw error;
//   }
// };

var createUpdateBpaApplication = exports.createUpdateBpaApplication = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch, status) {
    var applicationId, method, documentsUpdalod, BPADocs, documnts, nocDocumentsUpload, requiredDocuments, subOccupancyData, BPADetails, blocks, payload, tenantId, userInfo, accountId, documents, wfDocuments, owners, authOwners, multiOwners, response;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            applicationId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.id");
            method = applicationId ? "UPDATE" : "CREATE";
            documentsUpdalod = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentDetailsUploadRedux", []);
            BPADocs = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.documents", []);
            documnts = [];

            if (documentsUpdalod) {
              Object.keys(documentsUpdalod).forEach(function (key) {
                documnts.push(documentsUpdalod[key]);
              });
            }

            nocDocumentsUpload = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.nocDocumentsUploadRedux");


            if (nocDocumentsUpload) {
              Object.keys(nocDocumentsUpload).forEach(function (key) {
                documnts.push(nocDocumentsUpload[key]);
              });
            }

            requiredDocuments = [];

            if (documnts && documnts.length > 0) {
              documnts.forEach(function (documents) {
                if (documents && documents.documents) {
                  documents.documents.forEach(function (docItem) {
                    if (documents.dropDownValues && documents.dropDownValues.value) {
                      var doc = {};
                      doc.documentType = documents.dropDownValues.value;
                      doc.fileStoreId = docItem.fileStoreId;
                      doc.fileStore = docItem.fileStoreId;
                      doc.fileName = docItem.fileName;
                      doc.fileUrl = docItem.fileUrl;
                      doc.additionalDetails = docItem.additionalDetails;
                      BPADocs && BPADocs.forEach(function (bpaDc) {
                        if (bpaDc.fileStoreId === docItem.fileStoreId) {
                          doc.id = bpaDc.id;
                        }
                      });
                      requiredDocuments.push(doc);
                    }
                  });
                }
              });

              documnts.forEach(function (documents) {
                if (documents && documents.previewdocuments) {
                  documents.previewdocuments.forEach(function (pDoc) {
                    var doc = {};
                    // if(documents.dropDownValues) {
                    // doc.documentType = documents.dropDownValues.value;
                    // }
                    doc.documentType = pDoc.dropDownValues;
                    doc.fileStoreId = pDoc.fileStoreId;
                    doc.fileStore = pDoc.fileStoreId;
                    doc.fileName = pDoc.fileName;
                    doc.fileUrl = pDoc.fileUrl;
                    BPADocs && BPADocs.forEach(function (bpaDc) {
                      if (bpaDc.fileStoreId === pDoc.fileStoreId) {
                        doc.id = bpaDc.id;
                      }
                    });
                    requiredDocuments.push(doc);
                  });
                }
              });
            }

            subOccupancyData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.edcr.blockDetail");
            BPADetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA");
            blocks = [];

            subOccupancyData.forEach(function (block, index) {
              var arry = [];
              block && block.occupancyType && block.occupancyType.length && block.occupancyType.forEach(function (occType) {
                arry.push(occType.value);
              });
              blocks[index] = {};
              blocks[index].blockIndex = index;
              blocks[index].usageCategory = {};
              blocks[index].usageCategory = arry.join();
              blocks[index].floorNo = block.floorNo;
              blocks[index].unitType = "Block";
              if (BPADetails.landInfo.unit && BPADetails.landInfo.unit[index] && BPADetails.landInfo.unit[index].id) {
                blocks[index].id = BPADetails.landInfo.unit[index].id;
              }
            });

            _context6.prev = 14;
            payload = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA", []);
            tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.landInfo.address.city") || (0, _commons.getQueryArg)(window.location.href, "tenantId") || (0, _localStorageUtils.getTenantId)();
            userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
            accountId = (0, _get2.default)(userInfo, "uuid");

            (0, _set2.default)(payload, "tenantId", tenantId);
            (0, _set2.default)(payload, "landInfo.tenantId", tenantId);
            (0, _set2.default)(payload, "workflow.action", status);
            (0, _set2.default)(payload, "accountId", accountId);

            // set(payload, "additionalDetails", null);
            // set(payload, "units", null);
            (0, _set2.default)(payload, "landInfo.unit", blocks);

            documents = void 0;

            if (requiredDocuments && requiredDocuments.length > 0) {
              documents = requiredDocuments;
            } else {
              documents = null;
            }

            wfDocuments = void 0;

            if (method === "UPDATE") {
              if (status === "APPLY") {
                documents = payload.documents;
              } else {
                documents = payload.documents;
                documents = requiredDocuments;
              }
              (0, _set2.default)(payload, "documents", documents);
              (0, _set2.default)(payload, "workflow.varificationDocuments", null);
            } else if (method === 'CREATE') {
              documents = null;
            }

            payload.documents = documents;

            // // Set Channel and Financial Year
            // process.env.REACT_APP_NAME === "Citizen"
            //   ? set(payload[0], "BPA.channel", "CITIZEN")
            //   : set(payload[0], "BPA.channel", "COUNTER");
            // set(payload[0], "BPA.financialYear", "2019-20");

            // Set Dates to Epoch

            owners = (0, _get2.default)(payload, "landInfo.owners", []);

            owners.forEach(function (owner, index) {
              (0, _set2.default)(payload, "landInfo.owners[" + index + "].dob", (0, _utils.convertDateToEpoch)((0, _get2.default)(owner, "dob")));
            });

            authOwners = [];
            multiOwners = (0, _get2.default)(payload, "landInfo.owners", []);

            if (multiOwners && multiOwners.length > 0) {
              multiOwners.forEach(function (owner) {
                if (owner && owner.isDeleted != false) {
                  authOwners.push(owner);
                }
              });
            }

            (0, _set2.default)(payload, "landInfo.owners", authOwners);
            response = void 0;

            if (!(method === "CREATE")) {
              _context6.next = 46;
              break;
            }

            _context6.next = 39;
            return (0, _api.httpRequest)("post", "bpa-services/v1/bpa/_create", "", [], { BPA: payload });

          case 39:
            response = _context6.sent;

            // response = prepareOwnershipType(response);
            dispatch((0, _actions2.prepareFinalObject)("BPA", response.BPA[0]));
            setApplicationNumberBox(state, dispatch);
            _context6.next = 44;
            return (0, _utils2.edcrDetailsToBpaDetails)(state, dispatch);

          case 44:
            _context6.next = 51;
            break;

          case 46:
            if (!(method === "UPDATE")) {
              _context6.next = 51;
              break;
            }

            _context6.next = 49;
            return (0, _api.httpRequest)("post", "bpa-services/v1/bpa/_update", "", [], { BPA: payload });

          case 49:
            response = _context6.sent;

            // response = prepareOwnershipType(response);
            dispatch((0, _actions2.prepareFinalObject)("BPA", response.BPA[0]));

          case 51:
            return _context6.abrupt("return", { status: "success", message: response });

          case 54:
            _context6.prev = 54;
            _context6.t0 = _context6["catch"](14);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context6.t0.message }, "error"));
            return _context6.abrupt("return", { status: "failure", message: _context6.t0 });

          case 58:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[14, 54]]);
  }));

  return function createUpdateBpaApplication(_x9, _x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

var prepareDocumentsUploadData = exports.prepareDocumentsUploadData = function prepareDocumentsUploadData(state, dispatch, isOC) {
  var applicationDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.DocTypeMapping", //[0].docTypes
  []);
  var documentsDropDownValues = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType", []);

  var bpaDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", {});

  var documents = [];
  /**
   * @TODO optimize logic further
   */
  applicationDocuments.forEach(function (doc) {
    if (doc.WFState == "INITIATED" && doc.RiskType === bpaDetails.riskType && doc.ServiceType === bpaDetails.serviceType && doc.applicationType === bpaDetails.applicationType) {
      documents.push(doc.docTypes);
    }
  });

  if (documents[0] && documents[0].length > 0) {
    var documentsList = [];
    documents[0].forEach(function (doc) {
      var code = doc.code;
      doc.dropDownValues = [];
      documentsDropDownValues.forEach(function (value) {
        var values = value.code.slice(0, code.length);
        if (code === values) {
          doc.hasDropdown = true;
          doc.dropDownValues.push(value);
        }
      });
      documentsList.push(doc);
    });
    var bpaDocuments = documentsList;
    var documentsContract = [];
    var tempDoc = {};

    bpaDocuments.forEach(function (doc) {
      var card = {};
      card["code"] = doc.code.split(".")[0];
      card["title"] = doc.code.split(".")[0];
      card["cards"] = [];
      tempDoc[doc.code.split(".")[0]] = card;
    });
    bpaDocuments.forEach(function (doc) {
      var card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      if (bpaDetails && bpaDetails.documents && bpaDetails.documents.length > 0) {
        card["required"] = false;
      } else {
        card["required"] = doc.required ? true : false;
      };
      if (doc.hasDropdown && doc.dropDownValues) {
        var dropDownValues = {};
        dropDownValues.label = "BPA_SELECT_DOCS_LABEL";
        dropDownValues.required = doc.required ? true : false;
        dropDownValues.menu = doc.dropDownValues.filter(function (item) {
          return item.active;
        });
        dropDownValues.menu = dropDownValues.menu.map(function (item) {
          return { code: item.code, label: item.code };
        });
        card["dropDownValues"] = dropDownValues;
      }
      tempDoc[doc.code.split(".")[0]].cards.push(card);
    });

    Object.keys(tempDoc).forEach(function (key) {
      documentsContract.push(tempDoc[key]);
    });

    dispatch((0, _actions2.prepareFinalObject)("documentsContract", documentsContract));
  }
};

var prepareNOCUploadData = exports.prepareNOCUploadData = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(state, dispatch) {
    var documents, documentsList, nocDocuments, documentsContract, tempDoc, Noc, finalCards;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getNocDocuments(state);

          case 2:
            documents = _context7.sent;
            _context7.next = 5;
            return mapDropdownValues(documents, state);

          case 5:
            documentsList = _context7.sent;


            // nocData.forEach(nocDoc => {
            //   applicationDocuments && applicationDocuments.length > 0 && 
            //   applicationDocuments.forEach(doc =>{
            //     if(doc.applicationType === nocDoc.applicationType && doc.nocType === nocDoc.nocType) {
            //       doc.docTypes[0].nocType = doc.nocType;
            //       documents.push(doc.docTypes[0]);    
            //     }
            //   });
            // });
            nocDocuments = documentsList;
            documentsContract = [];
            tempDoc = {};

            if (nocDocuments && nocDocuments.length > 0) {
              nocDocuments.forEach(function (doc) {
                var card = {};
                // card["code"] = doc.documentType;
                // card["title"] = doc.documentType;
                card["code"] = doc.documentType.split(".")[0];
                card["title"] = doc.documentType.split(".")[0];
                card["cards"] = [];
                tempDoc[doc.documentType.split(".")[0]] = card;
              });
              nocDocuments.forEach(function (doc) {
                var card = {};
                card["name"] = doc.documentType;
                card["code"] = doc.documentType;
                card["nocType"] = doc.nocType;
                card["additionalDetails"] = doc.additionalDetails;
                card["required"] = doc.required ? true : false;
                if (doc.hasDropdown && doc.dropDownValues) {
                  var dropDownValues = {};
                  dropDownValues.label = "BPA_SELECT_DOCS_LABEL";
                  dropDownValues.required = doc.required;
                  dropDownValues.menu = doc.dropDownValues.filter(function (item) {
                    return item.active;
                  });
                  dropDownValues.menu = dropDownValues.menu.map(function (item) {
                    return { code: item.code, label: item.code };
                  });
                  card["dropDownValues"] = dropDownValues;
                }
                tempDoc[doc.documentType.split(".")[0]].cards.push(card);
              });
            }

            if (tempDoc) {
              Object.keys(tempDoc).forEach(function (key) {
                documentsContract.push(tempDoc[key]);
              });
            }
            dispatch((0, _actions2.prepareFinalObject)("nocBPADocumentsContract", documentsContract));
            Noc = fetchFileDetails((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Noc", []));
            finalCards = [];

            documentsContract.length > 0 && documentsContract[0].cards && documentsContract[0].cards.map(function (docs) {
              Noc && Noc.map(function (upDocs) {
                if (docs.nocType === upDocs.nocType) {
                  docs.documents = upDocs.documents;
                  var card = {
                    code: docs.code,
                    name: docs.code,
                    nocType: docs.nocType,
                    dropDownValues: docs.dropDownValues,
                    documentCode: docs.code,
                    documents: upDocs.documents,
                    additionalDetails: docs.additionalDetails,
                    readOnly: false
                  };
                  finalCards.push(card);
                }
              });
            });
            dispatch((0, _actions2.prepareFinalObject)("nocFinalCardsforPreview", finalCards));
            dispatch((0, _actions2.prepareFinalObject)("nocBPADocumentsContract", documentsContract));

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function prepareNOCUploadData(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * This method will be called to get teh noc documents matched with noctyps and applicationType
 */
var getNocDocuments = function getNocDocuments(state) {
  var applicationDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.NOC.DocumentTypeMapping", []);

  var Noc = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc", []);
  var documents = [];
  Noc.forEach(function (nocDoc) {

    applicationDocuments && applicationDocuments.length > 0 && applicationDocuments.forEach(function (doc) {
      if (doc.applicationType === nocDoc.applicationType && doc.nocType === nocDoc.nocType) {
        var linkDetails = {};
        var checkingApp = (0, _localStorageUtils.getTenantId)().split('.')[1] ? "employee" : "citizen";
        var url = window.location.origin + "/noc/search-preview?applicationNumber=" + nocDoc.applicationNo + "&tenantId=" + nocDoc.tenantId + "&isFromBPA=true";
        if (process.env.NODE_ENV === "production") {
          if (checkingApp) {
            url = window.location.origin + "/" + checkingApp + "/noc/search-preview?applicationNumber=" + nocDoc.applicationNo + "&tenantId=" + nocDoc.tenantId + "&isFromBPA=true";
          }
        }
        if (nocDoc.applicationStatus === "CREATED" || nocDoc.applicationStatus === null) {
          url = "";
        }
        linkDetails.labelName = "BPA_SEARCH_APPLICATION_NO_LABEL";
        linkDetails.value = url;
        linkDetails.valueName = nocDoc.applicationNo;
        doc.docTypes[0].nocType = doc.nocType;
        doc.docTypes[0].additionalDetails = {
          submissionDetails: nocDoc.additionalDetails,
          applicationStatus: nocDoc.applicationStatus,
          linkDetails: linkDetails,
          appNumberLink: nocDoc.applicationNo,
          nocNo: nocDoc.nocNo,
          approvedRejectedOn: (0, _get2.default)(nocDoc, "auditDetails.lastModifiedTime", "")
        };
        documents.push(doc.docTypes[0]);
      }
    });
  });
  return documents;
};

/**
 * This method will be called to map mdms dropdown values
 * @param {*} documents 
 */
var mapDropdownValues = function mapDropdownValues(documents, state) {
  var documentsDropDownValues = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType", []);
  var documentsList = [];
  if (documents && documents.length > 0) {
    documents.map(function (doc) {
      var code = doc.documentType;
      var nocType = doc.nocType;
      doc.dropDownValues = [];
      documentsDropDownValues.forEach(function (value) {
        var values = value.code.slice(0, code.length);
        if (code === values) {
          doc.hasDropdown = true;
          doc.dropDownValues.push(value);
        }
      });
      documentsList.push(doc);
    });
  }
  return documentsList;
};

/**
 * This method will be called to update filestore
 * @param {*} fileData 
 */
var fetchFileDetails = function fetchFileDetails(fileData) {
  fileData && fileData.length > 0 && fileData.forEach(function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(items) {
      var fileStoreIds, fileUrls;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(items.documents && items.documents.length > 0)) {
                _context8.next = 11;
                break;
              }

              fileStoreIds = _jsonpath2.default.query(items.documents, "$.*.fileStoreId");

              if (!(fileStoreIds.length > 0)) {
                _context8.next = 8;
                break;
              }

              _context8.next = 5;
              return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

            case 5:
              _context8.t0 = _context8.sent;
              _context8.next = 9;
              break;

            case 8:
              _context8.t0 = {};

            case 9:
              fileUrls = _context8.t0;

              items.documents.map(function (docs, index) {
                docs["fileName"] = fileUrls[docs.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrls[docs.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
              });

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function (_x14) {
      return _ref8.apply(this, arguments);
    };
  }());
  return fileData;
};

var prepareOwnershipType = exports.prepareOwnershipType = function prepareOwnershipType(response) {
  console.log(response);
  // Handle applicant ownership dependent dropdowns
  var ownershipCategory = (0, _get2.default)(response, "BPA.landInfo.ownerShipType");
  (0, _set2.default)(response, "BPA.landInfo.ownershipCategory", ownershipCategory == undefined ? "SINGLE" : ownershipType.split(".")[0]);
  return response;
};

var setDocsForEditFlow = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(state, dispatch) {
    var applicationDocuments, uploadedDocuments, fileStoreIds, fileUrlPayload;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            applicationDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);
            uploadedDocuments = {};
            fileStoreIds = applicationDocuments && applicationDocuments.length > 0 && applicationDocuments.map(function (item) {
              return item.fileStoreId;
            }).join(",");
            _context9.t0 = fileStoreIds && fileStoreIds.length > 0;

            if (!_context9.t0) {
              _context9.next = 8;
              break;
            }

            _context9.next = 7;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 7:
            _context9.t0 = _context9.sent;

          case 8:
            fileUrlPayload = _context9.t0;

            if (fileUrlPayload && fileUrlPayload.fileStoreIds) delete fileUrlPayload.fileStoreIds;
            applicationDocuments && applicationDocuments.forEach(function (item, index) {
              uploadedDocuments[index] = [{
                fileName: fileUrlPayload && fileUrlPayload[item.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrlPayload[item.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1),
                fileStoreId: item.fileStoreId,
                fileUrl: Object.values(fileUrlPayload)[index],
                documentType: item.documentType,
                tenantId: item.tenantId,
                id: item.id
              }];
            });
            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].uploadedDocsInRedux", uploadedDocuments));
            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].isDocsEdit", true));

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function setDocsForEditFlow(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

var updatePFOforSearchResults = exports.updatePFOforSearchResults = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(action, state, dispatch, queryValue, queryValuePurpose, tenantId) {
    var queryObject, isPreviouslyEdited, payload, stakeHolderDetails, owners, dob, licenseType, subOwnerShipCategory;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            queryObject = [{
              key: "tenantId",
              value: tenantId ? tenantId : (0, _localStorageUtils.getTenantId)()
            }, { key: "applicationNumber", value: queryValue }];
            isPreviouslyEdited = (0, _commons.getQueryArg)(window.location.href, "edited");

            if (isPreviouslyEdited) {
              _context10.next = 8;
              break;
            }

            _context10.next = 5;
            return getSearchResults(queryObject);

          case 5:
            _context10.t0 = _context10.sent;
            _context10.next = 9;
            break;

          case 8:
            _context10.t0 = {
              Licenses: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses")
            };

          case 9:
            payload = _context10.t0;
            _context10.t1 = (0, _commons.getQueryArg)(window.location.href, "action") === "edit";

            if (!_context10.t1) {
              _context10.next = 14;
              break;
            }

            _context10.next = 14;
            return setDocsForEditFlow(state, dispatch);

          case 14:
            if (payload) {
              stakeHolderDetails = payload.Licenses[0];

              if (stakeHolderDetails && stakeHolderDetails.tradeLicenseDetail) {
                owners = stakeHolderDetails.tradeLicenseDetail.owners;
                dob = convertEchToDate(owners[0].dob);

                stakeHolderDetails.tradeLicenseDetail.owners[0].dob = dob;
              }
              dispatch((0, _actions2.prepareFinalObject)("Licenses[0]", stakeHolderDetails));
            }
            licenseType = payload && (0, _get2.default)(payload, "Licenses[0].licenseType");

            (0, _utils2.updateDropDowns)(payload, action, state, dispatch, queryValue);
            subOwnerShipCategory = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory");


            (0, _utils2.setOrganizationVisibility)(action, state, dispatch, subOwnerShipCategory);

            if (queryValuePurpose !== "cancel") {
              (0, _set2.default)(payload, (0, _utils2.getSafetyNormsJson)(queryValuePurpose), "yes");
              (0, _set2.default)(payload, (0, _utils2.getHygeneLevelJson)(queryValuePurpose), "yes");
              (0, _set2.default)(payload, (0, _utils2.getLocalityHarmedJson)(queryValuePurpose), "No");
            }
            (0, _set2.default)(payload, (0, _utils2.getCheckBoxJsonpath)(queryValuePurpose), true);

            setApplicationNumberBoxBPAREG(state, dispatch);

            createOwnersBackup(dispatch, payload);

          case 23:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function updatePFOforSearchResults(_x17, _x18, _x19, _x20, _x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();

var updateownersAddress = function updateownersAddress(dispatch, payload) {
  var owners = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.owners");
  var permanantAddrLine1 = (0, _get2.default)(owners[0], "address.addressLine1");
  var permanantAddr = (0, _get2.default)(owners[0], "permanentAddress");
  if (!permanantAddrLine1) {
    (0, _set2.default)(owners[0], "address.addressLine1", permanantAddr);
  }
  dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.owners", JSON.parse(JSON.stringify(owners))));
};
var createOwnersBackup = function createOwnersBackup(dispatch, payload) {
  var owners = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.owners");
  owners && owners.length > 0 && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.owners", JSON.parse(JSON.stringify(owners))));
};

var userAddressConstruct = function userAddressConstruct(address) {
  var doorNo = address.doorNo ? address.doorNo : "";
  var buildingName = address.buildingName ? address.buildingName : "";
  var street = address.street ? address.street : "";
  var landmark = address.landmark ? address.landmark : "";
  var city = address.city ? address.city : "";
  return doorNo + "," + buildingName + "," + street + "," + landmark + "," + city;
};

var setApplicationNumberBoxBPAREG = exports.setApplicationNumberBoxBPAREG = function setApplicationNumberBoxBPAREG(state, dispatch, applicationNo) {
  if (!applicationNo) {
    applicationNo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].applicationNumber", null);
  }

  if (applicationNo) {
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", true));
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", applicationNo));
  }
};

var applyTradeLicense = exports.applyTradeLicense = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(state, dispatch, activeIndex) {
    var queryObject, documents, _ownershipType, owners, tenantId, userAddress, permanantAddr, tradeUnits, action, documentsUpdalod, documnts, requiredDocuments, searchResponse, isEditFlow, stakeHolderDetails, _owners, dob, updatedtradeUnits, _tradeUnits, mergedTradeUnits, response, _stakeHolderDetails, _owners2, _dob;

    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;

            dispatch((0, _actions2.toggleSpinner)());
            queryObject = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses", [])));
            documents = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments");

            (0, _set2.default)(queryObject[0], "validFrom", (0, _utils.convertDateToEpoch)(queryObject[0].validFrom, "dayend"));
            // set(queryObject[0], "wfDocuments", documents);
            (0, _set2.default)(queryObject[0], "validTo", (0, _utils.convertDateToEpoch)(queryObject[0].validTo, "dayend"));
            if (queryObject[0] && queryObject[0].commencementDate) {
              queryObject[0].commencementDate = (0, _utils.convertDateToEpoch)(queryObject[0].commencementDate, "dayend");
            }
            _ownershipType = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.subOwnerShipCategory");

            if (_ownershipType == "INDIVIDUAL") (0, _set2.default)(queryObject[0], "tradeLicenseDetail.institution", null);
            owners = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.owners");

            owners = owners && convertOwnerDobToEpoch(owners) || [];
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners", owners);
            (0, _set2.default)(queryObject[0], "licenseType", "PERMANENT");
            (0, _set2.default)(queryObject[0], "businessService", "BPAREG");

            tenantId = (0, _localStorageUtils.getTenantId)();

            if (tenantId == "null" || tenantId == null) {
              tenantId = process.env.REACT_APP_DEFAULT_TENANT_ID;
            }

            (0, _set2.default)(queryObject[0], "tenantId", tenantId);
            userAddress = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].userData.address");
            permanantAddr = userAddressConstruct(userAddress);


            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners[0].permanentAddress", permanantAddr);
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners[0].permanentPinCode", userAddress.pincode);

            if (!queryObject[0].applicationNumber) {
              _context11.next = 53;
              break;
            }

            //call update

            tradeUnits = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits");

            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits", (0, _commons.getMultiUnits)(tradeUnits));
            // set(
            //   queryObject[0],
            //   "tradeLicenseDetail.owners",
            //   getMultipleOwners(owners)
            // );
            action = "NOWORKFLOW";
            // if (
            //   queryObject[0].tradeLicenseDetail &&
            //   queryObject[0].tradeLicenseDetail.applicationDocuments
            // ) {

            if (activeIndex === 2) {
              action = "APPLY";
            }
            //   let docs = []; 
            //   let bparegDocuments = queryObject[0].tradeLicenseDetail.applicationDocuments;
            //  if(bparegDocuments && bparegDocuments.length > 0) {
            //   bparegDocuments.forEach(doc => {
            //     if(doc != null) docs.push(doc)
            //   })
            //   }
            //   queryObject[0].tradeLicenseDetail.applicationDocuments = docs;
            // }

            documentsUpdalod = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.bparegDocumentDetailsUploadRedux", []);
            documnts = [];

            if (documentsUpdalod) {
              Object.keys(documentsUpdalod).forEach(function (key) {
                documnts.push(documentsUpdalod[key]);
              });
            }

            if (documents && documents.length && documnts && documnts.length) {
              documents.forEach(function (upDocs) {
                documnts.forEach(function (reduxDocs) {
                  if (reduxDocs && upDocs && reduxDocs.documentCode === upDocs.documentType) {
                    reduxDocs.documents[0].id = upDocs.id;
                  }
                });
              });
            }

            requiredDocuments = [];

            if (documnts && documnts.length > 0) {
              documnts.forEach(function (documents) {
                if (documents && documents.documents) {
                  var doc = {};
                  doc.fileStoreId = documents.documents[0].fileStoreId;
                  doc.fileStore = documents.documents[0].fileStoreId;
                  doc.fileName = documents.documents[0].fileName;
                  doc.fileUrl = documents.documents[0].fileUrl;
                  doc.documentType = documents.documentCode;
                  doc.tenantId = tenantId;
                  if (documents.documents[0].id) {
                    doc.id = documents.documents[0].id;
                  }
                  requiredDocuments.push(doc);
                }
              });
            }
            if (requiredDocuments && requiredDocuments.length) {
              queryObject[0].tradeLicenseDetail.applicationDocuments = requiredDocuments;
            }
            // else if (
            //   queryObject[0].tradeLicenseDetail &&
            //   queryObject[0].tradeLicenseDetail.applicationDocuments &&
            //   activeIndex === 1
            // ) {
            // } else if (
            //   queryObject[0].tradeLicenseDetail &&
            //   queryObject[0].tradeLicenseDetail.applicationDocuments
            // ) {
            //   action = "APPLY";
            // }
            searchResponse = {};

            (0, _set2.default)(queryObject[0], "action", action);
            isEditFlow = (0, _commons.getQueryArg)(window.location.href, "action") === "edit";

            if (isEditFlow) {
              _context11.next = 40;
              break;
            }

            _context11.next = 39;
            return (0, _api.httpRequest)("post", "/tl-services/v1/BPAREG/_update", "", [], {
              Licenses: queryObject
            });

          case 39:
            searchResponse = _context11.sent;

          case 40:
            dispatch((0, _actions2.toggleSpinner)());

            // let searchQueryObject = [
            //   { key: "tenantId", value: queryObject[0].tenantId },
            //   { key: "applicationNumber", value: queryObject[0].applicationNumber }
            // ];
            // let searchResponse = await getSearchResults(searchQueryObject);

            if (!isEditFlow) {
              _context11.next = 45;
              break;
            }

            searchResponse = { Licenses: queryObject };
            _context11.next = 50;
            break;

          case 45:
            stakeHolderDetails = searchResponse.Licenses;

            if (stakeHolderDetails && stakeHolderDetails[0] && stakeHolderDetails[0].tradeLicenseDetail) {
              _owners = stakeHolderDetails[0].tradeLicenseDetail.owners;
              dob = convertEchToDate(_owners[0].dob);

              stakeHolderDetails[0].tradeLicenseDetail.owners[0].dob = dob;
            }
            dispatch((0, _actions2.prepareFinalObject)("Licenses", stakeHolderDetails));
            _context11.next = 50;
            return setDocsForEditFlow(state, dispatch);

          case 50:
            updatedtradeUnits = (0, _get2.default)(searchResponse, "Licenses[0].tradeLicenseDetail.tradeUnits");
            _context11.next = 67;
            break;

          case 53:
            _tradeUnits = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits");
            // let owners = get(queryObject[0], "tradeLicenseDetail.owners");

            mergedTradeUnits = _tradeUnits && _tradeUnits.filter(function (item) {
              return !item.hasOwnProperty("isDeleted");
            });


            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits", mergedTradeUnits);
            (0, _set2.default)(queryObject[0], "action", "NOWORKFLOW");
            //Emptying application docs to "INITIATE" form in case of search and fill from old TL Id.
            if (!queryObject[0].applicationNumber) (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
            _context11.next = 60;
            return (0, _api.httpRequest)("post", "/tl-services/v1/BPAREG/_create", "", [], { Licenses: queryObject });

          case 60:
            response = _context11.sent;

            dispatch((0, _actions2.toggleSpinner)());
            if (!response) {}
            _stakeHolderDetails = response.Licenses;

            if (_stakeHolderDetails && _stakeHolderDetails[0] && _stakeHolderDetails[0].tradeLicenseDetail) {
              _owners2 = _stakeHolderDetails[0].tradeLicenseDetail.owners;
              _dob = convertEchToDate(_owners2[0].dob);

              _stakeHolderDetails[0].tradeLicenseDetail.owners[0].dob = _dob;
            }
            dispatch((0, _actions2.prepareFinalObject)("Licenses", _stakeHolderDetails));
            createOwnersBackup(dispatch, response);

          case 67:
            /** Application no. box setting */
            setApplicationNumberBoxBPAREG(state, dispatch);
            return _context11.abrupt("return", true);

          case 71:
            _context11.prev = 71;
            _context11.t0 = _context11["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context11.t0.message }, "error"));
            dispatch((0, _actions2.toggleSpinner)());

            console.log(_context11.t0);
            return _context11.abrupt("return", false);

          case 77:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[0, 71]]);
  }));

  return function applyTradeLicense(_x23, _x24, _x25) {
    return _ref11.apply(this, arguments);
  };
}();

var convertOwnerDobToEpoch = function convertOwnerDobToEpoch(owners) {
  var updatedOwners = owners && owners.map(function (owner) {
    return (0, _extends3.default)({}, owner, {
      dob: owner && owner !== null && (0, _utils.convertDateToEpoch)(owner.dob, "dayend")
    });
  }).filter(function (item) {
    return item && item !== null;
  });
  return updatedOwners;
};

var getImageUrlByFile = exports.getImageUrlByFile = function getImageUrlByFile(file) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
  var fileNameArray = file["name"].split(".");
  var fileFormat = fileNameArray[fileNameArray.length - 1];
  return fileFormat && acceptedFiles && acceptedFiles.indexOf(fileFormat.toUpperCase()) > -1 || false;
};

var setApplicationNumberBox = exports.setApplicationNumberBox = function setApplicationNumberBox(state, dispatch, applicationNo) {
  if (!applicationNo) {
    applicationNo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.applicationNo", null);
  }

  if (applicationNo) {
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", true));
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", applicationNo));
  }
};

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

var acceptedFiles = exports.acceptedFiles = function acceptedFiles(acceptedExt) {
  var splitExtByName = acceptedExt.split(",");
  var acceptedFileTypes = splitExtByName.map(function (item) {
    return item.toUpperCase();
  });
  return acceptedFileTypes;
};

var handleFileUpload = exports.handleFileUpload = function handleFileUpload(event, handleDocument, props) {
  var uploadDocument = true;
  var inputProps = props.inputProps,
      maxFileSize = props.maxFileSize,
      moduleName = props.moduleName;

  var input = event.target;
  if (input.files && input.files.length > 0) {
    var files = input.files;
    Object.keys(files).forEach(function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(key, index) {
        var file, fileValid, isSizeValid;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                file = files[key];
                fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
                // const fileValid = true //temporary disabling check as dxf issues in other os

                isSizeValid = getFileSize(file) <= maxFileSize;

                if (!fileValid) {
                  alert("Only dxf files can be uploaded");
                  uploadDocument = false;
                }
                if (!isSizeValid) {
                  alert("Maximum file size can be " + Math.round(maxFileSize / 1000) + " MB");
                  uploadDocument = false;
                }
                if (uploadDocument) {
                  handleDocument(file);
                }

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, undefined);
      }));

      return function (_x26, _x27) {
        return _ref12.apply(this, arguments);
      };
    }());
  }
};

var updateNocApplication = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(state, dispatch, bpaAction) {
    var Noc, nocDocuments, count, data, documents, response;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            Noc = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc", []);
            nocDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.nocForPreview", []);

            if (!(Noc.length > 0)) {
              _context13.next = 18;
              break;
            }

            count = 0;
            data = 0;

          case 5:
            if (!(data < Noc.length)) {
              _context13.next = 18;
              break;
            }

            documents = nocDocuments[data].documents;

            (0, _set2.default)(Noc[data], "documents", documents);
            // set(NOCData[data], "workflow.action", bpaAction)
            _context13.next = 10;
            return (0, _api.httpRequest)("post", "/noc-services/v1/noc/_update", "", [], { Noc: Noc[data] });

          case 10:
            response = _context13.sent;

            if (!((0, _get2.default)(response, "ResponseInfo.status") == "successful")) {
              _context13.next = 15;
              break;
            }

            count++;

            if (!(Noc.length == count)) {
              _context13.next = 15;
              break;
            }

            return _context13.abrupt("return", "successful");

          case 15:
            data++;
            _context13.next = 5;
            break;

          case 18:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function updateNocApplication(_x28, _x29, _x30) {
    return _ref13.apply(this, arguments);
  };
}();

var submitBpaApplication = exports.submitBpaApplication = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(state, dispatch) {
    var bpaAction, isDeclared, nocRespose, response, applicationNumber, tenantId, status, acknowledgementUrl, _acknowledgementUrl, errorMessage;

    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            bpaAction = "APPLY";
            isDeclared = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.isDeclared");

            if (!isDeclared) {
              _context14.next = 14;
              break;
            }

            _context14.next = 5;
            return nocapplicationUpdate(state);

          case 5:
            nocRespose = _context14.sent;
            _context14.next = 8;
            return createUpdateBpaApplication(state, dispatch, bpaAction);

          case 8:
            response = _context14.sent;
            applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.applicationNo");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

            if ((0, _get2.default)(response, "status", "") === "success") {
              status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.status");

              if (status === "DOC_VERIFICATION_INPROGRESS") {
                acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/egov-bpa/acknowledgement?purpose=apply_skip&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/egov-bpa/acknowledgement?purpose=apply_skip&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

                dispatch((0, _actions.setRoute)(acknowledgementUrl));
              } else {
                _acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/egov-bpa/acknowledgement?purpose=apply&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/egov-bpa/acknowledgement?purpose=apply&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

                dispatch((0, _actions.setRoute)(_acknowledgementUrl));
              }
            }
            _context14.next = 16;
            break;

          case 14:
            errorMessage = {
              labelName: "Please confirm the declaration!",
              labelKey: "BPA_DECLARATION_COMMON_LABEL"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));

          case 16:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function submitBpaApplication(_x31, _x32) {
    return _ref14.apply(this, arguments);
  };
}();

var updateBpaApplication = exports.updateBpaApplication = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(state, dispatch) {
    var bpaAction, nocRespose, response, applicationNumber, tenantId, acknowledgementUrl;
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            bpaAction = "SEND_TO_CITIZEN";
            _context15.next = 3;
            return updateNocApplication(state, dispatch, "INITIATE");

          case 3:
            nocRespose = _context15.sent;
            _context15.next = 6;
            return createUpdateBpaApplication(state, dispatch, bpaAction);

          case 6:
            response = _context15.sent;
            applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.applicationNo");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

            if ((0, _get2.default)(response, "status", "") === "success" && nocRespose == "successful") {
              acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/egov-bpa/acknowledgement?purpose=" + bpaAction + "&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/egov-bpa/acknowledgement?purpose=" + bpaAction + "&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

              dispatch((0, _actions.setRoute)(acknowledgementUrl));
            }

          case 10:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function updateBpaApplication(_x33, _x34) {
    return _ref15.apply(this, arguments);
  };
}();
var updateOcBpaApplication = exports.updateOcBpaApplication = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(state, dispatch) {
    var bpaAction, nocRespose, response, applicationNumber, tenantId, acknowledgementUrl;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            bpaAction = "SEND_TO_CITIZEN";
            _context16.next = 3;
            return updateNocApplication(state, dispatch, "INITIATE");

          case 3:
            nocRespose = _context16.sent;
            _context16.next = 6;
            return createUpdateOCBpaApplication(state, dispatch, bpaAction);

          case 6:
            response = _context16.sent;
            applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.applicationNo");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

            if (response && nocRespose == "successful") {
              acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/oc-bpa/acknowledgement?purpose=" + bpaAction + "&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/oc-bpa/acknowledgement?purpose=" + bpaAction + "&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

              dispatch((0, _actions.setRoute)(acknowledgementUrl));
            }

          case 10:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function updateOcBpaApplication(_x35, _x36) {
    return _ref16.apply(this, arguments);
  };
}();

var createUpdateOCBpaApplication = exports.createUpdateOCBpaApplication = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(state, dispatch, status) {
    var applicationId, documentsUpdalod, BPADocs, method, documnts, requiredDocuments, payload, tenantId, userInfo, accountId, documents, owners, authOwners, multiOwners, response;
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            applicationId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.id");
            documentsUpdalod = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentDetailsUploadRedux", []);
            BPADocs = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.documents", []);
            method = applicationId ? "UPDATE" : "CREATE";
            documnts = [];

            if (documentsUpdalod) {
              Object.keys(documentsUpdalod).forEach(function (key) {
                documnts.push(documentsUpdalod[key]);
              });
            }

            requiredDocuments = [];

            if (documnts && documnts.length > 0) {
              documnts.forEach(function (documents) {
                if (documents && documents.documents) {
                  documents.documents.forEach(function (docItem) {
                    if (documents.dropDownValues && documents.dropDownValues.value) {
                      var doc = {};
                      doc.documentType = documents.dropDownValues.value;
                      doc.fileStoreId = docItem.fileStoreId;
                      doc.fileStore = docItem.fileStoreId;
                      doc.fileName = docItem.fileName;
                      doc.fileUrl = docItem.fileUrl;
                      doc.additionalDetails = docItem.additionalDetails;
                      BPADocs && BPADocs.forEach(function (bpaDc) {
                        if (bpaDc.fileStoreId === docItem.fileStoreId) {
                          doc.id = bpaDc.id;
                        }
                      });
                      requiredDocuments.push(doc);
                    }
                  });
                }
              });

              documnts.forEach(function (documents) {
                if (documents && documents.previewdocuments) {
                  documents.previewdocuments.forEach(function (pDoc) {
                    var doc = {};
                    doc.documentType = pDoc.dropDownValues;
                    doc.fileStoreId = pDoc.fileStoreId;
                    doc.fileStore = pDoc.fileStoreId;
                    doc.fileName = pDoc.fileName;
                    doc.fileUrl = pDoc.fileUrl;
                    BPADocs && BPADocs.forEach(function (bpaDc) {
                      if (bpaDc.fileStoreId === pDoc.fileStoreId) {
                        doc.id = bpaDc.id;
                      }
                    });
                    requiredDocuments.push(doc);
                  });
                }
              });
            }

            // will use this later
            // let subOccupancyData = get(
            //   state, "screenConfiguration.preparedFinalObject.edcr.blockDetail"
            // );
            // let BPADetails = get(
            //   state, "screenConfiguration.preparedFinalObject.BPA"
            // );
            // let blocks = [];
            // subOccupancyData.forEach((block, index) => {
            //   let arry = [];
            //   block && block.occupancyType && block.occupancyType.length &&
            //     block.occupancyType.forEach(occType => {
            //       arry.push(occType.value);
            //     })
            //   blocks[index] = {};
            //   blocks[index].blockIndex = index;
            //   blocks[index].usageCategory = {};
            //   blocks[index].usageCategory = arry.join();
            //   blocks[index].floorNo = block.floorNo;
            //   blocks[index].unitType = "Block";
            //   if (BPADetails.landInfo && BPADetails.landInfo.unit && BPADetails.landInfo.unit[index] && BPADetails.landInfo.unit[index].id) {
            //     blocks[index].id = BPADetails.landInfo.unit[index].id;
            //   }
            // })

            _context17.prev = 8;
            payload = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA", []);
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId") || (0, _localStorageUtils.getTenantId)();
            userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
            accountId = (0, _get2.default)(userInfo, "uuid");

            (0, _set2.default)(payload, "tenantId", tenantId);
            (0, _set2.default)(payload, "workflow.action", status);
            (0, _set2.default)(payload, "accountId", accountId);
            // set(payload, "landInfo.tenantId", tenantId);
            // set(payload, "landInfo.unit", blocks);

            documents = void 0;

            if (requiredDocuments && requiredDocuments.length > 0) {
              documents = requiredDocuments;
            } else {
              documents = null;
            }

            if (method === "UPDATE") {
              if (status === "APPLY") {
                documents = payload.documents;
              } else {
                documents = payload.documents;
                documents = requiredDocuments;
              }
              (0, _set2.default)(payload, "documents", documents);
              (0, _set2.default)(payload, "workflow.varificationDocuments", null);
            } else if (method === 'CREATE') {
              documents = null;
            }

            payload.documents = documents;

            // Set Dates to Epoch
            owners = (0, _get2.default)(payload, "landInfo.owners", []);

            owners.forEach(function (owner, index) {
              (0, _set2.default)(payload, "landInfo.owners[" + index + "].dob", (0, _utils.convertDateToEpoch)((0, _get2.default)(owner, "dob")));
            });

            authOwners = [];
            multiOwners = (0, _get2.default)(payload, "landInfo.owners", []);

            if (multiOwners && multiOwners.length > 0) {
              multiOwners.forEach(function (owner) {
                if (owner && owner.isDeleted != false) {
                  authOwners.push(owner);
                }
              });
            }

            (0, _set2.default)(payload, "landInfo.owners", authOwners);
            response = void 0;

            if (!(method === "CREATE")) {
              _context17.next = 37;
              break;
            }

            _context17.next = 30;
            return (0, _api.httpRequest)("post", "bpa-services/v1/bpa/_create", "", [], { BPA: payload });

          case 30:
            response = _context17.sent;

            dispatch((0, _actions2.prepareFinalObject)("BPA", response.BPA[0]));
            setApplicationNumberBox(state, dispatch);
            _context17.next = 35;
            return (0, _utils2.edcrDetailsToBpaDetails)(state, dispatch);

          case 35:
            _context17.next = 44;
            break;

          case 37:
            if (!(method === "UPDATE")) {
              _context17.next = 44;
              break;
            }

            _context17.next = 40;
            return (0, _api.httpRequest)("post", "bpa-services/v1/bpa/_update", "", [], { BPA: payload });

          case 40:
            response = _context17.sent;

            dispatch((0, _actions2.prepareFinalObject)("BPA", response.BPA[0]));
            _context17.next = 44;
            return (0, _utils2.edcrDetailsToBpaDetails)(state, dispatch);

          case 44:
            return _context17.abrupt("return", true);

          case 47:
            _context17.prev = 47;
            _context17.t0 = _context17["catch"](8);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context17.t0.message }, "error"));
            return _context17.abrupt("return", false);

          case 51:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[8, 47]]);
  }));

  return function createUpdateOCBpaApplication(_x37, _x38, _x39) {
    return _ref17.apply(this, arguments);
  };
}();

var submitOCBpaApplication = exports.submitOCBpaApplication = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(state, dispatch) {
    var bpaAction, nocRespose, response, applicationNumber, tenantId, acknowledgementUrl, _acknowledgementUrl2;

    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            bpaAction = "APPLY";
            _context18.next = 3;
            return nocapplicationUpdate(state);

          case 3:
            nocRespose = _context18.sent;
            _context18.next = 6;
            return createUpdateOCBpaApplication(state, dispatch, bpaAction);

          case 6:
            response = _context18.sent;
            applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.applicationNo");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

            if (response) {
              if ((0, _get2.default)(response, "BPA[0].status" === "DOC_VERIFICATION_INPROGRESS")) {
                acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/oc-bpa/acknowledgement?purpose=apply_skip&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/oc-bpa/acknowledgement?purpose=apply_skip&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

                dispatch((0, _actions.setRoute)(acknowledgementUrl));
              } else {
                _acknowledgementUrl2 = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/oc-bpa/acknowledgement?purpose=apply&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/oc-bpa/acknowledgement?purpose=apply&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

                dispatch((0, _actions.setRoute)(_acknowledgementUrl2));
              }
            }

          case 10:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function submitOCBpaApplication(_x40, _x41) {
    return _ref18.apply(this, arguments);
  };
}();
var getNocSearchResults = exports.getNocSearchResults = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _context19.next = 3;
            return (0, _api.httpRequest)("post", "/noc-services/v1/noc/_search", "", queryObject);

          case 3:
            response = _context19.sent;
            return _context19.abrupt("return", response);

          case 7:
            _context19.prev = 7;
            _context19.t0 = _context19["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context19.t0.message, labelKey: _context19.t0.message }, "error"));
            throw _context19.t0;

          case 11:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, undefined, [[0, 7]]);
  }));

  return function getNocSearchResults(_x42, _x43) {
    return _ref19.apply(this, arguments);
  };
}();
var nocapplicationUpdate = exports.nocapplicationUpdate = function nocapplicationUpdate(state) {
  var Noc = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc", []);
  var nocDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.nocFinalCardsforPreview", []);
  if (Noc.length > 0) {
    var count = 0;
    for (var data = 0; data < Noc.length; data++) {
      var documents = nocDocuments[data].documents;
      (0, _set2.default)(Noc[data], "documents", documents);
      var response = (0, _api.httpRequest)("post", "/noc-services/v1/noc/_update", "", [], { Noc: Noc[data] });
      if ((0, _get2.default)(response, "ResponseInfo.status") == "successful") {
        count++;
        if (Noc.length == count) {
          return "successful";
        }
      }
    }
  }
};

var getStakeHolderRoles = exports.getStakeHolderRoles = function getStakeHolderRoles() {
  var roles = ["BPA_ARCHITECT", "BPA_ENGINEER", "BPA_BUILDER", "BPA_STRUCTURALENGINEER", "BPA_SUPERVISOR", "BPA_TOWNPLANNER"];
  return roles;
};