import React from 'react';
import PropTypes from 'prop-types';
import { TableThemed, CaptionThemed, TrThemed, ThThemed, TdThemed, } from './style';

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