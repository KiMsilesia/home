export default function KiMosaicLanding() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        background: "#091a35",
        padding: "24px",
      }}
    >
      <img
        src="/home/assets/logo-kim-silesia-bialy.png"
        alt="KiM Silesia"
        style={{
          display: "block",
          width: "min(78vw, 420px)",
          maxHeight: "80svh",
          objectFit: "contain",
        }}
      />
    </main>
  );
}
