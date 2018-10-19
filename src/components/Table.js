import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import v4 from 'uuid-v4';

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

const Table = ({ caption, tableContent, }) => {
	return (
		<TableThemed>
			<CaptionThemed>{caption}</CaptionThemed>
			<thead>
				<TrThemed>
					{
						Object.keys(tableContent[0]).map((item) => {
							return <ThThemed key={v4()}>{item}</ThThemed>
						})
					}
				</TrThemed>
			</thead>
			<tbody>
				{
					tableContent.map((element) => {
						return <TrThemed key={v4()}>
							{
								Object.values(element).map((item) => {
									return <TdThemed key={v4()}>{item}</TdThemed>
								})
							}
						</TrThemed>
					})
				}
			</tbody>
		</TableThemed>
	)
}

export default Table;

Table.propTypes = {
	caption: PropTypes.string.isRequired,
	tableContent: PropTypes.arrayOf(PropTypes.object).isRequired,
}