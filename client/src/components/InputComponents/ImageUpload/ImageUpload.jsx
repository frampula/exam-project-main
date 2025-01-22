import React, { useState } from 'react';
import styles from './ImageUpload.module.sass';

const ImageUpload = props => {
  const { uploadContainer, inputContainer, imgStyle } = styles;
  const { form, field } = props

  const onChange = e => {
      const file = e.currentTarget.files[0];
      form.setFieldValue(field.name, file);
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (.png, .gif, .jpeg)</span>
        <input
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
    </div>
  );
}

export default ImageUpload;
