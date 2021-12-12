import React from "react";
import "./Creators.css";
import FeatureCard from "./Components/FeatureCard";
import { Container, Grid } from "@material-ui/core";

const CreatorsClub = () => {
  const scrollToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
    window.scrollTop = 0;
  };

  const createrArray = [
    { label: "Oki´s World Codex", bgImg: "oki-world" },
    { label: '"Sounds & Music', bgImg: "sound-musik" },
    { label: "Character packs", bgImg: "character-pack" },
    { label: "Commercial Rights", bgImg: "comercial-rights" },
    { label: "Generative Art Engine", bgImg: "generative-art" },
    { label: "Smart Contracts", bgImg: "smart-contracts" },
    { label: "Minting Engine", bgImg: "minting-engine" },
    { label: "Marketing & Pre-sales", bgImg: "marketing-presales" },
  ];

  return (
    <Container>
      <div style={{marginTop:'10%'}}>
      <div className="title-1">The Creators Club</div>
      <div className="title-2">Only Available to People Who</div>
      <div className="title-3">
        Hold at least 1 Oki Gen 1 NFT for 30 days in their wallet
      </div>
      <div style={{ marginTop: 20 }}>
        <p className="title-2">
          Expand Okis World and earn from your Own NFTs. <br /> We’ve included
          assets for you to produce something on your own.
        </p>
      </div>
      <Grid container spacing={3} style={{ marginBottom: 30 }}>
        {createrArray.map((x) => (
          <Grid item lg={3} xs={6}>
            <FeatureCard
              label={x.label}
              bgImg={x.bgImg}
              onClick={scrollToTop}
            />
          </Grid>
        ))}
      </Grid>
      </div>
    </Container>
  );
};

export default CreatorsClub;
