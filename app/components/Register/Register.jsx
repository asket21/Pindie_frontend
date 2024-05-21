"use client"
import { useEffect,useState,useContext } from 'react';
import {  } from 'react';
import Styles from "./Register.module.css";
import { isResponseOk, regisration,authorize} from '@/app/api/api-utils';
import { endpoints } from '@/app/api/config';
import { useStore } from "@/app/store/app-store";



export const Register = (props) => {
const regContext = useStore();
const [regData, setRegData] = useState({ email: "", password: "", username: "" });
const [message, setMessage] = useState({ status: null, text: null }); 

const handleInput = (e) =>{
  
  setRegData({ ...regData, [e.target.name]: e.target.value });
  
}

const handleSubmit = async (e) =>{
    e.preventDefault();
     
  const userData = await regisration(endpoints.reg, regData);
  
  if (isResponseOk(userData)) {
    
    regContext.reg("user");
    setMessage({ status: "success", text: "Вы зарегистрировались!" })
       
  } else {
     
    setMessage({ status: "error", text: "Ошибка создания пользователя" });
  }
}; 

useEffect(() => {
  let timer; 
  if (regContext.user) {
    timer = setTimeout(() => {            
      props.close();
      regContext.unreg();
    }, 1000);
    
  }
  return () => clearTimeout(timer);
}, [regContext.user]); 

  return (
    <form onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Регистрация</h2>
      <div className={Styles['form__fields']}>
      <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Имя</span>
          <input  onInput={handleInput} className={Styles['form__field-input']} name="username" type="text" placeholder='Введите имя'/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input  onInput={handleInput} className={Styles['form__field-input']} type="email" name="email" placeholder="hello@world.com"/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input  onInput={handleInput} className={Styles['form__field-input']} name="password" type="password" placeholder=''/>
        </label>
      </div>
      {message.status && (<p className={Styles["form__message"]}>{message.text}</p>)} 
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Зарегистрироваться</button>
      </div>
    </form>
  ) 
  
};
