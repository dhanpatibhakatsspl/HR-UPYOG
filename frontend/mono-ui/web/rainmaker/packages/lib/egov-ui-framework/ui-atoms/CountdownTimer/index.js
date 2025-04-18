'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var is_mounted = false;

var CountdownTimer = (0, _createReactClass2.default)({

    displayName: 'CountDownTimer',
    is_mounted: false,

    propTypes: {
        timeLeft: _propTypes2.default.number.isRequired,
        interval: _propTypes2.default.number
    },

    getDefaultProps: function getDefaultProps() {
        return {
            interval: 1000
        };
    },

    getInitialState: function getInitialState() {
        return {
            timeRemaining: this.props.timeLeft
        };
    },

    componentDidMount: function componentDidMount() {
        is_mounted = true;
        this.startTimer();
    },

    componentDidUpdate: function componentDidUpdate() {
        if (!this.state.prevTime && this.state.timeRemaining > 0 && is_mounted) {
            this.startTimer();
        }
    },

    componentWillUnmount: function componentWillUnmount() {
        clearTimeout(this.state.timeoutId);
    },

    startTimer: function startTimer() {
        var currentTime = Date.now();
        var differenceInTime = this.getDifferenceInTime(currentTime);
        var interval = this.props.interval;
        var timeRemainingInInterval = this.getTimeRemainingInInterval(interval, differenceInTime);
        var timeout = timeRemainingInInterval;
        if (timeRemainingInInterval < interval / 2.0) {
            timeout += interval;
        }
        var timeRemaining = this.getTimeRemaining(differenceInTime);
        var countdownComplete = this.state.prevTime && timeRemaining <= 0;
        if (is_mounted) {
            this.setCurrentState(countdownComplete, timeout, currentTime, timeRemaining);
        }
        if (countdownComplete && this.props.completeCallback) {
            this.props.completeCallback();
            return;
        }
        if (this.props.tickCallback) {
            this.props.tickCallback(timeRemaining);
        }
    },

    getDifferenceInTime: function getDifferenceInTime(currentTime) {
        return this.state.prevTime ? currentTime - this.state.prevTime : 0;
    },

    getTimeRemainingInInterval: function getTimeRemainingInInterval(interval, differenceInTime) {
        return interval - differenceInTime % interval;
    },

    getTimeRemaining: function getTimeRemaining(differenceInTime) {
        return Math.max(this.state.timeRemaining - differenceInTime, 0);
    },

    setCurrentState: function setCurrentState(countdownComplete, timeout, currentTime, timeRemaining) {
        if (this.state.timeoutId) {
            clearTimeout(this.state.timeoutId);
        }
        this.setState({
            timeoutId: countdownComplete ? null : setTimeout(this.startTimer, timeout),
            prevTime: currentTime,
            timeRemaining: timeRemaining
        });
    },

    getFormattedTime: function getFormattedTime(milliseconds) {

        var totalSeconds = Math.round(milliseconds / 1000);
        var finalTime = totalSeconds;
        return finalTime;
    },

    render: function render() {
        var timeRemaining = this.state.timeRemaining;
        return _react2.default.createElement(
            'div',
            { className: 'timer-wrapper' },
            _react2.default.createElement(
                'div',
                { className: 'displayTime' },
                this.getFormattedTime(timeRemaining)
            )
        );
    }
});

exports.default = CountdownTimer;