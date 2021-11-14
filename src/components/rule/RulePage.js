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
  objective,
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
        <InfoButton src={Info} alt="how to play icon" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={descriptorStyle}
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="h6"
          >
            OBJECTIVE
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            {objective}
          </Typography>
          <Typography
            style={descriptorStyle}
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="h6"
          >
            CARD VALUES
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            {cardValues}
          </Typography>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              BLACKJACK
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2.5, ml: 2 }}
            >
              {blackjack}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              BET
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2.5, ml: 11.5 }}
            >
              {bet}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              HIT
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2.5, ml: 12.5 }}
            >
              {hit}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              STAND
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2.5, ml: 8 }}
            >
              {stand}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              PUSH
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2.5, ml: 9.5 }}
            >
              {push}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              DOUBLE
            </Typography>
            <Typography 
              style={{ display: "inline-block" }}
              id="modal-modal-description" 
              sx={{ mt: 2.5, ml: 6 }}
            >
              {double}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              SPLIT
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2.5, ml: 9 }}
            >
              {split}
            </Typography>
          </Grid>
          <Grid container wrap="nowrap">
            <Typography
              style={descriptorStyle}
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h6"
            >
              INSURANCE
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              id="modal-modal-description"
              sx={{ mt: 2.6, ml: 1 }}
            >
              {insurance}
            </Typography>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default RulePage;
