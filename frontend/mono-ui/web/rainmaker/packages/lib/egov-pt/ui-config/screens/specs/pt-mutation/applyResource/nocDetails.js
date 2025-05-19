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

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadProvisionalNocData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var fireNOCNumber, response, noOfBuildings;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fireNOCNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].provisionFireNOCNumber", "");

            if (fireNOCNumber.match((0, _utils.getPattern)("FireNOCNo"))) {
              _context.next = 4;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Incorrect FireNOC Number!",
              labelKey: "ERR_FIRENOC_NUMBER_INCORRECT"
            }, "error"));
            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return (0, _commons.getSearchResults)([{ key: "fireNOCNumber", value: fireNOCNumber }]);

          case 6:
            response = _context.sent;


            response = (0, _commons.furnishNocResponse)(response);

            dispatch((0, _actions.prepareFinalObject)("FireNOCs", (0, _get2.default)(response, "FireNOCs", [])));

            // Set no of buildings radiobutton and eventually the cards
            noOfBuildings = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.noOfBuildings", "SINGLE") === "MULTIPLE" ? "MULTIPLE" : "SINGLE";

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingRadioGroup", "props.value", noOfBuildings));

            // Set noc type radiobutton to NEW
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.nocRadioGroup", "props.value", "NEW"));

            // Set provisional fire noc number
            dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].provisionFireNOCNumber", (0, _get2.default)(response, "FireNOCs[0].fireNOCNumber", "")));

            // Set fire noc id to null
            dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].id", undefined));

          case 14:
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
        defaultValue: "PROVISIONAL"
      }
    }, (0, _defineProperty3.default)(_nocRadioGroup, "type", "array"), (0, _defineProperty3.default)(_nocRadioGroup, "beforeFieldChange", function beforeFieldChange(action, state, dispatch) {
      if (action.value === "PROVISIONAL") {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber", "props.style", { visibility: "hidden" }));
      } else {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber", "props.style", {}));
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
        // title: {
        //   value: "Please search owner profile linked to the mobile no.",
        //   key: "TL_MOBILE_NO_TOOLTIP_MESSAGE"
        // },
        // infoIcon: "info_circle"
      } }))
  })
});