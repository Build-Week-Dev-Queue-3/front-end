import * as yup from 'yup';

const registerFormSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(3, 'The username must be at least three characters long')
        .required('Your name is required'),
    email: yup.string()
        .email('Please enter a valid e-mail address')
        .required('E-mail is required'),
    password: yup.string()
        .min(8, 'The password must be at least 8 characters long')
        .required('Password is required'),
    cohort: yup.string()
        .required('Cohort is required'),
    student: yup.boolean(),
    helper: yup.boolean()
})

export default registerFormSchema;