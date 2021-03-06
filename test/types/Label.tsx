import * as React from 'react';
import Label from '../../src/Label';
import { labelTestkitFactory } from '../../dist/testkit';
import { labelTestkitFactory as labelEnzymeTestkitFactory } from '../../dist/testkit/enzyme';
import * as enzyme from 'enzyme';




function LabelWithMandatoryProps() {
  return <Label />;
}

function LabelWithAllProps() {
  return (
    <Label
      className="class"
      dataClass="class"
      dataHook="hook"
      disabled
      ellipsis
      for="input"
      size="medium"
      id="id"
    />
  );
}

async function testkits() {
  const testkit = labelTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = labelEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });
}
