"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentStatus = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCurrentStatus = exports.getCurrentStatus = function getCurrentStatus(status) {
  switch (status) {
    case "INITIATED":
      return "Initiated";
    case "APPLIED":
      return "Pending for Document verification";
    case "FIELDINSPECTION":
      return "Pending for Field inspection";
    case "PENDINGPAYMENT":
      return "Pending payment";
    case "PENDINGAPPROVAL":
      return "Pending approval";
    case "APPROVED":
      return "Approved";
  }
};

var TaskStatusComponents = function TaskStatusComponents(_ref) {
  var currentObj = _ref.currentObj,
      index = _ref.index;

  return _react2.default.createElement(
    _Grid2.default,
    {
      container: true,
      spacing: 12,
      style: { paddingLeft: 10, paddingBottom: 20 }
    },
    _react2.default.createElement(
      _Grid2.default,
      {
        item: true,
        xs: 12,
        sm: 6,
        md: 4,
        lg: 2,
        style: { marginTop: 15, paddingRight: 20 }
      },
      _react2.default.createElement(
        _Typography2.default,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Date", labelKey: "TL_DATE_LABEL" })
      ),
      _react2.default.createElement(
        _Typography2.default,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: (0, _utils.convertEpochToDate)((0, _get2.default)(currentObj, "auditDetails.lastModifiedTime"))
        })
      )
    ),
    _react2.default.createElement(
      _Grid2.default,
      {
        item: true,
        xs: 12,
        sm: 6,
        md: 4,
        lg: 2,
        style: { marginTop: 15, paddingRight: 20 }
      },
      _react2.default.createElement(
        _Typography2.default,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: "Updated By",
          labelKey: "TL_UPDATED_BY_LABEL"
        })
      ),
      _react2.default.createElement(
        _Typography2.default,
        { variant: "body2" },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentObj, "assigner.name") })
      )
    ),
    _react2.default.createElement(
      _Grid2.default,
      {
        item: true,
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
        style: { marginTop: 15, paddingRight: 20 }
      },
      _react2.default.createElement(
        _Typography2.default,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: "Status",
          labelKey: "TL_COMMON_TABLE_COL_STATUS"
        })
      ),
      _react2.default.createElement(
        _Typography2.default,
        {
          variant: "body2",
          classes: {
            body2: "body2-word-wrap"
          }
        },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: getCurrentStatus((0, _get2.default)(currentObj, "state.state")),
          labelKey: currentObj.businessService ? "WF_" + currentObj.businessService.toUpperCase() + "_" + (0, _get2.default)(currentObj, "state.state") : ""
        })
      )
    ),
    _react2.default.createElement(
      _Grid2.default,
      {
        item: true,
        xs: 12,
        sm: 6,
        md: 4,
        lg: 2,
        style: { marginTop: 15, paddingRight: 20 }
      },
      _react2.default.createElement(
        _Typography2.default,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: "Current Owner",
          labelKey: "TL_CURRENT_OWNER_LABEL"
        })
      ),
      _react2.default.createElement(
        _Typography2.default,
        {
          variant: "body2",
          classes: {
            body2: "body2-word-wrap"
          }
        },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: (0, _get2.default)(currentObj, "assignes[0].name") ? (0, _get2.default)(currentObj, "assignes[0].name") : "NA"
        })
      )
    ),
    _react2.default.createElement(
      _Grid2.default,
      { item: true, xs: 12, sm: 6, md: 4, lg: 3, style: { marginTop: 15 } },
      _react2.default.createElement(
        _Typography2.default,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelName: "Comments",
          labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
        })
      ),
      _react2.default.createElement(
        _Typography2.default,
        {
          variant: "body2",
          classes: {
            body2: "body2-word-wrap"
          }
        },
        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: (0, _get2.default)(currentObj, "comment") })
      )
    ),
    (0, _get2.default)(currentObj, "documents") && _react2.default.createElement(_uiContainers.DownloadFileContainer, {
      data: (0, _get2.default)(currentObj, "documents"),
      className: "review-documents",
      backgroundGrey: true
      // jsonPath={`workflow.ProcessInstances[${index}]`}
      // sourceJsonPath="documents"
    })
  );
};

exports.default = TaskStatusComponents;