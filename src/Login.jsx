import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let username = this.props.username;
    let password = this.props.password;
    if (e.target.username.value === username && e.target.password.value === password) {
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">请输入用户名：</label>
          <input type="text" name="username"/>
          <br/>
          <label htmlFor="password">请输入密码：</label>
          <input type="password" name="password"/>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
