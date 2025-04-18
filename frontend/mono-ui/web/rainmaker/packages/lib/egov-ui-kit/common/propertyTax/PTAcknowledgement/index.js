"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _DownloadPrintButton = require("egov-ui-framework/ui-molecules/DownloadPrintButton");

var _DownloadPrintButton2 = _interopRequireDefault(_DownloadPrintButton);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _createReceipt = require("egov-ui-kit/common/propertyTax/PaymentStatus/Components/createReceipt");

var _actions2 = require("egov-ui-kit/redux/properties/actions");

var _api = require("egov-ui-kit/utils/api");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _generatePTAcknowledgment = require("egov-ui-kit/utils/pdfUtils/generatePTAcknowledgment");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _PTHeader = require("../../common/PTHeader");

var _PTHeader2 = _interopRequireDefault(_PTHeader);

var _AcknowledgementReceipt = require("../AcknowledgementReceipt");

var _actions3 = require("egov-ui-kit/redux/app/actions");

var _PTInformation = require("../AssessmentList/components/PTInformation");

var _PTInformation2 = _interopRequireDefault(_PTInformation);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PTAcknowledgement = function (_React$Component) {
  (0, _inherits3.default)(PTAcknowledgement, _React$Component);

  function PTAcknowledgement() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PTAcknowledgement);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PTAcknowledgement.__proto__ || Object.getPrototypeOf(PTAcknowledgement)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      propertyId: "",
      fetchBill: false,
      fetchingBill: false,
      showPay: false
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          fetchProperties = _this$props.fetchProperties,
          location = _this$props.location;
      var search = location.search;

      var propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
      var tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");
      fetchProperties([{ key: "propertyIds", value: propertyId }, { key: "tenantId", value: tenantId }]);
      _this.setState({ propertyId: propertyId });
      (0, _generatePDF.loadUlbLogo)(tenantId);
    }, _this.onGoHomeClick = function () {
      process.env.REACT_APP_NAME === "Employee" ? _store2.default.dispatch((0, _actions.setRoute)("/pt-mutation/propertySearch")) : _store2.default.dispatch((0, _actions.setRoute)("/property-tax"));
    }, _this.onAssessPayClick = function () {
      var propertyId = (0, _commons.getQueryArg)(window.location.href, "propertyId");
      var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
      (0, _formUtils.routeToCommonPay)(propertyId, tenant);
      // store.dispatch(
      //   setRoute(
      //     `/egov-common/pay?consumerCode=${propertyId}&tenantId=${tenant}&businessService=PT`
      //   )
      // );
    }, _this.downloadAcknowledgementForm = function () {
      var _this$props2 = _this.props,
          common = _this$props2.common,
          _this$props2$app = _this$props2.app,
          app = _this$props2$app === undefined ? {} : _this$props2$app,
          propertiesById = _this$props2.propertiesById;
      var propertyId = _this.state.propertyId;

      var convertedResponse = [propertiesById[propertyId]];
      var _convertedResponse$ = convertedResponse[0],
          address = _convertedResponse$.address,
          propertyDetails = _convertedResponse$.propertyDetails;
      var owners = propertyDetails[0].owners;
      var localizationLabels = app.localizationLabels;
      var cities = common.cities,
          generalMDMSDataById = common.generalMDMSDataById;

      var header = (0, _createReceipt.getHeaderDetails)(convertedResponse[0], cities, localizationLabels, true);
      var receiptDetails = {};
      receiptDetails = {
        propertyDetails: propertyDetails,
        address: address,
        owners: owners,
        header: header,
        propertyId: propertyId
      };
      (0, _AcknowledgementReceipt.AcknowledgementReceipt)("pt-reciept-citizen", receiptDetails, generalMDMSDataById, null);
    }, _this.getFetchBillResponse = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(propertyId, tenantId) {
        var showPay, fetchBill, queryObject, payload;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                showPay = false;
                fetchBill = true;

                _this.setState({ fetchingBill: true });
                queryObject = [{ key: "consumerCode", value: propertyId }, { key: "tenantId", value: tenantId }, { key: "businessService", value: "PT" }];
                _context.prev = 4;
                _context.next = 7;
                return (0, _api.httpRequest)("billing-service/bill/v2/_fetchbill", "_search", queryObject);

              case 7:
                payload = _context.sent;

                if (payload && payload.Bill.length > 0) {
                  showPay = true;
                }
                _this.setState({ showPay: showPay, fetchBill: fetchBill });
                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);

                _this.props.toggleSnackbarAndSetText(true, { labelName: _context.t0.message, labelKey: _context.t0.message }, _context.t0.message && _context.t0.message.includes && _context.t0.message.includes("No Demands Found") ? "warning" : "error");
                console.log(e);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[4, 12]]);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PTAcknowledgement, [{
    key: "download",
    value: function download() {
      var _props = this.props,
          UlbLogoForPdf = _props.UlbLogoForPdf,
          selPropertyDetails = _props.selPropertyDetails,
          generalMDMSDataById = _props.generalMDMSDataById;

      (0, _generatePTAcknowledgment.generatePTAcknowledgment)(selPropertyDetails, generalMDMSDataById, UlbLogoForPdf, "pt-acknowledgement-" + selPropertyDetails.propertyId + ".pdf");
    }
  }, {
    key: "print",
    value: function print() {
      var _props2 = this.props,
          UlbLogoForPdf = _props2.UlbLogoForPdf,
          selPropertyDetails = _props2.selPropertyDetails,
          generalMDMSDataById = _props2.generalMDMSDataById;

      (0, _generatePTAcknowledgment.generatePTAcknowledgment)(selPropertyDetails, generalMDMSDataById, UlbLogoForPdf, 'print');
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          _props3$acknowledgeTy = _props3.acknowledgeType,
          acknowledgeType = _props3$acknowledgeTy === undefined ? "success" : _props3$acknowledgeTy,
          _props3$messageHeader = _props3.messageHeader,
          messageHeader = _props3$messageHeader === undefined ? "" : _props3$messageHeader,
          _props3$message = _props3.message,
          message = _props3$message === undefined ? "" : _props3$message,
          _props3$receiptHeader = _props3.receiptHeader,
          receiptHeader = _props3$receiptHeader === undefined ? "PT_APPLICATION_NO_LABEL" : _props3$receiptHeader,
          _props3$receiptNo = _props3.receiptNo,
          receiptNo = _props3$receiptNo === undefined ? "" : _props3$receiptNo,
          generalMDMSDataById = _props3.generalMDMSDataById,
          propertiesById = _props3.propertiesById;

      var purpose = (0, _formUtils.getPurpose)();
      var status = (0, _commons.getQueryArg)(window.location.href, "status");
      var financialYear = (0, _commons.getQueryArg)(window.location.href, "FY");
      var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
      var propertyId = (0, _commons.getQueryArg)(window.location.href, "propertyId") || "";
      var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber") || "";
      var properties = propertiesById[propertyId];
      var downloadMenu = [];
      var printMenu = [];
      if ((purpose == _formUtils.PROPERTY_FORM_PURPOSE.ASSESS || purpose == _formUtils.PROPERTY_FORM_PURPOSE.REASSESS) && !this.state.fetchBill && !this.state.showPay && !this.state.fetchingBill) {
        this.getFetchBillResponse(propertyId, tenantId);
      }
      var applicationDownloadObject = {
        label: { labelName: "Application", labelKey: "PT_APPLICATION" },
        link: function link() {
          // generatePdfFromDiv("download", propertyId, "#property-review-form");
          _this3.download();
          //this.downloadAcknowledgementForm();
          console.log("Download");
        },
        leftIcon: "assignment"
      };

      var tlCertificatePrintObject = {
        label: { labelName: "Application", labelKey: "PT_APPLICATION" },
        link: function link() {
          _this3.print();
          // generatePdfFromDiv("print", propertyId, "#property-review-form");
          //console.log("Print");
        },
        leftIcon: "book"
      };

      downloadMenu.push(applicationDownloadObject);
      printMenu.push(tlCertificatePrintObject);
      var icon = void 0;
      var iconColor = void 0;
      if (acknowledgeType == "success") {
        icon = "done";
        iconColor = "#39CB74";
      } else if (acknowledgeType == "failed") {
        icon = "close";
        iconColor = "#E54D42";
      } else {
        icon = "done";
        iconColor = "#39CB74";
      }
      var ptHeader = {};
      var ptMsg = {};
      var ptSubMsg = {};
      var Button1 = { name: "", onClick: "", visibility: false };
      var Button2 = { name: "", onClick: "", visibility: false };
      var downloadButton = { menu: downloadMenu, onClick: "", visibility: (purpose === _formUtils.PROPERTY_FORM_PURPOSE.CREATE || purpose === _formUtils.PROPERTY_FORM_PURPOSE.UPDATE) && status === "success" ? true : false };
      var printButton = { menu: printMenu, onClick: "", visibility: (purpose === _formUtils.PROPERTY_FORM_PURPOSE.CREATE || purpose === _formUtils.PROPERTY_FORM_PURPOSE.UPDATE) && status === "success" ? true : false };
      var statusIcon = {};
      var ptIDLabel = {};
      if (purpose === _formUtils.PROPERTY_FORM_PURPOSE.CREATE && status === "success") {
        ptHeader = {
          // labelName: `Application for New Trade License (${financialYearText})`,
          labelName: "New Property",
          labelKey: _formUtils.formWizardConstants[purpose].header,
          dynamicArray: [financialYear],
          subheader: "propertyId",
          subHeaderValue: "propertyId"
        };

        ptMsg = {
          labelName: "New Property Application Submitted Successfully",
          labelKey: "PT_NEW_PROPERTY_SUCCESS_MSG"
        };
        ptSubMsg = {
          labelName: "A notification regarding new property application has been sent to property owner at registered Mobile No.",
          labelKey: "PT_NEW_PROPERTY_SUCCESS_SUB_MSG"
        };
        statusIcon = {
          icon: "done",
          iconColor: "#39CB74"
        };
        ptIDLabel = {
          labelName: "Poperty ID",
          labelKey: "PT_ACKNOWLEDGEMENT_ID",
          visibility: true
        };
        Button1 = { name: "PT_GOHOME", buttonClick: this.onGoHomeClick, visibility: true };
        Button2 = { name: "PT_PROCEED_PAYMENT", buttonClick: this.onAssessPayClick, visibility: false };
        // downloadButton={menu:downloadMenu,visibility:true} ;
        // printButton={menu:printMenu,visibility:true} ;
      } else if (purpose === _formUtils.PROPERTY_FORM_PURPOSE.UPDATE && status === "success") {
        ptHeader = {
          // labelName: `Application for New Trade License (${financialYearText})`,
          labelName: "New Property",
          labelKey: _formUtils.formWizardConstants[purpose].header,
          dynamicArray: [financialYear],
          subheader: "propertyId",
          subHeaderValue: "propertyId"
        };

        ptMsg = {
          labelName: "New Property Application Submitted Successfully",
          labelKey: "PT_UPDATE_PROPERTY_SUCCESS_MSG"
        };
        ptSubMsg = {
          labelName: "A notification regarding new property application has been sent to property owner at registered Mobile No.",
          labelKey: "PT_UPDATE_PROPERTY_SUCCESS_SUB_MSG"
        };
        statusIcon = {
          icon: "done",
          iconColor: "#39CB74"
        };
        ptIDLabel = {
          labelName: "Poperty ID",
          labelKey: "PT_ACKNOWLEDGEMENT_ID",
          visibility: true
        };
        Button1 = { name: "PT_GOHOME", buttonClick: this.onGoHomeClick, visibility: true };
        Button2 = { name: "PT_PROCEED_PAYMENT", buttonClick: this.onAssessPayClick, visibility: false };
        // downloadButton={menu:downloadMenu,visibility:true} ;
        // printButton={menu:printMenu,visibility:true} ;
      } else if (purpose === _formUtils.PROPERTY_FORM_PURPOSE.CREATE && status === "failure") {
        ptHeader = {
          // labelName: `Application for New Trade License (${financialYearText})`,
          labelName: "New Property",
          labelKey: _formUtils.formWizardConstants[purpose].header,
          dynamicArray: [financialYear]
        };
        ptMsg = {
          labelName: "New Property Application Submission Failed",
          labelKey: "PT_NEW_PROPERTY_FAILURE_MSG"
        };
        ptIDLabel = {
          labelName: "Poperty ID",
          labelKey: "PT_PROPERTY_ID",
          visibility: false
        };
        statusIcon = {
          icon: "close",
          iconColor: "#E54D42"
        };
        ptSubMsg = {
          labelName: "A notification regarding new property application has been sent to property owner at registered Mobile No.",
          labelKey: "PT_NEW_PROPERTY_FAILURE_SUB_MSG"
        };

        Button1 = { name: "PT_GOHOME", buttonClick: this.onGoHomeClick, visibility: true };
        Button2 = { name: "PT_PROCEED_PAYMENT", buttonClick: this.onAssessPayClick, visibility: false };
        // downloadButton={menu:downloadMenu,visibility:false} ;
        // printButton={menu:printMenu,visibility:false} ;
      } else if (purpose === _formUtils.PROPERTY_FORM_PURPOSE.UPDATE && status === "failure") {
        ptHeader = {
          // labelName: `Application for New Trade License (${financialYearText})`,
          labelName: "New Property",
          labelKey: _formUtils.formWizardConstants[purpose].header,
          dynamicArray: [financialYear]
        };
        ptMsg = {
          labelName: "New Property Application Submission Failed",
          labelKey: "PT_UPDATE_PROPERTY_FAILURE_MSG"
        };
        ptIDLabel = {
          labelName: "Poperty ID",
          labelKey: "PT_PROPERTY_ID",
          visibility: false
        };
        statusIcon = {
          icon: "close",
          iconColor: "#E54D42"
        };
        ptSubMsg = {
          labelName: "A notification regarding new property application has been sent to property owner at registered Mobile No.",
          labelKey: "PT_UPDATE_PROPERTY_FAILURE_SUB_MSG"
        };

        Button1 = { name: "PT_GOHOME", buttonClick: this.onGoHomeClick, visibility: true };
        Button2 = { name: "PT_PROCEED_PAYMENT", buttonClick: this.onAssessPayClick, visibility: false };
        // downloadButton={menu:downloadMenu,visibility:false} ;
        // printButton={menu:printMenu,visibility:false} ;
      } else if (purpose === _formUtils.PROPERTY_FORM_PURPOSE.ASSESS && status === "success") {
        ptHeader = {
          // labelName: `Application for New Trade License (${financialYearText})`,
          labelName: "Property Assessment",
          labelKey: _formUtils.formWizardConstants[purpose].header,
          dynamicArray: [financialYear]
        };
        ptIDLabel = {
          labelName: "Poperty ID",
          labelKey: "PT_ASSESSMENT_NUMBER",
          visibility: true
        };
        statusIcon = {
          icon: "done",
          iconColor: "#39CB74"
        };
        ptMsg = {
          labelName: "Property Assessed Successfully",
          labelKey: "PT_PROPERTY_ASSESSMENT_SUCCESS_MSG"
        };
        ptSubMsg = {
          labelName: "A notification regarding property assessment has been sent to property owner at registered Mobile No.",
          labelKey: "PT_PROPERTY_ASSESSMENT_SUCCESS_SUB_MSG"
        };
        Button1 = { name: "PT_PROCEED_PAYMENT", buttonClick: this.onAssessPayClick, visibility: this.state.showPay };
        Button2 = { name: "PT_GOHOME", buttonClick: this.onGoHomeClick, visibility: true };
        // downloadButton={menu:downloadMenu,visibility:true} ;
        // printButton={menu:printMenu,visibility:true} ;
      } else if (purpose === _formUtils.PROPERTY_FORM_PURPOSE.ASSESS && status === "failure") {
        ptHeader = {
          // labelName: `Application for New Trade License (${financialYearText})`,
          labelName: "Property Assessment",
          labelKey: _formUtils.formWizardConstants[purpose].header,
          dynamicArray: [financialYear]
        };
        ptIDLabel = {
          labelName: "Poperty ID",
          labelKey: "PT_PROPERTY_ID",
          visibility: false
        };
        statusIcon = {
          icon: "close",
          iconColor: "#E54D42"
        };
        ptMsg = {
          labelName: "Property Assessment Failed",
          labelKey: "PT_PROPERTY_ASSESSMENT_Failure_MSG"
        };
        ptSubMsg = {
          labelName: "A notification regarding property assessment has been sent to property owner at registered Mobile No.",
          labelKey: "PT_PROPERTY_ASSESSMENT_FAILURE_SUB_MSG"
        };
        Button1 = { name: "PT_GOHOME", buttonClick: this.onGoHomeClick, visibility: true };
        Button2 = { name: "PT_PROCEED_PAYMENT", buttonClick: this.onAssessPayClick, visibility: false };
        // downloadButton={menu:downloadMenu,visibility:false} ;
        // printButton={menu:printMenu,visibility:false} ;
      } else if (purpose === _formUtils.PROPERTY_FORM_PURPOSE.REASSESS && status === "success") {
        ptHeader = {
          // labelName: `Application for New Trade License (${financialYearText})`,
          labelName: "Re-Assess Property",
          labelKey: _formUtils.formWizardConstants[purpose].header,
          dynamicArray: [financialYear]
        };
        ptIDLabel = {
          labelName: "Poperty ID",
          labelKey: "PT_ASSESSMENT_NUMBER",
          visibility: true
        };
        statusIcon = {
          icon: "done",
          iconColor: "#39CB74"
        };
        ptMsg = {
          labelName: "Assessment Updated Successfully",
          labelKey: "PT_PROPERTY_RE_ASSESSMENT_SUCCESS_MSG"
        };
        ptSubMsg = {
          labelName: "A notification regarding property assessment has been sent to property owner at registered Mobile No.",
          labelKey: "PT_PROPERTY_RE_ASSESSMENT_SUCCESS_SUB_MSG"
        };
        Button1 = { name: "PT_PROCEED_PAYMENT", buttonClick: this.onAssessPayClick, visibility: this.state.showPay };
        Button2 = { name: "PT_GOHOME", buttonClick: this.onGoHomeClick, visibility: true };
        // downloadButton={menu:downloadMenu,visibility:false} ;
        // printButton={menu:printMenu,visibility:false} ;
      } else if (purpose === _formUtils.PROPERTY_FORM_PURPOSE.REASSESS && status === "failure") {
        ptHeader = {
          // labelName: `Application for New Trade License (${financialYearText})`,
          labelName: "Re-Assess Property",
          labelKey: _formUtils.formWizardConstants[purpose].header,
          dynamicArray: [financialYear]
        };
        ptIDLabel = {
          labelName: "Poperty ID",
          labelKey: "PT_PROPERTY_ID",
          visibility: false
        };
        statusIcon = {
          icon: "close",
          iconColor: "#E54D42"
        };
        ptMsg = {
          labelName: "Property Assessment Failed",
          labelKey: "PT_PROPERTY_RE_ASSESSMENT_FAILED_MSG"
        };
        ptSubMsg = {
          labelName: "A notification regarding property reassessment has been sent to property owner at registered Mobile No.",
          labelKey: "PT_PROPERTY_RE_ASSESSMENT_FAILURE_SUB_MSG"
        };
        Button1 = { name: "PT_GOHOME", buttonClick: this.onGoHomeClick, visibility: true };
        Button2 = { name: "PT_PROCEED_PAYMENT", buttonClick: this.onAssessPayClick, visibility: false };
        // downloadButton={menu:downloadMenu,visibility:false} ;
        // printButton={menu:printMenu,visibility:false} ;
      }
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "mainContainer flex-container" },
          _react2.default.createElement(_PTHeader2.default, { header: ptHeader && ptHeader.labelKey, subHeaderTitle: "PT_PROPERTY_ID", subHeaderValue: propertyId }),
          _react2.default.createElement(
            "div",
            { className: "printDownloadButton flex-child" },
            downloadButton && downloadButton.visibility && _react2.default.createElement(_DownloadPrintButton2.default, {
              data: {
                label: {
                  labelName: "Download",
                  labelKey: "PT_DOWNLOAD"
                },
                leftIcon: "cloud_download",
                rightIcon: "arrow_drop_down",
                props: { variant: "outlined", style: { marginLeft: 10, color: "#FE7A51" } },
                menu: downloadButton.menu
              }
            }),
            printButton && printButton.visibility && _react2.default.createElement(_DownloadPrintButton2.default, {
              data: {
                label: {
                  llabelName: "Print",
                  labelKey: "PT_PRINT"
                },
                leftIcon: "print",
                rightIcon: "arrow_drop_down",
                props: { variant: "outlined", style: { marginLeft: 10, color: "#FE7A51" } },
                menu: printButton.menu
              }
            })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "ptCards" },
          _react2.default.createElement(_components.Card, {
            style: { backgroundColor: "white" },
            textChildren: _react2.default.createElement(
              "div",
              { className: "MuiCardContent-root-97" },
              _react2.default.createElement(
                "div",
                { className: "ack-header MuiGrid-container-98", id: "material-ui-applicationSuccessContainer" },
                _react2.default.createElement(
                  "div",
                  {
                    className: "MuiAvatar-root-195 MuiAvatar-colorDefault-196",
                    id: "material-ui-avatar",
                    style: { width: "72px", height: "72px", backgroundColor: statusIcon.iconColor }
                  },
                  _react2.default.createElement(
                    _FloatingActionButton2.default,
                    { className: "floating-button", style: { boxShadow: 0 }, backgroundColor: statusIcon.iconColor },
                    _react2.default.createElement(
                      "i",
                      { id: "custom-atoms-body", className: "material-icons", style: { fontSize: "50px" } },
                      statusIcon.icon
                    )
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "ack-body", id: "custom-atoms-body" },
                  _react2.default.createElement(
                    "h1",
                    { className: "MuiTypography-root-8 MuiTypography-headline-13", id: "material-ui-header" },
                    _react2.default.createElement(
                      "span",
                      { id: "custom-containers-key" },
                      " ",
                      _react2.default.createElement(_translationNode2.default, {
                        className: "ptMsg",
                        label: ptMsg.labelKey,
                        color: "rgba(0, 0, 0, 0.87)",
                        fontSize: "24px",
                        fontWeight: "400",
                        fontFamily: "Roboto",
                        lineHeight: "1.35417em"
                      })
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "ack-sub-body", id: "custom-atoms-paragraph" },
                    _react2.default.createElement(
                      "span",
                      null,
                      " ",
                      _react2.default.createElement(_translationNode2.default, { label: ptSubMsg.labelKey, color: "rgba(0, 0, 0, 0.6)", fontFamily: "Roboto" })
                    )
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "ack-text", id: "custom-atoms-tail" },
                  _react2.default.createElement(
                    "h1",
                    {
                      className: "MuiTypography-root-8 MuiTypography-headline-13",
                      id: "material-ui-text",
                      style: { fontSize: "16px", fontWeight: "400", color: "rgba(0, 0, 0, 0.6)" }
                    },
                    ptIDLabel.visibility && _react2.default.createElement(
                      "span",
                      null,
                      _react2.default.createElement(_translationNode2.default, { label: ptIDLabel.labelKey, fontSize: "16px", fontWeight: "400", color: "rgba(0, 0, 0, 0.6)" })
                    )
                  ),
                  _react2.default.createElement(
                    "h1",
                    {
                      className: "MuiTypography-root-8 MuiTypography-headline-13",
                      id: "material-ui-paragraph",
                      style: { fontSize: "24px", fontWeight: "500" }
                    },
                    ptIDLabel.visibility && _react2.default.createElement(
                      "span",
                      null,
                      _react2.default.createElement(_translationNode2.default, { label: secondNumber, fontSize: "24px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "500" })
                    )
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { id: "tax-wizard-buttons", className: "wizard-footer col-sm-12", style: { textAlign: "right" } },
                  _react2.default.createElement(
                    "div",
                    {
                      className: "button-container col-xs-12 col-md-4 col-lg-2 property-info-access-btn first-button",
                      style: { float: "right", right: "20px", width: "auto" }
                    },
                    Button1 && Button1.visibility && _react2.default.createElement(_components.Button, {
                      onClick: Button1.buttonClick,
                      label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: Button1.name, fontSize: "16px" }),
                      primary: true,
                      style: { lineHeight: "auto", minWidth: "inherit", width: "200px" }
                    })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "button-container col-xs-12 col-md-4 col-lg-2 property-info-access-btn", style: { float: "right", right: "30px" } },
                    Button2 && Button2.visibility && _react2.default.createElement(_components.Button, {
                      onClick: Button2.buttonClick,
                      label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: Button2.name, fontSize: "16px" }),
                      primary: true,
                      style: { lineHeight: "auto", minWidth: "inherit", width: "200px", backgroundColor: "white" }
                    })
                  )
                )
              )
            )
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "print-application-conainer", style: { position: "fixed", opacity: 0, zIndex: -9999, height: "100%" } },
          properties && _react2.default.createElement(_PTInformation2.default, {
            properties: properties,
            generalMDMSDataById: generalMDMSDataById,
            documentsUploaded: this.props.documentsUploaded,
            totalBillAmountDue: this.props.totalBillAmountDue
          })
        )
      );
    }
  }]);
  return PTAcknowledgement;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var location = ownProps.location;
  var search = location.search;

  var propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");

  var _ref3 = state || {},
      screenConfiguration = _ref3.screenConfiguration,
      common = _ref3.common,
      app = _ref3.app,
      properties = _ref3.properties;

  var propertiesById = properties.propertiesById,
      _properties$totalBill = properties.totalBillAmountDue,
      totalBillAmountDue = _properties$totalBill === undefined ? 0 : _properties$totalBill,
      _properties$Assessmen = properties.Assessments,
      Assessments = _properties$Assessmen === undefined ? [] : _properties$Assessmen;

  if (Assessments.length == 0) {
    totalBillAmountDue = 0;
  }
  var selPropertyDetails = propertiesById[propertyId] || {};

  var _ref4 = selPropertyDetails || [],
      documentsUploaded = _ref4.documentsUploaded;

  var generalMDMSDataById = common.generalMDMSDataById;

  var purpose = (0, _commons.getQueryArg)(window.location.href, "purpose");
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var _preparedFinalObject$ = preparedFinalObject.UlbLogoForPdf,
      UlbLogoForPdf = _preparedFinalObject$ === undefined ? '' : _preparedFinalObject$;

  return {
    propertiesById: propertiesById,
    selPropertyDetails: selPropertyDetails,
    common: common,
    app: app,
    generalMDMSDataById: generalMDMSDataById,
    documentsUploaded: documentsUploaded,
    totalBillAmountDue: totalBillAmountDue
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions3.toggleSnackbarAndSetText)(open, message, error));
    },
    fetchProperties: function fetchProperties(queryObjectProperty) {
      return dispatch((0, _actions2.fetchProperties)(queryObjectProperty));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PTAcknowledgement);