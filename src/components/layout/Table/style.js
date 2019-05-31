import styled from 'styled-components';

const TableThemed = styled.table`
	border: 2px solid ${props => props.theme.primary};
	color: ${props => props.theme.primary};
	width: 100%;
	text-align: center;
`;

const CaptionThemed = styled.caption`
	background-color: ${props => props.theme.primary};
	color: #fff;
	padding: 0.4em 1em;
`;

const TrThemed = styled.tr`
	:hover {
	background-color:  ${props => props.theme.secondaryBg};
	cursor: pointer;
	}
`;

const ThThemed = styled.th`
	padding: 0.4em 1em;
	border: 2px solid ${props => props.theme.primary};
`;

const TdThemed = styled.td`
	padding: 0.4em 1em;
	border: 2px solid ${props => props.theme.primary};
`;

export {
	TableThemed, CaptionThemed, TrThemed, ThThemed, TdThemed
}