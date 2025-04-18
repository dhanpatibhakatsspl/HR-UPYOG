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

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _AssessmentInfo = require("../../../Property/components/AssessmentInfo");

var _AssessmentInfo2 = _interopRequireDefault(_AssessmentInfo);

var _DocumentsInfo = require("../../../Property/components/DocumentsInfo");

var _DocumentsInfo2 = _interopRequireDefault(_DocumentsInfo);

var _OwnerInfo = require("../../../Property/components/OwnerInfo");

var _OwnerInfo2 = _interopRequireDefault(_OwnerInfo);

var _PdfHeader = require("../../../Property/components/PdfHeader");

var _PdfHeader2 = _interopRequireDefault(_PdfHeader);

var _PropertyAddressInfo = require("../../../Property/components/PropertyAddressInfo");

var _PropertyAddressInfo2 = _interopRequireDefault(_PropertyAddressInfo);

var _TotalDues = require("../../../Property/components/TotalDues");

var _TotalDues2 = _interopRequireDefault(_TotalDues);

var _ApplicationHistory = require("./components/ApplicationHistory");

var _ApplicationHistory2 = _interopRequireDefault(_ApplicationHistory);

var _AssessmentHistory = require("./components/AssessmentHistory");

var _AssessmentHistory2 = _interopRequireDefault(_AssessmentHistory);

var _PaymentHistory = require("./components/PaymentHistory");

var _PaymentHistory2 = _interopRequireDefault(_PaymentHistory);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logoStyle = {
  height: "61px",
  width: "60px"
};

var PTInformation = function (_React$Component) {
  (0, _inherits3.default)(PTInformation, _React$Component);

  function PTInformation() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PTInformation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PTInformation.__proto__ || Object.getPrototypeOf(PTInformation)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      businessServiceInfoItem: {},
      waterDetails: [],
      sewerDetails: []
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var mdmsBody, businessServiceInfoItem, requestObject, payload, waterDetails, sewerDetails, getDuesForPTMutation, queryObjectForConsumer;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mdmsBody = {
                MdmsCriteria: {
                  tenantId: _common2.default.tenantId,
                  moduleDetails: [{
                    moduleName: "BillingService",
                    masterDetails: [{ name: "BusinessService" }]
                  }]
                }
              };
              businessServiceInfoItem = (0, _commons.businessServiceInfo)(mdmsBody, "PT");

              _this.setState({ businessServiceInfoItem: businessServiceInfoItem });
              requestObject = {
                MdmsCriteria: {
                  tenantId: _common2.default.tenantId,
                  moduleDetails: [{
                    moduleName: "PropertyTax",
                    masterDetails: [{
                      name: "DuesOnPTMutation"
                    }]
                  }]
                }
              };
              _context3.next = 6;
              return (0, _api.httpRequest)("/egov-mdms-service/v1/_search", "_search", [], requestObject);

            case 6:
              payload = _context3.sent;
              waterDetails = [];
              sewerDetails = [];
              getDuesForPTMutation = payload && payload.MdmsRes.PropertyTax.DuesOnPTMutation;

              if (getDuesForPTMutation && getDuesForPTMutation.length > 0) {
                queryObjectForConsumer = [];

                queryObjectForConsumer.push({ key: "searchType", value: "CONNECTION" }, { key: "propertyId", value: window.location.href.split('/')[6] }, { key: "tenantId", value: (0, _localStorageUtils.getTenantId)() });
                getDuesForPTMutation.map(function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(items) {
                    var consumerDetails, bills;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!items.enabled) {
                              _context2.next = 5;
                              break;
                            }

                            _context2.next = 3;
                            return (0, _commons.searchConsumer)(items, queryObjectForConsumer);

                          case 3:
                            consumerDetails = _context2.sent;

                            if (consumerDetails && consumerDetails.length > 0) {
                              bills = [];

                              consumerDetails.map(function () {
                                var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(details) {
                                  var billDetails;
                                  return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          _context.prev = 0;
                                          _context.next = 3;
                                          return (0, _commons.fetchConsumerBill)(items, [{ key: "businessService", value: items.module }, { key: "consumerCode", value: details.connectionNo }, { key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }]);

                                        case 3:
                                          billDetails = _context.sent;

                                          billDetails && bills.push(billDetails);
                                          if (bills && bills.length > 0 && items.module === "WS") {
                                            bills.map(function (bill) {
                                              waterDetails.push({
                                                waterDue: bill.totalAmount,
                                                connectionNo: bill.consumerCode,
                                                module: items.module
                                              });
                                            });
                                            _this.setState({ waterDetails: waterDetails });
                                            waterDetails = [];
                                          } else if (bills && bills.length > 0 && items.module === "SW") {
                                            bills.map(function (bill) {
                                              sewerDetails.push({
                                                sewerDue: bill.totalAmount,
                                                connectionNo: bill.consumerCode,
                                                module: items.module
                                              });
                                            });
                                            _this.setState({ sewerDetails: sewerDetails });
                                            sewerDetails = [];
                                          }
                                          _context.next = 11;
                                          break;

                                        case 8:
                                          _context.prev = 8;
                                          _context.t0 = _context["catch"](0);

                                          console.log(_context.t0);

                                        case 11:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  }, _callee, _this2, [[0, 8]]);
                                }));

                                return function (_x2) {
                                  return _ref4.apply(this, arguments);
                                };
                              }());
                            }

                          case 5:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              }

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    })), _this.updateProperty = function () {
      var _this$props = _this.props,
          propertiesAudit = _this$props.propertiesAudit,
          properties = _this$props.properties;

      if (propertiesAudit.length === 0) propertiesAudit.push(properties);
      var Owners = [];
      var Institution = null;
      var ownershipCategory = '';
      propertiesAudit.reverse().map(function (property) {
        if (property.status == "ACTIVE") {
          Owners = property.owners.filter(function (owner) {
            return owner.status == "ACTIVE";
          });
          Institution = property.institution;
          ownershipCategory = property.ownershipCategory;
        }
      });
      if (Owners.length == 0) {
        Owners = propertiesAudit[0].owners.filter(function (owner) {
          return owner.status == "ACTIVE";
        });
        Institution = propertiesAudit[0].institution;
        ownershipCategory = propertiesAudit[0].ownershipCategory;
      }
      return { owners: Owners, institution: Institution, ownershipCategory: ownershipCategory };
    }, _this.getLogoUrl = function (tenantId) {
      var cities = _this.props.cities;

      var filteredCity = cities && cities.length > 0 && cities.filter(function (item) {
        return item.code === tenantId;
      });
      return filteredCity ? (0, _get2.default)(filteredCity[0], "logoId") : "";
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PTInformation, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          label = _props.label,
          properties = _props.properties,
          generalMDMSDataById = _props.generalMDMSDataById,
          totalBillAmountDue = _props.totalBillAmountDue,
          documentsUploaded = _props.documentsUploaded,
          toggleSnackbarAndSetText = _props.toggleSnackbarAndSetText,
          cities = _props.cities,
          propertiesAudit = _props.propertiesAudit,
          updateNumberConfig = _props.updateNumberConfig;
      var _state = this.state,
          businessServiceInfoItem = _state.businessServiceInfoItem,
          waterDetails = _state.waterDetails,
          sewerDetails = _state.sewerDetails;

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
      if (properties.status == "INWORKFLOW") {
        var updatedOnwerInfo = this.updateProperty();
        properties.propertyDetails[0].owners = updatedOnwerInfo.owners;
        properties.propertyDetails[0].institution = updatedOnwerInfo.institution;
        properties.propertyDetails[0].ownershipCategory = updatedOnwerInfo.ownershipCategory;
      }
      return _react2.default.createElement(
        "div",
        { className: "form-without-button-cont-generic" },
        label && _react2.default.createElement(_translationNode2.default, {
          label: label,
          containerStyle: { padding: "24px 0px 24px 0", marginLeft: "16px" },
          dark: true,
          bold: true,
          labelStyle: { letterSpacing: 0 },
          fontSize: "20px"
        }),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_components.Card, {
            textChildren: _react2.default.createElement(
              "div",
              { id: "property-review-form", className: "col-sm-12 col-xs-12", style: { alignItems: "center" } },
              (totalBillAmountDue > 0 || totalBillAmountDue === 0 && businessServiceInfoItem.isAdvanceAllowed) && _react2.default.createElement(_components.Card, {
                textChildren: _react2.default.createElement(_TotalDues2.default, {
                  history: true,
                  properties: properties,
                  tenantId: properties.tenantId,
                  consumerCode: properties.propertyId,
                  totalBillAmountDue: totalBillAmountDue,
                  isAdvanceAllowed: businessServiceInfoItem.isAdvanceAllowed,
                  updateNumberConfig: updateNumberConfig
                }),
                style: { backgroundColor: "rgb(242,242,242)", boxShadow: "none" }
              }),
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
              _react2.default.createElement(_OwnerInfo2.default, {
                toggleSnackbarAndSetText: toggleSnackbarAndSetText,
                properties: properties,
                generalMDMSDataById: generalMDMSDataById,
                totalBillAmountDue: totalBillAmountDue,
                waterDetails: waterDetails,
                sewerDetails: sewerDetails,
                ownershipTransfer: true,
                viewHistory: true,
                propertiesAudit: propertiesAudit
              }),
              _react2.default.createElement(_DocumentsInfo2.default, { documentsUploaded: documentsUploaded }),
              _react2.default.createElement(
                "div",
                { id: "property-assess-form" },
                _react2.default.createElement(_AssessmentHistory2.default, null),
                _react2.default.createElement(_PaymentHistory2.default, null),
                _react2.default.createElement(_ApplicationHistory2.default, null)
              )
            )
          })
        )
      );
    }
  }]);
  return PTInformation;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _state$screenConfigur = state.screenConfiguration,
      screenConfiguration = _state$screenConfigur === undefined ? {} : _state$screenConfigur;

  var _ref5 = state.common || [],
      cities = _ref5.cities;

  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var _preparedFinalObject$ = preparedFinalObject.propertiesAudit,
      propertiesAudit = _preparedFinalObject$ === undefined ? [] : _preparedFinalObject$;

  var updateNumberConfig = (0, _get2.default)(preparedFinalObject, "updateNumberConfig", []);
  return { cities: cities, propertiesAudit: propertiesAudit, updateNumberConfig: updateNumberConfig };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(PTInformation);