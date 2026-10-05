import { FC } from 'react';
import { CgAttachment } from 'react-icons/cg';
import { FaCircleArrowUp } from 'react-icons/fa6';

interface InputSendMessageProps {
	message: string;
	setMessage: (value: string) => void;
	handleSendMessage: () => void;
}

const InputSendMessage: FC<InputSendMessageProps> = ({
	message,
	setMessage,
	handleSendMessage,
}) => {
	return (
		<div className='chat-window__send'>
			<button className='chat-window__send-btn attachment-btn'>
				<CgAttachment />
			</button>
			<textarea
				className='chat-window__input'
				value={message}
				onChange={e => setMessage(e.target.value)}
				placeholder='Сообщение'
			/>
			<button className='chat-window__send-btn' onClick={handleSendMessage}>
				<FaCircleArrowUp />
			</button>
		</div>
	);
};
export default InputSendMessage;
