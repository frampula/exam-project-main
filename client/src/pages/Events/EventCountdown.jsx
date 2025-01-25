import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import styles from './EventCountdown.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const EventCountdown = () => {
  const [checks, setChecks] = useState(() => {
    const savedChecks = localStorage.getItem('eventChecks');
    if (savedChecks) {
      const parsedChecks = JSON.parse(savedChecks);
      return parsedChecks.map(check => ({
        ...check,
        timeLeft: Math.max(0, check.endTime - Date.now())
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('eventChecks', JSON.stringify(checks));
  }, [checks]);

  useEffect(() => {
    const timer = setInterval(() => {
      setChecks(prevChecks => 
        prevChecks.map(check => {
          const now = Date.now();
          const timeLeft = Math.max(0, check.endTime - now);
          
          if (check.reminderTime && now >= check.reminderTime && !check.reminderShown) {
            toast.info(`Reminder: ${check.name} will end in ${formatTime(timeLeft)}!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            return { ...check, reminderShown: true, timeLeft };
          }

          if (timeLeft === 0 && check.status !== 'completed') {
            toast.success(`Event completed: ${check.name}`, {
              position: "top-right",
              autoClose: 5000,
            });
            return { ...check, status: 'completed', backgroundColor: '#f5f5f5', timeLeft };
          }
          return { ...check, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const CheckSchema = Yup.object().shape({
    name: Yup.string()
      .required('Check name is required')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!'),
    duration: Yup.number()
      .required('Duration is required')
      .positive('Must be positive')
      .max(999, 'Value is too large'),
    timeUnit: Yup.string()
      .required('Time unit is required')
      .oneOf(['minutes', 'hours', 'days'], 'Invalid time unit'),
    reminderTime: Yup.number()
      .min(0, 'Must be positive')
      .max(100, 'Value is too large')
      .required('Reminder time is required'),
    reminderUnit: Yup.string()
      .required('Reminder unit is required')
      .oneOf(['minutes', 'hours', 'days'], 'Invalid time unit')
  });

  const convertToMilliseconds = (value, unit) => {
    const conversions = {
      minutes: value * 60 * 1000,
      hours: value * 60 * 60 * 1000,
      days: value * 24 * 60 * 60 * 1000
    };
    return conversions[unit];
  };

  const formatTime = (ms) => {
    if (ms <= 0) return 'Completed';
    
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);

    return parts.join(' ');
  };

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
    setChecks(prev => [...prev, newCheck]);
    resetForm();
  };

  const handleDelete = (index) => {
    setChecks(prev => prev.filter((_, i) => i !== index));
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
          validationSchema={CheckSchema}
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
                    {formatTime(check.timeLeft)}
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
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

