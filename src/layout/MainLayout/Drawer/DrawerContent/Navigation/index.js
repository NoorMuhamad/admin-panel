// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menuItems';
import useAuthorization from 'hooks/useAuthorization';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const { hasRole } = useAuthorization()
  const navGroups = menuItem.items.map((item) => {
    const isAuthorized = item.role.some(role => hasRole(role));

    if (isAuthorized) {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          );
      }
    }

    // If not authorized, skip rendering the item
    return null;
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
