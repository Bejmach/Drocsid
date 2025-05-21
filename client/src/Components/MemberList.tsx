import React from 'react';
import { Box, Typography } from '@mui/joy';
import { userService } from '../hooks/api';
import { useState } from 'react';

interface MemberListProps {
  chatId: string;
}

const MemberList: React.FC<MemberListProps> = ({ chatId }) => {
  const [members, setMembers] = useState<string[]>([]);

  React.useEffect(() => {
    const loadMembers = async () => {
      if (chatId) {
        const response = await userService.getAll();
        setMembers(response.data.map(user => user.name));
      }
    };
    loadMembers();
  }, [chatId]);

  return (
    <Box sx={{ width: 240, p: 2, bgcolor: 'background.surface' }}>
      <Typography level="h6" sx={{ mb: 2 }}>Members</Typography>
      {members.map(member => (
        <Typography key={member} sx={{ mb: 1 }}>{member}</Typography>
      ))}
    </Box>
  );
};

export default MemberList;