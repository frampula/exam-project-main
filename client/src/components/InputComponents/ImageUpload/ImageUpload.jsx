import React, { useState } from 'react';
import styles from './ImageUpload.module.sass';
import { Field, ErrorMessage } from 'formik';

const ImageUpload = (props) => {
  const { uploadContainer, inputContainer } = styles;
  const { label, name, ...rest } = props;

  return (
    <Field name={name}>
      {(props) => {
        const {
          field,
          form,
          meta: { touched, error },
        } = props;

        const onChange = (e) => {
          const file = e.currentTarget.files[0];
          form.setFieldValue(field.name, file);
        };

        return (
          <div className={uploadContainer}>
            <div className={inputContainer}>
              <span>Support only images (.png, .gif, .jpeg)</span>

              <br/>

                <input
                type="file"
                accept=".jpg, .png, .jpeg .gif"
                {...field}
                {...rest}
                value=""
                onChange={onChange}
              />
            </div>
          </div>
        );
      }}
    </Field>
  );
};

export default ImageUpload;
