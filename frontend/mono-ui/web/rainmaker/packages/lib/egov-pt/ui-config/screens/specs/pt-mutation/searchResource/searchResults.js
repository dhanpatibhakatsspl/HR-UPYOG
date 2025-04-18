"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApplicationTable = exports.searchPropertyTable = exports.textToLocalMapping = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLocalTextFromCode = function getLocalTextFromCode(localCode) {
  return JSON.parse((0, _localStorageUtils.getLocalization)("localization_en_IN")).find(function (item) {
    return item.code === localCode;
  });
};

// import store from "ui-redux/store";

// import { setRoute } from "egov-ui-kit/redux/app/actions";
var textToLocalMapping = exports.textToLocalMapping = {
  "Unique Property ID": (0, _commons.getLocaleLabels)("Unique Property ID", "PT_COMMON_TABLE_COL_PT_ID", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Owner Name": (0, _commons.getLocaleLabels)("Owner Name", "PT_COMMON_TABLE_COL_OWNER_NAME", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Guardian Name": (0, _commons.getLocaleLabels)("Guardian Name", "PT_GUARDIAN_NAME", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Existing Property Id": (0, _commons.getLocaleLabels)("Existing Property Id", "PT_COMMON_COL_EXISTING_PROP_ID", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Address": (0, _commons.getLocaleLabels)("Address", "PT_COMMON_COL_ADDRESS", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Application No": (0, _commons.getLocaleLabels)("Application No.", "PT_COMMON_COL_APPLICATION_NO", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Application Type": (0, _commons.getLocaleLabels)("Application Type", "PT_COMMON_COL_APPLICATION_TYPE", (0, _commons.getTransformedLocalStorgaeLabels)()),
  Status: (0, _commons.getLocaleLabels)("Status", "PT_COMMON_TABLE_COL_STATUS_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  INITIATED: (0, _commons.getLocaleLabels)("Initiated,", "PT_INITIATED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  APPLIED: (0, _commons.getLocaleLabels)("Applied", "PT_APPLIED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  DOCUMENTVERIFY: (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_PT_DOCUMENTVERIFY", (0, _commons.getTransformedLocalStorgaeLabels)()),
  APPROVED: (0, _commons.getLocaleLabels)("Approved", "PT_APPROVED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  REJECTED: (0, _commons.getLocaleLabels)("Rejected", "PT_REJECTED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  CANCELLED: (0, _commons.getLocaleLabels)("Cancelled", "PT_CANCELLED", (0, _commons.getTransformedLocalStorgaeLabels)()),
  PENDINGAPPROVAL: (0, _commons.getLocaleLabels)("Pending for Approval", "WF_PT_PENDINGAPPROVAL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  PENDINGPAYMENT: (0, _commons.getLocaleLabels)("Pending payment", "WF_PT_PENDINGPAYMENT", (0, _commons.getTransformedLocalStorgaeLabels)()),
  FIELDINSPECTION: (0, _commons.getLocaleLabels)("Pending for Field Inspection", "WF_PT_FIELDINSPECTION", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Search Results for PT Applications": (0, _commons.getLocaleLabels)("Search Results for PT Applications", "PT_HOME_SEARCH_RESULTS_TABLE_HEADING", (0, _commons.getTransformedLocalStorgaeLabels)())
};

var searchPropertyTable = exports.searchPropertyTable = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "propertyTab",
    columns: [{
      labelName: "Unique Property ID",
      labelKey: "PT_COMMON_TABLE_COL_PT_ID",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value, tableMeta) {
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "a",
              { href: "javascript:void(0)", onClick: function onClick() {
                  return onPropertyTabClick(tableMeta);
                } },
              value
            )
          );
        }
      }
    }, { labelName: "Owner Name", labelKey: "PT_COMMON_TABLE_COL_OWNER_NAME" }, { labelName: "Guardian Name", labelKey: "PT_GUARDIAN_NAME" }, { labelName: "Existing Property Id", labelKey: "PT_COMMON_COL_EXISTING_PROP_ID" }, { labelName: "Address", labelKey: "PT_COMMON_COL_ADDRESS" }, {
      labelName: "Status",
      labelKey: "PT_COMMON_TABLE_COL_STATUS_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(_uiContainers.LabelContainer, {
            style: value === "ACTIVE" ? { color: "green" } : { color: "red" },
            labelKey: (0, _commons.getStatusKey)(value).labelKey,
            labelName: (0, _commons.getStatusKey)(value).labelName
          });
        }
      }
    }, {
      labelName: "Tenant Id",
      labelKey: "TENANT_ID",
      options: {
        display: false
      }
    }],
    title: { labelKey: "PT_HOME_PROPERTY_RESULTS_TABLE_HEADING", labelName: "Search Results for Properties" },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: function sortingFn(data, i, sortDateOrder) {
        var epochDates = data.reduce(function (acc, curr) {
          acc.push([].concat((0, _toConsumableArray3.default)(curr), [(0, _utils.getEpochForDate)(curr[4], "dayend")]));
          return acc;
        }, []);
        var order = sortDateOrder === "asc" ? true : false;
        var finalData = (0, _utils.sortByEpoch)(epochDates, !order).map(function (item) {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

var searchApplicationTable = exports.searchApplicationTable = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    className: "appTab",
    columns: [{
      labelName: "Application No",
      labelKey: "PT_COMMON_TABLE_COL_APP_NO",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "a",
            { href: "javascript:void(0)",
              onClick: function onClick() {
                return applicationNumberClick(value);
              }
            },
            value.acknowldgementNumber
          );
        }
      }
    }, {
      labelName: "Unique Property ID",
      labelKey: "PT_COMMON_TABLE_COL_PT_ID",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(
            "a",
            { href: "javascript:void(0)",
              onClick: function onClick() {
                return propertyIdClick(value);
              }
            },
            value.propertyId
          );
        }
      }
    }, { labelName: "Application Type", labelKey: "PT_COMMON_TABLE_COL_APP_TYPE" }, { labelName: "Owner Name", labelKey: "PT_COMMON_TABLE_COL_OWNER_NAME" }, { labelName: "Address", labelKey: "PT_COMMON_COL_ADDRESS" }, {
      labelName: "Status",
      labelKey: "PT_COMMON_TABLE_COL_STATUS_LABEL",
      options: {
        filter: false,
        customBodyRender: function customBodyRender(value) {
          return _react2.default.createElement(_uiContainers.LabelContainer, {
            style: value === "ACTIVE" ? { color: "green" } : { color: "red" },
            labelKey: (0, _commons.getStatusKey)(value).labelKey,
            labelName: (0, _commons.getStatusKey)(value).labelName
          });
        }
      }
    }, {
      labelName: "tenantId",
      labelKey: "tenantId",
      options: {
        display: false
      }
    }, {
      name: "temporary",

      options: {
        display: false

      }
    }],
    title: { labelKey: "PT_HOME_APPLICATION_RESULTS_TABLE_HEADING", labelName: "Search Results for Property Application" },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: function onRowClick(row, index, dispatch) {
        // onApplicationTabClick(row,index, dispatch);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: function sortingFn(data, i, sortDateOrder) {
        var epochDates = data.reduce(function (acc, curr) {
          acc.push([].concat((0, _toConsumableArray3.default)(curr), [(0, _utils.getEpochForDate)(curr[4], "dayend")]));
          return acc;
        }, []);
        var order = sortDateOrder === "asc" ? true : false;
        var finalData = (0, _utils.sortByEpoch)(epochDates, !order).map(function (item) {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

var onPropertyTabClick = function onPropertyTabClick(tableMeta) {
  switch (tableMeta.rowData[5]) {
    case "INITIATED":
      window.location.href = "apply?applicationNumber=" + tableMeta.rowData[0] + "&tenantId=" + tableMeta.rowData[6];
      break;
    default:
      navigate(propertyInformationScreenLink(tableMeta.rowData[0], tableMeta.rowData[6]));
      break;
  }
};

var applicationNumberClick = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
    var businessService;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _commons2.getApplicationType)(item && item.acknowldgementNumber, item.tenantId, item.creationReason);

          case 2:
            businessService = _context.sent;

            if (businessService == 'PT.MUTATION') {
              navigate("/pt-mutation/search-preview?applicationNumber=" + item.acknowldgementNumber + "&tenantId=" + item.tenantId);
            } else if (businessService == 'PT.CREATE') {
              navigate("/property-tax/application-preview?applicationNumber=" + item.acknowldgementNumber + "&tenantId=" + item.tenantId + "&type=property");
            } else if (businessService == 'PT.LEGACY') {
              navigate("/property-tax/application-preview?applicationNumber=" + item.acknowldgementNumber + "&tenantId=" + item.tenantId + "&type=legacy");
            } else if (businessService == 'PT.UPDATE') {
              navigate("/property-tax/application-preview?applicationNumber=" + item.acknowldgementNumber + "&tenantId=" + item.tenantId + "&type=updateProperty");
            } else {
              navigate(propertyInformationScreenLink(item.propertyId, item.tenantId));
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function applicationNumberClick(_x) {
    return _ref.apply(this, arguments);
  };
}();

var propertyIdClick = function propertyIdClick(item) {
  navigate(propertyInformationScreenLink(item.propertyId, item.tenantId));
};

var navigate = function navigate(url) {
  // store.dispatch(setRoute(url));
  (0, _commons2.setRoute)(url);
};

var propertyInformationScreenLink = function propertyInformationScreenLink(propertyId, tenantId) {
  if (process.env.REACT_APP_NAME == "Citizen") {
    return "/property-tax/my-properties/property/" + propertyId + "/" + tenantId;
  } else {
    return "/property-tax/property/" + propertyId + "/" + tenantId;
  }
};