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

var _Screen = require("egov-ui-kit/common/common/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _components = require("egov-ui-kit/components");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _utils = require("egov-ui-kit/redux/form/utils");

var _actions3 = require("egov-ui-kit/redux/properties/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _SingleProperty = require("../SingleProperty");

var _SingleProperty2 = _interopRequireDefault(_SingleProperty);

var _YearDialogue = require("../YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

var _PropertyTable = require("./components/PropertyTable");

var _PropertyTable2 = _interopRequireDefault(_PropertyTable);

var _SearchPropertyForm = require("./components/SearchPropertyForm");

var _SearchPropertyForm2 = _interopRequireDefault(_SearchPropertyForm);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userType = (0, _localStorageUtils.getUserInfo)() && JSON.parse((0, _localStorageUtils.getUserInfo)()).type;

var PropertySearchFormHOC = (0, _form2.default)({ formKey: "searchProperty", path: "PropertyTaxPay", isCoreConfiguration: true })(_SearchPropertyForm2.default);

var SearchProperty = function (_Component) {
  (0, _inherits3.default)(SearchProperty, _Component);

  function SearchProperty(props) {
    (0, _classCallCheck3.default)(this, SearchProperty);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchProperty.__proto__ || Object.getPrototypeOf(SearchProperty)).call(this, props));

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          location = _this$props.location,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title,
          resetForm = _this$props.resetForm;

      var pathname = location && location.pathname;
      if (userType === "CITIZEN" && !((0, _localStorageUtils.localStorageGet)("path") === pathname)) {
        title && addBreadCrumbs({ title: title, path: window.location.pathname });
      }
      resetForm("searchProperty");
    };

    _this.onResetClick = function () {
      var resetForm = _this.props.resetForm;

      resetForm("searchProperty");
    };

    _this.onSearchClick = function (form, formKey) {
      var fetchLocalizationLabel = _this.props.fetchLocalizationLabel;

      var _ref = form.fields || {},
          city = _ref.city,
          ids = _ref.ids,
          oldpropertyids = _ref.oldpropertyids,
          mobileNumber = _ref.mobileNumber,
          applicationNumber = _ref.applicationNumber;

      if (!(0, _utils.validateForm)(form)) {
        _this.props.displayFormErrors(formKey);
      } else if (!oldpropertyids.value && !ids.value && !mobileNumber.value) {
        _this.props.toggleSnackbarAndSetText(true, { labelName: "Please fill atleast one field along with city", labelKey: "ERR_FILL_ATLEAST_ONE_FIELD_WITH_CITY" }, "error");
      } else {
        var queryParams = [];
        if (city && city.value) {
          queryParams.push({ key: "tenantId", value: city.value });
        }
        if (ids && ids.value) {
          queryParams.push({ key: "propertyIds", value: ids.value });
        }
        if (oldpropertyids && oldpropertyids.value) {
          queryParams.push({ key: "oldpropertyids", value: oldpropertyids.value });
        }
        if (mobileNumber && mobileNumber.value) {
          queryParams.push({ key: "mobileNumber", value: mobileNumber.value });
        }
        if (applicationNumber && applicationNumber.value) {
          queryParams.push({ key: "applicationNumber", value: applicationNumber.value });
        }
        _this.props.fetchProperties(queryParams);
        _this.setState({ showTable: true });
      }
      // fetchLocalizationLabel(getLocale(), city.value, city.value);
    };

    _this.getLink = function (userType, history, propertyId, tenantId) {
      return _react2.default.createElement(
        "a",
        {
          onClick: function onClick(e) {
            // localStorageSet("draftId", "")
            history.push("/property-tax/property/" + propertyId + "/" + tenantId);
          },
          style: {
            height: 20,
            lineHeight: "auto",
            minWidth: "inherit",
            cursor: "pointer",
            textDecoration: "underline"
          } },
        propertyId
      );
    };

    _this.extractTableData = function (properties) {
      var history = _this.props.history;

      var tableData = properties.reduce(function (tableData, property, index) {
        var propertyId = property.propertyId,
            status = property.status,
            applicationNo = property.applicationNo,
            applicationType = property.applicationType,
            date = property.date,
            propertyDetails = property.propertyDetails,
            tenantId = property.tenantId;


        if (!applicationNo) applicationNo = property.acknowldgementNumber;
        if (!date) date = (0, _commons.getDateFromEpoch)(property.auditDetails.createdTime);
        applicationType = history.location.pathname.includes('property-tax') ? 'PT' : applicationType;
        var latestAssessment = (0, _PTCommon.getLatestPropertyDetails)(propertyDetails);
        var name = latestAssessment.owners[0].name;
        // let guardianName = latestAssessment.owners[0].fatherOrHusbandName || "";
        // let assessmentNo = latestAssessment.assessmentNumber;
        // const uuid = get(latestAssessment, "citizenInfo.uuid");

        // let button = (
        //   <a
        //     onClick={
        //       userType === "CITIZEN"
        //         ? () => {
        //           // localStorageSet("draftId", "")
        //           this.setState({
        //             dialogueOpen: true,
        //             urlToAppend: `/property-tax/assessment-form?assessmentId=${assessmentNo}&isReassesment=false&uuid=${uuid}&propertyId=${propertyId}&tenantId=${tenantId}`,
        //           });
        //         }
        //         : (e) => {
        //           // localStorageSet("draftId", "")
        //           history.push(`/property-tax/property/${propertyId}/${property.tenantId}`);
        //         }
        //     }
        //     style={{
        //       height: 20,
        //       lineHeight: "auto",
        //       minWidth: "inherit",
        //       cursor: "pointer",
        //       textDecoration: "underline",
        //       fontWeight: '400',
        //       fontSize: "14px",
        //       color: 'rgba(0, 0, 0, 0.87)',
        //       lineHeight: '30px'
        //     }}>
        //     {propertyId}
        //   </a>);

        var item = {
          // applicationNo: this.getLink(userType, history, applicationNo, tenantId),
          applicationNo: _react2.default.createElement(
            "a",
            null,
            applicationNo
          ),
          propertyId: _this.getLink(userType, history, propertyId, tenantId),
          name: name,
          applicationType: applicationType,
          date: date,
          status: status

        };
        tableData.push(item);
        return tableData;
      }, []);
      return tableData;
    };

    _this.onActionClick = function (e) {
      console.log(e);
    };

    _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    };

    _this.onAddButtonClick = function () {
      _this.setState({
        dialogueOpen: true
      });
    };

    _this.onNewPropertyButtonClick = function () {
      _this.setState({
        dialogueOpen: true
      });
    };

    _this.state = {
      dialogueOpen: false,
      searchResult: [],
      showTable: false,
      urlToAppend: ""
    };
    return _this;
  }

  (0, _createClass3.default)(SearchProperty, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          urls = _props.urls,
          location = _props.location,
          history = _props.history,
          propertiesFound = _props.propertiesFound,
          loading = _props.loading;
      var _state = this.state,
          showTable = _state.showTable,
          urlToAppend = _state.urlToAppend;
      var closeYearRangeDialogue = this.closeYearRangeDialogue;

      var urlArray = [];
      var pathname = location && location.pathname;
      var tableData = this.extractTableData(propertiesFound);
      if (userType === "CITIZEN" && urls.length == 0 && (0, _localStorageUtils.localStorageGet)("path") === pathname) {
        urlArray = JSON.parse((0, _localStorageUtils.localStorageGet)("breadCrumbObject"));
      }
      return _react2.default.createElement(
        _Screen2.default,
        { loading: loading },
        _react2.default.createElement(
          "div",
          { className: "rainmaker-displayInline inner-header-style" },
          _react2.default.createElement(_translationNode2.default, {
            label: "PT_PROPERTY_TAX",
            dark: true,
            fontSize: 18,
            fontWeight: 500,
            bold: true,
            labelStyle: { marginTop: "20px" }
          }),
          _react2.default.createElement(
            "div",
            {
              className: "rainmaker-displayInline" },
            _react2.default.createElement(_components.Button, {
              Icon: _react2.default.createElement(_components.Icon, {
                action: "content",
                name: "add",
                color: "#fe7a51",
                style: { height: 22 }
              }),
              label: _react2.default.createElement(_translationNode2.default, {
                label: "PT_ADD_ASSESS_PROPERTY",
                buttonLabel: true,
                fontSize: "16px",
                color: "white"
              }),
              labelStyle: { fontSize: 12 },
              className: "new-property-assessment",
              onClick: function onClick() {
                return _this2.onAddButtonClick();
              },
              primary: true,
              fullWidth: true
            })
          )
        ),
        _react2.default.createElement(PropertySearchFormHOC, { history: this.props.history, onSearchClick: this.onSearchClick, onResetClick: this.onResetClick }),
        _react2.default.createElement(
          _Hidden2.default,
          { xsDown: true },
          !loading && showTable && tableData.length > 0 ? _react2.default.createElement(_PropertyTable2.default, { tableData: tableData, sortOnObject: "propertyId", onActionClick: this.onActionClick }) : null
        ),
        _react2.default.createElement(
          _Hidden2.default,
          { smUp: true },
          tableData && tableData.length > 0 && showTable && _react2.default.createElement(_translationNode2.default, {
            secondaryText: '(' + tableData.length + ')',
            label: "PT_SEARCH_PROPERTY_TABLE_HEADERS",
            className: "property-search-table-heading",
            fontSize: 16,
            labelStyle: {
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "0px",
              textAlign: "left",
              color: "#484848"
            }
          }),
          _react2.default.createElement(_SingleProperty2.default, {
            data: tableData,
            action: "PT_PAYMENT_ACCESSANDPAY",
            onActionClick: this.onAddButtonClick
          })
        ),
        !loading && showTable && !tableData.length && _react2.default.createElement(
          "div",
          { className: "search-no-property-found" },
          _react2.default.createElement(
            "div",
            { className: "no-search-text" },
            _react2.default.createElement(_translationNode2.default, { label: "PT_NO_PROPERTY_RECORD" })
          ),
          _react2.default.createElement(
            "div",
            { className: "new-assess-btn" },
            _react2.default.createElement(_components.Button, {
              label: _react2.default.createElement(_translationNode2.default, { label: "PT_ADD_ASSESS_PROPERTY", buttonLabel: true }),
              labelStyle: { fontSize: 12 },
              className: "new-property-assessment",
              onClick: function onClick() {
                return _this2.onAddButtonClick();
              },
              primary: true,
              fullWidth: true
            })
          )
        ),
        _react2.default.createElement(_YearDialogue2.default, { open: this.state.dialogueOpen, history: history, urlToAppend: urlToAppend, closeDialogue: closeYearRangeDialogue })
      );
    }
  }]);
  return SearchProperty;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties;
  var urls = state.app.urls;

  var _ref2 = properties && properties,
      propertiesById = _ref2.propertiesById,
      loading = _ref2.loading;

  var propertiesFound = Object.values(propertiesById);
  return { propertiesFound: propertiesFound, urls: urls, loading: loading };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    },
    displayFormErrors: function displayFormErrors(formKey) {
      return dispatch((0, _actions2.displayFormErrors)(formKey));
    },
    fetchProperties: function fetchProperties(queryObject) {
      return dispatch((0, _actions3.fetchProperties)(queryObject));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions.toggleSnackbarAndSetText)(open, message, error));
    },
    resetForm: function resetForm(formKey) {
      return dispatch((0, _actions2.resetForm)(formKey));
    },
    fetchLocalizationLabel: function fetchLocalizationLabel(locale, tenantId, moduleValue) {
      return dispatch((0, _actions.fetchLocalizationLabel)(locale, tenantId, moduleValue));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchProperty);