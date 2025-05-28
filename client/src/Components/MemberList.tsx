import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Typography,
  Box,
  Avatar,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/joy';
import { Dialog, Input, Tooltip } from '@mui/material';
import styles from '../styles/Components/MemberList.module.scss';
import { chatService } from '../hooks/api';
import { User } from '../types';

interface MemberListProps {
  chatId: string;
}

const MemberList: React.FC<MemberListProps> = ({ chatId }) => {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const [dialogError, setDialogError] = useState('');
  const [copiedMemberId, setCopiedMemberId] = useState<string | null>(null);

  // Normalize backend response to User[]
  const normalizeUsers = (data: any): User[] =>
    Array.isArray(data)
      ? data
      : data && Array.isArray(data.users)
      ? data.users
      : [];

  // Fetch members
  useEffect(() => {
    if (!chatId) return;
    setLoading(true);
    chatService
      .getChatUsers(chatId)
      .then(res => {
        setMembers(normalizeUsers(res.data));
        setError('');
      })
      .catch(err => {
        console.error(err);
        setMembers([]);
        setError('Could not load members.');
      })
      .finally(() => setLoading(false));
  }, [chatId]);

  // Invite new user
  const handleInviteUser = async () => {
    setDialogError('');
    try {
      await chatService.join(chatId, newUserId);
      const resp = await chatService.getChatUsers(chatId);
      setMembers(normalizeUsers(resp.data));
      setNewUserId('');
      setDialogOpen(false);
    } catch (err) {
      console.error('Invite failed:', err);
      setDialogError('Could not invite user.');
    }
  };

  // Copy user ID and show tooltip
  const handleCopyUserId = (memberId: string) => {
    navigator.clipboard.writeText(memberId).then(() => {
      setCopiedMemberId(memberId);
      setTimeout(() => setCopiedMemberId(null), 1500);
    });
  };

  if (loading) {
    return (
      <Typography level="body-sm" sx={{ color: 'gray', p: 2 }}>
        Loading members…
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography level="body-sm" color="danger" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }
  if (members.length === 0) {
    return (
      <Typography level="body-sm" sx={{ color: 'gray', p: 2 }}>
        No members yet.
      </Typography>
    );
  }

  return (
    <Box className={styles.memberList}>
      <Typography level="title-lg" sx={{ color: 'white', p: 2 }}>
        Members
      </Typography>
      <List>
        {members.map(member => (
          <Tooltip
            key={member.id}
            title="User ID copied!"
            placement="top"
            arrow
            open={copiedMemberId === member.id}
            disableHoverListener
            disableFocusListener
            disableTouchListener
          >
            <ListItem
              className={styles.memberItem}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => handleCopyUserId(member.id)}
            >
              <Avatar size="sm" />
              <Typography className={styles.memberName}>
                {member.name}
              </Typography>
            </ListItem>
          </Tooltip>
        ))}
      </List>

      {/* Invite User Button */}
      <Box sx={{ p: 2 }}>
        <Button fullWidth onClick={() => setDialogOpen(true)}>
          Invite User
        </Button>
      </Box>

      {/* Invite Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Invite User</DialogTitle>
        <DialogContent>
          <Input
            placeholder="Enter User ID"
            fullWidth
            value={newUserId}
            onChange={e => setNewUserId(e.target.value)}
          />
          {dialogError && (
            <Typography color="danger" sx={{ mt: 1 }}>
              {dialogError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="plain" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="solid"
            disabled={!newUserId.trim()}
            onClick={handleInviteUser}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MemberList;
