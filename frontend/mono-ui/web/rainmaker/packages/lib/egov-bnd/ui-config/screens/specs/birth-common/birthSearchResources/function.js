"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../../ui-utils/commons");

var _constants = require("../../../../../ui-utils/constants");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryParams, tenantId, dateOfBirth, fromdate, todate, gender, registrationNo, hospitalId, mothersName, fathersName, searchSet1Visible, isSearchSet1Valid, isSearchSet2Valid, isSearchSetCommonValid, fromdateofsearch, todateepochofsearch, responseFromAPI, births, birthTableData, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);

            queryParams = [
              //{ key: "limit", value: "10" }
            ];
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.tenantId");

            if (tenantId) queryParams.push({ key: "tenantId", value: tenantId });

            dateOfBirth = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.dob");
            fromdate = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.fromdate");
            todate = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.todate");

            if (dateOfBirth) {
              queryParams.push({
                key: "dateOfBirth",
                value: (0, _utils.convertEpochToDate)((0, _utils.convertDateToEpoch)(dateOfBirth)).replaceAll("/", "-")
              });
            }
            if (fromdate) {
              queryParams.push({
                key: "fromDate",
                value: (0, _utils.convertEpochToDate)((0, _utils.convertDateToEpoch)(fromdate)).replaceAll("/", "-")
              });
            }
            if (todate) {
              queryParams.push({
                key: "toDate",
                value: (0, _utils.convertEpochToDate)((0, _utils.convertDateToEpoch)(todate)).replaceAll("/", "-")
              });
            }
            gender = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.gender");

            if (gender) queryParams.push({ key: "gender", value: gender });

            registrationNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.registrationNo");

            if (registrationNo) queryParams.push({ key: "registrationNo", value: registrationNo });

            hospitalId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.hosptialId");

            if (hospitalId) queryParams.push({ key: "hospitalId", value: hospitalId });

            mothersName = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.mothersName");

            if (mothersName) queryParams.push({ key: "motherName", value: mothersName });

            fathersName = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.fathersName");

            if (fathersName) queryParams.push({ key: "fatherName", value: fathersName });

            searchSet1Visible = (0, _get2.default)(state.screenConfiguration, "screenConfig.getCertificate.components.div.children.birthSearchCard.children.cardContent.children.searchContainer1.visible", {});
            isSearchSet1Valid = (0, _utils.validateFields)("components.div.children.birthSearchCard.children.cardContent.children.searchContainer1.children.details.children", state, dispatch, "getCertificate");
            isSearchSet2Valid = (0, _utils.validateFields)("components.div.children.birthSearchCard.children.cardContent.children.searchContainer2.children.details.children", state, dispatch, "getCertificate");
            isSearchSetCommonValid = (0, _utils.validateFields)("components.div.children.birthSearchCard.children.cardContent.children.searchContainerCommon.children", state, dispatch, "getCertificate");

            if (isSearchSetCommonValid) {
              _context.next = 27;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill the required fields to search.",
              labelKey: "BND_COMMON_REQ_FIELDS_ERR"
            }, "warning"));
            return _context.abrupt("return");

          case 27:
            if (!(fromdate && todate)) {
              _context.next = 33;
              break;
            }

            fromdateofsearch = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.fromdate");
            todateepochofsearch = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.todate");

            if (!(fromdateofsearch > todateepochofsearch)) {
              _context.next = 33;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "",
              labelKey: "From Date should not be before To Date "
            }, "warning"));
            return _context.abrupt("return");

          case 33:
            _context.next = 35;
            return (0, _commons2.searchForBirth)(dispatch, queryParams);

          case 35:
            responseFromAPI = _context.sent;
            births = responseFromAPI && responseFromAPI.birthCerts || []; //|| [{"id":"1","dateofbirth":1614241552,"firstname":"san","gender":"1","registrationno":"2021-1","counter":0,"birthFatherInfo":{"firstname":"abc"},"birthMotherInfo":{"firstname":"abc1"},"tenantid":"pb.agra"},{"id":"2","dateofbirth":1614241552,"firstname":"san1","gender":"1","registrationno":"2021-2","counter":0,"birthFatherInfo":{"firstname":"abcd"},"birthMotherInfo":{"firstname":"abcd1"},"tenantid":"pb.agra"}];

            birthTableData = births.map(function (item) {
              return {
                id: (0, _get2.default)(item, "id"),
                registrationNo: (0, _get2.default)(item, "registrationno"),
                nameOfChild: (0, _get2.default)(item, "fullName"),
                dateOfbirth: (0, _get2.default)(item, "dateofbirth"),
                gender: (0, _commons.getLocaleLabels)("BIRTH_GENDER_" + (0, _get2.default)(item, "gender"), "BIRTH_GENDER_" + (0, _get2.default)(item, "gender")),
                mothersName: (0, _get2.default)(item, "birthMotherInfo.fullName"),
                fathersName: (0, _get2.default)(item, "birthFatherInfo.fullName"),
                action: getActionItem((0, _get2.default)(item, "counter")),
                tenantId: (0, _get2.default)(item, "tenantid"),
                payRequired: (0, _get2.default)(item, "payRequired")
              };
            });

            dispatch((0, _actions.prepareFinalObject)("bnd.birth.birthSearchResponse", births));

            try {
              data = birthTableData.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, "BND_COMMON_TABLE_ID", item.id || "-"), (0, _defineProperty3.default)(_ref2, "BND_COMMON_TABLE_REGNO", item.registrationNo || "-"), (0, _defineProperty3.default)(_ref2, "BND_COMMON_NAME", item.nameOfChild || "-"), (0, _defineProperty3.default)(_ref2, "BND_BIRTH_DATE", (0, _utils.convertEpochToDateWithTimeIST)(item.dateOfbirth)), (0, _defineProperty3.default)(_ref2, "BND_COMMON_GENDER", item.gender || "-"), (0, _defineProperty3.default)(_ref2, "BND_COMMON_MOTHERSNAME", item.mothersName || "-"), (0, _defineProperty3.default)(_ref2, "BND_COMMON_FATHERSNAME", item.fathersName || "-"), (0, _defineProperty3.default)(_ref2, "BND_COMMON_TABLE_ACTION", item.action || "-"), (0, _defineProperty3.default)(_ref2, "BUSINESS_SERVICE", "BIRTH_CERT"), (0, _defineProperty3.default)(_ref2, "TENANT_ID", item.tenantId), (0, _defineProperty3.default)(_ref2, "BND_VIEW_CERTIFICATE", "BND_VIEW_CERTIFICATE"), _ref2;
              });

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.searchResults", "props.tableData", birthTableData));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.searchResults", "props.rows", birthTableData.length));

              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
            }

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("getCertificate", "components.div.children.searchResults", "visible", booleanHideOrShow));
};

var getActionItem = function getActionItem(counter) {
  if (counter < 1) return "FREE_DOWNLOAD";else return "PAY_AND_DOWNLOAD";
};

var getGenderValue = function getGenderValue(genderCode) {
  return _constants.genderValues[genderCode];
};