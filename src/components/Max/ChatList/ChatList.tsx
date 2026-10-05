import { FC } from 'react';
import { Chat } from '../../type/interface';

interface ChatListProps {
  chats: Chat[];
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | null>>;
  iconProfile: string;
}

const ChatList: FC<ChatListProps> = ({
	chats,
	setSelectedChatId,
	iconProfile,
}) => {
	return (
		<div className='chat-list__items'>
			{chats.map(chat => (
				<div
					key={chat.id}
					onClick={() => setSelectedChatId(chat.id)}
					className='chat-list__item'
				>
					<img className='chat-list__item-avatar' src={iconProfile} alt='' />
					<div className='chat-list__item-info'>
						<strong className='chat-list__item-name'>{chat.name}</strong>
						<p className='chat-list__item-message'>{chat.lastMessage}</p>
					</div>
					<span className='chat-list__item-time'>10:42</span>
				</div>
			))}
		</div>
	);
};

export default ChatList;
