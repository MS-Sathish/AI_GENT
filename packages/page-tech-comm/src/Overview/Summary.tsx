// Copyright 2017-2024 @polkadot/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { u32 } from '@polkadot/types';
import type { ComponentProps as Props } from '../types.js';

import React from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate.js';

function Summary ({ className = '', members, proposalHashes, type }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const proposalCount = useCall<u32>(api.derive[type].proposalCount);

  return (
    <SummaryBox className={className}>
      <CardSummary label={<span style={{ color: 'white' }}>{t('members')}</span>}>
        {formatNumber(members.length)}
      </CardSummary>
      <section>
        <CardSummary label={<span style={{ color: 'white' }}>{t('proposals')}</span>}>
          {proposalHashes
            ? formatNumber(proposalHashes?.length)
            : <span className='--tmp'>99</span>}
        </CardSummary>
        <CardSummary label={<span style={{ color: 'white' }}>{t('total')}</span>}>
          {proposalCount
            ? formatNumber(proposalCount)
            : <span className='--tmp'>99</span>}
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
