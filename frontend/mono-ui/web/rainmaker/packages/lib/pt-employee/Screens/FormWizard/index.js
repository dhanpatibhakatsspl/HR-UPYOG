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

var _range = require("lodash/range");

var _range2 = _interopRequireDefault(_range);

var _sortBy = require("lodash/sortBy");

var _sortBy2 = _interopRequireDefault(_sortBy);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _actions6 = require("redux/store/actions");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _Forms = require("./components/Forms");

var _FloorsDetails = require("./components/Forms/FloorsDetails");

var _FloorsDetails2 = _interopRequireDefault(_FloorsDetails);

var _MultipleOwnerInfo = require("./components/Forms/MultipleOwnerInfo");

var _MultipleOwnerInfo2 = _interopRequireDefault(_MultipleOwnerInfo);

var _PlotDetails = require("./components/Forms/PlotDetails");

var _PlotDetails2 = _interopRequireDefault(_PlotDetails);

var _PaymentDetails = require("./components/PaymentDetails");

var _PaymentDetails2 = _interopRequireDefault(_PaymentDetails);

var _ReviewForm = require("./components/ReviewForm");

var _ReviewForm2 = _interopRequireDefault(_ReviewForm);

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
      dialogueOpen: false,
      financialYearFromQuery: "",
      selected: 0,
      ownerInfoArr: [],
      showOwners: false,
      formValidIndexArray: [],
      ownersCount: 0,
      estimation: [],
      importantDates: {},
      draftRequest: {
        draft: {
          tenantId: (0, _localStorageUtils.getTenantId)(),
          userId: (0, _lodash.get)(JSON.parse((0, _localStorageUtils.getUserInfo)()), "uuid"),
          draftRecord: {}
        }
      },
      propertyDetails: {},
      bill: [],
      partialAmountError: "",
      totalAmountToBePaid: 100,
      isFullPayment: true,
      valueSelected: "Full_Amount",
      nextButtonEnabled: true,
      calculationScreenData: [],
      assessedPropertyDetails: {},
      imageUrl: '',
      purpose: _formUtils.PROPERTY_FORM_PURPOSE.DEFAULT,
      isAssesment: false,
      isReassesment: false,
      isCreate: true,
      isUpdate: false
    }, _this.updateTotalAmount = function (value, isFullPayment, errorText) {
      _this.setState({
        totalAmountToBePaid: value,
        isFullPayment: isFullPayment,
        partialAmountError: errorText
      });
    }, _this.fetchDraftDetails = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(draftId, isReassesment, draftUuid) {
        var draftRequest, _this$props, fetchMDMDDocumentTypeSuccess, updatePrepareFormDataFromDraft, location, search, financialYearFromQuery, propertyId, assessmentId, tenantId, isCompletePayment, currentDraft, searchPropertyResponse, propertyResponse, preparedForm, ownerFormKeys, _configOwnersDetailsF, ownerDetails, totalowners, activeTab, activeModule, prepareFormData, lastAssessedFY, billResponse, estimateFromGetBill;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                draftRequest = _this.state.draftRequest;
                _this$props = _this.props, fetchMDMDDocumentTypeSuccess = _this$props.fetchMDMDDocumentTypeSuccess, updatePrepareFormDataFromDraft = _this$props.updatePrepareFormDataFromDraft, location = _this$props.location;
                search = location.search;
                financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
                propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
                assessmentId = (0, _PTCommon.getQueryValue)(search, "assessmentId");
                tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");
                isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");

                (0, _FormWizardUtils.getImportantDates)(_this);
                _context.prev = 9;
                currentDraft = void 0;
                _context.next = 13;
                return (0, _api.httpRequest)("property-services/property/_search", "_search", [{
                  key: "tenantId",
                  value: tenantId
                }, {
                  key: "propertyIds",
                  value: (0, _PTCommon.getQueryValue)(search, "propertyId") //"PT-107-001278",
                }]);

              case 13:
                searchPropertyResponse = _context.sent;

                // searchPropertyResponse.Properties[0].owners.reverse(); // Properties owners are coming in reverse order
                searchPropertyResponse = (0, _propertyCreateUtils.getCreatePropertyResponse)(searchPropertyResponse);
                _context.next = 17;
                return (0, _propertyCreateUtils.prefillPTDocuments)(searchPropertyResponse, "Properties[0].documents", "documentsUploadRedux", _store2.default.dispatch, 'PT');

              case 17:
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
                    prepareFormData: propertyResponse //prepareFormData2,
                  })
                };

                _this.setState({
                  draftByIDResponse: currentDraft
                });
                ownerFormKeys = Object.keys(currentDraft.draftRecord).filter(function (formName) {
                  return formName.indexOf("ownerInfo_") !== -1;
                });
                _configOwnersDetailsF = (0, _FormWizardUtils.configOwnersDetailsFromDraft)(ownerFormKeys, _Forms.OwnerInformation), ownerDetails = _configOwnersDetailsF.ownerDetails, totalowners = _configOwnersDetailsF.totalowners;
                activeTab = (0, _lodash.get)(currentDraft, "draftRecord.selectedTabIndex", 0) > 3 ? 3 : (0, _lodash.get)(currentDraft, "draftRecord.selectedTabIndex", 0);
                activeModule = (0, _lodash.get)(currentDraft, "draftRecord.propertyAddress.fields.city.value", "");
                // if (!!activeModule) {
                //   const documentTypeMdms = await getDocumentTypes();
                //   if (!!documentTypeMdms) fetchMDMDDocumentTypeSuccess(documentTypeMdms);
                // }

                if (isReassesment) {
                  activeModule && _this.props.handleFieldChange("propertyAddress", "city", activeModule);
                  prepareFormData = (0, _lodash.get)(currentDraft, "draftRecord.prepareFormData", {});
                  lastAssessedFY = (0, _lodash.get)(prepareFormData, "Properties[0].propertyDetails[0].financialYear");

                  lastAssessedFY !== financialYearFromQuery && (prepareFormData = (0, _FormWizardUtils.removeAdhocIfDifferentFY)(prepareFormData, financialYearFromQuery));
                  (0, _lodash.set)(currentDraft, "draftRecord.prepareFormData", prepareFormData);
                }

                updatePrepareFormDataFromDraft((0, _lodash.get)(currentDraft, "draftRecord.prepareFormData", {}));
                _this.props.updatePTForms(currentDraft.draftRecord);

                //Get estimate from bill in case of complete payment

                if (!isCompletePayment) {
                  _context.next = 39;
                  break;
                }

                _context.t0 = activeTab >= 3 && isCompletePayment;

                if (!_context.t0) {
                  _context.next = 36;
                  break;
                }

                _context.next = 35;
                return _this.callGetBill(propertyId, assessmentId, financialYearFromQuery, tenantId, false);

              case 35:
                _context.t0 = _context.sent;

              case 36:
                billResponse = _context.t0;
                estimateFromGetBill = billResponse ? (0, _PTCommon.getEstimateFromBill)(billResponse.Bill) : [];

                _this.setState({
                  estimation: estimateFromGetBill,
                  totalAmountToBePaid: estimateFromGetBill && estimateFromGetBill[0] && estimateFromGetBill[0].totalAmount || 0,
                  Bill: billResponse && billResponse.Bill
                });

              case 39:
                _this.setState({
                  ownerInfoArr: ownerDetails,
                  ownersCount: totalowners,
                  formValidIndexArray: (0, _range2.default)(0, activeTab),
                  selected: activeTab,
                  draftRequest: {
                    draft: (0, _extends3.default)({
                      id: null
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
                    if (activeTab === 5) _this.pay();
                  }
                });
                _context.next = 44;
                break;

              case 42:
                _context.prev = 42;
                _context.t1 = _context["catch"](9);

              case 44:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[9, 42]]);
      }));

      return function (_x, _x2, _x3) {
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
    }, _this.loadUlbLogo = function (tenantid) {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);

        _store2.default.dispatch((0, _actions.prepareFinalObject)("base64UlbLogoForPdf", canvas.toDataURL()));

        canvas = null;
      };
      img.src = "/" + _common2.default.tenantId + "-egov-assets/" + tenantid + "/logo.png";
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _this$props2, location, fetchMDMDDocumentTypeSuccess, renderCustomTitleForPt, showSpinner, hideSpinner, fetchGeneralMDMSData, history, prepareFinalObject, fetchLocalizationLabel, search, selected, _this3, resetForm, isAssesment, isReassesment, isModify, isReasses, propertyId, tenantId, requestBody, draftUuid, assessmentId, id, receiptImageUrl, ownerInfoArr, documentTypeMdms, financialYearFromQuery, purpose, titleObject;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props2 = _this.props, location = _this$props2.location, fetchMDMDDocumentTypeSuccess = _this$props2.fetchMDMDDocumentTypeSuccess, renderCustomTitleForPt = _this$props2.renderCustomTitleForPt, showSpinner = _this$props2.showSpinner, hideSpinner = _this$props2.hideSpinner, fetchGeneralMDMSData = _this$props2.fetchGeneralMDMSData, history = _this$props2.history, prepareFinalObject = _this$props2.prepareFinalObject, fetchLocalizationLabel = _this$props2.fetchLocalizationLabel;
              search = location.search;

              showSpinner();
              selected = _this.state.selected;
              _this3 = _this, resetForm = _this3.resetForm;
              isAssesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'assess';
              isReassesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';
              isModify = (0, _PTCommon.getQueryValue)(search, "mode") == 'WORKFLOWEDIT';
              isReasses = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';
              propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
              tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");

              fetchLocalizationLabel((0, _localStorageUtils.getLocale)(), tenantId, tenantId);
              requestBody = (0, _commons.generalMDMSDataRequestObj)(_common2.default.tenantId);

              fetchGeneralMDMSData(requestBody, "PropertyTax", (0, _commons.getGeneralMDMSDataDropdownName)());
              _context2.next = 16;
              return (0, _formUtils.getPTApplicationTypes)(_this.props.prepareFinalObject);

            case 16:
              _this.loadUlbLogo(tenantId);
              draftUuid = (0, _PTCommon.getQueryValue)(search, "uuid");
              assessmentId = (0, _PTCommon.getQueryValue)(search, "assessmentId") || (0, _commons.fetchFromLocalStorage)("draftId");

              _this.unlisten = history.listen(function (location, action) {
                resetForm();
              });
              if (isReasses) {

                _this.props.fetchAssessments([{ key: "assessmentNumbers", value: (0, _PTCommon.getQueryValue)(search, "assessmentId") }, { key: "tenantId", value: tenantId }]);
              }

              if (!assessmentId) {
                _context2.next = 25;
                break;
              }

              _context2.next = 24;
              return _this.fetchDraftDetails(assessmentId, isReassesment, draftUuid);

            case 24:
              if (selected > 2) {
                id = _this.state.assessedPropertyDetails.Properties[0].propertyDetails[0].tenantId;
                receiptImageUrl = "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/" + id + "/logo.png";

                _this.convertImgToDataURLviaCanvas(receiptImageUrl, function (data) {
                  this.setState({ imageUrl: data });
                }.bind(_this));
              }

            case 25:
              ownerInfoArr = _this.state.ownerInfoArr;


              if (ownerInfoArr.length < 2) {
                (0, _FormWizardUtils.addOwner)(true, _Forms.OwnerInformation, _this);
              }

              _context2.next = 29;
              return (0, _mdmsCalls.getDocumentTypes)();

            case 29:
              documentTypeMdms = _context2.sent;

              if (!!documentTypeMdms) fetchMDMDDocumentTypeSuccess(documentTypeMdms);

              financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
              purpose = (0, _formUtils.getPurpose)();


              _this.setState({
                financialYearFromQuery: financialYearFromQuery, purpose: purpose,
                isAssesment: purpose == _formUtils.PROPERTY_FORM_PURPOSE.ASSESS,
                isReassesment: purpose == _formUtils.PROPERTY_FORM_PURPOSE.REASSESS,
                isCreate: purpose == _formUtils.PROPERTY_FORM_PURPOSE.CREATE,
                isUpdate: purpose == _formUtils.PROPERTY_FORM_PURPOSE.UPDATE
              });

              titleObject = isReasses ? ["PT_REASSESS_PROPERTY"] : ["PT_PROPERTY_ASSESSMENT_HEADER", "(" + financialYearFromQuery + ")", ":", "PT_ADD_NEW_PROPERTY"];


              renderCustomTitleForPt({ titleObject: titleObject });
              hideSpinner();
              prepareFinalObject('propertiesEdited', false);

              if (!(0, _PTCommon.getQueryValue)(search, "purpose")) {
                prepareFinalObject('Properties', []);
              } else if ((0, _PTCommon.getQueryValue)(search, "purpose") == "update" || (0, _PTCommon.getQueryValue)(search, "purpose") == "assess" || (0, _PTCommon.getQueryValue)(search, "purpose") == "reassess") {
                prepareFinalObject('Properties', _this.props.common.prepareFormData.Properties);
              }
              // Fetch property and store in state as Old property in case of edit in workflow

              if (!isModify) {
                _context2.next = 42;
                break;
              }

              _context2.next = 42;
              return (0, _propertyCreateUtils.setOldPropertyData)(search, prepareFinalObject);

            case 42:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
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
              cardTitle: _react2.default.createElement(_translationNode2.default, {
                label: "PT_DETAILS_OF_AUTHORISED_PERSON",
                defaultLabel: "Details of authorised person"
              }),
              disabled: disableOwner
            })
          );
        default:
          return null;
      }
    }, _this.updateEstimate = function () {
      _this.estimate().then(function (estimateResponse) {
        if (estimateResponse) {
          _this.setState({
            estimation: estimateResponse ? estimateResponse.Calculation : [],
            totalAmountToBePaid: estimateResponse && estimateResponse.Calculation && estimateResponse.Calculation[0].totalAmount,
            valueSelected: "Full_Amount"
          });
        }
      });
    }, _this.onRadioButtonChange = function (e) {
      var estimation = _this.state.estimation;

      var _ref4 = estimation[0] || {},
          totalAmount = _ref4.totalAmount;

      if (e.target.value === "Full_Amount") {
        _this.setState({
          totalAmountToBePaid: totalAmount,
          valueSelected: "Full_Amount",
          partialAmountError: ""
        });
      } else {
        _this.setState({
          totalAmountToBePaid: 100,
          valueSelected: "Partial_Amount"
        });
      }
    }, _this.renderStepperContent = function (selected, fromReviewPage) {
      var _this4 = _this,
          getOwnerDetails = _this4.getOwnerDetails,
          updateEstimate = _this4.updateEstimate;
      var _this$state = _this.state,
          draftRequest = _this$state.draftRequest,
          estimation = _this$state.estimation,
          totalAmountToBePaid = _this$state.totalAmountToBePaid,
          financialYearFromQuery = _this$state.financialYearFromQuery,
          importantDates = _this$state.importantDates,
          valueSelected = _this$state.valueSelected,
          partialAmountError = _this$state.partialAmountError,
          assessedPropertyDetails = _this$state.assessedPropertyDetails,
          purpose = _this$state.purpose;
      var _this5 = _this,
          onRadioButtonChange = _this5.onRadioButtonChange,
          updateTotalAmount = _this5.updateTotalAmount;
      var _this$props3 = _this.props,
          location = _this$props3.location,
          propertiesEdited = _this$props3.propertiesEdited;
      var search = location.search;

      var isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");
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
              properties: _this.props['prepareFormData']['Properties'][0],
              onTabClick: _this.onTabClick,
              updateIndex: _this.updateIndex,
              stepZero: _this.renderStepperContent(0, fromReviewPage),
              stepOne: _this.renderStepperContent(1, fromReviewPage),
              stepTwo: _this.renderStepperContent(2, fromReviewPage),
              estimationDetails: estimation,
              updateEstimate: updateEstimate,
              importantDates: importantDates,
              location: _this.props.location,
              totalAmount: totalAmountToBePaid,
              isCompletePayment: isCompletePayment,
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
            _react2.default.createElement(_PaymentDetails2.default, {
              onRadioButtonChange: onRadioButtonChange,
              updateTotalAmount: updateTotalAmount,
              estimationDetails: estimation,
              financialYr: financialYearFromQuery,
              totalAmountToBePaid: totalAmountToBePaid,
              optionSelected: valueSelected,
              importantDates: importantDates,
              partialAmountError: partialAmountError,
              isPartialPaymentInValid: (0, _lodash.get)(_this.state, "estimation[0].totalAmount", 1) < 100 || (0, _lodash.get)(_this.props.form, "basicInformation.fields.typeOfBuilding.value", "").toLowerCase() === "vacant"
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
    }, _this.resetForm = function () {
      var _this$props4 = _this.props,
          form = _this$props4.form,
          removeForm = _this$props4.removeForm,
          prepareFormDataAction = _this$props4.prepareFormDataAction,
          prepareFinalObject = _this$props4.prepareFinalObject;

      (0, _PTCommon.resetFormWizard)(form, removeForm);
      prepareFormDataAction("Properties", []);
      prepareFinalObject("documentsUploadRedux", {});
      _this.onTabClick(0);
    }, _this.onTabClick = function (index) {
      var _this$state2 = _this.state,
          formValidIndexArray = _this$state2.formValidIndexArray,
          selected = _this$state2.selected;
      var location = _this.props.location;
      var search = location.search;

      var isCompletePayment = false;
      if (formValidIndexArray.indexOf(index) !== -1 && selected >= index) {
        !isCompletePayment ? _this.setState({
          selected: index,
          formValidIndexArray: (0, _range2.default)(0, index)
        }) : alert("Not authorized to edit this property details");
      }
    }, _this.updateIndex = function (index) {
      var _this6 = _this,
          pay = _this6.pay,
          estimate = _this6.estimate,
          createReceipt = _this6.createReceipt,
          createAndUpdate = _this6.createAndUpdate,
          onPayButtonClick = _this6.onPayButtonClick;
      var _this$state3 = _this.state,
          selected = _this$state3.selected,
          formValidIndexArray = _this$state3.formValidIndexArray,
          financialYearFromQuery = _this$state3.financialYearFromQuery,
          estimation = _this$state3.estimation;
      var _this$props5 = _this.props,
          setRoute = _this$props5.setRoute,
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
            }, "error");
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
            }, "error");
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
          (0, _FormWizardUtils.getImportantDates)(_this);
          break;
        case 2:
          if (window.appOverrides && !window.appOverrides.validateForm("ownerInfo", form)) {
            _this.props.toggleSnackbarAndSetText(true, {
              labelName: "ULB validations failed!",
              labelKey: "ERR_ULD_VALIDATIONS_FAILED"
            }, "error");
            break;
          }

          var ownershipType = form.ownershipType;

          var estimateCall = function estimateCall() {
            estimate().then(function (estimateResponse) {
              if (estimateResponse) {
                window.scrollTo(0, 0);
                _this.setState({
                  estimation: estimateResponse && estimateResponse.Calculation,
                  totalAmountToBePaid: estimateResponse && estimateResponse.Calculation && estimateResponse.Calculation[0].totalAmount,
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
        // createAndUpdate(index);
        case 4:
          var _this$state$assessedP = _this.state.assessedPropertyDetails,
              asd = _this$state$assessedP === undefined ? {} : _this$state$assessedP;
          var _asd$Properties = asd.Properties,
              pts = _asd$Properties === undefined ? [] : _asd$Properties;
          var search1 = _this.props.location.search;

          var isAssesment1 = (0, _PTCommon.getQueryValue)(search1, "purpose") == 'assess';
          var isReassesment = (0, _PTCommon.getQueryValue)(search1, "purpose") == 'reassess';

          var propertyId1 = '';
          var tenantId1 = '';
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = pts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var pty = _step.value;

              propertyId1 = pty.propertyId;
              tenantId1 = pty.tenantId;
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

          if (estimation && estimation.length && estimation.length > 1 && estimation[0].totalAmount < 0) {
            alert('Property Tax amount cannot be Negative!');
          } else {
            window.scrollTo(0, 0);
            if (isAssesment1) {
              // this.assessProperty();
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
            // createAndUpdate(index);
            // pt-acknowledgment?purpose=apply&status=success&applicationNumber=PB-TL-2019-12-20-003743&FY=2019-20&tenantId=pb.amritsar
            // createAndUpdate(index);
          }
          break;
        case 5:
          var _this$state$assessedP2 = _this.state.assessedPropertyDetails,
              assessedPropertyDetails = _this$state$assessedP2 === undefined ? {} : _this$state$assessedP2;
          var _assessedPropertyDeta = assessedPropertyDetails.Properties,
              Properties = _assessedPropertyDeta === undefined ? [] : _assessedPropertyDeta;

          var propertyId = '';
          var tenantId = '';
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _pty = _step2.value;

              propertyId = _pty.propertyId;
              tenantId = _pty.tenantId;
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

          _this.props.history.push("./../egov-common/pay?consumerCode=" + propertyId + "&tenantId=" + tenantId + "&businessService=PT");
          // this.setState(
          //   {
          //     selected: index,
          //     formValidIndexArray: [...formValidIndexArray, selected]
          //   });
          break;
        case 6:
          onPayButtonClick();
          break;
        case 7:
          pay();
          break;
      }
    }, _this.callGetBill = function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(propertyId, assessmentNumber, assessmentYear, tenantId, amountExpected) {
        var location, _this$state4, isFullPayment, totalAmountToBePaid, estimation, valueSelected, search, isCompletePayment, queryObj, billResponse;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                location = _this.props.location;
                _this$state4 = _this.state, isFullPayment = _this$state4.isFullPayment, totalAmountToBePaid = _this$state4.totalAmountToBePaid, estimation = _this$state4.estimation, valueSelected = _this$state4.valueSelected;
                search = location.search;
                isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");
                queryObj = [{ key: "consumerCodes", value: propertyId }, { key: "tenantId", value: tenantId }];
                // amountExpected &&
                //   queryObj.push({
                //     key: "amountExpected",
                //     value:
                //       valueSelected === "Full_Amount"
                //         ? estimation[0].totalAmount
                //         : totalAmountToBePaid
                //   });

                _context3.prev = 5;
                _context3.next = 8;
                return (0, _api.httpRequest)("pt-calculator-v2/propertytax/_getbill", "_create", queryObj, {});

              case 8:
                billResponse = _context3.sent;
                return _context3.abrupt("return", billResponse);

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](5);

                _this.props.history.push("payment-failure/" + propertyId + "/" + tenantId + "/" + assessmentNumber + "/" + assessmentYear);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2, [[5, 12]]);
      }));

      return function (_x4, _x5, _x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.callPGService = function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(propertyId, assessmentNumber, assessmentYear, tenantId) {
        var _this7, updateIndex, _this$state5, isFullPayment, totalAmountToBePaid, estimation, search, isCompletePayment, getBill, _ref7, Bill;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this7 = _this, updateIndex = _this7.updateIndex;
                _this$state5 = _this.state, isFullPayment = _this$state5.isFullPayment, totalAmountToBePaid = _this$state5.totalAmountToBePaid, estimation = _this$state5.estimation;
                search = _this.props.location.search;
                isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");

                _this.setState({
                  propertyDetails: {
                    propertyId: propertyId,
                    assessmentNumber: assessmentNumber,
                    assessmentYear: assessmentYear,
                    tenantId: tenantId
                  }
                });
                _context4.prev = 5;
                _context4.next = 8;
                return _this.callGetBill(propertyId, assessmentNumber, assessmentYear, tenantId, true);

              case 8:
                getBill = _context4.sent;
                _ref7 = getBill && getBill, Bill = _ref7.Bill;

                _this.createReceipt(Bill);
                // }
                // updateIndex(4);
                _context4.next = 15;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](5);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[5, 13]]);
      }));

      return function (_x9, _x10, _x11, _x12) {
        return _ref6.apply(this, arguments);
      };
    }(), _this.changeDateToFormat = function (date) {
      return new Date(date).getTime();
    }, _this.createReceipt = function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var Bill = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var _this$props6, prepareFormData, hideSpinner, propertyDetails, assessmentNumber, propertyId, tenantId, assessmentYear, index, formData, getReceipt;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this$props6 = _this.props, prepareFormData = _this$props6.prepareFormData, hideSpinner = _this$props6.hideSpinner;
                propertyDetails = _this.state.propertyDetails;
                assessmentNumber = propertyDetails.assessmentNumber, propertyId = propertyDetails.propertyId, tenantId = propertyDetails.tenantId, assessmentYear = propertyDetails.assessmentYear;

                (0, _lodash.set)(prepareFormData, "Receipt[0].Bill[0].billDetails[0].amountPaid", 0); //todo Consumer code uniqueness //i guess here
                prepareFormData.Receipt[0].Bill[0] = (0, _extends3.default)({}, Bill[0], prepareFormData.Receipt[0].Bill[0]);
                // prepareFormData.Receipt[0].Bill[0].billDetails[0] = {
                //   ...Bill[0].billDetails[0],
                //   ...prepareFormData.Receipt[0].Bill[0].billDetails[0]
                // };

                for (index = 0; index < Bill[0].billDetails.length; index++) {
                  prepareFormData.Receipt[0].Bill[0].billDetails[index] = (0, _extends3.default)({}, Bill[0].billDetails[index], prepareFormData.Receipt[0].Bill[0].billDetails[index], {
                    collectionType: 'COUNTER'
                  });
                }
                if (!(0, _lodash.get)(prepareFormData, "Receipt[0].instrument.instrumentType.name")) {
                  (0, _lodash.set)(prepareFormData, "Receipt[0].instrument.instrumentType.name", "Cash");
                }
                (0, _lodash.set)(prepareFormData, "Receipt[0].Bill[0].billDetails[0].amountPaid", _this.state.totalAmountToBePaid);
                //CS v1.1 changes
                (0, _lodash.set)(prepareFormData, "Receipt[0].Bill[0].taxAndPayments[0].amountPaid", _this.state.totalAmountToBePaid);
                // set(
                //   prepareFormData,
                //   "Receipt[0].Bill[0].billDetails[0].collectionType",
                //   "COUNTER" // HardCoding collectionType to COUNTER - Discussed with BE
                // );
                //----------------
                (0, _lodash.set)(prepareFormData, "Receipt[0].instrument.tenantId", (0, _lodash.get)(prepareFormData, "Receipt[0].Bill[0].tenantId"));
                if ((0, _lodash.get)(prepareFormData, "Receipt[0].instrument.transactionDateInput")) {
                  (0, _lodash.set)(prepareFormData, "Receipt[0].instrument.transactionDateInput", _this.changeDateToFormat((0, _lodash.get)(prepareFormData, "Receipt[0].instrument.transactionDateInput")));
                  //Dont delete
                  // set(
                  //   prepareFormData,
                  //   "Receipt[0].instrument.instrumentDate",
                  //   this.changeDateToFormat(get(prepareFormData, "Receipt[0].instrument.transactionDateInput"))
                  // );
                }
                //Dont delete
                // if (get(prepareFormData, "Receipt[0].instrument.transactionNumber")) {
                //   set(prepareFormData, "Receipt[0].instrument.instrumentNumber", get(prepareFormData, "Receipt[0].instrument.transactionNumber"));
                // }

                (0, _lodash.get)(prepareFormData, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate") && (0, _lodash.set)(prepareFormData, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate", _this.changeDateToFormat((0, _lodash.get)(prepareFormData, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate")));
                (0, _lodash.set)(prepareFormData, "Receipt[0].instrument.amount", _this.state.totalAmountToBePaid);
                (0, _lodash.set)(prepareFormData, "Receipt[0].tenantId", (0, _lodash.get)(prepareFormData, "Receipt[0].Bill[0].tenantId"));
                formData = {
                  Receipt: prepareFormData["Receipt"]
                };

                if (!((0, _lodash.get)(prepareFormData, "Receipt[0].instrument.transactionNumber") && (0, _lodash.get)(prepareFormData, "Receipt[0].instrument.transactionNumberConfirm") && (0, _lodash.get)(prepareFormData, "Receipt[0].instrument.transactionNumber") !== (0, _lodash.get)(prepareFormData, "Receipt[0].instrument.transactionNumberConfirm"))) {
                  _context5.next = 18;
                  break;
                }

                _this.props.toggleSnackbarAndSetText(true, {
                  labelName: "Transaction numbers don't match !",
                  labelKey: "ERR_TRASACTION_NUMBERS_DONT_MATCH"
                }, "error");
                return _context5.abrupt("return");

              case 18:
                if (!(_this.state.totalAmountToBePaid === "")) {
                  _context5.next = 21;
                  break;
                }

                _this.props.toggleSnackbarAndSetText(true, {
                  labelName: "Amount to pay can't be empty",
                  labelKey: "ERR_AMOUNT_CANT_BE_EMPTY"
                }, true);
                return _context5.abrupt("return");

              case 21:

                if (!(0, _lodash.get)(prepareFormData, "Receipt[0].Bill[0].paidBy")) {
                  (0, _lodash.set)(prepareFormData, "Receipt[0].Bill[0].paidBy", (0, _lodash.get)(prepareFormData, "Receipt[0].Bill[0].payerName"));
                }

                _context5.prev = 22;
                _context5.next = 25;
                return (0, _api.httpRequest)("collection-services/receipts/_create", //todo Consumer code uniqueness
                "_create", [], formData, []);

              case 25:
                getReceipt = _context5.sent;

                if (getReceipt && getReceipt.Receipt && getReceipt.Receipt.length) {
                  (0, _lodash.set)(prepareFormData, "Receipt[0].Bill", []);
                  (0, _lodash.set)(prepareFormData, "Receipt[0].instrument", {}); // Clear prepareFormData
                  hideSpinner();
                  _this.setState({ nextButtonEnabled: true });
                  _this.props.history.push("payment-success/" + propertyId + "/" + tenantId + "/" + assessmentNumber + "/" + assessmentYear);
                } else {}
                _context5.next = 35;
                break;

              case 29:
                _context5.prev = 29;
                _context5.t0 = _context5["catch"](22);

                (0, _lodash.set)(prepareFormData, "Receipt[0].Bill", []);
                (0, _lodash.set)(prepareFormData, "Receipt[0].instrument", {});
                hideSpinner();
                _this.props.history.push("payment-failure/" + propertyId + "/" + tenantId + "/" + assessmentNumber + "/" + assessmentYear);

              case 35:
                _context5.prev = 35;
                return _context5.finish(35);

              case 37:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this2, [[22, 29, 35, 37]]);
      }));

      return function () {
        return _ref8.apply(this, arguments);
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
                    _this.props.prepareFinalObject("estimateResponse", estimateResponse.Calculation);
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
      var _this$props7, hideSpinner, location, showSpinner, search, isAssesment, isReassesment, prepareFormData, financialYearFromQuery, financeYear, assessmentPayload, estimateResponse, tenantId, calculationScreenData;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this$props7 = _this.props, hideSpinner = _this$props7.hideSpinner, location = _this$props7.location, showSpinner = _this$props7.showSpinner;
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
    })), _this.createAndUpdate = function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(index, action) {
        var _this$state6, selected, formValidIndexArray, prepareFinalObject, financialYearFromQuery, _this$props8, form, common, location, hideSpinner, preparedFinalObject, search, propertyId, assessmentId, propertyMethodAction, prepareFormData, isModify, selectedownerShipCategoryType, _getInstituteInfo, instiObj, ownerArray, properties;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$state6 = _this.state, selected = _this$state6.selected, formValidIndexArray = _this$state6.formValidIndexArray, prepareFinalObject = _this$state6.prepareFinalObject;
                financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
                _this$props8 = _this.props, form = _this$props8.form, common = _this$props8.common, location = _this$props8.location, hideSpinner = _this$props8.hideSpinner, preparedFinalObject = _this$props8.preparedFinalObject;
                search = location.search;
                propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
                assessmentId = (0, _PTCommon.getQueryValue)(search, "assessmentId");
                propertyMethodAction = !!propertyId ? "_update" : "_create";
                prepareFormData = (0, _extends3.default)({}, _this.props.prepareFormData);
                isModify = (0, _PTCommon.getQueryValue)(search, "mode") == 'WORKFLOWEDIT';

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
                return _context8.stop();
            }
          }
        }, _callee8, _this2);
      }));

      return function (_x14, _x15) {
        return _ref11.apply(this, arguments);
      };
    }(), _this.pay = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
      var _this8, callPGService, financialYearFromQuery, _this$props9, form, common, location, hideSpinner, search, _this$state$assessedP3, assessedPropertyDetails, _assessedPropertyDeta2, Properties, propertyUID, propertyId, assessmentId, tenantId, isCompletePayment, propertyMethodAction, prepareFormData, selectedownerShipCategoryType, _getInstituteInfo2, instiObj, ownerArray, properties;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _this8 = _this, callPGService = _this8.callPGService;
              financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
              _this$props9 = _this.props, form = _this$props9.form, common = _this$props9.common, location = _this$props9.location, hideSpinner = _this$props9.hideSpinner;
              search = location.search;
              _this$state$assessedP3 = _this.state.assessedPropertyDetails, assessedPropertyDetails = _this$state$assessedP3 === undefined ? {} : _this$state$assessedP3;
              _assessedPropertyDeta2 = assessedPropertyDetails.Properties, Properties = _assessedPropertyDeta2 === undefined ? [] : _assessedPropertyDeta2;
              propertyUID = (0, _lodash.get)(assessedPropertyDetails, "Properties[0].propertyId");
              propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");

              if (!propertyId) {
                propertyId = propertyUID;
              }
              assessmentId = (0, _PTCommon.getQueryValue)(search, "assessmentId");
              tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");
              isCompletePayment = (0, _PTCommon.getQueryValue)(search, "isCompletePayment");
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
                _getInstituteInfo2 = (0, _FormWizardUtils.getInstituteInfo)(_this), instiObj = _getInstituteInfo2.instiObj, ownerArray = _getInstituteInfo2.ownerArray;

                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", ownerArray);
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].institution", instiObj);
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(form, "ownershipType.fields.typeOfOwnership.value", ""));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", (0, _lodash.get)(form, "institutionDetails.fields.type.value", ""));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].citizenInfo.mobileNumber", (0, _lodash.get)(form, "institutionAuthority.fields.mobile.value", (0, _lodash.get)(form, "institutionAuthority.fields.telephone.value", null)));
              }

              try {
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].citizenInfo.name", (0, _lodash.get)(prepareFormData, "Properties[0].propertyDetails[0].owners[0].name"));

                if (isCompletePayment) {
                  callPGService(propertyId, assessmentId, financialYearFromQuery, tenantId);
                } else {
                  properties = (0, _FormWizardUtils.normalizePropertyDetails)(prepareFormData.Properties, _this);


                  callPGService((0, _lodash.get)(assessedPropertyDetails, "Properties[0].propertyId"), (0, _lodash.get)(assessedPropertyDetails, "Properties[0].propertyDetails[0].assessmentNumber"), (0, _lodash.get)(assessedPropertyDetails, "Properties[0].propertyDetails[0].financialYear"), (0, _lodash.get)(assessedPropertyDetails, "Properties[0].tenantId"));
                }
              } catch (e) {
                hideSpinner();
                _this.setState({ nextButtonEnabled: true });
                alert(e);
              }

            case 23:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, _this2);
    })), _this.closeDeclarationDialogue = function () {
      _this.setState({ dialogueOpen: false });
    }, _this.onPayButtonClick = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
      var _this$state7, isFullPayment, partialAmountError, totalAmountToBePaid, _this$props10, showSpinner, hideSpinner, _this$props11, form, prepareFormData, formKeysToValidate, modeOfPaymentExists, i, validateArray, areFormsValid;

      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _this$state7 = _this.state, isFullPayment = _this$state7.isFullPayment, partialAmountError = _this$state7.partialAmountError, totalAmountToBePaid = _this$state7.totalAmountToBePaid;
              _this$props10 = _this.props, showSpinner = _this$props10.showSpinner, hideSpinner = _this$props10.hideSpinner;

              if (!(!isFullPayment && partialAmountError)) {
                _context10.next = 4;
                break;
              }

              return _context10.abrupt("return");

            case 4:
              _context10.prev = 4;

              if (!(totalAmountToBePaid % 1 === 0)) {
                _context10.next = 21;
                break;
              }

              //Fractions Check
              _this.setState({ dialogueOpen: true });
              _this$props11 = _this.props, form = _this$props11.form, prepareFormData = _this$props11.prepareFormData;
              formKeysToValidate = ["cardInfo", "cashInfo", "chequeInfo", "demandInfo"];
              modeOfPaymentExists = false;
              i = 0;

            case 11:
              if (!(i < formKeysToValidate.length)) {
                _context10.next = 18;
                break;
              }

              if (!(Object.keys(form).indexOf(formKeysToValidate[i]) > -1)) {
                _context10.next = 15;
                break;
              }

              modeOfPaymentExists = true;
              return _context10.abrupt("break", 18);

            case 15:
              i++;
              _context10.next = 11;
              break;

            case 18:
              if (modeOfPaymentExists) {
                validateArray = Object.keys(form).reduce(function (result, item) {
                  if (formKeysToValidate.indexOf(item) > -1) {
                    result.push({
                      formKey: item,
                      formValid: (0, _utils.validateForm)(form[item])
                    });
                  }
                  return result;
                }, []);
                areFormsValid = validateArray.reduce(function (result, current) {
                  if (!current.formValid) {
                    result = false;
                  } else {
                    result = true;
                  }
                  return result;
                }, false);


                if (areFormsValid) {
                  _this.setState({ nextButtonEnabled: false });
                  showSpinner();
                  _this.pay();
                } else {
                  validateArray.forEach(function (item) {
                    if (!item.formValid) {
                      _this.props.displayFormErrorsAction(item.formKey);
                    }
                  });
                }
              } else {
                _this.setState({ nextButtonEnabled: false });
                showSpinner();
                _this.pay();
              }
              _context10.next = 22;
              break;

            case 21:
              alert("Amount cannot be a fraction!");

            case 22:
              _context10.next = 27;
              break;

            case 24:
              _context10.prev = 24;
              _context10.t0 = _context10["catch"](4);

              hideSpinner();

            case 27:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, _this2, [[4, 24]]);
    })), _this.convertImgToDataURLviaCanvas = function (url, callback, outputFormat) {
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

      var imageUrl = _this.state.imageUrl;
      var _this$props12 = _this.props,
          common = _this$props12.common,
          _this$props12$app = _this$props12.app,
          app = _this$props12$app === undefined ? {} : _this$props12$app,
          prepareFormData = _this$props12.prepareFormData,
          base64UlbLogoForPdf = _this$props12.base64UlbLogoForPdf;
      var _prepareFormData$Prop = prepareFormData.Properties,
          Properties = _prepareFormData$Prop === undefined ? [] : _prepareFormData$Prop;
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
      (0, _acknowledgementFormPDF2.default)("pt-reciept-citizen", receiptDetails, generalMDMSDataById, imageUrl, null, base64UlbLogoForPdf);
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
      var _props$location = this.props.location,
          location = _props$location === undefined ? {} : _props$location;
      var _location$search = location.search,
          search = _location$search === undefined ? '' : _location$search;

      var isAssesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'assess';
      var isReassesment = (0, _PTCommon.getQueryValue)(search, "purpose") == 'reassess';
      var buttonLabel = "PT_PROPERTY_ASSESS_NOTIFICATION";
      isAssesment ? buttonLabel = 'PT_PROPERTY_ASSESS_NOTIFICATION' : isReassesment ? buttonLabel = "PT_PROPERTY_REASSESS_NOTIFICATION" : buttonLabel = "PT_PROPERTY_ADD_NOTIFICATION";
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
          nextButtonEnabled = _state2.nextButtonEnabled,
          _state2$assessedPrope = _state2.assessedPropertyDetails,
          assessedPropertyDetails = _state2$assessedPrope === undefined ? {} : _state2$assessedPrope;

      var fromReviewPage = selected === 3;
      var _props2 = this.props,
          history = _props2.history,
          location = _props2.location;
      var search = location.search;
      var _assessedPropertyDeta3 = assessedPropertyDetails.Properties,
          Properties = _assessedPropertyDeta3 === undefined ? [] : _assessedPropertyDeta3;

      var propertyId = '';
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var pty = _step3.value;

          propertyId = pty.propertyId;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

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
          header: (0, _FormWizardUtils.getHeaderLabel)(selected, "employee"),
          footer: null,
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
  var _ref14 = state || {},
      form = _ref14.form,
      common = _ref14.common,
      app = _ref14.app,
      screenConfiguration = _ref14.screenConfiguration,
      properties = _ref14.properties;

  var _properties$Assessmen = properties.Assessments,
      Assessments = _properties$Assessmen === undefined ? [] : _properties$Assessmen;
  var propertyAddress = form.propertyAddress;

  var _ref15 = propertyAddress && propertyAddress.fields && propertyAddress.fields || {},
      city = _ref15.city;

  var currentTenantId = city && city.value || _common2.default.tenantId;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var documentsUploadRedux = preparedFinalObject.documentsUploadRedux,
      _preparedFinalObject$ = preparedFinalObject.newProperties,
      newProperties = _preparedFinalObject$ === undefined ? [] : _preparedFinalObject$,
      _preparedFinalObject$2 = preparedFinalObject.propertiesEdited,
      propertiesEdited = _preparedFinalObject$2 === undefined ? false : _preparedFinalObject$2,
      _preparedFinalObject$3 = preparedFinalObject.adhocExemptionPenalty,
      adhocExemptionPenalty = _preparedFinalObject$3 === undefined ? {} : _preparedFinalObject$3,
      _preparedFinalObject$4 = preparedFinalObject.ptDocumentCount,
      ptDocumentCount = _preparedFinalObject$4 === undefined ? 0 : _preparedFinalObject$4,
      _preparedFinalObject$5 = preparedFinalObject.base64UlbLogoForPdf,
      base64UlbLogoForPdf = _preparedFinalObject$5 === undefined ? '' : _preparedFinalObject$5,
      _preparedFinalObject$6 = preparedFinalObject.propertyAdditionalDetails,
      propertyAdditionalDetails = _preparedFinalObject$6 === undefined ? {} : _preparedFinalObject$6;

  var requiredDocCount = ptDocumentCount;

  return {
    form: form,
    currentTenantId: currentTenantId,
    prepareFormData: common.prepareFormData,
    common: common,
    app: app,
    documentsUploadRedux: documentsUploadRedux,
    newProperties: newProperties,
    propertiesEdited: propertiesEdited,
    adhocExemptionPenalty: adhocExemptionPenalty,
    requiredDocCount: requiredDocCount, Assessments: Assessments,
    base64UlbLogoForPdf: base64UlbLogoForPdf,
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
    showSpinner: function showSpinner() {
      return dispatch((0, _actions3.showSpinner)());
    },
    hideSpinner: function hideSpinner() {
      return dispatch((0, _actions3.hideSpinner)());
    },
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName, key, tenantId) {
      return dispatch((0, _actions3.fetchGeneralMDMSData)(requestBody, moduleName, masterName, key, tenantId));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions2.toggleSnackbarAndSetText)(open, message, error));
    },
    generalMDMSFetchSuccess: function generalMDMSFetchSuccess(payload, moduleName, masterArray) {
      return dispatch((0, _actions3.generalMDMSFetchSuccess)(payload, moduleName, masterArray));
    },
    fetchMDMDDocumentTypeSuccess: function fetchMDMDDocumentTypeSuccess(data) {
      return dispatch((0, _actions6.fetchMDMDDocumentTypeSuccess)(data));
    },
    updatePrepareFormDataFromDraft: function updatePrepareFormDataFromDraft(prepareFormData) {
      return dispatch((0, _actions3.updatePrepareFormDataFromDraft)(prepareFormData));
    },
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions4.handleFieldChange)(formKey, fieldKey, value));
    },
    prepareFormDataAction: function prepareFormDataAction(path, value) {
      return dispatch((0, _actions3.prepareFormData)(path, value));
    },
    removeForm: function removeForm(formkey) {
      return dispatch((0, _actions4.removeForm)(formkey));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    },
    toggleSpinner: function toggleSpinner() {
      return dispatch((0, _actions3.toggleSpinner)());
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