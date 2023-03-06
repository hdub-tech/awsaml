import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  InputGroup,
  Input,
  Tooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InputGroupWithCopyButton(props) {
  const {
    id: idFromProps,
    className,
    inputClassName,
    name,
    value,
    message,
    multiLine,
  } = props;
  const [tooltipState, setTooltipState] = useState(false);

  const handleTooltipTargetClick = () => {
    setTooltipState(!tooltipState);
    navigator.clipboard.writeText(value);

    setTimeout(function () { // eslint-disable-line prefer-arrow-callback, func-names
      setTooltipState(!tooltipState);
    }, 1000);
  };

  const id = `icon-${idFromProps}`;

  return (
    <InputGroup className={className}>
      <Input
        className={`form-control ${inputClassName}`}
        id={name}
        name={name}
        disabled
        type={multiLine ? 'textarea' : 'text'}
        value={value}
      />
      <Button
        onClick={handleTooltipTargetClick}
        id={id}
        outline
        color="secondary"
      >
        <Tooltip
          autohide
          container="#root"
          isOpen={tooltipState}
          placement="top"
          target={id}
        >
          {message}
        </Tooltip>
        <FontAwesomeIcon icon={['far', 'copy']} inverted="true" />
      </Button>
    </InputGroup>
  );
}

InputGroupWithCopyButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  inputClassName: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  multiLine: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

InputGroupWithCopyButton.defaultProps = {
  message: 'Copied!',
  multiLine: false,
};

export default InputGroupWithCopyButton;
