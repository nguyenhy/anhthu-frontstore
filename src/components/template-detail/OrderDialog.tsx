'use client';

import './OrderDialog.css'
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { getOrderErrorMessage, validateOrder, ValidationError } from '@/lib/order/validateOrder';
import { createOrder } from '@/lib/order/createOrder';

export interface OrderFormData {
	email: string
	name?: string
	phone?: string
}

type Props = {
	onClose?: () => void;
};

const OPEN_EVENT = 'open-order-dialog'

export const dispatchOpenDialog = () => {
	window.dispatchEvent(
		new CustomEvent(OPEN_EVENT, { detail: {} })
	)
}

export function OrderDialog({
	onClose,
}: Props) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onOpen = (event: Event) => {
			if (event instanceof CustomEvent) {
			}
			setOpen(true)
		};

		window.addEventListener(
			OPEN_EVENT,
			onOpen
		);

		return () =>
			window.removeEventListener(
				OPEN_EVENT,
				onOpen
			);
	}, []);

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	const [emailError, setEmailError] = useState('')
	const [nameError, setNameError] = useState('')
	const [phoneError, setPhoneError] = useState('')
	const [disableSubmit, setDisableSubmit] = useState(false)

	const [emailFocused, setEmailFocused] = useState(false)
	const [error, setError] = useState<{
		message?: string
		errorId?: string
	} | null>(null)
	const [submitting, setSubmitting] = useState(false)


	const resetFieldErrors = useCallback(() => {
		setEmailError('')
		setNameError('')
		setPhoneError('')
		setError(null)
	}, [])

	const resetFields = useCallback(() => {
		setEmail('')
		setName('')
		setPhone('')
	}, [])

	const resetForm = useCallback(() => {
		setEmailFocused(false)
		resetFields()
		resetFieldErrors()
		setError(null)
	}, [])

	const onCloseDialog = useCallback(() => {
		setOpen(false)
		resetForm()
		if (onClose) {
			onClose()
		}
	}, [onClose, resetForm])

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onCloseDialog()
			}
		};

		document.addEventListener(
			'keydown',
			handler
		);

		return () =>
			document.removeEventListener(
				'keydown',
				handler
			);
	}, [onCloseDialog]);

	const getForm = useCallback<() => OrderFormData>(() => ({ email, name: name || undefined, phone: phone || undefined }), [email, name, phone])
	const setOrderErrorMessage = useCallback((errors: ValidationError[]) => {
		for (let index = 0; index < errors.length; index++) {
			const error = errors[index];
			const message = getOrderErrorMessage(error.code)

			if (error.field === 'email') {
				setEmailError(message)
			} else if (error.field === 'name') {
				setNameError(message)
			} else if (error.field === 'phone') {
				setPhoneError(message)
			}
		}
	}, [])

	const handleSubmit = useCallback(async (
		e: React.SubmitEvent<HTMLFormElement>
	) => {
		e.preventDefault()

		if (disableSubmit || submitting) {
			return
		}

		setDisableSubmit(false)
		resetFieldErrors()

		const form = getForm()
		const errors = validateOrder(form)
		if (errors.length) {
			setDisableSubmit(!!errors.length)
			setOrderErrorMessage(errors)
			return
		}

		setSubmitting(true)
		try {
			const result = await createOrder(form)
			if (result.status === 'success') {
				location.href = `/orders/${result.token}`
			} else {
				setError({
					message: 'Order creation failed',
				})
			}
		} catch (error) {
			setError({
				message: 'Something went wrong. Please try again.',
			})
		} finally {
			setSubmitting(false)
		}

	}, [getForm, resetFieldErrors, setOrderErrorMessage, disableSubmit, submitting]);

	useEffect(() => {
		if (emailFocused) {
			const form = getForm()
			const errors = validateOrder(form)
			if (errors.length) {
				setDisableSubmit(true)
				setOrderErrorMessage(errors)
			} else {
				setDisableSubmit(false)
				resetFieldErrors()
			}
		}
	}, [emailFocused, email, name, phone, getForm, setOrderErrorMessage, resetFieldErrors])

	return (
		<div
			className={clsx(
				'overlay',
				open && 'open'
			)}
			role="dialog"
			aria-modal="true"
			aria-labelledby="dialogTitle"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onCloseDialog()
				}
			}}
		>
			<div className="dialog">
				<button
					className="dialog-close"
					aria-label="Close"
					onClick={onCloseDialog}
				>
					&times;
				</button>

				<h2
					className="dialog-title"
					id="dialogTitle"
				>
					Get This Template
				</h2>

				<p className="dialog-sub">
					Enter your email and we&apos;ll send
					the Google Drive link within 24
					hours.
				</p>

				<form
					onSubmit={handleSubmit}
					noValidate
				>
					<div className="form-group">
						<label
							className="form-label"
							htmlFor="email"
						>
							Email address
						</label>

						<input
							className={clsx('form-input', emailError && 'error')}
							id="email"
							type="email"
							name="email"
							autoComplete="email"
							placeholder="you@example.com"
							required
							value={email}
							onFocus={() => {
								setEmailFocused(true)
							}
							}
							onChange={(e) =>
								setEmail(
									e.target.value
								)
							}
						/>
						{
							!!emailError && (
								<p className='field-error visible'>{emailError}</p>
							)
						}
					</div>

					<div
						className={clsx(
							'extra-fields',
							emailFocused && 'visible'
						)}
					>
						<div className="form-group">
							<label
								className="form-label"
								htmlFor="name"
							>
								Your name
							</label>

							<input
								className={clsx('form-input', nameError && 'error')}
								id="name"
								type="text"
								name="name"
								autoComplete="name"
								placeholder="Jane Smith"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							{
								!!nameError && (
									<p className='field-error visible'>{nameError}</p>
								)
							}
						</div>

						<div className="form-group">
							<label
								className="form-label"
								htmlFor="phone"
							>
								Phone number
								<span className="opt">
									(optional)
								</span>
							</label>

							<input
								className={clsx('form-input', phoneError && 'error')}
								id="phone"
								type="tel"
								name="phone"
								autoComplete="tel"
								placeholder="+1 555 000 0000"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>

							{
								!!phoneError && (
									<p className='field-error visible'>{phoneError}</p>
								)
							}
						</div>
					</div>

					{error && (
						<div className="form-error" role="alert">
							{error.message ? (
								<p>{error.message}</p>
							) : (
								<>
									<p>Something went wrong{error.errorId ? ` (ref: ${error.errorId})` : ''}.</p>
									<a
										href={`/contact${error.errorId ? `?ref=${error.errorId}` : ''}`}
										className="form-error-contact"
									>
										Report issue
									</a>
								</>
							)}
						</div>
					)}

					<button
						type="submit"
						className="btn-submit"
						data-a={disableSubmit}
						data-b={submitting}
						disabled={disableSubmit || submitting}
					>
						{submitting ? 'Submitting…' : 'Create Order'}
					</button>
				</form>
			</div>
		</div>
	);
}