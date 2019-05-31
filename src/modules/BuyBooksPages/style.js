import styled from 'styled-components';
import img from '../../assets/images/credit-card.png'
import cardBack from '../../assets/images/credit-card-back.png'

const FormBox = styled.div`
	padding: 20px;
	max-width: 300px;
`;

const LiThemed = styled.li`
	display: flex;
	justify-content: space-between;
`;

const ButtonBox = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;

	button {
		max-width: 300px;
	}
`;

const CardContainer = styled.div`
	width: 300px;
	height: 185px;
	perspective: 1000;

	.cardNumberDuplicate {
		font-size: 26px;
		padding-top: 100px;
		text-align: center;
	}

	.cardNameDuplicate {
		font-size: 22px;
	}

	.cardDateDuplicate {
		font-size: 22px;
	}

	.cvcDuplicate {
		padding: 70px 0 0 185px;
	}

	.cardSides {
		background-repeat: no-repeat;
		background-size: 100%;
		width: 300px;
		height: 185px;
		backface-visibility: hidden;
		position: absolute;
 		top: 0;
		left: 0;
	}

	.flipper.backSide {
		transform: rotateY(180deg);
	}
`;

const Flipper = styled.div`
	transition: 0.6s;
	transform-style: preserve-3d;
	position: relative;
`;

const Front = styled.div`
	background-image: url(${img});
	z-index: 2;
`;

const Back = styled.div`
	background-image: url(${cardBack});
	transform: rotateY(180deg);
`;

const NameAndDateContainer = styled.div`
	display: flex;
	padding: 15px 20px 0 20px;
	justify-content: space-between;
`;

export {
	FormBox, LiThemed, ButtonBox, CardContainer, Flipper, Front, Back, NameAndDateContainer
}