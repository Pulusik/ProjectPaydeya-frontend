import { PublicHeader } from "../../../../widgets/public-header";

export function PublicHomePage() {
  return (
    <>
      <PublicHeader />
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
        <h2>Главная (публичная)</h2>
        <p>Позже перенесём index.html</p>
      </div>
    </>
  );
}
