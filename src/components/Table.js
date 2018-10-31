import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const Table = ({ caption, tableColumns, tableContent, onClick, }) => {
	return (
		<TableThemed>
			{
				caption && <CaptionThemed>{caption}</CaptionThemed>
			}
			<thead>
				<TrThemed>
					{
						tableColumns.map((item, index) => {
							return <ThThemed key={index}>{item}</ThThemed>
						})
					}
				</TrThemed>
			</thead>
			<tbody>
				{
					tableContent.map((element) => {
						return <TrThemed key={element.id} onClick={() => onClick(element.id)}>
							{
								tableColumns.map((column, index) => {
									return <TdThemed key={element.id + index + 1}>{element[column]}</TdThemed>
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
	caption: PropTypes.string,
	onClick: PropTypes.func,
	tableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
	tableContent: PropTypes.arrayOf(PropTypes.object).isRequired,
}