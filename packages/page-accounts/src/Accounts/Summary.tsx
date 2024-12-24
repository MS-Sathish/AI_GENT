// Copyright 2017-2024 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountBalance } from '../types.js';

import React from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { FormatBalance } from '@polkadot/react-query';

import { useTranslation } from '../translate.js';

interface Props {
  className?: string;
  balance?: AccountBalance;
}

function Summary ({ balance, className }: Props) {
  const { t } = useTranslation();

  return (
    <SummaryBox className={className}>
      <CardSummary label={<span style={{ color: 'white' }}>{t('total balance')}</span>}>
        <FormatBalance
          className={balance ? '' : '--tmp'}
          value={balance?.total || 1}
        />
      </CardSummary>
      <CardSummary
        className='media--900'
        label={<span style={{ color: 'white' }}>{t('total transferable')}</span>}
      >
        <FormatBalance
          className={balance ? '' : '--tmp'}
          value={balance?.transferable || 1}
        />
      </CardSummary>
      <CardSummary label={<span style={{ color: 'white' }}>{t('total locked')}</span>}>
        <FormatBalance
          className={balance ? '' : '--tmp'}
          value={balance?.locked || 1}
        />
      </CardSummary>
      {balance?.bonded.gtn(0) &&
        <CardSummary
          className='media--1100'
          label={<span style={{ color: 'white' }}>{t('bonded')}</span>}
        >
          <FormatBalance value={balance.bonded} />
        </CardSummary>}
      {balance?.redeemable.gtn(0) &&
        <CardSummary
          className='media--1500'
          label={<span style={{ color: 'white' }}>{t('redeemable')}</span>}
        >
          <FormatBalance value={balance.redeemable} />
        </CardSummary>}
      {balance?.unbonding.gtn(0) &&
        <CardSummary
          className='media--1300'
          label={<span style={{ color: 'white' }}>{t('unbonding')}</span>}
        >
          <FormatBalance value={balance.unbonding} />
        </CardSummary>}
    </SummaryBox>
  );
}

export default React.memo(Summary);
