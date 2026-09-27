import css from "./StatisticInfo.module.css";
export default function StatisticInfo() {
  return (
    <article className={css.statistic}>
      <div className="container">
        <ul className={css.statisticWrapper}>
          <li className={css.statisticCard}>
            <p className={css.count}>32,000 +</p>
            <p className={css.text}>Experienced tutors</p>
          </li>
          <li className={css.statisticCard}>
            <p className={css.count}>300,000 +</p>
            <p className={css.text}>5-star tutor reviews</p>
          </li>
          <li className={css.statisticCard}>
            <p className={css.count}>120 +</p>
            <p className={css.text}>Subjects taught</p>
          </li>
          <li className={css.statisticCard}>
            <p className={css.count}>200 +</p>
            <p className={css.text}>Tutor nationalities</p>
          </li>
        </ul>
      </div>
    </article>
  );
}
