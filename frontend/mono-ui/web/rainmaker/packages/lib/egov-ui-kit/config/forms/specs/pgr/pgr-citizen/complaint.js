"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require("egov-ui-kit/redux/form/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("egov-ui-kit/utils/commons");

var _actions2 = require("egov-ui-kit/redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity;

var formConfig = {
  name: "complaint",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    media: {
      id: "media",
      jsonPath: "actionInfo[0].media",
      file: true,
      errorMessage: "CS_FILE_UPLOAD_FAILED"
    },
    complaintType: {
      id: "complaint-type",
      jsonPath: "services[0].serviceCode",
      required: true,
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER"
    },
    additionalDetails: {
      id: "additional details",
      jsonPath: "services[0].description",
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_DETAILS",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_DETAILS_PLACEHOLDER",
      errorMessage: "Landmark should be less than 300 characters"
    },
    latitude: {
      id: "latitude",
      jsonPath: "services[0].addressDetail.latitude"
    },
    longitude: {
      id: "longitude",
      jsonPath: "services[0].addressDetail.longitude"
    },
    address: {
      id: "address",
      jsonPath: "services[0].address",
      floatingLabelText: "CS_ADDCOMPLAINT_LOCATION",
      hintText: "CS_COMPLAINT_DETAILS_LOCATION"
    },
    city: {
      id: "city",
      jsonPath: "services[0].addressDetail.city",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorText: "",
      dropDownData: [],
      updateDependentFields: function updateDependentFields(_ref) {
        var formKey = _ref.formKey,
            field = _ref.field,
            dispatch = _ref.dispatch,
            state = _ref.state;

        dispatch((0, _actions.setFieldProperty)("complaint", "mohalla", "value", ""));
      },
      beforeFieldChange: function beforeFieldChange(_ref2) {
        var action = _ref2.action,
            dispatch = _ref2.dispatch,
            state = _ref2.state;

        if ((0, _get2.default)(state, "common.prepareFormData.services[0].addressDetail.city") !== action.value) {
          var moduleValue = action.value;
          dispatch((0, _actions2.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), moduleValue, moduleValue));
        }
        return action;
      },
      labelsFromLocalisation: true,
      dataFetchConfig: {
        dependants: [{
          fieldKey: "mohalla"
        }]
      }
    },
    mohalla: {
      id: "mohalla",
      required: true,
      jsonPath: "services[0].addressDetail.mohalla",
      floatingLabelText: "CS_CREATECOMPLAINT_MOHALLA",
      hintText: "CS_CREATECOMPLAINT_MOHALLA_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      boundary: true,
      dropDownData: [],
      dataFetchConfig: {
        url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality",
        action: "",
        queryParams: [],
        requestBody: {},
        isDependent: true,
        hierarchyType: "ADMIN"
      },

      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorText: ""
    },
    houseNo: {
      id: "houseNo",
      jsonPath: "services[0].addressDetail.houseNoAndStreetName",
      floatingLabelText: "CS_ADDCOMPLAINT_HOUSE_NO",
      hintText: "CS_ADDCOMPLAINT_HOUSE_NO_PLACEHOLDER",
      errorMessage: "PT_HOUSE_NO_ERROR_MESSAGE"
    },
    landmark: {
      id: "landmark",
      jsonPath: "services[0].addressDetail.landmark",
      floatingLabelText: "CS_ADDCOMPLAINT_LANDMARK",
      hintText: "CS_ADDCOMPLAINT_LANDMARK_PLACEHOLDER",
      errorMessage: "PT_LANDMARK_ERROR_MESSAGE"
    },
    tenantId: {
      id: "add-complaint-tenantid",
      jsonPath: "services[0].tenantId"
    }
  },
  submit: {
    type: "submit",
    label: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_SUBMIT_COMPLAINT",
    id: "addComplaint-submit-complaint"
  },
  afterInitForm: function afterInitForm(action, store, dispatch) {
    try {
      var state = store.getState();
      var localizationLabels = state.app.localizationLabels;
      var _state$common = state.common,
          cities = _state$common.cities,
          citiesByModule = _state$common.citiesByModule;

      var _ref3 = citiesByModule || {},
          PGR = _ref3.PGR;

      if (PGR) {
        var tenants = PGR.tenants;
        var dd = tenants.reduce(function (dd, tenant) {
          var selected = cities.find(function (city) {
            return city.code === tenant.code;
          });
          if (selected) {
            var label = "TENANT_TENANTS_" + selected.code.toUpperCase().replace(/[.]/g, "_");
            dd.push({ label: (0, _commons.getTranslatedLabel)(label, localizationLabels), value: selected.code });
          }

          return dd;
        }, []);
        dispatch((0, _actions.setFieldProperty)("complaint", "city", "dropDownData", dd));
      }
      // let city = get(state, "form.complaint.fields.city.value");
      // let mohalla = get(state, "form.complaint.fields.mohalla.value");
      var cityFormData = (0, _get2.default)(state, "common.prepareFormData.services[0].addressDetail.city", "");
      var mohallaFormData = (0, _get2.default)(state, "common.prepareFormData.services[0].addressDetail.mohalla", "");
      if (cityFormData) {
        dispatch((0, _actions.handleFieldChange)("complaint", "city", cityFormData));
      }
      if (mohallaFormData) {
        dispatch((0, _actions.handleFieldChange)("complaint", "mohalla", mohallaFormData));
      }
      // if (!city) {
      //   // dispatch(handleFieldChange("complaint", "city", tenantId));
      // } else {
      //   if (city) {
      //     dispatch(handleFieldChange("complaint", "city", city));
      //   }
      //   if (mohalla) {
      //     dispatch(handleFieldChange("complaint", "mohalla", mohalla));
      //   }
      // }
      return action;
    } catch (e) {}
  },
  action: "_create",
  saveUrl: "/rainmaker-pgr/v1/requests/_create",
  redirectionRoute: "/complaint-submitted"
};

exports.default = formConfig;