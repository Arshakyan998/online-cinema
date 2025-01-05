'use client';
import { defaultHotkeys, Inspector } from 'react-dev-inspector';
import React from 'react';

const Inspect: React.FC = () => {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    console.log(
      `%c${defaultHotkeys().join(' + ')} for debuging`,
      'font-size:25px; font-weight: bold; color:red',
    );
  }, []);
  return <Inspector active={active} onActiveChange={setActive} />;
};

export default Inspect;
