"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _uiUtils = require("../../../../../ui-utils");

var _utils2 = require("../../utils");

var _searchResults = require("../searchResource/searchResults");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenKey = "register-property";

var callBackForApply = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var propertyPayload, isFromWorkflowDetails, payload, consumerCode, isAssemblyDetailsValid, isAssemblyDetailsPropType, isAssemblyDetailsConstructedArea, isAssemblyDetailsusageType, isAssemblyDetailstotalLandArea, isPropertyLocationDetailsValid, isPropertyOwnerDetailsTypeSelection, isPropertyOwnerDetailsValid, multiOwnerItems, i, isPropertyOwnerInstitutionTypeValid, isPropertyOwnerInstitutionInfoValid, checkmultiownerCount, additionalDetails, unit, _payload, isFromWNS;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            propertyPayload = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Property");

            if (!window.location.href.includes("pt-common-screens/summary")) {
              _context.next = 11;
              break;
            }

            isFromWorkflowDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.isWorkflowDetails", null);

            (0, _set2.default)(propertyPayload, "workflow", isFromWorkflowDetails);
            payload = null;
            _context.next = 7;
            return (0, _uiUtils.httpRequest)("post", "/property-services/property/_update", "_update", [], { Property: propertyPayload });

          case 7:
            payload = _context.sent;

            if (payload) {
              _store2.default.dispatch((0, _actions2.handleScreenConfigurationFieldChange)("summary", "components.adhocDialog", "props.open", true));
              setTimeout(function () {
                var isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
                if (isMode === "MODIFY") {
                  _store2.default.dispatch((0, _actions.setRoute)((0, _searchResults.getQueryRedirectUrl)() + "&propertyId=" + payload.Properties[0].propertyId));
                } else {
                  _store2.default.dispatch((0, _actions.setRoute)((0, _searchResults.getQueryRedirectUrl)() + "&propertyId=" + payload.Properties[0].propertyId + "&tenantId=" + propertyPayload.tenantId));
                }
              }, 3000);
            } else {
              dispatch((0, _actions2.toggleSnackbar)(true, {
                labelKey: "PT_COMMON_FAILED_TO_UPDATE_PROPERTY",
                labelName: "Failed to update property"
              }, "warning"));
            }
            _context.next = 61;
            break;

          case 11:
            consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
            isAssemblyDetailsValid = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children", state, dispatch, screenKey);
            isAssemblyDetailsPropType = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.propertyType", state, dispatch, screenKey);
            isAssemblyDetailsConstructedArea = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.totalConstructedArea", state, dispatch, screenKey);
            isAssemblyDetailsusageType = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.usageType", state, dispatch, screenKey);
            isAssemblyDetailstotalLandArea = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.totalLandArea", state, dispatch, screenKey);
            isPropertyLocationDetailsValid = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children", state, dispatch, screenKey);
            isPropertyOwnerDetailsTypeSelection = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.applicantTypeSelection.children", state, dispatch, screenKey);
            isPropertyOwnerDetailsValid = true;
            multiOwnerItems = void 0;

            if (propertyPayload.ownershipCategory) {
              if (propertyPayload.ownershipCategory === 'INDIVIDUAL.SINGLEOWNER') {
                isPropertyOwnerDetailsValid = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children", state, dispatch, screenKey);
              } else if (propertyPayload.ownershipCategory === 'INDIVIDUAL.MULTIPLEOWNERS') {

                multiOwnerItems = (0, _get2.default)(state, "screenConfiguration.screenConfig.register-property.components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items");
                if (multiOwnerItems && multiOwnerItems.length > 0) {
                  for (i = 0; i < multiOwnerItems.length; i++) {
                    if (multiOwnerItems[i] && !multiOwnerItems[i].hasOwnProperty('isDeleted')) {
                      isPropertyOwnerDetailsValid = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items[" + i + "].item" + i + ".children.cardContent.children.applicantCard.children", state, dispatch, screenKey);
                    }
                  }
                }
              } else if (propertyPayload.ownershipCategory === 'INSTITUTIONALGOVERNMENT' || propertyPayload.ownershipCategory === 'INSTITUTIONALPRIVATE') {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionType.children.cardContent.children.institutionTypeDetailsContainer.children.privateInstitutionTypeDetails", "required", true));
                isPropertyOwnerInstitutionTypeValid = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionType.children.cardContent.children.institutionTypeDetailsContainer.children", state, dispatch, screenKey);
                isPropertyOwnerInstitutionInfoValid = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionInfo.children.cardContent.children.institutionDetailsContainer.children", state, dispatch, screenKey);


                isPropertyOwnerDetailsValid = isPropertyOwnerInstitutionTypeValid ? isPropertyOwnerInstitutionInfoValid : false;
              }
            } else {
              isPropertyOwnerDetailsValid = (0, _commons.validateFields)("components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children", state, dispatch, screenKey);
            }

            if (!(isAssemblyDetailsValid && isAssemblyDetailsPropType && isAssemblyDetailsConstructedArea && isAssemblyDetailstotalLandArea && isAssemblyDetailsusageType && isPropertyLocationDetailsValid && isPropertyOwnerDetailsTypeSelection && isPropertyOwnerDetailsValid)) {
              _context.next = 60;
              break;
            }

            if (!(multiOwnerItems && multiOwnerItems.length > 0)) {
              _context.next = 29;
              break;
            }

            checkmultiownerCount = multiOwnerItems.length;

            for (i = 0; i < multiOwnerItems.length; i++) {
              if (multiOwnerItems[i] && multiOwnerItems[i].hasOwnProperty('isDeleted')) {
                checkmultiownerCount--;
              }
            }

            if (!(checkmultiownerCount < 2)) {
              _context.next = 29;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelKey: "PT_COMMON_ONE_MORE_OWNER_INFROMATION_REQUIRED",
              labelName: "One more owner information required"
            }, "warning"));
            return _context.abrupt("return", false);

          case 29:
            if (!(parseFloat(propertyPayload.superBuiltUpArea) > parseFloat(propertyPayload.landArea))) {
              _context.next = 32;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelKey: "PT_COMMON_TOTAL_CONSTRUCTEDAREA_LESS_THAN_LANDAREA_REQUIRED",
              labelName: "Total constructed area less than land area"
            }, "warning"));
            return _context.abrupt("return", false);

          case 32:
            for (i = propertyPayload.owners.length - 1; i--;) {
              if (propertyPayload.owners[i].hasOwnProperty('isDeleted')) propertyPayload.owners.splice(i, 1);
            }
            propertyPayload.owners.map(function (owner) {
              if (!_.isUndefined(owner.status)) {
                owner.status = "INACTIVE";
              }
            });
            if (propertyPayload.ownershipCategory.includes("INDIVIDUAL")) {
              propertyPayload.owners.map(function (owner) {
                owner.status = "ACTIVE";
              });
              propertyPayload.owners = [].concat((0, _toConsumableArray3.default)(propertyPayload.owners));
            } else if (propertyPayload.ownershipCategory.includes("INSTITUTIONALPRIVATE") || propertyPayload.ownershipCategory.includes("INSTITUTIONALGOVERNMENT")) {
              propertyPayload.owners.map(function (owner) {
                owner.status = "ACTIVE";
                owner.ownerType = 'NONE';
                owner.altContactNumber = propertyPayload.institution.landlineNumber;
              });
              propertyPayload.owners = [].concat((0, _toConsumableArray3.default)(propertyPayload.owners));
            }
            (0, _set2.default)(propertyPayload, "channel", "SYSTEM");
            if (window.location.href.includes("register-property?redirectUrl=/wns/apply")) {
              (0, _set2.default)(propertyPayload, "source", "WATER_CHARGES");
            } else {
              (0, _set2.default)(propertyPayload, "source", "MUNICIPAL_RECORDS");
            }
            (0, _set2.default)(propertyPayload, "noOfFloors", 1);
            propertyPayload.landArea = parseInt(propertyPayload.landArea);
            propertyPayload.tenantId = propertyPayload.address.city;
            propertyPayload.address.city = propertyPayload.address.city.split(".")[1];
            additionalDetails = {
              isRainwaterHarvesting: false,
              subUsageCategory: propertyPayload.subUsageCategory
            };

            propertyPayload.additionalDetails = additionalDetails;
            _context.prev = 43;

            if (propertyPayload.propertyType === 'BUILTUP.SHAREDPROPERTY') {
              unit = {};

              unit.usageCategory = propertyPayload.subUsageCategory ? propertyPayload.subUsageCategory : propertyPayload.usageCategory;
              unit.occupancyType = "SELFOCCUPIED";
              unit.constructionDetail = {};
              propertyPayload.units = [];
              // propertyPayload.units.push(unit);
            }
            propertyPayload.creationReason = 'CREATE';
            _payload = null;
            _context.next = 49;
            return (0, _uiUtils.httpRequest)("post", "/property-services/property/_create", "_update", [], { Property: propertyPayload });

          case 49:
            _payload = _context.sent;
            isFromWNS = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.isFromWNS", false);

            if (_payload && !isFromWNS) {
              _store2.default.dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, "components.adhocDialog", "props.open", true));
              setTimeout(function () {
                var isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
                if (isMode === "MODIFY") {
                  _store2.default.dispatch((0, _actions.setRoute)((0, _searchResults.getQueryRedirectUrl)() + "&propertyId=" + _payload.Properties[0].propertyId));
                } else {
                  _store2.default.dispatch((0, _actions.setRoute)((0, _searchResults.getQueryRedirectUrl)() + "&propertyId=" + _payload.Properties[0].propertyId + "&tenantId=" + propertyPayload.tenantId));
                }
              }, 3000);
            } else if (_payload && isFromWNS) {
              _store2.default.dispatch((0, _actions.setRoute)("summary?redirectUrl=/wns/apply?propertyId=" + _payload.Properties[0].propertyId + "&tenantId=" + propertyPayload.tenantId));
            } else {
              dispatch((0, _actions2.toggleSnackbar)(true, {
                labelKey: "PT_COMMON_FAILED_TO_REGISTER_PROPERTY",
                labelName: "Failed to register property"
              }, "warning"));
            }
            _context.next = 58;
            break;

          case 54:
            _context.prev = 54;
            _context.t0 = _context["catch"](43);

            console.log(_context.t0);
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelKey: "PT_COMMON_FAILED_TO_REGISTER_PROPERTY",
              labelName: "Failed to register property"
            }, "warning"));

          case 58:
            _context.next = 61;
            break;

          case 60:
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelKey: "PT_COMMON_REQUIRED_FIELDS",
              labelName: "Please fill Required details"
            }, "warning"));

          case 61:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[43, 54]]);
  }));

  return function callBackForApply(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var footer = exports.footer = (0, _utils2.getCommonApplyFooter)({
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Submit",
        labelKey: "PT_COMMON_BUTTON_SUBMIT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForApply
    },
    visible: true
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: (0, _utils.getLabel)({
        labelName: "Next",
        labelKey: "PT_COMMON_BUTTON_NEXT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForApply
    },
    visible: false
  }
});