"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _citizenFunctions = require("./citizenSearchResource/citizenFunctions");

require("../utils/index.css");

var _index = require("../../../../ui-atoms-local/Icons/PayWnsBillIcon/index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../../ui-atoms-local/Icons/MyConnectionsIcon/index");

var _index4 = _interopRequireDefault(_index3);

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
    labelKey: "WS_COMMON_HEADER"
}, {
    classes: {
        root: "common-header-cont"
    }
});

var cardItems = [{
    label: {
        labelKey: "WS_COMMON_PAY_WS_BILL_HEADER"
    },
    icon: _react2.default.createElement(_index2.default, null),
    route: "search"
}, {
    label: {
        labelKey: "WS_MYCONNECTIONS_HEADER"
    },
    icon: _react2.default.createElement(_index4.default, null),
    route: "my-connections"
}];

var waterAndSewerageSearchAndResult = {
    uiFramework: "material-ui",
    name: "home",
    moduleName: "egov-wns",
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        (0, _citizenFunctions.fetchData)(action, state, dispatch);
        var moduleDetails = [{
            moduleName: "ws-services-masters",
            masterDetails: [{ name: "Documents" }]
        }];
        (0, _commons.getRequiredDocData)(action, dispatch, moduleDetails);
        return action;
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            moduleName: "egov-wns",
            props: {
                // className: "common-div-css"
            },
            children: {
                header: header,
                applyCard: {
                    uiFramework: "custom-molecules",
                    componentPath: "LandingPage",
                    moduleName: "egov-wns",
                    props: {
                        items: cardItems,
                        history: {}
                    }
                },
                listCard: {
                    uiFramework: "custom-molecules-local",
                    moduleName: "egov-wns",
                    componentPath: "NewConnection",
                    props: {
                        items: {
                            route: {
                                screenKey: "home",
                                jsonPath: "components.adhocDialog"
                            }
                        }

                    }
                },
                listCard1: {
                    uiFramework: "custom-molecules-local",
                    moduleName: "egov-wns",
                    componentPath: "MyApplications",
                    props: {
                        route: "my-applications"
                    }
                },
                listCard2: {
                    uiFramework: "custom-molecules-local",
                    moduleName: "egov-wns",
                    componentPath: "PastPayments",
                    props: {
                        route: "my-connections"
                    }
                },
                listCard3: {
                    uiFramework: "custom-molecules-local",
                    moduleName: "egov-wns",
                    componentPath: "HowItWorks"
                }
            }
        },
        adhocDialog: {
            uiFramework: "custom-containers",
            componentPath: "DialogContainer",
            props: {
                open: false,
                maxWidth: false,
                screenKey: "home"
            },
            children: {
                popup: {}
            }
        }
    }
};

exports.default = waterAndSewerageSearchAndResult;