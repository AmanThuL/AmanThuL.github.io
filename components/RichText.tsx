import React from 'react';

type RichTextProps = {
  text: string;
  variant?: 'inline' | 'block';
  className?: string;
  paragraphClassName?: string;
  strongClassName?: string;
};

const normalizeNewlines = (text: string) => text.replace(/\r\n?/g, '\n');

const renderInline = (text: string, keyBase: string, strongClassName: string) => {
  const tokens = normalizeNewlines(text).split(/(<\/?b>)/i);

  let boldDepth = 0;
  let segmentIndex = 0;

  const renderWithLineBreaks = (segment: string, segmentKeyBase: string) => {
    const parts = segment.split('\n');
    const nodes: React.ReactNode[] = [];

    parts.forEach((part, idx) => {
      if (part.length > 0) nodes.push(part);
      if (idx < parts.length - 1) nodes.push(<br key={`${segmentKeyBase}-br-${idx}`} />);
    });

    return nodes;
  };

  return tokens.map((token) => {
    if (/^<b>$/i.test(token)) {
      boldDepth += 1;
      return null;
    }

    if (/^<\/b>$/i.test(token)) {
      boldDepth = Math.max(0, boldDepth - 1);
      return null;
    }

    const key = `${keyBase}-seg-${segmentIndex++}`;
    const content = renderWithLineBreaks(token, key);

    if (boldDepth > 0) {
      return (
        <strong
          key={key}
          className={`font-semibold text-white underline decoration-cool-1/60 underline-offset-4 ${strongClassName}`.trim()}
        >
          {content}
        </strong>
      );
    }

    return <React.Fragment key={key}>{content}</React.Fragment>;
  });
};

export const RichText: React.FC<RichTextProps> = ({
  text,
  variant = 'inline',
  className = '',
  paragraphClassName = '',
  strongClassName = '',
}) => {
  if (variant === 'block') {
    const paragraphs = normalizeNewlines(text)
      .split(/\n{2,}/g)
      .map((p) => p.trim())
      .filter(Boolean);

    return (
      <div className={`space-y-6 ${className}`.trim()}>
        {paragraphs.map((paragraph, idx) => (
          <p key={`p-${idx}`} className={`leading-relaxed ${paragraphClassName}`.trim()}>
            {renderInline(paragraph, `p-${idx}`, strongClassName)}
          </p>
        ))}
      </div>
    );
  }

  return <span className={className}>{renderInline(text, 'inline', strongClassName)}</span>;
};
