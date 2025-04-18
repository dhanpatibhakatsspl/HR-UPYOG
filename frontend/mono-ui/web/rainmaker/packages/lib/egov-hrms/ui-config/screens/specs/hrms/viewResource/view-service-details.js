"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceDetailsView = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gotoCreatePage = function gotoCreatePage(state, dispatch) {
  var createUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/create?step=3" : "/hrms/create?step=3";
  dispatch((0, _actions.setRoute)(createUrl));
};

var assignmentCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: (0, _utils.getCommonGrayCard)({
      serviceCardContainer: (0, _utils.getCommonContainer)({
        reviewStatus: (0, _utils.getLabelWithValue)({
          labelName: "Status",
          labelKey: "HR_STATUS_LABEL"
        }, {
          jsonPath: "Employee[0].serviceHistory[0].serviceStatus",
          localePrefix: {
            moduleName: "egov-hrms",
            masterName: "EmployeeStatus"
          }, callBack: _utils2.checkValueForNA
        }),
        reviewServiceFrom: (0, _utils.getLabelWithValue)({
          labelName: "Service From Date",
          labelKey: "HR_SER_FROM_DATE_LABEL"
        }, {
          jsonPath: "Employee[0].serviceHistory[0].serviceFrom",
          callBack: _utils2.checkValueForNA
        }),
        reviewServiceTo: (0, _utils.getLabelWithValue)({
          labelName: "Service To Date",
          labelKey: "HR_SER_TO_DATE_LABEL"
        }, { jsonPath: "Employee[0].serviceHistory[0].serviceTo", callBack: _utils2.checkValueForNA }),
        reviewLocation: (0, _utils.getLabelWithValue)({
          labelName: "Location",
          labelKey: "HR_LOCATION_LABEL"
        }, { jsonPath: "Employee[0].serviceHistory[0].location", callBack: _utils2.checkValueForNA }),
        reviewOrderNo: (0, _utils.getLabelWithValue)({ labelName: "Order No", labelKey: "HR_ORDER_NO_LABEL" }, {
          jsonPath: "Employee[0].serviceHistory[0].orderNo", callBack: _utils2.checkValueForNA
        }),
        reviewCurrentWorking: (0, _utils.getLabelWithValue)({
          labelName: "Currently Working Here",
          labelKey: "HR_CURR_WORKING_LABEL"
        }, {
          jsonPath: "Employee[0].serviceHistory[0].isCurrentPosition", callBack: _utils2.checkValueForNA
        })
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].serviceHistory",
    prefixSourceJsonPath: "children.cardContent.children.serviceCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var getServiceDetailsView = exports.getServiceDetailsView = function getServiceDetailsView() {
  var isReview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)({
          labelName: "Service Details",
          labelKey: "HR_SER_DET_HEADER"
        })),
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isReview,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: (0, _utils.getLabel)({
              labelName: "Edit",
              labelKey: "HR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: gotoCreatePage
          }
        }
      }
    },
    viewOne: assignmentCard
  });
};