"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddressItems = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("egov-ui-kit/redux/app/utils");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _PropertyInfoCard = require("../PropertyInfoCard");

var _PropertyInfoCard2 = _interopRequireDefault(_PropertyInfoCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
var localizationLabelsData = (0, _utils.initLocalizationLabels)(locale);

var getAddressItems = exports.getAddressItems = function getAddressItems(properties, OldProperty) {
  var oldTenantInfo = [],
      oldStateId = "",
      oldCityId = "",
      oldLocality = "";
  var _properties$address = properties.address,
      address = _properties$address === undefined ? {} : _properties$address,
      _properties$tenantId = properties.tenantId,
      tenantId = _properties$tenantId === undefined ? '' : _properties$tenantId;

  var tenantInfo = tenantId.split('.') || [];
  var stateId = tenantInfo && tenantInfo.length === 2 && tenantInfo[0] ? tenantInfo[0].toUpperCase() : 'NA';
  var cityId = tenantInfo && tenantInfo.length === 2 && tenantInfo[1] ? tenantInfo[1].toUpperCase() : 'NA';
  var localityCode = address.locality && address.locality.code ? address.locality.code : 'NA';
  if (OldProperty) {
    oldTenantInfo = OldProperty.tenantId.split(".");
    oldStateId = oldTenantInfo[0] && oldTenantInfo[0].toUpperCase();
    oldCityId = oldTenantInfo[1] && oldTenantInfo[1].toUpperCase();
    oldLocality = OldProperty.address && OldProperty.address.locality && OldProperty.address.locality.code || 'NA';
  }

  return address && [{
    key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_CITY", localizationLabelsData),
    value: address.city || "NA",
    oldValue: OldProperty && OldProperty.address && OldProperty.address.city
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_HOUSE_NO", localizationLabelsData),
    value: address.doorNo || "NA",
    oldValue: OldProperty && OldProperty.address && OldProperty.address.doorNo
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_COLONY_NAME", localizationLabelsData),
    value: address.buildingName || "NA",
    oldValue: OldProperty && OldProperty.address && OldProperty.address.buildingName
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_STREET_NAME", localizationLabelsData),
    value: address.street || "NA",
    oldValue: OldProperty && OldProperty.address && OldProperty.address.street
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_MOHALLA", localizationLabelsData),
    value: (0, _commons.getTranslatedLabel)(stateId + "_" + cityId + "_REVENUE_" + localityCode, localizationLabelsData) || "NA",
    oldValue: (0, _commons.getTranslatedLabel)(oldStateId + "_" + oldCityId + "_REVENUE_" + oldLocality, localizationLabelsData) || "NA"
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_PINCODE", localizationLabelsData),
    value: address.pincode || "NA",
    oldValue: OldProperty && OldProperty.address && OldProperty.address.pincode
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_EXISTING_PID", localizationLabelsData),
    value: properties.oldPropertyId || "NA",
    oldValue: OldProperty && OldProperty.oldPropertyId
  }];
};

var PropertyAddressInfo = function PropertyAddressInfo(_ref) {
  var properties = _ref.properties,
      editIcon = _ref.editIcon,
      OldProperty = _ref.OldProperty;


  var addressItems = [];
  var header = 'PT_PROPERTY_ADDRESS_SUB_HEADER';
  if (properties) {
    addressItems = getAddressItems(properties, OldProperty);
  }

  return _react2.default.createElement(_PropertyInfoCard2.default, { editIcon: editIcon, items: addressItems, header: header });
};

exports.default = PropertyAddressInfo;