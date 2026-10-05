import { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';

interface SearchProps {
	isInputState: boolean;
	handleFocus: () => void;
	handleBlur: () => void;
}

const Search: FC<SearchProps> = ({ isInputState, handleFocus, handleBlur }) => {
	return (
		<label className='chat-list__search-label' htmlFor='searchInput'>
			{isInputState ? (
				<FaArrowLeft className='chat-list__search-svg green' />
			) : (
				<GoSearch className='chat-list__search-svg' />
			)}
			<input
				className='chat-list__search-input'
				id='searchInput'
				type='search'
				placeholder='Поиск'
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</label>
	);
};
export default Search;
