"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require("react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _asyncComponent = require("./asyncComponent");

var _asyncComponent2 = _interopRequireDefault(_asyncComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PTHome = (0, _asyncComponent2.default)(function () {
  return import("../Screens/PTHome").then(function (module) {
    return module.default;
  });
}); // property tax

var AssessPay = (0, _asyncComponent2.default)(function () {
  return import("../Screens/AssessPay").then(function (module) {
    return module.default;
  });
});
var SearchProperty = (0, _asyncComponent2.default)(function () {
  return import("../Screens/SearchProperty").then(function (module) {
    return module.default;
  });
});
var CompletedAssessments = (0, _asyncComponent2.default)(function () {
  return import("../Screens/CompletedAssessments").then(function (module) {
    return module.default;
  });
});
var IncompleteAssessments = (0, _asyncComponent2.default)(function () {
  return import("../Screens/IncompleteAssessments").then(function (module) {
    return module.default;
  });
});
var MyProperties = (0, _asyncComponent2.default)(function () {
  return import("../Screens/MyProperties").then(function (module) {
    return module.default;
  });
});
var Property = (0, _asyncComponent2.default)(function () {
  return import("egov-ui-kit/common/propertyTax/Property").then(function (module) {
    return module.default;
  });
});
var ApplicationPreview = (0, _asyncComponent2.default)(function () {
  return import("egov-ui-kit/common/propertyTax/ApplicationPreview").then(function (module) {
    return module.default;
  });
});

var MyReceipts = (0, _asyncComponent2.default)(function () {
  return import("../Screens/MyReceipts").then(function (module) {
    return module.default;
  });
});
var PropertyTaxAssessmentFormWizard = (0, _asyncComponent2.default)(function () {
  return import("../Screens/AssessmentFormWizard").then(function (module) {
    return module.default;
  });
});
var PaymentSuccess = (0, _asyncComponent2.default)(function () {
  return import("../Screens/PaymentSuccess").then(function (module) {
    return module.default;
  });
});
var PaymentFailure = (0, _asyncComponent2.default)(function () {
  return import("../Screens/PaymentFailure").then(function (module) {
    return module.default;
  });
});
var ReviewForm = (0, _asyncComponent2.default)(function () {
  return import("../Screens/ReviewForm").then(function (module) {
    return module.default;
  });
});
var PastPayment = (0, _asyncComponent2.default)(function () {
  return import("../Screens/LinkPastPayments").then(function (module) {
    return module.default;
  });
});
var PaymentRedirectPage = (0, _asyncComponent2.default)(function () {
  return import("../Screens/Payment-rediect-page").then(function (module) {
    return module.default;
  });
});
var HowItWorks = (0, _asyncComponent2.default)(function () {
  return import("egov-ui-kit/common/propertyTax/HowItWorks").then(function (module) {
    return module.default;
  });
});
var PTExamples = (0, _asyncComponent2.default)(function () {
  return import("egov-ui-kit/common/propertyTax/PTExample").then(function (module) {
    return module.default;
  });
});
var FormWizard = (0, _asyncComponent2.default)(function () {
  return import("../Screens/FormWizard").then(function (module) {
    return module.default;
  });
});

var ptAcknowledgment = (0, _asyncComponent2.default)(function () {
  return import("egov-ui-kit/common/propertyTax/PTAcknowledgement").then(function (module) {
    return module.default;
  });
});

var routes = [
// property tax routes
{
  path: "property-tax",
  component: PTHome,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "PT_HOME_PROPERTY_TAX",
    hideTitle: true,
    helpButton: true
  }
}, {
  path: "property-tax/assess-pay",
  component: AssessPay,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "PT_ASSESPAY_SELECTPROPERTY"
    // hideBackButton: true,
  }
}, {
  path: "property-tax/incomplete-assessments",
  component: IncompleteAssessments,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "PT_INCOMPLETE_ASSESSMENT"
    // hideBackButton: true,
  }
}, {
  path: "property-tax/completed-assessments",
  component: CompletedAssessments,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "PT_COMPLETED_ASSESSMENTS"
    // hideBackButton: true,
  }
}, {
  path: "property-tax/my-properties",
  component: MyProperties,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideTitle: true,
    title: "PT_HOME_MYPROPERTIES"
    // hideBackButton: true,
  }
}, {
  path: "property-tax/my-properties/property/:propertyId/:tenantId",
  component: Property,
  needsAuthentication: true,
  options: {
    // hideTitle:true,
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
  path: "property-tax/my-properties/reassess-property/:propertyId/:tenantId",
  component: Property,
  needsAuthentication: true,
  options: {
    hideTitle: true,
    hideFooter: true
    // hideBackButton: true,
  }
}, {
  path: "property-tax/assess-pay/search-property",
  component: SearchProperty,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "PT_PROPERTY_TAX",
    hideTitle: true,
    helpButton: true
  }
}, {
  path: "property-tax/my-receipts",
  component: MyReceipts,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "My Receipts",
    hideBackButton: true
  }
}, {
  path: "property-tax/payment-success/:propertyId/:tenantId",
  component: PaymentSuccess,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    hideTitle: true
  }
}, {
  path: "property-tax/payment-failure/:propertyId/:tenantId/:assessmentNumber/:assessmentYear/:txnAmount",
  component: PaymentFailure,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    hideTitle: true
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
  path: "propert-tax/review-property",
  component: ReviewForm,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true
  }
}, {
  path: "property-tax/past-payment",
  component: PastPayment,
  needsAuthentication: true
}, {
  path: "property-tax/payment-redirect-page",
  component: PaymentRedirectPage,
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