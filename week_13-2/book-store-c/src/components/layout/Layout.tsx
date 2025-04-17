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
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;