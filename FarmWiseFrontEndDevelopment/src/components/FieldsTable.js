import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { resetFields } from "../slices/fieldSlice";
import { resetForm, updateFormData } from "../slices/formSlice";

const List = ({ data }) => {
  return (
    <div>
      <center><h2>Collected Data</h2></center>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Field Name</th>
            <th>Field Type</th>
            <th>Field Data Type</th>
            <th>Field Validations</th>
            <th>Field Data</th>
            <th>Is Mandatory</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.fieldName}</td>
              <td>{item.fieldType}</td>
              <td>{item.fieldDataType}</td>
              <td>{item.additionalField}</td>
              <td>{item.fieldType === 'TextBox' || item.fieldType === 'DatePicker' ? '-' : item.fieldData}</td>
              <td>{item.mandatory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
