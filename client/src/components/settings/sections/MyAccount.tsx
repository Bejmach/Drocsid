import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Avatar,
  Divider,
  TextField
} from '@mui/material';
import { User } from '../../../data/users';
import { Edit2, Camera } from 'lucide-react';

interface MyAccountProps {
  currentUser: User;
}

const MyAccount: React.FC<MyAccountProps> = ({ currentUser }) => {
  return (
    <Box className="my-account">
      <Box className="profile-banner">
        <Button 
          variant="contained" 
          className="change-banner-btn"
          startIcon={<Camera size={20} />}
        >
          Change Banner
        </Button>
      </Box>
      
      <Box className="profile-info">
        <Box className="avatar-container">
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.username}
            className="profile-avatar"
          />
          <Button 
            variant="contained"
            className="change-avatar-btn"
            startIcon={<Camera size={20} />}
          >
            Change Avatar
          </Button>
        </Box>
        
        <Box className="user-info-container">
          <Typography variant="h6" className="username">
            {currentUser.username}
            <span className="discriminator">#{currentUser.discriminator}</span>
          </Typography>
          
          <Button
            variant="contained"
            className="edit-profile-btn"
            startIcon={<Edit2 size={20} />}
          >
            Edit User Profile
          </Button>
        </Box>
      </Box>
      
      <Divider className="section-divider" />
      
      <Box className="user-settings">
        <Typography variant="h6" className="section-heading">
          Username
        </Typography>
        <TextField
          fullWidth
          value={`${currentUser.username}#${currentUser.discriminator}`}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Button variant="contained" size="small">
                Edit
              </Button>
            ),
          }}
        />
        
        <Typography variant="h6" className="section-heading">
          Email
        </Typography>
        <TextField
          fullWidth
          value="user@example.com"
          type="email"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Button variant="contained" size="small">
                Edit
              </Button>
            ),
          }}
        />
        
        <Typography variant="h6" className="section-heading">
          Phone Number
        </Typography>
        <TextField
          fullWidth
          value="You haven't added a phone number yet."
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Button variant="contained" size="small">
                Add
              </Button>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default MyAccount;