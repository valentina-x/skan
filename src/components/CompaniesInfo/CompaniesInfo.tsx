import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Loader from "../Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { selectAccessToken } from "@/lib/features/selectors/authSelectors";
import companiesInfo from "@/api/companiesinfo";
import { setComaniesInfo } from "@/lib/features/companiesInfoSlice";
import {
  selectCompanyLimit,
  selectUsedCompanyCount,
} from "@/lib/features/selectors/companiesInfoSelectors";

const CompaniesInfo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const companyLimit = useAppSelector(selectCompanyLimit);
  const usedCompanyCount = useAppSelector(selectUsedCompanyCount);

  useEffect(() => {
    if (!companyLimit && !usedCompanyCount) {
      const getComaniesInfo = async () => {
        setIsLoading(true);
        try {
          if (typeof accessToken === "string") {
            const companiesData = await companiesInfo(accessToken);
            dispatch(setComaniesInfo(companiesData.eventFiltersInfo));
          }
        } catch (error) {
          console.log("Ошибка при загрузке данных");
        } finally {
          setIsLoading(false);
        }
      };
      getComaniesInfo();
    } else {
      setIsLoading(false);
    }
  }, [accessToken, companyLimit, dispatch, usedCompanyCount]);

  return (
    <div className={styles.company}>
      {isLoading ? (
        <Loader size="medium" />
      ) : (
        <>
          <div className={styles.company_row}>
            <div className={styles.company_text}>Использовано компаний</div>
            <div className={styles.company_count}>{usedCompanyCount}</div>
          </div>
          <div className={styles.company_row}>
            <div className={styles.company_text}>Лимит по компаниям</div>
            <div
              className={`${styles.company_count} ${styles.company_count_green}`}
            >
              {companyLimit}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompaniesInfo;
