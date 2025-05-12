import { Input, Button, Box } from '@mui/joy';
import styles from '../styles/Components/ChatInput.module.scss';

const ChatInput: React.FC = () => {
  return (
    <Box className={styles.inputContainer}>
      <Input
        className={styles.chatInput}
        placeholder="Message #general"
        endDecorator={
          <Button className={styles.sendButton}>
            Send
          </Button>
        }
      />
    </Box>
  );
};

export default ChatInput;