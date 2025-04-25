import { styled } from 'styled-components';
import { BookDetail } from '../../model/book.model';
import Button from '../common/Button';
import { FaHeart } from 'react-icons/fa';

interface Props {
    book : BookDetail;
    onClick : () => void;
}

function LikeButton({ book, onClick } : Props) {
    return (
        <LikeButtonStyle size='medium' scheme={book.liked ? 'like' : 'normal'} onClick={onClick}>
            <FaHeart />
            {book.likes}
        </LikeButtonStyle>
    );
}

const LikeButtonStyle = styled(Button)`
    display: flex;
    gap: 6px;

    svg {
        color: inherit; /* 부모 color 상속 */
        * { /* svg의 path 처리 */
            color: inherit;
        }
    }
`;

export default LikeButton;