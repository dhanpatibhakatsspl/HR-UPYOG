"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement("div", null);
};

var PTHome = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/PTHome");
  },
  loading: Loading
});
var ApplicationPreview = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("egov-ui-kit/common/propertyTax/ApplicationPreview");
  },
  loading: Loading
});
var HowItWorks = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("egov-ui-kit/common/propertyTax/HowItWorks");
  },
  loading: Loading
});
var PTExamples = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("egov-ui-kit/common/propertyTax/PTExample");
  },
  loading: Loading
});
var SearchProperty = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/SearchProperty");
  },
  loading: Loading
});
var Property = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("egov-ui-kit/common/propertyTax/Property");
  },
  loading: Loading
});
var FormWizard = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/FormWizard");
  },
  loading: Loading
});
var PaymentSuccess = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/PaymentSuccess");
  },
  loading: Loading
});
var PaymentFailure = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/PaymentFailure");
  },
  loading: Loading
});
var PropertyInformationForm = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("../Screens/PropertyEditForm");
  },
  loading: Loading
});

var ptAcknowledgment = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import("egov-ui-kit/common/propertyTax/PTAcknowledgement");
  },
  loading: Loading
});

// const redirectionUrl = "/user/login";

var routes = [
// property tax routes
{
  path: "property-tax",
  // component: PTHome,
  component: SearchProperty,
  needsAuthentication: true,
  options: {
    title: "PT_HOME_PROPERTY_TAX",
    hideTitle: true,
    hideFooter: true
    // hideBackButton: true,
    // isHomeScreen: true,
  }
}, {
  path: "property-tax/search-property",
  component: SearchProperty,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "PT_HOME_PROPERTY_TAX",
    hideTitle: true
    // hideBackButton: true,
  }
}, {
  path: "property-tax/property/:propertyId/:tenantId",
  component: Property,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideTitle: true
    // hideBackButton: true,
  }
}, {
  path: "property-tax/application-preview",
  component: ApplicationPreview,
  needsAuthentication: true,
  options: {
    // hideTitle:true,
    hideFooter: true,
    hideTitle: true
    // hideBackButton: true,
  }
}, {
  path: "property-tax/assessment-form",
  component: FormWizard,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideTitle: true
    // hideBackButton: true,
  }
}, {
  path: "property-tax/payment-success/:propertyId/:tenantId/:assessmentId/:assessmentYear",
  component: PaymentSuccess,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    hideTitle: true
  }
}, {
  path: "property-tax/payment-failure/:propertyId/:tenantId/:assessmentNumber/:assessmentYear",
  component: PaymentFailure,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    hideTitle: true
  }
}, {
  path: "property-tax/property/:propertyId/:tenantId/edit-property",
  component: PropertyInformationForm,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    hideTitle: true
  }
}, {
  path: "property-tax/how-it-works",
  component: HowItWorks,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    // hideBackButton: true,
    title: "PT_HOW_IT_WORKS"
  }
}, {
  path: "property-tax/pt-examples",
  component: PTExamples,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    // hideBackButton: true,
    title: "PT_EXAMPLES"
  }
}, {
  path: "property-tax/pt-acknowledgment",
  component: ptAcknowledgment,
  needsAuthentication: true,
  options: {
    hideFooter: false,
    hideTitle: true
    // hideBackButton: true,
    // title: "PT_ACKNOWLEDGEMENT"
  }
}];

exports.default = routes;