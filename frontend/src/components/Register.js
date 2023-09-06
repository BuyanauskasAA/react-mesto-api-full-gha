import EditLoginForm from './EditLoginForm';

function Register({ onSubmit }) {
  return (
    <main className="content">
      <section className="registration">
        <div className="registration__container ">
          <h2 className="registration__title">Регистрация</h2>
          <EditLoginForm name="register-form" buttonText="Зарегистрироваться" onSubmit={onSubmit} />
        </div>
      </section>
    </main>
  );
}

export default Register;
