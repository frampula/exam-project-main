import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import styles from './EventCountdown.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { EventCountdownContext } from "../../components/EventCountdown"
import Schems from '../../utils/validators/validationSchems';
import { formatTime, convertToMilliseconds } from '../../utils/time';

const EventCountdown = () => {
  const {addCheck, delCheck, checks} = useContext(EventCountdownContext)

  const handleSubmit = (values, { resetForm }) => {
    const durationMs = convertToMilliseconds(values.duration, values.timeUnit);
    const reminderMs = convertToMilliseconds(values.reminderTime, values.reminderUnit);
    const endTime = Date.now() + durationMs;
    const reminderTime = endTime - reminderMs;

    const newCheck = {
      name: values.name,
      duration: durationMs,
      endTime: endTime,
      reminderTime: reminderTime,
      timeLeft: durationMs,
      status: 'active',
      backgroundColor: '#e8f5e9'
    };

    addCheck(newCheck)
    resetForm();
  };

  const calculateProgress = (check) => {
    const totalDuration = check.duration;
    const elapsed = totalDuration - check.timeLeft;
    return (elapsed / totalDuration) * 100;
  };

  return (
    <>
      <Header />
      <div className={styles.checksContainer}>
        <div className={styles.checksHeader}>
          <h2>Live upcomming checks</h2>
          <div className={styles.remainingTime}>
            Remaining time <span className={styles.clockIcon}>🕒</span>
          </div>
        </div>

        <Formik
          initialValues={{ 
            name: '', 
            duration: '', 
            timeUnit: 'minutes',
            reminderTime: '',
            reminderUnit: 'minutes'
          }}
          validationSchema={Schems.CheckSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.checkForm}>
            <div className={styles.formGroup}>
              <Field
                type="text"
                name="name"
                placeholder="Enter check name"
                className={styles.formInput}
              />
              <ErrorMessage name="name" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <Field
                type="number"
                name="duration"
                placeholder="Duration"
                className={styles.formInput}
              />
              <ErrorMessage name="duration" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <Field
                as="select"
                name="timeUnit"
                className={styles.formTime}
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </Field>
              <ErrorMessage name="timeUnit" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <Field
                type="number"
                name="reminderTime"
                placeholder="Reminder"
                className={styles.formInput}
              />
              <ErrorMessage name="reminderTime" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <Field
                as="select"
                name="reminderUnit"
                className={styles.formTime}
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </Field>
              <ErrorMessage name="reminderUnit" component="div" className={styles.errorMessage} />
            </div>
            <button type="submit" className={styles.addButton}>
              Add Check
            </button>
          </Form>
        </Formik>

        <div className={styles.checksList}>
          {checks.map((check, index) => (
            <div 
              key={index} 
              className={`${styles.checkItem} ${check.status === 'completed' ? styles.completed : ''}`}
              style={{ backgroundColor: check.backgroundColor }}
            >
              <div className={styles.checkContent}>
                <div className={styles.checkName}>{check.name}</div>
                <div className={styles.checkActions}>
                  <div className={styles.checkDuration}>
                  {(check.timeLeft ? formatTime(check.timeLeft) : 'Completed')}
                  </div>
                  <button
                    onClick={() => delCheck(index)}
                    className={styles.deleteButton}
                    aria-label="Delete check"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className={styles.progressBarContainer}>
                <div 
                  className={styles.progressBar}
                  style={{ 
                    width: `${calculateProgress(check)}%`,
                    backgroundColor: check.status === 'completed' ? '#f5f5f5' : '#28d2d0'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventCountdown 

