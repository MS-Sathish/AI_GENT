// Copyright 2017-2024 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

// import { useApi } from '@polkadot/react-hooks';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
}

function NodeName ({ className = '' }: Props): React.ReactElement<Props> {
  // const { systemName } = useApi();

  return (
    <div className={className}>
      {/* {label || ''}{systemName}{children} */}
      <p>AIGENT</p>
    </div>
  );
}

export default React.memo(NodeName);
