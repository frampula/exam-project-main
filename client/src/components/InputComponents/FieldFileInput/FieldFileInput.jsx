import React from 'react';
import { Field, useField } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  const [field, meta, helpers] = useField(rest.name);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file);
  };

  const clearFileInput = () => {
    helpers.setValue(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileInputRef = React.useRef(null);

  return (
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>
      <span id="fileNameContainer" className={fileNameClass}>
        {field.value ? field.value.name : ''}
      </span>
      <input
        id="fileInput"
        type="file"
        className={fileInput}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {field.value && (
        <button type="button" onClick={clearFileInput}>
          Clear
        </button>
      )}
    </div>
  );
};

export default FieldFileInput;
