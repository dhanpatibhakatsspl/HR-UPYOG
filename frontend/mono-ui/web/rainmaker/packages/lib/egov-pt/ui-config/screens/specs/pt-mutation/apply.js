"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareEditFlow = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.header = exports.stepper = exports.stepsData = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _uiUtils = require("../../../../ui-utils");

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _footer = require("./applyResource/footer");

var _mutationDetails = require("./applyResourceMutation/mutationDetails");

var _mutationDocuments = require("./applyResourceMutation/mutationDocuments");

var _mutationSummary = require("./applyResourceMutation/mutationSummary");

var _registrationDetails = require("./applyResourceMutation/registrationDetails");

var _transfereeDetails = require("./applyResourceMutation/transfereeDetails");

require("./index.css");

var _declarationSummary = require("./summaryResource/declarationSummary");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _registrationSummary = require("./summaryResource/registrationSummary");

var _transfereeSummary = require("./summaryResource/transfereeSummary");

var _transferorSummary = require("./summaryResource/transferorSummary");

var _transferorSummary2 = require("./summaryResource/transferorSummary1");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Transfer Details", labelKey: "PT_MUTATION_TRANSFER_DETAILS" }, { labelName: "Document Upload", labelKey: "PT_MUTATION_DOCUMENT_UPLOAD" }, { labelName: "Summary", labelKey: "PT_MUTATION_SUMMARY" }];
var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);

var applicationNumberContainer = function applicationNumberContainer() {
  var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
  if (applicationNumber) return {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pt",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "" + applicationNumber,
      visibility: "hidden"
    },
    visible: true
  };else return {};
};

// const getConsumerID = () => {
//   let mutationUrl = window.location.href;
//   let exp=new RegExp("[A-Z]{2,}\-[0-9]{3,}\-[0-9]{6,}");
//   let consumerId = mutationUrl.match(exp);
//   return consumerId[0];

// };

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Transfer of Ownership (" + (0, _utils2.getCurrentFinancialYear)() + ")", //later use getFinancialYearDates
    labelKey: "PT_MUTATION_TRANSFER_HEADER"
  }),
  //applicationNumber: applicationNumberContainer()
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pt",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "consumerCode"),
      label: {
        labelValue: "Property Tax Unique ID.",
        labelKey: "PT_PROPERTY_TAX_UNIQUE_ID"
      }
    },
    visible: true
  }
});

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    transferorDetails: (0, _extends3.default)({}, _transferorSummary2.transferorSummary),
    transferorInstitutionDetails: (0, _extends3.default)({}, _transferorSummary2.transferorInstitutionSummary),
    transfereeDetails: _transfereeDetails.transfereeDetails,
    mutationDetails: _mutationDetails.mutationDetails,
    registrationDetails: _registrationDetails.registrationDetails
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    documentDetails: _mutationDocuments.documentDetails
  },
  visible: false
};

var formwizardThirdStep = exports.formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {
    summary: (0, _utils.getCommonCard)({
      transferorSummary: (0, _extends3.default)({}, _transferorSummary.transferorSummary),
      transferorInstitutionSummary: (0, _extends3.default)({}, _transferorSummary.transferorInstitutionSummary),
      transfereeSummary: (0, _extends3.default)({}, _transfereeSummary.transfereeSummary),
      transfereeInstitutionSummary: (0, _extends3.default)({}, _transfereeSummary.transfereeInstitutionSummary),
      mutationSummary: _mutationSummary.mutationSummary,
      registrationSummary: _registrationSummary.registrationSummary,
      documentsSummary: _documentsSummary.documentsSummary,
      declarationSummary: _declarationSummary.declarationSummary
    })

  },

  visible: false
};

var getPropertyData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, consumerCode, queryObject, payload, owners, previousPropertyUuid;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
            _context.prev = 2;
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "propertyIds",
              value: consumerCode
            }];
            payload = null;
            _context.next = 7;
            return (0, _uiUtils.httpRequest)("post", "/property-services/property/_search", "_search", queryObject);

          case 7:
            payload = _context.sent;


            if (payload && payload.Properties && payload.Properties[0] && payload.Properties[0].owners && payload.Properties[0].owners.length > 0) {
              owners = [];

              payload.Properties[0].owners.map(function (owner) {
                owner.documentUid = owner.documents ? owner.documents[0].documentUid : "NA";
                owner.documentType = owner.documents ? owner.documents[0].documentType : "NA";

                if (owner.status == "ACTIVE") {
                  owners.push(owner);
                }
              });

              payload.Properties[0].ownersInit = owners;
              payload.Properties[0].ownershipCategoryInit = payload.Properties[0].ownershipCategory;
            }
            previousPropertyUuid = payload.Properties[0].additionalDetails && payload.Properties[0].additionalDetails.previousPropertyUuid;

            payload.Properties[0].additionalDetails = { previousPropertyUuid: previousPropertyUuid };
            dispatch((0, _actions.prepareFinalObject)("Property", payload.Properties[0]));

            (0, _utils2.setCardVisibility)(state, action, dispatch);

            dispatch((0, _actions.prepareFinalObject)("PropertiesTemp", (0, _cloneDeep2.default)(payload.Properties)));
            dispatch((0, _actions.prepareFinalObject)("PropertyOld", {}));
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](2);

            console.log(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 17]]);
  }));

  return function getPropertyData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getApplicationData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var tenantId, applicationNumber, queryObject, payload, auditResponse, inActiveOwners, activeOwners, propertiesAudit, previousActiveProperty, documents;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
            _context2.prev = 2;
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "acknowledgementIds",
              value: applicationNumber
            }];
            payload = null;
            _context2.next = 7;
            return (0, _uiUtils.httpRequest)("post", "/property-services/property/_search", "_search", queryObject);

          case 7:
            payload = _context2.sent;

            if (!(payload && payload.Properties && payload.Properties[0] && payload.Properties[0].owners && payload.Properties[0].owners.length > 0)) {
              _context2.next = 25;
              break;
            }

            _context2.next = 11;
            return (0, _commons2.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "propertyIds", value: payload.Properties[0].propertyId }, {
              key: "audit",
              value: true
            }]);

          case 11:
            auditResponse = _context2.sent;
            inActiveOwners = [];
            activeOwners = [];

            payload.Properties[0].owners.map(function (owner) {
              owner.documentUid = owner.documents ? owner.documents[0].documentUid : "NA";
              owner.documentType = owner.documents ? owner.documents[0].documentType : "NA";

              if (owner.status == "ACTIVE") {
                activeOwners.push((0, _extends3.default)({}, owner, { status: "INACTIVE" }));
              } else {
                inActiveOwners.push((0, _extends3.default)({}, owner, { status: "ACTIVE" }));
              }
            });

            payload.Properties[0].owners = inActiveOwners;
            payload.Properties[0].ownersInit = inActiveOwners;
            payload.Properties[0].ownersTemp = activeOwners;
            payload.Properties[0].ownershipCategoryInit = payload.Properties[0].ownershipCategory;
            payload.Properties[0].ownershipCategoryTemp = payload.Properties[0].ownershipCategory;

            payload.Properties[0].institutionTemp = payload.Properties[0].institution;
            payload.Properties[0].institutionInit = null;
            payload.Properties[0].institution = null;
            if (!payload.Properties[0].ownershipCategoryTemp.includes("SINGLEOWNER")) {
              (0, _transfereeDetails.onChangeTypeOfOwnership)({ value: payload.Properties[0].ownershipCategoryTemp }, state, dispatch, false);
            }
            if (auditResponse && Array.isArray((0, _get2.default)(auditResponse, "Properties", [])) && (0, _get2.default)(auditResponse, "Properties", []).length > 0) {
              propertiesAudit = (0, _get2.default)(auditResponse, "Properties", []);
              previousActiveProperty = propertiesAudit.filter(function (property) {
                return property.status == 'ACTIVE';
              }).sort(function (x, y) {
                return y.auditDetails.lastModifiedTime - x.auditDetails.lastModifiedTime;
              })[0];


              payload.Properties[0].ownershipCategoryInit = previousActiveProperty.ownershipCategory;
              payload.Properties[0].ownershipCategory = previousActiveProperty.ownershipCategory;
              if (payload.Properties[0].ownershipCategoryInit.startsWith("INSTITUTION")) {
                payload.Properties[0].institutionInit = previousActiveProperty.institution;
                payload.Properties[0].institution = previousActiveProperty.institution;
              }
              inActiveOwners = previousActiveProperty.owners.filter(function (owner) {
                return owner.status == "ACTIVE";
              });
              payload.Properties[0].owners = inActiveOwners;
              payload.Properties[0].ownersInit = inActiveOwners;
            }

          case 25:

            // const previousPropertyUuid = payload.Properties[0].additionalDetails && payload.Properties[0].additionalDetails.previousPropertyUuid;
            // payload.Properties[0].additionalDetails = { previousPropertyUuid };


            documents = (0, _get2.default)(payload, 'Properties[0].documents', []);

            documents = documents.map(function (document) {
              return (0, _extends3.default)({}, document, { documentType: document.documentType.includes('OWNER') ? document.documentType : "OWNER.TRANSFERREASONDOCUMENT." + document.documentType });
            });
            (0, _set2.default)(payload, 'Properties[0].documents', documents);
            dispatch((0, _actions.prepareFinalObject)("DocumentsPrefill", documents && Array.isArray(documents) && documents.length > 0 ? true : false));
            dispatch((0, _actions.prepareFinalObject)("Property", payload.Properties[0]));
            dispatch((0, _actions.prepareFinalObject)("PropertyOld", (0, _cloneDeep2.default)(payload.Properties[0])));
            (0, _utils2.setCardVisibility)(state, action, dispatch);
            dispatch((0, _actions.prepareFinalObject)("PropertiesTemp", (0, _cloneDeep2.default)(payload.Properties)));
            // Prefilling radio buttons
            (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.transfereeDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children.genderRadioGroup.props.value", payload.Properties[0].ownersTemp[0].gender);

            (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.mutationDetails.children.cardContent.children.mutationDetailsContainer.children.getMutationPendingRadioButton.props.value", payload.Properties[0].additionalDetails.isMutationInCourt);

            (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.mutationDetails.children.cardContent.children.mutationDetailsContainer.children.getMutationStateAcquisitionRadioButton.props.value", payload.Properties[0].additionalDetails.isPropertyUnderGovtPossession);
            (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.registrationDetails.children.cardContent.children.registrationDetailsContainer.children.transferReason.props.value", payload.Properties[0].additionalDetails.reasonForTransfer);

            _context2.next = 42;
            break;

          case 39:
            _context2.prev = 39;
            _context2.t0 = _context2["catch"](2);

            console.log("mutation edit flow error ", _context2.t0);

          case 42:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 39]]);
  }));

  return function getApplicationData(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getSpecialCategoryDocumentTypeMDMSData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
    var tenantId, mdmsBody, payload, OwnerTypeDocument, propertyConfiguation;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tenantId = (0, _formUtils.getCommonTenant)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{ name: "OwnerTypeDocument" }, { name: "PropertyConfiguration" }]

                }]
              }
            };
            _context3.prev = 2;
            payload = null;
            _context3.next = 6;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context3.sent;
            OwnerTypeDocument = (0, _get2.default)(payload, "MdmsRes.PropertyTax.OwnerTypeDocument");
            propertyConfiguation = (0, _get2.default)(payload, "MdmsRes.PropertyTax.PropertyConfiguration");

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.OwnerTypeDocument", OwnerTypeDocument));
            dispatch((0, _actions.prepareFinalObject)("PropertyConfiguration", propertyConfiguation));
            (0, _utils2.showHideMutationDetailsCard)(action, state, dispatch);
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);

            console.log(_context3.t0);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 14]]);
  }));

  return function getSpecialCategoryDocumentTypeMDMSData(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var getMdmsData = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(action, state, dispatch) {
    var tenantId, mdmsBody, payload, OwnerShipCategory, institutions;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tenantId = (0, _formUtils.getCommonTenant)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{ name: "OwnerType" }, { name: "OwnerShipCategory" }]
                }, {
                  moduleName: "firenoc",
                  masterDetails: [{ name: "BuildingType" }, { name: "FireStations" }]
                }, {
                  moduleName: "egov-location",
                  masterDetails: [{
                    name: "TenantBoundary"
                  }]
                }, {
                  moduleName: "tenant",
                  masterDetails: [{
                    name: "tenants"
                  }]
                }, { moduleName: "PropertyTax", masterDetails: [{ name: "MutationDocuments" }] }]
              }
            };
            _context4.prev = 2;
            payload = null;
            _context4.next = 6;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context4.sent;
            OwnerShipCategory = (0, _get2.default)(payload, "MdmsRes.common-masters.OwnerShipCategory");
            institutions = [];

            OwnerShipCategory = OwnerShipCategory.map(function (category) {
              if (category.code.includes("INDIVIDUAL")) {
                return category.code;
              } else {
                var code = category.code.split(".");
                institutions.push({ code: code[1], parent: code[0], active: true });
                return code[0];
              }
            });
            OwnerShipCategory = OwnerShipCategory.filter(function (v, i, a) {
              return a.indexOf(v) === i;
            });
            OwnerShipCategory = OwnerShipCategory.map(function (val) {
              return { code: val, active: true };
            });
            payload.MdmsRes['common-masters'].Institutions = institutions;
            payload.MdmsRes['common-masters'].OwnerShipCategory = OwnerShipCategory;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](2);

            console.log(_context4.t0);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[2, 17]]);
  }));

  return function getMdmsData(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var getMdmsTransferReasonData = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(action, state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            tenantId = (0, _formUtils.getCommonTenant)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{ moduleName: "PropertyTax", masterDetails: [{ name: "ReasonForTransfer" }] }]
              }
            };
            _context5.prev = 2;
            payload = null;
            _context5.next = 6;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context5.sent;

            dispatch((0, _actions.prepareFinalObject)("ReasonForTransfer", payload.MdmsRes));
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](2);

            console.log(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[2, 10]]);
  }));

  return function getMdmsTransferReasonData(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var getFirstListFromDotSeparated = function getFirstListFromDotSeparated(list) {
  list = list.map(function (item) {
    if (item.active) {
      return item.code.split(".")[0];
    }
  });
  list = [].concat((0, _toConsumableArray3.default)(new Set(list))).map(function (item) {
    return { code: item };
  });
  return list;
};

var prepareEditFlow = exports.prepareEditFlow = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch, applicationNumber, tenantId) {
    var response, noOfBuildings, nocType;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!applicationNumber) {
              _context6.next = 11;
              break;
            }

            _context6.next = 3;
            return (0, _commons2.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "propertyIds", value: applicationNumber }]);

          case 3:
            response = _context6.sent;

            // let response = sampleSingleSearch();

            response = (0, _commons2.furnishNocResponse)(response);

            dispatch((0, _actions.prepareFinalObject)("Properties", (0, _get2.default)(response, "Properties", [])));
            if (applicationNumber) {
              (0, _commons2.setApplicationNumberBox)(state, dispatch, applicationNumber);
            }
            // Set no of buildings radiobutton and eventually the cards
            noOfBuildings = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.noOfBuildings", "SINGLE") === "MULTIPLE" ? "MULTIPLE" : "SINGLE";

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingRadioGroup", "props.value", noOfBuildings));

            // Set no of buildings radiobutton and eventually the cards
            nocType = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.fireNOCType", "NEW") === "NEW" ? "NEW" : "PROVISIONAL";

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.nocRadioGroup", "props.value", nocType));

            // setCardsIfMultipleBuildings(state, dispatch);

            // Set sample docs upload
            // dispatch(prepareFinalObject("documentsUploadRedux", sampleDocUpload()));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function prepareEditFlow(_x16, _x17, _x18, _x19) {
    return _ref6.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    // dispatch(unMountScreen("propertySearch"));
    // dispatch(unMountScreen("search-preview"));
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var step = (0, _commons.getQueryArg)(window.location.href, "step");
    var isEdit = (0, _commons.getQueryArg)(window.location.href, "action") === "edit";
    dispatch((0, _actions.prepareFinalObject)("Property", {}));
    dispatch((0, _actions.prepareFinalObject)("ptmDocumentsUploadRedux", {}));
    dispatch((0, _actions.prepareFinalObject)("Property.additionalDetails", {}));

    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.transferorDetails.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentID.props.style.display", 'none');
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.transferorDetails.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType.props.style.display", 'none');
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transferorSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentID.props.style.display", 'none');
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transferorSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType.props.style.display", 'none');

    isEdit ? getApplicationData(action, state, dispatch) : getPropertyData(action, state, dispatch);

    //Set Module Name
    (0, _set2.default)(state, "screenConfiguration.moduleName", "pt-mutation");

    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(function (response) {
      // Set Dropdowns Data
      var buildingUsageTypeData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType", []);
      buildingUsageTypeData = getFirstListFromDotSeparated(buildingUsageTypeData);
      dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.DropdownsData.BuildingUsageType", buildingUsageTypeData));
      var ownershipCategory = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory", []);
      //  ownershipCategory = getFirstListFromDotSeparated(ownershipCategory);
      dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.DropdownsData.OwnershipCategory", ownershipCategory));

      // Set Documents Data (TEMP)
      (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
    });

    getMdmsTransferReasonData(action, state, dispatch);

    getSpecialCategoryDocumentTypeMDMSData(action, state, dispatch);
    // Search in cprepareDocumentsUploadDataase of EDIT flow
    prepareEditFlow(state, dispatch, applicationNumber, tenantId);

    // Code to goto a specific step through URL
    if (step && step.match(/^\d+$/)) {
      var intStep = parseInt(step);
      (0, _set2.default)(action.screenConfig, "components.div.children.stepper.props.activeStep", intStep);
      var formWizardNames = ["formwizardFirstStep", "formwizardSecondStep", "formwizardThirdStep"];
      for (var i = 0; i < 4; i++) {
        (0, _set2.default)(action.screenConfig, "components.div.children." + formWizardNames[i] + ".visible", i == step);
        (0, _set2.default)(action.screenConfig, "components.div.children.footer.children.previousButton.visible", step != 0);
      }
    }

    // Set defaultValues of radiobuttons and selectors
    var noOfBuildings = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings", "SINGLE");
    (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings", noOfBuildings);
    var nocType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType", "PROVISIONAL");
    (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType", nocType);

    // Preset multi-cards (CASE WHEN DATA PRE-LOADED)
    if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings") === "MULTIPLE") {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.props.style", { display: "none" });
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer.props.style", {});
    }
    if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType") === "PROVISIONAL") {
      (0, _set2.default)(action.screenConfig, "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber.props.style", { visibility: "hidden" });
    }

    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.propertySummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardThirdStep.children.summary.children.cardContent.children.transferorSummary.children.cardContent.children.header.children.editSection.visible", false);

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, header)
          }
        },
        stepper: stepper,
        formwizardFirstStep: formwizardFirstStep,
        formwizardSecondStep: formwizardSecondStep,
        formwizardThirdStep: formwizardThirdStep,
        footer: _footer.footer
      }
    }
  }
};

exports.default = screenConfig;