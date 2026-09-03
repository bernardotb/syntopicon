export function DemoBadge() {
  return (
    <span
      className="demo-badge"
      title="Passagem de demonstração: texto real (domínio público); o vínculo com o tópico é seleção editorial do protótipo, pendente de confirmação no Justice.pdf."
    >
      Demonstração
    </span>
  );
}

export type ReferenceCardProps = {
  code: string | null;
  topicTitlePt: string | null;
  authorNamePt: string;
  workTitlePt: string;
  workTitleEn: string;
  locatorRaw: string;
  gbwwVolume: number | null;
  passageHref: string | null;
  href: string;
};

export function ReferenceCard(props: ReferenceCardProps) {
  return (
    <article className="reference-card">
      <p className="reference-author">{props.authorNamePt}</p>
      <h3 className="reference-work">
        <a href={props.href}>{props.workTitlePt}</a>
      </h3>
      <p className="reference-locator">
        <span className="locator-label">locatorRaw</span>
        <code>{props.locatorRaw}</code>
      </p>
      <p className="reference-context">
        {props.topicTitlePt ? (
          <>
            {props.code ? <strong>{props.code}</strong> : null}
            {props.code ? " · " : ""}
            {props.topicTitlePt}
          </>
        ) : null}
        {props.gbwwVolume ? <span className="reference-volume">GBWW Vol. {props.gbwwVolume}</span> : <span className="reference-volume pending">Volume GBWW pendente</span>}
      </p>
      <p className="reference-syntopicon-locator">
        Locator do Syntopicon: <em>pendente de ingestão (Justice.pdf)</em>
      </p>
      {props.passageHref ? (
        <a className="button primary" href={props.passageHref}>
          Ler passagem
        </a>
      ) : (
        <p className="empty-inline">Passagem ainda não disponível no acervo digital.</p>
      )}
    </article>
  );
}
