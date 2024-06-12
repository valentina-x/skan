import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/router";
import Logo_SVG from "../../../public/images/logo.svg";
import User_PNG from "../../../public/images/user_avatar.png";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/pages/lib/hooks/hooks";
import { selectIsAuthenticated } from "@/pages/lib/features/selectors/authSelectors";
import { checkToken, logout } from "@/pages/lib/features/authSlice";
import CompaniesInfo from "../CompaniesInfo/CompaniesInfo";
import { resetAndCleanStore } from "@/pages/lib/rootReducer";
import Button from "../Button/Button";

export default function Header() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCheckToken = async () => {
      dispatch(checkToken());
      if (!isAuthenticated) {
        await dispatch(resetAndCleanStore());
      }
    };
    handleCheckToken();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (
        router.pathname != "/authorization" &&
        router.pathname != "/" &&
        router.pathname != "/404"
      ) {
        router.push("/authorization");
      }
    }
  }, [isAuthenticated, router]);

  const handleLogOut = (): void => {
    dispatch(logout());
  };

  const handleMobileMenuClick = (): void => {
    setIsMobile(!isMobile);
  };

  return (
    <header
      className={`${styles.header} ${isMobile ? styles.header_mobile : ""}`}
    >
      <div className={styles.header__wrapper}>
        <div
          className={clsx(styles.header__logo, {
            [styles.disabled]: router.pathname === "/",
          })}
        >
          <Link href="/">
            <Image src={Logo_SVG} alt={"СКАН лого"} width={96} height={38} />
          </Link>
        </div>

        <nav className={styles.header__nav}>
          <Link
            href="/"
            className={clsx({
              [styles.active]: router.pathname === "/",
            })}
          >
            Главная
          </Link>
          <Link href="/">Тарифы</Link>
          <Link href="/">FAQ</Link>
        </nav>

        {!isAuthenticated && (
          <div className={styles.header__buttons}>
            <span>Зарегистрироваться</span>
            <hr />
            <Link
              href="/authorization"
              className={clsx({
                [styles.disabled]: router.pathname === "/authorization",
              })}
            >
              <Button
                loading={loading}
                onClick={() => {
                  setLoading(true);
                }}
                className={clsx({
                  disabled: router.pathname === "/authorization",
                })}
              >
                Войти
              </Button>
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className={styles.infopanel}>
            <div className={styles.infopanel__company}>
              <CompaniesInfo />
            </div>
            <div className={styles.user}>
              <div className={styles.user__info}>
                <span>Алексей А.</span>
                <button
                  className={`${styles.user__logout}`}
                  onClick={() => handleLogOut()}
                >
                  Выйти
                </button>
              </div>
              <div className={styles.user__avatar}>
                <Image
                  src={User_PNG}
                  alt={"user avatar"}
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
        )}

        <div
          className={`${styles.header__menu} ${
            isMobile ? styles.header__menu_mobile : ""
          }`}
          onClick={() => handleMobileMenuClick()}
        >
          <svg
            width="30"
            height="25"
            viewBox="0 0 30 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="30" height="5" fill="#029491" />
            <rect y="10" width="30" height="5" fill="#029491" />
            <rect y="20" width="30" height="5" fill="#029491" />
          </svg>
        </div>

        {/* {isFormActive && (
          <div ref={ref} className={styles.position}>
            {isAuthenticated ? (
              <div className={styles.profile}>
                <Link href="/profile">Profile</Link>
              </div>
            ) : (
              <LoginForm />
            )}
          </div>
        )} */}
      </div>
    </header>
  );
}
