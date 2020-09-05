import * as yup from 'yup';

const ticketDetailsSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(3, 'Your comment is too short')
        .required('This field is required')
})

export default ticketDetailsSchema;