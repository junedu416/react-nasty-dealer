import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { palette } from "@mui/system";
import {
  title,
  generalRule,
  hit,
  stand,
  double,
  split,
  bet,
  insurance,
} from "./rule.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "success.main",
  boxShadow: 24,
  p: 6,
};

function RulePage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>How to Play? </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            {generalRule}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            HIT: {hit}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            STAND: {stand}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            DOUBLE: {double}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            SPLIT: {split}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default RulePage;
