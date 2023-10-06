import React, { useEffect } from "react";
import { CopyToClipboard as ReactCopyToClipboard } from "react-copy-to-clipboard";
import { Check, Copy } from "@phosphor-icons/react";

export type CopyToClipboardProps = {
  className?: string;
  copiedClassName?: string;
  size: number;
} & ReactCopyToClipboard["props"];
export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  className,
  onCopy,
  text,
  options,
  size,
  copiedClassName,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  const setCopiedAndCallOnCopy: ReactCopyToClipboard["props"]["onCopy"] = (
    ...args
  ) => {
    setIsCopied(true);
    if (onCopy) onCopy(...args);
  };

  return (
    <ReactCopyToClipboard
      onCopy={setCopiedAndCallOnCopy}
      text={text}
      options={options}
    >
      <div className={isCopied ? copiedClassName : className}>
        {isCopied ? (
          <Check size={size} weight="light" />
        ) : (
          <Copy size={size} weight="light" />
        )}
      </div>
    </ReactCopyToClipboard>
  );
};
