import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useFormik } from 'formik';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import * as yup from 'yup';
import { authSlice } from '../../store/auth';
import { getRoutePath } from '../../router';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';

interface InitialValues {
  username: string;
  password: string;
}

const INITIAL_VALUES: InitialValues = {
  username: 'dev_1',
  password: 'AggC21223',
};

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Не должно быть пустым!')
    .min(2, 'не менее 2 символов'),
  password: yup
    .string()
    .required('Не должно быть пустым!')
    .min(6, 'не менее 6 символов'),
});

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const loginRequest = useAppSelector(authSlice.selectors.getIsLoginRequest);

  const formik = useFormik<InitialValues>({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: ({ username, password }) => {
      dispatch(authSlice.thunks.loginThunk({ username, password }));
    },
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.loginFormTitle}>ЛОГИН</div>
      <div>
        <form
          noValidate
          autoComplete={'off'}
          onSubmit={formik.handleSubmit}
          className={styles.formWrap}
        >
          <div className={styles.fieldBlock}>
            <div>имя</div>
            <Input
              type="text"
              placeholder="Введите имя"
              {...formik.getFieldProps('username')}
            />
            {Boolean(formik.touched.username) &&
              Boolean(formik.errors.username) && (
                <div className={styles.msgError}>{formik.errors.username}</div>
              )}
          </div>

          <div className={styles.fieldBlock}>
            <div>пароль</div>
            <Input
              type="text"
              placeholder="Введите имя"
              {...formik.getFieldProps('password')}
            />
            {Boolean(formik.touched.password) &&
              Boolean(formik.errors.password) && (
                <div className={styles.msgError}>{formik.errors.password}</div>
              )}
          </div>

          <div>
            <Button
              className={styles.button}
              type={'submit'}
              disabled={loginRequest.isLoading}
            >
              submit
            </Button>
          </div>
        </form>
        <div className={styles.linkWrap}>
          <Link to={getRoutePath('userReg')}>регистрация</Link>
        </div>
      </div>
      {loginRequest.error && (
        <div className={styles.loginRequestErrorMessage}>
          <div>Ошибка входа в систему:</div>
          <div>{loginRequest.error.errorMsg}</div>
        </div>
      )}
    </div>
  );
};
