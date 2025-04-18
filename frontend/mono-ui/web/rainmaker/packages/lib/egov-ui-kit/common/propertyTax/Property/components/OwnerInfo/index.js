"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOwnerInfo = exports.getOwnershipInfoUserCategory = exports.getOwnershipTypeInfoCategory = exports.getOwnershipTypeInfo = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _components = require("components");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _reqDocs = require("egov-pt/ui-config/screens/specs/pt-mutation/requiredDocuments/reqDocs");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons.js");

var _utils = require("egov-ui-kit/redux/app/utils");

var _api = require("egov-ui-kit/utils/api");

var _commons2 = require("egov-ui-kit/utils/commons");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _ActionItems = require("../ActionItems");

var _PendingAmountDue = require("../PendingAmountDue");

var _PendingAmountDue2 = _interopRequireDefault(_PendingAmountDue);

var _PropertyInfoCard = require("../PropertyInfoCard");

var _PropertyInfoCard2 = _interopRequireDefault(_PropertyInfoCard);

var _TransferOwnerShipDialog = require("../TransferOwnerShipDialog");

var _TransferOwnerShipDialog2 = _interopRequireDefault(_TransferOwnerShipDialog);

var _ViewHistory = require("../ViewHistory");

var _ViewHistory2 = _interopRequireDefault(_ViewHistory);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
var localizationLabelsData = (0, _utils.initLocalizationLabels)(locale);

var checkDocument = function checkDocument(owner) {
  if (owner) {
    if (owner.document && owner.document.documentType && owner.document.documentUid) {
      return owner.document;
    } else if (owner.documents && owner.documents.length > 0 && owner.documents[0].documentType && owner.documents[0].documentUid) {
      return owner.documents[0];
    } else {
      return false;
    }
  } else {
    return false;
  }
};

var getOwnershipTypeInfo = exports.getOwnershipTypeInfo = function getOwnershipTypeInfo(institution, generalMDMSDataById) {
  return institution && institution.type && generalMDMSDataById && generalMDMSDataById["SubOwnerShipCategory"] && generalMDMSDataById["SubOwnerShipCategory"][institution.type] && generalMDMSDataById["SubOwnerShipCategory"][institution.type].name || "NA";
};

var getOwnershipTypeInfoCategory = exports.getOwnershipTypeInfoCategory = function getOwnershipTypeInfoCategory(ownershipCategory, subOwnershipCategory) {
  return subOwnershipCategory ? (0, _commons2.getTranslatedLabel)("PROPERTYTAX_BILLING_SLAB_" + subOwnershipCategory, localizationLabelsData) : (0, _commons2.getTranslatedLabel)("PROPERTYTAX_BILLING_SLAB_" + ownershipCategory, localizationLabelsData);
};

var getOwnershipInfoUserCategory = exports.getOwnershipInfoUserCategory = function getOwnershipInfoUserCategory(owner, generalMDMSDataById, localizationLabelsData) {
  return owner && owner.ownerType && generalMDMSDataById && generalMDMSDataById["OwnerType"] && generalMDMSDataById["OwnerType"][owner.ownerType] &&
  // generalMDMSDataById["OwnerType"][owner.ownerType].name) ||
  (0, _commons.getLocaleLabels)("COMMON_MASTERS_OWNERTYPE_" + generalMDMSDataById["OwnerType"][owner.ownerType].code, "COMMON_MASTERS_OWNERTYPE_" + generalMDMSDataById["OwnerType"][owner.ownerType].code) || "NA";
};

var getOwnerInfo = exports.getOwnerInfo = function getOwnerInfo(latestPropertyDetails, generalMDMSDataById) {
  var oldPropertydetails = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var isInstitution = latestPropertyDetails.ownershipCategory === "INSTITUTIONALPRIVATE" || latestPropertyDetails.ownershipCategory === "INSTITUTIONALGOVERNMENT";

  var _ref = latestPropertyDetails || {},
      _ref$institution = _ref.institution,
      institution = _ref$institution === undefined ? {} : _ref$institution,
      _ref$owners = _ref.owners,
      ownerDetails = _ref$owners === undefined ? [] : _ref$owners,
      subOwnershipCategory = _ref.subOwnershipCategory,
      ownershipCategory = _ref.ownershipCategory;

  var owner = [];
  ownerDetails = ownerDetails && Array.isArray(ownerDetails) && ownerDetails.sort(function (owner1, owner2) {
    return owner1.name.localeCompare(owner2.name);
  });
  if (ownerDetails && ownerDetails.length > 0) {
    owner = ownerDetails[0];
  }
  if (oldPropertydetails && oldPropertydetails.owners) {
    oldPropertydetails.owners = oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners.sort(function (owner1, owner2) {
      return owner1.name.localeCompare(owner2.name);
    });
  }

  return ownerDetails && ownerDetails.map(function (owner, index) {
    return {
      items: [isInstitution ? {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME_INSTI", localizationLabelsData),
        value: institution && institution.name || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.institution && oldPropertydetails.institution.name
      } : {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME", localizationLabelsData),
        value: owner.name || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && oldPropertydetails.owners[index].name
      }, isInstitution ? {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_DESIGNATION", localizationLabelsData),
        value: institution.designation || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.institution && oldPropertydetails.institution.designation
      } : {
        key: (0, _commons2.getTranslatedLabel)("PT_SEARCHPROPERTY_TABEL_GUARDIANNAME", localizationLabelsData),
        value: owner.fatherOrHusbandName || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].fatherOrHusbandName
      }, isInstitution ? {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_TYPE_INSTI", localizationLabelsData),
        value: getOwnershipTypeInfo(institution, generalMDMSDataById),
        oldValue: oldPropertydetails && getOwnershipTypeInfo(oldPropertydetails.institution, generalMDMSDataById)
      } : {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_GENDER", localizationLabelsData),
        value: owner && owner.gender && (0, _commons.getLocaleLabels)("PT_FORM3_" + owner.gender.toUpperCase(), "PT_FORM3_" + owner.gender.toUpperCase()) || (0, _commons.getLocaleLabels)("NA", "NA"),
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && (0, _commons.getLocaleLabels)("PT_FORM3_" + oldPropertydetails.owners[index].gender.toUpperCase(), "PT_FORM3_" + oldPropertydetails.owners[index].gender.toUpperCase()),
        jsonPath: "gender"
      }, isInstitution ? {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_TEL_NO", localizationLabelsData),
        value: owner.altContactNumber || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].altContactNumber
      } : {
        key: (0, _commons2.getTranslatedLabel)("PT_FORM3_OWNERSHIP_TYPE", localizationLabelsData),
        value: getOwnershipTypeInfoCategory(ownershipCategory, subOwnershipCategory),
        oldValue: oldPropertydetails && getOwnershipTypeInfoCategory(oldPropertydetails.ownershipCategory, oldPropertydetails.subOwnershipCategory)
      }, isInstitution ? {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
        value: owner.mobileNumber || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].mobileNumber
      } : {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
        value: owner.mobileNumber || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].mobileNumber
      }, {
        key: (0, _commons2.getTranslatedLabel)("PT_FORM3_ALT_MOBILE_NO", localizationLabelsData),
        value: owner.alternatemobilenumber || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].alternatemobilenumber
      }, {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_EMAIL_ID", localizationLabelsData),
        value: owner.emailId ? owner.emailId || "NA" : "",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].emailId
      }, isInstitution ? {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_CORR_ADDR", localizationLabelsData),
        value: owner.correspondenceAddress || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].correspondenceAddress
      } : {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_CORR_ADDR", localizationLabelsData),
        value: owner.permanentAddress || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].permanentAddress
      }, isInstitution ? {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME_OF_AUTH", localizationLabelsData),
        value: owner.name || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && oldPropertydetails.owners[index].name
      } : {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_USER_CATEGORY", localizationLabelsData),
        value: getOwnershipInfoUserCategory(owner, generalMDMSDataById, localizationLabelsData),
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && getOwnershipInfoUserCategory(oldPropertydetails.owners[index], generalMDMSDataById, localizationLabelsData)
      }, checkDocument(owner) && (isInstitution ? {} : {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_DOCUMENT_TYPE", localizationLabelsData),
        value: (0, _commons2.getTranslatedLabel)("PT_" + checkDocument(owner).documentType.toUpperCase(), localizationLabelsData) || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && (0, _commons2.getTranslatedLabel)("PT_" + checkDocument(oldPropertydetails.owners[index]).documentType.toUpperCase(), localizationLabelsData) || "NA"
      }), checkDocument(owner) && (isInstitution ? {} : {
        key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_DOCUMENT_ID", localizationLabelsData),
        value: checkDocument(owner).documentUid || "NA",
        oldValue: oldPropertydetails && oldPropertydetails.owners && Array.isArray(oldPropertydetails.owners) && checkDocument(oldPropertydetails.owners[index]).documentUid || "NA"
      })]
    };
  });
};

var OwnerInfo = function (_Component) {
  (0, _inherits3.default)(OwnerInfo, _Component);

  function OwnerInfo() {
    var _ref2,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, OwnerInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = OwnerInfo.__proto__ || Object.getPrototypeOf(OwnerInfo)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      pendingAmountDue: false,
      viewHistory: false,
      docRequired: false,
      ownershipInfo: {}
    }, _this.openApplyDocsUI = function () {
      _this.props.handleField("property", "components.adhocDialog", "props.open", true);
      _this.setState({ docRequired: true });
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var requestBody, payload, mdmsMutationDocuments, documentUIChildren;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              requestBody = {
                MdmsCriteria: {
                  tenantId: _common2.default.tenantId,
                  moduleDetails: [{
                    moduleName: "PropertyTax",
                    masterDetails: [{
                      name: "MutationDocuments"
                    }, {
                      name: "UpdateNumber"
                    }]
                  }]
                }
              };
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 4:
              payload = _context.sent;
              mdmsMutationDocuments = (0, _get2.default)(payload, "MdmsRes.PropertyTax.MutationDocuments", []);

              _this.props.prepareFinalObject("mdmsMutationDocuments", mdmsMutationDocuments);
              _this.props.prepareFinalObject("updateNumberConfig", (0, _get2.default)(payload, "MdmsRes.PropertyTax.UpdateNumber[0]", {}));
              documentUIChildren = {};

              if (mdmsMutationDocuments && mdmsMutationDocuments.length > 0) {
                documentUIChildren = (0, _reqDocs.getRequiredDocuments)(mdmsMutationDocuments);
              }
              _this.props.prepareFinalObject("mutationDocumentUIChildren", documentUIChildren);
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](1);

              console.log(_context.t0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 13]]);
    })), _this.transformData = function (property) {
      var owners = property.owners,
          institution = property.institution,
          ownershipCategory = property.ownershipCategory;

      var itemKey = [];
      owners.map(function (item) {
        var owner = {};
        if (institution) {
          owner = {
            PT_OWNERSHIP_INFO_NAME_INSTI: institution.name || "NA",
            PT_OWNERSHIP_INFO_DESIGNATION: institution.designation || "NA",
            PT_OWNERSHIP_INFO_TYPE_INSTI: institution.type || "NA",
            PT_FORM3_OWNERSHIP_TYPE: (0, _commons2.getTranslatedLabel)("PROPERTYTAX_BILLING_SLAB_" + ownershipCategory.split(".")[0]) || "NA",
            PT_OWNERSHIP_INFO_NAME_OF_AUTH: institution.nameOfAuthorizedPerson || "NA",
            PT_OWNERSHIP_INFO_TEL_NO: item.altContactNumber || "NA",
            PT_MUTATION_AUTHORISED_EMAIL: item.emailId || "NA",
            PT_OWNER_MOBILE_NO: item.mobileNumber || "NA",
            PT_OWNERSHIP_INFO_CORR_ADDR: item.correspondenceAddress || "NA"
          };
        } else {
          owner = {
            PT_OWNER_NAME: item.name || "NA",
            PT_GUARDIANS_NAME: item.fatherOrHusbandName || "NA",
            PT_GENDER: item.gender || "NA",
            // "PT_OWNERSHIP_INFO_DOB": convertEpochToDate(item.dob) || "NA",
            PT_OWNER_MOBILE_NO: item.mobileNumber || "NA",
            PT_MUTATION_AUTHORISED_EMAIL: item.emailId || "NA",
            PT_MUTATION_TRANSFEROR_SPECIAL_CATEGORY: item.ownerType || "NA",
            PT_OWNERSHIP_INFO_CORR_ADDR: item.permanentAddress || "NA"
          };
          var document = checkDocument(item);
          if (document) {
            owner["PT_OWNERSHIP_DOCUMENT_TYPE"] = (0, _commons2.getTranslatedLabel)("PT_" + document.documentType.toUpperCase(), localizationLabelsData);
            owner["PT_OWNERSHIP_DOCUMENT_ID"] = document.documentUid;
          }
        }
        itemKey.push(owner);
      });
      return itemKey;
    }, _this.getUniqueList = function () {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var newList = [];
      list.map(function (element) {
        if (!JSON.stringify(newList).includes(JSON.stringify(element.acknowldgementNumber))) {
          newList.push(element);
        }
      });
      return newList && Array.isArray(newList) && newList.filter(function (element) {
        return element.creationReason != "UPDATE";
      });
    }, _this.getPropertyResponse = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(propertyId, tenantId, dialogName) {
        var queryObject, ownershipInfo, payload, _this$setState;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryObject = [{ key: "propertyIds", value: propertyId }, { key: "tenantId", value: tenantId }, { key: "audit", value: true }];
                ownershipInfo = {};
                _context2.prev = 2;
                _context2.next = 5;
                return (0, _api.httpRequest)("property-services/property/_search", "_search", queryObject);

              case 5:
                payload = _context2.sent;

                if (!(payload && payload.Properties.length > 0)) {
                  _context2.next = 11;
                  break;
                }

                payload.Properties = _this.getUniqueList(payload.Properties);
                payload.Properties.map(function (item) {
                  var _ownershipInfo$lastMo;

                  // let lastModifiedDate = convertEpochToDate(item.auditDetails.lastModifiedTime);
                  var lastModifiedDate = item.auditDetails.lastModifiedTime;
                  if (!ownershipInfo[lastModifiedDate]) {
                    ownershipInfo[lastModifiedDate] = [];
                  }
                  item.owners = item.owners.filter(function (owner) {
                    return owner.status == "ACTIVE";
                  });
                  (_ownershipInfo$lastMo = ownershipInfo[lastModifiedDate]).push.apply(_ownershipInfo$lastMo, (0, _toConsumableArray3.default)(_this.transformData(item)));
                });
                _this.setState((_this$setState = {}, (0, _defineProperty3.default)(_this$setState, dialogName, true), (0, _defineProperty3.default)(_this$setState, "ownershipInfo", ownershipInfo), _this$setState));
                return _context2.abrupt("return", true);

              case 11:
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](2);

                console.log(_context2.t0);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[2, 13]]);
      }));

      return function (_x3, _x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.openDialog = function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dialogName) {
        var _this$props, properties, waterDetails, sewerDetails, propertyId, tenantId;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$props = _this.props, properties = _this$props.properties, waterDetails = _this$props.waterDetails, sewerDetails = _this$props.sewerDetails;
                propertyId = properties.propertyId, tenantId = properties.tenantId;

                if (!(_this.props.totalBillAmountDue === 0 && waterDetails.length == 0 && sewerDetails.length == 0 && dialogName !== "viewHistory")) {
                  _context3.next = 6;
                  break;
                }

                if (properties.status != "ACTIVE") {
                  _this.props.toggleSnackbarAndSetText(true, { labelName: "Property in Workflow", labelKey: "ERROR_PROPERTY_IN_WORKFLOW" }, "error");
                } else {
                  // this.openApplyDocsUI();
                  _this.setState({ docRequired: true });
                  // let link = `/pt-mutation/apply-document?consumerCode=${propertyId}&tenantId=${tenantId}`;

                  // let moduleName = process.env.REACT_APP_NAME === "Citizen" ? '/citizen' : '/employee';
                  // window.location.href =
                  //   process.env.NODE_ENV === "production"
                  //     ? moduleName + link
                  //     : link;
                  // this.props.history.push(link);
                }
                _context3.next = 12;
                break;

              case 6:
                if (!(dialogName === "viewHistory")) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 9;
                return _this.getPropertyResponse(propertyId, tenantId, dialogName);

              case 9:
                _context3.next = 12;
                break;

              case 11:
                if (_this.props.totalBillAmountDue !== 0 || waterDetails.length > 0 || sewerDetails.length > 0) {
                  _this.setState({ pendingAmountDue: true });
                } else {
                  _this.setState((0, _defineProperty3.default)({}, dialogName, true));
                }

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.closeDialogue = function (dialogName) {
      _this.setState((0, _defineProperty3.default)({}, dialogName, false));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  // Static implementation as of now. Need to change


  (0, _createClass3.default)(OwnerInfo, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          properties = _props.properties,
          editIcon = _props.editIcon,
          generalMDMSDataById = _props.generalMDMSDataById,
          ownershipTransfer = _props.ownershipTransfer,
          viewHistory = _props.viewHistory,
          totalBillAmountDue = _props.totalBillAmountDue,
          waterDetails = _props.waterDetails,
          sewerDetails = _props.sewerDetails,
          mdmsMutationDocuments = _props.mdmsMutationDocuments,
          OldProperty = _props.OldProperty,
          updateNumberConfig = _props.updateNumberConfig;

      var ownerInfo = [];
      var multipleOwner = false;
      var header = "PT_OWNERSHIP_INFO_SUB_HEADER";
      var oldPropertydetails = "";
      if (OldProperty && Object.keys(OldProperty).length > 0) {
        oldPropertydetails = OldProperty.propertyDetails[0];
        // oldPropertydetails=null;
      }
      if (properties) {
        var propertyDetails = properties.propertyDetails;

        if (propertyDetails && propertyDetails.length > 0) {
          ownerInfo = oldPropertydetails ? getOwnerInfo(propertyDetails[0], generalMDMSDataById, oldPropertydetails) : getOwnerInfo(propertyDetails[0], generalMDMSDataById);
          if (ownerInfo.length > 1) {
            multipleOwner = true;
          }
        }
      }

      return _react2.default.createElement(
        "div",
        null,
        ownerInfo && _react2.default.createElement(_components.Card, {
          style: { backgroundColor: "rgb(242, 242, 242)", boxShadow: "none" },
          textChildren: _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              {
                className: editIcon ? "pt-rf-title rainmaker-displayInline" : "pt-rf-title rainmaker-displayInline ownerinfo-header",
                style: { justifyContent: "space-between", margin: "5px 0px 5px 0px" }
              },
              _react2.default.createElement(
                "div",
                {
                  className: editIcon ? "rainmaker-displayInline" : "rainmaker-displayInline ownerinfo-header",
                  style: { alignItems: "center", marginLeft: "13px" }
                },
                header && _react2.default.createElement(_translationNode2.default, {
                  labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                  label: header,
                  fontSize: "18px"
                })
              ),
              { editIcon: editIcon } && _react2.default.createElement(
                "span",
                { style: { alignItems: "right" } },
                editIcon
              ),
              (viewHistory || ownershipTransfer) && _react2.default.createElement(
                "div",
                { id: "pt-header-button-container", className: "header-button-container" },
                _react2.default.createElement(_ActionItems.ViewHistory, { viewHistory: viewHistory, openDialog: this.openDialog }),
                _react2.default.createElement(_ActionItems.TransferOwnership, { ownershipTransfer: ownershipTransfer, openDialog: this.openDialog })
              )
            ),
            _react2.default.createElement(
              "div",
              null,
              ownerInfo.map(function (ownerItem, ind) {
                return _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 col-xs-12 owner-info-card" },
                  multipleOwner && _react2.default.createElement(
                    "div",
                    { className: "pt-rf-title rainmaker-displayInline", style: { justifyContent: "space-between", margin: "5px 0px 5px 0px" } },
                    _react2.default.createElement(
                      "div",
                      { className: "rainmaker-displayInline", style: { alignItems: "center", marginLeft: "13px" } },
                      _react2.default.createElement(_translationNode2.default, {
                        labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                        label: "COMMON_OWNER",
                        secondaryText: "-" + (ind + 1),
                        fontSize: "18px"
                      })
                    )
                  ),
                  ownerItem && _react2.default.createElement(_PropertyInfoCard2.default, {
                    items: ownerItem.items,
                    additionalKey: {
                      key: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
                      tenantId: properties.tenantId,
                      key1: (0, _commons2.getTranslatedLabel)("PT_FORM3_ALT_MOBILE_NO", localizationLabelsData),
                      key2: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_CORR_ADDR", localizationLabelsData),
                      key3: (0, _commons2.getTranslatedLabel)("PT_OWNERSHIP_INFO_EMAIL_ID", localizationLabelsData),
                      propertyId: properties.propertyId,
                      updateNumberConfig: updateNumberConfig
                    },
                    ownerInfo: ownerInfo,
                    header: header,
                    showEditNumber: viewHistory || ownershipTransfer,
                    editIcon: editIcon
                  })
                );
              })
            )
          )
        }),
        this.state.docRequired && _react2.default.createElement(_TransferOwnerShipDialog2.default, {
          open: this.state.docRequired,
          amount: totalBillAmountDue,
          tenantId: properties.tenantId,
          consumerCode: properties.propertyId,
          documents: mdmsMutationDocuments,
          closeDialogue: function closeDialogue() {
            return _this3.closeDialogue("docRequired");
          },
          routeUrl: "/pt-mutation/apply?consumerCode=" + this.props.properties.propertyId + "&tenantId=" + this.props.properties.tenantId
        }),
        this.state.pendingAmountDue && _react2.default.createElement(_PendingAmountDue2.default, {
          open: this.state.pendingAmountDue,
          amount: totalBillAmountDue,
          waterDetails: waterDetails,
          sewerDetails: sewerDetails,
          tenantId: properties.tenantId,
          consumerCode: properties.propertyId,
          closeDialogue: function closeDialogue() {
            return _this3.closeDialogue("pendingAmountDue");
          }
        }),
        this.state.viewHistory && _react2.default.createElement(_ViewHistory2.default, {
          open: this.state.viewHistory,
          ownershipInfo: this.state.ownershipInfo,
          closeDialogue: function closeDialogue() {
            return _this3.closeDialogue("viewHistory");
          }
        })
      );
    }
  }]);
  return OwnerInfo;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  var mdmsMutationDocuments = (0, _get2.default)(preparedFinalObject, "mdmsMutationDocuments", []);
  var updateNumberConfig = (0, _get2.default)(preparedFinalObject, "updateNumberConfig", []);

  return { mdmsMutationDocuments: mdmsMutationDocuments, updateNumberConfig: updateNumberConfig };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleField: function handleField(a, b, c, d) {
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)(a, b, c, d));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouterDom.withRouter)(OwnerInfo));