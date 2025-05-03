import React, { useState } from 'react';
import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import { 
  User,
  Bell,
  MessageSquare,
  Shield,
  Gamepad2,
  Mic,
  Volume2,
  Monitor,
  Palette,
  Languages,
  Activity,
  KeyRound,
  CreditCard,
  Gift,
  QrCode,
  HelpCircle,
  X
} from 'lucide-react';
import { User as UserType } from '../../data/users';
import MyAccount from './sections/MyAccount';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  currentUser: UserType;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose, currentUser }) => {
  const [selectedSection, setSelectedSection] = useState('My Account');

  const sections = [
    { name: 'User Settings', items: [
      { name: 'My Account', icon: <User size={20} /> },
      { name: 'Privacy & Safety', icon: <Shield size={20} /> },
      { name: 'Authorized Apps', icon: <Gamepad2 size={20} /> },
      { name: 'Connections', icon: <Activity size={20} /> },
    ]},
    { name: 'App Settings', items: [
      { name: 'Appearance', icon: <Palette size={20} /> },
      { name: 'Accessibility', icon: <Bell size={20} /> },
      { name: 'Voice & Video', icon: <Mic size={20} /> },
      { name: 'Text & Images', icon: <MessageSquare size={20} /> },
      { name: 'Notifications', icon: <Bell size={20} /> },
      { name: 'Keybinds', icon: <KeyRound size={20} /> },
      { name: 'Language', icon: <Languages size={20} /> },
      { name: 'Windows Settings', icon: <Monitor size={20} /> },
      { name: 'Stream', icon: <Volume2 size={20} /> },
    ]},
    { name: 'Billing Settings', items: [
      { name: 'Nitro', icon: <Gift size={20} /> },
      { name: 'Server Boost', icon: <QrCode size={20} /> },
      { name: 'Subscriptions', icon: <CreditCard size={20} /> },
    ]},
    { name: 'Support', items: [
      { name: 'Support', icon: <HelpCircle size={20} /> },
    ]},
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'My Account':
        return <MyAccount currentUser={currentUser} />;
      default:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6">{selectedSection}</Typography>
            <Typography>Content for {selectedSection} will go here</Typography>
          </Box>
        );
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      className="settings-modal"
      PaperProps={{
        className: "settings-paper"
      }}
    >
      <Box className="settings-container">
        <Box className="settings-sidebar">
          {sections.map((section) => (
            <React.Fragment key={section.name}>
              <Typography variant="overline" className="section-title">
                {section.name}
              </Typography>
              <List>
                {section.items.map((item) => (
                  <ListItem
                    key={item.name}
                    button
                    selected={selectedSection === item.name}
                    onClick={() => setSelectedSection(item.name)}
                    className={selectedSection === item.name ? 'selected' : ''}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
              <Divider className="section-divider" />
            </React.Fragment>
          ))}
        </Box>
        
        <Box className="settings-content">
          <Box className="settings-header">
            <Typography variant="h6">{selectedSection}</Typography>
            <IconButton onClick={onClose} size="small">
              <X size={20} />
            </IconButton>
          </Box>
          <Divider />
          <Box className="settings-body">
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SettingsModal;