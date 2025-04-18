"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadReceipt = exports.getFileUrlFromAPI = exports.fetchAssessments = exports.fetchReceipt = exports.fetchTotalBillAmount = exports.getSingleAssesmentandStatus = exports.getAssesmentsandStatus = exports.fetchReceipts = exports.fetchProperties = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("egov-common/ui-utils/commons");

var _propertyCreateUtils = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyCreateUtils");

var _actions = require("egov-ui-kit/redux/app/actions");

var _api = require("egov-ui-kit/utils/api");

var _commons2 = require("egov-ui-kit/utils/commons");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reset_property_reset = function reset_property_reset() {
  return {
    type: actionTypes.RESET_PROPERTY_STATE
  };
};

var propertyFetchPending = function propertyFetchPending() {
  return {
    type: actionTypes.PROPERTY_FETCH_PENDING
  };
};

var fetchBillPending = function fetchBillPending() {
  return {
    type: actionTypes.PROPERTY_FETCH_BILL_PENDING
  };
};

var fetchBillComplete = function fetchBillComplete(payload) {
  return {
    type: actionTypes.PROPERTY_FETCH_BILL_COMPLETE,
    payload: payload
  };
};

var fetchBillError = function fetchBillError(error) {
  return {
    type: actionTypes.PROPERTY_FETCH_BILL_ERROR,
    error: error
  };
};

var fetchReceiptPending = function fetchReceiptPending() {
  return {
    type: actionTypes.PROPERTY_FETCH_RECEIPT_PENDING
  };
};

var fetchReceiptComplete = function fetchReceiptComplete(payload) {
  return {
    type: actionTypes.PROPERTY_FETCH_RECEIPT_COMPLETE,
    payload: payload
  };
};

var fetchReceiptError = function fetchReceiptError(error) {
  return {
    type: actionTypes.PROPERTY_FETCH_RECEIPT_ERROR,
    error: error
  };
};
var fetchAssessmentsPending = function fetchAssessmentsPending() {
  return {
    type: actionTypes.PROPERTY_FETCH_ASSESSMENTS_PENDING
  };
};

var fetchAssessmentsComplete = function fetchAssessmentsComplete(payload) {
  return {
    type: actionTypes.PROPERTY_FETCH_ASSESSMENTS_COMPLETE,
    payload: payload
  };
};

var fetchAssessmentsError = function fetchAssessmentsError(error) {
  return {
    type: actionTypes.PROPERTY_FETCH_ASSESSMENTS_ERROR,
    error: error
  };
};

var downloadReceiptPending = function downloadReceiptPending() {
  return {
    type: actionTypes.PROPERTY_DOWNLOAD_RECEIPT_PENDING
  };
};

var downloadReceiptComplete = function downloadReceiptComplete(payload) {
  return {
    type: actionTypes.PROPERTY_DOWNLOAD_RECEIPT_COMPLETE,
    payload: payload
  };
};

var downloadReceiptError = function downloadReceiptError(error) {
  return {
    type: actionTypes.PROPERTY_DOWNLOAD_RECEIPT_ERROR,
    error: error
  };
};

var draftFetchPending = function draftFetchPending() {
  return {
    type: actionTypes.DRAFT_FETCH_PENDING
  };
};

var propertyFetchComplete = function propertyFetchComplete(payload, overWrite) {
  return {
    type: actionTypes.PROPERTY_FETCH_COMPLETE,
    payload: payload
  };
};

var draftFetchComplete = function draftFetchComplete(payload) {
  return {
    type: actionTypes.DRAFT_FETCH_COMPLETE,
    payload: payload
  };
};

var propertyFetchError = function propertyFetchError(error) {
  return {
    type: actionTypes.PROPERTY_FETCH_ERROR,
    error: error
  };
};
var draftFetchError = function draftFetchError(error) {
  return {
    type: actionTypes.DRAFT_FETCH_ERROR,
    error: error
  };
};

var failedTransactionFetchError = function failedTransactionFetchError(error) {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_ERROR,
    error: error
  };
};
var failedTransactionFetchComplete = function failedTransactionFetchComplete(payload) {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_COMPLETE,
    payload: payload
  };
};
var failedTransactionFetchPending = function failedTransactionFetchPending() {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_PENDING
  };
};
var successTransactionFetchError = function successTransactionFetchError(error) {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_ERROR,
    error: error
  };
};
var successTransactionFetchComplete = function successTransactionFetchComplete(payload) {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_COMPLETE,
    payload: payload
  };
};
var successTransactionFetchPending = function successTransactionFetchPending() {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_PENDING
  };
};

var ReceiptFetchError = function ReceiptFetchError(error) {
  return {
    type: actionTypes.RECEIPT_FETCH_ERROR,
    error: error
  };
};
var ReceiptFetchComplete = function ReceiptFetchComplete(payload) {
  return {
    type: actionTypes.RECEIPT_FETCH_COMPLETE,
    payload: payload
  };
};
var ReceiptFetchPending = function ReceiptFetchPending() {
  return {
    type: actionTypes.RECEIPT_FETCH_PENDING
  };
};

var AssessmentStatusFetchError = function AssessmentStatusFetchError(error) {
  return {
    type: actionTypes.ASSESSMENT_STATUS_ERROR,
    error: error
  };
};
var AssessmentStatusFetchComplete = function AssessmentStatusFetchComplete(payload) {
  return {
    type: actionTypes.ASSESSMENT_STATUS_COMPLETE,
    payload: payload
  };
};
var AssessmentStatusFetchPending = function AssessmentStatusFetchPending() {
  return {
    type: actionTypes.ASSESSMENT_STATUS_PENDING
  };
};

var SingleAssessmentStatusFetchPending = function SingleAssessmentStatusFetchPending() {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_PENDING
  };
};
var SingleAssessmentStatusFetchError = function SingleAssessmentStatusFetchError(error) {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_ERROR,
    error: error
  };
};
var SingleAssessmentStatusFetchComplete = function SingleAssessmentStatusFetchComplete(payload) {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_COMPLETE,
    payload: payload
  };
};

var mohallaFetchComplete = function mohallaFetchComplete(payload) {
  return {
    type: actionTypes.MOHALLA_FETCH_COMPLETE,
    payload: payload
  };
};

var fetchMohalla = function fetchMohalla(queryObj) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var mergedMohallas, i, payload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              mergedMohallas = [];
              i = 0;

            case 3:
              if (!(i < queryObj.length)) {
                _context.next = 11;
                break;
              }

              _context.next = 6;
              return (0, _api.httpRequest)(_endPoints.BOUNDARY.GET.URL, _endPoints.BOUNDARY.GET.ACTION, queryObj[i]);

            case 6:
              payload = _context.sent;

              if (payload && payload.TenantBoundary) {
                mergedMohallas.push.apply(mergedMohallas, (0, _toConsumableArray3.default)(payload.TenantBoundary[0].boundary));
              }

            case 8:
              i++;
              _context.next = 3;
              break;

            case 11:
              dispatch(mohallaFetchComplete(mergedMohallas));
              _context.next = 16;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 14]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var setMohallaInRedux = function setMohallaInRedux(dispatch, state, draftResponse) {
  var tenantId = (0, _get2.default)(draftResponse, "drafts[0].tenantId");

  var _ref2 = draftResponse || {},
      drafts = _ref2.drafts;

  var mohallaCodes = drafts && drafts.reduce(function (result, current) {
    if (current.draftRecord && current.draftRecord.prepareFormData) {
      if (!result[current.tenantId]) result[current.tenantId] = [];
      if ((0, _get2.default)(current, "draftRecord.prepareFormData.Properties[0].address.locality.code") && result[current.tenantId].indexOf((0, _get2.default)(current, "draftRecord.prepareFormData.Properties[0].address.locality.code")) === -1) {
        result[current.tenantId].push((0, _get2.default)(current, "draftRecord.prepareFormData.Properties[0].address.locality.code"));
      }
    }
    return result;
  }, {});
  var queryObj = Object.keys(mohallaCodes).map(function (item) {
    return [{
      key: "tenantId",
      value: item
    }, {
      key: "hierarchyTypeCode",
      value: "REVENUE"
    }, {
      key: "boundaryType",
      value: "Locality"
    }, {
      key: "codes",
      value: mohallaCodes[item].join(",")
    }];
  });
  dispatch(fetchMohalla(queryObj));
};

var fetchProperties = exports.fetchProperties = function fetchProperties(queryObjectproperty, queryObjectDraft, queryObjectFailedPayments, queryObjectSuccessPayments) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, getState) {
      var draftpayload, payloadProperty, convertedProperties, payloadFailedPayments, payloadSuccessPayments;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!queryObjectDraft) {
                _context2.next = 13;
                break;
              }

              dispatch(draftFetchPending());
              _context2.prev = 2;
              _context2.next = 5;
              return (0, _api.httpRequest)(_endPoints.DRAFT.GET.URL, _endPoints.DRAFT.GET.ACTION, queryObjectDraft);

            case 5:
              draftpayload = _context2.sent;

              setMohallaInRedux(dispatch, getState(), draftpayload);
              dispatch(draftFetchComplete(draftpayload));
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](2);

              dispatch(draftFetchError(_context2.t0.message));

            case 13:
              if (!queryObjectproperty) {
                _context2.next = 37;
                break;
              }

              dispatch(propertyFetchPending());
              _context2.prev = 15;
              _context2.next = 18;
              return (0, _api.httpRequest)(_endPoints.PROPERTY.GET.URL, _endPoints.PROPERTY.GET.ACTION, queryObjectproperty, {}, [], {}, true);

            case 18:
              payloadProperty = _context2.sent;

              if (!(queryObjectDraft !== "citizen_search")) {
                _context2.next = 31;
                break;
              }

              if (payloadProperty && payloadProperty.Properties && payloadProperty.Properties.length > 0) {
                convertedProperties = payloadProperty.Properties.map(function (property) {
                  // property.owners.reverse(); // Owner is coming in reverse order from the API
                  var properties = (0, _propertyCreateUtils.getCreatePropertyResponse)({ Properties: [property] });
                  return properties && properties.Properties && properties.Properties.length > 0 && properties.Properties[0];
                });

                payloadProperty.Properties = convertedProperties;
              }

              if (!(payloadProperty.Properties && payloadProperty.Properties[0] && payloadProperty.Properties[0].documents && queryObjectproperty != [])) {
                _context2.next = 28;
                break;
              }

              _context2.next = 24;
              return (0, _propertyCreateUtils.setPTDocuments)(payloadProperty, "Properties[0].documents", "documentsUploaded", dispatch, 'PT');

            case 24:
              payloadProperty.Properties[0].documentsUploaded = _context2.sent;

              dispatch(propertyFetchComplete(payloadProperty));
              _context2.next = 29;
              break;

            case 28:
              dispatch(propertyFetchComplete(payloadProperty));

            case 29:
              _context2.next = 32;
              break;

            case 31:
              dispatch(propertyFetchComplete(payloadProperty));

            case 32:
              _context2.next = 37;
              break;

            case 34:
              _context2.prev = 34;
              _context2.t1 = _context2["catch"](15);

              dispatch(propertyFetchError(_context2.t1.message));

            case 37:
              if (!queryObjectFailedPayments) {
                _context2.next = 49;
                break;
              }

              dispatch(failedTransactionFetchPending());
              _context2.prev = 39;
              _context2.next = 42;
              return (0, _api.httpRequest)(_endPoints.PGService.GET.URL, _endPoints.PGService.GET.ACTION, queryObjectFailedPayments, {}, [], {}, true);

            case 42:
              payloadFailedPayments = _context2.sent;

              dispatch(failedTransactionFetchComplete(payloadFailedPayments));
              _context2.next = 49;
              break;

            case 46:
              _context2.prev = 46;
              _context2.t2 = _context2["catch"](39);

              dispatch(failedTransactionFetchError(_context2.t2.message));

            case 49:
              if (!queryObjectSuccessPayments) {
                _context2.next = 61;
                break;
              }

              dispatch(successTransactionFetchPending());
              _context2.prev = 51;
              _context2.next = 54;
              return (0, _api.httpRequest)(_endPoints.PGService.GET.URL, _endPoints.PGService.GET.ACTION, queryObjectSuccessPayments, {}, [], {}, true);

            case 54:
              payloadSuccessPayments = _context2.sent;

              dispatch(successTransactionFetchComplete(payloadSuccessPayments));
              _context2.next = 61;
              break;

            case 58:
              _context2.prev = 58;
              _context2.t3 = _context2["catch"](51);

              dispatch(successTransactionFetchError(_context2.t3.message));

            case 61:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[2, 10], [15, 34], [39, 46], [51, 58]]);
    }));

    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var fetchReceipts = exports.fetchReceipts = function fetchReceipts(queryObj) {
  return function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch) {
      var payloadReceipts;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch(ReceiptFetchPending());
              _context3.prev = 1;
              _context3.next = 4;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, queryObj, {}, [], {
                ts: 0
              });

            case 4:
              payloadReceipts = _context3.sent;

              dispatch(ReceiptFetchComplete(payloadReceipts));
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);

              dispatch(ReceiptFetchError(_context3.t0.message));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[1, 8]]);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var getStatusAndAmount = function getStatusAndAmount(receiptArrayItem) {
  var receiptTransformed = receiptArrayItem.reduce(function (result, current) {
    if (!result.totalAmount) result.totalAmount = 0;
    result.totalAmount += current.amountPaid;
    result.totalAmountToPay = receiptArrayItem[receiptArrayItem.length - 1].totalAmount;
    return result;
  }, {});
  if (receiptTransformed.totalAmount === receiptTransformed.totalAmountToPay) {
    receiptTransformed["status"] = "Paid";
  } else {
    receiptTransformed["status"] = "Partially Paid";
  }
  return receiptTransformed;
};
var getFinancialYear = function getFinancialYear(fromDate, toDate) {
  var financialYear = '';
  financialYear = new Date(fromDate).getFullYear() + '-' + String(new Date(toDate).getFullYear()).slice(2);
  return financialYear;
};
var getYearlyAssessments = function getYearlyAssessments() {
  var propertiesArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var yearlyAssessments = [];
  propertiesArray && propertiesArray.map(function (property) {
    if (yearlyAssessments.length == 0) {
      yearlyAssessments[0] = [property];
    } else {
      var bool = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = yearlyAssessments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pty = _step.value;

          if (pty[0].financialYear == property.financialYear) {
            pty.push(property);
            bool = false;
          }
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

      if (bool) {
        yearlyAssessments.push([property]);
      }
    }
  });
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = yearlyAssessments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var eachYrAssessments = _step2.value;

      eachYrAssessments.sort(function (x, y) {
        return y.receiptDate - x.receiptDate;
      });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  yearlyAssessments.sort(function (x, y) {
    return x[0].financialYear.localeCompare(y[0].financialYear);
  });
  return yearlyAssessments;
};
var mergeReceiptsInProperty = function mergeReceiptsInProperty(receiptsArray, propertyObj) {
  var transformedPropertyObj = (0, _extends3.default)({}, propertyObj);
  Object.keys(receiptsArray).forEach(function (item) {
    if (transformedPropertyObj.hasOwnProperty(item)) {
      transformedPropertyObj[item].receiptInfo = getStatusAndAmount((0, _orderBy2.default)(receiptsArray[item], "totalAmount", "asc"));
    }
  });
  var mergedReceiptsProperties = Object.values(transformedPropertyObj).filter(function (property) {
    return property.receiptInfo;
  });
  var groupByPropertyId = mergedReceiptsProperties.reduce(function (res, item) {
    if (!res[item.propertyId]) res[item.propertyId] = {};
    if (!res[item.propertyId][item.financialYear]) res[item.propertyId][item.financialYear] = [];
    res[item.propertyId][item.financialYear].push(item);
    return res;
  }, {});
  for (var propertyId in groupByPropertyId) {
    for (var year in groupByPropertyId[propertyId]) {
      var assessmentByDate = (0, _orderBy2.default)(groupByPropertyId[propertyId][year], "assessmentDate", "asc");

      // if (assessmentByDate.findIndex((item) => item.receiptInfo.status === "Paid") > -1) {
      for (var i = 0; i < assessmentByDate.length; i++) {
        if (i !== assessmentByDate.length - 1) {
          if (assessmentByDate[i].receiptInfo.status === "Partially Paid") {
            assessmentByDate[i].receiptInfo.status = "Completed";
          } else {
            assessmentByDate[i].receiptInfo.status = "Paid-Disable";
          }
        }
      }
      // }
    }
  }
  return mergedReceiptsProperties;
};

var getAssesmentsandStatus = exports.getAssesmentsandStatus = function getAssesmentsandStatus(queryObjectproperty) {
  return function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch) {
      var payloadProperty, propertybyId, consumerCodes, finalcc, commaSeperatedCC, payloadReceipts, receiptbyId, receiptDetails, receiptDetailsArray, arr;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch(AssessmentStatusFetchPending());
              _context4.prev = 1;
              _context4.next = 4;
              return (0, _api.httpRequest)(_endPoints.PROPERTY.GET.URL, _endPoints.PROPERTY.GET.ACTION, queryObjectproperty);

            case 4:
              payloadProperty = _context4.sent;
              propertybyId = (0, _commons2.transformById)(payloadProperty["Properties"], "propertyId");
              consumerCodes = propertybyId && Object.values(propertybyId).reduce(function (result, curr) {
                var propertyDetail = curr && curr.propertyDetails && curr.propertyDetails.reduce(function (consumerCodes, item) {
                  consumerCodes["" + curr.propertyId] = (0, _extends3.default)({}, item, {
                    propertyId: curr.propertyId,
                    address: curr.address,
                    tenantId: curr.tenantId,
                    property: curr
                  });
                  return consumerCodes;
                }, []);

                result.push(propertyDetail);
                return result;
              }, []);
              finalcc = consumerCodes && consumerCodes.reduce(function (acc, curr) {
                Object.keys(curr).map(function (item) {
                  acc[item] = curr[item];
                });
                return acc;
              }, {});
              commaSeperatedCC = Object.keys(finalcc).join(",");
              _context4.next = 11;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, [{ key: "consumerCode", value: commaSeperatedCC.split(':')[0] }], {}, [], {
                ts: 0
              }, true);

            case 11:
              payloadReceipts = _context4.sent;
              receiptbyId = (0, _commons2.transformById)(payloadReceipts["Receipt"], "transactionId");
              receiptDetails = receiptbyId && Object.values(receiptbyId).reduce(function (acc, curr) {
                if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
                acc[curr.Bill[0].billDetails[0].consumerCode].push({
                  amountPaid: curr.Bill[0].billDetails[0].amountPaid,
                  consumerCode: curr.Bill[0].billDetails[0].consumerCode,
                  totalAmount: curr.Bill[0].billDetails[0].totalAmount
                });
                return acc;
              }, {});
              receiptDetailsArray = receiptbyId && Object.values(receiptbyId).reduce(function (acc, curr) {
                if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
                acc[curr.Bill[0].billDetails[0].consumerCode].push({
                  amountPaid: curr.Bill[0].billDetails[0].amountPaid,
                  consumerCode: curr.Bill[0].billDetails[0].consumerCode,
                  totalAmount: curr.Bill[0].billDetails[0].totalAmount,
                  fromPeriod: curr.Bill[0].billDetails[0].fromPeriod,
                  toPeriod: curr.Bill[0].billDetails[0].toPeriod,
                  receiptDate: curr.Bill[0].billDetails[0].receiptDate
                });
                return acc;
              }, {});
              arr = [mergeReceiptsInProperty(receiptDetails, finalcc), { receiptDetailsArray: receiptDetailsArray }];

              dispatch(AssessmentStatusFetchComplete(arr));
              _context4.next = 22;
              break;

            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](1);

              dispatch(AssessmentStatusFetchError(_context4.t0.message));

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 19]]);
    }));

    return function (_x6) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var getSingleAssesmentandStatus = exports.getSingleAssesmentandStatus = function getSingleAssesmentandStatus(queryObjectproperty) {
  return function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dispatch) {
      var latestPropertyDetails, consumerCodes, finalcc, payloadReceipts, payloadWithReceiptAsId, receiptbyId, receiptDetails, receiptDetailArray, receiptDetailsArray, arr;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dispatch(SingleAssessmentStatusFetchPending());
              _context5.prev = 1;
              latestPropertyDetails = queryObjectproperty && queryObjectproperty.propertyDetails && (0, _PTCommon.getLatestPropertyDetails)(queryObjectproperty.propertyDetails);
              consumerCodes = queryObjectproperty && queryObjectproperty.propertyDetails && queryObjectproperty.propertyDetails.reduce(function (acc, item) {
                acc["" + queryObjectproperty.propertyId] = (0, _extends3.default)({}, item, {
                  propertyId: queryObjectproperty.propertyId,
                  address: queryObjectproperty.address,
                  tenantId: queryObjectproperty.tenantId,
                  property: queryObjectproperty,
                  latestAssessmentNumber: latestPropertyDetails.assessmentNumber
                });
                return acc;
              }, {});
              finalcc = Object.keys(consumerCodes).join(",");
              _context5.next = 7;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, [{ key: "consumerCode", value: finalcc.split(':')[0] }], {}, [], {
                ts: 0
              }, true);

            case 7:
              payloadReceipts = _context5.sent;
              payloadWithReceiptAsId = (0, _cloneDeep2.default)(payloadReceipts["Receipt"]).filter(function (item) {
                return (0, _get2.default)(item, "Bill[0].billDetails[0].status", "").toLowerCase() !== "Cancelled";
              }).map(function (item) {
                item.receiptNumber = (0, _get2.default)(item, "Bill[0].billDetails[0].receiptNumber", "");
                return item;
              });
              receiptbyId = (0, _commons2.transformById)(payloadWithReceiptAsId, "receiptNumber");
              receiptDetails = receiptbyId && Object.values(receiptbyId).reduce(function (acc, curr) {
                if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
                acc[curr.Bill[0].billDetails[0].consumerCode].push({
                  amountPaid: curr.Bill[0].billDetails[0].amountPaid,
                  consumerCode: curr.Bill[0].billDetails[0].consumerCode,
                  totalAmount: curr.Bill[0].billDetails[0].totalAmount
                });
                return acc;
              }, {});
              receiptDetailArray = receiptbyId && Object.values(receiptbyId).reduce(function (acc, curr) {
                if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
                acc[curr.Bill[0].billDetails[0].consumerCode].push({
                  amountPaid: curr.Bill[0].billDetails[0].amountPaid,
                  consumerCode: curr.Bill[0].billDetails[0].consumerCode,
                  totalAmount: curr.Bill[0].billDetails[0].totalAmount,
                  fromPeriod: curr.Bill[0].billDetails[0].fromPeriod,
                  toPeriod: curr.Bill[0].billDetails[0].toPeriod,
                  receiptDate: curr.Bill[0].billDetails[0].receiptDate,
                  financialYear: getFinancialYear(curr.Bill[0].billDetails[0].fromPeriod, curr.Bill[0].billDetails[0].toPeriod)
                });
                return acc;
              }, {});
              receiptDetailsArray = receiptDetailArray && getYearlyAssessments(receiptDetailArray[finalcc]);
              arr = [mergeReceiptsInProperty(receiptDetails, finalcc), { receiptDetailsArray: receiptDetailsArray }];

              dispatch(SingleAssessmentStatusFetchComplete(arr));
              _context5.next = 20;
              break;

            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5["catch"](1);

              dispatch(SingleAssessmentStatusFetchError(_context5.t0.message));

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[1, 17]]);
    }));

    return function (_x7) {
      return _ref6.apply(this, arguments);
    };
  }();
};

var fetchTotalBillAmount = exports.fetchTotalBillAmount = function fetchTotalBillAmount(fetchBillQueryObject) {
  return function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dispatch) {
      var payloadProperty;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!fetchBillQueryObject) {
                _context6.next = 13;
                break;
              }

              dispatch(fetchBillPending());
              _context6.prev = 2;
              _context6.next = 5;
              return (0, _api.httpRequest)(_endPoints.FETCHBILL.GET.URL, _endPoints.FETCHBILL.GET.ACTION, fetchBillQueryObject);

            case 5:
              payloadProperty = _context6.sent;

              dispatch(fetchBillComplete(payloadProperty));
              _context6.next = 13;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](2);

              dispatch((0, _actions.toggleSnackbarAndSetText)(true, { labelName: _context6.t0.message, labelKey: _context6.t0.message }, _context6.t0.message && _context6.t0.message.includes && _context6.t0.message.includes("No Demands Found") ? "warning" : "error"));
              dispatch(fetchBillError(_context6.t0.message));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[2, 9]]);
    }));

    return function (_x8) {
      return _ref7.apply(this, arguments);
    };
  }();
};
var fetchReceipt = exports.fetchReceipt = function fetchReceipt(fetchReceiptQueryObject) {
  return function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(dispatch) {
      var businessService, payloadProperty;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!fetchReceiptQueryObject) {
                _context7.next = 15;
                break;
              }

              dispatch(fetchReceiptPending());
              _context7.prev = 2;
              businessService = '';

              fetchReceiptQueryObject && Array.isArray(fetchReceiptQueryObject) && fetchReceiptQueryObject.map(function (query) {
                if (query.key == "businessService") {
                  businessService = query.value;
                }
              });
              fetchReceiptQueryObject = fetchReceiptQueryObject && Array.isArray(fetchReceiptQueryObject) && fetchReceiptQueryObject.filter(function (query) {
                return query.key != "businessService";
              });

              _context7.next = 8;
              return (0, _api.httpRequest)((0, _commons2.getPaymentSearchAPI)(businessService), _endPoints.FETCHRECEIPT.GET.ACTION, fetchReceiptQueryObject);

            case 8:
              payloadProperty = _context7.sent;

              dispatch(fetchReceiptComplete(payloadProperty));
              _context7.next = 15;
              break;

            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](2);

              dispatch(fetchReceiptError(_context7.t0.message));

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[2, 12]]);
    }));

    return function (_x9) {
      return _ref8.apply(this, arguments);
    };
  }();
};
var fetchAssessments = exports.fetchAssessments = function fetchAssessments(fetchAssessmentsQueryObject) {
  return function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(dispatch) {
      var payloadProperty;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!fetchAssessmentsQueryObject) {
                _context8.next = 12;
                break;
              }

              dispatch(fetchAssessmentsPending());
              _context8.prev = 2;
              _context8.next = 5;
              return (0, _api.httpRequest)(_endPoints.FETCHASSESSMENTS.GET.URL, _endPoints.FETCHASSESSMENTS.GET.ACTION, fetchAssessmentsQueryObject);

            case 5:
              payloadProperty = _context8.sent;

              dispatch(fetchAssessmentsComplete(payloadProperty));
              _context8.next = 12;
              break;

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](2);

              dispatch(fetchAssessmentsError(_context8.t0.message));

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[2, 9]]);
    }));

    return function (_x10) {
      return _ref9.apply(this, arguments);
    };
  }();
};
var getFileUrlFromAPI = exports.getFileUrlFromAPI = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(fileStoreId) {
    var queryObject, fileUrl;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: (0, _formUtils.getCommonTenant)() }, { key: "fileStoreIds", value: fileStoreId }];
            _context9.prev = 1;
            _context9.next = 4;
            return (0, _api.httpRequest)("/filestore/v1/files/url", "", queryObject, {}, [], {}, false, true);

          case 4:
            fileUrl = _context9.sent;
            return _context9.abrupt("return", fileUrl);

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](1);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[1, 8]]);
  }));

  return function getFileUrlFromAPI(_x11) {
    return _ref10.apply(this, arguments);
  };
}();

/* Download Receipt using PDF service */
/* export const downloadReceipt = (receiptQueryString) => {
  return async (dispatch) => {
    if (receiptQueryString) {
      // dispatch(downloadReceiptPending());
      try {
        let businessService = '';
        receiptQueryString && Array.isArray(receiptQueryString) && receiptQueryString.map(query => {
          if (query.key == "businessService") {
            businessService = query.value;
          }
        })
        receiptQueryString = receiptQueryString && Array.isArray(receiptQueryString) && receiptQueryString.filter(query => query.key != "businessService")
       
        const payloadReceiptDetails = await httpRequest(getPaymentSearchAPI(businessService), FETCHRECEIPT.GET.ACTION, receiptQueryString);
  
        const oldFileStoreId = get(payloadReceiptDetails.Payments[0], "fileStoreId")
        const paymentStatus = get(payloadReceiptDetails.Payments[0], "paymentStatus")
        if (oldFileStoreId && paymentStatus!="CANCELLED") {
          downloadReceiptFromFilestoreID(oldFileStoreId, "download")
        }
        else if(oldFileStoreId && paymentStatus=="CANCELLED"){
          getFileUrlFromAPI(oldFileStoreId).then((fileRes) => {
            if(fileRes&&fileRes[oldFileStoreId]){
            var win = window.open(fileRes[oldFileStoreId], '_blank');
            win.focus();}
            else{
              download(payloadReceiptDetails.Payments,receiptQueryString[1].value.split('.')[0] )
            }
          });
        }
        else {
          download(payloadReceiptDetails.Payments,receiptQueryString[1].value.split('.')[0] )
        }
      } catch (error) {
        dispatch(downloadReceiptError(error.message));
      }
    }
  }
} */

/* Download Receipt using EGOV-PDF service */
var downloadReceipt = exports.downloadReceipt = function downloadReceipt(receiptQueryString) {
  return function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(dispatch) {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (receiptQueryString) {
                // dispatch(downloadReceiptPending());
                try {
                  (0, _commons.downloadConReceipt)(receiptQueryString, 'consolidatedreceipt', "PAYMENT", "PTRECEIPT-consolidated.pdf");
                } catch (error) {
                  dispatch(downloadReceiptError(error.message));
                }
              }

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function (_x12) {
      return _ref11.apply(this, arguments);
    };
  }();
};

var download = function download(Payments, tenant) {
  var queryStr = [{ key: "key", value: "consolidatedreceipt" }, { key: "tenantId", value: tenant }];
  (0, _api.httpRequest)(_endPoints.DOWNLOADRECEIPT.GET.URL, _endPoints.DOWNLOADRECEIPT.GET.ACTION, queryStr, { Payments: Payments }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' }).then(function (res) {
    getFileUrlFromAPI(res.filestoreIds[0]).then(function (fileRes) {
      var win = window.open(fileRes[res.filestoreIds[0]], '_blank');
      win.focus();
    });
  });
};