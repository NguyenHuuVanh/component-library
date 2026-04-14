'use client';

import type { VariantProps } from 'class-variance-authority';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { Button } from './button';
import { ScrollArea } from './scroll-area';

const Dialog = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogOverlay = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.RefObject<React.ComponentRef<
    typeof DialogPrimitive.Overlay
  > | null>;
}) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[60] bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
  'relative z-[60] w-full border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg max-sm:w-[95%]',
  {
    variants: {
      size: {
        'default': 'max-w-lg',
        'sm': 'max-w-sm',
        'md': 'max-w-md',
        'lg': 'max-w-lg',
        'xl': 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
      },
    },
    defaultVariants: {
      size: '3xl',
    },
  },
);

type DialogContentProps = {
  isLoading?: boolean;
  hiddentClose?: boolean;
} & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & VariantProps<typeof dialogContentVariants>;

const DialogContent = ({
  ref,
  className,
  children,
  isLoading,
  size,
  hiddentClose,
  ...props
}: DialogContentProps & {
  ref?: React.RefObject<React.ComponentRef<
    typeof DialogPrimitive.Content
  > | null>;
}) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            dialogContentVariants({ size, className }),
            'flex flex-col max-h-[90dvh] overflow-clip custom_scroll rounded-lg',
          )}
          aria-describedby={undefined}
          {...props}
        >
          {children}
          <DialogPrimitive.Title className="sr-only" aria-hidden />

          {!hiddentClose && (
            <DialogPrimitive.Close
              asChild
              className="absolute z-[11] right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <Button
                type="button"
                size="icon"
                className="rounded-full"
                variant="ghost"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogPrimitive.Close>
          )}

          {isLoading && (
            <div className="absolute inset-0 bg-gray-200/60 sm:rounded-lg flex items-center justify-center z-10">
              <div className="border-[2px] rounded-full border-gray-200 shadow-sm" />
            </div>
          )}
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  );
};
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left p-6 border-b-[1px] flex-shrink-0',
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex justify-end space-x-2 p-6 border-t-[1px] flex-shrink-0',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.RefObject<React.ComponentRef<
    typeof DialogPrimitive.Title
  > | null>;
}) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
  ref?: React.RefObject<React.ComponentRef<
    typeof DialogPrimitive.Description
  > | null>;
}) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogBody = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => (
  <div
    ref={ref}
    className={cn(
      'flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6',
      className,
    )}
    {...props}
  />
);
DialogBody.displayName = 'DialogBody';

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
