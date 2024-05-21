"use client";

import { endpoints } from "@/app/api/config";
import Styles from "./Game.module.css";
import {
  getNormalizedGameDataById,
  isResponseOk,
  checkIfUserVoted,
  vote,
} from "@/app/api/api-utils";
import { useEffect, useState, useContext } from "react";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { GameNotFound } from "@/app/components/GameNotFound/GameNotFound";
import { useStore } from "@/app/store/app-store";

export default function GamePage(props) {
  const authContext = useStore();

  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [game, setGame] = useState(null);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const game = await getNormalizedGameDataById(
          endpoints.games,
          props.params.id
        );
        isResponseOk(game) ? setGame(game) : setGame(null);
        setPreloaderVisible(false);
      } catch (error) {
        ///Обходим вечный прелоадер, при неверном адресе спросить как сделать иначе
        setPreloaderVisible(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (authContext.user && game) {
      setIsVoted(checkIfUserVoted(game, authContext.user.id));
    } else {
      setIsVoted(false);
    }
  }, [authContext.user, game]);

  const handleVote = async () => {
    const jwt = authContext.token;
    
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    if (isVoted) {
      usersIdArray.filter((id) => {
        return id !== authContext.user;
      });
    } else {
      usersIdArray.push(authContext.user);
    }

    if (jwt) {
      const response = await vote(
        `${endpoints.games}/${game.id}`,
        jwt,
        usersIdArray
      );

      if (isResponseOk(response)) {
        setGame(() => {
          return {
            ...game,
            users: isVoted
              ? game.users.filter((user) => user.id !== authContext.user.id)
              : [...game.users, authContext.user],
          };
        });
        setIsVoted(!isVoted);
      }
    } else {
      alert("Вы не Авторизованы");
    }
  };

  return game ? (
    <>
      <section className={Styles["game"]}>
        <iframe className={Styles["game__iframe"]} src={game.link}></iframe>
      </section>
      <section className={Styles["about"]}>
        <h2 className={Styles["about__title"]}>{game.title}</h2>
        <div className={Styles["about__content"]}>
          <p className={Styles["about__description"]}>{game.description}</p>
          <div className={Styles["about__author"]}>
            <p>
              Автор:{" "}
              <span className={Styles["about__accent"]}>{game.developer}</span>
            </p>
          </div>
        </div>
        <div className={Styles["about__vote"]}>
          <p className={Styles["about__vote-amount"]}>
            За игру уже проголосовало:{" "}
            <span className={Styles["about__accent"]}>{game.users.length}</span>
          </p>
          <button
            disabled={!authContext.isAuth || isVoted}
            className={`button ${Styles["about__vote-button"]}`}
            onClick={handleVote}
          >
            {!isVoted ? "Проголосовать" : "Голос отдан"}
          </button>
        </div>
      </section>
    </>
  ) : preloaderVisible ? (
    <Preloader />
  ) : (
    <GameNotFound />
  );
}
