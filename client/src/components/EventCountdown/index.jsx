import React, { useState, useEffect, useCallback, createContext } from 'react';
import { toast } from 'react-toastify';
import { isEqual } from 'lodash';
import { ToastContainer } from 'react-toastify';
import { formatTime } from '../../utils/time';

import 'react-toastify/dist/ReactToastify.css';

export const EventCountdownContext = createContext({
  checks: [],
  handleChecksUpdate: () => {},
});

const EventCountdown = ({ children, ...props }) => {
  const [checks, setChecks] = useState([]);
  const [oldChecks, setOldChecks] = useState([]);

  useEffect(() => {
    const savedChecks = localStorage.getItem('eventChecks');

    if (savedChecks) {
      const parsedChecks = JSON.parse(savedChecks);
      const updatedData = parsedChecks.map((check) => ({
        ...check,
        timeLeft: Math.max(0, check.endTime - Date.now()),
      }));
      setChecks(updatedData);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setChecks((prevChecks) =>
        prevChecks.map((check) => {
          const now = Date.now();
          const timeLeft = Math.max(0, check.endTime - now);

          if (
            check.reminderTime &&
            now >= check.reminderTime &&
            !check.reminderShown
          ) {
            toast.info(
              `Reminder: ${check.name} will end in ${formatTime(timeLeft)}!`,
              {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
            );
            return { ...check, reminderShown: true, timeLeft };
          }

          if (timeLeft === 0 && check.status !== 'completed') {
            toast.success(`Event completed: ${check.name}`, {
              position: 'top-right',
              autoClose: 5000,
            });
            return {
              ...check,
              status: 'completed',
              backgroundColor: '#f5f5f5',
              timeLeft,
            };
          }
          return { ...check, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isEqual(checks, oldChecks)) {
      localStorage.setItem('eventChecks', JSON.stringify(checks));
      setOldChecks(checks);
    }
  }, [checks]);

  const handleAddCheck = useCallback(
    (newCheck) => {
      const newChecks = [...checks, newCheck];
      setChecks(newChecks);
    },
    [checks]
  );

  const handleDelCheck = useCallback(
    (index) => {
      const newChecks = checks.filter((_, i) => i !== index);
      setChecks(newChecks);
    },
    [checks]
  );

  return (
    <>
      <EventCountdownContext.Provider
        value={{ addCheck: handleAddCheck, delCheck: handleDelCheck, checks }}
      >
        {children}
      </EventCountdownContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </>
  );
};

export default EventCountdown