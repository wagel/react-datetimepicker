"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mobileBreakPoint = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _DateTimeRangePicker = require("./DateTimeRangePicker");

var _PropValidation = require("./utils/PropValidation");

var _StyleUtils = require("./utils/StyleUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var mobileBreakPoint = 680;
exports.mobileBreakPoint = mobileBreakPoint;
var styles = "\n  .daterangepickercontainer {\n    position: relative;\n  }\n\n  .daterangepicker {\n    position: absolute;\n    display: flex;\n    color: inherit;\n    background-color: #fff;\n    border-radius: 20px;\n    padding: 10px;\n    margin-top: 1px;\n    top: 100px;\n    left: 20px;\n    max-width: 680px;\n    z-index: 3001;\n    background-clip: padding-box;\n  }\n  .daterangepicker:before,\n  .daterangepicker:after {\n    position: absolute;\n    display: inline-block;\n    border-bottom-color: #303a4d;\n    content: '';\n    left: 20px;\n  }\n  .daterangepicker:before {\n    top: -7px;\n    border-right: 7px solid transparent;\n    border-left: 7px solid transparent;\n    border-bottom: 7px solid #303a4d;\n  }\n  .daterangepicker:after {\n    top: -6px;\n    border-right: 6px solid transparent;\n    border-bottom: 6px solid #303a4d;\n    border-left: 6px solid transparent;\n  }\n\n  .daterangepickerleft:before {\n    right: 20px;\n  }\n  .daterangepickerleft:after {\n    right: 20px;\n  }\n\n  .rangecontainer {\n    width: 160px;\n  }\n\n  .rangebuttontextstyle {\n    padding-left: 12px;\n    padding-top: 3px;\n    padding-bottom: 3px;\n    padding-right: 12px;\n  }\n\n  .fromDateTimeContainer {\n    font-size: 14px;\n    width: 270px;\n    margin: 4px;\n  }\n\n  .fromDateHourContainer {\n  }\n\n  .dateTimeLabel {\n    text-align: center;\n    font-weight: bold;\n    padding-bottom: 5px;\n  }\n\n  .inputDate {\n    height: 30px;\n  }\n\n  .calendarAddon {\n    background-color: inherit;\n  }\n\n  .timeContainer {\n    text-align: center;\n    position: relative;\n  }\n\n  .timeSelectContainer {\n    margin: 8px;\n  }\n\n  .timeIconStyle {\n    position: absolute;\n    top: 3px;\n    left: 14px;\n    font-style: normal;\n  }\n\n  .multipleContentOnLine {\n    position: relative;\n    display: inline;\n    padding: 1px;\n  }\n\n  .buttonContainer {\n    position: absolute;\n    display: flex;\n    bottom: 0;\n    right: 0;\n    margin-right: 13px;\n    margin-left: 13px;\n    margin-bottom: 10px;\n    margin-top: 10px;\n  }\n\n  .buttonSeperator {\n    padding-left: 5px;\n    padding-right: 5px;\n  }\n\n  .applyButton {\n    border-color: #22CC7A;\n    color: #fff;\n    font-size: 14px;\n    border-radius: 20px;\n    padding: 5px 10px;\n    cursor: pointer;\n    margin-right: 4px;\n  }\n\n  .cancelButton {\n    background-color: #fff;\n    color: #212734;\n    font-size: 14px;\n    border-radius: 20px;\n    padding: 5px 10px;\n    cursor: pointer;\n  }\n\n  .maxDateLabel {\n    padding: 7px;\n    font-size: 10px;\n  }\n\n  .monthYearContainer {\n    margin: 5px;\n    margin-top: 15px;\n    display: flex;\n  }\n\n  .leftChevron {\n    display: grid;\n    width: 25%;\n    padding: 2px;\n    justify-content: left;\n    font-size: 14px;\n  }\n\n  .rightChevron {\n    display: grid;\n    width: 25%;\n    padding: 2px;\n    justify-content: right;\n    font-size: 14px;\n  }\n\n  .calendarGrid {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n    text-align: center;\n  }\n\n  .calendarGridFirefoxBelow35 {\n    display: flex;\n    text-align: center;\n  }\n\n  .calendarGridHeaderFirefoxBelow35 {\n    width: 14%;\n  }\n\n  .calendarCell {\n    padding: 5px;\n  }\n\n  .calendarCellFirefoxBelow35 {\n    padding: 5px;\n    width: 14%;\n  }\n\n  .activeNotifier {\n    text-align: center;\n    padding-bottom: 40px;\n  }\n\n  .dot {\n    height: 10px;\n    width: 10px;\n    background-color: #12bc00;\n    border-radius: 50%;\n    display: inline-block;\n  }\n";

var DateTimeRangeContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(DateTimeRangeContainer, _React$Component);

  function DateTimeRangeContainer(props) {
    var _this;

    _classCallCheck(this, DateTimeRangeContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateTimeRangeContainer).call(this, props));
    _this.state = {
      visible: false,
      x: 0,
      y: 0,
      screenWidthToTheRight: 0,
      containerClassName: ''
    };
    var propValidationReturn = (0, _PropValidation.propValidation)(_this.props);

    if (propValidationReturn !== true) {
      alert(propValidationReturn);
    }

    _this.resize = _this.resize.bind(_assertThisInitialized(_this));
    _this.onClickContainerHandler = _this.onClickContainerHandler.bind(_assertThisInitialized(_this));
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_assertThisInitialized(_this));
    _this.changeVisibleState = _this.changeVisibleState.bind(_assertThisInitialized(_this));
    _this.keyDown = _this.keyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DateTimeRangeContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.resize);
      document.addEventListener('keydown', this.keyDown, false);
      this.resize();
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      window.removeEventListener('resize', this.resize);
      document.removeEventListener('keydown', this.keyDown, false);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // If the left mode prop has been updated from the Parent treat it like a rezise
      // and adjust the layout accordingly
      if (prevProps.leftMode != this.props.leftMode) {
        this.resize();
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var domNode = (0, _reactDom.findDOMNode)(this).children[0];
      var mobileModeActive = !this.props.noMobileMode; // If no mobile mode prop not set then allow mobile mode

      var mobileModeForce = this.props.forceMobileMode; // If force mobile mode prop is set then force mobile mode

      var boundingClientRect = domNode.getBoundingClientRect();
      var widthRightOfThis = window.innerWidth - boundingClientRect.x;

      if (widthRightOfThis < mobileBreakPoint && mobileModeActive || mobileModeForce) {
        // If in small mode put picker in middle of child
        var childMiddle = boundingClientRect.width / 2;
        var containerMiddle = 144;
        var newY = childMiddle - containerMiddle;
        this.setState({
          x: boundingClientRect.height + 5,
          y: newY,
          screenWidthToTheRight: widthRightOfThis,
          containerClassName: 'daterangepicker'
        });
      } else if (this.props.leftMode) {
        this.setState({
          x: boundingClientRect.height + 5,
          y: -660,
          screenWidthToTheRight: widthRightOfThis,
          containerClassName: 'daterangepicker daterangepickerleft'
        });
      } else {
        this.setState({
          x: boundingClientRect.height + 5,
          y: 0,
          screenWidthToTheRight: widthRightOfThis,
          containerClassName: 'daterangepicker'
        });
      }
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      if (e.keyCode === 27) {
        this.setState({
          visible: false
        });
        document.removeEventListener('keydown', this.keyDown, false);
      }
    }
  }, {
    key: "onClickContainerHandler",
    value: function onClickContainerHandler(event) {
      if (!this.state.visible) {
        document.addEventListener('click', this.handleOutsideClick, false);
        document.addEventListener('keydown', this.keyDown, false);
        this.changeVisibleState();
      }
    }
  }, {
    key: "handleOutsideClick",
    value: function handleOutsideClick(e) {
      // ignore clicks on the component itself
      if (this.state.visible) {
        if (this.container.contains(e.target)) {
          return;
        }

        document.removeEventListener('click', this.handleOutsideClick, false);
        this.changeVisibleState();
      }
    }
  }, {
    key: "changeVisibleState",
    value: function changeVisibleState() {
      this.setState(function (prevState) {
        return {
          visible: !prevState.visible
        };
      });
    }
  }, {
    key: "shouldShowPicker",
    value: function shouldShowPicker() {
      var mobileModeActive = !this.props.noMobileMode; // If no mobile mode prop not set then allow mobile mode

      var mobileModeForce = this.props.forceMobileMode; // If force mobile mode prop is set then force mobile mode

      if (this.state.visible && (this.state.screenWidthToTheRight < mobileBreakPoint && mobileModeActive || mobileModeForce)) {
        return 'block';
      }

      if (this.state.visible) {
        return 'flex';
      }

      return 'none';
    }
  }, {
    key: "renderPicker",
    value: function renderPicker() {
      return _react.default.createElement(_DateTimeRangePicker.DateTimeRangePicker, {
        ranges: this.props.ranges,
        start: this.props.start,
        end: this.props.end,
        local: this.props.local,
        applyCallback: this.props.applyCallback,
        rangeCallback: this.props.rangeCallback,
        autoApply: this.props.autoApply,
        changeVisibleState: this.changeVisibleState,
        screenWidthToTheRight: this.state.screenWidthToTheRight,
        maxDate: this.props.maxDate,
        descendingYears: this.props.descendingYears,
        years: this.props.years,
        pastSearchFriendly: this.props.pastSearchFriendly,
        smartMode: this.props.smartMode,
        style: this.props.style,
        darkMode: this.props.darkMode,
        noMobileMode: this.props.noMobileMode,
        forceMobileMode: this.props.forceMobileMode,
        standalone: this.props.standalone
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var showPicker = this.shouldShowPicker();
      var x = this.state.x;
      var y = this.state.y;
      var theme = this.props.darkMode ? _StyleUtils.darkTheme : _StyleUtils.lightTheme; // Special standalone render

      if (this.props.standalone && this.props.style && this.props.style.standaloneLayout) {
        return _react.default.createElement("div", {
          style: this.props.style.standaloneLayout
        }, this.renderPicker());
      }

      return _react.default.createElement("div", {
        id: "DateRangePickerContainer",
        className: "daterangepickercontainer",
        onClick: this.onClickContainerHandler,
        ref: function ref(container) {
          _this2.container = container;
        }
      }, this.props.children && _react.default.createElement("div", {
        id: "DateRangePickerChildren"
      }, this.props.children), _react.default.createElement("div", null, _react.default.createElement("div", {
        id: "daterangepicker",
        className: this.state.containerClassName,
        style: _objectSpread({
          top: x,
          left: y,
          display: showPicker
        }, theme)
      }, this.renderPicker())), _react.default.createElement("style", null, styles));
    }
  }]);

  return DateTimeRangeContainer;
}(_react.default.Component);

DateTimeRangeContainer.propTypes = {
  ranges: _propTypes.default.object.isRequired,
  start: _reactMomentProptypes.default.momentObj,
  end: _reactMomentProptypes.default.momentObj,
  local: _propTypes.default.object.isRequired,
  applyCallback: _propTypes.default.func.isRequired,
  rangeCallback: _propTypes.default.func,
  autoApply: _propTypes.default.bool,
  maxDate: _reactMomentProptypes.default.momentObj,
  descendingYears: _propTypes.default.bool,
  pastSearchFriendly: _propTypes.default.bool,
  years: _propTypes.default.array,
  smartMode: _propTypes.default.bool,
  darkMode: _propTypes.default.bool,
  noMobileMode: _propTypes.default.bool,
  forceMobileMode: _propTypes.default.bool,
  style: _propTypes.default.object,
  children: _propTypes.default.any,
  leftMode: _propTypes.default.bool,
  standalone: _propTypes.default.bool
};
var _default = DateTimeRangeContainer;
exports.default = _default;