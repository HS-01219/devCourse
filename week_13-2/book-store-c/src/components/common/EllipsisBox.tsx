import React, { useState } from 'react';
import { styled } from 'styled-components';
import Button from './Button';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
    lineLimit : number;
    children : React.ReactNode;
}

function EllipsisBox({ lineLimit, children } : Props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <EllipsisBoxBoxStyle lineLimit={lineLimit} $expanded={expanded}>
            <p>{children}</p>
            <div className="toggle">
                <Button size='small' scheme='normal' 
                        onClick={() => setExpanded(!expanded)}>
                    {expanded ? "접기" : "펼치기"} <FaAngleDown />
                </Button>
            </div>
        </EllipsisBoxBoxStyle>
    );
}

interface EllipsisBoxStyleProps {
    lineLimit : number;
    $expanded : boolean;
}

const EllipsisBoxBoxStyle = styled.div<EllipsisBoxStyleProps>`
    p {
        overflow: hidden;
        text-overflow: ellipsis; /* overflow가 생기면 말줄임표 */
        display: -webkit-box;
        /* style */
        -webkit-line-clamp: ${({ lineLimit, $expanded }) => $expanded ? 'none' : lineLimit}; /* lineLimit 줄까지 보여주겠다 */
        -webkit-box-orient: vertical; /* 방향 */
        padding: 0;
        margin: 20px 0 0 0;
    }

    .toggle {
        display: flex;
        justify-content: end;
        svg {
            transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0)'};
        }
    }
`;

export default EllipsisBox;