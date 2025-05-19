"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareDocsInEmployee = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../ui-utils/api");

var _utils2 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titlebar = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  children: {
    leftContainerH: (0, _utils.getCommonContainer)({
      header: (0, _utils.getCommonHeader)({
        labelName: "NOC Application",
        labelKey: "NOC_APPLICATION_HEADER_LABEL"
      })
    })
  }
};

var titlebar2 = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  // visible: false,
  props: {
    style: { textAlign: "right", display: "flex" }
  },
  children: {
    nocApprovalNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-noc",
      componentPath: "NocNumber",
      gridDefination: {},
      props: {
        number: "NA"
      }
    }
  }
};
var applicationOverview = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Application Overview",
    labelKey: "NOC_APP_OVER_VIEW_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  appOverViewDetailsContainer: (0, _utils.getCommonContainer)({
    applicationNo: (0, _utils.getLabelWithValue)({
      labelName: "Application No",
      labelKey: "NOC_APP_NO_LABEL"
    }, {
      jsonPath: "Noc.applicationNo",
      callBack: _utils2.checkValueForNA
    }),
    module: (0, _utils.getLabelWithValue)({
      labelName: "Module/Source",
      labelKey: "NOC_MODULE_SOURCE_LABEL"
    }, {
      jsonPath: "Noc.source",
      callBack: _utils2.checkValueForNA
    }),
    // status: getLabelWithValue(
    //   {
    //     labelName: "Status",
    //     labelKey: "NOC_STATUS_LABEL"
    //   },
    //   {
    //     jsonPath: "Noc.applicationStatus",
    //     callBack: checkValueForNA
    //   }
    // ),
    viewApplication: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 3
      },
      props: {
        variant: "outlined",
        style: {
          color: "#FE7A51",
          border: "#FE7A51 solid 1px",
          borderRadius: "2px"
        }
      },
      children: {
        buttonLabel: (0, _utils.getLabel)({
          labelName: "VIEW SOURCE APPLICATION",
          labelKey: "NOC_VIEW_APP_BUTTON"
        })
      },

      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          var nocData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Noc", "");
          var checkingApp = (0, _localStorageUtils.getTenantId)().split('.')[1] ? "employee" : "citizen";
          var appendUrl = window.location.origin;
          if (process.env.NODE_ENV === "production") {
            appendUrl = window.location.origin + "/" + checkingApp;
          }
          if (nocData && nocData.source === "BPA") {
            var bpaAppurl = appendUrl + '/egov-bpa/search-preview?applicationNumber=' + nocData.sourceRefId + '&tenantId=' + nocData.tenantId;
            window.open(bpaAppurl, '_blank');
          } else if (nocData && nocData.source === "BPA_OC") {
            var _bpaAppurl = appendUrl + '/oc-bpa/search-preview?applicationNumber=' + nocData.sourceRefId + '&tenantId=' + nocData.tenantId;
            window.open(_bpaAppurl, '_blank');
          }
        }
      }

    }
  })
});

var nocDetails = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 12
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Fire NOC"
        // labelKey: "BPA_NOC_FIRE_TITLE"
      }))
    }
  },
  documentDetailsCard: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-noc",
    componentPath: "PreviewContainer",
    props: {
      sourceJsonPath: "documentDetailsPreview",
      className: "review-documents",
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg",
        multiple: false
      },
      maxFileSize: 5000
    }
  }
});

var setSearchResponse = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, applicationNumber, tenantId, action) {
    var response, queryObject;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getRequiredMdmsDetails(state, dispatch);

          case 2:
            _context.next = 4;
            return (0, _utils2.getNocSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNo", value: applicationNumber }]);

          case 4:
            response = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("Noc", (0, _get2.default)(response, "Noc[0]", {})));
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: (0, _get2.default)(response, "Noc[0].additionalDetails.workflowCode") }];
            _context.next = 9;
            return (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);

          case 9:

            if (response && (0, _get2.default)(response, "Noc[0].nocNo")) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header2.children.titlebar2.children.nocApprovalNumber", "props.number", (0, _get2.default)(response, "Noc[0].nocNo")));
            } else {

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header2.children.titlebar2.children.nocApprovalNumber", "visible", false));
            }
            (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.nocDetails.children.cardContent.children.header.children.header.children.key.props.labelKey", "NOC_NOC_TYPE_" + (0, _get2.default)(response, "Noc[0].nocType"));

            _context.next = 13;
            return (0, _utils2.requiredDocumentsData)(state, dispatch, action);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setSearchResponse(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var getRequiredMdmsDetails = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, action) {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "DocumentType"
                  }]
                }, {
                  moduleName: "NOC",
                  masterDetails: [{
                    name: "DocumentTypeMapping"
                  }]
                }]
              }
            };
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 3:
            payload = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getRequiredMdmsDetails(_x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var prepareDocsInEmployee = exports.prepareDocsInEmployee = function prepareDocsInEmployee(state, dispatch, action) {
  var applicationDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.NOC.DocumentTypeMapping", []);
  var documentsDropDownValues = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType", []);
  var nocType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc.nocType", "");

  var documents = [];
  applicationDocuments && applicationDocuments.length > 0 && applicationDocuments.forEach(function (doc) {
    if (doc.applicationType === "NEW" && doc.nocType === nocType) {
      documents.push(doc.docTypes);
    }
  });

  var documentsList = [];
  if (documents[0] && documents[0].length > 0) {
    documents[0].forEach(function (doc) {
      var code = doc.documentType;
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
  var nocDocuments = documentsList;
  var documentsContract = [];
  var tempDoc = {};

  if (nocDocuments && nocDocuments.length > 0) {
    nocDocuments.forEach(function (doc) {
      var card = {};
      card["code"] = doc.documentType.split(".")[0];
      card["title"] = doc.documentType.split(".")[0];
      card["cards"] = [];
      tempDoc[doc.documentType.split(".")[0]] = card;
    });
    nocDocuments.forEach(function (doc) {
      var card = {};
      card["name"] = doc.documentType;
      card["code"] = doc.documentType;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropDownValues) {
        var dropDownValues = {};
        dropDownValues.label = "Select Documents";
        dropDownValues.required = doc.required;
        dropDownValues.menu = doc.dropDownValues.filter(function (item) {
          return item.active;
        });
        dropDownValues.menu = dropDownValues.menu.map(function (item) {
          return { code: item.documentType, label: item.documentType };
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

  dispatch((0, _actions.prepareFinalObject)("documentDetailsPreview", documentsContract));
};
var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    setSearchResponse(state, dispatch, applicationNumber, tenantId, action);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css bpa-searchpview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6,
                md: 6
              }
            }, titlebar),
            header2: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" }
              },
              gridDefination: {
                xs: 12,
                sm: 6,
                md: 6,
                align: "right"
              },
              children: {
                titlebar2: titlebar2
              }
            }
          }
        },

        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: true,
          props: {
            dataPath: "Noc",
            moduleName: "Noc",
            updateUrl: "/noc-services/v1/noc/_update"
          }
        },
        applicationOverviewContainer: (0, _utils.getCommonCard)({
          applicationOverview: applicationOverview
        }),
        body: (0, _utils.getCommonCard)({
          nocDetails: nocDetails
        })
      }
    }
  }
};

exports.default = screenConfig;