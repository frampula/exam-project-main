import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from './EventCountdown.css';

const EventCountdown = () => {
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState({});

  const handleSubmit = (values) => {
    const newEvent = {
      ...values,
      countdown: moment(values.dateTime).diff(moment(), 'seconds'),
      reminderCountdown: moment(values.reminderDateTime).diff(
        moment(),
        'seconds'
      ),
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
          if (moment(event.dateTime).isAfter(moment())) {
            const remainingTime = moment.duration(
              moment(event.dateTime).diff(moment())
            );
            const days = Math.floor(remainingTime.asDays());
            const hours = remainingTime.hours();
            const minutes = remainingTime.minutes();
            const seconds = remainingTime.seconds();

            return {
              ...event,
              countdown: { days, hours, minutes, seconds },
            };
          } else {
            return event;
          }
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setEvents((prevEvents) =>
      prevEvents.sort((a, b) => {
        if (moment(a.dateTime).isBefore(moment(b.dateTime))) {
          return -1;
        } else if (moment(a.dateTime).isAfter(moment(b.dateTime))) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }, [events]);

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
            theme: 'colored'
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
            {event.event} -{' '}
            {event.countdown && moment(event.dateTime).isAfter(moment()) && (
              <>
                {event.countdown.days}d {event.countdown.hours}h{' '}
                {event.countdown.minutes}m {event.countdown.seconds}s
              </>
            )}
            {moment(event.dateTime).isBefore(moment()) && (
              <span className="event-passed"> - Event has passed</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventCountdown;
