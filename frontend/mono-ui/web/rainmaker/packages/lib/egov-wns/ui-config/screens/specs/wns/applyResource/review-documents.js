"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReviewDocuments = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getReviewDocuments = exports.getReviewDocuments = function getReviewDocuments() {
  var isEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)({
          labelName: "Documents",
          labelKey: "WS_COMMON_DOCS"
        })),
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          visible: isEditable,
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
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition"
            // callBack: (state, dispatch) => {
            //   changeStep(state, dispatch, "", 2);
            // }
          }
        },
        documents: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-wns",
          componentPath: "DownloadFileContainer",
          props: {
            sourceJsonPath: "DocumentsData",
            className: "review-documents"
          }
        }
      }
    }
  });
};