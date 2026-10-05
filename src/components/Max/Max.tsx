import { useState } from 'react';
import './Max.css';
import iconProfile from '@assets/zagl.png';
import axios from 'axios';
import AddNewContact from './AddNewContact/AddNewContact';
import MessageReceiver from '../MessageReceiver/MessageReceiver';
import Header from './Header/Header';
import Search from './Search/Search';
import ChatList from './ChatList/ChatList';
import ChatWindowHeader from './ChatWindowHeader/ChatWindowHeader';
import InputSendMessage from './InputSendMessage/InputSendMessage';
import { AuthData, Chat } from '../type/interface';

interface MaxProps {
	authData: AuthData;
	onLogout: () => void;
}

const Max: React.FC<MaxProps> = ({ authData, onLogout }) => {
	const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
	const [isInputState, setIsInputState] = useState<boolean>(false);
	const [message, setMessage] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [showAddNewContact, setShowAddNewContact] = useState(false);
	const [chats, setChats] = useState<Chat[]>([]);

	const selectedChat = chats.find(chat => chat.id === selectedChatId) ?? null;
	const { apiUrl, idInstance, apiTokenInstance } = authData;

	const handleAddButtonClick = () => {
		setShowAddNewContact(!showAddNewContact);
	};

	const handleAddContact = (phone: string) => {

		const newChat: Chat = {
			id: `${phone}@c.us`,
			name: `${phone}`,
			phone: `${phone}`,
			lastMessage: '',
			messages: [],
		};
		setPhoneNumber(newChat.phone);
		setChats(prev => [...prev, newChat]);
		setSelectedChatId(newChat.id);
		setShowAddNewContact(false);
	};

	const handleSendMessage = async () => {
		if (!message || !phoneNumber) return;

		try {
			await axios.post(
				`${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
				{
					chatId: `${phoneNumber}@c.us`,
					message: message,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!selectedChat) return;

			const updatedChat: Chat = {
  			...selectedChat,
  			messages: [
  			  ...selectedChat.messages,
  			  { sender: 'Me', text: message },
  			],
  			lastMessage: message,
			};

			const updatedChats = chats.map(chat =>
  			chat.id === selectedChat.id ? updatedChat : chat
			);

			setChats(updatedChats);
			setSelectedChatId(updatedChat.id);
			setMessage('');
		} catch (error) {
			console.error(`${error}`);
		}
	};

	const handleFocus = () => {
		setIsInputState(true);
	};

	const handleBlur = () => {
		setIsInputState(false);
	};

	return (
  <div className='chat'>
    <div className='chat-list'>
      <Header
        onAddButtonClick={handleAddButtonClick}
        onLogout={onLogout}
      />

      <Search
        isInputState={isInputState}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
      />

      <ChatList
        chats={chats}
        setSelectedChatId={setSelectedChatId}
        iconProfile={iconProfile}
      />
    </div>

    <div className='chat-window'>
      {selectedChat ? (
        <>
          <ChatWindowHeader
            iconProfile={iconProfile}
            selectedChat={selectedChat}
          />

          <div className='chat-window__messages'>
            <MessageReceiver
              authData={authData}
              chats={chats}
              setChats={setChats}
              selectedChat={selectedChat}
              setSelectedChatId={setSelectedChatId}
            />

            {selectedChat.messages.map((msg, index) => (
              <p
                key={index}
                className={`chat-window__message ${
                  msg.sender === 'Me'
                    ? 'chat-window__message-my'
                    : 'chat-window__message-sender'
                }`}
              >
                {msg.text}
              </p>
            ))}
          </div>

          <InputSendMessage
            handleSendMessage={handleSendMessage}
            message={message}
            setMessage={setMessage}
          />
        </>
      ) : (
        ''
      )}
    </div>

    {showAddNewContact && (
      <AddNewContact
        onAddContact={handleAddContact}
        onClose={() => setShowAddNewContact(false)}
      />
    )}
  </div>
	);
};

export default Max;
