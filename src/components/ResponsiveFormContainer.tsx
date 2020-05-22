import styled from "styled-components";


export const RootContainer = styled("div")`
    display: flex;
    height: 100%;
`;

export const ResponsiveContainer = styled("div")`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    @media(min-width: ${p => p.theme.breakpoints.values.sm}px) {
        width: 400px;
        margin: auto;
    }
`;

export const StyledForm = styled("form")`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    padding: 48px 32px;
    margin: 0;
    min-height: 500px;
    @media(min-width: ${p => p.theme.breakpoints.values.sm}px) {
        border: 1px solid ${p => p.theme.palette.border.default};
        border-radius: 12px;
    }
`;

export const ButtonWrapper = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;

export const ErrorWrapper = styled("div")`
    border: 1px solid ${p => p.theme.palette.error.main};
    border-radius: 4px;
    padding: 8px;
    color: ${p => p.theme.palette.error.main};
`;
