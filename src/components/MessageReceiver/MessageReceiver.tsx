import { useEffect, useRef, FC } from 'react';
import axios from 'axios';
import './MessageReceiver.css';
import { AuthData, Chat } from '../type/interface';

interface MessageReceiverProps {
  authData: AuthData;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  selectedChat: Chat;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

const MessageReceiver: FC<MessageReceiverProps> = ({
  authData,
  chats,
  setChats,
  selectedChat,
  setSelectedChat,
}) => {
  const receivedMessagesRef = useRef<string[]>([]);

  const { apiUrl, idInstance, apiTokenInstance, seconds } = authData;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${seconds}`
        );

        const message = response.data;

        if (!message) return;

        const receiptId = message.receiptId;

        const incomingMessage =
          message?.body?.messageData?.textMessageData?.textMessage;

        const chatName = message?.body?.senderData?.chatName;

        const senderId = message?.body?.senderData?.sender;

        const idInstanceWid = message?.body?.instanceData?.wid;

        if (
          incomingMessage &&
          !receivedMessagesRef.current.includes(incomingMessage)
        ) {
          const isMyMessage = idInstanceWid === senderId;

          const newMessage = {
            sender: isMyMessage ? 'Me' : chatName,
            text: incomingMessage,
          };

          const updatedChat: Chat = {
            ...selectedChat,
            messages: [...selectedChat.messages, newMessage],
            lastMessage: incomingMessage,
          };

          const updatedChats = chats.map(chat =>
            chat.id === selectedChat.id ? updatedChat : chat
          );

          setChats(updatedChats);
					setSelectedChat(updatedChat);

          receivedMessagesRef.current = [
            ...receivedMessagesRef.current,
            incomingMessage,
          ];
        }

        await axios.delete(
          `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
        );
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, [
    apiUrl,
    idInstance,
    apiTokenInstance,
    seconds,
    chats,
    selectedChat,
    setChats,
		setSelectedChat,
  ]);

  return null;
};

export default MessageReceiver;