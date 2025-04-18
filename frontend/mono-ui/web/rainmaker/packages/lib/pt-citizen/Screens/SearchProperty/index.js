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

var _common = require("modules/common");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _YearDialogue = require("../common/YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

var _PropertyTable = require("./components/PropertyTable");

var _PropertyTable2 = _interopRequireDefault(_PropertyTable);

var _SearchPropertyForm = require("./components/SearchPropertyForm");

var _SearchPropertyForm2 = _interopRequireDefault(_SearchPropertyForm);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertySearchFormHOC = (0, _form2.default)({
  formKey: "searchProperty",
  path: "PropertyTaxPay",
  isCoreConfiguration: true
})(_SearchPropertyForm2.default);

var SearchProperty = function (_Component) {
  (0, _inherits3.default)(SearchProperty, _Component);

  function SearchProperty(props) {
    (0, _classCallCheck3.default)(this, SearchProperty);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchProperty.__proto__ || Object.getPrototypeOf(SearchProperty)).call(this, props));

    _this.componentWillMount = function () {
      var history = _this.props.history;

      history.push('/pt-mutation/propertySearch');
    };

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          location = _this$props.location,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title,
          resetForm = _this$props.resetForm;
      var pathname = location.pathname;

      resetForm("searchProperty");
      if (!((0, _localStorageUtils.localStorageGet)("path") === pathname)) {
        title && addBreadCrumbs({ title: title, path: window.location.pathname });
      }
      _this.setState({ searchResult: [] });
    };

    _this.onResetClick = function () {
      var resetForm = _this.props.resetForm;

      resetForm("searchProperty");
    };

    _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    };

    _this.onSearchClick = function (form, formKey) {
      var _this$props2 = _this.props,
          propertiesFound = _this$props2.propertiesFound,
          fetchLocalizationLabel = _this$props2.fetchLocalizationLabel;

      var _ref = form.fields || {},
          city = _ref.city,
          ids = _ref.ids,
          oldpropertyids = _ref.oldpropertyids,
          mobileNumber = _ref.mobileNumber,
          applicationNumber = _ref.applicationNumber;

      var tableData = _this.extractTableData(propertiesFound);
      // fetchLocalizationLabel(getLocale(), city.value, city.value);

      if (!(0, _utils.validateForm)(form)) {
        _this.props.displayFormErrors(formKey);
      } else if (!oldpropertyids.value && !ids.value && !mobileNumber.value && !applicationNumber.value) {
        _this.props.toggleSnackbarAndSetText(true, {
          labelName: "Please fill atleast one field along with city",
          labelKey: "ERR_FILL_ATLEAST_ONE_FIELD_WITH_CITY"
        }, "error");
      } else {
        var queryParams = [];
        if (city.value) {
          queryParams.push({ key: "tenantId", value: city.value });
        }
        if (ids.value) {
          queryParams.push({ key: "propertyIds", value: ids.value });
        }
        if (oldpropertyids.value) {
          queryParams.push({ key: "oldpropertyids", value: oldpropertyids.value });
        }
        if (mobileNumber.value) {
          queryParams.push({ key: "mobileNumber", value: mobileNumber.value });
        }
        if (applicationNumber.value) {
          queryParams.push({ key: "acknowledgementIds", value: applicationNumber.value });
        }
        _this.setState({
          searchResult: tableData
        });
        _this.props.fetchProperties(queryParams, "citizen_search");
        _this.setState({ showTable: true });
      }
    };

    _this.extractTableData = function (properties) {
      var history = _this.props.history;

      var userType = JSON.parse((0, _localStorageUtils.getUserInfo)()).type;
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
        // const latestAssessment = getLatestPropertyDetails(propertyDetails);
        var name = property.owners[0].name;
        // const guardianName = latestAssessment.owners[0].fatherOrHusbandName;
        // let assessmentNo = latestAssessment.assessmentNumber;
        // const uuid = get(latestAssessment, "citizenInfo.uuid");

        var item = (0, _PTCommon.getRowData)(property, history);
        tableData.push(item);
        return tableData;
      }, []);
      return tableData;
    };

    _this.onActionClick = function (e) {};

    _this.onAddButtonClick = function () {
      // this.setState({
      //   dialogueOpen: true
      // });
      // const { history } = this.props;
      // history.push('/property-tax/assessment-form');

      var link = "/property-tax/assessment-form";
      var moduleName = process.env.REACT_APP_NAME === "Citizen" ? '/citizen' : '/employee';
      window.location.href = process.env.NODE_ENV === "production" ? moduleName + link : link;
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
      var pathname = location.pathname;

      var tableData = this.extractTableData(propertiesFound);
      var searchResult = this.state.searchResult;

      if (urls.length == 0 && (0, _localStorageUtils.localStorageGet)("path") === pathname) {
        urlArray = JSON.parse((0, _localStorageUtils.localStorageGet)("breadCrumbObject"));
      }
      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "screen-with-bredcrumb" },
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
        _react2.default.createElement(PropertySearchFormHOC, {
          history: this.props.history,
          onSearchClick: this.onSearchClick,
          onResetClick: this.onResetClick
        }),
        _react2.default.createElement(
          _Hidden2.default,
          { xsDown: true },
          tableData && tableData.length > 0 && showTable ? _react2.default.createElement(_PropertyTable2.default, {
            sortOnObject: "propertyId",
            tableData: tableData,
            onActionClick: this.onActionClick
          }) : null
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
          _react2.default.createElement(_common.SingleProperty, {
            data: tableData,
            action: "PT_PAYMENT_ACCESSANDPAY",
            onActionClick: this.onAddButtonClick
          })
        ),
        showTable && tableData.length === 0 && loading == false && _react2.default.createElement(
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
        _react2.default.createElement(_YearDialogue2.default, {
          open: this.state.dialogueOpen,
          history: history,
          urlToAppend: urlToAppend,
          closeDialogue: closeYearRangeDialogue
        })
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
    fetchProperties: function fetchProperties(queryObject, searchType) {
      return dispatch((0, _actions3.fetchProperties)(queryObject, searchType));
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