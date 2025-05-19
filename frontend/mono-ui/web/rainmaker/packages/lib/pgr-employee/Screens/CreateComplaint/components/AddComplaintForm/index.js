"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _AdditionalDetails = require("../AdditionalDetails");

var _AdditionalDetails2 = _interopRequireDefault(_AdditionalDetails);

var _ComplaintType = require("../ComplaintType");

var _ComplaintType2 = _interopRequireDefault(_ComplaintType);

var _MohallaDropdown = require("../MohallaDropdown");

var _MohallaDropdown2 = _interopRequireDefault(_MohallaDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddComplaintForm = function AddComplaintForm(_ref) {
  var formKey = _ref.formKey,
      localizationLabels = _ref.localizationLabels,
      handleFieldChange = _ref.handleFieldChange,
      form = _ref.form,
      categories = _ref.categories,
      history = _ref.history;

  var fields = form.fields || {};
  var name = fields.name,
      phone = fields.phone,
      mohalla = fields.mohalla,
      city = fields.city,
      address = fields.address,
      landmark = fields.landmark,
      houseNo = fields.houseNo;

  var submit = form.submit;
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
    { className: "create-complaint-main-cont" },
    _react2.default.createElement(
      "div",
      { className: "create-comp-csr-form-cont form-without-button-cont-generic" },
      _react2.default.createElement(_components.Card, {
        id: "create-complaint-card",
        className: "create-complaint-main-card",
        textChildren: _react2.default.createElement(
          "div",
          { className: "col-xs-12", style: { padding: 0 } },
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              className: "fix-for-layout-break"
            }, name, {
              name: "create-complaint",
              onChange: function onChange(e, value) {
                return handleFieldChange("name", value);
              }
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              className: "fix-for-layout-break"
            }, phone, {
              name: "complainant-mobile-no",
              onChange: function onChange(e, value) {
                return handleFieldChange("phone", value);
              }
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_ComplaintType2.default, {
              className: "fix-for-layout-break",
              localizationLabels: localizationLabels,
              categories: categories,
              complaintType: fields.complaintType
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_AdditionalDetails2.default, {
              className: "fix-for-layout-break",
              handleFieldChange: handleFieldChange,
              additionalDetails: fields.additionalDetails
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
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
              toolTip: city.toolTip,
              toolTipMessage: city.toolTipMessage,
              boundary: city.boundary,
              errorMessage: city.errorMessage,
              errorStyle: city.errorStyle,
              pattern: city.pattern,
              isClearable: true
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
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
              toolTip: mohalla.toolTip,
              toolTipMessage: mohalla.toolTipMessage,
              boundary: mohalla.boundary,
              errorMessage: mohalla.errorMessage,
              errorStyle: mohalla.errorStyle,
              pattern: mohalla.pattern,
              isClearable: true
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              className: "fix-for-layout-break"
            }, houseNo, {
              onChange: function onChange(e, value) {
                return handleFieldChange("houseNo", value);
              },
              name: "house-no"
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              className: "fix-for-layout-break"
            }, landmark, {
              onChange: function onChange(e, value) {
                return handleFieldChange("landmark", value);
              },
              name: "landmark-details"
            }))
          )
        )
      })
    ),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont" },
      _react2.default.createElement(_components.Button, (0, _extends3.default)({
        primary: true,
        fullWidth: true,
        style: {
          width: 230,
          boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)"
        }
      }, submit, {
        className: "responsive-action-button"
      }))
    )
  );
};

exports.default = AddComplaintForm;