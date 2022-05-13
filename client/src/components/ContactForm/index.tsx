import React from "react";
import { Formik } from "formik";
import "./index.scss";

interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
}

const ContactForm: React.FC<{}> = () => {
	const initialValues: FormValues = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
	};

	return (
		<div className="contact-form">
			<h1 className="contact-form__title">Contact us</h1>
			<Formik
				initialValues={initialValues}
				validate={(values) => {
					const errors = {};

					let value: keyof typeof values;

					for (value in values) {
						if (!values[value]) {
							(errors as Record<string, string>)[value] = "Required";
						}
					}

					Object.entries(values).forEach(e => console.log(e[0], e[1]));


					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 100);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="contact-form__row">
							<input
								type="text"
								name="firstName"
								className={
									errors.firstName && touched.firstName ? "has-error" : ""
								}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="First name"
								value={values.firstName}
							/>
							<input
								type="text"
								name="lastName"
								className={
									errors.lastName && touched.lastName ? "has-error" : ""
								}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Last name"
								value={values.lastName}
							/>
						</div>

						<div className="contact-form__row">
							<input
								type="email"
								name="email"
								className={errors.email && touched.email ? "has-error" : ""}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Email address"
								value={values.email}
							/>
							<input
								type="tel"
								name="phone"
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Phone"
								value={values.phone}
							/>
						</div>

						<textarea
							name="message"
							className={errors.message && touched.message ? "has-error" : ""}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Message"
							value={values.message}
						/>
						<div className="contact-form__row has-button">
							<button type="submit" disabled={isSubmitting}>
								Send
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default ContactForm;
