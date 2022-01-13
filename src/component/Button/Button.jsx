import propTypes from 'prop-types';
import { ButtonStyled, ButtonContainer } from './Button.styled';

function Button({ onClick }) {
  return (
    <ButtonContainer>
      <ButtonStyled onClick={onClick}>load more</ButtonStyled>
    </ButtonContainer>
  );
}

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Button;
