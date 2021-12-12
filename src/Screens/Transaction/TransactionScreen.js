import React, { useEffect, useState } from 'react';
import './Transaction.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getTransactionData } from '../../Integrations/Contracts/ContractManager';
import OkiPreview from './OkiPreview';

const TransactionScreen = () => {
  let { txHash } = useParams();
  const navigate = useNavigate();

  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    async function fetchTransactionInfo() {
      const response = await getTransactionData(txHash);
      if (response.error) {
        //Todo: handle Error
      } else {
        setTokens(response.tokens);
      }
    }
    if (txHash) {
      fetchTransactionInfo();
    }
  }, [txHash]);

  const navigateToMyOkis = () => {
    navigate('/my-okis');
  };

  return (
    <div className="transaction-screen">
      <div className="transaction-title-container">
        <h1 className="transaction-title">{`Congrats you just minted ${tokens?.length} Okis`}</h1>
      </div>

      <div className="preview-grid">
        {tokens &&
          tokens.map((tokenId) => {
            return (
              <div className="preview-card-container">
                <OkiPreview tokenId={tokenId} />
              </div>
            );
          })}
      </div>
      <button
        className={`button-gen-primary`}
        onClick={navigateToMyOkis}
        disabled={false}
      >
        View my Okis
      </button>
      <h2 className="transaction-thanks">Thanks for minting</h2>
    </div>
  );
};

export default TransactionScreen;
