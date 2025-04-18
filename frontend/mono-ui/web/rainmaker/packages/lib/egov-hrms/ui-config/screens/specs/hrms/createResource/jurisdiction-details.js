"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jurisdictionDetails = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _props;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrayCrawler = function arrayCrawler(arr, n) {
  if (n == 1) {
    return arr.map(function (item) {
      return { code: item.code, name: item.name };
    });
  } else return arr.map(function (item) {
    return arrayCrawler(item.children, n - 1);
  });
};

var jurisdictionDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: (0, _utils.getCommonGrayCard)({
      jnDetailsCardContainer: (0, _utils.getCommonContainer)({
        hierarchy: (0, _extends3.default)({}, (0, _utils.getSelectField)({
          label: { labelName: "Hierarchy", labelKey: "HR_HIERARCHY_LABEL" },
          placeholder: {
            labelName: "Select Hierarchy",
            labelKey: "HR_HIERARCHY_PLACEHOLDER"
          },
          localePrefix: {
            moduleName: "EGOV_LOCATION",
            masterName: "TENANTBOUNDARY"
          },
          required: true,
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          },
          jsonPath: "Employee[0].jurisdictions[0].hierarchy",
          sourceJsonPath: "createScreenMdmsData.hierarchyList"
        }), {
          beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
            var tenantBoundary = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.egov-location.TenantBoundary", []);
            var hierarchyList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.hierarchyList", []);

            // GETTING BOUNDARY DATA FOR SELECTED HIERARCHY
            var hierarchyIndex = hierarchyList.findIndex(function (x) {
              return x.code == action.value;
            });
            var selectedBoundaryData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.egov-location.TenantBoundary[" + hierarchyIndex + "].boundary", []);

            // AFTER SELECTION OF HIERARCHY CRAWL BOUNDARY DATA TO GET THE BOUNDARY TYPES
            var boundaryList = [];
            var crawlBoundaryData = selectedBoundaryData;
            while (crawlBoundaryData != null) {
              boundaryList.push({
                code: crawlBoundaryData.label,
                name: crawlBoundaryData.label
              });
              crawlBoundaryData = (0, _get2.default)(crawlBoundaryData, "children[0]", null);
            }

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("create", action.componentJsonpath.replace(".hierarchy", ".boundaryType"), "props.data", [boundaryList[0]]));
          }
        }),
        boundaryType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
          label: {
            labelName: "Boundary Type",
            labelKey: "HR_BOUNDARY_TYPE_LABEL"
          },
          placeholder: {
            labelName: "Select Boundary Type",
            labelKey: "HR_BOUNDARY_TYPE_PLACEHOLDER"
          },
          localePrefix: {
            moduleName: "EGOV_LOCATION",
            masterName: "BOUNDARYTYPE"
          },
          required: true,
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          },
          jsonPath: "Employee[0].jurisdictions[0].boundaryType"
        }), {
          beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
            // GET COMPLETE EGOV-LOCATION DATA FROM PFO
            var tenantBoundary = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.egov-location.TenantBoundary", []);
            // GET HIERARCHY LIST FROM PFO
            var hierarchyList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.hierarchyList", []);
            // GET BOUNDARY LIST FROM SOURCE DATA OF THAT THIS SPECIFIC DROPDOWN (W.R.T Multiitem)
            var boundaryList = (0, _get2.default)(state.screenConfiguration.screenConfig.create, action.componentJsonpath + ".props.data", []);
            // GET THE CURRENT CARD NUMBER WHICH IS BEING CHANGED
            var cardNumber = action.componentJsonpath.match(/\[[0-9]*\]/g).toString().replace(/^\[|\]$/g, "");
            var selectedHierarchy = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].jurisdictions[" + cardNumber + "].hierarchy", "");
            // GET THE INDEX OF CURRENTLY SELECTED HIERARCHY FROM HIERARCHY LIST
            // SO AS TO GET THE BOUNDARY DATA FOR THAT HIERARCHY FROM tenantBoundary
            var hierarchyIndex = hierarchyList.findIndex(function (x) {
              return x.code == selectedHierarchy;
            });
            // GET THE INDEX / LEVEL OF THE BOUNDARY TYPE SO AS TO CRAWL DATA
            var boundaryIndex = boundaryList.findIndex(function (x) {
              return x.value == action.value;
            });
            // GET THE SPECIFIC DATA WHICH HAS TO BE CRAWLED
            var crawlingData = (0, _get2.default)(tenantBoundary[hierarchyIndex], "boundary.children", []);

            // A RECURSIVE FUNCTION WHICH CRAWLS THE DATA, FLATTENS ARRAY AND RETURNS A LIST
            // OF PROCESSED BOUNDARY DATA.
            var processedBoundaryData = [];
            if (boundaryIndex > 0) {
              processedBoundaryData = arrayCrawler(crawlingData, boundaryIndex).flat(boundaryIndex).map(function (item) {
                return { code: item.code, name: item.name };
              });
            } else {
              processedBoundaryData = [{
                code: (0, _get2.default)(tenantBoundary[hierarchyIndex], "boundary.code", ""),
                name: (0, _get2.default)(tenantBoundary[hierarchyIndex], "boundary.name", "")
              }];
            }

            var multiTenant = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.tenant.tenants", []);
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("create", action.componentJsonpath.replace(".boundaryType", ".boundary"), "props.data", multiTenant
            // processedBoundaryData
            ));
          }
        }),
        boundary: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-hrms",
          componentPath: "AutosuggestContainer",
          jsonPath: "Employee[0].jurisdictions[0].boundary",
          props: (_props = {
            className: "hr-generic-selectfield autocomplete-dropdown",
            optionValue: "value",
            optionLabel: "label",
            label: { labelName: "Boundary", labelKey: "HR_BOUNDARY_LABEL" },
            placeholder: {
              labelName: "Select Boundary",
              labelKey: "HR_BOUNDARY_PLACEHOLDER"
            },
            localePrefix: {
              moduleName: "TENANT",
              masterName: "TENANTS"
            },
            required: true
          }, (0, _defineProperty3.default)(_props, "required", true), (0, _defineProperty3.default)(_props, "isClearable", true), (0, _defineProperty3.default)(_props, "labelsFromLocalisation", true), (0, _defineProperty3.default)(_props, "jsonPath", "Employee[0].jurisdictions[0].boundary"), _props),
          required: true,
          // sourceJsonPath: "createScreenMdmsData.hierarchyList",
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          }
        },
        role: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-hrms",
          componentPath: "AutosuggestContainer",
          jsonPath: "Employee[0].jurisdictions[0].roles",
          required: true,
          props: {
            className: "autocomplete-dropdown hrms-role-dropdown",
            label: { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
            placeholder: {
              labelName: "Select Role",
              labelKey: "HR_ROLE_PLACEHOLDER"
            },
            jsonPath: "Employee[0].jurisdictions[0].roles",
            sourceJsonPath: "createScreenMdmsData.furnishedRolesList",
            labelsFromLocalisation: true,
            suggestions: [],
            fullwidth: true,
            required: true,
            inputLabelProps: {
              shrink: true
            },
            localePrefix: {
              moduleName: "ACCESSCONTROL_ROLES",
              masterName: "ROLES"
            },
            isMulti: true
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        }
      }, {
        style: {
          overflow: "visible"
        }
      })
    }),
    items: [],
    addItemLabel: {
      labelName: "ADD JURISDICTION",
      labelKey: "HR_ADD_JURISDICTION"
    },
    headerName: "Jurisdiction",
    headerJsonPath: "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].jurisdictions",
    prefixSourceJsonPath: "children.cardContent.children.jnDetailsCardContainer.children"
  },
  type: "array"
};

var jurisdictionDetails = exports.jurisdictionDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Jurisdiction Details",
    labelKey: "HR_JURIS_DET_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  jurisdictionDetailsCard: jurisdictionDetailsCard
}, {
  style: {
    overflow: "visible"
  }
});