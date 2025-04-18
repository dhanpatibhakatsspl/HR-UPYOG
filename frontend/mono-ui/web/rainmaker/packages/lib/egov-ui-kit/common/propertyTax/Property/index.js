"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Screen = require("egov-ui-kit/common/common/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _TransformedAssessments = require("egov-ui-kit/common/propertyTax/TransformedAssessments");

var _components2 = require("egov-ui-kit/components");

var _actions = require("egov-ui-kit/redux/app/actions");

var _utils = require("egov-ui-kit/redux/app/utils");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _actions3 = require("egov-ui-kit/redux/properties/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _generatePTAcknowledgment = require("egov-ui-kit/utils/pdfUtils/generatePTAcknowledgment");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _PTHeader = require("../../common/PTHeader");

var _PTHeader2 = _interopRequireDefault(_PTHeader);

var _AssessmentList = require("../AssessmentList");

var _AssessmentList2 = _interopRequireDefault(_AssessmentList);

var _YearDialogue = require("../YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

var _PropertyInformation = require("./components/PropertyInformation");

var _PropertyInformation2 = _interopRequireDefault(_PropertyInformation);

require("./index.css");

var _commons2 = require("egov-ui-framework/ui-utils/commons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var innerDivStyle = {
  padding: "0",
  // borderBottom: "1px solid #e0e0e0",
  marginLeft: 0
};

var IconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit"
};

var listItemStyle = {
  padding: "0px 20px",
  borderWidth: "10px 10px 0px"
};

var appName = process.env.REACT_APP_NAME;

var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
var localizationLabelsData = (0, _utils.initLocalizationLabels)(locale);

var Property = function (_Component) {
  (0, _inherits3.default)(Property, _Component);

  function Property(props) {
    (0, _classCallCheck3.default)(this, Property);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      billFetched: false,
      pathName: null,
      dialogueOpen: false,
      urlToAppend: "",
      showAssessmentHistory: false
    };
    return _this;
  }

  (0, _createClass3.default)(Property, [{
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
      var _this2 = this;

      var _props3 = this.props,
          urls = _props3.urls,
          location = _props3.location,
          history = _props3.history,
          generalMDMSDataById = _props3.generalMDMSDataById,
          latestPropertyDetails = _props3.latestPropertyDetails,
          propertyId = _props3.propertyId,
          selPropertyDetails = _props3.selPropertyDetails,
          receiptsByYr = _props3.receiptsByYr,
          totalBillAmountDue = _props3.totalBillAmountDue,
          documentsUploaded = _props3.documentsUploaded,
          loading = _props3.loading;
      var closeYearRangeDialogue = this.closeYearRangeDialogue;
      var _state = this.state,
          dialogueOpen = _state.dialogueOpen,
          urlToAppend = _state.urlToAppend,
          showAssessmentHistory = _state.showAssessmentHistory;

      var urlArray = [];
      var assessmentHistory = [];
      var pathname = location.pathname;

      if (urls.length === 0 && (0, _localStorageUtils.localStorageGet)("path") === pathname) {
        urlArray = JSON.parse((0, _localStorageUtils.localStorageGet)("breadCrumbObject"));
      }
      var clsName = appName === "Citizen" ? "screen-with-bredcrumb" : "";
      if (receiptsByYr) {
        assessmentHistory = this.getAssessmentHistory(selPropertyDetails, receiptsByYr.receiptDetailsArray);
      }
      return _react2.default.createElement(
        _Screen2.default,
        { className: clsName, loading: loading },
        _react2.default.createElement(_PTHeader2.default, { header: "PT_PROPERTY_INFORMATION", subHeaderTitle: "PT_PROPERTY_PTUID", subHeaderValue: propertyId, downloadPrintButton: true, download: function download() {
            return _this2.download();
          }, print: function print() {
            return _this2.print();
          } }),
        _react2.default.createElement(_AssessmentList2.default, {
          onItemClick: this.onListItemClick,
          items: this.getAssessmentListItems(this.props, showAssessmentHistory, assessmentHistory),
          innerDivStyle: innerDivStyle,
          listItemStyle: listItemStyle,
          history: history,
          hoverColor: "#fff",
          properties: selPropertyDetails,
          generalMDMSDataById: generalMDMSDataById && generalMDMSDataById,
          totalBillAmountDue: totalBillAmountDue,
          documentsUploaded: documentsUploaded,
          toggleSnackbarAndSetText: this.props.toggleSnackbarAndSetText
        }),
        _react2.default.createElement(
          "div",
          { id: "tax-wizard-buttons", className: "wizard-footer col-sm-12", style: { textAlign: "right" } },
          _react2.default.createElement(
            "div",
            { className: "button-container col-xs-4 property-info-access-btn", style: { float: "right" } },
            _react2.default.createElement(_components.Button, {
              label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true,
                label: _formUtils.formWizardConstants[_formUtils.PROPERTY_FORM_PURPOSE.UPDATE].parentButton, fontSize: "16px",
                color: "#fe7a51" }),
              onClick: function onClick() {
                return _this2.onEditPropertyClick();
              },
              labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
              buttonStyle: { border: "1px solid #fe7a51" },
              style: { lineHeight: "auto", minWidth: "45%", marginRight: "10%" }
            }),
            _react2.default.createElement(_components.Button, {
              onClick: function onClick() {
                return _this2.onAssessPayClick();
              },
              label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: _formUtils.formWizardConstants[_formUtils.PROPERTY_FORM_PURPOSE.ASSESS].parentButton, fontSize: "16px" }),
              primary: true,
              style: { lineHeight: "auto", minWidth: "45%" }
            })
          )
        ),
        dialogueOpen && _react2.default.createElement(_YearDialogue2.default, { open: dialogueOpen, history: history, urlToAppend: urlToAppend, closeDialogue: closeYearRangeDialogue })
      );
    }
  }]);
  return Property;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.componentDidMount = function () {
    var _props4 = _this3.props,
        location = _props4.location,
        addBreadCrumbs = _props4.addBreadCrumbs,
        fetchGeneralMDMSData = _props4.fetchGeneralMDMSData,
        renderCustomTitleForPt = _props4.renderCustomTitleForPt,
        customTitle = _props4.customTitle,
        fetchProperties = _props4.fetchProperties,
        fetchReceipt = _props4.fetchReceipt,
        fetchAssessments = _props4.fetchAssessments;

    var requestBody = (0, _commons.generalMDMSDataRequestObj)(_common2.default.tenantId);
    fetchGeneralMDMSData(requestBody, "PropertyTax", (0, _commons.getGeneralMDMSDataDropdownName)());

    fetchProperties([{ key: "propertyIds", value: decodeURIComponent(_this3.props.match.params.propertyId) }, { key: "tenantId", value: _this3.props.match.params.tenantId }]);
    var pathname = location.pathname;

    if (appName === "Citizen" && !((0, _localStorageUtils.localStorageGet)("path") === pathname)) {
      customTitle && addBreadCrumbs({ title: customTitle, path: window.location.pathname });
    }
    renderCustomTitleForPt(customTitle);

    fetchAssessments([{ key: "propertyIds", value: decodeURIComponent(_this3.props.match.params.propertyId) }, { key: "tenantId", value: _this3.props.match.params.tenantId }]);

    fetchReceipt([{ key: "consumerCodes", value: decodeURIComponent(_this3.props.match.params.propertyId) }, { key: "tenantId", value: _this3.props.match.params.tenantId }, { key: "businessService", value: 'PT' }]);

    (0, _generatePDF.loadUlbLogo)(_this3.props.match.params.tenantId);
  };

  this.onListItemClick = function (item, index) {
    var getSingleAssesmentandStatus = _this3.props.getSingleAssesmentandStatus;
    var route = item.route;
    var showAssessmentHistory = _this3.state.showAssessmentHistory;

    if (index === 0 && item.initiallyOpen) {
      _this3.setState({
        showAssessmentHistory: !showAssessmentHistory
      });
    }

    route && getSingleAssesmentandStatus(route);
  };

  this.onAssessPayClick = function () {
    var _props5 = _this3.props,
        latestPropertyDetails = _props5.latestPropertyDetails,
        propertyId = _props5.propertyId,
        tenantId = _props5.tenantId,
        selPropertyDetails = _props5.selPropertyDetails;

    var assessmentNo = latestPropertyDetails && latestPropertyDetails.assessmentNumber;
    if (selPropertyDetails.status != "ACTIVE") {
      _this3.props.toggleSnackbarAndSetText(true, { labelName: "Property in Workflow", labelKey: "ERROR_PROPERTY_IN_WORKFLOW" }, "error");
    } else {

      _this3.setState({
        dialogueOpen: true,
        urlToAppend: (0, _formUtils.getPropertyLink)(propertyId, tenantId, _formUtils.PROPERTY_FORM_PURPOSE.ASSESS, -1, assessmentNo)
      });
    }
  };

  this.onEditPropertyClick = function () {
    var _props6 = _this3.props,
        latestPropertyDetails = _props6.latestPropertyDetails,
        propertyId = _props6.propertyId,
        tenantId = _props6.tenantId,
        selPropertyDetails = _props6.selPropertyDetails;

    var assessmentNo = latestPropertyDetails && latestPropertyDetails.assessmentNumber;
    if (selPropertyDetails.status != "ACTIVE") {
      _this3.props.toggleSnackbarAndSetText(true, { labelName: "Property in Workflow", labelKey: "ERROR_PROPERTY_IN_WORKFLOW" }, "error");
    } else {
      _this3.props.history.push((0, _formUtils.getPropertyLink)(propertyId, tenantId, _formUtils.PROPERTY_FORM_PURPOSE.UPDATE, -1, assessmentNo));
      // this.setState({
      //   dialogueOpen: true,
      //   urlToAppend: getPropertyLink(propertyId, tenantId, "assess", -1, assessmentNo),
      // });
    }
  };

  this.getAssessmentHistory = function (selPropertyDetails) {
    var receiptsByYr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var assessmentList = [];
    var _selPropertyDetails$p = selPropertyDetails.propertyDetails,
        propertyDetails = _selPropertyDetails$p === undefined ? [] : _selPropertyDetails$p;

    propertyDetails.map(function (propertyDetail) {
      var bool = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = receiptsByYr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var receipts = _step.value;

          if (propertyDetail.financialYear == receipts[0].financialYear) {
            var _receiptInfo = {};
            var receiptTotalAmount = 0;
            var paidAmount = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = receipts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var receipt = _step2.value;

                receiptTotalAmount = receipt.totalAmount < receiptTotalAmount ? receiptTotalAmount : receipt.totalAmount;
                paidAmount += receipt.amountPaid;
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

            if (receiptTotalAmount > paidAmount) {
              _receiptInfo["status"] = "Pending";
              if (paidAmount > 0) {
                _receiptInfo["status"] = "Partially Paid";
              }
            } else {
              _receiptInfo["status"] = "Paid";
            }
            _receiptInfo = (0, _extends3.default)({}, _receiptInfo, receipts[0], {
              totalAmount: paidAmount
            });
            if (propertyDetail.assessmentDate < _receiptInfo.receiptDate) {
              var _assessment = (0, _extends3.default)({}, propertyDetail, {
                receiptInfo: _receiptInfo
              });
              assessmentList.push(_assessment);
            } else {
              var _assessment2 = (0, _extends3.default)({}, propertyDetail, {
                receiptInfo: _receiptInfo
              });
              var assessment1 = (0, _extends3.default)({}, propertyDetail, {
                receiptInfo: (0, _extends3.default)({}, _receiptInfo, {
                  status: "Pending"
                })
              });
              assessmentList.push(_assessment2);
              assessmentList.push(assessment1);
            }
            bool = false;
          }
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

      if (bool) {
        var receiptInfo = {};
        receiptInfo["status"] = "Pending";
        var assessment = (0, _extends3.default)({}, propertyDetail, {
          receiptInfo: receiptInfo
        });
        assessmentList.push(assessment);
      }
    });
    return assessmentList;
  };

  this.getAssessmentListItems = function (props, showAssessmentHistory, assessmentHistory) {
    var propertyItems = props.propertyItems,
        propertyId = props.propertyId,
        history = props.history,
        sortedAssessments = props.sortedAssessments,
        selPropertyDetails = props.selPropertyDetails,
        tenantId = props.tenantId,
        localization = props.localization;
    var cities = localization.cities,
        localizationLabels = localization.localizationLabels;

    var assessments = (0, _orderBy2.default)((0, _TransformedAssessments.getCompletedTransformedItems)(assessmentHistory, cities, localizationLabels, propertyId, selPropertyDetails), ["epocDate"], ["desc"]);
    return [{
      primaryText: _react2.default.createElement(_PropertyInformation2.default, {
        items: propertyItems,
        propertyTaxAssessmentID: propertyId,
        history: history,
        tenantId: tenantId,
        onButtonClick: _this3.onAssessPayClick
      }),
      initiallyOpen: true
    }, {
      primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_PROPERTY_ASSESSMENT_HISTORY", labelClassName: "property-info-title" }),
      route: selPropertyDetails,
      nestedItems: showAssessmentHistory && assessments && assessments,
      rightIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_components2.Icon, { action: "hardware", name: "keyboard-arrow-down", color: "#484848" })
      ),
      initiallyOpen: true
    }];
  };

  this.componentDidUpdate = function (prevProps) {
    // Typical usage (don't forget to compare props):
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }


    var propertyId = decodeURIComponent(_this3.props.match.params.propertyId);
    var _props7 = _this3.props,
        totalBillAmountDue = _props7.totalBillAmountDue,
        Assessments = _props7.Assessments;

    if (Assessments && Assessments.length > 0 && Assessments[0].propertyId == propertyId && !_this3.state.billFetched) {
      _this3.setState({ billFetched: true });
      _this3.props.fetchTotalBillAmount([{ key: "consumerCode", value: propertyId }, { key: "tenantId", value: _this3.props.match.params.tenantId }, { key: "businessService", value: 'PT' }]);
    }
  };

  this.componentWillReceiveProps = function (nextProps) {
    var _props8 = _this3.props,
        customTitle = _props8.customTitle,
        renderCustomTitleForPt = _props8.renderCustomTitleForPt;

    if (!(0, _isEqual2.default)(customTitle, nextProps.customTitle)) {
      renderCustomTitleForPt(nextProps.customTitle);
    }
  };

  this.closeYearRangeDialogue = function () {
    _this3.setState({ dialogueOpen: false });
  };
};

var getPendingAssessments = function getPendingAssessments(selPropertyDetails) {
  var singleAssessmentByStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var pendingAssessments = [];
  // let propertiesArray = selPropertyDetails.propertyDetails || [];
  // let yearlyAssessments = [];
  // yearlyAssessments = getYearlyAssessments(propertiesArray);
  // let paidAssessments = [];
  // paidAssessments = getYearlyAssessments(singleAssessmentByStatus);
  // for (let eachYrAssessments of yearlyAssessments) {
  //   let bol = true;
  //   for (let paidAssessment of paidAssessments) {
  //     if (eachYrAssessments[0].financialYear === paidAssessment[0].financialYear) {
  //       bol = false;
  //       pendingAssessments.push(paidAssessment[0]);
  //       if (eachYrAssessments[0].assessmentNumber !== paidAssessment[0].assessmentNumber) {
  //         pendingAssessments.push(eachYrAssessments[0]);
  //       }
  //     }
  //   }
  //   if (bol) {
  //     pendingAssessments.push(eachYrAssessments[0]);
  //   }
  // }
  return pendingAssessments;
};

var getAddressInfo = function getAddressInfo(addressObj, extraItems) {
  return addressObj && [{
    heading: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_SUB_HEADER", localizationLabelsData),
    // iconAction: "action",
    iconName: "home",
    items: [{
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_CITY", localizationLabelsData),
      value: addressObj.city || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_HOUSE_NO", localizationLabelsData),
      value: addressObj.doorNo || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_COLONY_NAME", localizationLabelsData),
      value: addressObj.buildingName || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_STREET_NAME", localizationLabelsData),
      value: addressObj.street || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_MOHALLA", localizationLabelsData),
      value: addressObj.locality.name || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_PINCODE", localizationLabelsData),
      value: addressObj.pincode || "NA"
    }].concat((0, _toConsumableArray3.default)(extraItems))
  }];
};

var transform = function transform(floor, key, generalMDMSDataById, propertyDetails) {
  var propertySubType = propertyDetails.propertySubType,
      usageCategoryMajor = propertyDetails.usageCategoryMajor;
  var masterName = key.masterName,
      dataKey = key.dataKey;

  if (!masterName) {
    return floor["occupancyType"] === "RENTED" ? "INR " + floor["arv"] : Math.round(floor[dataKey] * 100) / 100 + " sq yards";
  } else {
    if (floor[dataKey]) {
      if (dataKey === "usageCategoryDetail") {
        return generalMDMSDataById["UsageCategoryDetail"] ? generalMDMSDataById["UsageCategoryDetail"][floor[dataKey]].name : generalMDMSDataById["UsageCategorySubMinor"] ? generalMDMSDataById["UsageCategorySubMinor"][floor["usageCategorySubMinor"]].name : "NA";
      }
      // if (usageCategoryMajor === "RESIDENTIAL" && propertySubType === "SHAREDPROPERTY" && dataKey === "floorNo") {
      //   return "NA";
      // }
      if (floor[dataKey] === "NONRESIDENTIAL") {
        return generalMDMSDataById["UsageCategoryMinor"] && generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]] && generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name ? generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name : "NA";
      } else {
        return generalMDMSDataById[masterName] ? generalMDMSDataById[masterName][floor[dataKey]].name : "NA";
      }
    } else {
      return "NA";
    }
  }
};

var getAssessmentInfo = function getAssessmentInfo(propertyDetails, keys, generalMDMSDataById) {
  var _ref = propertyDetails || {},
      units = _ref.units;

  return propertyDetails && [{
    heading: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_SUB_HEADER", localizationLabelsData),
    iconAction: "action",
    iconName: "assignment",
    showTable: true,
    tableHeaderItems: [{
      key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_USAGE_TYPE", localizationLabelsData),
      value: propertyDetails.usageCategoryMajor ? propertyDetails.usageCategoryMajor : "NA" //noOfFloors
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_TYPE_OF_BUILDING", localizationLabelsData),
      value: generalMDMSDataById ? propertyDetails.propertySubType ? generalMDMSDataById["PropertySubType"] && generalMDMSDataById["PropertySubType"][propertyDetails.propertySubType] ? (0, _commons2.getLocaleLabels)("PROPERTYTAX_BILLING_SLAB_" + (0, _get2.default)(generalMDMSDataById, "PropertySubType." + propertyDetails.propertySubType + ".code", "NA"), "PROPERTYTAX_BILLING_SLAB_" + (0, _get2.default)(generalMDMSDataById, "PropertySubType." + propertyDetails.propertySubType + ".code", "NA")) : 'NA' : generalMDMSDataById["PropertyType"] && generalMDMSDataById["PropertyType"][propertyDetails.propertyType] ? (0, _commons2.getLocaleLabels)("PROPERTYTAX_BILLING_SLAB_" + (0, _get2.default)(generalMDMSDataById, "PropertyType." + propertyDetails.propertyType + ".code", "NA"), "PROPERTYTAX_BILLING_SLAB_" + (0, _get2.default)(generalMDMSDataById, "PropertyType." + propertyDetails.propertyType + ".code", "NA")) : "NA" : "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_PLOT_SIZE", localizationLabelsData),
      value: propertyDetails.propertySubType === "SHAREDPROPERTY" ? "NA" : propertyDetails.uom ? propertyDetails.landArea + " " + propertyDetails.uom : Math.round(propertyDetails.landArea * 100) / 100 + " sq yards"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_NO_OF_FLOOR", localizationLabelsData),
      value: propertyDetails.noOfFloors ? "" + propertyDetails.noOfFloors : "NA" //noOfFloors
    }],
    items: {
      header: units ? [(0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_FLOOR", localizationLabelsData), (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_USAGE_TYPE", localizationLabelsData),
      // getTranslatedLabel("PT_ASSESMENT_INFO_SUB_USAGE_TYPE", localizationLabelsData),
      (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_OCCUPLANCY", localizationLabelsData), (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_AREA_RENT", localizationLabelsData)] : [],
      values: units ? units.map(function (floor) {
        return {
          value: keys.map(function (key) {
            return transform(floor, key, generalMDMSDataById, propertyDetails);
          })
        };
      }) : []
    }
  }];
};

var getOwnerInfo = function getOwnerInfo(latestPropertyDetails, generalMDMSDataById) {
  var isInstitution = latestPropertyDetails.ownershipCategory === "INSTITUTIONALPRIVATE" || latestPropertyDetails.ownershipCategory === "INSTITUTIONALGOVERNMENT";

  var _ref2 = latestPropertyDetails || {},
      institution = _ref2.institution,
      ownerDetails = _ref2.owners;

  return ownerDetails && [{
    heading: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_SUB_HEADER", localizationLabelsData),
    iconAction: "social",
    iconName: "person",
    nestedItems: true,
    items: ownerDetails.map(function (owner) {
      return {
        items: [isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME_INSTI", localizationLabelsData),
          value: institution && institution.name || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME", localizationLabelsData),
          value: owner.name || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_DESIGNATION", localizationLabelsData),
          value: institution.designation || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_SEARCHPROPERTY_TABEL_GUARDIANNAME", localizationLabelsData),
          value: owner.fatherOrHusbandName || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_TYPE_INSTI", localizationLabelsData),
          value: institution && institution.type && generalMDMSDataById && generalMDMSDataById["SubOwnerShipCategory"] && (0, _commons2.getLocaleLabels)(generalMDMSDataById["SubOwnerShipCategory"][institution.type].name, generalMDMSDataById["SubOwnerShipCategory"][institution.type].name) || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_GENDER", localizationLabelsData),
          value: owner.gender || "NA"
        }, isInstitution ? {
          // key: getTranslatedLabel("PT_OWNERSHIP_INFO_TYPE_INSTI", localizationLabelsData),
          // value:
          //   (institution &&
          //     institution.type &&
          //     generalMDMSDataById &&
          //     generalMDMSDataById["SubOwnerShipCategory"] &&
          //     generalMDMSDataById["SubOwnerShipCategory"][institution.type].name) ||
          //   "NA",
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_DOB", localizationLabelsData),
          value: owner.dob || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME_OF_AUTH", localizationLabelsData),
          value: owner.name || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
          value: owner.mobileNumber || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_TEL_NO", localizationLabelsData),
          value: owner.altContactNumber || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_EMAIL_ID", localizationLabelsData),
          value: owner.emailId || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
          value: owner.mobileNumber || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_USER_CATEGORY", localizationLabelsData),
          value: owner && owner.ownerType && generalMDMSDataById && generalMDMSDataById["OwnerType"] && generalMDMSDataById["OwnerType"][owner.ownerType].name || "NA"
        }, {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_CORR_ADDR", localizationLabelsData),
          value: owner.permanentAddress || "NA"
        }]
      };
    })
  }];
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var app = state.app,
      common = state.common,
      screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var _preparedFinalObject$ = preparedFinalObject.UlbLogoForPdf,
      UlbLogoForPdf = _preparedFinalObject$ === undefined ? '' : _preparedFinalObject$;
  var urls = app.urls,
      localizationLabels = app.localizationLabels;
  var cities = common.cities;

  var _ref3 = state.common || {},
      generalMDMSDataById = _ref3.generalMDMSDataById;

  var _ref4 = state.properties || {},
      propertiesById = _ref4.propertiesById,
      _ref4$singleAssessmen = _ref4.singleAssessmentByStatus,
      singleAssessmentByStatus = _ref4$singleAssessmen === undefined ? [] : _ref4$singleAssessmen,
      loading = _ref4.loading,
      receiptsByYr = _ref4.receiptsByYr,
      _ref4$totalBillAmount = _ref4.totalBillAmountDue,
      totalBillAmountDue = _ref4$totalBillAmount === undefined ? 0 : _ref4$totalBillAmount,
      _ref4$Assessments = _ref4.Assessments,
      Assessments = _ref4$Assessments === undefined ? [] : _ref4$Assessments;

  var tenantId = ownProps.match.params.tenantId;
  var propertyId = decodeURIComponent(ownProps.match.params.propertyId);
  var selPropertyDetails = propertiesById[propertyId] || {};
  loading = loading == false && Object.keys(selPropertyDetails).length > 0 ? false : true;

  var _ref5 = selPropertyDetails || [],
      documentsUploaded = _ref5.documentsUploaded;

  var latestPropertyDetails = (0, _PTCommon.getLatestPropertyDetails)(selPropertyDetails.propertyDetails);
  var pendingAssessments = getPendingAssessments(selPropertyDetails, singleAssessmentByStatus);
  var localization = {
    localizationLabels: localizationLabels,
    cities: cities
  };
  var addressInfo = getAddressInfo(selPropertyDetails.address, [{ key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_PROPERTY_ID", localizationLabels), value: selPropertyDetails.propertyId }]) || [];
  var assessmentInfoKeys = [{ masterName: "Floor", dataKey: "floorNo" }, { masterName: "UsageCategoryMajor", dataKey: "usageCategoryMajor" },
  // { masterName: "UsageCategoryDetail", dataKey: "usageCategoryDetail" },
  { masterName: "OccupancyType", dataKey: "occupancyType" }, { masterName: "", dataKey: "unitArea" }];
  var assessmentInfo = generalMDMSDataById ? latestPropertyDetails ? getAssessmentInfo(latestPropertyDetails, assessmentInfoKeys, generalMDMSDataById) : [] : [];
  var ownerInfo = latestPropertyDetails && getOwnerInfo(latestPropertyDetails, generalMDMSDataById) || [];
  var propertyItems = [].concat((0, _toConsumableArray3.default)(addressInfo), (0, _toConsumableArray3.default)(assessmentInfo), (0, _toConsumableArray3.default)(ownerInfo));
  var customTitle = selPropertyDetails && selPropertyDetails.address && (0, _commons.getCommaSeperatedAddress)(selPropertyDetails.address, cities);
  var completedAssessments = (0, _TransformedAssessments.getCompletedTransformedItems)(pendingAssessments, cities, localizationLabels, propertyId);
  // const completedAssessments = getCompletedTransformedItems(singleAssessmentByStatus, cities, localizationLabels);
  var sortedAssessments = completedAssessments && (0, _orderBy2.default)(completedAssessments, ["epocDate"], ["desc"]);
  if (Assessments.length == 0) {
    totalBillAmountDue = 0;
  }
  return {
    urls: urls,
    propertyItems: propertyItems,
    propertyId: propertyId,
    tenantId: tenantId,
    customTitle: customTitle,
    latestPropertyDetails: latestPropertyDetails,
    selPropertyDetails: selPropertyDetails,
    sortedAssessments: sortedAssessments,
    generalMDMSDataById: generalMDMSDataById,
    receiptsByYr: receiptsByYr,
    localization: localization,
    totalBillAmountDue: totalBillAmountDue,
    documentsUploaded: documentsUploaded,
    Assessments: Assessments,
    loading: loading,
    UlbLogoForPdf: UlbLogoForPdf
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    },
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName) {
      return dispatch((0, _actions2.fetchGeneralMDMSData)(requestBody, moduleName, masterName));
    },
    fetchProperties: function fetchProperties(queryObjectProperty) {
      return dispatch((0, _actions3.fetchProperties)(queryObjectProperty));
    },
    getSingleAssesmentandStatus: function getSingleAssesmentandStatus(queryObj) {
      return dispatch((0, _actions3.getSingleAssesmentandStatus)(queryObj));
    },
    fetchTotalBillAmount: function fetchTotalBillAmount(fetchBillQueryObject) {
      return dispatch((0, _actions3.fetchTotalBillAmount)(fetchBillQueryObject));
    },
    fetchReceipt: function fetchReceipt(fetchReceiptQueryObject) {
      return dispatch((0, _actions3.fetchReceipt)(fetchReceiptQueryObject));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions.toggleSnackbarAndSetText)(open, message, error));
    },
    fetchAssessments: function fetchAssessments(fetchAssessmentsQueryObject) {
      return dispatch((0, _actions3.fetchAssessments)(fetchAssessmentsQueryObject));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Property);