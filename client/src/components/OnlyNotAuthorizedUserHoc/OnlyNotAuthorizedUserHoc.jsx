import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = Component => {
  const WrappedComponent = ({ history }) => {
    const dispatch = useDispatch();
    const { isFetching, data } = useSelector(state => state.userStore);

    useEffect(() => {
      dispatch(getUser(history.replace));
    }, [dispatch, history.replace]);

    if (isFetching) {
      return <Spinner />;
    }

    if (!data) {
      return <Component history={history} />;
    }

    return null;
  };

  return WrappedComponent;
};

export default OnlyNotAuthorizedUserHoc;