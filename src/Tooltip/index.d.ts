import * as React from 'react';
import { Placement } from 'wix-ui-core/dist/src/components/popover/Popover.d';
import { MoveByOffset } from '../common';

export type TooltipAppendTo =
  | 'window'
  | 'scrollParent'
  | 'viewport'
  | 'parent';
export type TooltipTextAlign = 'center' | 'start';
export type TooltipSize = 'small' | 'medium';

export interface TooltipProps {
  upgrade: true;
  dataHook?: string;
  content?: React.ReactNode;
  disabled?: boolean;
  textAlign?: TooltipTextAlign;
  enterDelay?: number;
  exitDelay?: number;
  moveBy?: MoveByOffset;
  appendTo?: TooltipAppendTo;
  flip?: boolean;
  fixed?: boolean;
  maxWidth?: React.CSSProperties['maxWidth'];
  onShow?: () => void;
  onHide?: () => void;
  placement?: Placement;
  size?: TooltipSize;
  zIndex?: React.CSSProperties['zIndex'];
}

export default class Tooltip<
  T extends TooltipProps
> extends React.PureComponent<T> {
  /** @deprecated use `upgrade` prop with `close` method */
  hide: T extends { upgrade: true } ? never : (props?: TooltipProps) => void;
  /** @deprecated use `upgrade` prop with `open` method */
  show: T extends { upgrade: true } ? never : (props?: TooltipProps) => void;

  close: T extends { upgrade: true } ? () => void : never;
  open: T extends { upgrade: true } ? () => void : never;
}
