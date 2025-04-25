import { styled } from 'styled-components';
import { BookDetail } from '../../model/book.model';
import InputText from '../common/InputText';
import Button from '../common/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBook } from '../../hooks/useBook';

interface Props {
    book : BookDetail;
}

function AddToCart({ book } : Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart, cartAdded } = useBook(book.id.toString());

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleIncrese = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrese = () => {
        if(quantity === 1) return; 
        setQuantity(quantity - 1);
    };

    return (
        <AddToCartStyle $added={cartAdded}>
            <div>
                <InputText inputType='number' value="number" onChange={handleChange} />
                <Button size='medium' scheme='normal' onClick={handleIncrese}>
                    +
                </Button>
                <Button size='medium' scheme='normal' onClick={handleDecrese}>
                    -
                </Button>
            </div>
            <Button size='medium' scheme='primary' onClick={() => addToCart(quantity)}>
                장바구니 담기
            </Button>
            <div className="added">
                <p>장바구니에 추가되었습니다.</p>
                <Link to="/carts">장바구니로 이동</Link>
            </div>
        </AddToCartStyle>
    );
}

interface addCartStyleProps {
    $added : boolean;
}

const AddToCartStyle = styled.div<addCartStyleProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .added {
        position: absolute;
        right: 0;
        bottom: -90px;
        background: ${({ theme }) => theme.color.background};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        padding: 8px 12px;
        opacity: ${({ $added }) => ($added ? "1" : "0")};
        transition: all 0.5s ease; /* 자연스러운 애니메이션 효과 */

        p {
            padding: 0 0 8px 0;
            margin: 0;
        }
    }
`;

export default AddToCart;