import styled from "styled-components";
import Footer from "../common/Footer";
import Header from "../common/Header";

interface LayoutProps {
    // 리액트로 만든 모든 컴포넌트를 대체할 수 있다.
    // React Node > React Element > JSX Element
    children : React.ReactNode;
}

function Layout({children} : LayoutProps) {
    return (
        <>
            <Header />
                <LayoutStyle>
                    {children}
                </LayoutStyle>
            <Footer />
        </>
    );
}

const LayoutStyle = styled.main`
    width: 100%;
    margin : 0 auto;
    max-width: ${({theme}) => theme.layout.width.large};
    padding: 20px 0;
`;

export default Layout;