"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _lodash = require("lodash");

var _utils2 = require("./../utils");

var _deathSearchCard = require("./deathSearchResources/deathSearchCard");

var _searchResults = require("./deathSearchResources/searchResults");

require("./deathSearchResources/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Search Certificate",
  labelKey: "BND_DEATH_SEARCH_DOWNLOAD"
}); //returns action object


var getCertificate = {
  uiFramework: "material-ui",
  name: "getCertificate",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    (0, _utils2.loadMdmsData)(action, state, dispatch).then(function (response) {
      var tenants = (0, _lodash.get)(response, "MdmsRes.tenant.tenants");
      //Requires City Module Updations of MDMS? tobechanged
      var jpFilter = "$[?(@.code != 'pb')]";
      var onlyCBs = _jsonpath2.default.query(tenants, jpFilter);
      if (!(process.env.REACT_APP_NAME === "Citizen")) {
        var tenantId = (0, _localStorageUtils.getTenantId)();
        var currentCbFilter = "$[?(@.code == '" + tenantId + "')]";
        onlyCBs = _jsonpath2.default.query(onlyCBs, currentCbFilter);

        dispatch((0, _actions.prepareFinalObject)("bnd.death.tenantId", tenantId));
        (0, _lodash.set)(action.screenConfig, "components.div.children.deathSearchCard.children.cardContent.children.searchContainerCommon.children.cantonmentSelect.props.isDisabled", true);
        (0, _lodash.set)(action.screenConfig, "components.div.children.deathSearchCard.children.cardContent.children.searchContainerCommon.children.gender.props.required", false);
        (0, _lodash.set)(action.screenConfig, "components.div.children.deathSearchCard.children.cardContent.children.searchContainerCommon.children.gender.required", false);
        (0, _utils2.loadHospitals)(action, state, dispatch, "death", tenantId).then(function (response) {
          if (response && response.MdmsRes && response.MdmsRes["birth-death-service"] && response.MdmsRes["birth-death-service"].hospitalList) {
            var hptList = response.MdmsRes["birth-death-service"].hospitalList;
            var newList = [].concat((0, _toConsumableArray3.default)(hptList.filter(function (hos) {
              return hos.active;
            })), [{
              hospitalName: "Others"
            }]);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = newList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var hospital = _step.value;

                hospital.code = hospital.hospitalName;
                hospital.name = hospital.hospitalName;
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            dispatch((0, _actions.prepareFinalObject)("bnd.allHospitals", newList));
          } else {
            dispatch((0, _actions.prepareFinalObject)("bnd.allHospitals", [{ code: "Others", name: "Others" }]));
          }
        });
      }
      onlyCBs.sort(function (a, b) {
        return a.code > b.code ? 1 : -1;
      });
      dispatch((0, _actions.prepareFinalObject)("bnd.allTenants", onlyCBs));
    });

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css bd-search-header",
        id: "bndDeathSearch"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          props: {
            className: "bd-btn-hiw"
          },

          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6
              }
            }, header),
            groupBillButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: process.env.REACT_APP_NAME !== "Citizen" && (0, _utils2.ifUserRoleExists)("DEATH_APPLICATION_CREATOR"),
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px"
                }
              },
              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px"
                    }
                  }
                },
                ButtonLabel: (0, _utils.getLabel)({
                  labelName: "Group Bills",
                  labelKey: "ACTION_TEST_DEATH_NEW_REGISTRATION"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/death-employee/newRegistration" : "/death-employee/newRegistration"
              }
            },
            howitWorksButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: false,
              props: {
                //variant: "outlined",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "45",
                  borderRadius: "inherit"
                }
              },
              onClickDefination: {
                action: "page_change",
                path: "/death-common/how-it-works-death"
              },
              children: {
                helpButtonIcon: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "help-circle"
                  }
                },
                helpButtonLabel: (0, _utils.getLabel)({
                  labelName: "Death How it Works",
                  labelKey: "BND_HELP"
                })
              }
            }
          }
        },
        deathSearchCard: _deathSearchCard.deathSearchCard,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    }
  }
};

exports.default = getCertificate;