import * as yup from 'yup';

const addTicketSchema = yup.object().shape({
    subject: yup.string()
        .min(5, 'Subject is too short')
        .required('Subject is required'),
    ticket_text: yup.string()
        .min(10, 'Please describe the issue in more details')
        .required('Description is required')
})

export default addTicketSchema;