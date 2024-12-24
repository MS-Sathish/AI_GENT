// Copyright 2017-2024 @polkadot/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BountyApi } from './hooks/useBounties.js';

import React, { useMemo } from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { useTreasury } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { BN, formatNumber } from '@polkadot/util';

import { useTranslation } from './translate.js';

interface Props {
  className?: string;
  info: BountyApi;
}

function Summary ({ className = '', info: { bestNumber, bounties, bountyCount, childCount } }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { spendPeriod } = useTreasury();

  const totalValue = useMemo(
    () => (bounties || []).reduce((total, { bounty: { value } }) => total.iadd(value), new BN(0)),
    [bounties]
  );

  return (
    <SummaryBox className={`${className} ui--BountySummary`}>
      <section>
        {bounties && (
          <CardSummary label={<span style={{ color: 'white' }}>{t('active')}</span>}>
            {formatNumber(bounties.length)}
          </CardSummary>
        )}
        {bountyCount && bounties && (
          <CardSummary label={<span style={{ color: 'white' }}>{t('past')}</span>}>
            {formatNumber(bountyCount.subn(bounties.length))}
          </CardSummary>
        )}
        {childCount && (
          <CardSummary label={<span style={{ color: 'white' }}>{t('children')}</span>}>
            {formatNumber(childCount)}
          </CardSummary>
        )}
      </section>
      <section>
        <CardSummary label={<span style={{ color: 'white' }}>{t('active total')}</span>}>
          <FormatBalance
            value={totalValue}
            withSi
          />
        </CardSummary>
      </section>
      <section>
        {bestNumber && !spendPeriod.isZero() && (
          <CardSummary
            label={<span style={{ color: 'white' }}>{t('funding period')}</span>}
            progress={{
              total: spendPeriod,
              value: bestNumber.mod(spendPeriod),
              withTime: true
            }}
          />
        )}
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
