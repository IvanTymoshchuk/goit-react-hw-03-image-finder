import {Btn} from './Button.styled';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <Btn type="button" onClick={onClick}>
      Load more
    </Btn>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};