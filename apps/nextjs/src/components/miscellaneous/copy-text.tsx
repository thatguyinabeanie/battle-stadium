import type { HTMLAttributes } from "react";
import { forwardRef, memo, useMemo, useState } from "react";

import {
  Button,
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@battle-stadium/ui";

import { SolarCheckReadLinear, SolarCopyLinear } from "../svg/icons";

export interface CopyTextProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  textClassName?: string;
  copyText?: string;
  children: string;
}

export const CopyText = memo(
  forwardRef<HTMLDivElement, CopyTextProps>(
    (props: CopyTextProps, forwardedRef) => {
      const { className, textClassName, children, copyText = "Copy" } = props;
      const [copied, setCopied] = useState(false);
      const [copyTimeout, setCopyTimeout] = useState<ReturnType<
        typeof setTimeout
      > | null>(null);
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

      const content = useMemo(
        () => (copied ? "Copied" : copyText),
        [copied, copyText],
      );

      return (
        <div
          ref={forwardedRef}
          className={cn("text-default-500 flex items-center gap-3", className)}
        >
          <span className={textClassName}>{children}</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{content}</TooltipTrigger>
              <TooltipContent>
                <Button
                  className="text-default-400 h-7 w-7 min-w-7"
                  size="sm"
                  onClick={handleClick}
                >
                  {!copied && <SolarCopyLinear className="h-[14px] w-[14px]" />}
                  {copied && (
                    <SolarCheckReadLinear className="h-[14px] w-[14px]" />
                  )}
                </Button>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  ),
);

CopyText.displayName = "CopyText";
