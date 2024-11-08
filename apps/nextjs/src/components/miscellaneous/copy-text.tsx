import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, cn } from "@battle-stadium/ui";
import type { HTMLAttributes } from "react";
import { forwardRef, memo, useMemo, useState } from "react";
import { Icon } from "@iconify/react";


export interface CopyTextProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  textClassName?: string;
  copyText?: string;
  children: string;
}

export const CopyText = memo(
  forwardRef<HTMLDivElement, CopyTextProps>((props: CopyTextProps, forwardedRef) => {
    const { className, textClassName, children, copyText = "Copy" } = props;
    const [copied, setCopied] = useState(false);
    const [copyTimeout, setCopyTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const onClearTimeout = () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
    };

    const handleClick = () => {
      onClearTimeout();
      void navigator.clipboard.writeText(children);
      setCopied(true);

      setCopyTimeout(
        setTimeout(() => {
          setCopied(false);
        }, 3000),
      );
    };

    const content = useMemo(() => (copied ? "Copied" : copyText), [copied, copyText]);

    return (
      <div ref={ forwardedRef } className={ cn("flex items-center gap-3 text-default-500", className) }>
        <span className={ textClassName }>{ children }</span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{ content }</TooltipTrigger>
            <TooltipContent>
              <Button
                className="h-7 w-7 min-w-7 text-default-400"
                size="sm"
                onClick={ handleClick }
              >
                { !copied && <Icon className="h-[14px] w-[14px]" icon="solar:copy-linear" /> }
                { copied && <Icon className="h-[14px] w-[14px]" icon="solar:check-read-linear" /> }
              </Button>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>




      </div >
    );
  }),
);

CopyText.displayName = "CopyText";
