import * as React from 'react';
import Tooltip, { TooltipProps } from '../../Tooltip';
import { tooltipTestkitFactory, TooltipTestkit } from '../../testkit';
import {
  tooltipTestkitFactory as tooltipEnzymeTestkitFactory,
  TooltipTestkit as EnzymeTooltipTestkit,
} from '../../testkit/enzyme';
import { mount } from 'enzyme';

async function testkits() {
  const vanilla = tooltipTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div'),
  });

  const alignment: string = vanilla.getAlignment();

  const enzyme = tooltipEnzymeTestkitFactory({
    dataHook: 'hi',
    wrapper: mount(<div />),
  });

  const maxWidth: string = enzyme.getMaxWidth();

  const vanillaUni = TooltipTestkit({
    dataHook: 'hi',
    wrapper: document.createElement('div'),
  });

  vanillaUni.getTooltipText().then(text => text.toLocaleUpperCase());

  const enzymeUni = EnzymeTooltipTestkit({
    dataHook: 'bala',
    wrapper: mount(<div />),
  });

  enzymeUni.tooltipExists().then(exists => exists.valueOf());
}

function TooltipInstanceMethods() {
  const wrapper = mount<Tooltip<TooltipProps>>(
    <Tooltip upgrade content="Content" />,
  );
  const tooltip = wrapper.instance();
  tooltip.open();
  tooltip.close();
}

function TooltipContentWithMandatoryProps() {
  return <Tooltip upgrade content="Some contenttttttt" />;
}

function TooltipContentWithAllProps() {
  return (
    <Tooltip
      upgrade
      disabled={false}
      dataHook="some-data-hook"
      size="small"
      appendTo="scrollParent"
      content="hiiiiiiiii"
      maxWidth={900}
      moveBy={{ x: 999, y: 1234 }}
      onHide={() => {}}
      onShow={() => {}}
      placement="bottom-start"
      textAlign="start"
      zIndex={1999}
    />
  );
}
