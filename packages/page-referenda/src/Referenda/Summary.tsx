// Copyright 2017-2024 @polkadot/app-referenda authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { Summary as SummaryType } from '../types.js';

import React from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { formatNumber, isFunction } from '@polkadot/util';

import { useTranslation } from '../translate.js';

interface Props {
  className?: string;
  issuanceActive?: BN;
  issuanceInactive?: BN;
  issuanceTotal?: BN;
  summary: SummaryType;
  withIssuance?: boolean;
}

function Summary ({ className, issuanceActive, issuanceInactive, issuanceTotal, summary: { refActive, refCount }, withIssuance }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();

  return (
    <SummaryBox className={className}>
      <section>
        <CardSummary label={<span style={{ color: 'white' }}>{t('active')}</span>}>
          {refActive === undefined
            ? <span className='--tmp'>99</span>
            : formatNumber(refActive)
          }
        </CardSummary>
        <CardSummary label={<span style={{ color: 'white' }}>{t('total')}</span>}>
          {refCount === undefined
            ? <span className='--tmp'>99</span>
            : formatNumber(refCount)
          }
        </CardSummary>
      </section>
      {withIssuance && (
        <section>
          <CardSummary label={<span style={{ color: 'white' }}>{t('total issuance')}</span>}>
            <FormatBalance
              className={issuanceTotal ? '' : '--tmp'}
              value={issuanceTotal || 1}
              withSi
            />
          </CardSummary>
          {isFunction(api.query.balances.inactiveIssuance) && (
            <>
              <CardSummary
                className='media--1000'
                label={<span style={{ color: 'white' }}>{t('inactive issuance')}</span>}
              >
                <FormatBalance
                  className={issuanceInactive ? '' : '--tmp'}
                  value={issuanceInactive || 1}
                  withSi
                />
              </CardSummary>
              <CardSummary
                className='media--800'
                label={<span style={{ color: 'white' }}>{t('active issuance')}</span>}
              >
                <FormatBalance
                  className={issuanceActive ? '' : '--tmp'}
                  value={issuanceActive || 1}
                  withSi
                />
              </CardSummary>
            </>
          )}
        </section>
      )}
    </SummaryBox>
  );
}

export default React.memo(Summary);
