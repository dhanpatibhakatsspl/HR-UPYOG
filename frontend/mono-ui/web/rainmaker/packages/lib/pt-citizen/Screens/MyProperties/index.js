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

var _Hidden = require("@material-ui/core/Hidden");

var _Hidden2 = _interopRequireDefault(_Hidden);

var _components = require("components");

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/properties/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _formActionUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _common = require("modules/common");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _AssessmentList = require("../common/AssessmentList");

var _AssessmentList2 = _interopRequireDefault(_AssessmentList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var innerDivStyle = {
  paddingTop: "16px",
  paddingLeft: 0,
  borderBottom: "1px solid #e0e0e0"
};

var IconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit"
};

var MyProperties = function (_Component) {
  (0, _inherits3.default)(MyProperties, _Component);

  function MyProperties(props) {
    (0, _classCallCheck3.default)(this, MyProperties);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyProperties.__proto__ || Object.getPrototypeOf(MyProperties)).call(this, props));

    _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    };

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title,
          fetchProperties = _this$props.fetchProperties,
          userInfo = _this$props.userInfo,
          renderCustomTitle = _this$props.renderCustomTitle,
          numProperties = _this$props.numProperties;

      fetchProperties([]); //Unnecessary API call to prevent page break on reload
      renderCustomTitle(numProperties);
      title && addBreadCrumbs({ title: title, path: window.location.pathname });
    };

    _this.onNewPropertyButtonClick = function () {

      var link = "/property-tax/assessment-form";
      (0, _formActionUtils.routeTo)(link);
    };

    _this.onListItemClick = function (item) {
      var propertyId = item.route,
          tenantId = item.tenantId;

      _this.props.history.push("/property-tax/my-properties/property/" + encodeURIComponent(propertyId) + "/" + tenantId);
    };

    _this.state = {
      dialogueOpen: false,
      items: [{
        primaryText: _react2.default.createElement(_translationNode2.default, {
          label: "EB-154, Maya Enclave, Jail Road, Harinagar",
          fontSize: "16px",
          color: "#484848",
          bold: true
        }),
        route: "/my-properties/property",
        secondaryText: "Property ID: PQL-98-876"
      }, {
        primaryText: _react2.default.createElement(_translationNode2.default, {
          label: "P-9/2, Balwinder Colony, Palwal Road, Indirapuram",
          fontSize: "16px",
          color: "#484848",
          bold: true
        }),
        route: "/my-properties/property",
        secondaryText: "Property ID: JML-34-756"
      }]
    };
    return _this;
  }

  (0, _createClass3.default)(MyProperties, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          history = _props.history,
          transformedPropertiesWeb = _props.transformedPropertiesWeb,
          transformedPropertiesMobile = _props.transformedPropertiesMobile,
          loading = _props.loading;


      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "screen-with-bredcrumb" },
        _react2.default.createElement(_components.BreadCrumbs, { url: urls, history: history }),
        _react2.default.createElement(
          _Hidden2.default,
          { xsDown: true },
          _react2.default.createElement(_AssessmentList2.default
          // pageTitle={`My Properties (${numProperties})`}
          , { onItemClick: this.onListItemClick,
            innerDivStyle: innerDivStyle,
            items: transformedPropertiesWeb,
            history: this.props.history,
            noAssessmentMessage: "PT_NO_ASSESSMENT_MESSAGE3",
            button: true,
            yearDialogue: this.state.dialogueOpen,
            closeDialogue: this.closeYearRangeDialogue,
            onNewPropertyButtonClick: this.onNewPropertyButtonClick
          })
        ),
        _react2.default.createElement(
          _Hidden2.default,
          { smUp: true },
          _react2.default.createElement(_common.SingleProperty, {
            data: transformedPropertiesMobile,
            action: "PT_VIEW_DETAILS",
            history: history
            // onActionClick={this.onListItemClick}
          })
        )
      );
    }
  }]);
  return MyProperties;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var properties = state.properties,
      common = state.common;
  var urls = state.app.urls;
  var cities = common.cities;

  var _ref = properties || {},
      loading = _ref.loading,
      propertiesById = _ref.propertiesById;

  var numProperties = propertiesById && Object.keys(propertiesById).length;
  var transformedPropertiesMobile = Object.values(propertiesById).map(function (property, index) {
    var date = (0, _commons.getDateFromEpoch)(property.auditDetails.createdTime);
    var userType = JSON.parse((0, _localStorageUtils.getUserInfo)()).type;
    var history = ownProps.history;

    return (0, _PTCommon.getRowData)(property, history);
  });
  var transformedPropertiesWeb = Object.values(propertiesById).map(function (property, index) {
    return {
      primaryText: _react2.default.createElement(_translationNode2.default, {
        label: (0, _commons.getCommaSeperatedAddress)(property.address, cities),
        fontSize: "16px",
        color: "#484848",
        bold: true,
        labelStyle: { letterSpacing: 0.6 }
      }),
      secondaryText: _react2.default.createElement(
        "div",
        { className: "rainmaker-displayInline", style: { height: "25px !important", marginTop: "0px !important" } },
        _react2.default.createElement(_translationNode2.default, {
          label: "PT_PROPERTY_ASSESSMENT_ID",
          color: "#484848",
          dark: true,
          labelStyle: { letterSpacing: 0.5 }
        }),
        _react2.default.createElement(_translationNode2.default, {
          label: property.propertyId,
          dark: true,
          color: "#484848",
          labelStyle: { letterSpacing: 0.5, marginLeft: 5 }
        })
      ),
      rightIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_components.Icon, {
          action: "hardware",
          name: "keyboard-arrow-right",
          color: "#767676"
        })
      ),
      route: property.propertyId,
      tenantId: property.tenantId,
      modifiedTime: property.auditDetails.lastModifiedTime
    };
  });

  var sortedProperties = (0, _orderBy2.default)(transformedPropertiesWeb, ["modifiedTime"], ["desc"]);

  return {
    urls: urls,
    transformedPropertiesWeb: sortedProperties,
    transformedPropertiesMobile: (0, _orderBy2.default)(transformedPropertiesMobile, ["modifiedTime"], ["desc"]),
    loading: loading,
    numProperties: numProperties
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    },
    fetchProperties: function fetchProperties(queryObjectProperty) {
      return dispatch((0, _actions2.fetchProperties)(queryObjectProperty));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MyProperties);