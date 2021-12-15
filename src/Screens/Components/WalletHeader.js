import React from "react";
import "./Styles.css";
import mainIcon from "../../assets/icon/MetasaursPunk-Logo-BK.png"
import { Container } from "@material-ui/core";

const WalletHeader = ({
  connectWalletPressed,
  walletAddress,
  navigate = null,
  loading = false,
}) => {
  const handleClick = () => {
    if (navigate) {
      navigate("/");
    }
  };

  const getWalletMessage = () => {
    if (loading) {
      return "Loading Wallet...";
    }

    return walletAddress.length > 0 ? (
      String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
    ) : (
      <span>Connect Wallet</span>
    );
  };

  return (
    <Container>
      <div className="wallet-container">
        <div className="oki-logo-container">
          <img
            src={mainIcon}
            alt="Oki Icon"
            className="wallet-icon"
            onClick={() => handleClick()}
          />
        </div>
        <button
          className="wallet-button"
          onClick={connectWalletPressed}
          style={{ height: "3rem" }}
        >
          {getWalletMessage()}
        </button>
      </div>
    </Container>
  );
};

export default WalletHeader;
