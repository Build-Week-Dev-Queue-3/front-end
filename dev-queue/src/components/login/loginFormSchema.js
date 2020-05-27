import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
    email: yup.string()
        .email('Please enter a valid e-mail address')
        .required('E-mail is required'),
    password: yup.string()
        .min(8, 'The password must be at least 8 characters long')
        .required('Password is required')
})

export default loginFormSchema;