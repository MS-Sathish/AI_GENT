// Copyright 2017-2024 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';
import { BestFinalized, BestNumber, BlockToTime, TimeNow, TotalInactive, TotalIssuance } from '@polkadot/react-query';
import { BN_ONE, formatNumber } from '@polkadot/util';

import SummarySession from './SummarySession.js';
import { useTranslation } from './translate.js';

interface Props {
  eventCount: number;
}

function Summary ({ eventCount }: Props): React.ReactElement {
  const { t } = useTranslation();
  const { api } = useApi();

  return (
    <SummaryBox>
      <section>
        {api.query.timestamp && (
          <>
            <CardSummary label={<span style={{ color: 'white' }}>{t('last block')}</span>}>
              <TimeNow />
            </CardSummary>
            <CardSummary
              className='media--800'
              label={<span style={{ color: 'white' }}>{t('target')}</span>}
            >
              <BlockToTime value={BN_ONE} />
            </CardSummary>
          </>
        )}
        {api.query.balances && (
          <>
            <CardSummary
              className='media--800'
              label={<span style={{ color: 'white' }}>{t('total issuance')}</span>}
            >
              <TotalIssuance />
            </CardSummary>
            {!!api.query.balances.inactiveIssuance && (
              <CardSummary
                className='media--1300'
                label={<span style={{ color: 'white' }}>{t('inactive issuance')}</span>}
              >
                <TotalInactive />
              </CardSummary>
            )}
          </>
        )}
      </section>
      <section className='media--1100'>
        <SummarySession withEra={false} />
      </section>
      <section>
        <CardSummary
          className='media--1400'
          label={<span style={{ color: 'white' }}>{t('last events')}</span>}
        >
          {formatNumber(eventCount)}
        </CardSummary>
        {api.query.grandpa && (
          <CardSummary label={<span style={{ color: 'white' }}>{t('finalized')}</span>}>
            <BestFinalized />
          </CardSummary>
        )}
        <CardSummary label={<span style={{ color: 'white' }}>{t('best')}</span>}>
          <BestNumber />
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
