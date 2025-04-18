"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateComplaintStatus = function updateComplaintStatus(state, form) {
  var formData = (0, _commons.prepareFormData)(form);
  var serviceRequestId = decodeURIComponent(window.location.pathname.split("/").pop());
  var complaint = state.complaints.byId[serviceRequestId];
  if (!formData.services) {
    formData.services = [];
    formData.services[0] = complaint;
  } else {
    formData.services[0] = (0, _extends3.default)({}, formData.services[0], complaint);
  }
  return formData;
};

var filterObjByKey = function filterObjByKey(obj, predicate) {
  return Object.keys(obj).filter(function (key) {
    return predicate(key);
  }).reduce(function (res, key) {
    return res[key] = obj[key], res;
  }, {});
};

var transformer = function transformer(formKey) {
  var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var transformers = {
    assignComplaint: function assignComplaint() {
      var formData = (0, _commons.prepareFormData)(form);
      var serviceRequestId = decodeURIComponent(window.location.pathname.split("/").pop());
      var serviceData = state.complaints.byId[serviceRequestId];
      var filteredServiceData = filterObjByKey(serviceData, function (key) {
        return key !== "actions";
      });
      if (!formData.services) formData.services = [];
      formData.services[0] = filteredServiceData;
      return formData;
    },
    comment: function comment(form, state) {
      var formData = (0, _commons.prepareFormData)(form);
      var serviceRequestId = decodeURIComponent(window.location.pathname.split("/").pop());
      var serviceData = state.complaints.byId[serviceRequestId];
      var filteredServiceData = filterObjByKey(serviceData, function (key) {
        return key !== "actions";
      });
      if (!formData.services) formData.services = [];
      formData.services[0] = filteredServiceData;
      return formData;
    },
    requestReassign: function requestReassign() {
      return updateComplaintStatus(state, form);
    },
    reopenComplaint: function reopenComplaint() {
      return updateComplaintStatus(state, form);
    },
    feedback: function feedback() {
      return updateComplaintStatus(state, form);
    },
    rejectComplaint: function rejectComplaint() {
      return updateComplaintStatus(state, form);
    },
    complaintResolved: function complaintResolved() {
      return updateComplaintStatus(state, form);
    },
    profile: function profile() {
      var fields = form.fields;
      var user = state.auth.userInfo;

      user = (0, _extends3.default)({}, user, { name: fields.name.value, permanentCity: fields.city.value, emailId: fields.email.value });
      var photos = form.files && form.files["photo"];
      var photo = photos && photos.length && photos[0] || null;
      photo = photo ? photo.fileStoreId || photo.imageUri : null;
      user = (0, _extends3.default)({}, user, { photo: photo });
      return { user: user };
    },
    profileEmployee: function profileEmployee() {
      var fields = form.fields;
      var user = state.auth.userInfo;

      user = (0, _extends3.default)({}, user, { name: fields.name.value, mobileNumber: fields.phonenumber.value, emailId: fields.email.value });
      var photos = form.files && form.files["photo"];
      var photo = photos && photos.length && photos[0] || null;
      photo = photo ? photo.fileStoreId || photo.imageUri : null;
      user = (0, _extends3.default)({}, user, { photo: photo });
      return { user: user };
    },
    otp: function otp() {
      var previousRoute = state.app.previousRoute;
      var otpFields = form.fields;

      var fields = void 0;
      if (previousRoute.endsWith("register")) {
        fields = state.form["register"].fields;
        fields = (0, _extends3.default)({}, otpFields, {
          username: {
            jsonPath: "User.username",
            value: fields.phone.value
          },
          name: {
            jsonPath: "User.name",
            value: fields.name.value
          },
          tenantId: {
            jsonPath: "User.tenantId",
            value: fields.city.value
          },
          permanentCity: {
            jsonPath: "User.permanentCity",
            value: fields.city.value
          }
        });
      } else if (previousRoute.endsWith("login")) {
        fields = state.form["login"].fields;
        fields = {
          password: {
            jsonPath: "login.password",
            value: otpFields.otp.value
          },
          username: {
            jsonPath: "login.username",
            value: fields.phone.value
          }
        };
      } else if (previousRoute.indexOf("smsLink=true") > 0) {
        fields = {
          password: {
            jsonPath: "login.password",
            value: otpFields.otp.value
          },
          username: {
            jsonPath: "login.username",
            value: otpFields.otp.phone
          }
        };
      }
      return (0, _commons.prepareFormData)((0, _extends3.default)({}, form, { fields: fields }));
    },
    employeeOTP: function employeeOTP() {
      var formData = (0, _commons.prepareFormData)(form);

      var _ref = state.form.employeeForgotPasswd || {},
          fields = _ref.fields;

      formData.tenantId = fields.tenantId.value;
      formData.type = "EMPLOYEE";
      return formData;
    },
    employeeChangePassword: function employeeChangePassword() {
      var formData = (0, _commons.prepareFormData)(form);
      var auth = state.auth;

      var username = (0, _get2.default)(auth, "userInfo.userName");
      var type = process.env.REACT_APP_NAME === "Citizen" ? "CITIZEN" : "EMPLOYEE";
      var tenantId = (0, _localStorageUtils.getTenantId)();
      formData.tenantId = tenantId;
      formData.username = username;
      formData.type = type;
      return formData;
    },
    complaint: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var formData, userInfo, userPhone, _form$fields, _form$fields$latitude, latitude, _form$fields$longitud, longitude, tenantId;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = (0, _commons.prepareFormData)(form);
                userInfo = (0, _localStorageUtils.getUserInfo)();
                userPhone = null;

                try {
                  userPhone = JSON.parse(userInfo).mobileNumber;
                  formData.services[0].phone = userPhone;
                } catch (error) {}

                _context.prev = 4;
                _form$fields = form.fields, _form$fields$latitude = _form$fields.latitude, latitude = _form$fields$latitude === undefined ? {} : _form$fields$latitude, _form$fields$longitud = _form$fields.longitude, longitude = _form$fields$longitud === undefined ? {} : _form$fields$longitud;

                if (!(latitude.value && longitude.value)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 9;
                return (0, _commons.getTenantForLatLng)(latitude.value, longitude.value);

              case 9:
                tenantId = _context.sent;

                formData.services[0].tenantId = tenantId;
                _context.next = 14;
                break;

              case 13:
                formData.services[0].tenantId = (0, _get2.default)(formData, "services.0.addressDetail.city");

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](4);
                throw new Error(_context.t0.message);

              case 19:
                return _context.abrupt("return", formData);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined, [[4, 16]]);
      }));

      return function complaint() {
        return _ref2.apply(this, arguments);
      };
    }()
  };

  if (formKey in transformers) {
    try {
      return transformers[formKey]();
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    return (0, _commons.prepareFormData)(form);
  }
};

exports.default = transformer;