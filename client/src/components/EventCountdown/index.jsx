import React, { useState, useEffect, useCallback, createContext } from 'react';
import { toast } from 'react-toastify';
import { isEqual } from 'lodash';
import { ToastContainer } from 'react-toastify';
import { formatTime } from '../../utils/time';

import 'react-toastify/dist/ReactToastify.css';

export const EventCountdownContext = createContext({
  checks: [],
  addCheck: () => {},
  delCheck: () => {},
  updateCheck: () => {},
});

const EventCountdown = ({ children, ...props }) => {
  const [checks, setChecks] = useState([]);
  const [oldChecks, setOldChecks] = useState([]);

  useEffect(() => {
    const savedChecks = localStorage.getItem('eventChecks');
    if (savedChecks) {
      const parsedChecks = JSON.parse(savedChecks);
      setChecks(parsedChecks);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setChecks(prevChecks => 
        prevChecks.map(check => {
          if (check.status === 'completed') return check;

          const timeLeft = check.eventDate - now;
          
          // Проверка напоминания
          if (now >= check.reminderDate && !check.reminderShown) {
            toast.info(
              `Напоминание: до события "${check.name}" осталось ${formatTime(timeLeft)}!`,
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

          // Проверка завершения события
          if (timeLeft <= 0) {
            toast.success(`Событие завершено: ${check.name}`, {
              position: 'top-right',
              autoClose: 5000,
            });
            return {
              ...check,
              status: 'completed',
              backgroundColor: '#f5f5f5',
              timeLeft: 0
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
      setChecks(prevChecks => [...prevChecks, newCheck]);
    },
    []
  );

  const handleDelCheck = useCallback(
    (index) => {
      setChecks(prevChecks => prevChecks.filter((_, i) => i !== index));
    },
    []
  );

  const handleUpdateCheck = useCallback(
    (index, updatedCheck) => {
      setChecks(prevChecks => 
        prevChecks.map((check, i) => 
          i === index ? updatedCheck : check
        )
      );
    },
    []
  );

  return (
    <>
      <EventCountdownContext.Provider
        value={{ 
          addCheck: handleAddCheck, 
          delCheck: handleDelCheck, 
          updateCheck: handleUpdateCheck,
          checks 
        }}
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