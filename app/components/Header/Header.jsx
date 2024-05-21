"use client";
import Styles from "./Header.module.css";
import { useState } from "react";
import { Overlay } from "../Overlay/Overlay";
import { Popup } from "../Popup/Popup";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthForm } from "../AuthForm/AuthForm";
import { useStore } from "@/app/store/app-store";
import { Register } from "../Register/Register";

export const Header = (props) => {
  const authContext = useStore();

  const handleLogOut = () => {
    authContext.logout();
  };

  const pathname = usePathname();
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [regIsOpened, setRegIsOpened] = useState(false);

  const openRegestration = () => {
    setRegIsOpened(true);
  };

  const closeRegestration = () => {
    setRegIsOpened(false);
  };

  const openPopup = () => {
    setPopupIsOpened(true);
  };

  const closePopup = () => {
    setPopupIsOpened(false);
  };

  return (
    <header className={Styles["header"]}>
      {pathname === "/" ? (
        <img
          className={`${Styles["logo"]} ${Styles["logo__image"]}`}
          src="/images/logo.svg"
          alt="Логотип Pindie"
        />
      ) : (
        <Link href="/" className={Styles["logo"]}>
          <img
            className={Styles["logo__image"]}
            src="/images/logo.svg"
            alt="Логотип Pindie"
          />
        </Link>
      )}

      <nav className={Styles["menu"]}>
        <ul className={Styles["menu__list"]}>
          <li className={Styles["menu__item"]}>
            <Link
              href="/new"
              className={`${Styles["menu__link"]} ${
                pathname === "/new" ? Styles["menu__link_active"] : ""
              }`}
            >
              Новинки
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/popular"
              className={`${Styles["menu__link"]} ${
                pathname === "/popular" ? Styles["menu__link_active"] : ""
              }`}
            >
              Популярные
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/shooter"
              className={`${Styles["menu__link"]} ${
                pathname === "/shooter" ? Styles["menu__link_active"] : ""
              }`}
            >
              Шутеры
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/runner"
              className={`${Styles["menu__link"]} ${
                pathname === "/runner" ? Styles["menu__link_active"] : ""
              }`}
            >
              Ранеры
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/pixel"
              className={`${Styles["menu__link"]} ${
                pathname === "/pixel" ? Styles["menu__link_active"] : ""
              }`}
            >
              Пиксельные
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/TDS"
              className={`${Styles["menu__link"]} ${
                pathname === "/TDS" ? Styles["menu__link_active"] : ""
              }`}
            >
              TDS
            </Link>
          </li>
        </ul>
        <div className={Styles["auth"]}>
          {authContext.isAuth ? (
            <>
              <li className={Styles["auth__button"]}>
                <Link
                  href="/profile"
                  className={`${Styles["auth__button"]} ${
                    pathname === "/profile" ? Styles["auth__button"] : ""
                  }`}
                >
                  Профиль
                </Link>
              </li>
              <Link
                href="/"
                className={`${Styles["auth__button"]} ${
                  pathname === "/" ? Styles["auth__button"] : ""
                }`}
              >
                <button
                  className={Styles["auth__button"]}
                  onClick={handleLogOut}
                >
                  Выйти
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                className={Styles["auth__button"]}
                onClick={openRegestration}
              >
                Регистрация
              </button>
              <button className={Styles["auth__button"]} onClick={openPopup}>
                Войти
              </button>
            </>
          )}
        </div>
      </nav>
      {popupIsOpened && (
        <>
          <Overlay closePopup={closePopup} isOpen={popupIsOpened} />
          <Popup closePopup={closePopup} isOpen={popupIsOpened}>
            <AuthForm close={closePopup} />
          </Popup>
        </>
      )}
      {regIsOpened && (
        <>
          <Overlay closePopup={closeRegestration} isOpen={regIsOpened} />
          <Popup closePopup={closeRegestration} isOpen={regIsOpened}>
            <Register close={closeRegestration}></Register>
          </Popup>
        </>
      )}
    </header>
  );
};
