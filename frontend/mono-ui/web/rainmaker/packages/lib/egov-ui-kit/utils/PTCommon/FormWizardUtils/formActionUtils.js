"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routeTo = exports.createProperty = exports.assessProperty = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _propertyCreateUtils = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyCreateUtils");

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _api = require("egov-ui-kit/utils/api");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _lodash = require("lodash");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _formUtils = require("./formUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assessProperty = exports.assessProperty = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, props) {
        var purpose, propertyMethodAction, propertyId, assessmentId, financialYear, tenant, assessment, adhocExemptionPenalty, assessments, assessmentResponse, assessPropertyResponse, assessmentNumber;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        purpose = (0, _formUtils.getPurpose)();
                        propertyMethodAction = purpose == _formUtils.PROPERTY_FORM_PURPOSE.REASSESS ? "_update" : '_create';
                        propertyId = (0, _commons.getQueryArg)(window.location.href, "propertyId");
                        assessmentId = (0, _commons.getQueryArg)(window.location.href, "assessmentId");
                        financialYear = (0, _commons.getQueryArg)(window.location.href, "FY");
                        tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
                        assessment = {
                            "tenantId": tenant,
                            "propertyId": propertyId,
                            "financialYear": financialYear,
                            "assessmentDate": new Date().getTime() - 60000,
                            "source": "MUNICIPAL_RECORDS",
                            "channel": "CFC_COUNTER"
                        };
                        adhocExemptionPenalty = (0, _lodash.get)(props, 'adhocExemptionPenalty', {});

                        assessment.additionalDetails = {};

                        if (!(purpose == _formUtils.PROPERTY_FORM_PURPOSE.REASSESS)) {
                            _context.next = 14;
                            break;
                        }

                        _context.next = 12;
                        return getAssessmentDetails();

                    case 12:
                        assessments = _context.sent;

                        if (assessments.Assessments.length > 0) {
                            assessmentResponse = assessments.Assessments[0];

                            assessment = assessmentResponse;
                            assessment.assessmentDate = new Date().getTime() - 60000;
                        }

                    case 14:
                        if (Object.keys(adhocExemptionPenalty).length > 1) {
                            assessment.additionalDetails.adhocPenalty = Number(adhocExemptionPenalty.adhocPenalty);
                            assessment.additionalDetails.adhocPenaltyReason = adhocExemptionPenalty.adhocPenaltyReason == 'Others' ? adhocExemptionPenalty.adhocOtherPenaltyReason : adhocExemptionPenalty.adhocPenaltyReason;
                            assessment.additionalDetails.adhocExemption = Number(adhocExemptionPenalty.adhocExemption);
                            assessment.additionalDetails.adhocExemptionReason = adhocExemptionPenalty.adhocExemptionReason == 'Others' ? adhocExemptionPenalty.adhocOtherExemptionReason : adhocExemptionPenalty.adhocExemptionReason;
                        }
                        _context.prev = 15;
                        _context.next = 18;
                        return (0, _api.httpRequest)("property-services/assessment/" + propertyMethodAction, "" + propertyMethodAction, [], {
                            Assessment: assessment
                        });

                    case 18:
                        assessPropertyResponse = _context.sent;
                        assessmentNumber = (0, _lodash.get)(assessPropertyResponse, "Assessments[0].assessmentNumber", '');

                        routeToAcknowledgement(purpose, 'success', assessment.propertyId, assessment.tenantId, assessmentNumber, assessment.financialYear);
                        _context.next = 27;
                        break;

                    case 23:
                        _context.prev = 23;
                        _context.t0 = _context["catch"](15);

                        _store2.default.dispatch((0, _actions2.hideSpinner)());
                        routeToAcknowledgement(purpose, 'failure', assessment.propertyId, assessment.tenantId, null, assessment.financialYear);

                    case 27:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[15, 23]]);
    }));

    return function assessProperty(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getAssessmentDetails = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var tenantId, assessmentId, searchPropertyResponse;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
                        assessmentId = (0, _commons.getQueryArg)(window.location.href, "assessmentId");
                        _context2.next = 5;
                        return (0, _api.httpRequest)("property-services/assessment/_search?assessmentNumbers=" + assessmentId + "&tenantId=" + tenantId, "_search", [], {}, [], {}, true);

                    case 5:
                        searchPropertyResponse = _context2.sent;
                        return _context2.abrupt("return", searchPropertyResponse);

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2["catch"](0);

                    case 11:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 9]]);
    }));

    return function getAssessmentDetails() {
        return _ref2.apply(this, arguments);
    };
}();
var createProperty = exports.createProperty = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(Properties, action, props, isModify, preparedFinalObject) {
        var documentsUploadRedux, newProperties, propertiesEdited, propertyAdditionalDetails, location, search, isEditInWorkflow, isDocumentValid, propertyPayload, propertyMethodAction, currentAction, key, PTApplication, wfApplication, wfAction, wfBusinessService, workflow, propertyResponse, propertyId, tenantId, acknowldgementNumber;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        documentsUploadRedux = props.documentsUploadRedux, newProperties = props.newProperties, propertiesEdited = props.propertiesEdited, propertyAdditionalDetails = props.propertyAdditionalDetails, location = props.location;
                        search = location.search;
                        isEditInWorkflow = (0, _PTCommon.getQueryValue)(search, "mode") == 'WORKFLOWEDIT';
                        isDocumentValid = true;

                        Object.keys(documentsUploadRedux).map(function (key) {
                            if (documentsUploadRedux[key].documents && documentsUploadRedux[key].documents.length > 0 && !(documentsUploadRedux[key].dropdown && documentsUploadRedux[key].dropdown.value)) {
                                isDocumentValid = false;
                            }
                        });

                        if (isDocumentValid) {
                            _context3.next = 8;
                            break;
                        }

                        _store2.default.dispatch((0, _actions.toggleSnackbarAndSetText)(true, { labelName: "Please select document type for uploaded document", labelKey: "ERR_DOCUMENT_TYPE_MISSING" }, "error"));
                        return _context3.abrupt("return");

                    case 8:
                        propertyPayload = (0, _propertyCreateUtils.createPropertyPayload)(Properties, documentsUploadRedux);


                        if ((0, _PTCommon.getQueryValue)(search, "purpose") == 'update') {
                            propertyPayload.owners = (0, _lodash.get)(newProperties[0], 'owners', (0, _lodash.get)(propertyPayload, 'owners', []));
                            propertyPayload.institution = (0, _lodash.get)(newProperties[0], 'institution', (0, _lodash.get)(propertyPayload, 'institution', []));
                        }
                        propertyMethodAction = action;
                        currentAction = isEditInWorkflow ? 'CORRECTIONPENDING' : null;


                        if (action === "_update") {
                            key = isEditInWorkflow ? (0, _lodash.get)(preparedFinalObject, 'OldProperty.creationReason') : "UPDATE";

                            key = key && key.toUpperCase();
                            PTApplication = (0, _lodash.get)(preparedFinalObject, 'ptApplication', {});
                            wfApplication = PTApplication && PTApplication[key] || {};
                            wfAction = isEditInWorkflow ? wfApplication.editAction : wfApplication.action;
                            wfBusinessService = wfApplication.businessService;
                            workflow = {
                                "businessService": wfBusinessService || "PT.CREATE",
                                "action": wfAction || "OPEN",
                                "moduleName": "PT"
                            };

                            if (propertyPayload.workflow) {
                                propertyPayload.workflow = (0, _extends3.default)({}, propertyPayload.workflow, workflow);
                            } else {
                                propertyPayload.workflow = workflow;
                            }
                        }
                        _context3.prev = 13;

                        if (!isEditInWorkflow) {
                            // propertyPayload.creationReason = action == '_create' ? 'CREATE' :  'UPDATE';
                            if (action == '_create') {
                                propertyPayload.creationReason = (0, _lodash.get)(propertyPayload, "creationReason", 'CREATE');
                            } else {
                                propertyPayload.creationReason = 'UPDATE';
                            }
                        }

                        propertyPayload.additionalDetails ? (0, _extends3.default)({}, propertyPayload.additionalDetails, propertyAdditionalDetails) : (0, _extends3.default)({}, propertyAdditionalDetails);
                        _context3.next = 18;
                        return (0, _api.httpRequest)("property-services/property/" + propertyMethodAction, "" + propertyMethodAction, [], {
                            Property: propertyPayload
                        }, [], {}, true);

                    case 18:
                        propertyResponse = _context3.sent;

                        if (propertyResponse && propertyResponse.Properties && propertyResponse.Properties.length) {
                            if (propertyResponse.Properties[0].propertyId) {
                                propertyId = (0, _lodash.get)(propertyResponse, "Properties[0].propertyId", '');
                                tenantId = (0, _lodash.get)(propertyResponse, "Properties[0].tenantId", '');
                                acknowldgementNumber = (0, _lodash.get)(propertyResponse, "Properties[0].acknowldgementNumber", '');
                                // Navigate to success page

                                if (action == '_create') {
                                    routeToAcknowledgement(_formUtils.PROPERTY_FORM_PURPOSE.CREATE, 'success', propertyId, tenantId, acknowldgementNumber);
                                } else {
                                    routeToAcknowledgement(_formUtils.PROPERTY_FORM_PURPOSE.UPDATE, 'success', propertyId, tenantId, acknowldgementNumber);
                                }
                            }
                        }
                        _context3.next = 26;
                        break;

                    case 22:
                        _context3.prev = 22;
                        _context3.t0 = _context3["catch"](13);

                        _store2.default.dispatch((0, _actions2.hideSpinner)());
                        if (action == '_create') {
                            routeToAcknowledgement(_formUtils.PROPERTY_FORM_PURPOSE.CREATE, 'failure');
                        } else {
                            routeToAcknowledgement(_formUtils.PROPERTY_FORM_PURPOSE.UPDATE, 'failure');
                        }

                    case 26:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[13, 22]]);
    }));

    return function createProperty(_x3, _x4, _x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

var getRedirectToURL = function getRedirectToURL() {
    var link = window.location.href;
    var splittedLink = link.split('redirectTo=');
    if (splittedLink.length == 2) {
        return splittedLink[1];
    } else {
        return false;
    }
};

var routeToAcknowledgement = function routeToAcknowledgement(purpose, status, propertyId, tenantId, secondNumber, FY) {
    _store2.default.dispatch((0, _actions2.hideSpinner)());
    var routeLink = "/property-tax/pt-acknowledgment?purpose=" + purpose + "&status=" + status;
    routeLink = propertyId ? routeLink + "&propertyId=" + propertyId : "" + routeLink;
    routeLink = tenantId ? routeLink + "&tenantId=" + tenantId : "" + routeLink;
    routeLink = secondNumber ? routeLink + "&secondNumber=" + secondNumber : "" + routeLink;
    routeLink = FY ? routeLink + "&FY=" + FY : "" + routeLink;
    var redirectURL = getRedirectToURL();
    if (redirectURL && status == 'success') {
        routeLink = "/" + redirectURL;
    }
    routeTo(routeLink);
};

var routeTo = exports.routeTo = function routeTo(routeLink) {
    if (routeLink) {
        _store2.default.dispatch((0, _actions.setRoute)(routeLink));
    }
};