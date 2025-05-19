"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValidOwners = exports.getNextFinancialYearForRenewal = exports.handleFileUpload = exports.findItemInArrayOfObject = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.applyTradeLicense = exports.getBoundaryData = exports.updatePFOforSearchResults = exports.getSearchResults = exports.getLocaleLabelsforTL = exports.updateTradeDetails = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _compact = require("lodash/compact");

var _compact2 = _interopRequireDefault(_compact);

var _store = require("redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../ui-config/screens/specs/utils");

var _api2 = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateTradeDetails = exports.updateTradeDetails = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(requestBody) {
    var payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api2.httpRequest)("post", "/tl-services/v1/_update", "", [], requestBody);

          case 3:
            payload = _context.sent;
            return _context.abrupt("return", payload);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, _context.t0.message, "error"));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function updateTradeDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getLocaleLabelsforTL = exports.getLocaleLabelsforTL = function getLocaleLabelsforTL(label, labelKey, localizationLabels) {
  if (labelKey) {
    var translatedLabel = (0, _utils.getTranslatedLabel)(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
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
            return (0, _api2.httpRequest)("post", "/tl-services/v1/_search", "", queryObject);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            (0, _commons.enableFieldAndHideSpinner)('search', "components.div.children.tradeLicenseApplication.children.cardContent.children.button.children.buttonContainer.children.searchButton", _store2.default.dispatch);
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelCode: _context2.t0.message }, "error"));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getSearchResults(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var setDocsForEditFlow = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var applicationDocuments, mdmsDocs, orderedApplicationDocuments, uploadedDocuments, fileStoreIds, fileUrlPayload;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            applicationDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);
            /* To change the order of application documents similar order of mdms order*/

            mdmsDocs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.documentObj[0].allowedDocs", []);
            orderedApplicationDocuments = mdmsDocs.map(function (mdmsDoc) {
              var applicationDocument = {};
              applicationDocuments && applicationDocuments.map(function (appDoc) {
                if (appDoc.documentType == mdmsDoc.documentType) {
                  applicationDocument = (0, _extends3.default)({}, appDoc);
                }
              });
              return applicationDocument;
            }).filter(function (docObj) {
              return Object.keys(docObj).length > 0;
            });

            applicationDocuments = [].concat((0, _toConsumableArray3.default)(orderedApplicationDocuments));
            dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.applicationDocuments", applicationDocuments));

            uploadedDocuments = {};
            fileStoreIds = applicationDocuments && applicationDocuments.map(function (item) {
              return item.fileStoreId;
            }).join(",");
            _context3.t0 = fileStoreIds;

            if (!_context3.t0) {
              _context3.next = 12;
              break;
            }

            _context3.next = 11;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 11:
            _context3.t0 = _context3.sent;

          case 12:
            fileUrlPayload = _context3.t0;

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
            dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].uploadedDocsInRedux", uploadedDocuments));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function setDocsForEditFlow(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var generateNextFinancialYear = function generateNextFinancialYear(state) {
  var currentFY = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].financialYear");
  var financialYears = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.egf-master.FinancialYear", []);
  var currrentFYending = financialYears.filter(function (item) {
    return item.code === currentFY;
  })[0].endingDate;

  var nectYearObject = financialYears.filter(function (item) {
    return item.startingDate === currrentFYending;
  })[0];
  return nectYearObject ? nectYearObject.code : (0, _utils.getCurrentFinancialYear)();
};

var updatePFOforSearchResults = exports.updatePFOforSearchResults = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(action, state, dispatch, queryValue, tenantId) {
    var queryObject, isPreviouslyEdited, payload, ownersInitial, structureTypes, structureType, structureSubType, selectedValues, dropDownValues, structureSubTypeDropValues, isEditRenewal, nextYear;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            queryObject = [{
              key: "tenantId",
              value: tenantId ? tenantId : (0, _localStorageUtils.getTenantId)()
            }, { key: "applicationNumber", value: queryValue }];
            isPreviouslyEdited = (0, _commons.getQueryArg)(window.location.href, "edited");

            if (isPreviouslyEdited) {
              _context4.next = 8;
              break;
            }

            _context4.next = 5;
            return getSearchResults(queryObject);

          case 5:
            _context4.t0 = _context4.sent;
            _context4.next = 9;
            break;

          case 8:
            _context4.t0 = {
              Licenses: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses")
            };

          case 9:
            payload = _context4.t0;

            // const payload = await getSearchResults(queryObject)
            // getQueryArg(window.location.href, "action") === "edit" &&
            //   (await setDocsForEditFlow(state, dispatch));

            if (payload && payload.Licenses) {
              ownersInitial = (0, _get2.default)(payload.Licenses[0], 'tradeLicenseDetail.owners', []);

              (0, _set2.default)(payload.Licenses[0], 'tradeLicenseDetail.owners', ownersInitial.filter(function (owner) {
                return owner.userActive;
              }));
              dispatch((0, _actions.prepareFinalObject)("Licenses[0]", payload.Licenses[0]));
              dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].oldOwners", [].concat((0, _toConsumableArray3.default)(payload.Licenses[0].tradeLicenseDetail.owners))));
              structureTypes = (0, _get2.default)(payload, 'Licenses[0].tradeLicenseDetail.structureType', '').split('.') || [];
              structureType = structureTypes && Array.isArray(structureTypes) && structureTypes.length > 0 && structureTypes[0] || 'none';
              structureSubType = (0, _get2.default)(payload, 'Licenses[0].tradeLicenseDetail.structureType', '') || 'none';
              selectedValues = [{
                structureType: structureType,
                structureSubType: structureSubType
              }];

              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.structureTypes.selectedValues", selectedValues));
              // dispatch(
              // prepareFinalObject("DynamicMdms.common-masters.structureTypes.structureSubTypeTransformed.allDropdown[0]", getObjectValues(get(state.screenConfiguration.preparedFinalObject,`applyScreenMdmsData.common-masters.StructureType.structureTypesTransformed.${structureType}`,[]))));

              dropDownValues = (0, _commons.getObjectValues)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.common-masters.structureTypes.structureTypesTransformed." + structureType, []));
              structureSubTypeDropValues = [];

              if (dropDownValues && dropDownValues.length === 0) {
                dropDownValues = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.StructureType", []);
                if (dropDownValues && dropDownValues.length > 0) {
                  structureSubTypeDropValues = dropDownValues.filter(function (data) {
                    return data.code.split('.')[0] === structType.split(".")[0];
                  });
                  dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.structureTypes.structureSubTypeTransformed.allDropdown[0]", structureSubTypeDropValues));
                }
              } else {
                dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.structureTypes.structureSubTypeTransformed.allDropdown[0]", dropDownValues));
              }
            }

            isEditRenewal = (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL";

            if (isEditRenewal) {
              nextYear = generateNextFinancialYear(state);

              dispatch((0, _actions.prepareFinalObject)("Licenses[0].financialYear", nextYear));
            }

            setDocsForEditFlow(state, dispatch);

            setApplicationNumberBox(state, dispatch);

            createOwnersBackup(dispatch, payload);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function updatePFOforSearchResults(_x5, _x6, _x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var getBoundaryData = exports.getBoundaryData = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(action, state, dispatch, queryObject, code, componentPath) {
    var payload, tenantId, mohallaData, data, messageObject;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _api2.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", queryObject, {});

          case 3:
            payload = _context5.sent;
            tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.address.city") : (0, _commons.getQueryArg)(window.location.href, "tenantId");
            mohallaData = payload && payload.TenantBoundary[0] && payload.TenantBoundary[0].boundary && payload.TenantBoundary[0].boundary.reduce(function (result, item) {
              result.push((0, _extends3.default)({}, item, {
                name: tenantId.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
              }));
              return result;
            }, []);


            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities",
            // payload.TenantBoundary && payload.TenantBoundary[0].boundary,
            mohallaData));

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.suggestions", mohallaData));
            if (code) {
              data = payload.TenantBoundary[0].boundary;
              messageObject = data && data.find(function (item) {
                return item.code == code;
              });

              if (messageObject) dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address.locality.name", messageObject.name));
            }
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);

            console.log(_context5.t0);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 11]]);
  }));

  return function getBoundaryData(_x10, _x11, _x12, _x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var createOwnersBackup = function createOwnersBackup(dispatch, payload) {
  var owners = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.owners");
  owners && owners.length > 0 && dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.owners", JSON.parse(JSON.stringify(owners))));
};

var getMultipleOwners = function getMultipleOwners(owners) {
  var mergedOwners = owners && owners.reduce(function (result, item) {
    if (item && item !== null && item.hasOwnProperty("mobileNumber")) {
      if (item.hasOwnProperty("active") && item.active) {
        if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
          (0, _set2.default)(item, "active", false);
          result.push(item);
        } else {
          result.push(item);
        }
      } else {
        if (!item.hasOwnProperty("isDeleted")) {
          result.push(item);
        }
      }
    }
    return result;
  }, []);

  return mergedOwners;
};

var applyTradeLicense = exports.applyTradeLicense = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch, activeIndex) {
    var queryObject, documentArray, documents, owners, cityId, tenantId, BSqueryObject, isEditRenewal, accessories, tradeUnits, action, renewalSearchQueryObject, renewalResponse, renewalDocuments, i, isEditFlow, updateResponse, oldOwners, updatedApplicationNo, updatedTenant, workflowCode, bsQueryObject, searchQueryObject, searchResponse, updatedtradeUnits, tradeTemp, _accessories, _tradeUnits, mergedTradeUnits, mergedAccessories, mergedOwners, response;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            queryObject = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses", [])));
            //------ removing null from document array ------

            documentArray = (0, _compact2.default)((0, _get2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments"));
            documents = (0, _utils.getUniqueItemsFromArray)(documentArray, "fileStoreId");

            documents = documents.filter(function (item) {
              return item.fileUrl && item.fileName;
            }).map(function (item) {
              delete item.fileUrl;
              return (0, _extends3.default)({}, item);
            });
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", documents);
            //-----------------------------------------------
            // let documents = get(queryObject[0], "tradeLicenseDetail.applicationDocuments");
            (0, _set2.default)(queryObject[0], "validFrom", (0, _utils.convertDateToEpoch)(queryObject[0].validFrom, "dayend"));
            (0, _set2.default)(queryObject[0], "wfDocuments", documents);
            (0, _set2.default)(queryObject[0], "validTo", (0, _utils.convertDateToEpoch)(queryObject[0].validTo, "dayend"));
            if (queryObject[0] && queryObject[0].commencementDate) {
              queryObject[0].commencementDate = (0, _utils.convertDateToEpoch)(queryObject[0].commencementDate, "dayend");
            }
            owners = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.owners");

            owners = owners && convertOwnerDobToEpoch(owners) || [];

            cityId = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.address.tenantId", "");
            tenantId = (0, _utils.ifUserRoleExists)("CITIZEN") ? cityId : (0, _localStorageUtils.getTenantId)();
            BSqueryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: "NewTL" }];

            (0, _commons.disableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
            (0, _commons.disableField)('apply', "components.div.children.footer.children.payButton", dispatch);

            if (process.env.REACT_APP_NAME === "Citizen") {
              // let currentFinancialYr = getCurrentFinancialYear();
              // //Changing the format of FY
              // let fY1 = currentFinancialYr.split("-")[1];
              // fY1 = fY1.substring(2, 4);
              // currentFinancialYr = currentFinancialYr.split("-")[0] + "-" + fY1;
              // set(queryObject[0], "financialYear", currentFinancialYr);
              (0, _commons.setBusinessServiceDataToLocalStorage)(BSqueryObject, dispatch);
            }

            (0, _set2.default)(queryObject[0], "tenantId", tenantId);
            (0, _set2.default)(queryObject[0], "workflowCode", "NewTL");
            (0, _set2.default)(queryObject[0], "applicationType", "NEW");

            if (!queryObject[0].applicationNumber) {
              _context6.next = 66;
              break;
            }

            //call update
            isEditRenewal = (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL";

            if (isEditRenewal) {
              // if(process.env.REACT_APP_NAME === "Citizen"){
              //   const nextFinancialyear = await getNextFinancialYearForRenewal(queryObject[0].financialYear);
              //   set(queryObject[0], "financialYear", nextFinancialyear);
              // }     
              (0, _set2.default)(queryObject[0], "applicationType", "RENEWAL");
              (0, _set2.default)(queryObject[0], "workflowCode", (0, _commons.getQueryArg)(window.location.href, "action"));
            }

            accessories = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.accessories");
            tradeUnits = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits");
            // const selectedTradeSubType = get(state, "screenConfiguration.preparedFinalObject.DynamicMdms.TradeLicense.tradeUnits.tradeSubType", []);
            // tradeUnits[0].tradeType = selectedTradeSubType;

            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits", (0, _commons.getMultiUnits)(tradeUnits));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.accessories", (0, _commons.getMultiUnits)(accessories));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));

            action = "INITIATE";
            //Code for edit flow

            if (queryObject[0].tradeLicenseDetail && queryObject[0].tradeLicenseDetail.applicationDocuments) {

              if ((0, _commons.getQueryArg)(window.location.href, "action") === "edit" || isEditRenewal) {} else if (activeIndex === 1) {
                (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
              } else action = "APPLY";
            }

            if (!((activeIndex === 3 || activeIndex === 1) && isEditRenewal)) {
              _context6.next = 41;
              break;
            }

            action = activeIndex === 3 ? "APPLY" : "INITIATE";
            renewalSearchQueryObject = [{ key: "tenantId", value: queryObject[0].tenantId }, { key: "applicationNumber", value: queryObject[0].applicationNumber }];
            _context6.next = 36;
            return getSearchResults(renewalSearchQueryObject);

          case 36:
            renewalResponse = _context6.sent;
            renewalDocuments = (0, _get2.default)(renewalResponse, "Licenses[0].tradeLicenseDetail.applicationDocuments");

            for (i = 1; i <= documents.length; i++) {
              if (i > renewalDocuments.length) {
                renewalDocuments.push(documents[i - 1]);
              } else {
                if (!documents[i - 1].hasOwnProperty("id")) {
                  renewalDocuments[i - 1].active = false;
                  renewalDocuments.push(documents[i - 1]);
                }
              }
            }
            dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.applicationDocuments", renewalDocuments));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", renewalDocuments);

          case 41:
            (0, _set2.default)(queryObject[0], "action", action);
            isEditFlow = (0, _commons.getQueryArg)(window.location.href, "action") === "edit";
            updateResponse = [];

            if (isEditFlow) {
              _context6.next = 50;
              break;
            }

            oldOwners = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].tradeLicenseDetail.owners", [])));

            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners", checkValidOwners((0, _get2.default)(queryObject[0], "tradeLicenseDetail.owners", []), oldOwners));
            _context6.next = 49;
            return (0, _api2.httpRequest)("post", "/tl-services/v1/_update", "", [], {
              Licenses: queryObject
            });

          case 49:
            updateResponse = _context6.sent;

          case 50:
            //Renewal flow

            updatedApplicationNo = "";
            updatedTenant = "";

            if (isEditRenewal && updateResponse && (0, _get2.default)(updateResponse, "Licenses[0]")) {
              updatedApplicationNo = (0, _get2.default)(updateResponse.Licenses[0], "applicationNumber");
              updatedTenant = (0, _get2.default)(updateResponse.Licenses[0], "tenantId");
              workflowCode = (0, _get2.default)(updateResponse.Licenses[0], "workflowCode");
              bsQueryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: workflowCode ? workflowCode : "NewTL" }];

              (0, _commons.setBusinessServiceDataToLocalStorage)(bsQueryObject, dispatch);
            } else {
              updatedApplicationNo = queryObject[0].applicationNumber;
              updatedTenant = queryObject[0].tenantId;
            }
            searchQueryObject = [{ key: "tenantId", value: updatedTenant }, { key: "applicationNumber", value: updatedApplicationNo }];
            _context6.next = 56;
            return getSearchResults(searchQueryObject);

          case 56:
            searchResponse = _context6.sent;

            if (isEditFlow) {
              searchResponse = { Licenses: queryObject };
            } else {
              dispatch((0, _actions.prepareFinalObject)("Licenses", searchResponse.Licenses));
            }
            (0, _commons.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
            (0, _commons.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);

            updatedtradeUnits = (0, _get2.default)(searchResponse, "Licenses[0].tradeLicenseDetail.tradeUnits");
            tradeTemp = updatedtradeUnits.map(function (item, index) {
              return {
                tradeSubType: item.tradeType.split(".")[1],
                tradeType: item.tradeType.split(".")[0]
              };
            });


            dispatch((0, _actions.prepareFinalObject)("LicensesTemp.tradeUnits", tradeTemp));
            createOwnersBackup(dispatch, searchResponse);
            _context6.next = 83;
            break;

          case 66:
            _accessories = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.accessories");
            _tradeUnits = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits");
            // let owners = get(queryObject[0], "tradeLicenseDetail.owners");

            mergedTradeUnits = _tradeUnits && _tradeUnits.filter(function (item) {
              return !item.hasOwnProperty("isDeleted");
            });
            mergedAccessories = _accessories && _accessories.filter(function (item) {
              return !item.hasOwnProperty("isDeleted");
            });
            mergedOwners = owners && owners.filter(function (item) {
              return !item.hasOwnProperty("isDeleted");
            });

            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits", mergedTradeUnits);
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.accessories", mergedAccessories);
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners", mergedOwners);
            (0, _set2.default)(queryObject[0], "action", "INITIATE");
            //Emptying application docs to "INITIATE" form in case of search and fill from old TL Id.
            if (!queryObject[0].applicationNumber) (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
            _context6.next = 78;
            return (0, _api2.httpRequest)("post", "/tl-services/v1/_create", "", [], { Licenses: queryObject });

          case 78:
            response = _context6.sent;

            dispatch((0, _actions.prepareFinalObject)("Licenses", response.Licenses));
            (0, _commons.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
            (0, _commons.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
            createOwnersBackup(dispatch, response);

          case 83:
            /** Application no. box setting */
            setApplicationNumberBox(state, dispatch);
            return _context6.abrupt("return", true);

          case 87:
            _context6.prev = 87;
            _context6.t0 = _context6["catch"](0);

            (0, _commons.enableField)('apply', "components.div.children.footer.children.nextButton", dispatch);
            (0, _commons.enableField)('apply', "components.div.children.footer.children.payButton", dispatch);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context6.t0.message }, "error"));
            console.log(_context6.t0);
            return _context6.abrupt("return", false);

          case 94:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 87]]);
  }));

  return function applyTradeLicense(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var convertOwnerDobToEpoch = function convertOwnerDobToEpoch(owners) {
  var updatedOwners = owners && owners.length > 0 && owners.map(function (owner) {
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
  var mimeType = file["type"];
  return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

var setApplicationNumberBox = function setApplicationNumberBox(state, dispatch) {
  var applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].applicationNumber", null);
  if (applicationNumber) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", applicationNumber));
  }
};

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

var handleFileUpload = exports.handleFileUpload = function handleFileUpload(event, handleDocument, props, afterFileSelected) {
  var S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  var uploadDocument = true;
  var maxFileSize = props.maxFileSize,
      formatProps = props.formatProps,
      moduleName = props.moduleName;

  var input = event.target;
  if (input.files && input.files.length > 0) {
    var files = input.files;
    Object.keys(files).forEach(function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(key, index) {
        var file, fileValid, isSizeValid, fileStoreId, _fileStoreId;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                file = files[key];
                fileValid = isFileValid(file, (0, _commons.acceptedFiles)(formatProps.accept));
                isSizeValid = getFileSize(file) <= maxFileSize;

                if (!fileValid) {
                  alert("Only image or pdf files can be uploaded");
                  uploadDocument = false;
                }
                if (!isSizeValid) {
                  alert("Maximum file size can be " + Math.round(maxFileSize / 1000) + " MB");
                  uploadDocument = false;
                }

                if (!uploadDocument) {
                  _context7.next = 18;
                  break;
                }

                afterFileSelected && typeof afterFileSelected == 'function' && afterFileSelected();

                if (!file.type.match(/^image\//)) {
                  _context7.next = 14;
                  break;
                }

                _context7.next = 10;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, moduleName, file, _common2.default.tenantId);

              case 10:
                fileStoreId = _context7.sent;

                handleDocument(file, fileStoreId);
                _context7.next = 18;
                break;

              case 14:
                _context7.next = 16;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, moduleName, file, _common2.default.tenantId);

              case 16:
                _fileStoreId = _context7.sent;

                handleDocument(file, _fileStoreId);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      return function (_x19, _x20) {
        return _ref7.apply(this, arguments);
      };
    }());
  }
};

var getNextFinancialYearForRenewal = exports.getNextFinancialYearForRenewal = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(currentFinancialYear) {
    var payload, mdmsBody, financialYears, currrentFYending, nectYearObject;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            payload = null;
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantId)(),
                moduleDetails: [{
                  moduleName: "egf-master",
                  masterDetails: [{ name: "FinancialYear", filter: "[?(@.module == \"TL\")]" }]
                }]
              }
            };
            _context8.prev = 2;
            _context8.next = 5;
            return (0, _api2.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context8.sent;
            financialYears = (0, _get2.default)(payload.MdmsRes, "egf-master.FinancialYear");
            currrentFYending = financialYears.filter(function (item) {
              return item.code === currentFinancialYear;
            })[0].endingDate;
            nectYearObject = financialYears.filter(function (item) {
              return item.startingDate === currrentFYending;
            })[0];
            return _context8.abrupt("return", nectYearObject ? nectYearObject.code : (0, _utils.getCurrentFinancialYear)());

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](2);

            console.log(_context8.t0.message);

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[2, 12]]);
  }));

  return function getNextFinancialYearForRenewal(_x21) {
    return _ref8.apply(this, arguments);
  };
}();

var checkValidOwners = exports.checkValidOwners = function checkValidOwners() {
  var currentOwners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var oldOwners = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


  /*  Quick fix for the owner issue fix in renewal flow */

  //   for (var i = 0, len = currentOwners.length; i < len; i++) { 
  //     for (var j = 0, len2 = oldOwners.length; j < len2; j++) { 
  //         if (currentOwners[i].name === oldOwners[j].name) {
  //           oldOwners.splice(j, 1);
  //             len2=oldOwners.length;
  //         }
  //     }   
  // }
  // oldOwners=oldOwners&&Array.isArray(oldOwners)&&oldOwners.map(owner=>{
  //   return {...owner, userActive :false}
  // })
  // currentOwners=currentOwners&&Array.isArray(currentOwners)&&currentOwners.map(owner=>{
  //   return {...owner, userActive :true}
  // })

  return [].concat((0, _toConsumableArray3.default)(currentOwners));
};