// Copyright 2017-2024 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@polkadot/types';
import type { Balance } from '@polkadot/types/interfaces';
import type { BN } from '@polkadot/util';

import React, { useMemo } from 'react';

import { CardSummary, styled, SummaryBox } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { BN_THREE, BN_TWO, BN_ZERO } from '@polkadot/util';

import { useTranslation } from '../translate.js';

interface Props {
  avgStaked?: BN;
  className?: string;
  lastEra?: BN;
  lowStaked?: BN;
  minNominated?: BN;
  minNominatorBond?: BN;
  numNominators?: number;
  numValidators?: number;
  stakedReturn: number;
  totalIssuance?: BN;
  totalStaked?: BN;
}

interface ProgressInfo {
  hideValue: true;
  isBlurred: boolean;
  total: BN;
  value: BN;
}

const OPT_REWARD = {
  transform: (optBalance: Option<Balance>) =>
    optBalance.unwrapOrDefault()
};

function getProgressInfo (value?: BN, total?: BN): ProgressInfo {
  return {
    hideValue: true,
    isBlurred: !(value && total),
    total: (value && total) ? total : BN_THREE,
    value: (value && total) ? value : BN_TWO
  };
}

function Summary ({ avgStaked, className, lastEra, lowStaked, minNominated, minNominatorBond, stakedReturn, totalIssuance, totalStaked }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const lastReward = useCall<BN>(lastEra && api.query.staking.erasValidatorReward, [lastEra], OPT_REWARD);

  const progressStake = useMemo(
    () => getProgressInfo(totalStaked, totalIssuance),
    [totalIssuance, totalStaked]
  );

  const progressAvg = useMemo(
    () => getProgressInfo(lowStaked, avgStaked),
    [avgStaked, lowStaked]
  );

  const percent = <span className='percent'>%</span>;

  return (
    <StyledSummaryBox className={className}>
      <section className='media--800'>
        <CardSummary
          label={<span style={{ color: 'white' }}>{t('total staked')}</span>}
          progress={progressStake}
        >
          <FormatBalance
            className={progressStake.isBlurred ? '--tmp' : ''}
            value={progressStake.value}
            withSi
          />
        </CardSummary>
      </section>
      <section className='media--800'>
        <CardSummary label={<span style={{ color: 'white' }}>{t('returns')}</span>}>
          {totalIssuance && (stakedReturn > 0)
            ? Number.isFinite(stakedReturn)
              ? <>{stakedReturn.toFixed(1)}{percent}</>
              : '-.-%'
            : <span className='--tmp'>0.0{percent}</span>
          }
        </CardSummary>
      </section>
      <section className='media--1000'>
        <CardSummary
          label={<span style={{ color: 'white' }}>{`${t('lowest / avg staked')}`}</span>}
          progress={progressAvg}
        >
          <span className={progressAvg.isBlurred ? '--tmp' : ''}>
            <FormatBalance
              value={progressAvg.value}
              withCurrency={false}
              withSi
            />
            &nbsp;/&nbsp;
            <FormatBalance
              className={progressAvg.isBlurred ? '--tmp' : ''}
              value={progressAvg.total}
              withSi
            />
          </span>
        </CardSummary>
      </section>
      <section className='media--1600'>
        {minNominated?.gt(BN_ZERO) && (
          <CardSummary
            className='media--1600'
            label={<span style={{ color: 'white' }}>{minNominatorBond ? t('min nominated / threshold') : t('min nominated')}</span>}
          >
            <FormatBalance
              value={minNominated}
              withCurrency={!minNominatorBond}
              withSi
            />
            {minNominatorBond && (
              <>
                &nbsp;/&nbsp;
                <FormatBalance
                  value={minNominatorBond}
                  withSi
                />
              </>
            )}
          </CardSummary>
        )}
      </section>
      <section>
        <CardSummary label={<span style={{ color: 'white' }}>{t('last reward')}</span>}>
          <FormatBalance
            className={lastReward ? '' : '--tmp'}
            value={lastReward || 1}
            withSi
          />
        </CardSummary>
      </section>
    </StyledSummaryBox>
  );
}

const StyledSummaryBox = styled(SummaryBox)`
  .percent {
    font-size: var(--font-percent-tiny);
  }
`;

export default React.memo(Summary);
