import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import Fragment from 'react-dot-fragment';
import { addFocusStyle } from '../utils/StyleUtils';

class ApplyCancelButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverColourApply: '#22CC7A',
      hoverColourCancel: '#fff',
      applyFocus: false,
      cancelFocus: false,
    };
    this.bindToFunctions();
  }

  bindToFunctions() {
    this.mouseEnterApply = this.mouseEnterApply.bind(this);
    this.mouseLeaveApply = this.mouseLeaveApply.bind(this);
    this.mouseEnterCancel = this.mouseEnterCancel.bind(this);
    this.mouseLeaveCancel = this.mouseLeaveCancel.bind(this);
    this.cancelPressed = this.cancelPressed.bind(this);
    this.applyPressed = this.applyPressed.bind(this);
    this.applyOnKeyPress = this.applyOnKeyPress.bind(this);
    this.cancelOnKeyPress = this.cancelOnKeyPress.bind(this);
    this.applyOnFocus = this.applyOnFocus.bind(this);
    this.applyOnBlur = this.applyOnBlur.bind(this);
    this.cancelOnBlur = this.cancelOnBlur.bind(this);
    this.cancelOnFocus = this.cancelOnFocus.bind(this);
  }

  mouseEnterApply() {
    this.setState({ hoverColourApply: '#15A761' });
  }

  mouseLeaveApply() {
    this.setState({ hoverColourApply: '#22CC7A' });
  }

  mouseEnterCancel() {
    this.setState({ hoverColourCancel: '#D9E0E7' });
  }

  mouseLeaveCancel() {
    this.setState({ hoverColourCancel: '#fff' });
  }

  cancelPressed() {
    this.props.changeVisibleState();
  }

  applyPressed() {
    this.props.applyCallback();
  }

  applyOnFocus() {
    this.setState({ applyFocus: true });
  }

  applyOnBlur() {
    this.setState({ applyFocus: false });
  }

  cancelOnFocus() {
    this.setState({ cancelFocus: true });
  }

  cancelOnBlur() {
    this.setState({ cancelFocus: false });
  }

  isSpaceBarOrEnterPressed(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      return true;
    }
    return false;
  }

  applyOnKeyPress(e) {
    if (this.isSpaceBarOrEnterPressed(e)) {
      this.props.applyCallback();
    }
  }

  cancelOnKeyPress(e) {
    if (this.isSpaceBarOrEnterPressed(e)) {
      this.props.changeVisibleState();
    }
  }

  renderButton(className, onMouseEnter, onMouseLeave, onClick, style, onKeyDown, onFocus, onBlur, text) {
    let styleLocal;
    if (text === 'Apply') {
      styleLocal = addFocusStyle(this.state.applyFocus, style);
    } else {
      styleLocal = addFocusStyle(this.state.cancelFocus, style);
    }
    return (
      <div
        className={className}
        role="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={styleLocal}
        onKeyDown={onKeyDown}
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {text}
      </div>
    );
  }

  getMaxDateBox() {
    if (this.props.maxDate) {
      const label = this.props.local && this.props.local.maxDate ? this.props.local.maxDate : 'Max Date';
      return (
        <div className="maxDateLabel">
          {label}: {this.props.maxDate.format(this.props.local.format)}
        </div>
      );
    }
  }

  renderButtons() {
    let applyButton;
    let closeButtonText = this.props.local && this.props.local.close ? this.props.local.close : 'Close';
    if (!this.props.autoApply) {
      applyButton = this.renderButton(
        'buttonSeperator applyButton',
        this.mouseEnterApply,
        this.mouseLeaveApply,
        this.applyPressed,
        { backgroundColor: this.state.hoverColourApply },
        this.applyOnKeyPress,
        this.applyOnFocus,
        this.applyOnBlur,
        this.props.local && this.props.local.apply ? this.props.local.apply : 'Apply',
      );
      closeButtonText = this.props.local && this.props.local.cancel ? this.props.local.cancel : 'Cancel';
    }
    const closeButton = this.renderButton(
      'buttonSeperator cancelButton',
      this.mouseEnterCancel,
      this.mouseLeaveCancel,
      this.cancelPressed,
      { backgroundColor: this.state.hoverColourCancel },
      this.cancelOnKeyPress,
      this.cancelOnFocus,
      this.cancelOnBlur,
      closeButtonText,
    );
    return (
      <Fragment>
        {applyButton}
        {!this.props.standalone ? closeButton : null}
      </Fragment>
    );
  }

  render() {
    const maxDateBox = this.getMaxDateBox();
    const buttons = this.renderButtons();
    let style;
    if (this.props.standalone) {
      style = { position: 'unset', float: 'right' };
    }
    return (
      <div id="buttonContainer" className="buttonContainer" style={style}>
        {maxDateBox}
        {buttons}
      </div>
    );
  }
}

ApplyCancelButtons.propTypes = {
  local: PropTypes.object,
  maxDate: momentPropTypes.momentObj,
  applyCallback: PropTypes.func.isRequired,
  changeVisibleState: PropTypes.func.isRequired,
  autoApply: PropTypes.bool,
  standalone: PropTypes.bool,
};
export default ApplyCancelButtons;
