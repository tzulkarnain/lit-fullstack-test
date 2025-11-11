import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 3, paddingBottom: 3 }}>
      <Box sx={{ marginBottom: 3, borderBottom: "1px solid #313131" }}>
        <Typography component="h1" variant="h4">
          Page not found
        </Typography>
      </Box>

      <Link to="/">Go back to Home</Link>
    </Container>
  );
};

export default NotFound;
