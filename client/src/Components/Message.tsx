import { Avatar, Typography, Box } from '@mui/joy'
import styles from '../styles/Components/Message.module.scss'

interface MessageProps {
  username: string
  content: string
  timestamp: string
}

const isImageUrl = (url: string) =>
  /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url.split('?')[0]);

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
      {isImageUrl(content) ? (
        <img src={decodeURIComponent(content)} alt="uploaded" className={styles.messageImage} />
      ) : (
        <Typography className={styles.messageText}>{decodeURIComponent(content)}</Typography>
      )}
    </Box>
  </Box>
)

export default Message
