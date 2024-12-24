// Copyright 2017-2024 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Info } from './types.js';

import React, { useEffect, useState } from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { BestNumber, Elapsed } from '@polkadot/react-query';
import { BN_ZERO, formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate.js';

interface Props {
  nextRefresh: number;
  info: Info;
}

const EMPTY_INFO = { extrinsics: null, health: null, peers: null };

function Summary ({ info: { extrinsics, health, peers } = EMPTY_INFO, nextRefresh }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [peerBest, setPeerBest] = useState(BN_ZERO);

  useEffect((): void => {
    if (peers) {
      const bestPeer = peers.sort((a, b): number => b.bestNumber.cmp(a.bestNumber))[0];

      setPeerBest(
        bestPeer
          ? bestPeer.bestNumber
          : BN_ZERO
      );
    }
  }, [peers]);

  return (
    <SummaryBox>
      <section>
        <CardSummary label={<span style={{ color: 'white' }}>{t('refresh in')}</span>}
        >
          <Elapsed value={nextRefresh} />
        </CardSummary>
        {health && (
          <>
            <CardSummary
              className='media--800'
              label={<span style={{ color: 'white' }}>{t('total peers')}</span>}
            >
              {formatNumber(health.peers)}
            </CardSummary>
            <CardSummary
              className='media--800'
              label={<span style={{ color: 'white' }}>{t('syncing')}</span>}
            >
              {health.isSyncing.valueOf()
                ? t('yes')
                : t('no')
              }
            </CardSummary>
          </>
        )}
      </section>
      {extrinsics && (extrinsics.length > 0) && (
        <section className='media--1200'>
          <CardSummary label={<span style={{ color: 'white' }}>{t('queued tx')}</span>}>
            {extrinsics.length}
          </CardSummary>
        </section>
      )}
      <section>
        {peerBest?.gtn(0) && (
          <CardSummary label={<span style={{ color: 'white' }}>{t('peer best')}</span>}>
            {formatNumber(peerBest)}
          </CardSummary>
        )}
        <CardSummary label={<span style={{ color: 'white' }}>{t('our best')}</span>}>
          <BestNumber />
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
