import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ErrorMessage from '../error/ErrorMessage';

function Signup({ onSignup, error }) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    onSignup(data);
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/4 p-4 mt-12 border rounded md:w-1/3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mt-8 text-center uppercase text-2xl font-bold text-blue-600">
            Signup
          </h1>
          <div className="mt-16">
            <input
              className="p-2 border focus:outline-none focus:ring-2 w-full rounded"
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                required: true,
                pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              })}
            />
            {errors.email && <ErrorMessage message="이메일 형태가 아닙니다." />}
          </div>
          <div className="mt-4">
            <input
              className="p-2 border focus:outline-none focus:ring-2 w-full rounded"
              type="text"
              placeholder="Name"
              name="name"
              ref={register({
                required: true,
                minLength: 4,
              })}
            />
            {errors.name && (
              <ErrorMessage message="이름은 4자리 이상 필수입니다." />
            )}
          </div>
          <div className="mt-4">
            <input
              className="p-2 border focus:outline-none focus:ring-2 w-full rounded"
              type="password"
              placeholder="Password"
              name="password"
              ref={register({
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && (
              <ErrorMessage message="비밀번호는 6자리 이상 필수입니다." />
            )}
          </div>
          {error && <ErrorMessage message={error} />}
          <div className="mt-4 flex justify-between items-end">
            <Link to="/signin" className="text-blue-400">
              Signin
            </Link>
            <button
              type="submit"
              className="py-1 px-4 bg-blue-600 text-white focus:outline-none rounded"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
