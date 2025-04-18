"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFullRow = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _components = require("components");

var _actions = require("egov-ui-kit/redux/app/actions");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _recompose = require("recompose");

var _PTCommon = require("../../../../../../../utils/PTCommon");

var _HistoryCard = require("../../../../../Property/components/HistoryCard");

var _HistoryCard2 = _interopRequireDefault(_HistoryCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFullRow = exports.getFullRow = function getFullRow(labelKey, labelValue) {
    var rowGrid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 12;

    var subRowGrid = 1;
    if (rowGrid == 6) {
        subRowGrid = 2;
    }
    return _react2.default.createElement(
        "div",
        { className: "col-sm-" + rowGrid + " col-xs-12", style: { marginBottom: 1, marginTop: 1 } },
        _react2.default.createElement(
            "div",
            { className: "col-sm-" + 2 * subRowGrid + " col-xs-4", style: { padding: "3px 0px 0px 0px" } },
            _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: 0, color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "19px !important" },
                label: labelKey,
                fontSize: "14px"
            })
        ),
        _react2.default.createElement(
            "div",
            { className: "col-sm-" + 4 * subRowGrid + " col-xs-8", style: { padding: "3px 0px 0px 0px", paddingLeft: rowGrid == 12 ? '10px' : '15px' } },
            _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: "0.47px", color: "rgba(0, 0, 0, 1.87)", fontWeight: "400", lineHeight: "19px !important" },
                label: labelValue,
                fontSize: "14px"
            })
        )
    );
};

var AssessmentHistory = function (_Component) {
    (0, _inherits3.default)(AssessmentHistory, _Component);

    function AssessmentHistory(props) {
        (0, _classCallCheck3.default)(this, AssessmentHistory);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AssessmentHistory.__proto__ || Object.getPrototypeOf(AssessmentHistory)).call(this, props));

        _this.state = {
            items: [],
            showItems: false,
            errorMessage: "PT_ASSESSMENT_HISTORY_ERROR"
        };
        return _this;
    }

    (0, _createClass3.default)(AssessmentHistory, [{
        key: "getLatestAssessments",
        value: function getLatestAssessments() {
            var Assessments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var latestAssessments = [];
            var financialYears = [];
            Assessments.sort(function (a1, a2) {
                return a2.assessmentDate - a1.assessmentDate;
            });

            Assessments.map(function (Assessment) {
                if (!financialYears.includes(Assessment.financialYear)) {
                    latestAssessments.push(Assessment);
                    financialYears.push(Assessment.financialYear);
                }
            });
            return latestAssessments;
        }
    }, {
        key: "getTransformedAssessmentHistory",
        value: function getTransformedAssessmentHistory() {
            var _this2 = this;

            var labelStyle = {
                letterSpacing: 1.2,
                fontWeight: "600",
                lineHeight: "40px"
            };
            var buttonStyle = {
                float: 'right',
                lineHeight: "35px",
                height: "35px",
                backgroundColor: "rgb(242, 242, 242)",
                boxShadow: "none",
                border: "1px solid rgb(254, 122, 81)",
                borderRadius: "2px",
                outline: "none",
                alignItems: "right"
            };
            var _props = this.props,
                _props$Assessments = _props.Assessments,
                Assessments = _props$Assessments === undefined ? [] : _props$Assessments,
                history = _props.history,
                propertyId = _props.propertyId;


            var assessmentHistoryItems = this.getLatestAssessments(Assessments).map(function (Assessment) {
                return _react2.default.createElement(
                    "div",
                    null,
                    getFullRow("PT_HISTORY_ASSESSMENT_DATE", Assessment.assessmentDate ? (0, _PTCommon.getFormattedDate)(Assessment.assessmentDate) : "NA", 12),
                    getFullRow("PT_ASSESSMENT_NO", Assessment.assessmentNumber ? Assessment.assessmentNumber : "NA", 12),
                    getFullRow("PT_ASSESSMENT_YEAR", Assessment.financialYear ? Assessment.financialYear : "NA", 6),
                    _react2.default.createElement(
                        "div",
                        { className: "col-sm-6 col-xs-12", style: { marginBottom: 1, marginTop: 1 } },
                        _react2.default.createElement(
                            "div",
                            { className: "assess-history", style: { float: "right" } },
                            _react2.default.createElement(_components.Button, {
                                label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: _formUtils.formWizardConstants[_formUtils.PROPERTY_FORM_PURPOSE.REASSESS].parentButton, color: "rgb(254, 122, 81)", fontSize: "16px", height: "40px", labelStyle: labelStyle }),
                                buttonStyle: buttonStyle,
                                onClick: function onClick() {
                                    if (_this2.props.selPropertyDetails.status != "ACTIVE") {
                                        _this2.props.toggleSnackbarAndSetText(true, { labelName: "Property in Workflow", labelKey: "ERROR_PROPERTY_IN_WORKFLOW" }, "error");
                                    } else {
                                        history && history.push((0, _formUtils.getPropertyLink)(propertyId, Assessment.tenantId, _formUtils.PROPERTY_FORM_PURPOSE.REASSESS, Assessment.financialYear, Assessment.assessmentNumber));
                                    }
                                    // lastElement.onClick();
                                }
                            })
                        )
                    )
                );
            });
            return assessmentHistoryItems;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                _props2$propertyDetai = _props2.propertyDetails,
                propertyDetails = _props2$propertyDetai === undefined ? [] : _props2$propertyDetai,
                propertyId = _props2.propertyId,
                _props2$Assessments = _props2.Assessments,
                Assessments = _props2$Assessments === undefined ? [] : _props2$Assessments;

            if (Assessments.length > 0) {
                Assessments = this.getTransformedAssessmentHistory();
            }
            var items = this.state.showItems ? this.state.items : [];
            var errorMessage = this.state.showItems && items.length == 0 ? this.state.errorMessage : '';
            return _react2.default.createElement(_HistoryCard2.default, { header: 'PT_ASSESMENT_HISTORY', items: items, errorMessage: errorMessage, onHeaderClick: function onHeaderClick() {
                    _this3.setState({ showItems: !_this3.state.showItems, items: Assessments });
                } });
        }
    }]);
    return AssessmentHistory;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    var _ref = state.properties || {},
        propertiesById = _ref.propertiesById,
        _ref$Assessments = _ref.Assessments,
        Assessments = _ref$Assessments === undefined ? [] : _ref$Assessments;

    var propertyId = decodeURIComponent(ownProps.match.params.propertyId);
    var selPropertyDetails = propertiesById[propertyId] || {};
    var propertyDetails = selPropertyDetails.propertyDetails || [];
    return {
        selPropertyDetails: selPropertyDetails,
        propertyDetails: propertyDetails,
        propertyId: propertyId,
        Assessments: Assessments
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
            return dispatch((0, _actions.toggleSnackbarAndSetText)(open, message, error));
        }
    };
};

exports.default = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(AssessmentHistory);