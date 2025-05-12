import { List, ListItem, Typography, Box } from '@mui/joy';
import styles from '../styles/Components/ChannelLists.module.scss';

interface ChannelListProps {
  channels?: string[];
}

const ChannelList: React.FC<ChannelListProps> = ({ channels = ['general', 'random'] }) => {
  return (
    <Box component="nav" className={styles.channelList}>
      <Typography level="title-lg" sx={{ color: 'white', mb: 2 }}>
        Text Channels
      </Typography>
      <List>
        {channels.map((channel) => (
          <ListItem 
            key={channel}
            className={styles.channelItem}
            sx={{ '--ListItem-radius': '4px' }}
          >
            # {channel}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChannelList;