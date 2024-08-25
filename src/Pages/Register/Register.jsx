import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Register.module.css';  // Ensure you have a corresponding CSS file

export default function Register() {
    const [isLoading, setisLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    let navigate = useNavigate();

    async function register(values) {
        setisLoading(true);
        setErrorMsg(null);
        console.log(values);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch(
            (err) => {
                setisLoading(false);
                setErrorMsg(err.response.data.message);
            }
        );

        if (data.message === 'success') {
            setisLoading(false);
            navigate('/login');
        }
    }

    let mySchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Minimum is 3 characters").max(15, 'Maximum is 15 characters'),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,}$/, "Password should start with a capital letter and must be at least 6 characters long").required("Password is required"),
        rePassword: Yup.string().required("Re-password is required").oneOf([Yup.ref('password')], "Re-password must match password"),
        phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Invalid phone")
    });

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: mySchema,
        onSubmit: (values) => register(values)
    });

    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.formWrapper} col-md-6`}>
                <h3 className={styles.title}>Register Now</h3>
                {errorMsg && <div className={`${styles.alert} alert-danger`}>{errorMsg}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input
                            type="text"
                            className={`${styles.input} form-control mb-2`}
                            name='name'
                            id='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <div className={`alert alert-danger alert-danger`}>{formik.errors.name}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            className={`${styles.input} form-control mb-2`}
                            name='email'
                            id='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className={`alert alert-danger alert-danger`}>{formik.errors.email}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={`${styles.input} form-control mb-2`}
                            name='password'
                            id='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div className={`alert alert-danger alert-danger`}>{formik.errors.password}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="rePassword" className={styles.label}>Re-password</label>
                        <input
                            type="password"
                            className={`${styles.input} form-control mb-2`}
                            name='rePassword'
                            id='rePassword'
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.rePassword && formik.touched.rePassword && (
                            <div className={`alert alert-danger alert-danger`}>{formik.errors.rePassword}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>Phone</label>
                        <input
                            type="tel"
                            className={`${styles.input} form-control mb-2`}
                            name='phone'
                            id='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.phone && formik.touched.phone && (
                            <div className={`alert alert-danger alert-danger`}>{formik.errors.phone}</div>
                        )}
                    </div>

                    {isLoading ? (
                        <button className={`${styles.button} btn bg-main text-white`}>
                            <i className='fa fa-spin fa-spinner'></i>
                        </button>
                    ) : (
                        <button className={`${styles.button} btn bg-main text-white`} disabled={!(formik.isValid && formik.dirty)}>Register</button>
                    )}
                </form>
            </div>
        </div>
    );
}
