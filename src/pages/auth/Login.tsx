import React, { FC, useState } from "react";
import { CustomInput } from "../../components/input";
import { useNavigate } from "react-router-dom";

import { MainLayout } from "../../components/layouts"

import InputValidation from "../../helpers/InputValidation";

interface DataLogin {
	email?: string | null,
	password?: string | null
}

const Login: FC = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<DataLogin>({
		email: '',
		password: '',
	});

	const [errData, setErrData] = useState<DataLogin>({
		email: '',
		password: ''
	});


	/* ------------------------------ OnChange Data ----------------------------- */
	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const { name, value } = e.target;

		let strErr = ""
		if (name === "email") {
			strErr = InputValidation.EmailValidation(value, 100, "Email", true);
		}
		if (name === "password") {
			strErr = InputValidation.PasswordValidation(value, 4, 12, "Password", true);
		}

		setErrData({
			...errData,
			[name]: strErr
		});

		setData({
			...data,
			[name]: value
		});
	};
	/* ------------------------------ End OnChange ------------------------------ */

	/* -------------------------------- OnSubmit -------------------------------- */
	const onSubmit = () => {
		const valid = onValidation();
		if (valid) {
			console.log(data);
		}
	};
	/* ------------------------------ End OnSubmit ------------------------------ */

	/* ------------------------------ On Validation ----------------------------- */
	const onValidation = (): boolean => {
		const tempValidation: DataLogin = {
			email: InputValidation.EmailValidation(data.email, 100, "Email", true),
			password: InputValidation.PasswordValidation(data.password, 4, 12, "Password", true)
		};

		setErrData(tempValidation);

		for (var key in tempValidation) {
			if ((tempValidation as any)[key] !== "") {
				return false;
			}
		}
		return true;
	};
	/* ---------------------------- End On Validation --------------------------- */

	return (
		<MainLayout>

			<div className=" w-full">
				<p className=" text-center text-2xl text-menu-label mb-8">Login</p>
				<div className=" container">
					<div className="mb-5">
						<CustomInput
							name="email"
							label="Email"
							required={true}
							type="email"
							value={data.email ?? ''}
							error={errData.email}
							onChange={onChange}
						/>
					</div>
					<div className="mb-5">
						<CustomInput
							name="password"
							label="Password"
							required={true}
							type="password"
							value={data.password ?? ''}
							error={errData.password}
							onChange={onChange}
						/>
					</div>

					<div className="flex justify-between items-center">
						<p className="">Don't have account ? <span
							className=" text-secondary-50 cursor-pointer"
							onClick={() => navigate("/auth/register")}>Create one</span></p>
						<button onClick={onSubmit} className=" btn btn-primary normal-case">Login</button>
					</div>
				</div>
			</div>
		</MainLayout>
	)
};

export default Login;