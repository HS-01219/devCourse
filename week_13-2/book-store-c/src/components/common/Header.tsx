import { styled } from "styled-components";
import logo from '../../assets/images/logo.png';
import { FaSignInAlt, FaRegUser, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Category } from "../../model/category.model";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "../header/ThemeSwitcher";
import { useCategory } from "@/hooks/useCategory";

function Header() {
    const { category } = useCategory();

    const { isLoggedIn, storeLogout } = useAuthStore();
    return (
        <HeaderStyle>
            <h1 className="logo">
                <Link to="/">
                    <img src={logo} alt="book store" />
                </Link>
            </h1>
            <nav className="category">
                <ul>
                    {
                        category.map((item : Category) => (
                            <li key={item.id}>
                                <Link to={item.id ? `/books?category_id=${item.id}` : `/books`}>{item.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <nav className="auth">
                <Dropdown toggleButton={<FaUserCircle />}>
                    <>
                        { !isLoggedIn && (
                                <ul>
                                    <li>
                                        <Link to="/cart">장바구니</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">주문 내역</Link>
                                    </li>
                                    <li>
                                        <button onClick={storeLogout}>로그아웃</button>
                                    </li>
                                </ul>
                            )
                        }
                        { isLoggedIn && (
                                <ul>
                                    <li>
                                        <Link to="/login">
                                            <FaSignInAlt />
                                            로그인
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">
                                            <FaRegUser />
                                            회원가입
                                        </Link>
                                    </li>
                                </ul>
                            )
                        }
                        <ThemeSwitcher />
                    </>
                </Dropdown>
            </nav>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.header`
    width: 100%;
    margin : 0 auto;
    max-width: ${({theme}) => theme.layout.width.large};

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${({theme}) => theme.color.background};

    .logo {
        img {
            width: 200px;
        }
    }

    .category {
        ul {
            display: flex;
            gap: 32px;
            li {
                a {
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-decoration: none;
                    color: ${({theme}) => theme.color.text};
                    &:hover {
                        color: ${({theme}) => theme.color.primary};
                    }
                }
            }
        }
    }

    .auth {
        ul {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100px;
            gap: 16px;

            li {
                a, button {
                    font-size: 1rem;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    line-height: 1;
                    background: none;
                    border: 0;
                    cursor: pointer;
                    padding: 0;
                    width: 100%;

                    svg {
                        margin-right: 6px;
                    }
                }
            }
        }
    }
`;

export default Header;