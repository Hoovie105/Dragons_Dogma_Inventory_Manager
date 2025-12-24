export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-sm py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Data sourced from the{' '}
          <a
            href="https://dragonsdogma.wiki.fextralife.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Dragon's Dogma Wiki
          </a>
        </p>
      </div>
    </footer>
  );
}
