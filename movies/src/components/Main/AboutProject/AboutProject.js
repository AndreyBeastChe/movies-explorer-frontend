import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__container">
        <div className="project__columm">
          <h3 className="project__columm project__columm_title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__columm project__columm_text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          </div>
        
          <div className="project__columm">
          <h3 className="project__columm project__columm_title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__columm project__columm_text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
</div>
</div>

      <div className="project__schedule">
      <div className="project__schedule-backend">1 неделя</div>
        <div className="project__schedule-frontend">
        4 недели
        </div>
        <div className="project__schedule-title">
          Back-end
        </div>
        <div className="project__schedule-title">
          Front-end
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
