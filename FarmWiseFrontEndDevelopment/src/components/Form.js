import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Form = ({ collectedData }) => {
  // State to manage input values and validation errors
  const [inputValues, setInputValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (fieldName, value, maxLength) => {
    // Validate input based on maxLength
    if (value.length <= maxLength) {
      setInputValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
      setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: `Max length is ${maxLength}` }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form before submission
    const isValid = Object.values(validationErrors).every((error) => error === '');

    if (isValid) {
      // Handle form submission logic here
      console.log('Form submitted:', inputValues);
    } else {
      console.log('Form contains validation errors. Please correct them.');
    }
  };

  return (
    <form className="frm" onSubmit={handleSubmit}>
      {Object.keys(collectedData).map((key, index) => {
        const item = collectedData[key];
        const value = inputValues[item.fieldName] || '';

        return (
          <div className="frmelem" key={index}>
            {item.fieldName}:
            {item.fieldType === 'TextBox' && (
              <input
                type={item.fieldDataType === 'Number' ? 'number' : 'text'}
                maxLength={item.maxLength || undefined}
                required={item.mandatory === 'yes'}
                value={value}
                onChange={(e) => handleInputChange(item.fieldName, e.target.value, item.maxLength)}
              />
            )}
            {item.fieldType === 'DatePicker' && (
              <input
                type="date"
                required={item.mandatory === 'yes'}
                min={item.dateRange.from}
                max={item.dateRange.to}
                value={value}
                onChange={(e) => handleInputChange(item.fieldName, e.target.value)}
              />
            )}
            {item.fieldType === 'Dropdown' && (
              <select className="otherselect" value={value} onChange={(e) => handleInputChange(item.fieldName, e.target.value)}>
                <option value="">Select</option>
                {item.fieldDataArr.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            <div className="validation-error">{validationErrors[item.fieldName]}</div>
          </div>
        );
      })}
      <button className="but" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
