import React from 'react';
import { storiesOf } from '@storybook/react';
import BaseModalLayout from '../BaseModalLayout';

const commonProps = {
  //use for repeated props across the tests (e.g. {buttonText: 'example'})
};

const tests = [
  {
    describe: 'sanity', // prop name (e.g. size)
    its: [
      {
        it: 'default', //prop variation (e.g. small)
        props: {
          // the simulation (e.g. {size: "small"})
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`BaseModal${describe ? '/' + describe : ''}`, module).add(
      it,
      () => <BaseModalLayout {...commonProps} {...props} />,
    );
  });
});
