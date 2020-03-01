import React, { Component } from 'react';
import Tooltip from '../../Tooltip';

import style from './TooltipHOC.st.css';
import { dataHooks } from '../constants';

class TooltipHOC extends Component {
  static defaultProps = {
    tooltipPlacement: 'top',
    tooltipAppendTo: 'window',
  };
  render() {
    const {
      tooltipProps,
      tooltipContent,
      children,
      enabled,
      tooltipPlacement,
      tooltipFlip,
      tooltipFixed,
      tooltipAppendTo,
    } = this.props;
    return enabled ? (
      <Tooltip
        placement={tooltipPlacement}
        flip={tooltipFlip}
        fixed={tooltipFixed}
        content={tooltipContent}
        appendTo={tooltipAppendTo}
        timeout={0}
        {...tooltipProps}
        {...style('tooltip', {}, this.props)}
        dataHook={dataHooks.itemTooltip}
      >
        {children}
      </Tooltip>
    ) : (
      children
    );
  }
}
export default TooltipHOC;
