"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _PdfHeader = require("egov-ui-kit/common/propertyTax/Property/components/PdfHeader");

var _PdfHeader2 = _interopRequireDefault(_PdfHeader);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pdfHeader = function (_React$Component) {
  (0, _inherits3.default)(pdfHeader, _React$Component);

  function pdfHeader() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, pdfHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = pdfHeader.__proto__ || Object.getPrototypeOf(pdfHeader)).call.apply(_ref, [this].concat(args))), _this), _this.getLogoUrl = function (tenantId) {
      var cities = _this.props.cities;

      var filteredCity = cities && cities.length > 0 && cities.filter(function (item) {
        return item.code === tenantId;
      });
      return filteredCity ? (0, _get2.default)(filteredCity[0], "logoId") : "";
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(pdfHeader, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          properties = _props.properties,
          cities = _props.cities;

      var logoUrl = "";
      var corpCity = "";
      var ulbGrade = "";
      if ((0, _get2.default)(properties, "tenantId")) {
        var tenantid = (0, _get2.default)(properties, "tenantId");
        logoUrl = window.location.origin + ("/" + _common2.default.tenantId + "-egov-assets/" + tenantid + "/logo.png");
        //  logoUrl =get(properties,"tenantId") ?  this.getLogoUrl(get(properties,"tenantId")) : "";
        corpCity = "TENANT_TENANTS_" + (0, _get2.default)(properties, "tenantId").toUpperCase().replace(/[.:-\s\/]/g, "_");
        var selectedCityObject = cities && cities.length > 0 && cities.filter(function (item) {
          return item.code === (0, _get2.default)(properties, "tenantId");
        });
        ulbGrade = selectedCityObject ? "ULBGRADE_" + (0, _get2.default)(selectedCityObject[0], "city.ulbGrade") : "MUNICIPAL CORPORATION";
      }
      return _react2.default.createElement(_PdfHeader2.default, { header: {
          logoUrl: logoUrl, corpCity: corpCity, ulbGrade: ulbGrade,
          label: "PT_MUTATION_PDF_SUBHEADER"
        },
        subHeader: {
          label: "PT_PROPERTY_ID",
          value: ": " + (0, _get2.default)(properties, "propertyId")
        } });
    }
  }]);
  return pdfHeader;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;

  var _ref2 = state.common || [],
      cities = _ref2.cities;

  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var Properties = preparedFinalObject.Properties;

  var properties = Properties[0];
  return { properties: properties, cities: cities, preparedFinalObject: preparedFinalObject, state: state };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(pdfHeader);