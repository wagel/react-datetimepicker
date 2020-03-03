import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import { propValidation } from './utils/PropValidation';
import { darkTheme, lightTheme } from './utils/StyleUtils';
export const mobileBreakPoint = 680;

const styles = `
  .daterangepickercontainer {
    position: relative;
  }

  .daterangepicker {
    position: absolute;
    display: flex;
    color: inherit;
    background-color: #fff;
    border-radius: 4px;
    padding: 4px;
    margin-top: 1px;
    top: 100px;
    left: 20px;
    max-width: 680px;
    z-index: 3001;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-clip: padding-box;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }
  .daterangepicker:before,
  .daterangepicker:after {
    position: absolute;
    display: inline-block;
    border-bottom-color: rgba(0, 0, 0, 0.2);
    content: '';
  }
  .daterangepicker:before {
    top: -7px;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: 7px solid rgba(0, 0, 0, 0.15);
  }
  .daterangepicker:after {
    top: -6px;
    border-right: 6px solid transparent;
    border-bottom: 6px solid rgba(0, 0, 0, 0.3);
    border-left: 6px solid transparent;
  }

  .daterangepickerleft:before {
    right: 0px;
  }
  .daterangepickerleft:after {
    right: 0px;
  }

  .rangecontainer {
    width: 160px;
  }

  .rangebuttontextstyle {
    padding-left: 12px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-right: 12px;
  }

  .fromDateTimeContainer {
    font-size: 13px;
    width: 270px;
    margin: 4px;
  }

  .fromDateHourContainer {
    border: 1px solid #f5f5f5;
    border-radius: 4px;
  }

  .dateTimeLabel {
    text-align: center;
    font-weight: bold;
    padding-bottom: 5px;
  }

  .inputDate {
    height: 30px;
  }

  .calendarAddon {
    background-color: inherit;
  }

  .timeContainer {
    text-align: center;
    position: relative;
  }

  .timeSelectContainer {
    margin: 8px;
  }

  .timeIconStyle {
    position: absolute;
    top: 3px;
    left: 14px;
    font-style: normal;
  }

  .multipleContentOnLine {
    position: relative;
    display: inline;
    padding: 1px;
  }

  .buttonContainer {
    position: absolute;
    display: flex;
    bottom: 0;
    right: 0;
    margin-right: 13px;
    margin-left: 13px;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .buttonSeperator {
    padding-left: 5px;
    padding-right: 5px;
  }

  .applyButton {
    border-color: #4cae4c;
    color: #fff;
    font-size: 12px;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 4px;
    border: 1px solid #5cb85c;
  }

  .cancelButton {
    background-color: #fff;
    color: #333;
    font-size: 12px;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #ccc;
  }

  .maxDateLabel {
    padding: 7px;
    font-size: 10px;
  }

  .monthYearContainer {
    margin: 5px;
    margin-top: 15px;
    display: flex;
  }

  .leftChevron {
    display: grid;
    width: 25%;
    padding: 2px;
    justify-content: left;
    font-size: 14px;
  }

  .rightChevron {
    display: grid;
    width: 25%;
    padding: 2px;
    justify-content: right;
    font-size: 14px;
  }

  .calendarGrid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
  }

  .calendarGridFirefoxBelow35 {
    display: flex;
    text-align: center;
  }

  .calendarGridHeaderFirefoxBelow35 {
    width: 14%;
  }

  .calendarCell {
    padding: 5px;
  }

  .calendarCellFirefoxBelow35 {
    padding: 5px;
    width: 14%;
  }

  .activeNotifier {
    text-align: center;
    padding-bottom: 40px;
  }

  .dot {
    height: 10px;
    width: 10px;
    background-color: #12bc00;
    border-radius: 50%;
    display: inline-block;
  }
`;

class DateTimeRangeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      x: 0,
      y: 0,
      screenWidthToTheRight: 0,
      containerClassName: '',
    };
    const propValidationReturn = propValidation(this.props);
    if (propValidationReturn !== true) {
      alert(propValidationReturn);
    }
    this.resize = this.resize.bind(this);
    this.onClickContainerHandler = this.onClickContainerHandler.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.changeVisibleState = this.changeVisibleState.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    document.addEventListener('keydown', this.keyDown, false);
    this.resize();
  }

  componentWillMount() {
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('keydown', this.keyDown, false);
  }

  componentDidUpdate(prevProps) {
    // If the left mode prop has been updated from the Parent treat it like a rezise
    // and adjust the layout accordingly
    if (prevProps.leftMode != this.props.leftMode) {
      this.resize();
    }
  }

  resize() {
    const domNode = findDOMNode(this).children[0];
    const mobileModeActive = !this.props.noMobileMode; // If no mobile mode prop not set then allow mobile mode
    const mobileModeForce = this.props.forceMobileMode; // If force mobile mode prop is set then force mobile mode
    const boundingClientRect = domNode.getBoundingClientRect();
    const widthRightOfThis = window.innerWidth - boundingClientRect.x;
    if ((widthRightOfThis < mobileBreakPoint && mobileModeActive) || mobileModeForce) {
      // If in small mode put picker in middle of child
      const childMiddle = boundingClientRect.width / 2;
      const containerMiddle = 144;
      const newY = childMiddle - containerMiddle;
      this.setState({
        x: boundingClientRect.height + 5,
        y: newY,
        screenWidthToTheRight: widthRightOfThis,
        containerClassName: 'daterangepicker',
      });
    } else if (this.props.leftMode) {
      this.setState({
        x: boundingClientRect.height + 5,
        y: -660,
        screenWidthToTheRight: widthRightOfThis,
        containerClassName: 'daterangepicker daterangepickerleft',
      });
    } else {
      this.setState({
        x: boundingClientRect.height + 5,
        y: 0,
        screenWidthToTheRight: widthRightOfThis,
        containerClassName: 'daterangepicker',
      });
    }
  }

  keyDown(e) {
    if (e.keyCode === 27) {
      this.setState({ visible: false });
      document.removeEventListener('keydown', this.keyDown, false);
    }
  }

  onClickContainerHandler(event) {
    if (!this.state.visible) {
      document.addEventListener('click', this.handleOutsideClick, false);
      document.addEventListener('keydown', this.keyDown, false);
      this.changeVisibleState();
    }
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.state.visible) {
      if (this.container.contains(e.target)) {
        return;
      }
      document.removeEventListener('click', this.handleOutsideClick, false);
      this.changeVisibleState();
    }
  }

  changeVisibleState() {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  }

  shouldShowPicker() {
    const mobileModeActive = !this.props.noMobileMode; // If no mobile mode prop not set then allow mobile mode
    const mobileModeForce = this.props.forceMobileMode; // If force mobile mode prop is set then force mobile mode
    if (
      this.state.visible &&
      ((this.state.screenWidthToTheRight < mobileBreakPoint && mobileModeActive) || mobileModeForce)
    ) {
      return 'block';
    }
    if (this.state.visible) {
      return 'flex';
    }
    return 'none';
  }

  renderPicker() {
    return (
      <DateTimeRangePicker
        ranges={this.props.ranges}
        start={this.props.start}
        end={this.props.end}
        local={this.props.local}
        applyCallback={this.props.applyCallback}
        rangeCallback={this.props.rangeCallback}
        autoApply={this.props.autoApply}
        changeVisibleState={this.changeVisibleState}
        screenWidthToTheRight={this.state.screenWidthToTheRight}
        maxDate={this.props.maxDate}
        descendingYears={this.props.descendingYears}
        years={this.props.years}
        pastSearchFriendly={this.props.pastSearchFriendly}
        smartMode={this.props.smartMode}
        style={this.props.style}
        darkMode={this.props.darkMode}
        noMobileMode={this.props.noMobileMode}
        forceMobileMode={this.props.forceMobileMode}
        standalone={this.props.standalone}
      />
    );
  }

  render() {
    const showPicker = this.shouldShowPicker();
    const { x } = this.state;
    const { y } = this.state;
    const theme = this.props.darkMode ? darkTheme : lightTheme;

    // Special standalone render
    if (this.props.standalone && this.props.style && this.props.style.standaloneLayout) {
      return <div style={this.props.style.standaloneLayout}>{this.renderPicker()}</div>;
    }

    return (
      <div
        id="DateRangePickerContainer"
        className="daterangepickercontainer"
        onClick={this.onClickContainerHandler}
        ref={container => {
          this.container = container;
        }}
      >
        {this.props.children && <div id="DateRangePickerChildren">{this.props.children}</div>}
        <div>
          <div
            id="daterangepicker"
            className={this.state.containerClassName}
            style={{ top: x, left: y, display: showPicker, ...theme }}
          >
            {this.renderPicker()}
          </div>
        </div>
        <style>{styles}</style>
      </div>
    );
  }
}

DateTimeRangeContainer.propTypes = {
  ranges: PropTypes.object.isRequired,
  start: momentPropTypes.momentObj,
  end: momentPropTypes.momentObj,
  local: PropTypes.object.isRequired,
  applyCallback: PropTypes.func.isRequired,
  rangeCallback: PropTypes.func,
  autoApply: PropTypes.bool,
  maxDate: momentPropTypes.momentObj,
  descendingYears: PropTypes.bool,
  pastSearchFriendly: PropTypes.bool,
  years: PropTypes.array,
  smartMode: PropTypes.bool,
  darkMode: PropTypes.bool,
  noMobileMode: PropTypes.bool,
  forceMobileMode: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.any,
  leftMode: PropTypes.bool,
  standalone: PropTypes.bool,
};

export default DateTimeRangeContainer;
