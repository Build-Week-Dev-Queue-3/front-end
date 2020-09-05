import * as yup from 'yup';

const commentFormSchema = yup.object().shape({
    comment: yup.string()
        .trim()
        .min(3, 'Your comment must be at least 3 characters long')
        .required('Comment is required'),
})

export default commentFormSchema;