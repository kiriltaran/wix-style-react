import React from 'react';
import Avatar from '..';
import { createRendererWithUniDriver } from '../../../test/utils/unit';
import avatarUniDriverFactory from '../Avatar.uni.driver';
import PhotoCamera from 'wix-ui-icons-common/PhotoCamera';

describe('Avatar', () => {
  const createDriver = createRendererWithUniDriver(avatarUniDriverFactory);

  it('should have correct displayName', async () => {
    expect(Avatar.displayName).toEqual('Avatar');
  });

  it('should invoke onIndicationClick prop', async () => {
    const onClick = jest.fn();
    const { driver } = createDriver(
      <Avatar
        onIndicationClick={onClick}
        indication={<PhotoCamera size={24} />}
      />,
    );

    await driver.clickIndication();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should invoke onClick prop', async () => {
    const onClick = jest.fn();
    const { driver } = createDriver(<Avatar onClick={onClick} />);

    await driver.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render indication', async () => {
    const { driver } = createDriver(
      <Avatar indication={<PhotoCamera size={24} />} />,
    );

    expect(await driver.indicationExists()).toBe(true);
  });

  it('should render indication onHover', async () => {
    const { driver } = createDriver(
      <Avatar showIndicationOnHover indication={<PhotoCamera size={24} />} />,
    );

    expect(await driver.indicationExists()).toBe(false);

    await driver.hover();

    expect(await driver.indicationExists()).toBe(true);
  });
});
