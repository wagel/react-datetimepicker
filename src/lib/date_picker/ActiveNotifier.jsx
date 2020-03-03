import React from 'react';
import PropTypes from 'prop-types';

class ActiveNotifier extends React.Component {
  getDotDiv(text, style, id) {
    return (
      <div className="activeNotifier" id={id}>
        {text} <span className="dot" style={style} />
      </div>
    );
  }

  render() {
    const { selectingModeFrom } = this.props;
    const { mode } = this.props;
    const startDotStyle =
      this.props.style && this.props.style.fromDot ? this.props.style.fromDot : { backgroundColor: '#22CC7A' };
    const endDotStyle =
      this.props.style && this.props.style.toDot ? this.props.style.toDot : { backgroundColor: '#FF5B7D' };
    const startNotifierID = 'startNotifierID';
    const endNotifierID = 'endNotifierID';
    const { local } = this.props;
    if (this.props.smartMode) {
      if (selectingModeFrom && mode === 'start') {
        const label = local && local.selectingFrom ? local.selectingFrom : 'Selecting From';
        return this.getDotDiv(`${label} `, startDotStyle, startNotifierID);
      }
      if (!selectingModeFrom && mode === 'end') {
        const label = local && local.selectingTo ? local.selectingTo : 'Selecting To';
        return this.getDotDiv(`${label} `, endDotStyle, endNotifierID);
      }
    } else {
      if (mode === 'start') {
        const label = local && local.fromDate ? local.fromDate : 'From Date';
        return this.getDotDiv(`${label} `, startDotStyle, startNotifierID);
      }
      if (mode === 'end') {
        const label = local && local.toDate ? local.toDate : 'To Date';
        return this.getDotDiv(`${label} `, endDotStyle, endNotifierID);
      }
    }
    return <div />;
  }
}

ActiveNotifier.propTypes = {
  mode: PropTypes.string.isRequired,
  selectingModeFrom: PropTypes.bool.isRequired,
  smartMode: PropTypes.bool,
  style: PropTypes.object,
  local: PropTypes.object,
};
export default ActiveNotifier;
