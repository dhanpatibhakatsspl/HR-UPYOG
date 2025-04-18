"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nocDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nocRadioGroup;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons = require("../../../../../ui-utils/commons");

require("./index.css");

var _propertyLocationDetails = require("./propertyLocationDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadProvisionalNocData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var fireNOCNumber, response, firenoc, tenantId, noOfBuildings;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fireNOCNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].provisionFireNOCNumber", "");

            fireNOCNumber = fireNOCNumber && fireNOCNumber.trim();

            if (fireNOCNumber.match((0, _utils.getPattern)("FireNOCNo"))) {
              _context.next = 6;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Incorrect FireNOC Number!",
              labelKey: "ERR_FIRENOC_NUMBER_INCORRECT"
            }, "error"));
            // return;
            _context.next = 24;
            break;

          case 6:
            _context.next = 8;
            return (0, _commons.getSearchResults)([{ key: "fireNOCNumber", value: fireNOCNumber }]);

          case 8:
            response = _context.sent;


            if (response && response.FireNOCs && response.FireNOCs.length == 0 || !response) {
              dispatch((0, _actions.toggleSnackbar)(true, {
                labelName: "Incorrect FireNOC Number!",
                labelKey: "ERR_FIRENOC_NUMBER_INCORRECT"
              }, "error"));
            }

            _context.next = 12;
            return (0, _commons.furnishNocResponse)(response);

          case 12:
            response = _context.sent;
            firenoc = (0, _get2.default)(response, "FireNOCs[0]", {});

            (0, _set2.default)(firenoc, "fireNOCDetails.fireNOCType", (0, _get2.default)(state.screenConfiguration.screenConfig, "apply.components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.nocRadioGroup.props.value", "NEW"));
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", [firenoc]));
            tenantId = (0, _get2.default)(response, "FireNOCs[0].tenantId", (0, _localStorageUtils.getTenantIdCommon)());
            _context.next = 19;
            return (0, _propertyLocationDetails.onchangeOfTenant)({ value: tenantId }, state, dispatch);

          case 19:
            // Set no of buildings radiobutton and eventually the cards
            noOfBuildings = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.noOfBuildings", "SINGLE") === "MULTIPLE" ? "MULTIPLE" : "SINGLE";

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingRadioGroup", "props.value", noOfBuildings));

            // // Set noc type radiobutton to NEW
            // dispatch(
            //   handleField(
            //     "apply",
            //     "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.nocRadioGroup",
            //     "props.value",
            //     "NEW"
            //   )
            // );

            // Set provisional fire noc number
            dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].provisionFireNOCNumber", (0, _get2.default)(response, "FireNOCs[0].fireNOCNumber", "")));

            // Set fire noc id to null
            dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].id", undefined));
            dispatch((0, _actions.prepareFinalObject)("DYNAMIC_MDMS_Trigger", true));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function loadProvisionalNocData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var nocDetails = exports.nocDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "NOC Details",
    labelKey: "NOC_NEW_NOC_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  break: (0, _utils.getBreak)(),
  nocDetailsContainer: (0, _utils.getCommonContainer)({
    nocRadioGroup: (_nocRadioGroup = {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
      type: "array",
      props: {
        required: true,
        label: { name: "NOC Type", key: "NOC_TYPE_LABEL" },
        buttons: [{
          labelName: "New",
          labelKey: "NOC_TYPE_NEW_RADIOBUTTON",
          value: "NEW"
        }, {
          label: "Provisional",
          labelKey: "NOC_TYPE_PROVISIONAL_RADIOBUTTON",
          value: "PROVISIONAL"
        }],
        jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
        defaultValue: "NEW"
      }
    }, (0, _defineProperty3.default)(_nocRadioGroup, "type", "array"), (0, _defineProperty3.default)(_nocRadioGroup, "beforeFieldChange", function beforeFieldChange(action, state, dispatch) {
      if (action.value === "PROVISIONAL") {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber", "visible", false
        // "props.style", 
        // { visibility: "hidden" }
        ));
      } else {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber", "visible", true
        // "props.style",
        // {}
        ));
      }
      if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.action", "") === "SENDBACKTOCITIZEN") {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.nocSelect", "props.disabled", true));
      }
    }), _nocRadioGroup),
    provisionalNocNumber: (0, _extends3.default)({}, (0, _utils.getTextField)({
      label: {
        labelName: "Provisional fire NoC number",
        labelKey: "NOC_PROVISIONAL_FIRE_NOC_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Provisional fire NoC number",
        labelKey: "NOC_PROVISIONAL_FIRE_NOC_NO_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("FireNOCNo"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      // required: true,
      // pattern: getPattern("MobileNo"),
      jsonPath: "FireNOCs[0].provisionFireNOCNumber",
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51",
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch, fieldInfo) {
            loadProvisionalNocData(state, dispatch);
          }
        }
      }
      // title: {
      //   value: "Please search owner profile linked to the mobile no.",
      //   key: "TL_MOBILE_NO_TOOLTIP_MESSAGE"
      // },
      // infoIcon: "info_circle"
    }))
  })
});