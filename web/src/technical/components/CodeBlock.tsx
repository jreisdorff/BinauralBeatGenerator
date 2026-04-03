type Props = {
  children: string;
  title?: string;
};

export function CodeBlock({ children, title }: Props) {
  return (
    <figure className="code-fig">
      {title ? <figcaption>{title}</figcaption> : null}
      <pre>
        <code>{children}</code>
      </pre>
    </figure>
  );
}
