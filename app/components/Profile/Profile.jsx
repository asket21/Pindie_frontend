

import Styles from "./Profile.module.css"
import { useStore } from "@/app/store/app-store";

export const Profile = (props) => {
  const authContext = useStore();
  

  return (<article >
    {authContext.isAuth ?
    <div className={Styles["card__content-block"]}>
      <br></br>
      <h3 className={Styles["card__title"]}>Имя пользователя: {authContext.user.username}</h3>
      <br></br>
      <p className={Styles["card__description"]}>Email: {authContext.user.email}</p>      
    </div> : <h3 className={Styles["card__title"]}>Необходима авторизация</h3>}
    </article> 
    
  );
};
