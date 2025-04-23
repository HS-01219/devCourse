import { styled } from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/queryString';

function BooksFilter() {
    const { category } = useCategory();

    // querystring을 다룰 수 있음
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCategory = (id : number | null) => {
        // new URLSearchParams : 인스턴스 생성 후 해당 객체를 통해 쿼리 스트링에 접근 가능
        const newSearchParams = new URLSearchParams(searchParams);

        if(id === null) {
            newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
        } else {
            newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
        }

        setSearchParams(newSearchParams);
    };

    const handleNews = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        if(newSearchParams.get(QUERYSTRING.NEWS)) {
            newSearchParams.delete(QUERYSTRING.NEWS);
        } else {
            newSearchParams.set(QUERYSTRING.NEWS, 'true');
        }

        setSearchParams(newSearchParams);
    }

    return (
        <BooksFilterStyle>
            <div className="category">
                {
                    category.map((item) => (
                        <Button size='medium' 
                                scheme={item.isActive ? 'primary' : 'normal'} 
                                key={item.id} onClick={() => handleCategory(item.id)}>
                            {item.name}
                        </Button>
                    ))
                }
            </div>
            <div className="new">
                <Button size='medium' 
                        scheme={searchParams.get('news') ? 'primary' : 'normal'}
                        onClick={() => handleNews()}>신간</Button>
            </div>
        </BooksFilterStyle>
    );
}

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;
    
    .category {
        display: flex;
        gap: 8px;
    }
`;

export default BooksFilter;