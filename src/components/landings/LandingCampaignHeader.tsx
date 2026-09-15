type LandingCampaignHeaderProps = {
  logoUrl?: string;
};

export default function LandingCampaignHeader({ logoUrl }: LandingCampaignHeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-40 w-full border-b border-white/10 bg-blue-950/95">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <img
          src={logoUrl || "/images/logo.png"}
          alt="Livre de Multas"
          className="h-10 w-10 object-contain"
        />
        <p className="text-sm font-semibold text-white">Livre de Multas</p>
        <a
          href="/"
          className="ml-auto text-[11px] text-white/40 transition hover:text-white/70"
        >
          Início
        </a>
      </div>
    </header>
  );
}
