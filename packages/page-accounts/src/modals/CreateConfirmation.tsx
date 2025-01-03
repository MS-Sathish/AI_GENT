// Copyright 2017-2024 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeypairType } from '@polkadot/util-crypto/types';

import React from 'react';

import { AddressRow, Modal, Static } from '@polkadot/react-components';
import { isHex } from '@polkadot/util';

import { useTranslation } from '../translate.js';

interface Props {
  address?: string;
  derivePath: string;
  isBusy: boolean;
  name?: string;
  pairType: KeypairType;
  seed?: string;
}

function CreateConfirmation ({ address, derivePath, name, pairType, seed }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  const splitSeed = seed?.split(' ');
  const shortSeed = isHex(seed)
    ? `${seed.slice(10)} … ${seed.slice(-8)}`
    : splitSeed?.map((value, index) => (index % 3) ? '…' : value).join(' ');

  return (
    <Modal.Content>
      <Modal.Columns
        hint={
          <>
            <p style={{color:'white'}}>{t('We will provide you with a generated backup file after your account is created. As long as you have access to your account you can always download this file later by clicking on "Backup" button from the Accounts section.')}</p>
            <p style={{color:'white'}}>{t('Please make sure to save this file in a secure location as it is required, together with your password, to restore your account.')}</p>
          </>
        }
      >
        {address && name && (
          <AddressRow
            defaultName={name}
            isInline
            noDefaultNameOpacity
            value={address}
          />
        )}
        {shortSeed && (
          <Static
          label={<span style={{ color: 'white' }}>{t('partial seed')}</span>}
          value={<span style={{ color: 'white' }}>{shortSeed}</span>}
          />
        )}
        <Static
          label={<span style={{ color: 'white' }}>{t('keypair type')}</span>}
          value={<span style={{ color: 'white' }}>{pairType}</span>}
        />
        <Static
          label={<span style={{ color: 'white' }}>{t('derivation path')}</span>}
          value={<span style={{ color: 'white' }}>{derivePath || t('<none provided>')}</span>}
        />
      </Modal.Columns>
    </Modal.Content>
  );
}

export default React.memo(CreateConfirmation);
