import React from "react";
import "./Styles.css";
import GenerationCard from "./components/GenerationCard";
import { Container, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import firstGenImage from "../../../assets/oki-first-gen.png";
import secondGenImage from "../../../assets/oki-second-gen.png";
import thirdGenImage from "../../../assets/oki-third-gen.png";
import fourthGenImage from "../../../assets/oki-fourth-gen.png";
import fifthGenImage from "../../../assets/oki-fifth-gen.png";
const MyWalletSection = ({
  tokens = null,
  loading = false,
  fistStageTokens,
}) => {
  const navigate = useNavigate();

  let enabled = true;

  if (!tokens || tokens.length === 0) {
    enabled = false;
  }

  const getFirstGenTokensContent = (_tokens, loading) => {
    if (loading) {
      return "...";
    }

    if (!_tokens) {
      return "Get Your First Now";
    }

    return `${_tokens?.length || 0} Okis`;
  };

  const navigateToMyOkis = () => {
    if (!tokens || tokens.length === 0) {
      scrollToTop();
    } else {
      navigate("/my-okis");
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
    window.scrollTop = 0;
  };
  const data = [
    {
      image: firstGenImage,
      title: getFirstGenTokensContent(tokens),
      subtitle: "5k Chapter 1",
      buttonLabel: "See My Okis",
      buttonType: "primary",
      showButton: true,
    },

    {
      image: secondGenImage,
      title: "2k mint. 2 weeks after previous chapter mint out.",
      subtitle: "",
      buttonType: "secondary",
      buttonLabel: "Add to Calendar",
      showButton: false,
    },
    {
      image: thirdGenImage,
      title: "1.5k mint. 2 weeks after previous chapter mint out.",
      subtitle: "",
      buttonType: "secondary",
      buttonLabel: "Add to Calendar",
      showButton: false,
    },
    {
      image: fourthGenImage,
      title: "1k mint. 2 weeks after previous chapter mint out.",
      subtitle: "",
      buttonType: "secondary",
      buttonLabel: "Add to Calendar",
      showButton: false,
    },
    {
      image: fifthGenImage,
      title: "500 mint. 2 weeks after previous chapter mint out.",
      subtitle: "",
      buttonType: "secondary",
      buttonLabel: "Add to Calendar",
      showButton: false,
    },
  ];

  return (
    <Container>
      <div style={{ marginBottom: "10%" }}>
        <h1 className="title">My Wallet</h1>
        <Grid container justifyContent="center" spacing={2}>
          {data.map((x) => (
            <Grid item lg={4}>
              <GenerationCard
                image={x.image}
                title={x.title}
                subtitle={x.subtitle}
                buttonLabel={x.buttonLabel}
                buttonType={x.buttonType}
                enabled={true}
                onClick={navigateToMyOkis}
                showButton={x.showButton}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default MyWalletSection;
