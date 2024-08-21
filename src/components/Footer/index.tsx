import { XOutlined  } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: '',
          title: 'Bodero',
          href: '',
          blankTarget: true,
        },
        {
          key: 'twitter',
          title: <XOutlined />,
          href: '',
          blankTarget: true,
        },
        {
          key: 'Wefi Kenya',
          title: 'Wefi Kenya',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
