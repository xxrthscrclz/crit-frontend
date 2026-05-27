import { parseScriptBlocks } from '@/utils/formatScript';

interface ScriptBlockContentProps {
  raw: string;
}

const ScriptBlockContent = ({ raw }: ScriptBlockContentProps) => {
  const blocks = parseScriptBlocks(raw);

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => {
        if (block.type === 'section') {
          return (
            <h3
              key={index}
              className="typo-body4-semibold text-brand-deep pt-3 border-t border-accent-muted first:border-0 first:pt-0"
            >
              {block.label}
            </h3>
          );
        }

        if (block.type === 'stage') {
          return (
            <p key={index} className="typo-body6 text-brand-tertiary italic">
              {block.label}
            </p>
          );
        }

        return (
          <p key={index} className="typo-body4-semibold text-primary leading-7 break-keep">
            {block.content}
          </p>
        );
      })}
    </div>
  );
};

export default ScriptBlockContent;
