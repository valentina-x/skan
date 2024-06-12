import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Checkbox, Select, DatePicker, InputNumber, Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import Button from "@/components/Button/Button";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/pages/lib/hooks/hooks";
import { selectAccessToken } from "@/pages/lib/features/selectors/authSelectors";
import histograms from "@/pages/api/histograms";
import { setHistograms } from "@/pages/lib/features/histogramsSlice";
import { useRouter } from "next/router";
import documentsIDs from "@/pages/api/documentsIDs";
import { setDocumentsIDs } from "@/pages/lib/features/documentsSlice";
import { formatDocumentsIDs } from "@/pages/lib/utils/utils";
import { createFormDataObject } from "./formData";

const { RangePicker } = DatePicker;
const { Option } = Select;

// Схема валидации с использованием Yup
const schema = yup.object().shape({
  inn: yup
    .string()
    .required("ИНН обязателен")
    .matches(/^\d{10}$/, "ИНН должен состоять из 10 цифр"),
  tonality: yup.string(),
  documentCount: yup
    .number()
    .required("Количество документов обязательно")
    .min(1, "Минимум 1 документ")
    .max(1000, "Максимум 1000 документов"),
  dateRange: yup
    .array()
    .of(yup.date().required("Выберите дату"))
    .length(2, "Выберите диапазон дат"),
  isFull: yup.boolean(),
  businessContext: yup.boolean(),
  mainRole: yup.boolean(),
  riskFactors: yup.boolean(),
  technicalNews: yup.boolean(),
  announcements: yup.boolean(),
  newsSummary: yup.boolean(),
});

const SearchForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const accessToken = useAppSelector(selectAccessToken);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      dateRange: [
        dayjs().startOf("month").toDate(),
        dayjs().endOf("month").toDate(),
      ],
    },
  });

  const onSubmit = async (data: any) => {
    const formData = createFormDataObject(data);
    try {
      setLoading(true);
      if (typeof accessToken === "string") {
        const [responseHistograms, responseDocumentsIDs] = await Promise.all([
          histograms(formData, accessToken),
          documentsIDs(formData, accessToken),
        ]);

        const formattedIDs = formatDocumentsIDs(responseDocumentsIDs);

        dispatch(setHistograms(responseHistograms));
        dispatch(setDocumentsIDs(formattedIDs));

        if (router.pathname === "/search") {
          router.push("/results");
        }
      }
    } catch (error) {
      console.log("Ошибка при загрузке данных");
    }
  };

  const handleInputChange = () => {
    setIsFormFilled(!!(getValues().inn && getValues().documentCount));
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      onChange={handleInputChange}
      layout="vertical"
      className={styles.searchform}
    >
      <div className={styles.searchform__inputs}>
        <Form.Item
          label="ИНН компании"
          validateStatus={errors.inn ? "error" : ""}
          help={errors.inn?.message}
          className={`${styles.searchform__item} ${styles.searchform__item_star}`}
        >
          <Controller
            name="inn"
            control={control}
            render={({ field }) => <Input {...field} placeholder="10 цифр" />}
          />
        </Form.Item>

        <Form.Item
          label="Тональность"
          validateStatus={errors.tonality ? "error" : ""}
          help={errors.tonality?.message}
          className={`${styles.searchform__item} ${styles.searchform__item_star}`}
        >
          <Controller
            name="tonality"
            control={control}
            render={({ field }) => (
              <Select {...field} defaultValue="any">
                <Option value="positive">Позитивная</Option>
                <Option value="negative">Негативная</Option>
                <Option value="any">Любая</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Количество документов в выдаче"
          validateStatus={errors.documentCount ? "error" : ""}
          help={errors.documentCount?.message}
          className={`${styles.searchform__item} ${styles.searchform__item_star}`}
        >
          <Controller
            name="documentCount"
            control={control}
            render={({ field }) => (
              <InputNumber
                min={1}
                max={1000}
                {...field}
                placeholder="От 1 до 1000"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Диапазон поиска"
          validateStatus={errors.dateRange ? "error" : ""}
          help={errors.dateRange?.message}
          className={`${styles.searchform__item} ${styles.searchform__item_star}`}
        >
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <RangePicker
                {...field}
                value={
                  field.value
                    ? [dayjs(field.value[0]), dayjs(field.value[1])]
                    : undefined
                }
                onChange={(dates) =>
                  field.onChange(
                    dates ? [dates[0]?.toDate(), dates[1]?.toDate()] : undefined
                  )
                }
              />
            )}
          />
        </Form.Item>
      </div>

      <div className={styles.searchform__list}>
        <Form.Item className={styles.searchform__checkbox}>
          <Controller
            name="isFull"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                {...field}
              >
                Признак максимальной полноты
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item className={styles.searchform__checkbox}>
          <Controller
            name="businessContext"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                {...field}
              >
                Упоминания в бизнес-контексте
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item className={styles.searchform__checkbox}>
          <Controller
            name="mainRole"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                {...field}
              >
                Главная роль в публикации
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item className={styles.searchform__checkbox}>
          <Controller
            name="riskFactors"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                {...field}
              >
                Публикации только с риск-факторами
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item className={styles.searchform__checkbox}>
          <Controller
            name="technicalNews"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                {...field}
              >
                Включать технические новости рынков
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item className={styles.searchform__checkbox}>
          <Controller
            name="announcements"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                {...field}
              >
                Включать анонсы и календари
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item className={styles.searchform__checkbox}>
          <Controller
            name="newsSummary"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                {...field}
              >
                Включать сводки новостей
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item className={styles.searchform__footer}>
          <Button
            type="submit"
            className={!isFormFilled ? "disabled" : ""}
            loading={loading}
          >
            Поиск
          </Button>
          <div className={styles.searchform__notice}>
            * Обязательные к заполнению поля
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SearchForm;
