import EditLoginForm from './EditLoginForm';

function Login({ onSubmit }) {
  return (
    <main className="content">
      <section className="registration">
        <div className="registration__container ">
          <h2 className="registration__title">Вход</h2>
          <EditLoginForm name="login-form" buttonText="Войти" onSubmit={onSubmit} />
        </div>
      </section>
    </main>
  );
}

export default Login;
