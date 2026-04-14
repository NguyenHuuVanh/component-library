'use client';
import type { IOptionSelect } from '@/types/fields';
import { PopoverContent, PopoverPositioner, PopoverRoot, PopoverTrigger } from '@ark-ui/react/popover';
import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn-ui/command';
import { useSelectValues } from '@/hooks/use-select-values';
import { cn } from '@/utils/cn';
import WapperField from '../wapper-field';

export type SelectFieldProps = {
  placeholder?: string;
  options: IOptionSelect[];
  selected?: string | string[] | null;
  onChangeSelected?: (value: string) => void;
  classNameContent?: string;
  hiddenArrow?: boolean;
  hiddenClear?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  msgError?: string;
  classWapper?: string;
  searchable?: boolean;
};

export const SelectField = ({
  label,
  required,
  msgError,
  classWapper,
  placeholder = 'Chọn...',
  options,
  selected: selectedProp,
  onChangeSelected,
  hiddenArrow,
  hiddenClear = false,
  disabled,
  searchable = true,
  classNameContent,
}: SelectFieldProps) => {
  const selectId = useId();
  const [internalSelected, setInternalSelected] = useState<string>('');
  const selected = selectedProp !== undefined ? String(selectedProp ?? '') : internalSelected;

  const {
    open,
    filterOptions,
    handleChangeValue,
    setOpen,
    setSearch,
  } = useSelectValues({
    options,
    selected,
  });

  const selectedOption = options.find(opt => opt.value === selected);

  const handleSelect = (value: string) => {
    if (selectedProp !== undefined) {
      onChangeSelected?.(value);
    } else {
      setInternalSelected(value);
      onChangeSelected?.(value);
    }
    setOpen(false);
    setSearch('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProp !== undefined) {
      onChangeSelected?.('' as any);
    } else {
      setInternalSelected('');
      onChangeSelected?.('' as any);
    }
    setOpen(false);
  };

  return (
    <WapperField
      label={label}
      required={required}
      msgError={msgError}
      classWapper={classWapper}
    >
      <PopoverRoot
        open={open}
        onOpenChange={({ open }) => {
          if (!open) setSearch('');
          setOpen(open);
        }}
        lazyMount
        unmountOnExit
        positioning={{ strategy: 'fixed' }}
      >
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            data-container={selectId}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between shadow-sm font-normal',
              !selectedOption && 'text-muted-foreground',
            )}
          >
            <span className="truncate flex-1 text-left">
              {selectedOption?.label || placeholder}
            </span>
            {!hiddenArrow && <ChevronDown className="opacity-50 h-4 w-4" />}
          </Button>
        </PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent
            data-state={open ? 'open' : 'closed'}
            className={cn(
              'z-[9999] w-[var(--reference-width)] rounded-md border bg-popover text-popover-foreground shadow-md outline-none',
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2',
              'min-w-[200px] p-0',
              classNameContent,
            )}
            onWheel={e => e.stopPropagation()}
          >
            <Command shouldFilter={false}>
              {searchable && (
                <CommandInput
                  placeholder="Tìm kiếm..."
                  value=""
                  onValueChange={handleChangeValue}
                />
              )}
              <CommandList>
                <CommandEmpty>Không tìm thấy</CommandEmpty>
                <CommandGroup>
                  {filterOptions.map(opt => (
                    <CommandItem
                      key={opt.value}
                      value={opt.value}
                      onSelect={() => handleSelect(opt.value)}
                      className={cn(
                        'cursor-pointer',
                        opt.value === selected && 'bg-accent',
                      )}
                    >
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {selectedOption && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        value="clear-selection"
                        onSelect={() => handleClear({ stopPropagation: () => {} } as any)}
                        className="cursor-pointer text-center justify-center text-muted-foreground"
                      >
                        Bỏ chọn
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </PopoverPositioner>
      </PopoverRoot>
    </WapperField>
  );
};
