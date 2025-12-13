export function WelcomeBlock() {
  return (
    <div className="welcome-section">
      <div className="welcome-title">
        Сделаем обучение увлекательным <span className="highlight">вместе</span>
      </div>

      <div className="welcome-image">
        <img src="/img/svg/image.svg" className="welcome-img" alt="Welcome" />
      </div>

      <div className="welcome-text">
        <a>Добро пожаловать в <br />сообщество идей</a>
        <div className="log_image">
          <img src="/img/svg/log_image.svg" className="img_with_logo" alt="Logo text" />
        </div>
      </div>
    </div>
  );
}
