import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	const history = useHistory();
	const authCtx = useContext(AuthContext);
	const newPassInputRef = useRef();
	const submitHandler = (event) => {
		event.preventDefault();
		const enteredPass = newPassInputRef.current.value;
		fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwD7lpJ3LDCLtmSeFf5LLVAooNbahAdx4',
			{
				method: 'POST',
				body: JSON.stringify({
					idToken: authCtx.token,
					password: enteredPass,
					returnSecureToken: false,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then((response) => {
			console.log(response);
			history.replace('/');
		});
	};
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input
					type='password'
					ref={newPassInputRef}
					id='new-password'
					minLength='7'
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
