import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../Store/Slices/isLogginInSlice';
import styles from './Login.module.css';  // Assuming you have a CSS module like Register

export default function Login() {
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    let navigate = useNavigate();

    async function handleLogin(values) {
        setisLoading(true);
        setErrorMsg(null);
        console.log(values);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch(
            (err) => {
                console.log(err);
                setisLoading(false);
                setErrorMsg(err.response.data.message);
            }
        );

        if (data.message === 'success') {
            setisLoading(false);
            localStorage.setItem("userToken", data.token);
            navigate('/');
            dispatch(loginAction());
        }
    }

    let mySchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: mySchema,
        onSubmit: (values) => handleLogin(values),
    });

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h3 className={styles.title}>Login Now</h3>
                {errorMsg && <div className={styles.alert}>{errorMsg}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            className={styles.input}
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className={styles.alert}>{formik.errors.email}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            name="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div className={styles.alert}>{formik.errors.password}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <i className="fa fa-spin fa-spinner"></i>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
