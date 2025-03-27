// import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

// const validate = values => {
// 	const errors = {};

// 	if (!values.name) {
// 		errors.name = 'required field';
// 	} else if (values.name.length < 2) {
// 		errors.name = 'min lenght is 2 symbols';
// 	} else if (values.name.length > 20) {
// 		errors.name = 'max lenght is 20 symbols';
// 	} 

// 	if (!values.email) {
// 		errors.email = 'required field';
// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
// 		errors.email = 'wrong email address';
// 	}

// 	return errors;
// }

const MyTextInput = ({label, ...props}) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.name}>{label}</label>
			<input {...props} {...field}/>
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</>
	)
};

const MyCheckbox = ({children, ...props}) => {
	const [field, meta] = useField({...props, type: 'checkbox'});
	return (
		<>
			<label className="checkbox">
                    <input type="checkbox" {...props} {...field}/>
					{children}
			</label>
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</>
	)
};

const CustomForm = () => {
    return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				amount: 0,
				currency: '',
				text: '',
				terms: false
			}}
			validationSchema= {Yup.object({
				name: Yup.string()
						.min(2, 'min lenght is 2 symbols')
						.max(20, 'max lenght is 20 symbols')
						.required('required field'),
				email: Yup.string()
						.email('wrong email address')
						.required('required field'),
				amount: Yup.number()
						.min(5, 'min amount is 5')
						.required('required field'),
				currency: Yup.string().required('select currency'),
				text: Yup.string()
						.min(10, 'min 10 symbols')
						.max(40, 'max 40 symbols'),
				terms: Yup.boolean()
						.required('consent is required')
						.oneOf([true], 'consent is required')
			})}
			onSubmit= {values => console.log(JSON.stringify(values, null, 2))}
		>
			<Form className="form">
				<h2>Send a donation</h2>
				<MyTextInput
					label = 'Your name'
					id="name"
					name="name"
					type="text"/>
				<MyTextInput
					label = 'Your email'
					id="email"
					name="email"
					type="email"/>

				{/* <label htmlFor="amount">Количество</label>
				<Field
					id="amount"
					name="amount"
					type="number"/>
				<ErrorMessage 
					name='amount'
					className="error" component='div'/> */}
				<MyTextInput
					label = 'Amount'
					id="amount"
					name="amount"
					type="number"/>

				<label htmlFor="currency">Валюта</label>
				<Field
					id="currency"
					name="currency"
					as='select'>
						<option value="">Выберите валюту</option>
						<option value="USD">USD</option>
						<option value="UAH">UAH</option>
						<option value="RUB">RUB</option>
				</Field>
				<ErrorMessage 
					name='currency'
					className="error" component='div'/>

				{/* <label htmlFor="text">Ваше сообщение</label>
				<Field 
					id="text"
					name="text"
					as='textarea'/>
				<ErrorMessage 
					name='text'
					className="error" component='div'/> */}
				
				<MyTextInput
					label = 'Your message'
					id="text"
					name="text"
					as='textarea'/>
				<MyCheckbox name='terms'>
					Do you agree with the confidentiality policy?
				</MyCheckbox>
				<button type="submit">Submit</button>
			</Form>
		</Formik>
    )
}

export default CustomForm;