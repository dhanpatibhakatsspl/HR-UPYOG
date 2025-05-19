"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOtherDetailsView = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gotoCreatePage = function gotoCreatePage(state, dispatch) {
  var createUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/create?step=4" : "/hrms/create?step=4";
  dispatch((0, _actions.setRoute)(createUrl));
};

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-hrms",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var educationCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: (0, _utils.getCommonGrayCard)({
      eduCardContainer: (0, _utils.getCommonContainer)({
        reviewDegree: (0, _utils.getLabelWithValue)({
          labelName: "Degree",
          labelKey: "HR_DEGREE_LABEL"
        }, { jsonPath: "Employee[0].education[0].qualification" }),
        reviewYear: (0, _utils.getLabelWithValue)({
          labelName: "Year",
          labelKey: "HR_YEAR_LABEL"
        }, { jsonPath: "Employee[0].education[0].yearOfPassing" }),
        reviewUniversity: (0, _utils.getLabelWithValue)({ labelName: "University", labelKey: "HR_UNIVERSITY_LABEL" }, { jsonPath: "Employee[0].education[0].university" }),
        reviewStream: (0, _utils.getLabelWithValue)({ labelName: "Stream", labelKey: "HR_STREAM_LABEL" }, { jsonPath: "Employee[0].education[0].stream" })
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].education",
    prefixSourceJsonPath: "children.cardContent.children.eduCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var deptCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: (0, _utils.getCommonGrayCard)({
      deptCardContainer: (0, _utils.getCommonContainer)({
        reviewTestName: (0, _utils.getLabelWithValue)({
          labelName: "Test Name",
          labelKey: "HR_TEST_NAME_LABEL"
        }, { jsonPath: "Employee[0].tests[0].test" }),
        reviewYear: (0, _utils.getLabelWithValue)({
          labelName: "Year",
          labelKey: "HR_YEAR_LABEL"
        }, { jsonPath: "Employee[0].tests[0].yearOfPassing" }),
        reviewRemarks: (0, _utils.getLabelWithValue)({ labelName: "Remarks", labelKey: "HR_REMARKS_LABEL" }, { jsonPath: "Employee[0].tests[0].remarks" })
        // documents: getDocuments()
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].tests",
    prefixSourceJsonPath: "children.cardContent.children.deptCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var educationDetailsHeader = getHeader({
  labelName: "Education Details",
  labelKey: "HR_SUMMARY_EDUCATION_DEATILS_SUBHEADER"
});
var deptDetailsHeader = getHeader({
  labelName: "Department Test Details",
  labelKey: "HR_SUMMARY_DEPT_TEST_DEATILS_SUBHEADER"
});

var getOtherDetailsView = exports.getOtherDetailsView = function getOtherDetailsView() {
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
          labelName: "Other Details",
          labelKey: "HR_OTHER_DET_HEADER"
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
    viewOne: educationDetailsHeader,
    viewTwo: educationCard,
    viewThree: deptDetailsHeader,
    viewFour: deptCard
  });
};