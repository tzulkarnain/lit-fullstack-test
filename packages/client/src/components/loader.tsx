import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <CircularProgress />
    <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
      Loading
    </Typography>
  </Box>
);

export default Loader;
