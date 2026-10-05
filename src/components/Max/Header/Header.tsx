import { FC } from 'react';
import { IoAddCircle } from 'react-icons/io5';

interface HeaderProps {
	onAddButtonClick: () => void;
	onLogout: () => void;
}

const Header: FC<HeaderProps> = ({ onAddButtonClick }) => {
	return (
		<div className='chat-list__header'>
			<h1 className='chat-list__title'>Чаты</h1>
			<div className='chat-list__header-btns'>
				<button
					className='chat-list__header-btn add'
					onClick={onAddButtonClick}
				>
					<IoAddCircle />
				</button>
			</div>
		</div>
	);
};

export default Header;
