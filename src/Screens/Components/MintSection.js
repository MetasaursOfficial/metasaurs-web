import React, { useState } from "react";
import mainImage from "../../assets/ezgif-1.png";
import gmImage from "../../assets/sun.png";
import "./Styles.css";
import MintWhitelist from "../Admin/Components/MintWhitelist";
import { mintWhitelist } from "../../Integrations/Contracts/ContractManager";
import { Container, Grid } from "@material-ui/core";

const mintLimit = 4500;

const MintSection = ({
  contractInfo = null,
  loading = true,
  onPress = () => {},
  onMintWhiteListPressed = () => {},
  label = "",
  isWalletAddress = false,
  connectWalletPressed,
}) => {
  const [amount, setAmount] = useState(1);

  console.log("contractInfo: ", contractInfo);

  const handleAdd = () => {
    if (amount < 10) {
      const value = amount + 1;
      setAmount(value);
    }
  };

  const handleMinus = () => {
    if (amount > 1) {
      const value = amount - 1;
      setAmount(value);
    }
  };

  const renderMintButton = (
    _isWalletAddress,
    loading,
    _paused,
    totalSupply = 0,
    price = 0.08,
    _amount = 1
  ) => {
    let buttonContent;

    if (_paused) {
      buttonContent = "Whitelist Sale Closed";
    } else {
      buttonContent = loading ? "loading" : `Mint now ${_amount * price} ETH`;
    }
    if (!_isWalletAddress) {
      buttonContent = "Connect Wallet";
    }

    let disabled = _paused;

    if (totalSupply >= mintLimit) {
      disabled = true;
      buttonContent = "Gen 1 Sale Closed";
    }

    return (
      <button
        className="button-primary"
        disabled={disabled}
        onClick={() => {
          if (_isWalletAddress) {
            onPress(amount);
          } else {
            connectWalletPressed();
          }
        }}
      >
        {buttonContent}
      </button>
    );
  };

  const getMintedContent = (_contractData) => {
    if (!_contractData) {
      return "Connect your wallet to view the mint amount";
    }
    console.log("getMintedContent: ", _contractData);
    const firstTokensMinted = _contractData.totalSupply;
    return `${firstTokensMinted}/5,000 Minted. Limit 10 per transaction`;
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item lg={6}>
          <img src={mainImage} alt="NFT" className="image-medium" />
          <br />
          <div className="padding-text">
            <span>
              Each Oki is a 1/1 part of a 5 chapter collection with 10k Gen 1
              NFTs total.
            </span>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div className="Image-flex">
            <img src={gmImage} alt="NFT" className="oki-icon" />
            <h2 className="mint-title">GM Oki!</h2>
          </div>
          <p className="mint-paragraph">
            Click ”Mint Now” to start generating your Oki Chapter 1 NFT.
          </p>
          <div className={"mint-buttons-container"}>
            <div className="plus-minus">
              <button
                className="amount-button-left"
                onClick={() => handleMinus()}
              >
                -
              </button>
              <button className={"amount-button-center"}>{amount}</button>
              <button
                className="amount-button-right"
                onClick={() => handleAdd()}
              >
                +
              </button>
            </div>
            {renderMintButton(
              isWalletAddress,
              loading,
              contractInfo?.paused,
              contractInfo?.totalSupply,
              contractInfo?.price,
              amount
            )}
          </div>
          <h3 className="mint-amount-text">{getMintedContent(contractInfo)}</h3>
          <span className="rarity-paragraph">
            Minting only 5,000 Chapter 1 Oki NFTs. Chapter 2 will contain only
            2,000.
          </span>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MintSection;
