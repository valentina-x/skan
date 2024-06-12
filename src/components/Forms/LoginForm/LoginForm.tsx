import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Alert } from "antd";
import Image from "next/image";
import styles from "./styles.module.scss";
import Button from "@/components/Button/Button";
import GoogleSVG from "../../../../public/images/forms/google.svg";
import FacebookSVG from "../../../../public/images/forms/facebook.svg";
import YandexSVG from "../../../../public/images/forms/yandex.svg";
import LockSVG from "../../../../public/images/forms/lock.svg";
import Auth, { AuthProps } from "../../../pages/api/auth";
import { useAppDispatch } from "@/pages/lib/hooks/hooks";
import { login } from "@/pages/lib/features/authSlice";
import { NextRouter, useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const router: NextRouter = useRouter();

  const onSubmit = async (data: AuthProps) => {
    try {
      setLoading(true);
      const responseDataLogin = await Auth(data);
      dispatch(login(responseDataLogin));
      if (router.pathname === "/authorization") {
        router.push("/");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Произошла ошибка. Попробуйте еще раз.");
    }
  };

  const handleInputsChange = () => {
    setIsFormFilled(!!(getValues().login && getValues().password));
  };

  const validateUsername = (value: string) => {
    const isPhone = /^\+?[1-9]\d{1,11}$/.test(value);
    const isUsername = /^[a-zA-Z0-9_.-]{3,}$/.test(value);
    const loginLength = value.length;

    if (!isPhone && !isUsername) {
      return "Введите корректный логин";
    }

    if (isPhone && (loginLength < 11 || loginLength > 11)) {
      return "Номер телефона должен состоять из 11 цифр";
    }
    return true;
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      onChange={handleInputsChange}
      layout="vertical"
      className={styles.loginform}
    >
      <Image
        src={LockSVG}
        alt={"Lock icon"}
        width={96}
        height={31}
        className={styles.loginform__lock}
      />
      <div className={styles.loginform__header}>
        <button className={styles.active}>Войти</button>
        <button>Зарегистрироваться</button>
      </div>
      <Form.Item
        label="Логин или номер телефона"
        validateStatus={errors.login ? "error" : ""}
        help={errors.login?.message}
        className={styles.loginform__item}
      >
        <Controller
          name="login"
          control={control}
          rules={{
            required: "Введите логин",
            validate: validateUsername,
          }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Пароль:"
        validateStatus={errors.password ? "error" : ""}
        help={errors.password?.message}
        className={styles.loginform__item}
      >
        <Controller
          name="password"
          control={control}
          rules={{ required: "Введите пароль" }}
          render={({ field }) => (
            <Input.Password {...field} autoComplete="on" />
          )}
        />
      </Form.Item>

      {errorMessage && (
        <Alert
          message="Ошибка"
          description={errorMessage}
          type="error"
          showIcon
          className={styles.loginform__error}
        />
      )}

      <div className={styles.loginform__footer}>
        <Button
          type="submit"
          className={!isFormFilled ? "disabled" : ""}
          loading={loading}
        >
          Войти
        </Button>
        <span className={styles.loginform__restorepass}>
          Восстановить пароль
        </span>
        <div className={styles.loginform__links}>
          <span>Войти через:</span>
          <Image src={GoogleSVG} alt={"Google icon"} width={96} height={31} />
          <Image
            src={FacebookSVG}
            alt={"Facebook icon"}
            width={96}
            height={31}
          />
          <Image src={YandexSVG} alt={"Yandex icon"} width={96} height={31} />
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
