import { Avatar, Typography, Box } from '@mui/joy'
import styles from '../styles/Components/Message.module.scss'

interface MessageProps {
  username: string
  content: string
  timestamp: string
}

const Message: React.FC<MessageProps> = ({ username, content, timestamp }) => (
  <Box className={styles.messageContainer}>
    <Avatar className={styles.avatar} />
    <Box className={styles.content}>
      <Typography className={styles.username}>
        {username}
        <Typography component="span" className={styles.timestamp}>
          {timestamp}
        </Typography>
      </Typography>
      <Typography className={styles.messageText}>{content}</Typography>
    </Box>
  </Box>
)

export default Message
