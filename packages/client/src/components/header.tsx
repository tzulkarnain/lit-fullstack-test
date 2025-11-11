import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router";

interface NavigationItem {
  label: string;
  path: string;
}

export interface HeaderProps {
  navigation: NavigationItem[];
}

const Header = ({ navigation }: HeaderProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LIT Technical test
          </Typography>

          {navigation &&
            navigation.length > 0 &&
            navigation.map((item: NavigationItem, index: number) => (
              <Button
                color="inherit"
                component={Link}
                to={item.path}
                key={index}
              >
                {item.label}
              </Button>
            ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
