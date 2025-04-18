"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

require("./index.css");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelContainerStyle = {
  marginTop: window.screen.width > 768 ? "-2px" : "3px"
};

var RadioButtonForm = function RadioButtonForm(_ref) {
  var label = _ref.label,
      form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      selectedYear = _ref.selectedYear,
      handleRadioButton = _ref.handleRadioButton,
      history = _ref.history,
      resetFormWizard = _ref.resetFormWizard,
      urlToAppend = _ref.urlToAppend;

  var fields = form.fields || {};
  return (
    // <Button
    //   {...fields.button}
    //   onClick={() => {
    //     handleFieldChange("button", label);
    //     resetFormWizard();

    //     history && urlToAppend ? history.push(`${urlToAppend}&FY=${label}`) : history.push(`/property-tax/assessment-form?FY=${label}&type=new`);
    //   }}
    //   className="year-range-button"
    //   label={label}
    //   labelColor="#fe7a51"
    //   buttonStyle={{ borderRadius: "50px", border: "1px solid #fe7a51" }}
    // />
    _react2.default.createElement(
      "div",
      { className: "property-amount-radio" },
      _react2.default.createElement(
        "div",
        { className: "amt-radio", style: { padding: '5px' } },
        _react2.default.createElement("input", {
          type: "radio"
          // checked={optionSelected === "Full_Amount"}
          , onClick: handleRadioButton,
          checked: selectedYear === label,
          value: label,
          name: "radio"
        }),
        _react2.default.createElement(_translationNode2.default, {
          label: label,
          fontSize: "18px",
          color: "#484848",
          containerStyle: labelContainerStyle
        })
      )
    )
  );
};

exports.default = RadioButtonForm;

{} /* <div className="property-amount-radio">
   <div className="amt-radio">
    <input
      type="radio"
      checked={optionSelected === "Full_Amount"}
      onClick={onRadioButtonChange}
      value="Full_Amount"
      name="radio"
    />
    <Label
      label="PT_FULL_AMOUNT"
      color="#4848484"
      labelStyle={styles.radioButtonLabelStyle}
    />
   </div>
   <div className="amt-radio">
    <input
      type="radio"
      checked={optionSelected === "Partial_Amount"}
      onClick={onRadioButtonChange}
      value="Partial_Amount"
      name="radio"
    />
    <Label
      label="PT_PARTIAL_AMOUNT"
      color="#4848484"
      labelStyle={styles.radioButtonLabelStyle}
    />
   </div>
   </div> */

// onRadioButtonChange = e => {
//   let { estimationDetails } = this.props;
//   let { totalAmount } = estimationDetails[0] || {};
//   if (e.target.value === "Full_Amount") {
//     this.setState(
//       {
//         totalAmountTobePaid: totalAmount,
//         valueSelected: "Full_Amount",
//         errorText: ""
//       },
//       () => {
//         this.updateTotalAmount(this.props.totalAmountToBePaid);
//       }
//     );
//   }