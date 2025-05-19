"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _reactRouterDom = require("react-router-dom");

var _myLocation = require("material-ui/svg-icons/maps/my-location");

var _myLocation2 = _interopRequireDefault(_myLocation);

var _uiContainers = require("egov-ui-framework/ui-containers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocationDetails = function LocationDetails(_ref) {
  var formKey = _ref.formKey,
      locationDetails = _ref.locationDetails,
      landmark = _ref.landmark,
      city = _ref.city,
      mohalla = _ref.mohalla,
      houseNo = _ref.houseNo,
      handleFieldChange = _ref.handleFieldChange;

  if (city && city.dropDownData && city.dropDownData.length > 0) {
    city.dropDownData.map(function (item, key) {
      city.dropDownData[key].code = item.value;
      city.dropDownData[key].name = item.label;
    });
  }
  if (mohalla && mohalla.dropDownData && mohalla.dropDownData.length > 0) {
    mohalla.dropDownData.map(function (item, key) {
      mohalla.dropDownData[key].code = item.value;
      mohalla.dropDownData[key].name = item.label;
    });
  }
  return _react2.default.createElement(
    "div",
    { className: "location-details-main-cont" },
    _react2.default.createElement(_components.Card, {
      className: "location-details-card common-padding-for-new-complaint-card",
      textChildren: _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: "/map?" + formKey },
          _react2.default.createElement(_components.TextFieldIcon, (0, _extends3.default)({
            id: "addComplaint-location-details",
            iconStyle: { marginTop: "9px" }
          }, locationDetails, {
            iconPosition: "after",
            Icon: _myLocation2.default,
            name: "location-details"
          }))
        ),
        city && _react2.default.createElement(_uiContainers.AutosuggestContainer, {
          className: "fix-for-layout-break autocomplete-dropdown",
          fullWidth: true,
          data: city && city.dropDownData,
          onChange: function onChange(chosenCity, index) {
            handleFieldChange("city", chosenCity.target.value, city.jsonPath);
          },
          label: { labelKey: city.floatingLabelText },
          placeholder: { labelKey: city.hintText },
          id: city.id,
          type: city.type,
          required: city.required,
          jsonPath: city.jsonPath,
          localePrefix: city.localePrefix,
          labelsFromLocalisation: city.labelsFromLocalisation,
          gridDefination: {
            xs: 12,
            sm: 12
          },
          toolTip: city.toolTip,
          toolTipMessage: city.toolTipMessage,
          boundary: city.boundary,
          errorMessage: city.errorMessage,
          errorStyle: city.errorStyle,
          pattern: city.pattern,
          isClearable: true
        }),
        mohalla && _react2.default.createElement(_uiContainers.AutosuggestContainer, {
          className: "fix-for-layout-break autocomplete-dropdown",
          fullWidth: true,
          data: mohalla && mohalla.dropDownData,
          onChange: function onChange(chosenCity, index) {
            handleFieldChange("mohalla", chosenCity.target.value, mohalla.jsonPath);
          },
          label: { labelKey: mohalla.floatingLabelText },
          placeholder: { labelKey: mohalla.hintText },
          id: mohalla.id,
          type: mohalla.type,
          required: mohalla.required,
          jsonPath: mohalla.jsonPath,
          localePrefix: mohalla.localePrefix,
          labelsFromLocalisation: mohalla.labelsFromLocalisation,
          gridDefination: {
            xs: 12,
            sm: 12
          },
          toolTip: mohalla.toolTip,
          toolTipMessage: mohalla.toolTipMessage,
          boundary: mohalla.boundary,
          errorMessage: mohalla.errorMessage,
          errorStyle: mohalla.errorStyle,
          pattern: mohalla.pattern,
          isClearable: true
        }),
        _react2.default.createElement(_components.TextField, (0, _extends3.default)({ id: "addComplaint-house-no" }, houseNo, { onChange: function onChange(e, value) {
            return handleFieldChange("houseNo", value);
          }, name: "house-no" })),
        _react2.default.createElement(_components.TextField, (0, _extends3.default)({
          id: "addComplaint-landmark-details"
        }, landmark, {
          onChange: function onChange(e, value) {
            return handleFieldChange("landmark", value);
          },
          name: "landmark-details"
        }))
      )
    })
  );
};

exports.default = LocationDetails;