import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CustomInput } from "../../components/input";

import { MainLayout, LoadingScreen } from "../../components/layouts";

import InputValidation from "../../helpers/InputValidation";
import Http from "../../helpers/Fetch";

interface DataRegister {
	name?: string | null,
	email?: string | null,
	password?: string | null,
	confirmPassword?: string | null,
}

const Register: FC = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<DataRegister>({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [errData, setErrData] = useState<DataRegister>({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});


	/* ------------------------------ OnChange Data ----------------------------- */
	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const { name, value } = e.target;

		let errStr = "";
		if (name === "name") {
			errStr = InputValidation.TextValidation(value, 30, "Name", true);
		}
		if (name === "email") {
			errStr = InputValidation.EmailValidation(value, 50, "Email", true);
		}
		if (name === "password") {
			errStr = InputValidation.PasswordValidation(value, 8, 16, "Password", true);
		}
		if (name === "confirmPassword") {
			errStr = value === data.password ? "" : "Password didn't match";
		}

		setErrData({
			...errData,
			[name]: errStr
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
			Swal.fire({
				icon: "question",
				text: "Are you sure ?",
				cancelButtonText: "Cancel",
				confirmButtonText: "Sign Up",
				showCancelButton: true
			}).then((res) => {
				if (res.isConfirmed) {
					SignUp();
				}
			})
		}
	};

	const SignUp = async () => {
		setLoading(true);
		try {
			const res = await Http.post("/user/signup", data);
			setLoading(false);
			navigate("/auth/login");
		} catch (err: any) {
			setLoading(false);
			Swal.fire({
				text: err?.response?.data?.message,
				title: "Error",
				icon: "error"
			})
		}
	}
	/* ------------------------------ End OnSubmit ------------------------------ */

	/* ------------------------------ On Validation ----------------------------- */
	const onValidation = (): boolean => {
		const tempValidation: DataRegister = {
			name: InputValidation.TextValidation(data.name, 30, "Name", true),
			email: InputValidation.EmailValidation(data.email, 50, "Email", true),
			password: InputValidation.PasswordValidation(data.password, 8, 16, "Password", true),
			confirmPassword: data.confirmPassword === data.password ? "" : "Password didn't match"
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
		loading ? (
			<LoadingScreen />
		) : (
				
			<MainLayout>
				<div className=" w-full">
					<p className=" text-center text-2xl text-menu-label mb-8">Registration</p>
					<div className=" container">
						<div className="mb-5">
							<CustomInput
								name="name"
								label="Fullname"
								required={true}
								type="text"
								value={data.name ?? ''}
								error={errData.name}
								onChange={onChange}
							/>
						</div>
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
						<div className="mb-5">
							<CustomInput
								name="confirmPassword"
								label="Confirm Password"
								required={true}
								type="password"
								value={data.confirmPassword ?? ''}
								error={errData.confirmPassword}
								onChange={onChange}
							/>
						</div>

						<div className="flex justify-between items-center">
							<p className="">Have account ? <span className=" text-secondary-50 cursor-pointer" onClick={() => navigate("/auth/login")}>Login</span></p>
							<button onClick={onSubmit} className=" btn btn-primary normal-case">Sign Up</button>
						</div>
					</div>
				</div>
			</MainLayout>
		)
	)
};

export default Register;