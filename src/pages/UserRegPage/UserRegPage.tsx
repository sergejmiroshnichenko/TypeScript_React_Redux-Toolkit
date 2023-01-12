import { FC } from 'react';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authSlice } from '../../store/auth';
import { useFormik } from 'formik';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { getRoutePath } from '../../router';
import { Link } from 'react-router-dom';
import { appSlice } from '../../store/app';
import styles from './UserRegPage.module.scss';

interface InitialValues {
  username: string;
  password: string;
  email: string;
}

const INITIAL_VALUES: InitialValues = {
  username: 'user1',
  email: 'user1@mail.ru',
  password: 'password123',
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
  email: yup.string().required('Не должно быть пустым!').email('Не почта!'),
});

export const UserRegPage: FC = () => {
  const dispatch = useAppDispatch();

  const registrationRequest = useAppSelector(
    authSlice.selectors.getRegistrationRequest,
  );

  const formik = useFormik<InitialValues>({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: ({ username, password, email }) => {
      dispatch(
        authSlice.thunks.registrationThunk({
          username,
          password,
          email,
          successCb: () => {
            alert(
              'Успешно зарегистрировали пользователя!, используйте его учетные данные для входа в систему!',
            );
            const loginPath = getRoutePath('login');
            dispatch(appSlice.actions.redirect(loginPath));
          },
        }),
      );
    },
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.loginFormTitle}>РЕГИСТРАЦИЯ</div>
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
            <div>почта</div>
            <Input
              type="text"
              placeholder="Введите имя"
              {...formik.getFieldProps('email')}
            />
            {Boolean(formik.touched.email) && Boolean(formik.errors.email) && (
              <div className={styles.msgError}>{formik.errors.email}</div>
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
              disabled={registrationRequest.isLoading}
            >
              submit
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.linkWrap}>
        <Link to={getRoutePath('login')}>войти в систему</Link>
      </div>
      {registrationRequest.error && (
        <div className={styles.loginRequestErrorMessage}>
          <div>Ошибка регистрации пользователя:</div>
          <div>{registrationRequest.error.errorMsg}</div>
        </div>
      )}
    </div>
  );
};
