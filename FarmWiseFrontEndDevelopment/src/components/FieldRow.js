import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const FieldRow = ({ initialFieldType, onConfirm, onCancel }) => {
  const [fieldType, setFieldType] = useState(initialFieldType);
  const [fieldName, setFieldName] = useState('');
  const [fieldDataType, setFieldDataType] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [maxLength, setMaxLength] = useState('');
  const [mandatory, setMandatory] = useState('no');
  const [fieldData, setFieldData] = useState('');

  useEffect(() => {
    setFieldDataType('');
    setMaxLength('');
    setFieldData('');
  }, [fieldType]);

  const handleConfirm = () => {
    // Perform validations here
    if (fieldName.trim() === '') {
      alert('Field Display Name is required.');
      return;
    }

    if (fieldType === 'TextBox' && (fieldDataType === '' || maxLength === '')) {
      alert('Field Data Type and Max Length are required for Text Box.');
      return;
    }

    if (fieldType === 'Dropdown' && (fieldDataType === '' || fieldData === '')) {
      alert('Field Data Type and Field Data are required for Dropdown.');
      return;
    }

    if (fieldType === 'DatePicker' && (fieldDataType === '' || dateRange.from === '' || dateRange.to === '')) {
      alert('Field Data Type, Date Range From, and Date Range To are required for Date Picker.');
      return;
    }

    // If all validations pass, proceed with confirmation
    const fieldDataArr = fieldData.trim().split(' ');
    let additionalField = 'Nil';

    if (fieldType === 'TextBox') {
      additionalField = `Max ${maxLength} digits`;
    } else if (fieldType === 'DatePicker') {
      additionalField = `Between ${dateRange.from} to ${dateRange.to}`;
    }

    onConfirm({
      fieldType,
      fieldName,
      fieldDataType,
      additionalField,
      mandatory,
      fieldData,
      maxLength,
      dateRange,
      fieldDataArr,
    });
  };

  const handleCancel = () => {
    // Reset state and cancel the current field addition
    setFieldType(initialFieldType);
    setFieldName('');
    setFieldDataType('');
    setDateRange({ from: '', to: '' });
    setMaxLength('');
    setMandatory('no');
    setFieldData('');

    // Notify the parent component that the field addition is canceled
    onCancel();
  };

  return (
    <>
      <div className="fieldrow">
        <div className="fieldrowelem">
          <label>Field Type</label>
          <select className="fieldtype" value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
            <option value="TextBox">Text Box</option>
            <option value="Dropdown">Dropdown</option>
            <option value="DatePicker">Date Picker</option>
          </select>
        </div>

        {fieldType === 'TextBox' && (
          <>
            <div className="fieldrowelem">
              <label>Field Display Name</label>
              <input placeholder="Name" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
            </div>

            <div className="fieldrowelem">
              <label>Field Data Type</label>
              <select className="otherselect" value={fieldDataType} onChange={(e) => setFieldDataType(e.target.value)}>
                <option value="">Select Data Type</option>
                <option value="String">String</option>
                <option value="Number">Number</option>
              </select>
            </div>

            <div className="fieldrowelem">
              <label>Field Max Length Allowed</label>
              <input placeholder="Max Length" type="number" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} />
            </div>
          </>
        )}

        {fieldType === 'Dropdown' && (
          <>
            <div className="fieldrowelem">
              <label>Field Display Name</label>
              <input placeholder="Mobile" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
            </div>
            <div className="fieldrowelem">
              <label>Field Data Type</label>
              <select className="otherselect" value={fieldDataType} onChange={(e) => setFieldDataType(e.target.value)}>
                <option value="">Select Data Type</option>
                <option value="String">String</option>
                <option value="Number">Number</option>
              </select>
            </div>

            <div className="fieldrowelem">
              <label>Field Data</label>
              <input placeholder="Field Data" value={fieldData} onChange={(e) => setFieldData(e.target.value)} />
            </div>
          </>
        )}

        {fieldType === 'DatePicker' && (
          <>
            <div className="fieldrowelem">
              <label>Field Display Name</label>
              <input placeholder="DOB" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
            </div>
            <div className="fieldrowelem">
              <label>Field Data Type</label>
              <select value={fieldDataType} onChange={(e) => setFieldDataType(e.target.value)}>
                <option value="">Select Data Type</option>
                <option value="Date">Date</option>
              </select>
            </div>

            <div className="fieldrowelem">
              <label>Date Range From</label>
              <input type="date" placeholder="From" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
            </div>

            <div className="fieldrowelem">
              <label>Date Range To</label>
              <input type="date" placeholder="To" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
            </div>
          </>
        )}
        <div className="fieldrowelem">
          <label>Mandatory</label>
          <select className="otherselect" value={mandatory} onChange={(e) => setMandatory(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <button className="but" onClick={handleConfirm}>
          Confirm
        </button>

        <button className="but danger" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default FieldRow;
