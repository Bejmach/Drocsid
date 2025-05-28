import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography, Box, Avatar } from '@mui/joy';
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

  useEffect(() => {
    if (!chatId) return;

    setLoading(true);
    chatService
      .getChatUsers(chatId)
      .then(res => {
        const data = res.data;
        console.log(data);

        if (
          typeof data === 'object' &&
          data !== null &&
          'users' in data &&
          Array.isArray(data.users)
        ) {
          setMembers(data.users);
          setError('');
        } else {
          console.warn('Unexpected members response format:', data);
          setMembers([]);
          setError('Unexpected response format.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Could not load members.');
      })
      .finally(() => setLoading(false));
  }, [chatId]);

  if (loading) {
    return <Typography level="body-sm" sx={{ color: 'gray', p: 2 }}>Loading members…</Typography>;
  }
  if (error) {
    return <Typography level="body-sm" color="danger" sx={{ p: 2 }}>{error}</Typography>;
  }
  if (members.length === 0) {
    return <Typography level="body-sm" sx={{ color: 'gray', p: 2 }}>No members yet.</Typography>;
  }

  return (
    <Box className={styles.memberList}>
      <Typography level="title-lg" sx={{ color: 'white', p: 2 }}>
        Members
      </Typography>
      <List>
        {members.map(member => (
          <ListItem key={member.id} className={styles.memberItem}>
            <Avatar size="sm" />
            <Typography className={styles.memberName}>
              {member.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MemberList;