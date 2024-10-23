import React, { useState, useEffect } from 'react';
import Header from '../Header/Header'
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EventCountdown.css'; 

const EventCountdown = () => {
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState({});

  const handleSubmit = (values) => {
    const newEvent = {
      ...values,
      createdAt: moment(),
      totalDuration: moment(values.dateTime).diff(moment(), 'seconds'),
      countdown: moment(values.dateTime).diff(moment(), 'seconds'),
      reminderCountdown: moment(values.reminderDateTime).diff(moment(), 'seconds'),
    };
    setEvents([...events, newEvent]);
    setReminders((prevReminders) => ({
      ...prevReminders,
      [newEvent.event]: newEvent.reminderDateTime,
    }));
  };

  const EventSchema = Yup.object().shape({
    event: Yup.string().required('Event is required'),
    dateTime: Yup.date().required('Date is required'),
    reminderDateTime: Yup.date()
      .required('Reminding is required')
      .test('is-after-now', 'Reminder date invalid', function (value) {
        return moment(value).isAfter(moment());
      }),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          const remainingTime = moment(event.dateTime).diff(moment(), 'seconds');
          const totalDuration = moment(event.dateTime).diff(event.createdAt, 'seconds');

          if (remainingTime > 0) {
            const percentRemaining = ((totalDuration - remainingTime) / totalDuration) * 100;

            return {
              ...event,
              countdown: remainingTime,
              progress: percentRemaining,
            };
          } else {
            return {
              ...event,
              countdown: 0,
              progress: 100,
            };
          }
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      Object.keys(reminders).forEach((event) => {
        if (moment(reminders[event]).isSameOrBefore(moment())) {
          toast(`Reminder: ${event} is coming up!`, {
            position: 'top-center',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setReminders((prevReminders) => ({
            ...prevReminders,
            [event]: null,
          }));
        }
      });
    }, 1000);

    return () => clearInterval(reminderInterval);
  }, [reminders]);

  return (
    <>
    <Header />
    <div className="event-countdown">
      <h2 className="countdown-h2">Event Countdown</h2>
      <Formik
        initialValues={{ event: '', dateTime: '', reminderDateTime: '' }}
        validationSchema={EventSchema}
        onSubmit={handleSubmit}
      >
        <Form className="event-form">
          <div className="form-group">
            <label htmlFor="event" className="label">
              Event:
            </label>
            <Field type="text" name="event" className="form-control" />
            <ErrorMessage
              name="event"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTime" className="label">
              Date and Time:
            </label>
            <Field
              type="datetime-local"
              name="dateTime"
              className="form-control"
            />
            <ErrorMessage
              name="dateTime"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reminderDateTime" className="label">
              Reminder Date:
            </label>
            <Field
              type="datetime-local"
              name="reminderDateTime"
              className="form-control"
            />
            <ErrorMessage
              name="reminderDateTime"
              component="div"
              className="error-message"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Event
          </button>
        </Form>
      </Formik>

      <h3 className="h3">Upcoming Events:</h3>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.event} className="event-item">
            <div className="event-details">
              <span>{event.event}</span>
              {event.countdown > 0 && (
                <progress value={event.progress} max="100">
                  {event.progress}%
                </progress>
              )}
              {event.countdown === 0 && (
                <span className="event-passed"> Event has passed</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default EventCountdown;
