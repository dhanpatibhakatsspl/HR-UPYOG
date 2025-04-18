"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _reactRouterDom = require("react-router-dom");

var _common = require("modules/common");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/properties/actions");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _TransformedAssessments = require("../common/TransformedAssessments");

var _Home = require("@material-ui/icons/Home");

var _Home2 = _interopRequireDefault(_Home);

var _CreditCard = require("@material-ui/icons/CreditCard");

var _CreditCard2 = _interopRequireDefault(_CreditCard);

var _citizenSearchFunctions = require("egov-pt/ui-config/screens/specs/pt-mutation/searchResource/citizenSearchFunctions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyle = {
  width: "45px",
  height: "45px",
  color: "#fe7a51"
};

var listIconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit"
};

var labelContainerStyle = {
  marginTop: "25px"
};

var innerDivStyle = {
  padding: "20px 56px 20px 0px",
  borderBottom: "1px solid #e0e0e0"
};

var labelStyle = {
  letterSpacing: 0.6,
  color: "rgba(0, 0, 0, 0.8700000047683716)",
  fontSize: 14,
  bold: true
};

var PTHome = function (_Component) {
  (0, _inherits3.default)(PTHome, _Component);

  function PTHome(props) {
    (0, _classCallCheck3.default)(this, PTHome);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PTHome.__proto__ || Object.getPrototypeOf(PTHome)).call(this, props));

    _this.iconStyle = {
      color: "#fe7a51",
      height: 30,
      width: 30,
      overflow: "visible"
    };

    _this.getCardItems = function () {
      var _this$props = _this.props,
          numProperties = _this$props.numProperties,
          numDrafts = _this$props.numDrafts,
          myApplicationsCount = _this$props.myApplicationsCount;

      return [{
        label: "PT_PAYMENT_PAY_PROPERTY_TAX",
        icon: _react2.default.createElement(_components.Icon, { style: iconStyle, action: "custom", name: "home-city-outline" }),
        route: "/pt-mutation/propertySearch"
      }, {
        label: "PT_MY_PROPERTY_SCREEN_HEADER",
        icon: _react2.default.createElement(_components.Icon, { style: iconStyle, action: "custom", name: "home-account" }),
        dynamicArray: [numProperties],
        route: "/property-tax/my-properties"
      }, {
        label: "PT_MUTATION_MY_APPLICATIONS",
        icon: _react2.default.createElement(_components.Icon, { style: iconStyle, action: "custom", name: "home-account" }),
        dynamicArray: [myApplicationsCount],
        route: "/pt-mutation/my-applications"
      }];
    };

    _this.getlistItems = function () {
      var numDrafts = _this.props.numDrafts;

      return [
      /*
      Assessment IS REMOVED FROM PT2.0
      {
        primaryText: (
          <Label label="PT_COMPLETED_ASSESSMENTS" labelStyle={labelStyle} />
        ),
        route: "/property-tax/completed-assessments",
        // leftIcon: (
        //   <div style={listIconStyle}>
        //     <Icon action="action" name="done" />
        //   </div>
        // ),
        rightIcon: (
          <div style={listIconStyle}>
            <Icon action="hardware" name="keyboard-arrow-right" />
          </div>
        )
      }, */
      /*  
      DRAFTS IS REMOVED FROM PT2.2
      
      {
           primaryText: (
             <Label
               label="PT_INCOMPLETE_ASSESSMENT"
               dynamicArray={[numDrafts]}
               labelStyle={labelStyle}
             />
           ),
           route: "/property-tax/incomplete-assessments",
           rightIcon: (
             <div style={listIconStyle}>
               <Icon action="hardware" name="keyboard-arrow-right" />
             </div>
           )
         }, */
      {
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_HOW_IT_WORKS", labelStyle: labelStyle }),
        route: "/property-tax/how-it-works",
        rightIcon: _react2.default.createElement(
          "div",
          { style: listIconStyle },
          _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right" })
        )
      }, {
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_EXAMPLE", labelStyle: labelStyle }),
        route: "/property-tax/pt-examples",
        rightIcon: _react2.default.createElement(
          "div",
          { style: listIconStyle },
          _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right" })
        )
      }];
    };

    _this.componentDidMount = function () {
      var _this$props2 = _this.props,
          addBreadCrumbs = _this$props2.addBreadCrumbs,
          title = _this$props2.title,
          location = _this$props2.location,
          fetchProperties = _this$props2.fetchProperties,
          userInfo = _this$props2.userInfo;
      var pathname = location.pathname;

      var url = pathname && pathname.split("/").pop();
      (title || url) && url === "property-tax" && addBreadCrumbs({ title: "", path: "" });
      fetchProperties([]);
      (0, _citizenSearchFunctions.fetchData)(null, null, _store2.default.dispatch);
    };

    _this.handleItemClick = function (item, index) {
      var route = item.route;

      _this.props.history.push(route);
    };

    _this.state = {
      dialogueOpen: false
    };
    return _this;
  }

  (0, _createClass3.default)(PTHome, [{
    key: "render",
    value: function render() {
      var getlistItems = this.getlistItems,
          handleItemClick = this.handleItemClick,
          getCardItems = this.getCardItems;
      var _props = this.props,
          loading = _props.loading,
          history = _props.history;

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "pt-home-screen" },
        _react2.default.createElement(_common.ModuleLandingPage, { items: getCardItems(), history: history }),
        _react2.default.createElement(
          "div",
          { style: { padding: "0px 8px" } },
          _react2.default.createElement(_components.Card, {
            className: "property-tax-card",
            textChildren: _react2.default.createElement(_components.List, {
              innerDivStyle: innerDivStyle,
              onItemClick: handleItemClick,
              listItemStyle: {
                padding: "0px 20px",
                borderWidth: "10px 10px 0px"
              },
              nestedListStyle: { padding: "0px", background: "#f2f2f2" },
              autoGenerateNestedIndicator: false,
              primaryTogglesNestedList: true,
              items: getlistItems()
            })
          })
        )
      );
    }
  }]);
  return PTHome;
}(_react.Component);

var getTransformedItems = function getTransformedItems(propertiesById) {
  return propertiesById && Object.values(propertiesById).reduce(function (acc, curr) {
    var propertyDetail = curr.propertyDetails && curr.propertyDetails.map(function (item) {
      return {
        consumerCode: curr.propertyId + ":" + item.assessmentNumber
      };
    });
    acc = [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(propertyDetail));
    return acc;
  }, []);
};

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties,
      screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var _preparedFinalObject$ = preparedFinalObject.myApplicationsCount,
      myApplicationsCount = _preparedFinalObject$ === undefined ? 0 : _preparedFinalObject$;

  var _ref = properties || {},
      propertiesById = _ref.propertiesById,
      loading = _ref.loading;

  var numProperties = propertiesById && Object.keys(propertiesById).length;
  return { numProperties: numProperties, loading: loading, myApplicationsCount: myApplicationsCount };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions2.addBreadCrumbs)(url));
    },
    fetchProperties: function fetchProperties(queryObjectProperty) {
      return dispatch((0, _actions.fetchProperties)(queryObjectProperty));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PTHome);