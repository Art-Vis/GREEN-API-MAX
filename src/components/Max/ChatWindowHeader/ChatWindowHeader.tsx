import { GoSearch } from 'react-icons/go';
import { FC } from 'react';
import { Chat } from '../../type/interface';
import { LuPhone } from 'react-icons/lu';
import { TbVideo } from 'react-icons/tb';

interface ChatWindowHeaderProps {
	selectedChat: Chat;
	iconProfile: string;
}

const ChatWindowHeader: FC<ChatWindowHeaderProps> = ({
	selectedChat,
	iconProfile,
}) => {
	return (
		<div className='chat-window__header'>
			<div className='chat-window__header-wrap'>
				<img className='chat-window__avatar' src={iconProfile} alt='' />
				<div className='chat-window__header-info'>
					<h2 className='chat-window__header-name'>{selectedChat.name}</h2>
					<h2 className='chat-window__header-activity'>Был(-а) недавно</h2>
				</div>
			</div>

			<div className='chat-window__header-btns'>
				<button className='chat-window__header-btn'>
					<LuPhone />
				</button>
				<button className='chat-window__header-btn'>
					<TbVideo />
				</button>
				<button className='chat-window__header-btn'>
					<GoSearch />
				</button>
			</div>
		</div>
	);
};

export default ChatWindowHeader;
