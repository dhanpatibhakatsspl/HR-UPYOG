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

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _Screen = require("egov-ui-kit/common/common/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _utils = require("egov-ui-kit/redux/app/utils");

var _actions3 = require("egov-ui-kit/redux/common/actions");

var _actions4 = require("egov-ui-kit/redux/properties/actions");

var _api = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _WorkFlowContainer = require("egov-workflow/ui-containers-local/WorkFlowContainer");

var _WorkFlowContainer2 = _interopRequireDefault(_WorkFlowContainer);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _PTHeader = require("../../common/PTHeader");

var _PTHeader2 = _interopRequireDefault(_PTHeader);

var _AssessmentInfo = require("../Property/components/AssessmentInfo");

var _AssessmentInfo2 = _interopRequireDefault(_AssessmentInfo);

var _DocumentsInfo = require("../Property/components/DocumentsInfo");

var _DocumentsInfo2 = _interopRequireDefault(_DocumentsInfo);

var _OwnerInfo = require("../Property/components/OwnerInfo");

var _OwnerInfo2 = _interopRequireDefault(_OwnerInfo);

var _PdfHeader = require("../Property/components/PdfHeader");

var _PdfHeader2 = _interopRequireDefault(_PdfHeader);

var _PropertyAddressInfo = require("../Property/components/PropertyAddressInfo");

var _PropertyAddressInfo2 = _interopRequireDefault(_PropertyAddressInfo);

require("./index.css");

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

var ApplicationPreview = function (_Component) {
  (0, _inherits3.default)(ApplicationPreview, _Component);

  function ApplicationPreview(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ApplicationPreview);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ApplicationPreview.__proto__ || Object.getPrototypeOf(ApplicationPreview)).call(this, props));

    _this.componentDidMount = function () {
      _this.setPropertyId();
      var _this$props = _this.props,
          location = _this$props.location,
          fetchGeneralMDMSData = _this$props.fetchGeneralMDMSData,
          fetchProperties = _this$props.fetchProperties,
          fetchLocalizationLabel = _this$props.fetchLocalizationLabel;

      var tenantId = (0, _PTCommon.getQueryValue)(window.location.href, "tenantId");
      fetchLocalizationLabel(locale, tenantId, tenantId);
      var requestBody = {
        MdmsCriteria: {
          tenantId: _common2.default.tenantId,
          moduleDetails: [{
            moduleName: "PropertyTax",
            masterDetails: [{
              name: "Floor"
            }, {
              name: "UsageCategoryMajor"
            }, {
              name: "UsageCategoryMinor"
            }, {
              name: "UsageCategorySubMinor"
            }, {
              name: "OccupancyType"
            }, {
              name: "PropertyType"
            }, {
              name: "PropertySubType"
            }, {
              name: "OwnerType"
            }, {
              name: "UsageCategoryDetail"
            }, {
              name: "SubOwnerShipCategory"
            }]
          }]
        }
      };
      fetchGeneralMDMSData(requestBody, "PropertyTax", ["Floor", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor", "OccupancyType", "PropertyType", "PropertySubType", "OwnerType", "UsageCategoryDetail", "SubOwnerShipCategory"]);

      var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: _this.getApplicationType().moduleName }];
      _this.setBusinessServiceDataToLocalStorage(queryObject);

      _this.fetchApplication();
    };

    _this.setBusinessServiceDataToLocalStorage = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject) {
        var toggleSnackbarAndSetText, payload;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                toggleSnackbarAndSetText = _this.props.toggleSnackbarAndSetText;
                _context.prev = 1;
                _context.next = 4;
                return (0, _api.httpRequest)("egov-workflow-v2/egov-wf/businessservice/_search", "_search", queryObject);

              case 4:
                payload = _context.sent;

                (0, _localStorageUtils.localStorageSet)("businessServiceData", JSON.stringify((0, _get2.default)(payload, "BusinessServices")));
                return _context.abrupt("return", (0, _get2.default)(payload, "BusinessServices"));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);

                toggleSnackbarAndSetText(true, {
                  labelName: "Not authorized to access Business Service!",
                  labelKey: "ERR_NOT_AUTHORISED_BUSINESS_SERVICE"
                }, "error");

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[1, 9]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.fetchApplication = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var applicationType, payload, responseObject, workflow;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              applicationType = _this.getApplicationType();
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _api.httpRequest)(applicationType.endpoint.GET.URL, applicationType.endpoint.GET.ACTION, applicationType.queryParams);

            case 4:
              payload = _context2.sent;
              responseObject = payload[applicationType.responsePath] && payload[applicationType.responsePath].length > 0 && payload[applicationType.responsePath][0];

              if (!responseObject.workflow) {
                workflow = {
                  "id": null,
                  "tenantId": (0, _commons.getQueryArg)(window.location.href, "tenantId"),
                  "businessService": applicationType.moduleName,
                  "businessId": (0, _commons.getQueryArg)(window.location.href, "applicationNumber"),
                  "action": "",
                  "moduleName": "PT",
                  "state": null,
                  "comment": null,
                  "documents": null,
                  "assignes": null
                };

                responseObject.workflow = workflow;
              }
              _this.props.prepareFinalObject(applicationType.dataPath, payload[applicationType.responsePath] && responseObject);
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);

              console.log(_context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[1, 10]]);
    }));
    _this.setPropertyId = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var tenantId, applicationNumber, propertyId;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              tenantId = (0, _PTCommon.getQueryValue)(window.location.href, "tenantId");
              applicationNumber = (0, _PTCommon.getQueryValue)(window.location.href, "applicationNumber");
              _context3.next = 4;
              return _this.getPropertyId(applicationNumber, tenantId);

            case 4:
              propertyId = _context3.sent;

              _this.props.fetchProperties([{ key: "propertyIds", value: propertyId }, { key: "tenantId", value: tenantId }]);
              _this.props.prepareFinalObject('PTApplication.propertyId', propertyId);
              _this.setState({ propertyId: propertyId });

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }));

    _this.getPropertyId = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(applicationNumber, tenantId) {
        var applicationType, queryObject, payload, _queryObject, _payload;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                applicationType = (0, _PTCommon.getQueryValue)(window.location.href, "type");

                if (!(applicationType == 'assessment')) {
                  _context4.next = 16;
                  break;
                }

                queryObject = [{ key: "assessmentNumbers", value: applicationNumber }, { key: "tenantId", value: tenantId }];
                _context4.prev = 3;
                _context4.next = 6;
                return (0, _api.httpRequest)("property-services/assessment/_search", "_search", queryObject);

              case 6:
                payload = _context4.sent;

                if (!(payload && payload.Assessments.length > 0)) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", payload.Assessments[0].propertyId);

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](3);

                console.log(_context4.t0);

              case 14:
                _context4.next = 28;
                break;

              case 16:
                _queryObject = [{ key: "acknowledgementIds", value: applicationNumber }, { key: "tenantId", value: tenantId }];
                _context4.prev = 17;
                _context4.next = 20;
                return (0, _api.httpRequest)("property-services/property/_search", "_search", _queryObject);

              case 20:
                _payload = _context4.sent;

                if (!(_payload && _payload.Properties.length > 0)) {
                  _context4.next = 23;
                  break;
                }

                return _context4.abrupt("return", _payload.Properties[0].propertyId);

              case 23:
                _context4.next = 28;
                break;

              case 25:
                _context4.prev = 25;
                _context4.t1 = _context4["catch"](17);

                console.log(_context4.t1);

              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[3, 11], [17, 25]]);
      }));

      return function (_x2, _x3) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.getApplicationType = function () {
      var applicationType = (0, _PTCommon.getQueryValue)(window.location.href, "type");
      var applicationObject = {};
      if (applicationType == "assessment") {
        applicationObject.dataPath = "Assessment";
        applicationObject.responsePath = "Assessments";
        applicationObject.moduleName = "ASMT";
        applicationObject.updateUrl = "/property-services/assessment/_update";
        applicationObject.queryParams = [{
          key: "assessmentNumbers", value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
        }, {
          key: "tenantId", value: (0, _commons.getQueryArg)(window.location.href, "tenantId")
        }];
        applicationObject.endpoint = _endPoints.FETCHASSESSMENTS;
      } else if (applicationType == "property") {
        applicationObject.responsePath = "Properties";
        applicationObject.dataPath = "Property";
        applicationObject.moduleName = "PT.CREATE";
        applicationObject.updateUrl = "/property-services/property/_update";
        applicationObject.queryParams = [{
          key: "acknowledgementIds", value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
        }, {
          key: "tenantId", value: (0, _commons.getQueryArg)(window.location.href, "tenantId")
        }];
        applicationObject.endpoint = _endPoints.PROPERTY;
      } else if (applicationType == "updateProperty") {
        applicationObject.responsePath = "Properties";
        applicationObject.dataPath = "Property";
        applicationObject.moduleName = "PT.UPDATE";
        applicationObject.updateUrl = "/property-services/property/_update";
        applicationObject.queryParams = [{
          key: "acknowledgementIds", value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
        }, {
          key: "tenantId", value: (0, _commons.getQueryArg)(window.location.href, "tenantId")
        }];
        applicationObject.endpoint = _endPoints.PROPERTY;
      } else if (applicationType == "legacy") {
        applicationObject.responsePath = "Properties";
        applicationObject.dataPath = "Property";
        applicationObject.moduleName = "PT.LEGACY";
        applicationObject.updateUrl = "/property-services/property/_update";
        applicationObject.queryParams = [{
          key: "acknowledgementIds", value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
        }, {
          key: "tenantId", value: (0, _commons.getQueryArg)(window.location.href, "tenantId")
        }];
        applicationObject.endpoint = _endPoints.PROPERTY;
      }
      return applicationObject;
    };

    _this.getLogoUrl = function (tenantId) {
      var cities = _this.props.cities;

      var filteredCity = cities && cities.length > 0 && cities.filter(function (item) {
        return item.code === tenantId;
      });
      return filteredCity ? (0, _get2.default)(filteredCity[0], "logoId") : "";
    };

    _this.state = {
      pathName: null,
      dialogueOpen: false,
      urlToAppend: "",
      showAssessmentHistory: false
    };
    return _this;
  }

  (0, _createClass3.default)(ApplicationPreview, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          location = _props.location,
          documentsUploaded = _props.documentsUploaded;
      var search = location.search;

      var applicationNumber = (0, _PTCommon.getQueryValue)(search, "applicationNumber");
      var _props2 = this.props,
          generalMDMSDataById = _props2.generalMDMSDataById,
          properties = _props2.properties,
          cities = _props2.cities;

      var applicationType = this.getApplicationType();
      var applicationDownloadObject = {
        label: { labelName: "PT Application", labelKey: "PT_APPLICATION" },
        link: function link() {
          (0, _PTCommon.generatePdfFromDiv)("download", applicationNumber, "#property-application-review-form");
        },
        leftIcon: "assignment"
      };
      var applicationPrintObject = {
        label: { labelName: "PT Application", labelKey: "PT_APPLICATION" },
        link: function link() {
          (0, _PTCommon.generatePdfFromDiv)("print", applicationNumber, "#property-application-review-form");
        },
        leftIcon: "assignment"
      };
      var downloadMenu = [applicationDownloadObject];
      var printMenu = [applicationPrintObject];
      var header = '';
      if (applicationType.dataPath == 'Property') {
        header = 'PT_APPLICATION_TITLE';
      } else {
        header = 'PT_ASSESS_APPLICATION_TITLE';
      }
      var logoUrl = "";
      var corpCity = "";
      var ulbGrade = "";
      if ((0, _get2.default)(properties, "tenantId")) {
        var tenantid = (0, _get2.default)(properties, "tenantId");
        // logoUrl = get(properties, "tenantId") ? this.getLogoUrl(get(properties, "tenantId")) : "";
        logoUrl = window.location.origin + ("/" + _common2.default.tenantId + "-egov-assets/" + tenantid + "/logo.png");
        corpCity = "TENANT_TENANTS_" + (0, _get2.default)(properties, "tenantId").toUpperCase().replace(/[.:-\s\/]/g, "_");
        var selectedCityObject = cities && cities.length > 0 && cities.filter(function (item) {
          return item.code === (0, _get2.default)(properties, "tenantId");
        });
        ulbGrade = selectedCityObject ? "ULBGRADE_" + (0, _get2.default)(selectedCityObject[0], "city.ulbGrade") : "MUNICIPAL CORPORATION";
      }
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _Screen2.default,
          { className: "" },
          _react2.default.createElement(_PTHeader2.default, { header: header, subHeaderTitle: "PT_PROPERTY_APPLICATION_NO", subHeaderValue: applicationNumber }),
          _react2.default.createElement(
            "div",
            { className: "form-without-button-cont-generic" },
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(_WorkFlowContainer2.default, { dataPath: applicationType.dataPath,
                moduleName: applicationType.moduleName,
                updateUrl: applicationType.updateUrl }),
              _react2.default.createElement(_components.Card, {
                textChildren: _react2.default.createElement(
                  "div",
                  { className: "col-sm-12 col-xs-12", id: "property-application-review-form", style: { alignItems: "center" } },
                  _react2.default.createElement(_PdfHeader2.default, { header: {
                      logoUrl: logoUrl, corpCity: corpCity, ulbGrade: ulbGrade,
                      label: "PT_PDF_SUBHEADER"
                    },
                    subHeader: {
                      label: "PT_PROPERTY_ID",
                      value: ": " + (0, _get2.default)(properties, "propertyId")
                    } }),
                  _react2.default.createElement(_PropertyAddressInfo2.default, { properties: properties, generalMDMSDataById: generalMDMSDataById }),
                  _react2.default.createElement(_AssessmentInfo2.default, { properties: properties, generalMDMSDataById: generalMDMSDataById }),
                  _react2.default.createElement(_OwnerInfo2.default, { properties: properties, generalMDMSDataById: generalMDMSDataById }),
                  _react2.default.createElement(_DocumentsInfo2.default, { documentsUploaded: documentsUploaded })
                )
              })
            )
          )
        )
      );
    }
  }]);
  return ApplicationPreview;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _state$common = state.common,
      common = _state$common === undefined ? {} : _state$common,
      _state$screenConfigur = state.screenConfiguration,
      screenConfiguration = _state$screenConfigur === undefined ? {} : _state$screenConfigur;

  var _ref5 = common || {},
      generalMDMSDataById = _ref5.generalMDMSDataById;

  var _ref6 = state.properties || {},
      propertiesById = _ref6.propertiesById,
      loading = _ref6.loading;

  var location = ownProps.location;
  var search = location.search;
  var _screenConfiguration$ = screenConfiguration.preparedFinalObject,
      preparedFinalObject = _screenConfiguration$ === undefined ? {} : _screenConfiguration$;
  var _preparedFinalObject$ = preparedFinalObject.PTApplication,
      PTApplication = _preparedFinalObject$ === undefined ? {} : _preparedFinalObject$;
  var _PTApplication$proper = PTApplication.propertyId,
      propertyId = _PTApplication$proper === undefined ? '' : _PTApplication$proper;

  var _ref7 = state.common || [],
      cities = _ref7.cities;

  var properties = propertiesById[propertyId] || {};

  var _ref8 = properties || [],
      documentsUploaded = _ref8.documentsUploaded;

  return {
    ownProps: ownProps,
    generalMDMSDataById: generalMDMSDataById, properties: properties, documentsUploaded: documentsUploaded, propertyId: propertyId, cities: cities
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName) {
      return dispatch((0, _actions3.fetchGeneralMDMSData)(requestBody, moduleName, masterName));
    },
    fetchProperties: function fetchProperties(queryObjectProperty) {
      return dispatch((0, _actions4.fetchProperties)(queryObjectProperty));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions2.toggleSnackbarAndSetText)(open, message, error));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    },
    fetchLocalizationLabel: function fetchLocalizationLabel(locale, moduleName, tenantId) {
      return dispatch((0, _actions2.fetchLocalizationLabel)(locale, moduleName, tenantId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ApplicationPreview);