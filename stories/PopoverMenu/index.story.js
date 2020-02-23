import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/LiveCodeExample';
import {
  header,
  title as sectionTitle,
  description,
  table,
  importExample,
  columns,
  code,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

import Add from 'wix-ui-icons-common/Add';
import Edit from 'wix-ui-icons-common/Edit';
import Delete from 'wix-ui-icons-common/Delete';
import More from 'wix-ui-icons-common/More';
import IconButton from 'wix-style-react/IconButton';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import { Category } from '../storiesHierarchy';

const menuItems = [
  <PopoverMenu.MenuItem key="add" text="Add" prefixIcon={<Add />} />,
  <PopoverMenu.MenuItem key="edit" text="Edit" prefixIcon={<Edit />} />,
  <PopoverMenu.MenuItem key="delete" text="Delete" prefixIcon={<Delete />} />,
];

const commonProps = {
  appendTo: 'window',
  triggerElement: (
    <IconButton priority="secondary">
      <More />
    </IconButton>
  ),
};

const liveCode = config =>
  code({
    previewProps: {
      style: { backgroundColor: '#f0f4f7' },
    },
    compact: true,
    components: { ...baseScope, PopoverMenu },
    ...config,
  });

const example = ({ source, ...rest }) =>
  columns([description({ ...rest }), liveCode({ source })]);

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    header({
      component: <PopoverMenu {...commonProps}>{menuItems}</PopoverMenu>,

      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),

    columns([
      description({
        title: 'Description',
        text: `It is often styled as a typical push button with ChevronDown icon to hint that activating the button will display a menu.`,
      }),
    ]),

    columns([
      table({
        title: 'Menu Component',
        rows: [
          [
            <LinkTo
              kind={Category.COMPONENTS}
              story="PopoverMenu"
            >{`<PopoverMenu />`}</LinkTo>,
            'content element',
          ],
        ],
      }),
    ]),

    columns([
      table({
        title: 'Trigger Elements',
        rows: [
          [
            <LinkTo
              kind={Category.BUTTONS}
              story="5.1 Button"
            >{`<Button/>`}</LinkTo>,
            'trigger element',
          ],
          [
            <LinkTo
              kind={Category.BUTTONS}
              story="5.2 IconButton"
            >{`<IconButton/>`}</LinkTo>,
            'trigger element',
          ],
          [
            <LinkTo
              kind={Category.BUTTONS}
              story="5.3 TextButton"
            >{`<TextButton/>`}</LinkTo>,
            'trigger element',
          ],
        ],
      }),
    ]),

    importExample(examples.importExample),

    sectionTitle('Examples'),

    ...[
      {
        title: 'Plain Example',
        text: 'Plain example of PopoverMenu usage.',
        source: examples.basic,
      },
      {
        title: 'Skins',
        text: 'PopoverMenu items supports `dark` and `destructive` skins.',
        source: examples.skins,
      },
      {
        title: 'Prefix Icon',
        text: 'PopoverMenu items supports prefixIcon',
        source: examples.prefix,
      },
      {
        title: 'Text Size',
        text: 'PopoverMenu can enable small text size for its items.',
        source: examples.size,
      },
      {
        title: 'Divider',
        text: 'PopoverMenu items can be divided by using Divider.',
        source: examples.divider,
      },
      {
        title: 'Ellipsis',
        text:
          'All PopoverMenu items by default gets ellipsed, but wrapping text can be enabled too.',
        source: examples.wrap,
      },
      {
        title: 'Menu placement',
        text:
          'PopoverMenu supports 4 main placements: `left`,`rigth`, `top`, `bottom`',
        source: examples.placement,
      },
    ].map(example),
  ],
};
