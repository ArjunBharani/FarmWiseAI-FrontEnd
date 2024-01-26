import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFields } from '../slices/fieldSlice';
import FieldRow from './FieldRow';
import FieldsTable from './FieldsTable';
import Form from './Form';

const Fields = () => {
  const [fields, setFields] = useState([]);
  const [showFieldOptions, setShowFieldOptions] = useState(false);
  const [collectedData, setCollectedData] = useState([]);
  const [dataConfirmed, setDataConfirmed] = useState(false);
  const [finalObject, setFinalObject] = useState({});
  const [confirmingField, setConfirmingField] = useState(false);
  const [fieldCount, setFieldCount] = useState(0);
  const [selectedPersonType, setSelectedPersonType] = useState(null); // New state for selected person type
  const [addFieldsVisible, setAddFieldsVisible] = useState(true); // State to control the visibility of "Add Field" button and person type dropdown

  const addField = (fieldType) => {
    if (fields.length < 4 && fieldCount < 4) {
      setConfirmingField(true);
      setShowFieldOptions(false);
      setFields([...fields, { type: fieldType, id: Date.now() }]);
    }
  };

  const handleFieldConfirm = (fieldData) => {
    setCollectedData([...collectedData, fieldData]);
    setConfirmingField(false);
    setFields([]); // Reset fields after confirming
    setFieldCount((prevCount) => prevCount + 1);
  };

  const handleFieldCancel = (canceledFieldId) => {
    // If the field addition is canceled, remove the canceled field from the list
    setConfirmingField(false);
    setFields(fields.filter((field) => field.id !== canceledFieldId));
  };

  const renderFieldOptions = () => (
    <div>
      <select class="fieldtype" onChange={(e) => addField(e.target.value)}>
        <option value="">Select Field Type</option>
        <option value="TextBox">Text Box</option>
        <option value="Dropdown">Dropdown</option>
        <option value="DatePicker">Date Picker</option>
      </select>
    </div>
  );

  const handleReset = () => {
    setCollectedData([]);
    setFields([]);
    setShowFieldOptions(false);
    setDataConfirmed(false);
    setConfirmingField(false);
    setFieldCount(0);
    setAddFieldsVisible(true); // Reset visibility state
  };

  const handleDataConfirmation = () => {
    setDataConfirmed(true);
    setAddFieldsVisible(false); // Hide "Add Field" button and person type dropdown
    const combinedObject = collectedData.reduce((result, item, index) => {
      result[`data_${index + 1}`] = item;
      return result;
    }, {});
    setFinalObject(combinedObject);
    // No need to reset fields here, as it's already done in handleFieldConfirm
  };

  return (
    <>
      <div>
        {addFieldsVisible && (
          <select class="role-drop" onChange={(e) => setSelectedPersonType(e.target.value)}>
            <option class="role" value="student">Student</option>
            <option class="role" value="salaried">Salaried</option>
            <option class="role" value="business">Business</option>
          </select>
        )}
      </div>
      <div>
        {addFieldsVisible && (
          <button
            class="but"
            onClick={() => setShowFieldOptions(true)}
            disabled={!dataConfirmed && (confirmingField || fields.length >= 4 || fieldCount >= 4)}
          >
            Add Field
          </button>
        )}
        {showFieldOptions && renderFieldOptions()}
        {fields.map((field) => (
          <FieldRow
            key={field.id}
            initialFieldType={field.type}
            onConfirm={handleFieldConfirm}
            onCancel={() => handleFieldCancel(field.id)}
          />
        ))}
      </div>
      {!dataConfirmed && (
        <>
          <FieldsTable data={collectedData} />
          <button className="but danger" onClick={handleReset}>
            Reset
          </button>
          <button
            className="but custbut"
            onClick={handleDataConfirmation}
            disabled={collectedData.length === 0 || confirmingField || fields.length !== 0}
          >
            Confirm Data
          </button>
        </>
      )}

      {dataConfirmed && <Form collectedData={collectedData} selectedPersonType={selectedPersonType} />}
    </>
  );
};

export default Fields;
