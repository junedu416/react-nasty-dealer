import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Info from "../../images/info.png";
import { InfoButton } from "../styled-components";

import {
  push,
  blackjack,
  generalRule,
  hit,
  stand,
  double,
  split,
  bet,
  insurance,
  cardValues,
} from "./rule.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "black",
  boxShadow: 22,
  p: 6,
  color: "white",
};

const descriptorStyle = {
  display: "inline-block",
  marginRight: 10,
  color: "#adf8ff",
};

function RulePage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>
        <InfoButton src={Info} alt='how to play icon' />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="body1"
          >
            {generalRule}
          </Typography>
          <Typography
            style={descriptorStyle}
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="h6"
          >
            {" "}
            CARD VALUES{" "}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {" "}
            {cardValues}{" "}
          </Typography>
          <Typography
            style={descriptorStyle}
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="h6"
          >
            {" "}
            BLACKJACK{" "}
          </Typography>
          <Typography
            style={{ display: "inline-block" }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {" "}
            {blackjack}{" "}
          </Typography>
          <br />
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              {" "}
              PUSH{" "}
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2, ml: 8 }}
            >
              {" "}
              {push}{" "}
            </Typography>
          </Grid>
          <br />
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              {" "}
              DOUBLE{" "}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 5 }}>
              {" "}
              {double}{" "}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              {" "}
              SPLIT{" "}
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2, ml: 8 }}
            >
              {" "}
              {split}{" "}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              {" "}
              BET{" "}
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2, ml: 10 }}
            >
              {" "}
              {bet}{" "}
            </Typography>
            <br />
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              {" "}
              INSURANCE{" "}
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              {" "}
              {insurance}{" "}
            </Typography>
          </Grid>
          <Typography
            style={descriptorStyle}
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="h6"
          >
            {" "}
            HIT{" "}
          </Typography>
          <Typography style={{ display: "inline-block", marginRight: 20 }}>
            {" "}
            {hit}{" "}
          </Typography>
          <Typography
            style={descriptorStyle}
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="h6"
          >
            {" "}
            STAND{" "}
          </Typography>
          <Typography
            style={{ display: "inline-block" }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {" "}
            {stand}{" "}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default RulePage;
