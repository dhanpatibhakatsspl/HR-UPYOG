"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyResultsWODispatch = exports.getPropertyObj = exports.findAndReplace = exports.serviceConst = exports.getConsumptionDetails = exports.getDescriptionFromMDMS = exports.fetchBill = exports.getSearchResultsForSewerage = exports.getSearchResultsForCurrentBill = exports.findItemInArrayOfObject = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.applyTradeLicense = exports.getBoundaryData = exports.getBulkPdfRecords = exports.getGroupBillSearch = exports.getPaymentSearchResults = exports.getSearchResults = exports.getLocaleLabelsforTL = exports.updateTradeDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _utils = require("../ui-config/screens/specs/utils");

var _store = require("../ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _api = require("./api");

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
            return (0, _api.httpRequest)("post", "/tl-services/v1/_update", "", [], requestBody);

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
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            dispatch((0, _actions.toggleSpinner)());
            _context2.next = 4;
            return (0, _api.httpRequest)("post", "billing-service/bill/v2/_search", "", queryObject, {});

          case 4:
            response = _context2.sent;

            dispatch((0, _actions.toggleSpinner)());
            return _context2.abrupt("return", response);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);

            dispatch((0, _actions.toggleSpinner)());
            console.error(_context2.t0);
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelCode: _context2.t0.message }, "error"));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function getSearchResults(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getPaymentSearchResults = exports.getPaymentSearchResults = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject, dispatch) {
    var businessService, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            businessService = '';

            queryObject && Array.isArray(queryObject) && queryObject.map(function (query) {
              if (query.key == "businessService") {
                businessService = query.value;
              }
            });
            queryObject = queryObject && Array.isArray(queryObject) && queryObject.filter(function (query) {
              return query.key != "businessService";
            });
            _context3.next = 6;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)(businessService), "", queryObject);

          case 6:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);

            // enableFieldAndHideSpinner('search',"components.div.children.UCSearchCard.children.cardContent.children.buttonContainer.children.searchButton",dispatch);
            console.error(_context3.t0);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context3.t0.message, labelCode: _context3.t0.message }, "error"));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 10]]);
  }));

  return function getPaymentSearchResults(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var getGroupBillSearch = exports.getGroupBillSearch = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch, searchScreenObject) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            dispatch((0, _actions.toggleSpinner)());
            _context4.next = 4;
            return (0, _api.httpRequest)("post", searchScreenObject.url, "", [], { searchCriteria: searchScreenObject });

          case 4:
            response = _context4.sent;

            dispatch((0, _actions.toggleSpinner)());
            return _context4.abrupt("return", response);

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);

            dispatch((0, _actions.toggleSpinner)());
            console.error(_context4.t0);
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context4.t0.message, labelCode: _context4.t0.message }, "error"));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 9]]);
  }));

  return function getGroupBillSearch(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var getBulkPdfRecords = exports.getBulkPdfRecords = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dispatch) {
    var queryObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            dispatch((0, _actions.toggleSpinner)());
            _context5.next = 4;
            return (0, _api.httpRequest)("post", "pdf-service/v1/_getBulkPdfRecordsDetails", "", queryObject, {});

          case 4:
            response = _context5.sent;

            dispatch((0, _actions.toggleSpinner)());
            return _context5.abrupt("return", response);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);

            dispatch((0, _actions.toggleSpinner)());
            console.error(_context5.t0);
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context5.t0.message, labelCode: _context5.t0.message }, "error"));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 9]]);
  }));

  return function getBulkPdfRecords(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

var setDocsForEditFlow = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch) {
    var applicationDocuments, uploadedDocuments, fileStoreIds, fileUrlPayload;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            applicationDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);
            uploadedDocuments = {};
            fileStoreIds = applicationDocuments && applicationDocuments.map(function (item) {
              return item.fileStoreId;
            }).join(",");
            _context6.t0 = fileStoreIds;

            if (!_context6.t0) {
              _context6.next = 8;
              break;
            }

            _context6.next = 7;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 7:
            _context6.t0 = _context6.sent;

          case 8:
            fileUrlPayload = _context6.t0;

            applicationDocuments && applicationDocuments.forEach(function (item, index) {
              uploadedDocuments[index] = [{
                fileName: fileUrlPayload && fileUrlPayload[item.fileStoreId] && decodeURIComponent(fileUrlPayload[item.fileStoreId].split(",")[0].split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1),
                fileStoreId: item.fileStoreId,
                fileUrl: Object.values(fileUrlPayload)[index],
                documentType: item.documentType,
                tenantId: item.tenantId,
                id: item.id
              }];
            });
            dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].uploadedDocsInRedux", uploadedDocuments));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function setDocsForEditFlow(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

var getBoundaryData = exports.getBoundaryData = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(action, state, dispatch, queryObject, tenantId
  // componentPath
  ) {
    var payload, mohallaData;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", queryObject, {});

          case 3:
            payload = _context7.sent;

            // process.env.REACT_APP_NAME === "Employee"
            //   ? get(
            //       state.screenConfiguration.preparedFinalObject,
            //       "Licenses[0].tradeLicenseDetail.address.city"
            //     )
            //   : getQueryArg(window.location.href, "tenantId");
            mohallaData = payload && payload.TenantBoundary[0] && payload.TenantBoundary[0].boundary && payload.TenantBoundary[0].boundary.reduce(function (result, item) {
              result.push((0, _extends3.default)({}, item, {
                name: tenantId.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
              }));
              return result;
            }, []);


            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData.localities", mohallaData));
            _context7.next = 10;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 8]]);
  }));

  return function getBoundaryData(_x12, _x13, _x14, _x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();

var createOwnersBackup = function createOwnersBackup(dispatch, payload) {
  var owners = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.owners");
  owners && owners.length > 0 && dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.owners", JSON.parse(JSON.stringify(owners))));
};

var getMultiUnits = function getMultiUnits(multiUnits) {
  var hasTradeType = false;
  var hasAccessoryType = false;

  var mergedUnits = multiUnits && multiUnits.reduce(function (result, item) {
    hasTradeType = item.hasOwnProperty("tradeType");
    hasAccessoryType = item.hasOwnProperty("accessoryCategory");
    if (item && item !== null && (hasTradeType || hasAccessoryType)) {
      if (item.hasOwnProperty("id")) {
        if (item.hasOwnProperty("active") && item.active) {
          if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
            (0, _set2.default)(item, "active", false);
            result.push(item);
          } else {
            result.push(item);
          }
        }
      } else {
        if (!item.hasOwnProperty("isDeleted")) {
          result.push(item);
        }
      }
    }
    return result;
  }, []);

  return mergedUnits;
};

// const getMultipleAccessories = licenses => {
//   let accessories = get(licenses, "tradeLicenseDetail.accessories");
//   let mergedAccessories =
//     accessories &&
//     accessories.reduce((result, item) => {
//       if (item && item !== null && item.hasOwnProperty("accessoryCategory")) {
//         if (item.hasOwnProperty("id")) {
//           if (item.hasOwnProperty("active") && item.active) {
//             if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
//               set(item, "active", false);
//               result.push(item);
//             } else {
//               result.push(item);
//             }
//           }
//         } else {
//           if (!item.hasOwnProperty("isDeleted")) {
//             result.push(item);
//           }
//         }
//       }
//       return result;
//     }, []);

//   return mergedAccessories;
// };

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
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(state, dispatch, activeIndex) {
    var queryObject, documents, owners, cityId, tenantId, BSqueryObject, currentFinancialYr, fY1, accessories, tradeUnits, action, isEditFlow, searchQueryObject, searchResponse, updatedtradeUnits, tradeTemp, _accessories, _tradeUnits, mergedTradeUnits, mergedAccessories, mergedOwners, response;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            queryObject = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses", [])));
            documents = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments");

            (0, _set2.default)(queryObject[0], "validFrom", (0, _utils.convertDateToEpoch)(queryObject[0].validFrom, "dayend"));
            (0, _set2.default)(queryObject[0], "wfDocuments", documents);
            (0, _set2.default)(queryObject[0], "validTo", (0, _utils.convertDateToEpoch)(queryObject[0].validTo, "dayend"));
            if (queryObject[0] && queryObject[0].commencementDate) {
              queryObject[0].commencementDate = (0, _utils.convertDateToEpoch)(queryObject[0].commencementDate, "dayend");
            }
            owners = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.owners");

            owners = owners && convertOwnerDobToEpoch(owners) || [];

            //set(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));
            cityId = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.address.tenantId", "");
            tenantId = (0, _utils.ifUserRoleExists)("CITIZEN") ? cityId : (0, _localStorageUtils.getTenantId)();
            BSqueryObject = [{ key: "tenantId", value: tenantId }, { key: "businessService", value: "newTL" }];

            if (process.env.REACT_APP_NAME === "Citizen") {
              currentFinancialYr = (0, _utils.getCurrentFinancialYear)();
              //Changing the format of FY

              fY1 = currentFinancialYr.split("-")[1];

              fY1 = fY1.substring(2, 4);
              currentFinancialYr = currentFinancialYr.split("-")[0] + "-" + fY1;
              (0, _set2.default)(queryObject[0], "financialYear", currentFinancialYr);
              (0, _commons.setBusinessServiceDataToLocalStorage)(BSqueryObject, dispatch);
            }

            (0, _set2.default)(queryObject[0], "tenantId", tenantId);

            if (!queryObject[0].applicationNumber) {
              _context8.next = 39;
              break;
            }

            //call update

            accessories = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.accessories");
            tradeUnits = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits");

            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits", getMultiUnits(tradeUnits));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.accessories", getMultiUnits(accessories));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));

            action = "INITIATE";

            if (queryObject[0].tradeLicenseDetail && queryObject[0].tradeLicenseDetail.applicationDocuments) {
              if ((0, _commons.getQueryArg)(window.location.href, "action") === "edit") {
                // const removedDocs = get(
                //   state.screenConfiguration.preparedFinalObject,
                //   "LicensesTemp[0].removedDocs",
                //   []
                // );
                // set(queryObject[0], "tradeLicenseDetail.applicationDocuments", [
                //   ...get(
                //     state.screenConfiguration.prepareFinalObject,
                //     "Licenses[0].tradeLicenseDetail.applicationDocuments",
                //     []
                //   ),
                //   ...removedDocs
                // ]);
              } else if (activeIndex === 1) {
                alert("active index 1");

                (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
              } else action = "APPLY";
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
            (0, _set2.default)(queryObject[0], "action", action);
            isEditFlow = (0, _commons.getQueryArg)(window.location.href, "action") === "edit";
            _context8.t0 = !isEditFlow;

            if (!_context8.t0) {
              _context8.next = 28;
              break;
            }

            _context8.next = 28;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_update", "", [], {
              Licenses: queryObject
            });

          case 28:
            searchQueryObject = [{ key: "tenantId", value: queryObject[0].tenantId }, { key: "applicationNumber", value: queryObject[0].applicationNumber }];
            _context8.next = 31;
            return getSearchResults(searchQueryObject);

          case 31:
            searchResponse = _context8.sent;

            if (isEditFlow) {
              searchResponse = { Licenses: queryObject };
            } else {
              dispatch((0, _actions.prepareFinalObject)("Licenses", searchResponse.Licenses));
            }
            updatedtradeUnits = (0, _get2.default)(searchResponse, "Licenses[0].tradeLicenseDetail.tradeUnits");
            tradeTemp = updatedtradeUnits.map(function (item, index) {
              return {
                tradeSubType: item.tradeType.split(".")[1],
                tradeType: item.tradeType.split(".")[0]
              };
            });

            dispatch((0, _actions.prepareFinalObject)("LicensesTemp.tradeUnits", tradeTemp));
            createOwnersBackup(dispatch, searchResponse);
            _context8.next = 54;
            break;

          case 39:
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
            _context8.next = 51;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_create", "", [], { Licenses: queryObject });

          case 51:
            response = _context8.sent;

            dispatch((0, _actions.prepareFinalObject)("Licenses", response.Licenses));
            createOwnersBackup(dispatch, response);

          case 54:
            /** Application no. box setting */
            setApplicationNumberBox(state, dispatch);
            return _context8.abrupt("return", true);

          case 58:
            _context8.prev = 58;
            _context8.t1 = _context8["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context8.t1.message }, "error"));
            return _context8.abrupt("return", false);

          case 62:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 58]]);
  }));

  return function applyTradeLicense(_x17, _x18, _x19) {
    return _ref8.apply(this, arguments);
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

var getSearchResultsForCurrentBill = exports.getSearchResultsForCurrentBill = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(queryObject) {
    var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var response, currentTime, result, waterSource, waterSubSource;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return (0, _api.httpRequest)("post", "/ws-services/wc/_search", "_search", queryObject);

          case 3:
            response = _context9.sent;

            if (!(response.WaterConnection && response.WaterConnection.length == 0)) {
              _context9.next = 6;
              break;
            }

            return _context9.abrupt("return", response);

          case 6:
            currentTime = new Date().getTime();

            if (filter) {
              response.WaterConnection = response.WaterConnection.filter(function (app) {
                return currentTime > app.dateEffectiveFrom && (app.applicationStatus == 'APPROVED' || app.applicationStatus == 'CONNECTION_ACTIVATED');
              });
              response.WaterConnection = response.WaterConnection.sort(function (row1, row2) {
                return row2.auditDetails.createdTime - row1.auditDetails.createdTime;
              });
            }

            result = findAndReplace(response, null, "NA");

            result.WaterConnection[0].waterSourceSubSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource;
            waterSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource.split(".")[0];
            waterSubSource = result.WaterConnection[0].waterSource.includes("null") ? "NA" : result.WaterConnection[0].waterSource.split(".")[1];

            result.WaterConnection[0].waterSource = waterSource;
            result.WaterConnection[0].waterSubSource = waterSubSource;
            _context9.next = 16;
            return getPropertyObj(result.WaterConnection);

          case 16:
            result.WaterConnection = _context9.sent;
            return _context9.abrupt("return", result);

          case 20:
            _context9.prev = 20;
            _context9.t0 = _context9["catch"](0);

          case 22:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 20]]);
  }));

  return function getSearchResultsForCurrentBill(_x20) {
    return _ref9.apply(this, arguments);
  };
}();

var getSearchResultsForSewerage = exports.getSearchResultsForSewerage = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(queryObject, dispatch) {
    var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var response, currentTime, result;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            dispatch((0, _actions.toggleSpinner)());
            _context10.prev = 1;
            _context10.next = 4;
            return (0, _api.httpRequest)("post", "/sw-services/swc/_search", "_search", queryObject);

          case 4:
            response = _context10.sent;

            if (!(response.SewerageConnections && response.SewerageConnections.length == 0)) {
              _context10.next = 8;
              break;
            }

            dispatch((0, _actions.toggleSpinner)());
            return _context10.abrupt("return", response);

          case 8:
            currentTime = new Date().getTime();

            if (filter) {
              response.SewerageConnections = response.SewerageConnections.filter(function (app) {
                return currentTime > app.dateEffectiveFrom && (app.applicationStatus == 'APPROVED' || app.applicationStatus == 'CONNECTION_ACTIVATED');
              });
              response.SewerageConnections = response.SewerageConnections.sort(function (row1, row2) {
                return row2.auditDetails.createdTime - row1.auditDetails.createdTime;
              });
            }
            result = findAndReplace(response, null, "NA");
            _context10.next = 13;
            return getPropertyObj(result.SewerageConnections);

          case 13:
            result.SewerageConnections = _context10.sent;

            dispatch((0, _actions.toggleSpinner)());
            return _context10.abrupt("return", result);

          case 18:
            _context10.prev = 18;
            _context10.t0 = _context10["catch"](1);

            dispatch((0, _actions.toggleSpinner)());

          case 21:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 18]]);
  }));

  return function getSearchResultsForSewerage(_x22, _x23) {
    return _ref10.apply(this, arguments);
  };
}();

var fetchBill = exports.fetchBill = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(queryObject, dispatch) {
    var replaceWithNA = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var response;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            dispatch((0, _actions.toggleSpinner)());
            _context11.prev = 1;
            _context11.next = 4;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "_fetchBill", queryObject);

          case 4:
            response = _context11.sent;

            dispatch((0, _actions.toggleSpinner)());

            if (replaceWithNA) {
              _context11.next = 8;
              break;
            }

            return _context11.abrupt("return", response);

          case 8:
            return _context11.abrupt("return", findAndReplace(response, null, "NA"));

          case 11:
            _context11.prev = 11;
            _context11.t0 = _context11["catch"](1);

            dispatch((0, _actions.toggleSpinner)());
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context11.t0.message, labelCode: _context11.t0.message }, "error"));

          case 15:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[1, 11]]);
  }));

  return function fetchBill(_x25, _x26) {
    return _ref11.apply(this, arguments);
  };
}();

var getDescriptionFromMDMS = exports.getDescriptionFromMDMS = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(requestBody, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            dispatch((0, _actions.toggleSpinner)());
            _context12.prev = 1;
            _context12.next = 4;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody);

          case 4:
            response = _context12.sent;

            dispatch((0, _actions.toggleSpinner)());
            return _context12.abrupt("return", findAndReplace(response, null, "NA"));

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](1);

            dispatch((0, _actions.toggleSpinner)());
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context12.t0.message, labelCode: _context12.t0.message }, "error"));

          case 13:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[1, 9]]);
  }));

  return function getDescriptionFromMDMS(_x28, _x29) {
    return _ref12.apply(this, arguments);
  };
}();

var getConsumptionDetails = exports.getConsumptionDetails = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            dispatch((0, _actions.toggleSpinner)());
            _context13.prev = 1;
            _context13.next = 4;
            return (0, _api.httpRequest)("post", "/ws-calculator/meterConnection/_search", "_search", queryObject);

          case 4:
            response = _context13.sent;

            dispatch((0, _actions.toggleSpinner)());
            return _context13.abrupt("return", findAndReplace(response, null, "NA"));

          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13["catch"](1);

            dispatch((0, _actions.toggleSpinner)());
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context13.t0.message, labelCode: _context13.t0.message }, "error"));

          case 13:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[1, 9]]);
  }));

  return function getConsumptionDetails(_x30, _x31) {
    return _ref13.apply(this, arguments);
  };
}();

var serviceConst = exports.serviceConst = {
  "WATER": "WATER",
  "SEWERAGE": "SEWERAGE"
};

var findAndReplace = exports.findAndReplace = function findAndReplace(obj, oldValue, newValue) {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] instanceof Object || obj[key] instanceof Array) findAndReplace(obj[key], oldValue, newValue);
    obj[key] = obj[key] === oldValue ? newValue : obj[key];
  });
  return obj;
};

var getPropertyObj = exports.getPropertyObj = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(waterConnection, locality, tenantId, isFromSearch) {
    var uuidsArray, uuids, propertyArr, i, queryObject1, payload, j, tempPropertyObj;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            uuidsArray = [];
            uuids = "";
            propertyArr = [];
            i = 0;

          case 4:
            if (!(i < waterConnection.length)) {
              _context14.next = 26;
              break;
            }

            if (!(waterConnection[i].propertyId && waterConnection[i].propertyId !== null && waterConnection[i].propertyId !== "NA")) {
              _context14.next = 22;
              break;
            }

            if (!uuidsArray.includes(waterConnection[i]['propertyId'])) {
              uuidsArray.push(waterConnection[i]['propertyId']);
              uuids += waterConnection[i]['propertyId'] + ",";
            }

            if (!(uuidsArray.length % 50 === 0 || uuidsArray.length > 0 && i === waterConnection.length - 1)) {
              _context14.next = 20;
              break;
            }

            queryObject1 = [];

            uuids = uuids.substring(0, uuids.length - 1);
            if (process.env.REACT_APP_NAME === "Citizen") {
              queryObject1 = [{ key: "propertyIds", value: uuids }];
            } else {
              queryObject1 = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantIdCommon)() }, { key: "propertyIds", value: uuids }];
            }

            if (locality) {
              queryObject1.push({ key: "locality", value: locality });
            }
            if (tenantId) {
              queryObject1.push({ key: "tenantId", value: tenantId });
            }

            if (!(!window.location.href.includes("propertyId") || isFromSearch)) {
              _context14.next = 18;
              break;
            }

            _context14.next = 16;
            return getPropertyResultsWODispatch(queryObject1);

          case 16:
            payload = _context14.sent;

            if (payload.Properties.length > 0) {
              for (j = 0; j < payload.Properties.length; j++) {
                propertyArr[payload.Properties[j].propertyId] = payload.Properties[j];
              }
            }

          case 18:
            uuids = "";
            uuidsArray = [];

          case 20:
            _context14.next = 23;
            break;

          case 22:
            waterConnection[i].property = null;

          case 23:
            i++;
            _context14.next = 4;
            break;

          case 26:
            tempPropertyObj = null;

            if (Object.keys(propertyArr).length > 0) {
              for (i = 0; i < waterConnection.length; i++) {
                if (waterConnection[i].propertyId && waterConnection[i].propertyId !== null && waterConnection[i].propertyId !== "NA") {
                  if (propertyArr[waterConnection[i].propertyId]) {
                    tempPropertyObj = propertyArr[waterConnection[i].propertyId] ? propertyArr[waterConnection[i].propertyId] : null;
                    waterConnection[i].property = tempPropertyObj;
                    waterConnection[i].tenantId = tempPropertyObj && tempPropertyObj.tenantId ? tempPropertyObj.tenantId : null;
                    tempPropertyObj = null;
                  }
                }
              }
            }
            if ((0, _get2.default)(waterConnection[0], "property.owners")) {
              waterConnection[0].property.owners = waterConnection[0].property.owners.filter(function (owner) {
                return owner.status == "ACTIVE";
              });
            }
            if ((0, _get2.default)(waterConnection[0], "property.units") == "NA" && (0, _get2.default)(waterConnection[0], "property.additionalDetails") && (0, _get2.default)(waterConnection[0], "property.additionalDetails.subUsageCategory")) {
              waterConnection[0].property.units = [];
              waterConnection[0].property.units.push({ usageCategory: (0, _get2.default)(waterConnection[0], "property.additionalDetails.subUsageCategory") });
            }
            return _context14.abrupt("return", waterConnection);

          case 31:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function getPropertyObj(_x32, _x33, _x34, _x35) {
    return _ref14.apply(this, arguments);
  };
}();

var getPropertyResultsWODispatch = exports.getPropertyResultsWODispatch = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return (0, _api.httpRequest)("post", "/property-services/property/_search", "_search", queryObject);

          case 3:
            response = _context15.sent;
            return _context15.abrupt("return", findAndReplace(response, null, "NA"));

          case 7:
            _context15.prev = 7;
            _context15.t0 = _context15["catch"](0);

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[0, 7]]);
  }));

  return function getPropertyResultsWODispatch(_x36) {
    return _ref15.apply(this, arguments);
  };
}();