import Card from "../base_component/StyledCard"
import PropTypes from 'prop-types'
import getPropByString from '../helpers/getPropByString';
import styled from '@emotion/styled';

function CardList(props) {
    let {
        data = [],
        dataField,
        titleField,
        imageField,
        onClick
    } = props
    const CardList = getPropByString(data, dataField).map((value, index) => {
        return <Card
            key={'card' + index}
            title={getPropByString(value, titleField)}
            imgSrc={getPropByString(value, imageField)}
            data={value}
            onClick={onClick}
        />
    });

    const CardListContainer = styled.div` 
        width: 90%;
        height: 100% /* height given for illustration */
        position: relative;
        margin: 0 auto;
        display: grid;
        
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 20px;
        
        @media (min-width: 30em) {
          grid-template-columns: 1fr 1fr;
        }
        
        @media (min-width: 60em) {
          grid-template-columns: repeat(5, 1fr);
        }
    `

    return <CardListContainer>
        {CardList}
    </CardListContainer>
};

CardList.propTypes = {
    data: PropTypes.any,
    dataField: PropTypes.string,
    titleField: PropTypes.string,
    imageField: PropTypes.string,
    onClick: PropTypes.func
}

export default CardList;