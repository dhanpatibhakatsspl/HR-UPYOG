"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _PTHeader = require("egov-ui-kit/common/common/PTHeader");

var _PTHeader2 = _interopRequireDefault(_PTHeader);

var _AcknowledgementCard = require("egov-ui-kit/common/propertyTax/AcknowledgementCard");

var _AcknowledgementCard2 = _interopRequireDefault(_AcknowledgementCard);

var _acknowledgementFormPDF = require("egov-ui-kit/common/propertyTax/PaymentStatus/Components/acknowledgementFormPDF");

var _acknowledgementFormPDF2 = _interopRequireDefault(_acknowledgementFormPDF);

var _createReceipt = require("egov-ui-kit/common/propertyTax/PaymentStatus/Components/createReceipt");

var _DocumentsUpload = require("egov-ui-kit/common/propertyTax/Property/components/DocumentsUpload");

var _DocumentsUpload2 = _interopRequireDefault(_DocumentsUpload);

var _propertyCreateUtils = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyCreateUtils");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _actions3 = require("egov-ui-kit/redux/common/actions");

var _actions4 = require("egov-ui-kit/redux/form/actions");

var _utils = require("egov-ui-kit/redux/form/utils");

var _actions5 = require("egov-ui-kit/redux/properties/actions");

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _FormWizardUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _propertyToFormTransformer = require("egov-ui-kit/utils/PTCommon/propertyToFormTransformer");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _lodash = require("lodash");

var _sortBy = require("lodash/sortBy");

var _sortBy2 = _interopRequireDefault(_sortBy);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _actions6 = require("redux/store/actions");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _ReviewForm = require("../ReviewForm");

var _ReviewForm2 = _interopRequireDefault(_ReviewForm);

var _PaymentForm = require("../ReviewForm/components/PaymentForm");

var _PaymentForm2 = _interopRequireDefault(_PaymentForm);

var _Forms = require("./components/Forms");

var _FloorsDetails = require("./components/Forms/FloorsDetails");

var _FloorsDetails2 = _interopRequireDefault(_FloorsDetails);

var _MultipleOwnerInfo = require("./components/Forms/MultipleOwnerInfo");

var _MultipleOwnerInfo2 = _interopRequireDefault(_MultipleOwnerInfo);

var _PlotDetails = require("./components/Forms/PlotDetails");

var _PlotDetails2 = _interopRequireDefault(_PlotDetails);

var _WizardComponent = require("./components/WizardComponent");

var _WizardComponent2 = _interopRequireDefault(_WizardComponent);

require("./index.css");

var _mdmsCalls = require("./utils/mdmsCalls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormWizard = function (_Component) {
  (0, _inherits3.default)(FormWizard, _Component);

  function FormWizard() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FormWizard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FormWizard.__proto__ || Object.getPrototypeOf(FormWizard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      financialYearFromQuery: "",
      dialogueOpen: false,
      selected: 0,
      ownerInfoArr: [],
      showOwners: false,
      formValidIndexArray: [],
      ownersCount: 0,
      estimation: [],
      draftRequest: {
        draft: {
          userId: (0, _lodash.get)(JSON.parse((0, _localStorageUtils.getUserInfo)()), "uuid"),
          draftRecord: {}
        }
      },
      totalAmountToBePaid: 100,
      draftByIDResponse: {},
      isFullPayment: true,
      partialAmountError: "",
      propertyUUId: "",
      termsAccepted: false,
      termsError: "",
      calculationScreenData: [],
      assessedPropertyDetails: {},
      purpose: _formUtils.PROPERTY_FORM_PURPOSE.DEFAULT,
      isAssesment: false,
      isReassesment: false,
      isCreate: true,
      isUpdate: false,
      nextButtonEnabled: true
    }, _this.toggleTerms = function () {
      return _this.setState({
        termsAccepted: !_this.state.termsAccepted,
        termsError: ""
      });
    }, _this.fetchDraftDetails = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(draftId, isReassesment) {
        var draftRequest, _this$props, updatePrepareFormDataFromDraft, fetchMDMDDocumentTypeSuccess, location, search, financialYearFromQuery, propertyId, assessmentId, tenantId, isCompletePayment, currentDraft, searchPropertyResponse, propertyResponse, preparedForm, ownerFormKeys, _configOwnersDetailsF, ownerDetails, totalowners, activeTab, activeModule, documentTypeMdms, billResponse, estimateFromGetBill;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                draftRequest = _this.state.draftRequest;
                _this$props = _this.props, updatePrepareFormDataFromDraft = _this$props.updatePrepareFormDataFromDraft, fetchMDMDDocumentTypeSuccess = _this$props.fetchMDMDDocumentTypeSuccess, location = _this$props.location;
                search = location.search;
                financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
                propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
                assessmentId = (0, _PTCommon.getQueryValue)(search, "assessmentId");
                tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");
                isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");
                _context.prev = 8;
                currentDraft = void 0;
                _context.next = 12;
                return (0, _api.httpRequest)("property-services/property/_search", "_search", [{
                  key: "tenantId",
                  value: tenantId
                }, {
                  key: "propertyIds",
                  value: (0, _PTCommon.getQueryValue)(search, "propertyId") //"PT-107-001278",
                }]);

              case 12:
                searchPropertyResponse = _context.sent;

                // searchPropertyResponse.Properties[0].owners.reverse(); // Properties owners are coming in reverse order
                searchPropertyResponse = (0, _propertyCreateUtils.getCreatePropertyResponse)(searchPropertyResponse);
                _context.next = 16;
                return (0, _propertyCreateUtils.prefillPTDocuments)(searchPropertyResponse, "Properties[0].documents", "documentsUploadRedux", _store2.default.dispatch, 'PT');

              case 16:
                _this.props.prepareFinalObject("newProperties", searchPropertyResponse.newProperties);
                if (searchPropertyResponse.Properties[0].propertyDetails && searchPropertyResponse.Properties[0].propertyDetails.length > 0) {
                  searchPropertyResponse.Properties[0].propertyDetails.forEach(function (item) {
                    item.units = (0, _sortBy2.default)(item.units, function (unit) {
                      return parseInt(unit.floorNo) || -99999;
                    });
                  });
                }
                propertyResponse = (0, _extends3.default)({}, searchPropertyResponse, {
                  Properties: [(0, _extends3.default)({}, searchPropertyResponse.Properties[0], {
                    propertyDetails: (0, _FormWizardUtils.getTargetPropertiesDetails)(searchPropertyResponse.Properties[0].propertyDetails, _this)
                  })]
                });
                preparedForm = (0, _propertyToFormTransformer.convertRawDataToFormConfig)(propertyResponse); //convertRawDataToFormConfig(responseee)

                currentDraft = {
                  draftRecord: (0, _extends3.default)({}, preparedForm, {
                    selectedTabIndex: 3,
                    prepareFormData: { Properties: propertyResponse["Properties"] //prepareFormData2,
                    } })
                };
                _this.setState({
                  propertyUUID: (0, _lodash.get)(searchPropertyResponse, "Properties[0].propertyDetails[0].citizenInfo.uuid")
                });
                _this.setState({
                  draftByIDResponse: currentDraft
                });
                ownerFormKeys = Object.keys(currentDraft.draftRecord).filter(function (formName) {
                  return formName.indexOf("ownerInfo_") !== -1;
                });
                _configOwnersDetailsF = (0, _FormWizardUtils.configOwnersDetailsFromDraft)(ownerFormKeys, _Forms.OwnerInformation), ownerDetails = _configOwnersDetailsF.ownerDetails, totalowners = _configOwnersDetailsF.totalowners;
                activeTab = (0, _lodash.get)(currentDraft, "draftRecord.selectedTabIndex", 0) > 3 ? 3 : (0, _lodash.get)(currentDraft, "draftRecord.selectedTabIndex", 0);
                activeModule = (0, _lodash.get)(currentDraft, "draftRecord.propertyAddress.fields.city.value", "");

                if (!activeModule) {
                  _context.next = 32;
                  break;
                }

                _context.next = 30;
                return (0, _mdmsCalls.getDocumentTypes)();

              case 30:
                documentTypeMdms = _context.sent;

                if (!!documentTypeMdms) fetchMDMDDocumentTypeSuccess(documentTypeMdms);

              case 32:
                if (isReassesment && activeModule) {
                  _this.props.handleFieldChange("propertyAddress", "city", activeModule);
                }
                updatePrepareFormDataFromDraft((0, _lodash.get)(currentDraft, "draftRecord.prepareFormData", {}));
                _this.props.updatePTForms(currentDraft.draftRecord);
                //Get estimate from bill in case of complete payment

                if (!isCompletePayment) {
                  _context.next = 44;
                  break;
                }

                _context.t0 = activeTab === 4;

                if (!_context.t0) {
                  _context.next = 41;
                  break;
                }

                _context.next = 40;
                return _this.callGetBill(propertyId, assessmentId, financialYearFromQuery, tenantId);

              case 40:
                _context.t0 = _context.sent;

              case 41:
                billResponse = _context.t0;
                estimateFromGetBill = billResponse ? (0, _PTCommon.getEstimateFromBill)(billResponse.Bill) : [];

                _this.setState({
                  estimation: estimateFromGetBill,
                  totalAmountToBePaid: estimateFromGetBill && estimateFromGetBill[0] && estimateFromGetBill[0].totalAmount || 0,
                  billResponse: billResponse
                });

              case 44:
                _this.setState({
                  ownerInfoArr: ownerDetails,
                  ownersCount: totalowners,
                  financialYearFromQuery: (0, _lodash.get)(currentDraft, "draftRecord.financialYear.fields.button.value"),
                  formValidIndexArray: (0, _lodash.range)(0, activeTab),
                  selected: activeTab,
                  draftRequest: {
                    draft: (0, _extends3.default)({
                      id: !isReassesment ? draftId : null
                    }, currentDraft)
                  }
                }, function () {
                  {
                    if (activeTab >= 4 && !isCompletePayment) {
                      _this.estimate().then(function (estimateResponse) {
                        if (estimateResponse) {
                          _this.setState({
                            estimation: estimateResponse && estimateResponse.Calculation,
                            totalAmountToBePaid: (0, _lodash.get)(estimateResponse, "Calculation[0].totalAmount", 0)
                          });
                        }
                      });
                    }
                  }
                });
                _context.next = 49;
                break;

              case 47:
                _context.prev = 47;
                _context.t1 = _context["catch"](8);

              case 49:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[8, 47]]);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.componentWillReceiveProps = function (nextprops) {
      if (!(0, _lodash.isEqual)(nextprops, _this.props)) {
        var inputType = document.getElementsByTagName("input");
        for (var input in inputType) {
          if (inputType[input].type === "number") {
            inputType[input].addEventListener("mousewheel", function () {
              this.blur();
            });
          }
        }
      }
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var selected, _this$props2, renderCustomTitleForPt, fetchGeneralMDMSData, fetchMDMDDocumentTypeSuccess, toggleSpinner, history, prepareFinalObject, fetchLocalizationLabel, _this3, resetForm, search, assessmentId, isReasses, isAssesment, isReassesment, isModify, tenantId, propertyId, draftUuid, requestBody, documentTypeMdms, ownerInfoArr, purpose, financialYearFromQuery, titleObject, id, receiptImageUrl;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              selected = _this.state.selected;
              _this$props2 = _this.props, renderCustomTitleForPt = _this$props2.renderCustomTitleForPt, fetchGeneralMDMSData = _this$props2.fetchGeneralMDMSData, fetchMDMDDocumentTypeSuccess = _this$props2.fetchMDMDDocumentTypeSuccess, toggleSpinner = _this$props2.toggleSpinner, history = _this$props2.history, prepareFinalObject = _this$props2.prepareFinalObject, fetchLocalizationLabel = _this$props2.fetchLocalizationLabel;

              toggleSpinner();
              _context2.prev = 3;
              _this3 = _this, resetForm = _this3.resetForm;
              search = _this.props.location.search;
              assessmentId = (0, _PTCommon.getQueryValue)(search, "assessmentId") || (0, _commons.fetchFromLocalStorage)("draftId");
              isReasses = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';
              isAssesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'assess';
              isReassesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';
              isModify = (0, _PTCommon.getQueryValue)(search, "mode") == 'WORKFLOWEDIT';
              tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");
              propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
              draftUuid = (0, _PTCommon.getQueryValue)(search, "uuid");

              fetchLocalizationLabel((0, _localStorageUtils.getLocale)(), tenantId, tenantId);
              requestBody = (0, _commons.generalMDMSDataRequestObj)(_common2.default.tenantId);

              fetchGeneralMDMSData(requestBody, "PropertyTax", (0, _commons.getGeneralMDMSDataDropdownName)());
              _context2.next = 19;
              return (0, _formUtils.getPTApplicationTypes)(_this.props.prepareFinalObject);

            case 19:
              _context2.next = 21;
              return (0, _mdmsCalls.getDocumentTypes)();

            case 21:
              documentTypeMdms = _context2.sent;

              if (!!documentTypeMdms) fetchMDMDDocumentTypeSuccess(documentTypeMdms);
              _this.unlisten = history.listen(function (location, action) {
                resetForm();
              });
              if (isReasses) {
                _this.props.fetchAssessments([{ key: "assessmentNumbers", value: (0, _PTCommon.getQueryValue)(search, "assessmentId") }, { key: "tenantId", value: tenantId }]);
              }

              if (!assessmentId) {
                _context2.next = 29;
                break;
              }

              fetchGeneralMDMSData(null, "PropertyTax", ["Floor", "OccupancyType", "OwnerShipCategory", "OwnerType", "PropertySubType", "PropertyType", "SubOwnerShipCategory", "UsageCategoryDetail", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor", "Rebate", "Penalty", "Interest", "FireCess"], "", tenantId);
              _context2.next = 29;
              return _this.fetchDraftDetails(assessmentId, isReassesment, draftUuid);

            case 29:
              ownerInfoArr = _this.state.ownerInfoArr;

              if (ownerInfoArr.length < 2) {
                (0, _FormWizardUtils.addOwner)(true, _Forms.OwnerInformation, _this);
              }
              purpose = (0, _formUtils.getPurpose)();
              financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();

              _this.setState({
                financialYearFromQuery: financialYearFromQuery, purpose: purpose,
                isAssesment: purpose == _formUtils.PROPERTY_FORM_PURPOSE.ASSESS,
                isReassesment: purpose == _formUtils.PROPERTY_FORM_PURPOSE.REASSESS,
                isCreate: purpose == _formUtils.PROPERTY_FORM_PURPOSE.CREATE,
                isUpdate: purpose == _formUtils.PROPERTY_FORM_PURPOSE.UPDATE
              });
              titleObject = isAssesment ? ["PT_PROPERTY_ASSESSMENT_HEADER", "(" + financialYearFromQuery + ")", ":", "PT_PROPERTY_ADDRESS_PROPERTY_ID", "" + propertyId] : isReasses ? ["PT_REASSESS_PROPERTY"] : [
              // "PT_PROPERTY_ASSESSMENT_HEADER",
              // `(${financialYearFromQuery})`,
              // ":",
              "PT_ADD_NEW_PROPERTY"];

              renderCustomTitleForPt({
                titleObject: titleObject
              });
              toggleSpinner();
              if (!(0, _PTCommon.getQueryValue)(search, "purpose")) {
                prepareFinalObject('Properties', []);
                prepareFinalObject('PropertiesTemp', []);
              } else if ((0, _PTCommon.getQueryValue)(search, "purpose") == "update" || (0, _PTCommon.getQueryValue)(search, "purpose") == "assess" || (0, _PTCommon.getQueryValue)(search, "purpose") == "reassess") {
                prepareFinalObject('Properties', _this.props.common.prepareFormData.Properties);
              }
              // Fetch property and store in state as Old property in case of edit in workflow

              if (!isModify) {
                _context2.next = 44;
                break;
              }

              _context2.next = 41;
              return (0, _propertyCreateUtils.setOldPropertyData)(search, prepareFinalObject);

            case 41:
              _this.props.setFieldProperty("propertyAddress", "city", "disabled", true);
              _context2.next = 46;
              break;

            case 44:
              _this.props.setFieldProperty("propertyAddress", "city", "disabled", false);
              prepareFinalObject('OldProperty', null);

            case 46:
              _context2.next = 51;
              break;

            case 48:
              _context2.prev = 48;
              _context2.t0 = _context2["catch"](3);

              toggleSpinner();

            case 51:
              if (selected > 2) {
                id = _this.state.assessedPropertyDetails.Properties[0].propertyDetails[0].tenantId;
                receiptImageUrl = "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/" + id + "/logo.png";

                _this.convertImgToDataURLviaCanvas(receiptImageUrl, function (data) {
                  this.setState({ imageUrl: data });
                }.bind(_this));
              }
              prepareFinalObject('propertiesEdited', false);

            case 53:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[3, 48]]);
    })), _this.handleRemoveOwner = function (index, formKey) {
      var ownerInfoArr = _this.state.ownerInfoArr;

      var updatedOwnerArr = [].concat((0, _toConsumableArray3.default)(ownerInfoArr));
      updatedOwnerArr.splice(ownerInfoArr.findIndex(function (ownerData) {
        return ownerData.index === index;
      }), 1);
      _this.setState({
        ownerInfoArr: updatedOwnerArr
      });
      _this.props.deleteForm(formKey);
    }, _this.getConfigFromCombination = function (combination, fetchConfigurationFn) {
      var configObject = fetchConfigurationFn(combination);
      return configObject;
    }, _this.getOwnerDetails = function (ownerType) {
      var purpose = _this.state.purpose;

      var disableOwner = !_formUtils.formWizardConstants[purpose].canEditOwner;
      switch (ownerType) {
        case "SINGLEOWNER":
          return _react2.default.createElement(_Forms.OwnerInfoHOC, { disabled: disableOwner });
        case "MULTIPLEOWNERS":
          return _react2.default.createElement(_MultipleOwnerInfo2.default, {
            addOwner: function addOwner() {
              (0, _FormWizardUtils.addOwner)(false, _Forms.OwnerInformation, _this);
            },
            handleRemoveOwner: _this.handleRemoveOwner,
            ownerDetails: _this.state.ownerInfoArr,
            disabled: disableOwner
          });
        case "INSTITUTIONALPRIVATE":
        case "INSTITUTIONALGOVERNMENT":
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_Forms.InstitutionHOC, { disabled: disableOwner }),
            _react2.default.createElement(_Forms.InstitutionAuthorityHOC, {
              cardTitle: _react2.default.createElement(_translationNode2.default, (0, _defineProperty3.default)({
                label: "PT_DETAILS_OF_AUTHORISED_PERSON",
                defaultLabel: "Details of authorised person"
              }, "label", "New")),
              disabled: disableOwner
            })
          );
        default:
          return null;
      }
    }, _this.updateTotalAmount = function (value, isFullPayment, errorText) {
      _this.setState({
        totalAmountToBePaid: value,
        isFullPayment: isFullPayment,
        partialAmountError: errorText
      });
    }, _this.renderStepperContent = function (selected, fromReviewPage) {
      var _this4 = _this,
          getOwnerDetails = _this4.getOwnerDetails,
          updateTotalAmount = _this4.updateTotalAmount,
          toggleTerms = _this4.toggleTerms;
      var _this$state = _this.state,
          estimation = _this$state.estimation,
          totalAmountToBePaid = _this$state.totalAmountToBePaid,
          financialYearFromQuery = _this$state.financialYearFromQuery,
          termsAccepted = _this$state.termsAccepted,
          termsError = _this$state.termsError,
          propertyUUID = _this$state.propertyUUID,
          assessedPropertyDetails = _this$state.assessedPropertyDetails,
          purpose = _this$state.purpose;
      var _this$props3 = _this.props,
          form = _this$props3.form,
          currentTenantId = _this$props3.currentTenantId,
          search = _this$props3.search,
          propertiesEdited = _this$props3.propertiesEdited;
      var searchQuery = _this.props.location.search;

      var isAssesment = (0, _PTCommon.getQueryValue)(searchQuery, "purpose") == 'assess';
      var isReassesment = (0, _PTCommon.getQueryValue)(searchQuery, "purpose") == 'reassess';
      var isCompletePayment = (0, _PTCommon.getQueryValue)(searchQuery, "isCompletePayment");
      var disableOwner = !_formUtils.formWizardConstants[purpose].canEditOwner;
      switch (selected) {
        case 0:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_Forms.PropertyAddressHOC, { disabled: fromReviewPage })
          );
        case 1:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_Forms.UsageInformationHOC, { disabled: fromReviewPage }),
            (0, _FormWizardUtils.renderPlotAndFloorDetails)(fromReviewPage, _PlotDetails2.default, _FloorsDetails2.default, _this)
          );
        case 2:
          var ownerType = (0, _FormWizardUtils.getSelectedCombination)(_this.props.form, "ownershipType", ["typeOfOwnership"]);
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_Forms.OwnershipTypeHOC, { disabled: disableOwner }),
            getOwnerDetails(ownerType)
          );
        case 3:
          return _react2.default.createElement(_components.Card, { textChildren: _react2.default.createElement(_DocumentsUpload2.default, null) });
        case 4:
          return _react2.default.createElement(
            "div",
            { className: "review-pay-tab" },
            _react2.default.createElement(_ReviewForm2.default, {
              onTabClick: _this.onTabClick,
              properties: _this.props['prepareFormData']['Properties'][0],
              stepZero: _this.renderStepperContent(0, fromReviewPage),
              stepOne: _this.renderStepperContent(1, fromReviewPage),
              stepTwo: _this.renderStepperContent(2, fromReviewPage),
              estimationDetails: estimation,
              financialYr: financialYearFromQuery,
              totalAmountToBePaid: totalAmountToBePaid,
              updateTotalAmount: updateTotalAmount,
              isAssesment: isAssesment,
              currentTenantId: currentTenantId,
              isCompletePayment: isCompletePayment,
              location: _this.props.location,
              isPartialPaymentInValid: (0, _lodash.get)(_this.state, "estimation[0].totalAmount", 1) < 100 || (0, _lodash.get)(form, "basicInformation.fields.typeOfBuilding.value", "").toLowerCase() === "vacant",
              toggleTerms: toggleTerms,
              termsAccepted: termsAccepted,
              termsError: termsError,
              calculationScreenData: _this.state.calculationScreenData,
              getEstimates: _this.getEstimates
            })
          );
        case 5:

          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_AcknowledgementCard2.default, { acknowledgeType: "success", receiptHeader: "PT_ASSESSMENT_NO", messageHeader: _this.getMessageHeader(), message: _this.getMessage(), receiptNo: assessedPropertyDetails['Properties'][0]['propertyDetails'][0]['assessmentNumber'] })
          );
        case 6:

          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_PaymentForm2.default, {
              properties: _this.props['prepareFormData']['Properties'][0],
              estimationDetails: estimation,
              financialYr: financialYearFromQuery,
              totalAmountToBePaid: totalAmountToBePaid,
              updateTotalAmount: updateTotalAmount,
              currentTenantId: currentTenantId,
              isCompletePayment: isCompletePayment,
              isPartialPaymentInValid: (0, _lodash.get)(_this.state, "estimation[0].totalAmount", 1) < 100 || (0, _lodash.get)(form, "basicInformation.fields.typeOfBuilding.value", "").toLowerCase() === "vacant",
              calculationScreenData: _this.state.calculationScreenData
            })
          );
        case 7:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_AcknowledgementCard2.default, { acknowledgeType: "success", receiptHeader: "PT_PMT_RCPT_NO", messageHeader: "PT_PROPERTY_PAYMENT_SUCCESS", message: "PT_PROPERTY_PAYMENT_NOTIFICATION", receiptNo: "PT-107-017574" })
          );
        default:
          return null;
      }
    }, _this.createAndUpdate = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(index, action) {
        var _this$state2, selected, formValidIndexArray, prepareFinalObject, financialYearFromQuery, _this$props4, form, common, location, hideSpinner, preparedFinalObject, search, propertyId, assessmentId, isModify, propertyMethodAction, prepareFormData, selectedownerShipCategoryType, _getInstituteInfo, instiObj, ownerArray, properties;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // const { callPGService, callDraft } = this;
                _this$state2 = _this.state, selected = _this$state2.selected, formValidIndexArray = _this$state2.formValidIndexArray, prepareFinalObject = _this$state2.prepareFinalObject;
                financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
                _this$props4 = _this.props, form = _this$props4.form, common = _this$props4.common, location = _this$props4.location, hideSpinner = _this$props4.hideSpinner, preparedFinalObject = _this$props4.preparedFinalObject;
                search = location.search;
                propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
                assessmentId = (0, _PTCommon.getQueryValue)(search, "assessmentId");
                isModify = (0, _PTCommon.getQueryValue)(search, "mode") == 'WORKFLOWEDIT';
                // const tenantId = getQueryValue(search, "tenantId");
                // const isCompletePayment = getQueryValue(search, "isCompletePayment");

                propertyMethodAction = !!propertyId ? "_update" : "_create";
                prepareFormData = (0, _extends3.default)({}, _this.props.prepareFormData);

                if ((0, _lodash.get)(prepareFormData, "Properties[0].propertyDetails[0].institution", undefined)) delete prepareFormData.Properties[0].propertyDetails[0].institution;
                selectedownerShipCategoryType = (0, _lodash.get)(form, "ownershipType.fields.typeOfOwnership.value", "");

                if (financialYearFromQuery) {
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].financialYear", financialYearFromQuery);
                }
                if (!!propertyId) {
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyId", propertyId);
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].assessmentNumber", assessmentId);
                }
                if (selectedownerShipCategoryType === "SINGLEOWNER") {
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", (0, _FormWizardUtils.getSingleOwnerInfo)(_this));
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(common, "generalMDMSDataById.SubOwnerShipCategory[" + selectedownerShipCategoryType + "].ownerShipCategory", "INDIVIDUAL"));
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
                }

                if (selectedownerShipCategoryType === "MULTIPLEOWNERS") {
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", (0, _FormWizardUtils.getMultipleOwnerInfo)(_this));
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(common, "generalMDMSDataById.SubOwnerShipCategory[" + selectedownerShipCategoryType + "].ownerShipCategory", "INDIVIDUAL"));
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
                }

                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].citizenInfo.mobileNumber", (0, _lodash.get)(prepareFormData, "Properties[0].propertyDetails[0].owners[0].mobileNumber"));

                if (selectedownerShipCategoryType.toLowerCase().indexOf("institutional") !== -1) {
                  _getInstituteInfo = (0, _FormWizardUtils.getInstituteInfo)(_this), instiObj = _getInstituteInfo.instiObj, ownerArray = _getInstituteInfo.ownerArray;

                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", ownerArray);
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].institution", instiObj);
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(form, "ownershipType.fields.typeOfOwnership.value", ""));
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", (0, _lodash.get)(form, "institutionDetails.fields.type.value", ""));
                  (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].citizenInfo.mobileNumber", (0, _lodash.get)(form, "institutionAuthority.fields.mobile.value", (0, _lodash.get)(form, "institutionAuthority.fields.telephone.value", null)));
                }

                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].citizenInfo.name", (0, _lodash.get)(prepareFormData, "Properties[0].propertyDetails[0].owners[0].name"));

                properties = (0, _FormWizardUtils.normalizePropertyDetails)(prepareFormData.Properties, _this);
                // Create/Update property call, action will be either create or update

                (0, _formUtils.propertySubmitAction)(properties, action, _this.props, isModify, preparedFinalObject);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x3, _x4) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.updateIndex = function (index) {
      // utils
      var _this5 = _this,
          pay = _this5.pay,
          estimate = _this5.estimate,
          createAndUpdate = _this5.createAndUpdate;
      var _this$state3 = _this.state,
          selected = _this$state3.selected,
          formValidIndexArray = _this$state3.formValidIndexArray,
          estimation = _this$state3.estimation;
      var _this$props5 = _this.props,
          displayFormErrorsAction = _this$props5.displayFormErrorsAction,
          form = _this$props5.form,
          requiredDocCount = _this$props5.requiredDocCount,
          showSpinner = _this$props5.showSpinner;

      switch (selected) {
        //validating property address is validated
        case 0:
          if (window.appOverrides && !window.appOverrides.validateForm("propertyAddress", form)) {
            _this.props.toggleSnackbarAndSetText(true, {
              labelName: "ULB validations failed!",
              labelKey: "ERR_ULD_VALIDATIONS_FAILED"
            }, true);
            break;
          }

          var isProperyAddressFormValid = (0, _utils.validateForm)(form.propertyAddress);
          if (isProperyAddressFormValid) {
            (0, _FormWizardUtils.callDraft)(_this);
            window.scrollTo(0, 0);
            _this.setState({
              selected: index,
              formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected])
            });
          } else {
            displayFormErrorsAction("propertyAddress");
          }
          break;
        //validating basic information,plotdetails and if plot details having floors
        case 1:
          if (window.appOverrides && !window.appOverrides.validateForm("assessmentInformation", form)) {
            _this.props.toggleSnackbarAndSetText(true, {
              labelName: "ULB validations failed!",
              labelKey: "ERR_ULD_VALIDATIONS_FAILED"
            }, true);
            break;
          }

          var basicInformation = form.basicInformation,
              plotDetails = form.plotDetails;

          if (basicInformation) {
            var isBasicInformationFormValid = (0, _utils.validateForm)(basicInformation);
            if (isBasicInformationFormValid) {
              if (plotDetails) {
                var isPlotDetailsFormValid = (0, _utils.validateForm)(plotDetails);
                if (isPlotDetailsFormValid) {
                  var isTotalUnitSizeValid = plotDetails.fields.plotSize ? (0, _FormWizardUtils.validateUnitandPlotSize)(plotDetails, form) : true;
                  if (isTotalUnitSizeValid) {
                    if ((0, _lodash.get)(plotDetails, "fields.floorCount")) {
                      var floorValidation = true;
                      for (var variable in form) {
                        if (variable.search("customSelect") !== -1 || variable.search("floorDetails") !== -1) {
                          var isDynamicFormValid = (0, _utils.validateForm)(form[variable]);
                          if (!isDynamicFormValid) {
                            displayFormErrorsAction(variable);
                            floorValidation = false;
                          }
                        }
                      }
                      if (floorValidation) {
                        (0, _FormWizardUtils.callDraft)(_this);
                        window.scrollTo(0, 0);
                        _this.setState({
                          selected: index,
                          formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected])
                        });
                      }
                    } else {
                      (0, _FormWizardUtils.callDraft)(_this);
                      window.scrollTo(0, 0);
                      _this.setState({
                        selected: index,
                        formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected])
                      });
                    }
                  }
                } else {
                  displayFormErrorsAction("plotDetails");
                }
              }
            } else {
              displayFormErrorsAction("basicInformation");
            }
          }
          break;
        case 2:
          if (window.appOverrides && !window.appOverrides.validateForm("ownerInfo", form)) {
            _this.props.toggleSnackbarAndSetText(true, {
              labelName: "ULB validations failed!",
              labelKey: "ERR_ULD_VALIDATIONS_FAILED"
            }, true);
            break;
          }

          var ownershipType = form.ownershipType;

          var estimateCall = function estimateCall() {
            estimate().then(function (estimateResponse) {
              if (estimateResponse) {
                window.scrollTo(0, 0);
                _this.setState({
                  estimation: estimateResponse && estimateResponse.Calculation,
                  totalAmountToBePaid: 1, // What is this?
                  valueSelected: "Full_Amount"
                });
              }
            });
          };
          if (ownershipType) {
            var isOwnershipTypeFormValid = (0, _utils.validateForm)(ownershipType);
            if (isOwnershipTypeFormValid) {
              var ownershipTypeSelected = (0, _lodash.get)(ownershipType, "fields.typeOfOwnership.value");
              if (ownershipTypeSelected === "SINGLEOWNER") {
                var ownerInfo = form.ownerInfo;

                var isOwnerInfoFormValid = (0, _utils.validateForm)(ownerInfo);
                if (isOwnerInfoFormValid) {
                  (0, _FormWizardUtils.callDraft)(_this);
                  window.scrollTo(0, 0);
                  _this.setState({
                    selected: index,
                    formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected])
                  }, estimateCall());
                } else {
                  displayFormErrorsAction("ownerInfo");
                }
              } else if (ownershipTypeSelected === "MULTIPLEOWNERS") {
                var ownerValidation = true;
                for (var _variable in form) {
                  if (_variable.search("ownerInfo_") !== -1) {
                    var _isDynamicFormValid = (0, _utils.validateForm)(form[_variable]);
                    if (!_isDynamicFormValid) {
                      displayFormErrorsAction(_variable);
                      ownerValidation = false;
                    }
                  }
                }
                if (ownerValidation) {
                  (0, _FormWizardUtils.callDraft)(_this);
                  window.scrollTo(0, 0);
                  _this.setState({
                    selected: index,
                    formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected])
                  }, estimateCall());
                }
              } else if (ownershipTypeSelected.toUpperCase().indexOf("INSTITUTIONAL") !== -1) {
                var institutionDetails = form.institutionDetails,
                    institutionAuthority = form.institutionAuthority;

                var isInstitutionDetailsFormValid = (0, _utils.validateForm)(institutionDetails);
                var institutionFormValid = true;
                if (!isInstitutionDetailsFormValid) {
                  displayFormErrorsAction("institutionDetails");
                  institutionFormValid = false;
                }
                var isInstitutionAuthorityFormValid = (0, _utils.validateForm)(institutionAuthority);
                if (!isInstitutionAuthorityFormValid) {
                  displayFormErrorsAction("institutionAuthority");
                  institutionFormValid = false;
                }
                if (institutionFormValid) {
                  (0, _FormWizardUtils.callDraft)(_this);
                  window.scrollTo(0, 0);
                  _this.setState({
                    selected: index,
                    formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected])
                  }, estimateCall());
                }
              }
            } else {
              displayFormErrorsAction("ownershipType");
            }
          }

          break;
        case 3:
          window.scrollTo(0, 0);
          var newDocs = {};
          var uploadedDocs = (0, _lodash.get)(_this.props, "documentsUploadRedux");
          if (!(0, _commons.isDocumentValid)(uploadedDocs, requiredDocCount)) {
            alert("Please upload all the required documents and documents type.");
          } else {
            _this.setState({
              selected: index,
              formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected])
            });
            if (Object.keys(uploadedDocs).length != requiredDocCount) {
              Object.keys(uploadedDocs).map(function (key) {
                if (key < requiredDocCount) {
                  newDocs[key] = uploadedDocs[key];
                }
              });
              _this.props.prepareFinalObject('documentsUploadRedux', newDocs);
            }
          }
          var prepareFormData = (0, _extends3.default)({}, _this.props.prepareFormData);
          var additionalDetails = (0, _lodash.get)(prepareFormData, "Properties[0].additionalDetails", {});
          _this.props.prepareFinalObject('propertyAdditionalDetails', additionalDetails);
          break;
        case 4:
          var search1 = _this.props.location.search;

          var isAssesment1 = (0, _PTCommon.getQueryValue)(search1, "purpose") == 'assess';
          var isReassesment = (0, _PTCommon.getQueryValue)(search1, "purpose") == 'reassess';

          if (estimation && estimation.length && estimation.length > 1 && estimation[0].totalAmount < 0) {
            alert('Property Tax amount cannot be Negative!');
          } else {
            window.scrollTo(0, 0);
            if (isAssesment1) {
              _this.setState({ nextButtonEnabled: false });
              showSpinner();
              createAndUpdate(index, 'assess');
              // this.props.history.push(`pt-acknowledgment?purpose=assessment&consumerCode=${propertyId1}&status=success&tenantId=${tenantId1}&FY=2019-20`);
            } else if (isReassesment) {
              _this.setState({ nextButtonEnabled: false });
              showSpinner();
              createAndUpdate(index, 're-assess');
            } else {
              _this.setState({ nextButtonEnabled: false });
              showSpinner();
              createAndUpdate(index, 'create');
            }
          }
          break;
        case 5:
          var _this$state$assessedP = _this.state.assessedPropertyDetails,
              assessedPropertyDetails = _this$state$assessedP === undefined ? {} : _this$state$assessedP;
          var _assessedPropertyDeta = assessedPropertyDetails.Properties,
              Properties = _assessedPropertyDeta === undefined ? [] : _assessedPropertyDeta;

          var propertyId = '';
          var tenantId = '';
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var pty = _step.value;

              propertyId = pty.propertyId;
              tenantId = pty.tenantId;
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

          _this.props.history.push("./../egov-common/pay?consumerCode=" + propertyId + "&tenantId=" + tenantId + "&businessService=PT");
          break;
        case 6:
          if (_this.state.partialAmountError.length == 0) {
            pay();
          } else {
            alert(_this.state.partialAmountError);
          }
          break;
        case 7:
          pay();
          break;
      }
    }, _this.callGetBill = function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(propertyId, assessmentNumber, assessmentYear, tenantId) {
        var _this$props6, location, toggleSpinner, _this$state4, isFullPayment, totalAmountToBePaid, estimation, search, isCompletePayment, queryObj, billResponse;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props6 = _this.props, location = _this$props6.location, toggleSpinner = _this$props6.toggleSpinner;
                _this$state4 = _this.state, isFullPayment = _this$state4.isFullPayment, totalAmountToBePaid = _this$state4.totalAmountToBePaid, estimation = _this$state4.estimation;
                search = location.search;
                isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");

                toggleSpinner();

                queryObj = [{ key: "consumerCodes", value: propertyId }, { key: "tenantId", value: tenantId }];
                _context4.prev = 6;
                _context4.next = 9;
                return (0, _api.httpRequest)("pt-calculator-v2/propertytax/_getbill", "_create", queryObj, {});

              case 9:
                billResponse = _context4.sent;

                toggleSpinner();
                return _context4.abrupt("return", billResponse);

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](6);

                toggleSpinner();

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[6, 14]]);
      }));

      return function (_x5, _x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.callPGService = function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(propertyId, assessmentNumber, assessmentYear, tenantId) {
        var _this$state5, isFullPayment, totalAmountToBePaid, billResponse, _this$props7, history, toggleSpinner, location, search, isCompletePayment, callbackUrl, userType, getBill, taxAndPayments, requestBody, goToPaymentGateway, redirectionUrl, moduleId, _tenantId;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this$state5 = _this.state, isFullPayment = _this$state5.isFullPayment, totalAmountToBePaid = _this$state5.totalAmountToBePaid, billResponse = _this$state5.billResponse;
                _this$props7 = _this.props, history = _this$props7.history, toggleSpinner = _this$props7.toggleSpinner, location = _this$props7.location;
                search = location.search;
                isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");
                callbackUrl = window.origin + "/property-tax/payment-redirect-page";

                if (process.env.NODE_ENV !== "development") {
                  userType = process.env.REACT_APP_NAME === "Citizen" ? "CITIZEN" : "EMPLOYEE";

                  if (userType === "CITIZEN") {
                    callbackUrl = window.origin + "/citizen/property-tax/payment-redirect-page";
                  } else {
                    callbackUrl = window.origin + "/employee/property-tax/payment-redirect-page";
                  }
                }

                _context5.prev = 6;

                if (isCompletePayment) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 10;
                return _this.callGetBill(propertyId, assessmentNumber, assessmentYear, tenantId);

              case 10:
                _context5.t0 = _context5.sent;
                _context5.next = 14;
                break;

              case 13:
                _context5.t0 = billResponse;

              case 14:
                getBill = _context5.t0;
                taxAndPayments = (0, _lodash.get)(getBill, "Bill[0].taxAndPayments", []).map(function (item) {
                  if (item.businessService === "PT") {
                    item.amountPaid = isFullPayment ? (0, _lodash.get)(getBill, "Bill[0].billDetails[0].totalAmount") : totalAmountToBePaid;
                  }
                  return item;
                });
                _context5.prev = 16;
                requestBody = {
                  Transaction: {
                    tenantId: tenantId,
                    txnAmount: isFullPayment ? (0, _lodash.get)(getBill, "Bill[0].billDetails[0].totalAmount") : totalAmountToBePaid,
                    module: "PT",
                    taxAndPayments: taxAndPayments,
                    billId: (0, _lodash.get)(getBill, "Bill[0].id"),
                    consumerCode: (0, _lodash.get)(getBill, "Bill[0].billDetails[0].consumerCode"),
                    productInfo: "Property Tax Payment",
                    gateway: "AXIS",
                    callbackUrl: callbackUrl
                  }
                };
                _context5.next = 20;
                return (0, _api.httpRequest)("pg-service/transaction/v1/_create", "_create", [], requestBody);

              case 20:
                goToPaymentGateway = _context5.sent;

                if ((0, _lodash.get)(getBill, "Bill[0].billDetails[0].totalAmount")) {
                  redirectionUrl = (0, _lodash.get)(goToPaymentGateway, "Transaction.redirectUrl");

                  (0, _localStorageUtils.localStorageSet)("assessmentYear", assessmentYear);
                  window.location = redirectionUrl;
                } else {
                  toggleSpinner();
                  moduleId = (0, _lodash.get)(goToPaymentGateway, "Transaction.consumerCode");
                  _tenantId = (0, _lodash.get)(goToPaymentGateway, "Transaction.tenantId");

                  history.push("/property-tax/payment-success/" + moduleId.split(":")[0] + "/" + _tenantId);
                }
                _context5.next = 27;
                break;

              case 24:
                _context5.prev = 24;
                _context5.t1 = _context5["catch"](16);

                toggleSpinner();

              case 27:
                _context5.next = 32;
                break;

              case 29:
                _context5.prev = 29;
                _context5.t2 = _context5["catch"](6);

                toggleSpinner();

              case 32:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this2, [[6, 29], [16, 24]]);
      }));

      return function (_x9, _x10, _x11, _x12) {
        return _ref6.apply(this, arguments);
      };
    }(), _this.getEstimates = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var search, isAssesment, isReassesment, Assessments;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              search = _this.props.location.search;
              isAssesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'assess';
              isReassesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';
              Assessments = _this.props.Assessments;

              if (isAssesment || isReassesment) {
                _this.estimate().then(function (estimateResponse) {
                  if (estimateResponse) {
                    window.scrollTo(0, 0);
                    var adhocPenaltyAmt = 0;
                    var adhocExemptionAmt = 0;
                    if (isReassesment && Assessments && Assessments.length > 0) {
                      adhocExemptionAmt = (0, _lodash.get)(Assessments[0], 'additionalDetails.adhocExemption', 0) || 0;
                      adhocPenaltyAmt = (0, _lodash.get)(Assessments[0], 'additionalDetails.adhocPenalty', 0) || 0;
                    }
                    estimateResponse.Calculation[0].initialAmount = estimateResponse.Calculation[0].totalAmount;
                    estimateResponse.Calculation = (0, _formUtils.getFormattedEstimate)(estimateResponse.Calculation, adhocPenaltyAmt, adhocExemptionAmt);
                    _this.setState({
                      estimation: estimateResponse && estimateResponse.Calculation,
                      totalAmountToBePaid: 1, // What is this?
                      valueSelected: "Full_Amount"
                    });
                  }
                });
              }

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, _this2);
    })), _this.estimate = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      var _this$props8, showSpinner, location, hideSpinner, search, isAssesment, isReassesment, prepareFormData, financialYearFromQuery, financeYear, assessmentPayload, estimateResponse, tenantId, calculationScreenData;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this$props8 = _this.props, showSpinner = _this$props8.showSpinner, location = _this$props8.location, hideSpinner = _this$props8.hideSpinner;
              search = location.search;
              isAssesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'assess';
              isReassesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';

              if (!(isAssesment || isReassesment)) {
                _context7.next = 28;
                break;
              }

              prepareFormData = (0, _extends3.default)({}, _this.props.prepareFormData);

              showSpinner();
              financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
              _context7.prev = 8;
              financeYear = { financialYear: financialYearFromQuery };
              assessmentPayload = (0, _propertyCreateUtils.createAssessmentPayload)(prepareFormData.Properties[0], financeYear);
              _context7.next = 13;
              return (0, _api.httpRequest)("pt-calculator-v2/propertytax/v2/_estimate", "_estimate", [], {
                Assessment: assessmentPayload
              });

            case 13:
              estimateResponse = _context7.sent;

              //For calculation screen
              tenantId = prepareFormData.Properties[0] && prepareFormData.Properties[0].tenantId;
              _context7.next = 17;
              return (0, _FormWizardUtils.getCalculationScreenData)((0, _lodash.get)(estimateResponse, "Calculation[0].billingSlabIds", []), tenantId, _this);

            case 17:
              calculationScreenData = _context7.sent;

              _this.setState({ calculationScreenData: calculationScreenData.data });
              estimateResponse = (0, _FormWizardUtils.getSortedTaxSlab)(estimateResponse);
              hideSpinner();
              return _context7.abrupt("return", estimateResponse);

            case 24:
              _context7.prev = 24;
              _context7.t0 = _context7["catch"](8);

              hideSpinner();
              if (_context7.t0.message) {
                alert(_context7.t0.message);
              } else _this.props.toggleSnackbarAndSetText(true, {
                labelName: "Error calculating tax!",
                labelKey: "ERR_ERROR_CALCULATING_TAX"
              }, true);

            case 28:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, _this2, [[8, 24]]);
    })), _this.pay = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
      var _this6, callPGService, _this$state6, financialYearFromQuery, _this$state6$assessed, assessedPropertyDetails, _assessedPropertyDeta2, Properties, _this$props9, toggleSpinner, location, form, common, prepareFormData, search, propertyUID, propertyId, assessmentId, tenantId, isCompletePayment, propertyMethodAction, selectedownerShipCategoryType, _getInstituteInfo2, instiObj, ownerArray;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _this6 = _this, callPGService = _this6.callPGService;
              _this$state6 = _this.state, financialYearFromQuery = _this$state6.financialYearFromQuery, _this$state6$assessed = _this$state6.assessedPropertyDetails, assessedPropertyDetails = _this$state6$assessed === undefined ? {} : _this$state6$assessed;
              _assessedPropertyDeta2 = assessedPropertyDetails.Properties, Properties = _assessedPropertyDeta2 === undefined ? [] : _assessedPropertyDeta2;
              _this$props9 = _this.props, toggleSpinner = _this$props9.toggleSpinner, location = _this$props9.location, form = _this$props9.form, common = _this$props9.common;
              prepareFormData = (0, _extends3.default)({}, _this.props.prepareFormData);

              if ((0, _lodash.get)(prepareFormData, "Properties[0].propertyDetails[0].institution", undefined)) delete prepareFormData.Properties[0].propertyDetails[0].institution;
              search = location.search;
              propertyUID = (0, _lodash.get)(assessedPropertyDetails, "Properties[0].propertyId");
              propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");

              if (!propertyId) {
                propertyId = propertyUID;
              }
              assessmentId = (0, _PTCommon.getQueryValue)(search, "assessmentId");
              tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");
              isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");
              propertyMethodAction = !!propertyId ? "_update" : "_create";
              selectedownerShipCategoryType = (0, _lodash.get)(form, "ownershipType.fields.typeOfOwnership.value", "");

              toggleSpinner();
              if (financialYearFromQuery) {
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].financialYear", financialYearFromQuery);
              }
              if (!!propertyId) {
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyId", propertyId);
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].assessmentNumber", assessmentId);
              }

              if (selectedownerShipCategoryType === "SINGLEOWNER") {
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", (0, _FormWizardUtils.getSingleOwnerInfo)(_this));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(common, "generalMDMSDataById.SubOwnerShipCategory[" + selectedownerShipCategoryType + "].ownerShipCategory", "INDIVIDUAL"));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
              }

              if (selectedownerShipCategoryType === "MULTIPLEOWNERS") {
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", (0, _FormWizardUtils.getMultipleOwnerInfo)(_this));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(common, "generalMDMSDataById.SubOwnerShipCategory[" + selectedownerShipCategoryType + "].ownerShipCategory", "INDIVIDUAL"));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
              }
              if (selectedownerShipCategoryType.toLowerCase().indexOf("institutional") !== -1) {
                _getInstituteInfo2 = (0, _FormWizardUtils.getInstituteInfo)(_this), instiObj = _getInstituteInfo2.instiObj, ownerArray = _getInstituteInfo2.ownerArray;

                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", ownerArray);
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].institution", instiObj);
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(form, "ownershipType.fields.typeOfOwnership.value", ""));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", (0, _lodash.get)(form, "institutionDetails.fields.type.value", ""));
              }

              try {
                if (isCompletePayment) {
                  callPGService(propertyId, assessmentId, financialYearFromQuery, tenantId);
                } else {
                  //Remove null units and do sqyd to sqft conversion.
                  // const properties = normalizePropertyDetails(
                  //   prepareFormData.Properties,
                  //   this
                  // );
                  callPGService((0, _lodash.get)(assessedPropertyDetails, "Properties[0].propertyId"), (0, _lodash.get)(assessedPropertyDetails, "Properties[0].propertyDetails[0].assessmentNumber"), (0, _lodash.get)(assessedPropertyDetails, "Properties[0].propertyDetails[0].financialYear"), (0, _lodash.get)(assessedPropertyDetails, "Properties[0].tenantId"));
                }
              } catch (e) {
                toggleSpinner();
                alert(e);
              }

            case 22:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, _this2);
    })), _this.resetForm = function () {
      var _this$props10 = _this.props,
          form = _this$props10.form,
          removeForm = _this$props10.removeForm,
          prepareFormDataAction = _this$props10.prepareFormDataAction,
          prepareFinalObject = _this$props10.prepareFinalObject;

      (0, _PTCommon.resetFormWizard)(form, removeForm);
      prepareFormDataAction("Properties", []);
      prepareFinalObject("documentsUploadRedux", {});
      _this.onTabClick(0);
    }, _this.onTabClick = function (index) {
      var _this$state7 = _this.state,
          formValidIndexArray = _this$state7.formValidIndexArray,
          selected = _this$state7.selected,
          propertyUUID = _this$state7.propertyUUID;
      var location = _this.props.location;
      var search = location.search;

      var currentUUID = (0, _lodash.get)(JSON.parse((0, _localStorageUtils.getUserInfo)()), "uuid");
      var isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");

      var isAssesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'assess';
      var isReassesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';

      if (formValidIndexArray.indexOf(index) !== -1 && selected >= index) {
        _this.setState({
          selected: index,
          formValidIndexArray: (0, _lodash.range)(0, index)
        });
      } else {}
    }, _this.closeDeclarationDialogue = function () {
      _this.setState({ dialogueOpen: false });
    }, _this.onPayButtonClick = function () {
      var _this$state8 = _this.state,
          isFullPayment = _this$state8.isFullPayment,
          partialAmountError = _this$state8.partialAmountError,
          totalAmountToBePaid = _this$state8.totalAmountToBePaid,
          termsAccepted = _this$state8.termsAccepted,
          selected = _this$state8.selected;

      if (!termsAccepted) {
        _this.setState({
          termsError: "PT_CHECK_DECLARATION_BOX"
        });
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        alert("Please check the declaration box to proceed futher");
        return;
      }
      if (totalAmountToBePaid % 1 !== 0) {
        alert("Amount cannot be a fraction!");
        return;
      }
      if (!isFullPayment && partialAmountError) return;
      _this.updateIndex(selected + 1);
    }, _this.convertImgToDataURLviaCanvas = function (url, callback, outputFormat) {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
      };
      img.src = url;
    }, _this.downloadAcknowledgementForm = function () {
      var _receiptDetails;

      var _this$state9 = _this.state,
          assessedPropertyDetails = _this$state9.assessedPropertyDetails,
          imageUrl = _this$state9.imageUrl;
      var _this$props11 = _this.props,
          common = _this$props11.common,
          _this$props11$app = _this$props11.app,
          app = _this$props11$app === undefined ? {} : _this$props11$app;
      var Properties = assessedPropertyDetails.Properties;
      var _Properties$ = Properties[0],
          address = _Properties$.address,
          propertyDetails = _Properties$.propertyDetails,
          propertyId = _Properties$.propertyId;
      var owners = propertyDetails[0].owners;
      var localizationLabels = app.localizationLabels;
      var cities = common.cities,
          generalMDMSDataById = common.generalMDMSDataById;

      var header = (0, _createReceipt.getHeaderDetails)(Properties[0], cities, localizationLabels, true);
      var receiptDetails = {};
      receiptDetails = (_receiptDetails = {
        address: address,
        propertyDetails: propertyDetails
      }, (0, _defineProperty3.default)(_receiptDetails, "address", address), (0, _defineProperty3.default)(_receiptDetails, "owners", owners), (0, _defineProperty3.default)(_receiptDetails, "header", header), (0, _defineProperty3.default)(_receiptDetails, "propertyId", propertyId), _receiptDetails);
      (0, _acknowledgementFormPDF2.default)("pt-reciept-citizen", receiptDetails, generalMDMSDataById, imageUrl);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FormWizard, [{
    key: "getButtonLabels",
    value: function getButtonLabels(index) {
      var purpose = this.state.purpose;

      var buttonLabel = "PT_COMMONS_NEXT";
      if (index == 4) {
        buttonLabel = _formUtils.formWizardConstants[purpose].buttonLabel;
      } else if (index == 5) {
        buttonLabel = 'PT_PROCEED_PAYMENT';
      } else if (index == 6) {
        buttonLabel = 'PT_MAKE_PAYMENT';
      } else if (index == 7) {
        buttonLabel = 'PT_DOWNLOAD_RECEIPT';
      }
      return buttonLabel;
    }
  }, {
    key: "getHeader",
    value: function getHeader(selected, search, PTUID) {
      var propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId") || PTUID;
      var assessmentYear = (0, _PTCommon.getQueryValue)(search, "FY");
      var purpose = (0, _formUtils.getPurpose)();
      var headerObj = {};
      headerObj.header = 'PT_PROPERTY_INFORMATION';
      headerObj.headerValue = '';
      headerObj.subHeaderValue = propertyId;
      switch (selected) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
          headerObj.subHeaderValue = _formUtils.formWizardConstants[purpose].isSubHeader ? propertyId : '';
          headerObj.headerValue = _formUtils.formWizardConstants[purpose].isFinancialYear ? "(" + assessmentYear + ")" : '';
          headerObj.header = _formUtils.formWizardConstants[purpose].header;
          break;
        case 5:
        case 6:
          headerObj.headerValue = '(' + assessmentYear + ')';
          headerObj.header = 'PT_PAYMENT_HEADER';
          headerObj.subHeaderValue = propertyId;
          break;
        default:
          headerObj.header = 'PT_PROPERTY_INFORMATION';
          headerObj.subHeaderValue = propertyId;
      }
      return headerObj;
    }
  }, {
    key: "getMessageHeader",
    value: function getMessageHeader() {
      var search = this.props.location.search;


      var isAssesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'assess';
      var isReassesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';

      var buttonLabel = "PT_PROPERTY_ASSESS_SUCCESS";
      isAssesment ? buttonLabel = 'PT_PROPERTY_ASSESS_SUCCESS' : isReassesment ? buttonLabel = "PT_PROPERTY_REASSESS_SUCCESS" : buttonLabel = "PT_PROPERTY_ADD_SUCCESS";
      return buttonLabel;
    }
  }, {
    key: "getMessage",
    value: function getMessage() {
      var search = this.props.location.search;


      var isAssesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'assess';
      var isReassesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';

      var buttonLabel = "PT_PROPERTY_ASSESS_NOTIFICATION";
      isAssesment ? buttonLabel = 'PT_PROPERTY_ASSESS_NOTIFICATION' : isReassesment ? buttonLabel = "PT_PROPERTY_REASSESS_NOTIFICATION" : buttonLabel = "PT_PROPERTY_ADD_NOTIFICATION";
      return buttonLabel;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _state = this.state,
          selected = _state.selected,
          formValidIndexArray = _state.formValidIndexArray;
      var _props = this.props,
          location = _props.location,
          propertiesEdited = _props.propertiesEdited;
      var search = location.search;

      var propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
      // let proceedToPayment = Boolean(getQueryValue(search, "proceedToPayment").replace('false', ''));
      if (propertyId && selected == 3 && !propertiesEdited) {
        this.setState({
          selected: 4,
          formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [3])
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var renderStepperContent = this.renderStepperContent,
          onPayButtonClick = this.onPayButtonClick,
          closeDeclarationDialogue = this.closeDeclarationDialogue;
      var _state2 = this.state,
          selected = _state2.selected,
          ownerInfoArr = _state2.ownerInfoArr,
          formValidIndexArray = _state2.formValidIndexArray,
          dialogueOpen = _state2.dialogueOpen,
          _state2$assessedPrope = _state2.assessedPropertyDetails,
          assessedPropertyDetails = _state2$assessedPrope === undefined ? {} : _state2$assessedPrope,
          nextButtonEnabled = _state2.nextButtonEnabled;
      var _assessedPropertyDeta3 = assessedPropertyDetails.Properties,
          Properties = _assessedPropertyDeta3 === undefined ? [] : _assessedPropertyDeta3;

      var propertyId = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var pty = _step2.value;

          propertyId = pty.propertyId;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var fromReviewPage = selected === 4;
      var _props2 = this.props,
          history = _props2.history,
          location = _props2.location;
      var search = location.search;
      // const propertyId = getQueryValue(search, "propertyId");

      var _getHeader = this.getHeader(selected, search, propertyId),
          header = _getHeader.header,
          subHeaderValue = _getHeader.subHeaderValue,
          headerValue = _getHeader.headerValue;

      return _react2.default.createElement(
        "div",
        { className: "wizard-form-main-cont" },
        _react2.default.createElement(
          "div",
          { className: "form-header" },
          _react2.default.createElement(_PTHeader2.default, { header: header, subHeaderTitle: "PT_PROPERTY_PTUID", headerValue: headerValue, subHeaderValue: subHeaderValue })
        ),
        _react2.default.createElement(_WizardComponent2.default, {
          downloadAcknowledgementForm: this.downloadAcknowledgementForm,
          content: renderStepperContent(selected, fromReviewPage),
          onTabClick: this.onTabClick,
          selected: selected,
          header: (0, _FormWizardUtils.getHeaderLabel)(selected, "citizen"),
          footer: null,
          fontSize: true,
          formValidIndexArray: formValidIndexArray,
          updateIndex: this.updateIndex,
          backLabel: "PT_COMMONS_GO_BACK",
          nextLabel: this.getButtonLabels(selected),
          ownerInfoArr: ownerInfoArr,
          closeDialogue: closeDeclarationDialogue,
          dialogueOpen: dialogueOpen,
          history: history,
          onPayButtonClick: onPayButtonClick,
          nextButtonEnabled: nextButtonEnabled
        })
      );
    }
  }]);
  return FormWizard;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _ref10 = state || {},
      form = _ref10.form,
      common = _ref10.common,
      app = _ref10.app,
      screenConfiguration = _ref10.screenConfiguration,
      properties = _ref10.properties;

  var _properties$Assessmen = properties.Assessments,
      Assessments = _properties$Assessmen === undefined ? [] : _properties$Assessmen;
  var propertyAddress = form.propertyAddress;

  var _ref11 = propertyAddress && propertyAddress.fields && propertyAddress.fields || {},
      city = _ref11.city;

  var currentTenantId = city && city.value || _common2.default.tenantId;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var documentsUploadRedux = preparedFinalObject.documentsUploadRedux,
      _preparedFinalObject$ = preparedFinalObject.newProperties,
      newProperties = _preparedFinalObject$ === undefined ? [] : _preparedFinalObject$,
      _preparedFinalObject$2 = preparedFinalObject.propertiesEdited,
      propertiesEdited = _preparedFinalObject$2 === undefined ? false : _preparedFinalObject$2,
      _preparedFinalObject$3 = preparedFinalObject.ptDocumentCount,
      ptDocumentCount = _preparedFinalObject$3 === undefined ? 0 : _preparedFinalObject$3,
      _preparedFinalObject$4 = preparedFinalObject.propertyAdditionalDetails,
      propertyAdditionalDetails = _preparedFinalObject$4 === undefined ? {} : _preparedFinalObject$4;


  var requiredDocCount = ptDocumentCount;
  return {
    form: form,
    prepareFormData: common.prepareFormData,
    currentTenantId: currentTenantId,
    common: common,
    app: app,
    documentsUploadRedux: documentsUploadRedux, newProperties: newProperties,
    propertiesEdited: propertiesEdited,
    requiredDocCount: requiredDocCount,
    Assessments: Assessments,
    propertyAdditionalDetails: propertyAdditionalDetails,
    preparedFinalObject: preparedFinalObject
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    deleteForm: function deleteForm(formKey) {
      return dispatch((0, _actions4.deleteForm)(formKey));
    },
    setRoute: function setRoute(route) {
      return dispatch((0, _actions2.setRoute)(route));
    },
    displayFormErrorsAction: function displayFormErrorsAction(formKey) {
      return dispatch((0, _actions4.displayFormErrors)(formKey));
    },
    updatePTForms: function updatePTForms(forms) {
      return dispatch((0, _actions4.updateForms)(forms));
    },
    toggleSpinner: function toggleSpinner() {
      return dispatch((0, _actions3.toggleSpinner)());
    },
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName, key, tenantId) {
      return dispatch((0, _actions3.fetchGeneralMDMSData)(requestBody, moduleName, masterName, key, tenantId));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions2.toggleSnackbarAndSetText)(open, message, error));
    },
    updatePrepareFormDataFromDraft: function updatePrepareFormDataFromDraft(prepareFormData) {
      return dispatch((0, _actions3.updatePrepareFormDataFromDraft)(prepareFormData));
    },
    fetchMDMDDocumentTypeSuccess: function fetchMDMDDocumentTypeSuccess(data) {
      return dispatch((0, _actions6.fetchMDMDDocumentTypeSuccess)(data));
    },
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions4.handleFieldChange)(formKey, fieldKey, value));
    },
    setFieldProperty: function setFieldProperty(formKey, fieldKey, property, value) {
      return dispatch((0, _actions4.setFieldProperty)(formKey, fieldKey, property, value));
    },
    prepareFormDataAction: function prepareFormDataAction(path, value) {
      return dispatch((0, _actions3.prepareFormData)(path, value));
    },
    hideSpinner: function hideSpinner() {
      return dispatch((0, _actions3.hideSpinner)());
    },
    showSpinner: function showSpinner() {
      return dispatch((0, _actions3.showSpinner)());
    },
    removeForm: function removeForm(formkey) {
      return dispatch((0, _actions4.removeForm)(formkey));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    },
    fetchAssessments: function fetchAssessments(fetchAssessmentsQueryObject) {
      return dispatch((0, _actions5.fetchAssessments)(fetchAssessmentsQueryObject));
    },
    fetchLocalizationLabel: function fetchLocalizationLabel(locale, moduleName, tenantId) {
      return dispatch((0, _actions2.fetchLocalizationLabel)(locale, moduleName, tenantId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FormWizard);