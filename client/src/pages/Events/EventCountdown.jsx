import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import styles from './EventCountdown.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { EventCountdownContext } from "../../components/EventCountdown"
import Schems from '../../utils/validators/validationSchems';
import { formatTime } from '../../utils/time';

const EventCountdown = () => {
  const {addCheck, delCheck, checks} = useContext(EventCountdownContext)
  const [forceUpdate, setForceUpdate] = useState(0);

  // Обновляем состояние каждую секунду для перерисовки прогресс-бара
  useEffect(() => {
    const intervalId = setInterval(() => {
      setForceUpdate(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const eventDate = new Date(values.eventDate).getTime();
    const reminderDate = new Date(values.reminderDate).getTime();
    const now = Date.now();

    if (eventDate <= now) {
      toast.error('Дата события должна быть в будущем');
      return;
    }

    if (reminderDate >= eventDate) {
      toast.error('Дата напоминания должна быть раньше даты события');
      return;
    }

    const newCheck = {
      name: values.name,
      eventDate: eventDate,
      reminderDate: reminderDate,
      timeLeft: eventDate - now,
      status: 'active',
      backgroundColor: '#e8f5e9'
    };

    addCheck(newCheck)
    resetForm();
  };

  const calculateProgress = (check) => {
    const now = Date.now();
    const totalDuration = check.eventDate - check.reminderDate;
    const elapsed = now - check.reminderDate;
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };

  return (
    <>
      <Header />
      <div className={styles.checksContainer}>
        <div className={styles.checksHeader}>
          <h2>
            <span className={styles.headerIcon}>📅</span> 
            Предстоящие события
          </h2>
          <div className={styles.remainingTime}>
            Осталось времени <span className={styles.clockIcon}>🕒</span>
          </div>
        </div>

        <Formik
          initialValues={{ 
            name: '', 
            eventDate: '', 
            reminderDate: ''
          }}
          validationSchema={Schems.CheckSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.checkForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Название события:</label>
              <Field
                type="text"
                name="name"
                placeholder="Введите название события"
                className={styles.formInput}
              />
              <ErrorMessage name="name" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Дата и время события:</label>
              <Field
                type="datetime-local"
                name="eventDate"
                className={styles.formInput}
              />
              <ErrorMessage name="eventDate" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Дата и время напоминания:</label>
              <Field
                type="datetime-local"
                name="reminderDate"
                className={styles.formInput}
              />
              <ErrorMessage name="reminderDate" component="div" className={styles.errorMessage} />
            </div>
            <button type="submit" className={styles.addButton}>
              <span className={styles.addIcon}>+</span> Добавить событие
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
                    {check.timeLeft > 0 ? formatTime(check.timeLeft) : 'Завершено'}
                  </div>
                  <button
                    onClick={() => delCheck(index)}
                    className={styles.deleteButton}
                    aria-label="Удалить событие"
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

